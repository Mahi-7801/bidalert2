'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    Calendar, MessageSquare, CheckCircle, Clock, Search, MapPin,
    Globe, Building2, Sparkles, Send, Bell, Sun, Moon, Info,
    ChevronRight, Loader2, Target, Zap, X
} from 'lucide-react';
import { states, countries } from '@/data/filterOptions';

export default function MyRequestsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 uppercase font-black text-xs tracking-widest text-slate-400">Loading Command Center...</div>}>
            <MyRequestsContent />
        </Suspense>
    );
}

function MyRequestsContent() {
    const { isAuthenticated, openLogin } = useAuth();
    const [requests, setRequests] = useState<any[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${baseUrl}/api/user-requests/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setRequests(Array.isArray(data) ? data : []);
            } else {
                setRequests([]);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setRequests([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchRequests();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 overflow-x-hidden">
                <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 text-center max-w-md">
                    <div className="w-20 h-20 bg-[#22c55e]/10 rounded-3xl flex items-center justify-center text-[#22c55e] mx-auto mb-8">
                        <Zap size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">AUCTION INTELLIGENCE</h2>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">Sign in to access your AI-powered tender monitoring command center.</p>
                    <button
                        onClick={openLogin}
                        className="w-full py-5 bg-[#0f172a] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#22c55e] transition-all duration-500 shadow-xl shadow-slate-200"
                    >
                        Initialize Access
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'bg-[#0f1014] text-slate-200' : 'bg-[#f8fafc] text-slate-900'}`}>
            <div className="container mx-auto px-4 max-w-5xl pt-24 pb-20">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${isDarkMode ? 'bg-[#22c55e]/10 border-[#22c55e]/20 text-[#22c55e]' : 'bg-[#22c55e]/5 border-[#22c55e]/10 text-[#22c55e]'}`}>
                            <Target size={28} className="animate-pulse" />
                        </div>
                        <div>
                            <h1 className={`text-4xl font-black tracking-tight leading-none mb-1 uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                My Requests
                            </h1>
                            <p className="text-slate-500 font-bold text-sm flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                                </span>
                                Monitoring active procurement channels
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${isDarkMode ? 'bg-[#1a1c24] border-slate-800 text-yellow-400 hover:border-yellow-400/50' : 'bg-white border-slate-200 text-slate-400 hover:border-[#22c55e] hover:text-[#22c55e]'}`}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Search Panel */}
                <CreateRequestForm onSuccess={fetchRequests} isDarkMode={isDarkMode} />

                {/* History Section */}
                <div className="mt-20">
                    <div className="flex items-center justify-between mb-10 border-b pb-6 px-2 border-slate-200/60 dark:border-slate-800">
                        <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                            <Clock size={20} className="text-[#22c55e]" />
                            Request History
                        </h2>
                        <button
                            onClick={fetchRequests}
                            className="text-[10px] font-black text-[#22c55e] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity bg-[#22c55e]/5 px-4 py-2 rounded-full border border-[#22c55e]/10"
                        >
                            Synch Intelligence
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-10 h-10 text-[#22c55e] animate-spin" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compiling Data Streams...</p>
                        </div>
                    ) : requests.length === 0 ? (
                        <div className={`p-20 rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-[#16181d] border-slate-800' : 'bg-white border-slate-200'}`}>
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                                <Search className="text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Initialize Your Search</h3>
                            <p className="text-slate-500 max-w-sm">No active requests found. Use the AI brief at the top to start monitoring tenders.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {requests.map((request) => (
                                <RequestCard key={request.id} request={request} isDarkMode={isDarkMode} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function CreateRequestForm({ onSuccess, isDarkMode }: { onSuccess: () => void, isDarkMode: boolean }) {
    const searchParams = useSearchParams();
    const [message, setMessage] = useState('');
    const [keyword, setKeyword] = useState('');
    const [state, setState] = useState<string[]>([]);
    const [country, setCountry] = useState<string[]>([]);
    const [department, setDepartment] = useState('');

    // Pre-fill from URL params
    useEffect(() => {
        const urlKeyword = searchParams.get('keyword');
        const urlState = searchParams.get('state');
        const urlDept = searchParams.get('dept');
        
        if (urlKeyword) setKeyword(urlKeyword);
        if (urlState && states.includes(urlState) && !state.includes(urlState)) setState([urlState]);
        if (urlDept) setDepartment(urlDept);
        
        // If we have a keyword, set a default message
        if (urlKeyword) {
            setMessage(`I am looking for tenders related to "${urlKeyword}". Please provide the latest matching opportunities.`);
        }
    }, [searchParams]);
    const [durationValue, setDurationValue] = useState('1');
    const [durationUnit, setDurationUnit] = useState('MONTHS');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${baseUrl}/api/user-requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message,
                    keyword,
                    state: state.join(', '),
                    country: country.join(', '),
                    department,
                    duration_value: durationValue,
                    duration_unit: durationUnit
                })
            });

            if (response.ok) {
                setShowSuccess(true);
                setTimeout(() => {
                    setMessage('');
                    setKeyword('');
                    setState([]);
                    setCountry([]);
                    setDepartment('');
                    setDurationValue('1');
                    setDurationUnit('MONTHS');
                    setShowSuccess(false);
                    onSuccess();
                }, 2000);
            }
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative group/form">
            <div className={`p-1 rounded-[3rem] transition-all duration-500 ${isDarkMode ? 'bg-[#1a1c24]' : 'bg-white shadow-2xl shadow-slate-200/60 border border-slate-100'}`}>
                <div className="p-8 sm:p-12 space-y-10">
                    {/* Natural Language Input */}
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <label className={`text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                <Sparkles size={14} className="text-[#22c55e]" />
                                Natural Language Query Brief
                            </label>
                            <div className="group relative">
                                <Info size={14} className="text-slate-300 cursor-help" />
                                <div className="absolute right-0 bottom-full mb-3 w-64 p-4 bg-slate-900 text-white text-[10px] leading-relaxed rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 font-medium">
                                    Describe your procurement needs in simple English. Our AI will analyze the requirements and match them with global tender streams.
                                </div>
                            </div>
                        </div>
                        <textarea
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="e.g. I am looking for software development and infrastructure tenders for the smart city project in Uttar Pradesh..."
                            className={`w-full h-48 px-10 py-8 rounded-[2.5rem] text-xl font-bold transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-[#22c55e]/20 border-2 resize-none leading-relaxed placeholder:text-slate-400 placeholder:italic dark:placeholder:text-slate-600
                                ${isDarkMode
                                    ? 'bg-[#0f1014] border-slate-800 text-white focus:border-[#22c55e]'
                                    : 'bg-[#fcfdfd] border-[#22c55e]/20 text-slate-900 focus:border-[#22c55e] shadow-inner'}`}
                        />
                        <div className={`absolute -inset-1 bg-[#22c55e]/10 rounded-[2.8rem] blur-xl -z-10 transition-opacity duration-700 opacity-30 group-focus-within/form:opacity-100`} />
                    </div>

                    {/* Filter Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <label className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                <Search size={14} /> Primary Key
                            </label>
                            <div className="group/field relative">
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="e.g. Software, Hardware"
                                    className={`w-full px-8 py-5 rounded-2xl font-bold text-sm border-2 transition-all ${isDarkMode ? 'bg-[#0f1014] border-slate-800 focus:border-[#22c55e]' : 'bg-white border-slate-100 focus:border-[#22c55e]'}`}
                                />
                                <div className="absolute right-0 top-full mt-2 w-max p-3 bg-slate-900 text-white text-[9px] rounded-lg opacity-0 group-hover/field:opacity-100 transition-opacity pointer-events-none z-50">
                                    Specific keywords to narrow down search results
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                <MapPin size={14} /> Jurisdiction (Multiple)
                            </label>
                            
                            {/* Selected States Badges */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {state.map((s) => (
                                    <span key={s} className="bg-bid-green/10 text-bid-green border border-bid-green/20 px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                                        {s}
                                        <button 
                                            type="button" 
                                            onClick={() => setState(state.filter(item => item !== s))}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <div className="group/field relative">
                                <select
                                    value=""
                                    onChange={(e) => {
                                        if (e.target.value && !state.includes(e.target.value)) {
                                            setState([...state, e.target.value]);
                                        }
                                    }}
                                    className={`w-full px-8 py-5 rounded-2xl font-bold text-sm border-2 transition-all appearance-none cursor-pointer ${isDarkMode ? 'bg-[#0f1014] border-slate-800 focus:border-[#22c55e] text-white' : 'bg-white border-slate-100 focus:border-[#22c55e] text-slate-900'}`}
                                >
                                    <option value="">+ Add State / Province</option>
                                    {states.map(s => (
                                        <option key={s} value={s} disabled={state.includes(s)}>{s}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronRight size={20} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                <Globe size={14} /> Region (Multiple)
                            </label>

                            {/* Selected Countries Badges */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {country.map((c) => (
                                    <span key={c} className="bg-bid-green/10 text-bid-green border border-bid-green/20 px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                                        {c}
                                        <button 
                                            type="button" 
                                            onClick={() => setCountry(country.filter(item => item !== c))}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <div className="group/field relative">
                                <select
                                    value=""
                                    onChange={(e) => {
                                        if (e.target.value && !country.includes(e.target.value)) {
                                            setCountry([...country, e.target.value]);
                                        }
                                    }}
                                    className={`w-full px-8 py-5 rounded-2xl font-bold text-sm border-2 transition-all appearance-none cursor-pointer ${isDarkMode ? 'bg-[#0f1014] border-slate-800 focus:border-[#22c55e] text-white' : 'bg-white border-slate-100 focus:border-[#22c55e] text-slate-900'}`}
                                >
                                    <option value="">+ Add Country / Continent</option>
                                    {countries.map(c => (
                                        <option key={c} value={c} disabled={country.includes(c)}>{c}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronRight size={20} className="rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-4">
                            <label className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                <Building2 size={14} /> Target Organization
                            </label>
                            <div className="group/field relative">
                                <input
                                    type="text"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    placeholder="Govt. Dept / Private Entity"
                                    className={`w-full px-8 py-5 rounded-2xl font-bold text-sm border-2 transition-all ${isDarkMode ? 'bg-[#0f1014] border-slate-800 focus:border-[#22c55e]' : 'bg-white border-slate-100 focus:border-[#22c55e]'}`}
                                />
                                <div className="absolute right-0 top-full mt-2 w-max p-3 bg-slate-900 text-white text-[9px] rounded-lg opacity-0 group-hover/field:opacity-100 transition-opacity pointer-events-none z-50">
                                    Filter by specific publishing authority
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                <Bell size={14} /> Monitoring Period
                            </label>
                            <div className="group/field relative">
                                <div className={`flex items-center rounded-2xl border-2 transition-all overflow-hidden ${isDarkMode ? 'bg-[#0f1014] border-slate-800 focus-within:border-[#22c55e]' : 'bg-white border-slate-100 focus-within:border-[#22c55e]'}`}>
                                    <input
                                        type="number"
                                        min="1"
                                        value={durationValue}
                                        onChange={(e) => setDurationValue(e.target.value)}
                                        className={`w-24 px-6 py-5 bg-transparent font-black text-center focus:outline-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                                    />
                                    <select
                                        value={durationUnit}
                                        onChange={(e) => setDurationUnit(e.target.value)}
                                        className={`flex-1 px-4 py-5 bg-transparent font-bold text-sm focus:outline-none cursor-pointer appearance-none border-l-2 ${isDarkMode ? 'border-slate-800 text-white' : 'border-slate-50 text-slate-800'}`}
                                    >
                                        <option value="DAYS">Days</option>
                                        <option value="MONTHS">Months</option>
                                        <option value="YEARS">Years</option>
                                    </select>
                                    <div className="px-6 text-slate-300">
                                        <Bell size={16} />
                                    </div>
                                </div>
                                <div className="absolute right-0 top-full mt-2 w-max p-3 bg-slate-900 text-white text-[9px] rounded-lg opacity-0 group-hover/field:opacity-100 transition-opacity pointer-events-none z-50">
                                    Duration for which the monitoring persists
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting || showSuccess}
                            className={`w-full group/btn relative h-20 rounded-[2rem] font-black uppercase tracking-[0.4em] text-sm transition-all duration-700 overflow-hidden flex items-center justify-center gap-4
                                ${showSuccess
                                    ? 'bg-[#22c55e] text-white scale-95'
                                    : 'bg-[#0f172a] text-white hover:bg-[#22c55e] hover:shadow-[0_20px_50px_-15px_rgba(34,197,94,0.4)] hover:-translate-y-1'}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : showSuccess ? (
                                <CheckCircle size={24} className="animate-bounce" />
                            ) : (
                                <Send size={18} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-500" />
                            )}
                            {isSubmitting ? 'Propagating Brief...' : showSuccess ? 'Transmission Success' : 'Submit Request'}
                        </button>
                    </div>
                </div>

                {/* Footer Info */}
                <div className={`py-6 border-t flex items-center justify-center gap-3 rounded-b-[3rem] ${isDarkMode ? 'bg-[#0f1014]/50 border-slate-800' : 'bg-slate-50/80 border-slate-100'}`}>
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22c55e]"></span>
                    </span>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                        AI-Powered Search Intelligence Activated
                    </p>
                </div>
            </div>
        </form>
    );
}

function RequestCard({ request, isDarkMode }: { request: any, isDarkMode: boolean }) {
    // Determine active step (0-3)
    const activeStep = request.status === 'replied' ? 3 : request.status === 'curation' ? 2 : request.status === 'processing' ? 1 : 0;
    const steps = ['Submitted', 'Processing', 'Curation', 'Delivered'];

    const formatDuration = (val: string | number, unit: string) => {
        if (!val) return '';
        const v = parseInt(val.toString());
        const u = unit.toLowerCase().replace(/s$/, ''); // normalization
        return `${v} ${v === 1 ? u.charAt(0).toUpperCase() + u.slice(1) : u.charAt(0).toUpperCase() + u.slice(1) + 's'}`;
    };

    return (
        <div className={`peer group relative p-1 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl overflow-hidden
            ${isDarkMode ? 'bg-slate-800/20 hover:bg-slate-800/40 border border-slate-800' : 'bg-white border border-slate-100 hover:shadow-slate-200/50 hover:border-[#22c55e]/30'}`}>
            <div className={`relative p-8 sm:p-10 rounded-[2.2rem] h-full ${isDarkMode ? 'bg-[#16181d]' : 'bg-white'}`}>
                <div className="flex flex-col lg:flex-row justify-between gap-10">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-2
                                ${request.status === 'replied'
                                    ? 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20'
                                    : 'bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${request.status === 'replied' ? 'bg-[#22c55e]' : 'bg-[#f97316] animate-pulse'}`} />
                                {request.status === 'replied' ? 'Request Delivered' : 'Active Search: Procuring'}
                            </span>
                            <span className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-200/60 flex items-center gap-2 text-slate-400 ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50'}`}>
                                <Calendar size={12} />
                                {new Date(request.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                        </div>

                        <h3 className={`text-2xl font-black leading-snug mb-8 group-hover:text-[#22c55e] transition-colors duration-500 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            "{request.message}"
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {request.keyword && (
                                <Tag icon={<Search size={10} />} label={request.keyword} isDarkMode={isDarkMode} />
                            )}
                            {request.state && request.state.split(',').map((s: string, idx: number) => (
                                <Tag key={`s-${idx}`} icon={<MapPin size={10} />} label={s.trim()} isDarkMode={isDarkMode} />
                            ))}
                            {request.country && request.country.split(',').map((c: string, idx: number) => (
                                <Tag key={`c-${idx}`} icon={<Globe size={10} />} label={c.trim()} isDarkMode={isDarkMode} />
                            ))}
                            {request.duration_value && (
                                <Tag icon={<Clock size={10} />} label={formatDuration(request.duration_value, request.duration_unit)} isDarkMode={isDarkMode} highlight />
                            )}
                        </div>
                    </div>

                    <div className="lg:w-72 border-l border-slate-200/40 pl-0 lg:pl-10 flex flex-col justify-center">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-black text-slate-400 uppercase tracking-widest`}>Progress Tracker</span>
                                <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">{steps[activeStep]}</span>
                            </div>

                            {/* Visual Stepper */}
                            <div className="flex items-center justify-between w-full relative">
                                <div className={`absolute h-[2px] w-full top-1/2 -translate-y-1/2 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`} />
                                <div
                                    className="absolute h-[2px] bg-[#22c55e] top-1/2 -translate-y-1/2 transition-all duration-1000 origin-left"
                                    style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                                />
                                {steps.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`relative w-4 h-4 rounded-full border-2 transition-all duration-700 z-10 
                                            ${i <= activeStep
                                                ? 'bg-[#22c55e] border-[#22c55e] scale-110 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                                                : isDarkMode ? 'bg-[#16181d] border-slate-700' : 'bg-white border-slate-200'}`}
                                    />
                                ))}
                            </div>

                            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-[#fffcf9]/80 border-orange-100/50'}`}>
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-white dark:bg-[#16181d] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                                        <Loader2 size={16} className={`${request.status === 'replied' ? 'text-green-500' : 'animate-spin text-orange-500'}`} />
                                    </div>
                                    <div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>EXPECTED DELIVERY</p>
                                        <p className="font-bold text-sm tracking-tight">
                                            {request.status === 'replied' ? 'Complete' : 'Within 24 Hours'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {request.status === 'replied' && (
                                <a
                                    href="https://mail.google.com"
                                    target="_blank"
                                    className="w-full h-14 bg-[#22c55e] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#1caa4d] transition-all hover:translate-x-1"
                                >
                                    Access Match Data <ChevronRight size={14} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Hover decoration */}
            <div className="absolute -left-1 top-0 bottom-0 w-1 bg-[#22c55e] transition-all duration-500 opacity-0 group-hover:opacity-100 rounded-full" />
        </div>
    );
}

function Tag({ icon, label, isDarkMode, highlight = false }: { icon: React.ReactNode, label: string, isDarkMode: boolean, highlight?: boolean }) {
    return (
        <div className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2
            ${highlight
                ? 'bg-[#22c55e]/5 text-[#22c55e] border-[#22c55e]/20'
                : isDarkMode
                    ? 'bg-slate-800/40 text-slate-400 border-slate-700'
                    : 'bg-[#f1f5f9] text-slate-500 border-slate-200/60'}`}>
            <span className="opacity-60">{icon}</span>
            {label}
        </div>
    );
}
