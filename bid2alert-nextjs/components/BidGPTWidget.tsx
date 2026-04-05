'use client';

import { useState, useEffect } from 'react';
import { Sparkles, X, Send } from 'lucide-react';

export default function BidGPTWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState('English');
    const [messages, setMessages] = useState<any[]>([]);

    const uiTranslations: any = {
        English: {
            title: "BidGPT Assistant",
            poweredBy: "Powered by AI",
            initial: "Hi 👋\nHow can I help you find tenders today?",
            askBidGPT: "Ask BidGPT",
            placeholder: "Type your query...",
            details: "Details →",
            seeAll: "See all results →",
            errorProcess: "I couldn't process that request. Please try again.",
            errorConnect: "Sorry, I'm having trouble connecting to the server. Please try again later."
        },
        Telugu: {
            title: "బిడ్‌జిపిటి సహాయకుడు",
            poweredBy: "AI ద్వారా ఆధారితం",
            initial: "నమస్కారం 👋\nమీరు ఈరోజు టెండర్లను కనుగొనడంలో నేను ఎలా సహాయపడగలను?",
            askBidGPT: "బిడ్‌జిపిటిని అడగండి",
            placeholder: "మీ ప్రశ్నను టైప్ చేయండి...",
            details: "వివరాలు →",
            seeAll: "అన్ని ఫలితాలను చూడండి →",
            errorProcess: "నేను ఆ అభ్యర్థనను ప్రాసెస్ చేయలేకపోయాను. దయచేసి మళ్ళీ ప్రయత్నించండి.",
            errorConnect: "క్షమించండి, సర్వర్‌కు కనెక్ట్ చేయడంలో సమస్య ఉంది. దయచేసి కాసేపటి తర్వాత మళ్ళీ ప్రయత్నించండి."
        },
        Hindi: {
            title: "बिडजीपीटी सहायक",
            poweredBy: "AI द्वारा संचालित",
            initial: "नमस्ते 👋\nमैं आज आपको निविदाएं खोजने में कैसे मदद कर सकता हूं?",
            askBidGPT: "बिडजीपीटी से पूछें",
            placeholder: "अपनी क्वेरी टाइप करें...",
            details: "विवरण →",
            seeAll: "सभी परिणाम देखें देखें →",
            errorProcess: "मैं उस अनुरोध को संसाधित नहीं कर सका। कृपया पुनः प्रयास करें।",
            errorConnect: "क्षमा करें, मुझे सर्वर से कनेक्ट करने में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें।"
        }
    };

    const getT = (key: string) => {
        return uiTranslations[language]?.[key] || uiTranslations["English"][key];
    };

    useEffect(() => {
        // Only auto-update greeting if user hasn't sent any messages yet
        const hasUserMessage = messages.some(m => m.type === 'user');
        if (!hasUserMessage) {
            setMessages([
                {
                    type: 'bot',
                    text: getT('initial')
                }
            ]);
        }
    }, [language]);
    const [sessionId, setSessionId] = useState<string>('');
    const [input, setInput] = useState('');
    const [showLangMenu, setShowLangMenu] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-bidgpt', handleOpen);

        // Manage Session ID
        let sid = localStorage.getItem('bidgpt_session_id');
        if (!sid) {
            sid = 'sid_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('bidgpt_session_id', sid);
        }
        setSessionId(sid);

        return () => window.removeEventListener('open-bidgpt', handleOpen);
    }, []);

    const languages = [
        { code: 'en', name: 'English', label: '🇬🇧 English' },
        { code: 'hi', name: 'Hindi', label: '🇮🇳 हिन्दी' },
        { code: 'gu', name: 'Gujarati', label: '🇮🇳 ગુજરાતી' },
        { code: 'mr', name: 'Marathi', label: '🇮🇳 मराठी' },
        { code: 'bn', name: 'Bengali', label: '🇮🇳 বাংলা' },
        { code: 'ta', name: 'Tamil', label: '🇮🇳 தமிழ்' },
        { code: 'te', name: 'Telugu', label: '🇮🇳 తెలుగు' },
        { code: 'kn', name: 'Kannada', label: '🇮🇳 ಕನ್ನಡ' },
        { code: 'ml', name: 'Malayalam', label: '🇮🇳 മലയാളം' },
        { code: 'pa', name: 'Punjabi', label: '🇮🇳 ਪੰਜਾਬੀ' },
        { code: 'fr', name: 'French', label: '🇫🇷 French' },
        { code: 'es', name: 'Spanish', label: '🇪🇸 Spanish' },
        { code: 'ar', name: 'Arabic', label: '🇸🇦 Arabic' },
        { code: 'de', name: 'German', label: '🇩🇪 German' },
        { code: 'ru', name: 'Russian', label: '🇷🇺 Russian' },
        { code: 'ja', name: 'Japanese', label: '🇯🇵 Japanese' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userQuery = input;
        setInput('');
        setIsLoading(true);

        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: userQuery }]);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bidgpt`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: userQuery,
                    language: language,
                    sessionId: sessionId
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    text: data.message,
                    tenders: data.tenders,
                    redirectUrl: data.redirectUrl
                }]);
            } else {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    text: getT('errorProcess')
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                type: 'bot',
                text: getT('errorConnect')
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-bid-dark hover:bg-bid-green text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white hover:border-bid-dark focus:outline-none"
            >
                <div className="relative">
                    <Sparkles className="w-7 h-7 transform transition-transform group-hover:rotate-12" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bid-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-bid-green"></span>
                    </span>
                </div>
                <span className="absolute right-full mr-3 bg-bid-dark text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {getT('askBidGPT')}
                </span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-4 sm:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[350px] md:w-[400px] h-[450px] sm:h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
                    {/* Chat Header */}
                    {/* Chat Header */}
                    <div className="bg-bid-dark p-4 flex items-center justify-between shadow-sm relative">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 border border-white/20">
                                <Sparkles className="w-5 h-5 text-bid-green" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">{getT('title')}</h3>
                                <p className="text-[10px] text-gray-300">{getT('poweredBy')}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            {/* Language Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowLangMenu(!showLangMenu)}
                                    className="text-xs bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20 transition flex items-center space-x-1"
                                >
                                    <span>{languages.find(l => l.name === language)?.code.toUpperCase() || 'EN'}</span>
                                </button>
                                {showLangMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 max-h-48 overflow-y-auto">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.name);
                                                    setShowLangMenu(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center justify-between ${language === lang.name ? 'text-bid-green font-bold bg-green-50' : 'text-gray-700'}`}
                                            >
                                                <span>{lang.label}</span>
                                                {language === lang.name && <div className="w-1.5 h-1.5 rounded-full bg-bid-green"></div>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
                        {messages.map((message: any, index) => (
                            <div
                                key={index}
                                className={message.type === 'user' ? 'flex flex-col items-end' : 'flex flex-col items-start'}
                            >
                                {message.type === 'bot' && (
                                    <span className="text-[10px] uppercase font-black text-bid-dark/40 tracking-widest mb-1 ml-1">AI</span>
                                )}
                                <div className="space-y-2 max-w-[85%]">
                                    <div
                                        className={`p-3 rounded-2xl shadow-sm text-sm whitespace-pre-wrap ${message.type === 'user'
                                            ? 'bg-bid-dark text-white rounded-tr-none'
                                            : 'bg-white border border-gray-100 rounded-tl-none text-gray-700'
                                            }`}
                                    >
                                        {message.text}
                                    </div>

                                    {message.tenders && message.tenders.length > 0 && (
                                        <div className="space-y-3 mt-3 w-[100%] ml-0">
                                            {message.tenders.map((tender: any, tIdx: number) => {
                                                const formatTenderValue = (val: any) => {
                                                    if (!val || val === '0' || val === '0.00' || String(val).toLowerCase().includes('refer')) return 'Refer Doc';
                                                    const n = Number(String(val).replace(/,/g, ''));
                                                    return !isNaN(n) && n > 0 ? `₹${n.toLocaleString('en-IN')}` : val;
                                                };

                                                return (
                                                    <div key={tIdx} className="bg-white border-2 border-slate-100 rounded-xl overflow-hidden shadow-sm hover:border-bid-green transition-all group">
                                                        {/* Source Badge */}
                                                        <div className="flex justify-between items-start p-3 pb-0">
                                                            <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${tender.source === 'GEM' ? 'bg-orange-100 text-orange-600' :
                                                                tender.source?.toLowerCase().includes('global') ? 'bg-blue-100 text-blue-600' :
                                                                    'bg-emerald-100 text-emerald-600'
                                                                }`}>
                                                                {tender.source || 'Tender'}
                                                            </div>
                                                        </div>

                                                        <div className="p-3 pt-2">
                                                            <h4 className="text-[12px] font-bold text-slate-800 line-clamp-2 mb-2 leading-tight group-hover:text-bid-green">{tender.title}</h4>

                                                            <div className="grid grid-cols-2 gap-2 mb-3 bg-slate-50 p-2 rounded-lg">
                                                                <div>
                                                                    <p className="text-[7px] uppercase font-bold text-slate-400">EMD</p>
                                                                    <p className="text-[10px] font-black text-slate-700">{formatTenderValue(tender.emd)}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[7px] uppercase font-bold text-slate-400">EST. COST</p>
                                                                    <p className="text-[10px] font-black text-slate-700">{formatTenderValue(tender.estimated_value)}</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                                                                <div className="flex flex-col">
                                                                    <div className="flex items-center text-[9px] text-slate-500 font-medium">
                                                                        <span className="w-1 h-1 bg-slate-300 rounded-full mr-1.5"></span>
                                                                        {tender.location}
                                                                    </div>
                                                                    <div className="flex items-center text-[9px] text-red-500 font-bold">
                                                                        <span className="w-1 h-1 bg-red-300 rounded-full mr-1.5"></span>
                                                                        {tender.deadline?.split(' ')[0]}
                                                                    </div>
                                                                </div>
                                                                <a
                                                                    href={`/tenders/${tender.id}`}
                                                                    className="text-[10px] font-black text-bid-green hover:underline uppercase tracking-tighter"
                                                                >
                                                                    {getT('details')}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {message.redirectUrl && (
                                        <div className="mt-2">
                                            <a
                                                href={message.redirectUrl}
                                                className="inline-flex items-center text-xs font-bold text-bid-green hover:underline bg-bid-dark/5 px-3 py-1.5 rounded-full"
                                            >
                                                {getT('seeAll')}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] uppercase font-black text-bid-dark/40 tracking-widest mb-1 ml-1">AI</span>
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-3 shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-1.5 h-1.5 bg-bid-green rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-bid-green rounded-full animate-bounce delay-100"></div>
                                        <div className="w-1.5 h-1.5 bg-bid-green rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100">
                        <form onSubmit={handleSubmit} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-bid-green focus:border-bid-green transition-all placeholder-gray-400"
                                placeholder={`${getT('placeholder')} (${language})`}
                                autoComplete="off"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-1.5 p-1.5 bg-bid-dark hover:bg-bid-green text-white hover:text-bid-dark rounded-full transition-colors duration-200"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div >
            )
            }
        </>
    );
}
