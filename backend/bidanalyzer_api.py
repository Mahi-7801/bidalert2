import os
import json
import shutil
import time
import pdfplumber
from typing import Optional
from fastapi import FastAPI, File, UploadFile, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
import google.generativeai as genai
from deep_translator import GoogleTranslator
from concurrent.futures import ThreadPoolExecutor, as_completed
from fastapi.encoders import jsonable_encoder
from dotenv import load_dotenv
from html2image import Html2Image
from PIL import Image, ImageOps
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import inch

from fastapi.staticfiles import StaticFiles

from fastapi.exceptions import RequestValidationError
from fastapi.requests import Request

# 1. Setup & Config
load_dotenv()

app = FastAPI()

# Global Exception Handler for 422 Validation Errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    print(f"⚠️ Validation Error: {exc}")
    # Fix: access errors() or body directly carefully
    return JSONResponse(
        status_code=422,
        content={"detail": jsonable_encoder(exc.errors()), "body": str(exc.body) if hasattr(exc, 'body') else ""}
    )

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logger Middleware to debug incoming requests
@app.middleware("http")
async def log_requests(request, call_next):
    print(f"Incoming Request: {request.method} {request.url.path}")
    response = await call_next(request)
    print(f"Response Status: {response.status_code}")
    return response

# Parse multiple API keys
GEMINI_API_KEYS = [(k.strip()) for k in os.getenv("GEMINI_API_KEYS", "").split(",") if k.strip()]
if not GEMINI_API_KEYS:
    GEMINI_API_KEYS = [(os.getenv("GEMINI_API_KEY") or "").strip()]
GEMINI_API_KEYS = [k for k in GEMINI_API_KEYS if k]

# Rotation tracking
current_key_index = 0

def get_next_api_key():
    global current_key_index
    if not GEMINI_API_KEYS:
        return None
    key = GEMINI_API_KEYS[current_key_index]
    current_key_index = (current_key_index + 1) % len(GEMINI_API_KEYS)
    return key

# 2. Text Extraction
def extract_text_from_file_path(file_path: str):
    text_content = ""
    try:
        if file_path.endswith('.txt'):
             with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                 return f.read()

        with pdfplumber.open(file_path) as pdf:
            if not pdf.pages: return None
            # Limit to first 20 pages
            for i, page in enumerate(pdf.pages[:20]): 
                text = page.extract_text()
                if text: text_content += text + "\n"
        return text_content
    except Exception as e:
        print(f"Extraction Error: {e}")
        return None

# API ROUTES moved under /api
@app.post("/api/analyze")
async def analyze_document(
    file: UploadFile = File(...), 
    x_api_key: Optional[str] = Header(None)
):
    # Log that we hit the endpoint
    print(f"Analyzing file: {file.filename}")
    # 1. Determine API Key (Header > Env)
    api_key = (x_api_key or "").strip()
    if not api_key:
        api_key = get_next_api_key()

    if not api_key:
        raise HTTPException(
            status_code=400,
            detail="Gemini API Key missing. Provide X-API-Key or configure server key."
        )

    # 2. Save Upload Temporarily
    temp_filename = f"temp_{int(time.time())}_{file.filename}"
    try:
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        print(f"File saved to {temp_filename}")
        
        # 3. Hybrid Analysis with Key Rotation
        keys_to_try = GEMINI_API_KEYS.copy()
        if api_key in keys_to_try:
            # Move the specific key to the front if provided via header
            keys_to_try.remove(api_key)
            keys_to_try.insert(0, api_key)

        last_error = None
        for attempt_key in keys_to_try:
            try:
                print(f"🔄 Using API Key: {attempt_key[:10]}...")
                content_text = extract_text_from_file_path(temp_filename)
                
                if content_text and len(content_text.strip()) > 50:
                    print("Analyzing extracted text...")
                    analysis_result = analyze_with_gemini_text(content_text, attempt_key)
                    full_text_context = content_text
                else:
                    print("Analyzing file (upload)...")
                    analysis_result, full_text_context = analyze_with_gemini_file_v2(temp_filename, attempt_key)
                
                # If successful, return
                if os.path.exists(temp_filename):
                    try: os.remove(temp_filename)
                    except: pass
                
                if isinstance(analysis_result, dict):
                     analysis_result["_full_text_context"] = full_text_context
                return analysis_result

            except Exception as e:
                error_msg = str(e).lower()
                last_error = e
                if "429" in error_msg or "quota" in error_msg or "rate limit" in error_msg:
                    print(f"⚠️ Key {attempt_key[:10]} matched quota limit. Trying next key...")
                    continue
                else:
                    break

        # If we reached here, it means all keys failed or it was a non-429 error
        if os.path.exists(temp_filename):
            try: os.remove(temp_filename)
            except: pass
        
        print(f"❌ Analysis Failed after trying all keys: {last_error}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(last_error)}")

    except Exception as e:
        if os.path.exists(temp_filename):
            try: os.remove(temp_filename)
            except: pass
        if isinstance(e, HTTPException):
            raise e
        print(f"Analysis Failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

def analyze_with_gemini_file_v2(file_path, api_key):
    res = analyze_with_gemini_file(file_path, api_key)
    return res, "Text extraction failed or was skipped. Q&A limited to summary."

@app.post("/api/ask")
async def ask_question(
    data: dict,
    x_api_key: Optional[str] = Header(None)
):
    try:
        question = data.get("question")
        context = data.get("context") # This will now be the FULL TEXT string
        
        if not question or not context:
             raise HTTPException(status_code=400, detail="Missing question or context")

        # Determine API Key (Header > Env)
        api_key = (x_api_key or "").strip()
        if not api_key:
            api_key = get_next_api_key()

        if not api_key:
            raise HTTPException(
                status_code=400,
                detail="Gemini API Key missing. Provide X-API-Key or configure server key."
            )

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')
       # PROMPT
        prompt = f"""
        You are a helpful expert assistant for a government tender document.
        
        CONTEXT (Full Document Content):
        {context[:100000]}  # Safety Truncate to ~100k chars
        
        Question: {question}
        
        INSTRUCTION: Answer the question concisely using PLAIN TEXT ONLY. 
        - Do NOT use markdown (no asterisks, no bolding with **, no bullet points with *). 
        - Use simple clear paragraphs if needed.
        - If the answer is not in the context, say so gracefully.
        """
        
        response = model.generate_content(prompt)
        return {"answer": response.text}

    except Exception as e:
        print(f"Q&A Failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# 3. Gemini Analysis (Hybrid Text/File)
def analyze_with_gemini_text(text: str, api_key: str):
    genai.configure(api_key=api_key)

    generation_config = {
        "response_mime_type": "application/json",
        "temperature": 0.1,
    }

    model = genai.GenerativeModel(
        model_name='gemini-2.5-flash',
        generation_config=generation_config
    )

    prompt = """You are an expert Tender Analyst. Analyze the following tender document text and return ONLY a valid JSON object with these exact fields. No explanation, no markdown, no preamble — pure JSON only.

IMPORTANT:
- Use PLAIN TEXT for all string values (no **, no *, no #, no markdown).
- If a field is not present in the document, use the string "Not specified".
- Dates must be in DD-MM-YYYY format.

Return this JSON structure:
{
  "Executive_Summary": "A concise 3-4 sentence summary of the opportunity (max 60 words)",
  "Tender_Reference": "Reference number",
  "Issuing_Authority": "Name of the issuing organization",
  "Project_Name": "Title of the work",
  "Location": "City or State",
  "Scope_of_Work": "Main tasks and deliverables",
  "Contract_Period": "Duration of contract",
  "Technical_Specifications": "Key technical requirements",
  "Estimated_Value": "Contract value with currency",
  "EMD_Amount": "Earnest Money Deposit amount",
  "Tender_Fee": "Tender document fee",
  "Payment_Terms": "Payment structure",
  "Important_Dates": {
    "Bid_Submission_Deadline": "DD-MM-YYYY",
    "Bid_Opening_Date": "DD-MM-YYYY",
    "Pre_Bid_Meeting": "DD-MM-YYYY or Not specified"
  },
  "Eligibility": {
    "Min_Turnover": "Minimum annual turnover required",
    "Experience_Required": "Past experience requirements",
    "Other_Eligibility_Criteria": "Any other eligibility conditions"
  },
  "Required_Documents": ["Document 1", "Document 2"],
  "Submission_Method": "Online or offline submission details",
  "Contact_Details": "Contact email or phone"
}

Tender Document Text:
"""

    # Safety truncate
    safe_text = text[:80000]

    response = model.generate_content([prompt, safe_text])

    raw = getattr(response, 'text', '') or ''
    print(f"[Gemini text response length]: {len(raw)} chars")
    return clean_and_parse_json(raw)

def analyze_with_gemini_file(file_path: str, api_key: str):
    genai.configure(api_key=api_key)
    sample_file = genai.upload_file(path=file_path, display_name="Tender_Doc")

    while sample_file.state.name == "PROCESSING":
        time.sleep(1)
        sample_file = genai.get_file(sample_file.name)

    if sample_file.state.name == "FAILED":
        raise ValueError("Gemini failed to process the file upload.")

    generation_config = {
        "response_mime_type": "application/json",
        "temperature": 0.1,
    }

    model = genai.GenerativeModel(
        model_name='gemini-2.5-flash',
        generation_config=generation_config
    )

    prompt = """You are a senior Tender Analyst AI. Analyze this tender document and return ONLY a valid JSON object. No markdown, no preamble, no explanation — pure JSON.

Return this exact structure (use "Not specified" for missing fields, dates in DD-MM-YYYY):
{
  "Executive_Summary": "",
  "Tender_Reference": "",
  "Issuing_Authority": "",
  "Project_Name": "",
  "Location": "",
  "Estimated_Value": "",
  "EMD_Amount": "",
  "Tender_Fee": "",
  "Important_Dates": {"Bid_Submission_Deadline": "", "Bid_Opening_Date": "", "Pre_Bid_Meeting": ""},
  "Eligibility": {"Min_Turnover": "", "Experience_Required": "", "Other_Eligibility_Criteria": ""},
  "Scope_of_Work": "",
  "Contract_Period": "",
  "Payment_Terms": "",
  "Technical_Specifications": "",
  "Submission_Method": "",
  "Contact_Details": "",
  "Required_Documents": []
}"""

    response = model.generate_content([sample_file, prompt])
    raw = getattr(response, 'text', '') or ''
    print(f"[Gemini file response length]: {len(raw)} chars")
    return clean_and_parse_json(raw)

def clean_and_parse_json(text):
    if not text or not text.strip():
        print("⚠️ Gemini returned empty response — returning fallback JSON")
        return {
            "Executive_Summary": "Analysis could not be completed. The AI model returned an empty response.",
            "Tender_Reference": "N/A",
            "Issuing_Authority": "N/A",
            "Project_Name": "Analysis Failed — Please retry",
            "Location": "N/A",
            "Scope_of_Work": "N/A",
            "Contract_Period": "N/A",
            "Technical_Specifications": "N/A",
            "Estimated_Value": "N/A",
            "EMD_Amount": "N/A",
            "Tender_Fee": "N/A",
            "Payment_Terms": "N/A",
            "Important_Dates": {"Bid_Submission_Deadline": "N/A", "Bid_Opening_Date": "N/A", "Pre_Bid_Meeting": "N/A"},
            "Eligibility": {"Min_Turnover": "N/A", "Experience_Required": "N/A", "Other_Eligibility_Criteria": "N/A"},
            "Required_Documents": [],
            "Submission_Method": "N/A",
            "Contact_Details": "N/A"
        }
    clean = text.strip()
    # Strip markdown code fences
    if clean.startswith("```json"): clean = clean[7:]
    elif clean.startswith("```"): clean = clean[3:]
    if clean.endswith("```"): clean = clean[:-3]
    clean = clean.strip()
    try:
        return json.loads(clean)
    except json.JSONDecodeError:
        # Try to find a JSON object embedded in mixed text
        import re
        match = re.search(r'\{[\s\S]*\}', clean)
        if match:
            try:
                return json.loads(match.group(0))
            except json.JSONDecodeError:
                pass
        print(f"⚠️ Failed to parse Gemini response as JSON. Raw (first 300 chars): {clean[:300]}")
        raise

# Optimized Translation Helper
def recursive_translate(data, target_lang):
    translator = GoogleTranslator(source='auto', target=target_lang)
    
    if isinstance(data, dict):
        with ThreadPoolExecutor(max_workers=10) as executor:
            future_to_key = {
                executor.submit(recursive_translate, v, target_lang): k 
                for k, v in data.items()
            }
            results = {}
            for future in as_completed(future_to_key):
                key = future_to_key[future]
                try:
                    results[key] = future.result()
                except Exception:
                    results[key] = data[key]
            return results

    elif isinstance(data, list):
         with ThreadPoolExecutor(max_workers=5) as executor:
            futures = [executor.submit(recursive_translate, item, target_lang) for item in data]
            return [f.result() for f in futures]
            
    elif isinstance(data, str) and data.strip():
        try:
             return translator.translate(data[:4500])
        except:
             return data
    else:
        return data

@app.post("/api/translate")
async def translate_text(
    data: dict, 
):
    try:
        input_data = data.get("data")
        target_lang = data.get("target_lang", "hi")
        
        if not input_data:
            return {"translated_data": None}
            
        translated_data = recursive_translate(input_data, target_lang)
        return {"translated_data": translated_data}
    except Exception as e:
         print(f"Translation Error: {e}")
         raise HTTPException(status_code=500, detail=str(e))

def generate_formatted_html(data):
    # CSS
    full_css = """
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; padding: 40px; background-color: #ffffff; color: #1a202c; }
        .report-header { text-align: center; border-bottom: 4px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
        .report-header h1 { font-size: 2.5rem; margin: 0; color: #1a202c; }
        .section-title { background: #1a202c; color: #ffffff; padding: 10px 15px; font-size: 1.2rem; font-weight: 800; margin-top: 30px; margin-bottom: 15px; text-transform: uppercase; }
        .exec-summary { background: #f7fafc; padding: 20px; border-left: 5px solid #10b981; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background: #f7fafc; color: #4a5568; padding: 12px; text-align: left; font-size: 0.9rem; text-transform: uppercase; border: 1px solid #e2e8f0; width: 35%; }
        td { padding: 12px; border: 1px solid #e2e8f0; font-size: 1rem; font-weight: 500; }
    </style>
    """
    
    def make_row(label, value):
        if not value: return ""
        return f"<tr><th>{label}</th><td>{value}</td></tr>"

    dates_rows = ""
    if 'Important_Dates' in data and isinstance(data['Important_Dates'], dict):
        for k, v in data['Important_Dates'].items():
            dates_rows += make_row(k, v)
    
    html_content = f"""
    <html>
    <head>{full_css}</head>
    <body>
        <div class="report-header">
            <h1>Bid Analysis Report</h1>
            <p>Generated by BidAlert AI</p>
        </div>
        
        <div class="section-title">Executive Summary</div>
        <div class="exec-summary">
            <p>{data.get('Executive_Summary', '')}</p>
        </div>

        <div class="section-title">Basic Information</div>
        <table>
            {make_row('Tender Reference', data.get('Tender_Reference'))}
            {make_row('Issuing Authority', data.get('Issuing_Authority'))}
            {make_row('Project Name', data.get('Project_Name'))}
            {make_row('Location', data.get('Location'))}
        </table>

        <div class="section-title">Project Details</div>
        <table>
            {make_row('Scope of Work', data.get('Scope_of_Work'))}
            {make_row('Contract Period', data.get('Contract_Period'))}
            {make_row('Technical Specifications', data.get('Technical_Specifications'))}
        </table>

        <div class="section-title">Financials</div>
        <table>
            {make_row('Estimated Value', data.get('Estimated_Value'))}
            {make_row('EMD Amount', data.get('EMD_Amount'))}
            {make_row('Tender Fee', data.get('Tender_Fee'))}
            {make_row('Payment Terms', data.get('Payment_Terms'))}
        </table>

        <div class="section-title">Important Dates</div>
        <table>
            {dates_rows}
        </table>

        <div class="section-title">Eligibility</div>
        <table>
            {make_row('Min Turnover', data.get('Eligibility', {}).get('Min_Turnover'))}
            {make_row('Experience Required', data.get('Eligibility', {}).get('Experience_Required'))}
            {make_row('Other Eligibility', data.get('Eligibility', {}).get('Other_Eligibility_Criteria'))}
            {make_row('Required Documents', ", ".join(data.get('Required_Documents', [])) if isinstance(data.get('Required_Documents'), list) else data.get('Required_Documents'))}
        </table>
    </body>
    </html>
    """
    return html_content

@app.post("/api/generate-pdf")
async def generate_pdf(
    data: dict, 
):
    import tempfile
    import platform

    html_path = None
    png_path = None
    output_path = None

    try:
        report_data = data.get("data")
        if not report_data:
            raise HTTPException(status_code=400, detail="No data provided")
             
        html_content = generate_formatted_html(report_data)
        
        # Use system temp dir — works on Windows AND Linux/Mac
        temp_dir = tempfile.gettempdir()
        timestamp = int(time.time())

        # Step 1: Write HTML to a real temp file
        html_filename = f"bid_report_{timestamp}.html"
        html_path = os.path.join(temp_dir, html_filename)
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html_content)

        # Step 2: Build a proper file:// URL so Chrome loads OUR file (not its startup page)
        if platform.system() == "Windows":
            # Windows needs forward slashes in file:// URLs
            file_url = "file:///" + html_path.replace("\\", "/")
        else:
            file_url = "file://" + html_path

        print(f"Rendering HTML from: {file_url}")

        # Step 3: Auto-detect Chrome/Chromium binary (Windows vs Linux VPS)
        chrome_path = None
        if platform.system() == "Windows":
            # Common Windows Chrome locations
            candidates = [
                r"C:\Program Files\Google\Chrome\Application\chrome.exe",
                r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
                os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"),
            ]
            for c in candidates:
                if os.path.exists(c):
                    chrome_path = c
                    break
        else:
            # Linux VPS: check common Chromium/Chrome binary names
            import shutil
            for binary in ["chromium-browser", "chromium", "google-chrome-stable", "google-chrome"]:
                found = shutil.which(binary)
                if found:
                    chrome_path = found
                    break
            # Required for headless Linux (no display server)
            os.environ.setdefault("DISPLAY", ":99")

        print(f"Using Chrome binary: {chrome_path or 'auto-detect by html2image'}")

        # Step 4: Screenshot with html2image using URL (not html_str)
        output_png = f"bid_report_{timestamp}.png"
        png_path = os.path.join(temp_dir, output_png)

        hti_kwargs = dict(
            output_path=temp_dir,
            size=(1240, 5000),  # Extra tall to capture full content
            custom_flags=[
                '--no-sandbox',             # Required on VPS/Docker (no root sandbox)
                '--disable-gpu',
                '--headless=new',           # Modern headless mode
                '--disable-dev-shm-usage',  # Prevents crashes in Docker/limited /dev/shm
                '--disable-extensions',
                '--no-first-run',
                '--no-default-browser-check',
                '--disable-default-apps',
                '--disable-popup-blocking',
                '--disable-translate',
                '--hide-scrollbars',
                '--window-size=1240,5000',
            ]
        )
        if chrome_path:
            hti_kwargs['browser_executable'] = chrome_path

        hti = Html2Image(**hti_kwargs)

        # Use url= to force Chrome to load our specific HTML file
        hti.screenshot(url=file_url, save_as=output_png)


        if not os.path.exists(png_path):
            raise HTTPException(status_code=500, detail="html2image screenshot failed — Chrome may not be installed or accessible.")

        # Step 4: Convert PNG → PDF using Pillow
        output_pdf = f"bid_report_{timestamp}.pdf"
        output_path = os.path.join(temp_dir, output_pdf)

        image = Image.open(png_path)
        if image.mode == 'RGBA':
            image = image.convert('RGB')
        
        # Auto-crop bottom whitespace for cleaner PDF
        bbox = ImageOps.invert(image).getbbox()
        if bbox:
            image = image.crop((0, 0, image.width, min(bbox[3] + 100, image.height)))

        image.save(output_path, "PDF", resolution=150.0)

        print(f"PDF generated: {output_path}")
        
        return FileResponse(
            output_path, 
            media_type='application/pdf', 
            filename=f"BidAlert_Analysis_{timestamp}.pdf"
        )

    except Exception as e:
        print(f"PDF Gen Error: {e}")
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(e)}")

    finally:
        # Clean up temp HTML and PNG (keep PDF until response is sent)
        for f in [html_path, png_path]:
            if f and os.path.exists(f):
                try:
                    os.remove(f)
                except:
                    pass



@app.get("/health")
def health_check():
    return {"status": "ok", "service": "BidAnalyzer Pro API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
