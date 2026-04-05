const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const Tesseract = require('tesseract.js');
const { pdfToPng } = require('pdf-to-png-converter');
const axios = require('axios'); // Added axios
require('dotenv').config();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * ============================================================================
 * UNIVERSAL TENDER ANALYZER PIPELINE (OCR -> Regex -> AI)
 * ============================================================================
 * 1. Extraction: Text (pdf-parse) OR Vision (Gemini Multimodal for scans)
 * 2. Cleaning: Normalize whitespace
 * 3. Segmentation: Identify critical sections
 * 4. Regex Extraction: High-precision extraction for Dates, IDs
 * 5. AI Completion: Gemini 1.5 Flash Vision/Text for Universal Support
 */

// Initialize AI
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');

// Initialize API Keys (Support for multiple keys in rotation)
const GEMINI_API_KEYS = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "").split(',').map(k => k.trim()).filter(k => k);
let currentKeyIndex = 0;

function getNextGeminiKey() {
    if (GEMINI_API_KEYS.length === 0) return "";
    const key = GEMINI_API_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % GEMINI_API_KEYS.length;
    return key;
}

// Initial instance
let genAI = new GoogleGenerativeAI(getNextGeminiKey() || "DUMMY");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const AI_MODEL = "gemini-2.5-flash"; 

// Helper for delays
async function retryWithBackoff(fn, retries = 3, delay = 5000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (error.message.includes("429") || error.message.includes("Quota exceeded") || error.message.includes("Rate limit")) {
                console.warn(`⏳ Rate limit hit. Waiting ${delay / 1000}s before retry ${i + 1}/${retries}...`);
                await sleep(delay);
                delay *= 2; // Exponential backoff
            } else {
                throw error;
            }
        }
    }
    throw new Error("Max retries exceeded");
}

// ============================================================================
// STAGE 1: TEXT EXTRACTION & CLEANING
// ============================================================================

async function extractTextViaOCR(filePath) {
    console.log("🦾 Starting Professional OCR Engine (Tesseract)...");
    try {
        // Convert PDF to PNGs first
        const pngPages = await pdfToPng(filePath, {
            viewportScale: 1.5, // Balanced for speed/accuracy
        });

        console.log(`   -> Converted to ${pngPages.length} images. Initializing OCR Worker...`);

        // Initialize user worker once for the whole document
        const worker = await Tesseract.createWorker('eng');

        let fullText = "";
        for (let i = 0; i < pngPages.length; i++) {
            console.log(`   -> OCR Scanning Page ${i + 1}/${pngPages.length}...`);
            const { data: { text } } = await worker.recognize(pngPages[i].content);
            fullText += text + "\n";
        }

        await worker.terminate();
        console.log("✅ OCR Complete. Cleaning data...");
        // Clean data AND fix common GeM OCR issue where "Required No" becomes "RequiredNo"
        return cleanOCRData(fullText).replace(/RequiredNo/gi, "Required No");

    } catch (err) {
        console.error("❌ OCR Engine Failed:", err.message);
        return "";
    }
}

/**
 * Advanced Cleaning for OCR Garbage
 * Removes:
 * - Single char lines (noise)
 * - Page numbers (Page x of y)
 * - Common scan watermarks
 * - Excessive non-alphanumeric blocks
 */
function cleanOCRData(text) {
    if (!text) return "";

    return text
        .split('\n')
        .map(line => line.trim())
        // Remove lines that are just symbols or single chars (unless currency/numbers)
        .filter(line => line.length > 2 || /[\d₹$€£]/.test(line))
        // Remove common OCR artifacts like "Scanned with CamScanner"
        .filter(line => !/scanned by|scanned with|camscanner|page \d+ of \d+/i.test(line))
        // Remove lines that are purely vertical lines or separators often read as "|||"
        .filter(line => !/^[|_\-.,\s]+$/.test(line))
        .join('\n')
        // Fix broke n words (simple heuristic for spaces in words, be careful not to merge separate words)
        // .replace(/([a-z]) \s ([a-z])/g, '$1$2') // Risky without dictionary, skipping for now
        .replace(/\r\n/g, '\n')
        .replace(/\t/g, ' ')
        // Remove excessive empty lines
        .replace(/\n{3,}/g, '\n\n');
}

/**
 * Use Python script with pdfplumber for superior text extraction.
 * Much more accurate than pdf-parse for complex GeM tables.
 */
function extractTextViaPython(filePath) {
    return new Promise((resolve, reject) => {
        const pythonScript = path.join(__dirname, 'extractor.py');
        const pythonProcess = spawn('python', [pythonScript, filePath]);

        let resultData = '';
        let errorData = '';

        pythonProcess.stdout.on('data', (data) => { resultData += data.toString(); });
        pythonProcess.stderr.on('data', (data) => { errorData += data.toString(); });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.warn('⚠️ Python Extraction Failed:', errorData);
                resolve(""); // Fallback empty
            } else {
                resolve(resultData.trim());
            }
        });
    });
}

async function extractText(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    let text = '';

    try {
        if (ext === '.pdf') {
            console.log("🦾 Using Python pdfplumber for high-quality extraction...");
            text = await extractTextViaPython(filePath);

            if (!text || text.trim().length < 200) {
                console.log("📸 Primary extraction missing or small. Switching to pdf-parse...");
                const dataBuffer = fs.readFileSync(filePath);
                const data = await pdf(dataBuffer);
                text = data.text;
            }

            // If still no text, switch to OCR
            if (!text || text.trim().length < 200) {
                console.log("📸 Searchable text missing or insufficient (< 200 chars). Switching to OCR...");
                text = await extractTextViaOCR(filePath);
            }
        } else if (ext === '.docx' || ext === '.doc') {
            const result = await mammoth.extractRawText({ path: filePath });
            text = result.value;
        } else if (ext === '.txt') {
            text = fs.readFileSync(filePath, 'utf8');
        }
    } catch (error) {
        console.warn(`Text extraction warning for ${filePath}: ${error.message}.`);
        return "";
    }

    // Basic cleaning
    if (!text) return "";
    return text
        .replace(/\r\n/g, '\n')
        .replace(/\t/g, ' ')
        .replace(/\s+/g, ' ') // Collapse multiple spaces
        .trim();
}

// ============================================================================
// STAGE 2: REGEX / RULE-BASED EXTRACTION
// ============================================================================

function extractRegexFields(text) {
    const extracted = {};
    if (!text) return extracted;

    // 1. Tender ID Identification (GeM vs Standard)
    const gemIdMatch = text.match(/GEM\/\d{4}\/B\/\d+/);
    const standardIdMatch = text.match(/(?:Tender No|Bid No|NIT No)[:\s]+([A-Z0-9\/\-]+)/i);

    if (gemIdMatch) {
        extracted["Tender ID"] = gemIdMatch[0];
        extracted["Type"] = "GEM";
    } else if (standardIdMatch) {
        extracted["Tender ID"] = standardIdMatch[1];
        extracted["Type"] = "STANDARD";
    }

    // 2. EMD Amount (Strict Numeric Check)
    const emdMatch = text.match(/EMD Amount[:\s]*([\d,]+)/i);
    if (emdMatch && /[\d]+/.test(emdMatch[1])) {
        extracted["EMD"] = emdMatch[1];
    }

    return extracted;
}

/**
 * Section Sniper: Scans the FULL text for critical keywords and returns snippets.
 * This beats the token limit by bringing deep-buried clauses to the front.
 */
function extractSmartSnippets(text, maxChars = 8000) {
    if (!text) return "";

    const targets = [
        { name: "Liquidated Damages/Penalty", keywords: ["liquidated damages", "penalty", "delay in delivery", "l.d.", "deduction", "termination", "breach", "sla", "service level"] },
        { name: "EMD/ePBG/Financial", keywords: ["emd", "earnest money", "security deposit", "epbg", "bank guarantee", "advisory bank", "beneficiary", "percentage", "bg duration", "warranty", "estimated cost", "tender value", "ecv", "total value"] },
        { name: "Payment Terms", keywords: ["payment terms", "paying authority", "payment cycle", "bill passing", "crac", "milestone", "settlement"] },
        { name: "Experience/Turnover", keywords: ["turnover", "experience criteria", "past performance", "financial standing", "annual turnover", "net worth", "balance sheet"] },
        { name: "Consignee/Delivery", keywords: ["consignee", "reporting officer", "delivery schedule", "delivery days", "delivery start", "delivery to be completed", "delivery period"] }
    ];

    let snippets = "--- CRITICAL CLAUSES SNIPER ---\n";
    const lowerText = text.toLowerCase();

    targets.forEach(target => {
        for (const kw of target.keywords) {
            const idx = lowerText.indexOf(kw);
            if (idx !== -1) {
                // Grab 1500 characters around the keyword
                const start = Math.max(0, idx - 200);
                const end = Math.min(text.length, idx + 1300);
                snippets += `\n[FOUND: ${target.name} around '${kw}']\n${text.substring(start, end)}\n`;
                break; // Found one for this target, move to next target
            }
        }
    });

    return snippets.substring(0, maxChars);
}

// ============================================================================
// STAGE 3: AI EXTRACTION (Text OR Vision)
// ============================================================================

async function extractWithAI(text, regexData, filePath) {
    try {
        const hints = JSON.stringify(regexData);

        // 0. Smart Snippets (Extract critical clauses first)
        const snippets = extractSmartSnippets(text);
        console.log(`🎯 Smart Snippets Extracted (${snippets.length} chars)`);

        // 1. Prepare Chunks (25k chars - reduced for better rate limit management)
        const chunkSize = 25000;
        const chunks = [];

        // Add snippets as the FIRST chunk to ensure high priority analysis
        if (snippets.length > 100) {
            chunks.push(`*** CRITICAL EXTRACTED SNIPPETS (PRIORITIZE THIS DATA) ***\n${snippets}\n*** END SNIPPETS ***`);
        }

        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.substring(i, i + chunkSize));
        }

        console.log(`🚀 AI Pipeline: Document split into ${chunks.length} segments.`);

        let finalResults = {};
        const basePrompt = `
    You are a HIGHLY ACCURATE Tender Analyst specializing in Indian Government Procurement (GeM, IREPS, Ministry of Defence).
    Your task is to EXTRACT data from the provided document into a JSON object.

    STRICT EVIDENCE-BASED RULES:
    1. NO HARDCODING: Do not use text from these instructions unless explicitly found.
    2. RAW EVIDENCE: Extract values EXACTLY as they appear. Translate Hindi values like 'परेषिती' to English.
    3. MONEY MATTERS:
       - Look aggressively for 'Estimated Cost', 'Tender Value', 'ECV', 'Cost of Work', 'Sanctioned Amount'.
       - Keywords: 'Rs.', 'INR', 'Lakhs', 'Crores', '₹'.
       - If detailed breakdown exists, sum it up.
    4. EMD & ePBG (CRITICAL):
       - If "EMD Required" says "No" or "NA", write "Not Required".
       - If "ePBG Percentage" is found (e.g., "3.00"), extract it as "3%".
       - Look for "Duration of ePBG" (often in months).
    5. QUANTITY & DELIVERY:
       - Look for 'Consignees/Reporting Officer' table. This is KEY.
       - 'Delivery Days' is often the last column. Look for 'Delivery to be completed by' or 'Delivery Start'.
       - 'Quantity' is often near the Item Name.
    6. FINANCIAL CRITERIA:
       - 'Min. Bidder Turnover' usually under 'Bidder Financial Standing' or 'Average Annual Turnover'.
       - 'OEM Avg. Turnover': If this is a SERVICE tender, look for 'Service Provider Turnover' instead.
    7. PAYMENT TERMS:
       - Look for 'Payment Authority', 'Bill Passing Authority', 'Standard Payment Terms'.
    8. SERVICE TENDER SPECIFICS:
       - 'Warranty Period': For Services, look for 'SLA Duration', 'Contract Period', or 'Service Support'.
       - 'Inspection Type': Look for 'Consignee Inspection', 'TPI', 'RITES', or 'User Dept'.
       - 'Past Performance %': Look for 'Experience Criteria', 'Past Project Experience', or specific % requirements in Eligibility.
       - 'Penalty/LD Terms': Look for 'SLA', 'Deduction', 'Penalty for failure', or generic GTC references.
    9. PLATFORM LOGIC:
       - GeM: Check "Bid Details" for EMD/ePBG.
       - IREPS: Check "Financial" section.
    10. HALLUCINATION GUARD: If accurate data is missing, return null or empty string. 
        - NEVER write "Not specified", "Not listed", "N/A", "Unknown", "As per tender", "Refer document".
        - Leave fields EMPTY if data is not explicitly found.
    11. CONTEXT AWARENESS: FIND the data or return null. Do not guess.
    12. DATA CLEANING: Parse 'Jodhpur115' as 'City: Jodhpur, Qty: 1, Delivery: 15'.
    13. UDIN CHECK: Look for UDIN on CA certificates.
    14. SCOPE & SPECS: Extract a summary of the Scope of Work and Technical Specifications.
    15. BUYER TERMS: Extract specific Buyer Added Terms (ATC).

    JSON OUTPUT SCHEMA (Strictly 40 Fields):
    {
        "Tender ID": "String",
        "Item Name": "String (Primary Item)",
        "Title": "String",
        "Name of the Department": "String",
        "Organisation Name": "String",
        "Location": "String",
        "Address": "String",
        "Consignee Address": "String",
        "Total Quantity": "String",
        "Item Details": [{"Name": "String", "Quantity": "String", "Delivery": "String"}],
        "Bid End Date/Time": "DD-MM-YYYY HH:mm:ss",
        "Bid Opening Date/Time": "DD-MM-YYYY HH:mm:ss",
        "Bid Validity": "String (e.g., 120 Days)",
        "Minimum Bidder Turnover": "String",
        "OEM Average Turnover": "String",
        "Years of Experience Required": "String (Number only if explicit)",
        "MSE Exemption": "Yes/No/Not listed",
        "Startup Exemption": "Yes/No/Not listed",
        "Estimated Contract Value": "String",
        "Evaluation Type": "String",
        "EMD Amount": "String",
        "EMD Exemption": "String",
        "ePBG Percentage": "String",
        "ePBG Duration": "String",
        "Inspection Type": "String",
        "Inspection Authority": "String",
        "Delivery Days": "String",
        "Payment Terms": "String",
        "Warranty Period": "String",
        "Past Performance %": "String",
        "MII Purchase Preference": "Yes/No (null if not specified)",
        "MSE Purchase Preference": "Yes/No (null if not specified)",
        "Penalty/LD Terms": "String",
        "Verify UDIN": "Yes/No (List UDIN if found)",
        "Required Documents": ["Array of strings"],
        "Scope of Work": "String (Summary of work/service)",
        "Technical Specifications": "String (Key specs summary)",
        "Buyer Added Terms": ["Array of important seller terms"],
        "Compliance Checklist": ["Array of distinct compliance points"],
        "Disqualification Rules": ["Array of conditions leading to rejection"],
        "Executive Summary": "String (Short logic: e.g., 'Low value, No EMD, MSME friendly, fast delivery')"
    }
`;

    const currentKey = getNextGeminiKey();
    const currentGenAI = new GoogleGenerativeAI(currentKey);
    const model = currentGenAI.getGenerativeModel({
        model: AI_MODEL,
        generationConfig: { responseMimeType: "application/json" } 
    });

    for (let i = 0; i < chunks.length; i++) {
            console.log(`   -> Processing Segment ${i + 1}/${chunks.length}...`);

            // Rate Limit Buffer: Sleep 2s between chunks by default
            if (i > 0) await sleep(2000);

            const prompt = `
            ${basePrompt}

            EXISTING_DATA:
            ${JSON.stringify(finalResults)}

            NEW_DOCUMENT_SEGMENT:
            ${chunks[i]}

            INSTRUCTIONS:
            Return ONLY a JSON object. Combine identified fields with existing data.
        `;

            // --- PRIMARY: GROQ (Fast & Reliable Llama 3) ---
            try {
                // Use env key OR hardcoded fallback securely
                const gKey = process.env.GROQ_API_KEY;

                // Re-init Groq to be absolutely sure we have the latest key
                const groqClient = new Groq({ apiKey: gKey });

                console.log(`      ...via Groq Llama 3.3 70B (PRIMARY)`);

                await retryWithBackoff(async () => {
                    const chatCompletion = await groqClient.chat.completions.create({
                        messages: [
                            { role: 'system', content: basePrompt + "\nRETURN ONLY JSON OBJECT. EXTRACT ALL FIELDS EXPLICITLY FOUND. NO HALLUCINATIONS." },
                            { role: 'user', content: `EXISTING_DATA: ${JSON.stringify(finalResults)}\n\nDOCUMENT_CHUNK: ${chunks[i]}` }
                        ],
                        model: 'llama-3.3-70b-versatile',
                        response_format: { type: 'json_object' } // Enforce JSON
                    });

                    const text = chatCompletion.choices[0].message.content;
                    finalResults = { ...finalResults, ...JSON.parse(text) };
                }, 3, 2000); // Fast retry for Groq

                console.log(`✅ Groq Success (Segment ${i + 1})`);
                continue; // Move to next chunk on success

            } catch (groqError) {
                console.warn(`⚠️ Groq Error (Segment ${i + 1}):`, groqError.message);
                if (groqError.error) console.warn(`   -> Details:`, JSON.stringify(groqError.error));

                // --- FALLBACK 1: GEMINI 1.5 FLASH (Most Stable Free Tier) ---
                try {
                    console.log(`      ...falling back to Gemini 1.5 Flash`);

                    await retryWithBackoff(async () => {
                        const result = await model.generateContent(prompt);
                        const response = await result.response;
                        const chunkContent = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
                        finalResults = { ...finalResults, ...JSON.parse(chunkContent) };
                    }, 3, 10000); // 3 retries, start with 10s delay

                    console.log(`✅ Gemini Fallback Success (Segment ${i + 1})`);
                    continue;

                } catch (geminiError) {
                    console.warn(`⚠️ Gemini Error (Segment ${i + 1}):`, geminiError.message); // Fall through to next fallback


                    // --- FALLBACK 2: OPENROUTER (More Reliable Free Model) ---
                    try {
                        if (!process.env.OPENROUTER_API_KEY) throw new Error("OPENROUTER_API_KEY missing");
                        console.log(`      ...falling back to OpenRouter (Llama 3 8B Free)`);

                        await retryWithBackoff(async () => {
                            const orResponse = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
                                model: "meta-llama/llama-3-8b-instruct:free", // Changed to reliable free model
                                messages: [
                                    { role: 'system', content: basePrompt + "\nRETURN ONLY JSON OBJECT." },
                                    { role: 'user', content: `EXISTING_DATA: ${JSON.stringify(finalResults)}\n\nDOCUMENT_CHUNK: ${chunks[i]}` }
                                ]
                            }, {
                                headers: {
                                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                                    "Content-Type": "application/json",
                                    "HTTP-Referer": "https://bidalert.in",
                                    "X-Title": "BidAlert Analyzer"
                                }
                            });

                            const text = orResponse.data.choices[0].message.content;
                            const jsonMatch = text.match(/\{[\s\S]*\}/);
                            finalResults = { ...finalResults, ...JSON.parse(jsonMatch ? jsonMatch[0] : text) };
                        });
                        console.log(`✅ OpenRouter Fallback Success (Segment ${i + 1})`);
                        continue;
                    } catch (orError) {
                        console.error(`❌ All AI Models Failed (Segment ${i + 1}):`, orError.message);
                    }
                }
            }
        }
        return finalResults;
    } catch (error) {
        console.error('❌ AI Pipeline Error:', error);
        return null;
    }
}


// ============================================================================
// STAGE 4: TRANSLATION (Using Python Deep Translator)
// ============================================================================

const { spawn } = require('child_process');

async function translateWithAI(jsonData, targetLang) {
    if (!targetLang || targetLang.toLowerCase() === 'english' || targetLang.toLowerCase() === 'en') {
        return jsonData;
    }

    console.log(`🌍 Translating results to ${targetLang}...`);

    // 1. Primary: Google Gemini (Fast & Free Tier)
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
            Translate the following JSON data completely into ${targetLang}.
            
            IMPORTANT RULES:
            - Translate ALL VALUES including summary, scope, specifications, eligibility, etc.
            - Do NOT leave any English text in the values.
            - Keep all KEYS in English.
            - Maintain the exact JSON structure and formatting.
            - Keep numbers, dates, and currency values unchanged.
            
            Return ONLY the fully translated valid JSON object. Do not add markdown.
            
            JSON:
            ${JSON.stringify(jsonData)}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
        const json = JSON.parse(text);
        console.log(`✅ Gemini Translation Success (${targetLang})`);
        return json;
    } catch (geminiError) {
        console.error("❌ Gemini Translation Failed:", geminiError.message);

        // 2. Secondary: Claude (Anthropic Backup)
        if (process.env.CLAUDE_API_KEY) {
            try {
                console.log(`🤖 Switching to Claude API for translation...`);
                // Use dynamic import or fetch if available in Node environment (requires node-fetch in older node or global fetch in Node 18+)
                const fetch = global.fetch || require('node-fetch');

                const response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'x-api-key': process.env.CLAUDE_API_KEY,
                        'anthropic-version': '2023-06-01',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: "claude-3-haiku-20240307",
                        max_tokens: 4000,
                        messages: [{
                            role: "user",
                            content: `Translate the VALUES of this JSON object into ${targetLang}. Keep keys in English. Return ONLY JSON. JSON: ${JSON.stringify(jsonData)}`
                        }]
                    })
                });

                if (!response.ok) throw new Error(`Claude API ID: ${response.status} ${response.statusText}`);

                const data = await response.json();
                const text = data.content[0].text.replace(/```json/g, "").replace(/```/g, "").trim();
                const json = JSON.parse(text);
                console.log(`✅ Claude Translation Success (${targetLang})`);
                return json;

            } catch (claudeError) {
                console.error("❌ Claude Translation Failed:", claudeError.message);
            }
        }
    }

    // 3. Fallback: Python Deep Translator (Offline/Free)
    console.log(`⚠️ AI Translation failed. Falling back to Python Deep Translator...`);
    return new Promise((resolve, reject) => {
        const pythonScript = path.join(__dirname, 'translator_service.py');
        const pythonProcess = spawn('python', [pythonScript, targetLang]);

        let resultData = '';
        let errorData = '';

        // Send JSON data to Python script via stdin
        pythonProcess.stdin.write(JSON.stringify(jsonData));
        pythonProcess.stdin.end();

        pythonProcess.stdout.on('data', (data) => {
            resultData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorData += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error('❌ Python Translation Failed:', errorData);
                resolve(jsonData); // Fallback to original
            } else {
                try {
                    const translatedJson = JSON.parse(resultData);
                    if (translatedJson.error) {
                        console.error('❌ Python Script Error:', translatedJson.error);
                        resolve(jsonData);
                    } else {
                        resolve(translatedJson);
                    }
                } catch (e) {
                    try {
                        // Attempt to parse again in case of whitespace
                        resolve(JSON.parse(resultData.trim()));
                    } catch (err2) {
                        console.error('❌ Failed to parse Python output:', err2.message);
                        resolve(jsonData);
                    }
                }
            }
        });
    });
}

// ============================================================================
// STAGE 5: DOCUMENT Q&A (Interactive Chat)
// ============================================================================

/**
 * Smart Context Extractor:
 * Finds sections of the text most relevant to the question to stay within token limits.
 */
function getLocalizedContext(text, question, maxChars = 15000) {
    if (!text) return "";
    if (text.length <= maxChars) return text;

    // 1. Identify keywords from the question
    const ignoredWords = new Set(["what", "is", "the", "for", "of", "in", "to", "are", "by", "document", "provided", "based", "on", "how", "can", "i", "find", "where", "which", "does", "any", "at"]);
    const keywords = question.toLowerCase()
        .replace(/[?.,!;:]/g, "")
        .split(/\s+/)
        .filter(word => word.length > 2 && !ignoredWords.has(word));

    if (keywords.length === 0) {
        return text.substring(0, maxChars); // Default to start if no keywords
    }

    // 2. Locate keyword positions in the full text
    const positions = [];
    const lowerText = text.toLowerCase();

    keywords.forEach(kw => {
        let idx = lowerText.indexOf(kw);
        while (idx !== -1) {
            positions.push(idx);
            idx = lowerText.indexOf(kw, idx + 1);
            if (positions.length > 50) break; // Safety limit
        }
    });

    if (positions.length === 0) {
        return text.substring(0, maxChars); // Fallback
    }

    // 3. Extract windows around positions (e.g. 2000 chars around each hit)
    const windowSize = 2500;
    const ranges = positions.map(p => ({
        start: Math.max(0, p - windowSize / 2),
        end: Math.min(text.length, p + windowSize / 2)
    }));

    // 4. Merge overlapping ranges
    ranges.sort((a, b) => a.start - b.start);
    const mergedRanges = [];
    if (ranges.length > 0) {
        let current = ranges[0];
        for (let i = 1; i < ranges.length; i++) {
            if (ranges[i].start < current.end) {
                current.end = Math.max(current.end, ranges[i].end);
            } else {
                mergedRanges.push(current);
                current = ranges[i];
            }
        }
        mergedRanges.push(current);
    }

    // 5. Build context from merged ranges until maxChars reached
    let context = "";
    for (const range of mergedRanges) {
        const snippet = text.substring(range.start, range.end);
        if ((context.length + snippet.length) > maxChars) {
            const remaining = maxChars - context.length;
            if (remaining > 100) {
                context += "\n... [truncated] ...\n" + snippet.substring(0, remaining);
            }
            break;
        }
        context += "\n... [SECTION] ...\n" + snippet;
    }

    // Always include the beginning of the document (Introduction/Summary)
    if (context.length < maxChars) {
        const header = text.substring(0, 3000);
        if (!context.includes(header.substring(0, 500))) {
            context = "--- DOCUMENT HEADER ---\n" + header + "\n\n" + context;
        }
    }

    return context.substring(0, maxChars);
}

async function askDocumentQuestion(text, question) {
    try {
        // Snippets based on question keywords
        const localizedContext = getLocalizedContext(text, question);
        // FORCE include penalty/LD snippets
        const forcedSnippets = extractSmartSnippets(text, 5000);

        const prompt = `
            You are a highly skilled detailed-oriented Procurement Analyst Assistant.
            
            DOCUMENT CONTEXT SNIPPETS:
            """
            ${forcedSnippets}

            ${localizedContext}
            """

            USER INPUT: "${question}"

            INSTRUCTIONS:
            1. If the user asks a specific question, answer STRICTLY based on the snippets.
            2. If the user input is NOT a question (e.g., a statement or text block), SUMMARIZE the relevance of that text to the document or Explain what the document says about that topic.
            3. Look for synonyms (e.g., "Liquidated Damages" for "Penalty").
            4. If the answer is found, quote the relevant value.
            5. If not found, say "Information not found in the provided document chunks." but suggest what IS in the document.
        `;

        // 1. Primary: Groq (Fast & Reliable Llama 3.3 70B)
        try {
            if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY missing");
            console.log(`💬 Q&A: Using Groq Llama 3.3 70B (PRIMARY)...`);

            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    { role: 'system', content: "You are a highly skilled Procurement Analyst Assistant. Answer questions based on the provided document snippets." },
                    { role: 'user', content: prompt }
                ],
                model: 'llama-3.3-70b-versatile'
            });

            return chatCompletion.choices[0].message.content.trim();
        } catch (groqError) {
            console.warn("⚠️ Q&A Groq Error:", groqError.message);

            // 2. Fallback: Gemini
            try {
                console.log(`💬 Q&A: Falling back to Gemini ${AI_MODEL}...`);
                const model = genAI.getGenerativeModel({ model: AI_MODEL });
                const result = await model.generateContent(prompt);
                const response = await result.response;
                return response.text().trim();
            } catch (geminiError) {
                console.warn("⚠️ Q&A Gemini Error:", geminiError.message);

                // 3. Fallback: Claude
                try {
                    if (!process.env.CLAUDE_API_KEY) throw new Error("CLAUDE_API_KEY missing");
                    console.log(`💬 Q&A: Falling back to Claude 3.5 Sonnet...`);

                    const claudeResponse = await axios.post('https://api.anthropic.com/v1/messages', {
                        model: "claude-3-5-sonnet-20240620",
                        max_tokens: 4096,
                        messages: [{ role: "user", content: prompt }]
                    }, {
                        headers: {
                            'x-api-key': process.env.CLAUDE_API_KEY,
                            'anthropic-version': '2023-06-01',
                            'content-type': 'application/json'
                        }
                    });

                    return claudeResponse.data.content[0].text.trim();
                } catch (claudeError) {
                    console.error("❌ All Q&A AI Models Failed.");
                    return "Information not found in the provided document chunks (AI services currently unavailable).";
                }
            }
        }
    } catch (error) {
        console.error('❌ Q&A Engine Error:', error);
        return "Sorry, I encountered an error while processing your question.";
    }
}

// ============================================================================
// MAIN PIPELINE ORCHESTRATOR
// ============================================================================

async function analyzeTender(text, filePath = null, targetLanguage = 'English') {
    console.log('🚀 Starting Universal Analysis Pipeline...');

    // Stage 1: Pre-processing
    const cleanText = (text || "").substring(0, 250000); // Working copy
    console.log('📝 Stage 1: Pre-processing...');
    console.log('--- RAW DOCUMENT TEXT (START) ---');
    console.log(cleanText);
    console.log('--- RAW DOCUMENT TEXT (END) ---');

    // Stage 2: Rule-Based Extraction (only if text exists)
    console.log('⚡ Stage 2: Regex Extraction...');
    const regexResults = extractRegexFields(cleanText);
    if (regexResults["Tender ID"]) console.log(`   -> Found ID: ${regexResults["Tender ID"]}`);

    // Stage 3: AI Extraction (Vision or Text)
    console.log('🧠 Stage 3: AI Completion & Validation...');
    // We pass filePath so AI can use Vision if cleanText is empty
    const aiResults = await extractWithAI(cleanText, regexResults, filePath);

    // --- POST-PROCESSING CLEANER ---
    // AI sometimes still returns "Not specified" despite instructions. We force clean it here.
    if (aiResults) {
        Object.keys(aiResults).forEach(key => {
            const val = aiResults[key];
            if (typeof val === 'string') {
                const lower = val.toLowerCase().trim();
                const forbidden = ["not specified", "not listed", "not mentioned", "n/a", "unknown", "nil", "none", "as per tender", "refer document", "null", "undefined"];
                if (forbidden.includes(lower) || lower.length < 2 || lower === "null" || lower === "undefined") {
                    aiResults[key] = null; // Force null
                }
            }
        });
    }

    if (!aiResults) {
        throw new Error('AI failed to process document.');
    }

    // Stage 4: Translation (Using Python Deep Translator)
    let finalResults = aiResults;
    if (targetLanguage && targetLanguage.toLowerCase() !== 'english') {
        finalResults = await translateWithAI(aiResults, targetLanguage);
    }

    console.log('✅ Pipeline Complete.');

    // RETURN OBJECT with both JSON and Raw Text for Q&A
    return {
        json: finalResults,
        text: cleanText // Return text for Q&A context
    };
}

// Minimal compatibility exports
function validateResults(results) { return { isValid: true, completeness: 100, warnings: [], errors: [] }; }
function extractProgrammatically(text) { return {}; }

// ============================================================================
// STAGE 6: BIDGPT NATURAL LANGUAGE SEARCH
// ============================================================================

async function processBidGPTQuery(userQuery, targetLanguage = 'English', context = null) {
    const q = userQuery.toLowerCase().trim();

    // --- ENHANCED INTENT ANALYZER ---
    try {
        if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY missing");

        const intentPrompt = `
        You are BidGPT, an intelligent AI consultant specialized in government and private tenders.
        
        Analyze the user query and determine the INTENT.
        
        IMPORTANT TARGET LANGUAGE: ${targetLanguage}
        You MUST provide the "suggested_response" translated into ${targetLanguage}.
        Even for "search" intent, provide a brief confirmation message like "I found some matching tenders for you" in ${targetLanguage}.
        
        PREVIOUS CONTEXT from last turn:
        ${JSON.stringify(context || {})}
        
        INTENTS:
        1. "greeting": Hi, hello, etc.
        2. "explanation": Questions about how things work.
        3. "search": Explicit request to find tenders.
        4. "unclear": Short/vague query (e.g. "gas", "Solar").
        5. "next_step": Questions about what to do next.

        CONTEXTUAL RULES:
        1. IF query is "yes", "sure", "ok", "proceed" AND PREVIOUS CONTEXT has "last_filters":
           - Set intent to "search".
           - Use "last_filters" from the context as your "search_filters".
        2. IF intent is "unclear" but you can identify a likely product/service (e.g. "gas"):
           - Put the likely search filter in "search_filters" (e.g. {"q": "gas"}) so we can remember it.
           - Ask a clarification question like "Would you like to see gas tenders?" in "suggested_response" (in ${targetLanguage}).
        3. IF intent is "greeting", your "suggested_response" should greet the user and offer to help them find live tenders, understand documents, or prepare quotations (in ${targetLanguage}).
        4. ALWAYS respond in JSON: { "intent": "string", "search_filters": object|null, "suggested_response": "string in ${targetLanguage}|null" }
        
        Tone: Professional, helpful.
        `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: intentPrompt },
                { role: 'user', content: userQuery }
            ],
            model: 'llama-3.3-70b-versatile',
            response_format: { type: 'json_object' }
        });

        const result = JSON.parse(chatCompletion.choices[0].message.content);

        if (result.intent === 'search' && result.search_filters) {
            return {
                type: 'search',
                filters: result.search_filters,
                intent: result.intent,
                message: result.suggested_response
            };
        }

        if (result.intent === 'unclear') {
            const defaultUnclear = targetLanguage === 'Telugu' ? "దయచేసి కొంచెం స్పష్టంగా చెప్పగలరా? మీరు దీనికి సంబంధించిన టెండర్ల కోసం లేదా సాధారణ సమాచారం కోసం చూస్తున్నారా?" :
                targetLanguage === 'Hindi' ? "क्या आप कृपया थोड़ा और स्पष्ट कर सकते हैं? क्या आप इससे संबंधित निविदाएं या सामान्य जानकारी ढूंढ रहे हैं?" :
                    "Could you please be more specific? Are you looking for tenders related to this or general information?";

            return {
                type: 'chat',
                message: result.suggested_response || defaultUnclear,
                intent: result.intent,
                filters: result.search_filters // Pass filters along even for 'unclear' so server can save them to context
            };
        }

        if (result.intent === 'greeting' || result.intent === 'explanation' || result.intent === 'next_step') {
            let fallbackMsg = targetLanguage === 'Telugu' ? "నేను మీకు ఈ రోజు ఎలా సహాయపడగలను?" :
                targetLanguage === 'Hindi' ? "मै आपकी आज कैसे सहायता कर सकता हूँ?" :
                    "How can I assist you today?";

            if (result.intent === 'greeting') {
                if (targetLanguage === 'Telugu') {
                    fallbackMsg += "\n\nనేను మీకు లైవ్ టెండర్లను కనుగొనడంలో, పత్రాలను అర్థం చేసుకోవడంలో లేదా కోటేషన్లను సిద్ధం చేయడంలో సహాయపడగలను. మీరు మొదట ఏమి చేయాలనుకుంటున్నారు?";
                } else if (targetLanguage === 'Hindi') {
                    fallbackMsg += "\n\nमैं आपको लाइव निविदाएं खोजने, दस्तावेजों को समझने या कोटेशन तैयार करने में मदद कर सकता हूं। आप पहले क्या करना चाहेंगे?";
                } else {
                    fallbackMsg += "\n\nI can help you find live tenders, understand documents, or prepare quotations. What would you like to do first?";
                }
            }
            return {
                type: 'chat',
                message: result.suggested_response || fallbackMsg
            };
        }

        // Fallback for search intent detected by keywords but AI was ambiguous
        const tenderKeywords = ['tender', 'bid', 'amc', 'installation', 'supply', 'procurement', 'contract', 'notice', 'rfp', 'rfq', 'e-tender', 'hiring', 'service', 'work', 'project'];
        if (tenderKeywords.some(k => q.includes(k))) {
            return await extractSearchFilters(userQuery);
        }

        return {
            type: 'chat',
            message: result.suggested_response || (targetLanguage === 'Telugu' ? "నేను మీ టెండర్ సంబంధిత ప్రశ్నలతో సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీకు కావలసిన దాని గురించి ఇంకా కొంచెం చెప్పగలరా?" : "I'm here to help with your tender-related queries. Could you tell me more about what you need?")
        };

    } catch (e) {
        console.error("BidGPT Intelligent Analysis Error:", e);
        // Robust fallback logic
        const chatKeywords = ['hi', 'hello', 'hey', 'help', 'morning', 'greeting'];
        if (chatKeywords.some(k => q.includes(k))) {
            const greetMsg = targetLanguage === 'Telugu' ? "నమస్కారం! నేను బిడ్‌జిపిటి (BidGPT), మీ ప్రొఫెషనల్ టెండర్ కన్సల్టెంట్. నేను మీకు టెండర్లను కనుగొనడంలో లేదా బిడ్డింగ్ ప్రక్రియను అర్థం చేసుకోవడంలో సహాయపడగలను. నేను మీకు ఈ రోజు ఎలా సహాయపడగలను?" :
                targetLanguage === 'Hindi' ? "नमस्ते! मैं बिडजीपीटी (BidGPT) हूं, आपका पेशेवर निविदा सलाहकार। मैं निविदाएं खोजने या बोली लगाने की प्रक्रिया को समझने में आपकी मदद कर सकता हूं। मैं आपकी आज कैसे सहायता कर सकता हूं?" :
                    "Hi! I'm BidGPT, your professional tender consultant. I can help you find tenders or understand the bidding process. How can I assist you today?";
            return { type: 'chat', message: greetMsg };
        }
        return await extractSearchFilters(userQuery);
    }
}

// Helper to extract filters using AI
async function extractSearchFilters(userQuery) {
    const filterPrompt = `
        You are a Tender Search Engine.
        Convert the USER QUERY into a JSON object of search filters.
        
        FILTERS:
        - q: Key product/service words (e.g., "CCTV", "Manpower"). Remove words like "tender", "wanted".
        - state: Full state name if mentioned (e.g., "Maharashtra").
        - city: City name if mentioned.
        - category: Broad category if applicable.

        Example: "CCTV camera installation in Delhi" -> { "q": "CCTV camera installation", "state": "Delhi" }
        
        Return ONLY valid JSON.
    `;

    try {
        if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY missing");
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: filterPrompt },
                { role: 'user', content: userQuery }
            ],
            model: 'llama-3.3-70b-versatile',
            response_format: { type: 'json_object' }
        });
        const text = chatCompletion.choices[0].message.content;
        return { type: 'search', filters: JSON.parse(text) };
    } catch (e) {
        console.error("BidGPT Filter Extraction Error:", e);
        // Fallback: simple text search
        return { type: 'search', filters: { q: userQuery } };
    }
}

async function analyzeStructure(sampleText, portal, dbColumns = []) {
    if (!dbColumns || dbColumns.length === 0) {
        dbColumns = [
            "tender_id", "name_of_work", "tender_category", "tender_dept",
            "tender_qty", "tender_emd", "emd_exemption", "tender_ecv",
            "state_name", "location", "apply_mode", "source_site",
            "gemdoclink", "doclinks", "closing_date"
        ];
    }

    const prompt = `
        You are a Database Engineer / AI Architect.
        Your task is to analyze a sample file structure (CSV headers or data snippet) from a portal (${portal}) 
        and map its fields to our Internal Database Schema.

        SAMPLE DATA / HEADERS:
        """
        ${sampleText}
        """

        OUR DATABASE COLUMNS:
        ${JSON.stringify(dbColumns)}

        ASSIGNMENT RULES:
        1. Find the BEST MATCH from the Sample Data for EACH Database Column.
        2. If no match is found for a specific column, return null for that field.
        3. Consider synonyms (e.g., "Bid Number" -> "tender_id", "Description" -> "name_of_work", "Authority" -> "tender_dept").
        4. If the sample data is Global Tender, look for "country" or "currency" keywords too.

        Return ONLY a JSON object where keys are Our Database Columns and values are the mapped Source Headers.
    `;

    // 1. Primary: Groq
    try {
        if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY missing");
        console.log(`🧠 AI Smart Mapper: Using Groq Llama 3.3 70B (PRIMARY)...`);

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: "You are a Database Architect. Map provided portal headers to the internal schema. Return ONLY valid JSON." },
                { role: 'user', content: prompt }
            ],
            model: 'llama-3.3-70b-versatile',
            response_format: { type: 'json_object' }
        });
        const text = chatCompletion.choices[0].message.content;
        return JSON.parse(text);
    } catch (groqError) {
        console.warn('⚠️ Groq Structure Analysis Failed, trying Gemini...', groqError.message);

        // 2. Fallback: Gemini
        try {
            console.log(`🤖 Structure Analysis: Falling back to Gemini ${AI_MODEL}...`);
            const model = genAI.getGenerativeModel({ model: AI_MODEL });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
            return JSON.parse(text);
        } catch (geminiError) {
            console.error('❌ All Structure Analysis AI Models Failed:', geminiError.message);
            return null;
        }
    }
}

module.exports = {
    extractText,
    analyzeTender,
    askDocumentQuestion,
    validateResults,
    extractProgrammatically,
    translateWithAI,
    processBidGPTQuery,
    analyzeStructure
};
