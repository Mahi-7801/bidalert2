'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, AlertCircle, Search, Sparkles, Wand2, Calculator, Calendar, ScrollText, IndianRupee, Languages, Loader2, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import axios from 'axios';

export default function UploadPage() {
    const { isAuthenticated, user, isLoading } = useAuth();
    const proPlans = ['basic', 'standard', 'diamond', 'premium'];
    const isProPlan = (user?.plan_type && proPlans.includes(user.plan_type.toLowerCase())) || user?.role === 'admin';
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [targetLanguage, setTargetLanguage] = useState<string>('English');
    const [isTranslating, setIsTranslating] = useState(false);
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
    const [userQuestion, setUserQuestion] = useState('');
    const [qaHistory, setQaHistory] = useState<{ question: string; answer: string }[]>([]);
    const [isAsking, setIsAsking] = useState(false);

    const isValidValue = (val: any) => {
        if (!val) return false;
        const s = String(val).trim().toLowerCase();
        return !['not specified', 'not listed', 'n/a', 'null', 'undefined', 'information not found in document', 'information not found in document.', 'not mentioned', 'not required', 'no', 'none', 'not applicable', 'not requested'].includes(s);
    };

    const uiTranslations: any = {
        'Hindi': {
            'Stakeholder Details': 'हितधारक विवरण',
            'Financial Requirements': 'वित्तीय आवश्यकताएं',
            'Submission Timeline': 'जಮಾ ಮಾಡುವ ಸಮಯ ಪಟ್ಟಿ',
            'Eligibility & Preference': 'पात्रता और वरीयता',
            'Save PDF': 'पीडीएफ सहेजें',
            'Status: Successfully Analyzed': 'स्थिति: सफलतापूर्वक विश्लेषण किया गया',
            'Executive Summary': 'कार्यकारी सारांश',
            'Project Details': 'परियोजना विवरण',
            'Generating...': 'जनरेट हो रहा है...',
        },
        'Telugu': {
            'Stakeholder Details': 'స్టేక్ హోల్డర్ వివరాలు',
            'Financial Requirements': 'ఆర్థిక అవసరాలు',
            'Submission Timeline': 'సమర్పణ కాలక్రమం',
            'Eligibility & Preference': 'అర్హత మరియు ప్రాధాన్యత',
            'Save PDF': 'పీడీఎఫ్ సేవ్ చేయండి',
            'Status: Successfully Analyzed': 'స్థితి: విజయవంతంగా విశ్లేషించబడింది',
            'Executive Summary': 'కార్యనిర్వాహక సారాంశం',
            'Project Details': 'ప్రాజెక్ట్ వివరాలు',
            'Generating...': 'జనరేట్ అవుతోంది...',
        },
        'Kannada': {
            'Stakeholder Details': 'ಆಸಕ್ತಿದಾರರ ವಿವರಗಳು',
            'Financial Requirements': 'ಹಣಕಾಸಿನ ಅಗತ್ಯತೆಗಳು',
            'Submission Timeline': 'ಸಲ್ಲಿಸುವ ಸಮಯ',
            'Eligibility & Preference': 'ಅರ್ಹತೆ ಮತ್ತು ಆದ್ಯತೆ',
            'Save PDF': 'PDF ಉಳಿಸಿ',
            'Status: Successfully Analyzed': 'ಸ್ಥಿತಿ: ಯಶಸ್ವಿಯಾಗಿ ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ',
            'Executive Summary': 'ಕಾರ್ಯನಿರ್ವಾಹಕ ಸಾರಾಂಶ',
            'Project Details': 'ಯೋಜನೆ ವಿವರಗಳು',
            'Generating...': 'ಜನರೇಟ್ ಆಗುತ್ತಿದೆ...',
        },
    };

    const t = (label: string) => {
        if (!targetLanguage || targetLanguage === 'English') return label;
        return uiTranslations[targetLanguage]?.[label] || label;
    };

    const stripMarkdown = (text: any) => {
        if (!text) return '';
        const str = typeof text === 'string' ? text : String(text);
        return str.replace(/\*\*/g, '').replace(/^\s*\*\s+/gm, '\u2022 ').replace(/\*/g, '').trim();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(10);
        setError(null);

        const formData = new FormData();
        formData.append('document', file);

        try {
            const interval = setInterval(() => {
                setUploadProgress(prev => (prev < 90 ? prev + 10 : prev));
            }, 800);

            const response = await axios.post('/api/analyze-tender', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            clearInterval(interval);
            setUploadProgress(100);

            if (response.data.success) {
                setAnalysisResult(response.data.analysis);
                setIsComplete(true);
            } else {
                setError(response.data.error || 'Analysis failed. Please try again.');
            }
        } catch (err: any) {
            console.error('Upload error:', err);
            setError(err.response?.data?.error || 'An error occurred during analysis.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleAskQuestion = async () => {
        if (!userQuestion.trim()) return;
        setIsAsking(true);
        try {
            const response = await axios.post('/api/ask-tender', {
                question: userQuestion,
                context: JSON.stringify(analysisResult)
            });
            if (response.data.success) {
                setQaHistory([...qaHistory, { question: userQuestion, answer: response.data.answer }]);
                setUserQuestion('');
            }
        } catch (err) {
            console.error('QA error:', err);
        } finally {
            setIsAsking(false);
        }
    };

    const handleDownloadPDF = async () => {
        setIsDownloadingPdf(true);
        try {
            // @ts-ignore
            const html2pdf = (await import('html2pdf.js')).default;
            const element = document.getElementById('analysis-report');
            if (!element) return;
            window.scrollTo({ top: 0, behavior: 'instant' });
            const filename = `BidAlert_${analysisResult?.Tender_Reference || 'Report'}_${Date.now()}.pdf`;
            const rect = element.getBoundingClientRect();
            const widthInInches = 8.27; 
            const heightInInches = (rect.height / 96) + 0.8; 
            const opt = {
                margin: [0.2, 0.2, 0.2, 0.2], 
                filename: filename,
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { 
                    scale: 2.5, 
                    useCORS: true,
                    letterRendering: true,
                    backgroundColor: '#ffffff',
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: 1200, 
                    logging: false
                },
                jsPDF: { 
                    unit: 'in', 
                    format: [widthInInches, heightInInches], 
                    orientation: 'portrait',
                    compress: true
                },
                pagebreak: { mode: ['avoid-all'] }
            };
            await html2pdf().set(opt).from(element).save();
        } catch (err) {
            console.error('PDF generation failed:', err);
            alert('PDF generation failed. Please try again.');
        } finally {
            setIsDownloadingPdf(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            {/* Hero Header */}
            <div className="relative bg-white border-b border-gray-100 overflow-hidden">
                <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-bid-green/10 border border-bid-green/20 text-bid-green px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-black tracking-[0.2em] mb-4 sm:mb-6 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-bid-green" />
                            AI-DRIVEN BID EXTRACTION
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight leading-[1.1]">
                            <span className="font-extrabold text-bid-dark/90">Smart Tender</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bid-green via-emerald-600 to-teal-600 drop-shadow-sm">
                                Document Analyzer
                            </span>
                        </h1>
                        <p className="text-sm sm:text-xl text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
                            Transform complex tender documents into actionable insights instantly with our next-gen AI processing engine.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-bid-green rounded-full animate-pulse" />
                                <span className="font-bold">100% Free</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                                <span className="font-bold">Instant Results</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                                <span className="font-bold">Multi-Language Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 pb-16 relative z-20">
                {!isComplete ? (
                    <div className="w-full">
                        {isLoading ? (
                            <div className="bg-white rounded-[2rem] p-20 shadow-xl border border-gray-100 flex flex-col items-center justify-center space-y-4">
                                <Loader2 className="w-10 h-10 text-bid-green animate-spin" />
                                <p className="text-slate-400 font-bold animate-pulse text-xs uppercase tracking-widest">Verifying Intelligence Access...</p>
                            </div>
                        ) : !isProPlan ? (
                            <>
                                {/* Standard Panel - Shown ONLY to free users */}
                                <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden flex flex-col h-full">
                                    {/* Integrated Upgrade Banner */}
                                    <Link 
                                        href="/plans?callbackUrl=/upload"
                                        className="mb-8 group flex items-center justify-between p-4 bg-bid-green/5 hover:bg-bid-green/10 border border-bid-green/20 rounded-2xl transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-bid-green/20 flex items-center justify-center">
                                                <Zap className="w-4 h-4 text-bid-green" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase tracking-[0.1em] text-bid-green">Pro Feature Available</span>
                                                <span className="text-xs font-bold text-bid-dark">Upgrade for AI Bid Analysis Pro</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-bid-green group-hover:translate-x-1 transition-transform" />
                                    </Link>

                                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] -mr-8 -mt-8">
                                        <Sparkles className="w-64 h-64 text-bid-dark" />
                                    </div>
                                    <div className="mb-8 relative z-10 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-bid-dark/5 flex items-center justify-center border border-bid-dark/10">
                                            <FileText className="w-6 h-6 text-bid-dark" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-bid-dark leading-none mb-1">Standard Analysis</h3>
                                            <p className="text-[11px] text-bid-green font-black uppercase tracking-[0.15em]">Quick & Precise Extraction</p>
                                        </div>
                                    </div>
                                    <form onSubmit={handleUpload} className="relative z-10 flex-1 flex flex-col">
                                        {/* Drop Zone */}
                                        <div className={`border-2 border-dashed rounded-[1.5rem] p-8 text-center transition-all cursor-pointer group mb-6 relative flex-1 flex flex-col items-center justify-center ${file ? 'border-bid-green bg-bid-green/5' : 'border-gray-200 hover:border-bid-green hover:bg-gray-50'}`}>
                                            <input
                                                type="file"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx,.txt"
                                            />
                                            <div className="flex flex-col items-center">
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border transition-all shadow-sm ${file ? 'bg-bid-green border-bid-green scale-110' : 'bg-white border-gray-100 group-hover:scale-110'}`}>
                                                    {file ? <FileText className="w-8 h-8 text-white" /> : <Upload className="w-8 h-8 text-gray-400 group-hover:text-bid-green" />}
                                                </div>
                                                <h3 className="text-lg font-black text-bid-dark mb-1 tracking-tight">
                                                    {file ? file.name : 'Choose Tenders File'}
                                                </h3>
                                                <p className="text-gray-500 font-bold text-xs mb-4">
                                                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Drop your PDF here or click to browse'}
                                                </p>
                                                {!file && (
                                                    <div className="flex gap-2">
                                                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[9px] uppercase font-black tracking-widest text-gray-400 border border-gray-200">PDF</span>
                                                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[9px] uppercase font-black tracking-widest text-gray-400 border border-gray-200">DOCX</span>
                                                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[9px] uppercase font-black tracking-widest text-gray-400 border border-gray-200">TXT</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Error Display */}
                                        {error && (
                                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-bold animate-shake">
                                                <AlertCircle className="w-5 h-5" />
                                                {error}
                                            </div>
                                        )}

                                        {/* Progress Bar */}
                                        {isUploading && (
                                            <div className="mb-8 space-y-3">
                                                <div className="flex justify-between items-center text-sm font-bold text-bid-dark">
                                                    <span className="flex items-center gap-2">
                                                        <Wand2 className="w-4 h-4 text-bid-green animate-spin" />
                                                        Scanning patterns...
                                                    </span>
                                                    <span className="bg-bid-dark text-white px-2 py-0.5 rounded text-[10px]">{uploadProgress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="bg-bid-green h-full transition-all duration-300 rounded-full"
                                                        style={{ width: `${uploadProgress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={!file || isUploading}
                                            className={`w-full py-4 rounded-2xl text-base font-black transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center gap-3 ${!file || isUploading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-bid-dark text-white hover:bg-bid-green hover:text-bid-dark'}`}
                                        >
                                            {isUploading ? (
                                                <>Processing...</>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-5 h-5" />
                                                    Analyze Document
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            /* Pro Panel - ONLY SHOWN AFTER PAYMENT/ADMIN */
                            <div className="bg-[#050B14] rounded-[2rem] p-1.5 shadow-2xl relative overflow-hidden group flex flex-col h-full max-w-2xl mx-auto w-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-bid-green/10 via-transparent to-blue-500/10 opacity-30"></div>
                                <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12">
                                    <Zap className="w-64 h-64 text-bid-green" />
                                </div>
                                
                                <div className="relative z-10 p-8 md:p-10 flex flex-col h-full bg-[#050B14]/80 backdrop-blur-sm rounded-[1.8rem]">
                                    <div className="mb-10">
                                        <div className="inline-flex items-center gap-1.5 bg-bid-green text-bid-dark px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] mb-6 shadow-[0_0_25px_rgba(74,222,128,0.4)]">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            PRO FEATURE ACTIVE
                                        </div>
                                        <h3 className="text-4xl font-black text-white mb-3 leading-[1.1] tracking-tight">
                                            Advanced Bid <br/>
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bid-green to-emerald-400">Analysis Pro</span>
                                        </h3>
                                        <div className="h-1 w-20 bg-bid-green/40 rounded-full mb-4"></div>
                                        <p className="text-sm text-gray-400 font-bold tracking-wide">Deep intelligence for serious bidders & enterprises</p>
                                    </div>

                                    <div className="space-y-5 mb-10 flex-1">
                                        {[
                                            { text: 'Smart Compliance Matrix', desc: 'Auto-verify technical requirements' },
                                            { text: 'Risk Scoring Engine', desc: 'Identify hidden project pitfalls' },
                                            { text: 'Competitive Benchmarking', desc: 'Compare against similar past bids' },
                                            { text: 'Price Optimization AI', desc: 'Get guidance on estimated values' },
                                            { text: 'Pro Analysis Suite', desc: 'Enhanced deep-scanning models' }
                                        ].map((feat, i) => (
                                            <div key={i} className="flex gap-4 group/item">
                                                <div className="w-6 h-6 rounded-lg bg-bid-green/10 flex items-center justify-center shrink-0 border border-bid-green/20 group-hover/item:bg-bid-green/20 transition-colors">
                                                    <ArrowRight className="w-3.5 h-3.5 text-bid-green" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white text-sm font-black tracking-tight">{feat.text}</h4>
                                                    <p className="text-gray-500 text-[11px] font-bold">{feat.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Link 
                                        href={'https://bidalertindia-bidanalyzer-pro.hf.space/'}
                                        className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden bg-bid-green text-bid-dark shadow-[0_10px_30px_rgba(74,222,128,0.2)] hover:shadow-[0_15px_40px_rgba(74,222,128,0.4)] hover:-translate-y-1 group/btn`}
                                    >
                                        <div className="flex items-center gap-2 relative z-10">
                                            <Zap className="w-5 h-5 fill-current" />
                                            <span className="font-black uppercase tracking-widest text-sm">Launch Pro Analyzer</span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                                    </Link>
                                    
                                    <p className="text-center text-[10px] text-gray-500 font-bold mt-4 uppercase tracking-[0.1em]">
                                        {user?.role === 'admin' ? 'Admin Access Active' : 'Premium Subscription Active'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* ====== ANALYSIS RESULTS ====== */
                    <AnimatePresence mode="wait">
                        {isComplete && analysisResult && (
                            <motion.div
                                id="analysis-report"
                                // @ts-ignore
                                initial={{ opacity: 0, y: 20 }}
                                // @ts-ignore
                                animate={{ opacity: 1, y: 0 }}
                                // @ts-ignore
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="page-container no-break space-y-6"
                            >
                                {/* Summary Header Card */}
                                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
                                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 mb-8 pb-8 border-b border-gray-50">
                                        {/* Title Section */}
                                        <div className="flex items-start gap-4 min-w-0">
                                            <div className="w-14 h-14 bg-bid-green/10 rounded-2xl flex items-center justify-center border border-bid-green/20 flex-shrink-0">
                                                <FileText className="w-7 h-7 text-bid-greenhover" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h2 className="text-2xl sm:text-4xl font-black text-bid-dark leading-[1.1] mb-3 break-words tracking-tight">
                                                    {analysisResult.Project_Name || 'Tender Analysis'}
                                                </h2>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="bg-bid-dark text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] border border-white/10 shadow-sm">
                                                        REF: {analysisResult.Tender_Reference || 'N/A'}
                                                    </span>
                                                    <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] shadow-sm">
                                                        {t('Status: Successfully Analyzed')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions Section */}
                                        <div className="flex flex-col items-end gap-3 relative z-20" data-html2canvas-ignore>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleDownloadPDF}
                                                    disabled={isDownloadingPdf}
                                                    className={`bg-bid-dark text-white px-5 py-2.5 rounded-xl font-black transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 text-xs ${isDownloadingPdf ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                >
                                                    {isDownloadingPdf ? <Loader2 className="w-4 h-4 animate-spin text-bid-green" /> : <FileText className="w-4 h-4 text-bid-green" />}
                                                    <span className="uppercase tracking-wider">
                                                        {isDownloadingPdf ? t('Generating...') : t('Save PDF')}
                                                    </span>
                                                </button>
                                            </div>

                                            {/* Translation Select */}
                                            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                                                {isTranslating ? (
                                                    <Loader2 className="w-4 h-4 text-bid-green ml-2 animate-spin" />
                                                ) : (
                                                    <Languages className="w-4 h-4 text-gray-400 ml-2" />
                                                )}
                                                <select
                                                    value={targetLanguage}
                                                    disabled={isTranslating}
                                                    onChange={async (e) => {
                                                        const lang = e.target.value;
                                                        setTargetLanguage(lang);
                                                        setIsTranslating(true);
                                                        try {
                                                            const res = await axios.post('/api/translate-result', { json: analysisResult, targetLanguage: lang });
                                                            if (res.data.success) setAnalysisResult(res.data.translated);
                                                        } catch (err) {
                                                            console.error('Translation failed', err);
                                                            alert('Translation failed. Please try again.');
                                                        } finally {
                                                            setIsTranslating(false);
                                                        }
                                                    }}
                                                    className={`bg-transparent text-xs font-bold text-gray-600 focus:outline-none cursor-pointer max-w-[140px] ${isTranslating ? 'opacity-50' : ''}`}
                                                >
                                                    <option value="English">English</option>
                                                    <optgroup label="Indian Languages">
                                                        <option value="Hindi">Hindi (हिंदी)</option>
                                                        <option value="Telugu">Telugu (తెలుగు)</option>
                                                        <option value="Tamil">Tamil (தமிழ்)</option>
                                                        <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                                                        <option value="Malayalam">Malayalam (മലയാളం)</option>
                                                        <option value="Marathi">Marathi (ಮರಾठी)</option>
                                                        <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                                                        <option value="Bengali">Bengali (বাংলা)</option>
                                                        <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                                                        <option value="Urdu">Urdu (اردو)</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Executive Summary */}
                                    {isValidValue(analysisResult.Executive_Summary) && (
                                        <div className="bg-gradient-to-r from-bid-dark to-gray-900 rounded-2xl p-6 text-white relative">
                                            <h3 className="text-xs font-black uppercase tracking-widest mb-3 text-bid-green flex items-center gap-2">
                                                <Sparkles className="w-4 h-4" />
                                                {t('Executive Summary')}
                                            </h3>
                                            <p className="text-base font-bold leading-relaxed opacity-90">
                                                {analysisResult.Executive_Summary}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Two-Column Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Column */}
                                    <div className="lg:col-span-2 space-y-6">
                                        {/* Stakeholder Details */}
                                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                            <h3 className="text-sm font-black text-bid-dark mb-5 flex items-center gap-2.5 uppercase tracking-[0.1em] border-l-4 border-bid-green pl-4">
                                                <Search className="w-4 h-4 text-bid-green" />
                                                {t('Stakeholder Details')}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                                                {[
                                                    { label: 'Issuing Authority', value: analysisResult.Issuing_Authority },
                                                    { label: 'Location', value: analysisResult.Location },
                                                    { label: 'Contact Details', value: analysisResult.Contact_Details, full: true },
                                                ].filter((item) => isValidValue(item.value)).map((item, i) => (
                                                    <div key={i} className={item.full ? 'md:col-span-2 pt-4 border-t border-gray-100' : ''}>
                                                        <p className="text-[10px] font-black uppercase mb-1 tracking-widest text-gray-400">{item.label}</p>
                                                        <p className="text-gray-800 font-bold">{item.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Project Details */}
                                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                            <h3 className="text-sm font-black text-bid-dark mb-5 flex items-center gap-2.5 uppercase tracking-[0.1em] border-l-4 border-bid-green pl-4">
                                                <ScrollText className="w-4 h-4 text-bid-green" />
                                                {t('Project Details')}
                                            </h3>
                                            <div className="space-y-5">
                                                {[
                                                    { label: 'Scope of Work', value: analysisResult.Scope_of_Work },
                                                    { label: 'Contract Period', value: analysisResult.Contract_Period },
                                                    { label: 'Technical Specifications', value: analysisResult.Technical_Specifications },
                                                ].filter((item) => isValidValue(item.value)).map((item, i) => (
                                                    <div key={i} className={i !== 0 ? 'pt-5 border-t border-gray-50' : ''}>
                                                        <p className="text-[10px] font-black uppercase mb-2 tracking-widest text-bid-green">{item.label}</p>
                                                        <div className="text-gray-700 font-medium leading-relaxed whitespace-pre-line text-sm">{item.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Financial Requirements */}
                                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                            <h3 className="text-sm font-black text-bid-dark mb-5 flex items-center gap-2.5 uppercase tracking-[0.1em] border-l-4 border-bid-green pl-4">
                                                <IndianRupee className="w-4 h-4 text-bid-green" />
                                                {t('Financial Requirements')}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {[
                                                    { label: 'Estimated Value', value: analysisResult.Estimated_Value, icon: IndianRupee },
                                                    { label: 'EMD Amount', value: analysisResult.EMD_Amount, icon: IndianRupee },
                                                    { label: 'Tender Fee', value: analysisResult.Tender_Fee, icon: IndianRupee },
                                                    { label: 'Payment Terms', value: analysisResult.Payment_Terms, icon: Calculator },
                                                ].filter((item) => isValidValue(item.value)).map((item, i) => (
                                                    <div key={i} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex items-start gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                                            <item.icon className="w-5 h-5 text-bid-green" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase mb-1 tracking-widest text-gray-400">{item.label}</p>
                                                            <p className="text-gray-800 font-black">{item.value}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        {/* Critical Timeline */}
                                        <div className="bg-bid-dark rounded-[2rem] p-7 text-white shadow-2xl relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                                <Calendar className="w-32 h-32" />
                                            </div>
                                            <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-bid-green relative z-10">
                                                {t('Submission Timeline')}
                                            </h3>
                                            <div className="space-y-6 relative z-10">
                                                {[
                                                    { label: 'Submission Deadline', value: analysisResult.Important_Dates?.Bid_Submission_Deadline, pulse: true },
                                                    { label: 'Opening Date', value: analysisResult.Important_Dates?.Bid_Opening_Date },
                                                    { label: 'Pre-Bid Meeting', value: analysisResult.Important_Dates?.Pre_Bid_Meeting },
                                                    { label: 'Submission Method', value: analysisResult.Submission_Method, green: true },
                                                ].filter((item) => isValidValue(item.value)).map((item, i) => (
                                                    <div key={i} className={i !== 0 ? 'pt-6 border-t border-white/10' : ''}>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            {item.pulse && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{item.label}</p>
                                                        </div>
                                                        <p className={`font-black text-lg ${item.green ? 'text-bid-green' : 'text-white'}`}>{item.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Eligibility */}
                                        <div className="bg-white rounded-[2rem] p-7 border border-gray-100 shadow-sm">
                                            <h3 className="text-sm font-black text-bid-dark uppercase tracking-widest mb-5 flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-orange-400" />
                                                {t('Eligibility & Preference')}
                                            </h3>
                                            <div className="space-y-5">
                                                {[
                                                    { label: 'Min Turnover', value: analysisResult.Eligibility?.Min_Turnover },
                                                    { label: 'Experience Required', value: analysisResult.Eligibility?.Experience_Required },
                                                    { label: 'Other Criteria', value: analysisResult.Eligibility?.Other_Eligibility_Criteria },
                                                    { label: 'Required Documents', value: Array.isArray(analysisResult.Required_Documents) ? analysisResult.Required_Documents.join(', ') : analysisResult.Required_Documents },
                                                ].filter((item) => isValidValue(item.value)).map((item, i) => (
                                                    <div key={i} className={i !== 0 ? 'pt-5 border-t border-gray-50' : ''}>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">{item.label}</p>
                                                        <p className="text-gray-800 font-bold text-sm leading-relaxed whitespace-pre-line">{stripMarkdown(item.value)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Q&A Section */}
                                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden" data-html2canvas-ignore>
                                    <div className="absolute -right-10 -top-10 pointer-events-none">
                                        <Sparkles className="w-64 h-64 text-bid-green opacity-5" />
                                    </div>
                                    <h3 className="text-xl font-black text-bid-dark mb-6 flex items-center gap-2 relative z-10">
                                        Document Q&A Assistant (Gemini 2.5 Flash)
                                    </h3>

                                    {qaHistory.length > 0 && (
                                        <div className="bg-gray-50 rounded-2xl p-6 space-y-4 max-h-96 overflow-y-auto mb-6">
                                            {qaHistory.map((item, index) => (
                                                <div key={index} className="space-y-2">
                                                    <div className="flex justify-end">
                                                        <span className="bg-bid-dark text-white px-4 py-2 rounded-xl rounded-tr-none text-sm font-medium max-w-[85%]">
                                                            {item.question}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-start">
                                                        <div className="bg-white border border-gray-200 px-4 py-3 rounded-xl rounded-tl-none text-sm text-gray-700 shadow-sm leading-relaxed max-w-[90%] whitespace-pre-line">
                                                            {stripMarkdown(item.answer)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={userQuestion}
                                            onChange={(e) => setUserQuestion(e.target.value)}
                                            placeholder="Ask specific questions about this tender..."
                                            className="flex-1 p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-bid-green focus:ring-4 focus:ring-bid-green/10 transition-all font-medium text-gray-700 placeholder-gray-400"
                                            onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                                        />
                                        <button
                                            onClick={handleAskQuestion}
                                            disabled={isAsking || !userQuestion.trim()}
                                            className={`px-6 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${isAsking || !userQuestion.trim() ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-bid-green text-bid-dark hover:bg-bid-green/90 shadow-lg'}`}
                                        >
                                            {isAsking ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                                            Ask AI
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
