'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { ChevronLeft, Calendar, Building, MapPin, IndianRupee, Clock, FileText, Share2, Printer, Lock, Globe, ExternalLink, Zap, CheckCircle2, HelpCircle } from 'lucide-react';

interface GlobalTender {
    id: string;
    title: string;
    description: string;
    authority: string;
    country: string;
    city?: string;
    category: string;
    estimated_value: string;
    tender_emd?: string;
    currency?: string;
    deadline: string;
    status: string;
    doc_link?: string;
    source_site?: string;
    created_at?: string;
}

export default function GlobalTenderDetailsClient() {
    const params = useParams();
    const router = useRouter();
    const { isAuthenticated, user, isLoading: authLoading } = useAuth();
    const [tender, setTender] = useState<GlobalTender | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const id = Array.isArray(params?.id) ? params.id.map(segment => decodeURIComponent(segment)).join('/') : params?.id ? decodeURIComponent(params.id) : null;

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated) {
            router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
            return;
        }

        if (!id) return;

        const fetchTender = async () => {
            try {
                const response = await fetch(`/api/global-tender-details?id=${encodeURIComponent(id)}`);
                if (!response.ok) {
                    if (response.status === 404) throw new Error('Global tender not found');
                    throw new Error('Failed to fetch tender details');
                }
                const data = await response.json();
                setTender(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTender();
    }, [id, isAuthenticated, authLoading, router]);

    const isPaid = user?.subscription_status === 'pro' || user?.role === 'admin';

    const formatTenderValue = (val: string | number | undefined) => {
        if (!val || val === '0' || val === 0 || String(val).toLowerCase() === 'refer doc') return 'Refer Doc';
        if (typeof val === 'number') return `${tender?.currency || '$'} ${val.toLocaleString()}`;
        return `${tender?.currency || '$'} ${val}`;
    };

    const parseDate = (dateStr: string | undefined) => {
        if (!dateStr || dateStr === 'N/A' || dateStr === 'Refer Document') return 'Refer Doc';
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        } catch { return dateStr; }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-bid-dark"></div>
                <p className="mt-4 text-gray-500 font-medium">{authLoading ? 'Verifying Access...' : 'Loading Global Tender Details...'}</p>
            </div>
        );
    }

    if (error || !tender) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-gray-100">
                    <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-red-500" /></div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Tender Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || "The global tender you are looking for does not exist or has been removed."}</p>
                    <Link href="/global-tenders" className="inline-block bg-bid-dark text-white px-6 py-3 rounded-lg font-bold hover:bg-bid-green hover:text-bid-dark transition w-full">Browse Global Tenders</Link>
                </div>
            </div>
        );
    }

    const getCleanTitle = (title: string, id: string | number, authority?: string) => {
        if (!title || typeof title !== 'string') return `Tender ${id}`;
        if (title.toLowerCase().startsWith('http')) {
            if (authority && authority.length > 5 && authority.toLowerCase() !== 'refer document' && authority.toLowerCase() !== 'refer doc') return authority;
            return `International Tender - ${id}`;
        }
        return title;
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-16 sm:pb-24">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
                <div className="max-w-[1200px] mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
                    <Link href="/global-tenders" className="flex items-center text-gray-400 hover:text-bid-green transition text-xs sm:text-sm font-bold uppercase tracking-tight">
                        <ChevronLeft className="w-4 h-4 mr-1 sm:w-5 sm:h-5" />
                        Back to Global Tenders
                    </Link>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button className="p-2 text-gray-400 hover:text-bid-dark hover:bg-gray-50 rounded-full transition" title="Print"><Printer className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                        <button className="p-2 text-gray-400 hover:text-bid-dark hover:bg-gray-50 rounded-full transition" title="Share"><Share2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 py-6 sm:py-12">
                <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
                    {/* Main Content */}
                    <div className="w-full lg:w-2/3 space-y-6 sm:space-y-10">
                        {/* Header Section */}
                        <div className="relative">
                            <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
                                <span className="bg-blue-50 text-blue-600 text-[9px] sm:text-[11px] uppercase font-black px-3 sm:px-4 py-1 rounded-full border border-blue-100 tracking-widest leading-none">
                                    Global Tender
                                </span>
                                {tender.category && (
                                    <span className="bg-purple-50 text-purple-700 text-[10px] sm:text-[12px] font-bold px-3 py-1 rounded-full border border-purple-100 tracking-tight">
                                        {tender.category}
                                    </span>
                                )}
                                <span className="text-gray-400 text-xs sm:text-sm font-medium tracking-tight">Ref: {tender.id}</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0D1B2A] leading-[1.1] mb-6 sm:mb-10">
                                {getCleanTitle(tender.title, tender.id, tender.authority)}
                            </h1>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 p-4 sm:p-8 bg-white rounded-2xl sm:rounded-[32px] border border-gray-100 shadow-sm">
                                <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
                                    <p className="text-[9px] sm:text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] leading-none mb-1">{getCleanTitle(tender.title, tender.id, tender.authority) === tender.authority ? 'Tender ID' : 'Authority'}</p>
                                    <div className="flex items-center justify-center md:justify-start gap-1 sm:gap-2">
                                        <Building className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-bid-green opacity-40 shrink-0" />
                                        <p className="font-bold text-gray-800 text-xs sm:text-base truncate">{getCleanTitle(tender.title, tender.id, tender.authority) === tender.authority ? tender.id : (tender.authority || 'International')}</p>
                                    </div>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2 text-center md:text-left border-l border-gray-100 pl-4 sm:pl-8">
                                    <p className="text-[9px] sm:text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] leading-none mb-1">Country</p>
                                    <div className="flex items-center justify-center md:justify-start gap-1 sm:gap-2">
                                        <Globe className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-bid-green opacity-40 shrink-0" />
                                        <p className="font-bold text-gray-800 text-xs sm:text-base">{tender.country}</p>
                                    </div>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2 text-center md:text-left border-l border-gray-100 pl-4 sm:pl-8">
                                    <p className="text-[9px] sm:text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] leading-none mb-1">City</p>
                                    <div className="flex items-center justify-center md:justify-start gap-1 sm:gap-2">
                                        <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-bid-green opacity-40 shrink-0" />
                                        <p className="font-bold text-gray-800 text-xs sm:text-base">{tender.city || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2 text-center md:text-left border-l border-gray-100 pl-4 sm:pl-8">
                                    <p className="text-[9px] sm:text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] leading-none mb-1">Valuation</p>
                                    <div className="flex items-center justify-center md:justify-start gap-1 sm:gap-2">
                                        <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-bid-green opacity-40 shrink-0" />
                                        <p className="font-bold text-gray-800 text-xs sm:text-base">{formatTenderValue(tender.estimated_value)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Financial Details Card */}
                        <div className="bg-white rounded-3xl border border-[#F0F5F2] p-6 sm:p-8 shadow-sm">
                            <h3 className="text-sm sm:text-base font-black text-[#1A202C] mb-6 flex items-center gap-3">
                                <IndianRupee size={20} className="text-bid-green" />
                                Financial Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="border-r border-gray-50 last:border-0 pr-4">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Estimated Value</p>
                                    <p className="text-xl font-black text-bid-dark">{formatTenderValue(tender.estimated_value)}</p>
                                </div>
                                <div className="border-r border-gray-50 last:border-0 pr-4">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Tender EMD</p>
                                    <p className="text-xl font-black text-bid-dark">{formatTenderValue(tender.tender_emd)}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Tender Fee</p>
                                    <p className="text-xl font-black text-bid-dark">{isPaid ? 'Refer Document' : '🔒 Locked'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Timelines Card */}
                        <div className="bg-white rounded-3xl border border-[#F0F5F2] p-6 sm:p-8 shadow-sm">
                            <h3 className="text-sm sm:text-base font-black text-[#1A202C] mb-6 flex items-center gap-3">
                                <Clock size={20} className="text-bid-green" />
                                Important Timelines
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                                    <span className="text-[#4A5568] font-bold">Published Date</span>
                                    <span className="font-extrabold text-[#1A202C]">{parseDate(tender.created_at)}</span>
                                </div>
                                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                                    <span className="text-[#4A5568] font-bold">Submission Deadline</span>
                                    <span className="font-extrabold text-red-500">{parseDate(tender.deadline)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#4A5568] font-bold">Opening Date</span>
                                    <span className="font-extrabold text-bid-green">{isPaid ? 'Refer Document' : '🔒 Upgrade to View'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Technical Specifications */}
                        <div className="bg-white rounded-2xl sm:rounded-[32px] p-6 sm:p-10 shadow-sm border border-gray-100 relative overflow-hidden group">
                            {/* Existing lock overlay... */}
                            <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-bid-green" />
                                Technical Specifications
                            </h3>
                            <div className={`prose max-w-none text-gray-600 leading-[1.8] text-sm sm:text-base`}>
                                {tender.description ? (
                                    <div className="whitespace-pre-line space-y-4">
                                        {tender.description}
                                    </div>
                                ) : (
                                    <p className="italic text-gray-400 py-10 text-center font-medium">Detailed project documentation is being processed...</p>
                                )}
                            </div>
                        </div>

                        {isPaid && (
                            <>
                                {/* Eligibility & Qualification Section */}
                                <div className="bg-white rounded-3xl border border-[#F0F5F2] p-6 sm:p-8 shadow-sm ring-2 ring-bid-green/10">
                                    <h3 className="text-sm sm:text-base font-black text-bid-dark mb-6 flex items-center gap-3 uppercase tracking-tight">
                                        <CheckCircle2 size={20} className="text-bid-green" />
                                        Eligibility & Qualification
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-[#F8FBFA] p-5 rounded-2xl border border-emerald-50">
                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Global Experience</p>
                                            <p className="text-sm font-bold text-bid-dark">✔ Experience in {tender.category || 'international'} projects.</p>
                                        </div>
                                        <div className="bg-[#F8FBFA] p-5 rounded-2xl border border-emerald-50">
                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Financial Stability</p>
                                            <p className="text-sm font-bold text-bid-dark">✔ Valid financial certifications from {tender.country}.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* BOQ & Cost Insights */}
                                <div className="bg-[#0A1A14] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-10 bg-bid-green/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                    <h3 className="text-sm sm:text-base font-black mb-6 flex items-center gap-3 relative z-10 uppercase">
                                        <Zap size={20} className="text-bid-green" />
                                        BOQ & Cost Insights
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-[10px] font-bold text-bid-green/80 uppercase mb-1">Project Valuation</p>
                                                <p className="text-xl font-black">{formatTenderValue(tender.estimated_value)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-bid-green/80 uppercase mb-1">Currency</p>
                                                <p className="text-base font-bold">{tender.currency || 'USD / Local'}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                                            <p className="text-[10px] font-bold text-bid-green uppercase mb-4 tracking-widest">Opportunity Rating</p>
                                            <div className="flex items-center gap-4">
                                                <div className="text-4xl font-black text-white">A+</div>
                                                <div className="flex-1">
                                                    <div className="bg-white/10 h-2 rounded-full overflow-hidden">
                                                        <div className="bg-bid-green h-full w-[85%]"></div>
                                                    </div>
                                                    <p className="text-[10px] mt-2 font-bold text-white/40 uppercase">High ROI Potential</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* How to Apply */}
                                <div className="bg-white rounded-3xl border border-[#F0F5F2] p-8 shadow-sm">
                                    <h3 className="text-sm sm:text-base font-black text-bid-dark mb-6 uppercase tracking-wider">How to Apply (International Process)</h3>
                                    <div className="grid gap-6">
                                        {[
                                            "Review host country bidding regulations and eligibility.",
                                            "Register on the primary procurement portal: " + (tender.source_site || 'Source Portal'),
                                            "Prepare multi-currency financial bids if required.",
                                            "Submit technical qualifications and local certifications.",
                                            "Upload all documents before the " + parseDate(tender.deadline) + " deadline."
                                        ].map((step, i) => (
                                            <div key={i} className="flex gap-5">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bid-green text-bid-dark flex items-center justify-center font-black text-base shadow-lg shadow-green-100">{i + 1}</div>
                                                <p className="text-sm sm:text-base font-bold text-gray-600 self-center">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-2xl sm:rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                                <div className="bg-bid-dark px-8 py-10 text-white text-center">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                                        Tender Status: Active
                                    </div>
                                    <h4 className="text-3xl font-black tracking-tight mb-2">Live Opportunity</h4>
                                    <p className="text-white/60 text-sm font-medium">Bidding window is currently open</p>
                                </div>

                                <div className="p-8 sm:p-10 space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] mb-2 leading-none">Global ID</p>
                                            <p className="font-mono font-bold text-gray-800 break-all text-sm sm:text-base bg-gray-50 p-3 rounded-xl border border-gray-100">{tender.id}</p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] mb-2 leading-none">Submission Deadline</p>
                                            <div className="flex items-center gap-3 bg-red-50 p-4 rounded-xl border border-red-100">
                                                <Clock className="w-5 h-5 text-red-500 shrink-0" />
                                                <span className="font-black text-red-600 text-base sm:text-lg tracking-tight">
                                                    {parseDate(tender.deadline)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        {!isPaid ? (
                                            <Link href="/plans" className="w-full bg-bid-dark text-white font-black py-4 rounded-2xl hover:bg-bid-green hover:text-bid-dark transition-all flex items-center justify-center gap-3 shadow-lg shadow-bid-dark/10 group">
                                                <Zap className="w-5 h-5 group-hover:animate-bounce" fill="currentColor" />
                                                UPGRADE TO VIEW LINKS
                                            </Link>
                                        ) : (
                                            <>
                                                {tender.doc_link && (
                                                    <a href={tender.doc_link} target="_blank" rel="noopener noreferrer" className="w-full bg-bid-green text-bid-dark font-black py-4 rounded-2xl hover:bg-bid-greenhover hover:-translate-y-1 transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-200">
                                                        <FileText className="w-5 h-5" />
                                                        DOWNLOAD DOCUMENT
                                                    </a>
                                                )}
                                                {tender.source_site && (
                                                    <a href={tender.source_site} target="_blank" rel="noopener noreferrer" className="w-full bg-white border-2 border-bid-dark text-bid-dark font-black py-4 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                                                        <ExternalLink className="w-5 h-5" />
                                                        GO TO SOURCE SITE
                                                    </a>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-wider mb-2">Privacy & Access</p>
                                        <p className="text-[11px] sm:text-xs text-center text-gray-500 leading-relaxed font-medium">
                                            {isPaid ? "Full premium access enabled for this global opportunity." : "Detailed document links and source portal access require a Pro subscription."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Tender Intelligence */}
                            <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1B263B] text-white rounded-[32px] p-8 shadow-xl border border-white/5 overflow-hidden relative">
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-bid-green/20 blur-3xl rounded-full"></div>
                                <h3 className="text-base font-black flex items-center gap-3 mb-6">
                                    <HelpCircle size={20} className="text-bid-green" />
                                    Tender Insights
                                </h3>
                                <div className="space-y-6 relative z-10">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0"><Building size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white/40 uppercase">Authority Profile</p>
                                            <p className="text-sm font-bold">{tender.authority}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0"><Globe size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white/40 uppercase">Market Competitiveness</p>
                                            <p className="text-sm font-bold">{isPaid ? 'Moderate (Global)' : '🔒 Unlock'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Help Box */}
                            <div className="bg-[#E4F9F2]/50 border border-[#00A86B15] p-6 sm:p-8 rounded-[32px] text-center">
                                <h5 className="font-black text-bid-dark mb-2">Need Assistance?</h5>
                                <p className="text-sm text-gray-500 mb-6 font-medium">Our global tender experts are here to help you with the bidding process.</p>
                                <Link href="/contact" className="text-bid-green font-bold text-sm underline hover:opacity-80 transition-opacity">Contact Consultant</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
