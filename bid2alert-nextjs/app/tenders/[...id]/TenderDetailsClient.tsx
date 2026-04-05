'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
    ChevronLeft, Calendar, Building, MapPin, IndianRupee, Clock,
    FileText, Share2, Printer, Lock, Download, CheckCircle2,
    Zap, ExternalLink, HelpCircle, TrendingUp, Facebook
} from 'lucide-react';

interface Tender {
    id: number | string;
    reference_number?: string;
    title: string;
    description: string;
    authority: string;
    state: string;
    city?: string;
    category: string;
    estimated_value: string | number;
    emd_value?: string | number;
    deadline: string;
    status: string;
    created_at: string;
    doclinks?: string;
    gemdoclink?: string;
    source_site?: string;
    source_table?: string;
}

export default function TenderDetailsClient() {
    const params = useParams();
    const router = useRouter();
    const { isAuthenticated, user, isLoading: authLoading, refreshUser, openRegister } = useAuth();
    const [tender, setTender] = useState<Tender | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const idParts = params?.id;
    const id = Array.isArray(idParts) ? idParts.join('/') : idParts;

    // Refresh user status periodically if not paid to "auto-unlock" after payment
    useEffect(() => {
        if (isAuthenticated && user?.subscription_status !== 'pro' && user?.role !== 'admin') {
            const interval = setInterval(() => {
                refreshUser();
            }, 5000); // Check every 5 seconds

            return () => clearInterval(interval);
        }
    }, [isAuthenticated, user?.subscription_status, user?.role, refreshUser]);

    useEffect(() => {
        if (authLoading) return;

        // Let it fetch regardless of authentication status so we can blur the background

        if (!id) return;

        const fetchTender = async () => {
            try {
                const response = await fetch(`/api/tenders/${encodeURIComponent(id)}`);

                if (!response.ok) {
                    if (response.status === 404) throw new Error('Tender not found');
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
    }, [id, authLoading]);

    // Redirect logic based on user status
    useEffect(() => {
        // Only redirect once auth status is confirmed and we're not loading
        if (!authLoading && !isAuthenticated) {
            const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
            router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
        }
    }, [authLoading, isAuthenticated, router]);

    const isPaid = user?.subscription_status === 'pro' || user?.role === 'admin';

    // Move these up to avoid TDZ issues
    const displayTender = tender || {
        id: id,
        title: "Tender Title (Locked)",
        reference_number: String(id),
        category: "General",
        authority: "Authority Name",
        state: "State",
        city: "City",
        description: "This tender is matched with your keyword. Please login to view full details.",
        estimated_value: "0" as string | number,
        emd_value: "0" as string | number,
        deadline: new Date().toISOString(),
        created_at: new Date().toISOString(),
        status: "active"
    };

    const safeTender = displayTender as NonNullable<Tender>;

    const parseDate = (dateStr: string) => {
        if (!dateStr) return 'N/A';
        const parts = dateStr.split(/[- :]/);
        if (parts.length >= 3) {
            let year = Number(parts[2]);
            let month = Number(parts[1]) - 1;
            let day = Number(parts[0]);

            if (parts[0].length === 4) {
                year = Number(parts[0]);
                month = Number(parts[1]) - 1;
                day = Number(parts[2]);
            }

            const d = new Date(year, month, day, Number(parts[3]) || 0, Number(parts[4]) || 0, Number(parts[5]) || 0);
            if (!isNaN(d.getTime())) return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
        }
        return new Date(dateStr).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const formatTenderValue = (value: any) => {
        if (!value) return 'Refer Doc';
        const cleanValue = String(value).replace(/,/g, '').trim();
        if (cleanValue === '' || cleanValue === '0' || cleanValue === '0.00' || cleanValue.toLowerCase() === 'refer document') return 'Refer Doc';
        const num = Number(cleanValue);
        if (!isNaN(num) && num > 0) {
            return `₹${num.toLocaleString('en-IN')}`;
        }
        return value;
    };

    const getDocuments = () => {
        const docs: { name: string; url: string; size: string }[] = [];

        // Helper to normalize and add links
        const addLinks = (linkString: string | undefined, type: string) => {
            if (!linkString) return;
            // Split by space, comma, or semicolon and remove empty/invalid strings
            const rawLinks = linkString.split(/[\s,;]+/).filter(l => l && l.length > 5);

            rawLinks.forEach((link, idx) => {
                let url = link.trim();
                // Ensure protocol
                if (!url.startsWith('http') && (url.includes('.') || url.includes('/'))) {
                    url = 'https://' + url;
                }

                if (url.startsWith('http') && !docs.some(d => d.url === url)) {
                    docs.push({
                        name: rawLinks.length > 1 ? `${type} Document ${idx + 1}` : `${type} Tender Document`,
                        url: url,
                        size: url.toLowerCase().endsWith('.pdf') ? 'PDF' : 'File'
                    });
                }
            });
        };

        addLinks(safeTender?.gemdoclink, 'GeM');
        addLinks(safeTender?.doclinks, 'Tender');

        // IMPORTANT: If title or description contain URLs, add them to documents list
        if (safeTender?.title?.toLowerCase().startsWith('http')) {
            addLinks(safeTender.title, 'View Digital');
        }
        if (safeTender?.description?.toLowerCase().startsWith('http') && safeTender.description !== safeTender.title) {
            addLinks(safeTender.description, 'Source Doc');
        }

        if (docs.length === 0 && safeTender?.source_site) {
            docs.push({
                name: 'Portal Tender Document',
                url: safeTender.source_site,
                size: 'Portal'
            });
        }
        return docs;
    };

    const tenderDocs = getDocuments();

    const handleDownloadAll = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isPaid) return;
        if (tenderDocs.length === 0) {
            // Fallback to source site if no specific docs
            if (safeTender?.source_site) {
                window.open(safeTender.source_site, '_blank');
            }
            return;
        }

        // Filter out generic portal homepages (like bidplus.gem.gov.in/) which are not real documents
        const validDocs = tenderDocs.filter(d => {
            try {
                const u = new URL(d.url);
                // Exclude if it's just the root of a known portal
                if (u.pathname === '/' || u.pathname === '' || u.pathname.length < 2) {
                    const genericHosts = ['gem.gov.in', 'eprocure.gov.in', 'ireps.gov.in'];
                    if (genericHosts.some(h => u.hostname.includes(h))) return false;
                }
                return true;
            } catch { return true; }
        });

        const listToDownload = validDocs.length > 0 ? validDocs : tenderDocs;

        if (listToDownload.length === 0) {
            if (safeTender?.source_site) window.open(safeTender.source_site, '_blank');
            return;
        }

        // Trigger staggered downloads to avoid browser blockages
        listToDownload.forEach((doc, i) => {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = doc.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, i * 1500);
        });
    };

    const getCleanTitle = (title: string, id: string | number, authority?: string) => {
        if (!title || typeof title !== 'string') return `Tender ${id}`;
        if (title.toLowerCase().startsWith('http')) {
            // Use authority as title if URL is present
            if (authority && authority.length > 5 && authority.toLowerCase() !== 'refer document' && authority.toLowerCase() !== 'refer doc') {
                return authority;
            }
            return `Tender Details - ${String(id).replace(/^BIDALERT-/, 'BA-')}`;
        }
        return title;
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bid-green"></div>
                <p className="mt-4 text-gray-400 font-medium">{authLoading ? 'Verifying Access...' : 'Analysing Tender Details...'}</p>
            </div>
        );
    }

    if ((error || !tender) && isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
                <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100">
                    <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tender Not Found</h2>
                    <p className="text-gray-500 mb-8">{error || "The tender details could not be retrieved."}</p>
                    <Link href="/tenders" className="block bg-bid-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-bid-green hover:text-bid-dark transition-all">
                        Browse All Tenders
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-[#FDFDFD] pb-20 ${!isAuthenticated ? 'h-screen overflow-hidden' : ''}`}>
            {/* Blurred Overlay for Unauthenticated Users */}
            {!isAuthenticated && !loading && (
                <div className="fixed inset-0 z-[150] bg-white/40 backdrop-blur-[8px] flex items-center justify-center pointer-events-auto transition-all duration-300">
                    {/* The auth modal is rendering at z-[200] so it will appear on top of this */}
                </div>
            )}
            {/* Payment Successful Badge - Only show for Paid Users */}
            {isPaid && (
                <div className="bg-[#004D40] text-white py-3 sm:py-4 px-4 text-center sticky top-0 z-50 shadow-xl border-b border-white/10">
                    <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6">
                        <div className="flex items-center gap-2 font-black text-xs sm:text-base text-emerald-400 uppercase tracking-widest">
                            <CheckCircle2 size={20} />
                            <span>Payment Successful</span>
                        </div>
                        <div className="h-4 w-[1px] bg-white/20 hidden sm:block"></div>
                        <span className="text-[10px] sm:text-sm font-bold text-white/90">Premium Tender Access Enabled</span>
                        <div className="hidden sm:block h-1 w-1 bg-white/20 rounded-full"></div>
                        <span className="text-[9px] sm:text-xs font-black bg-white/10 px-3 py-1 rounded-full border border-white/10 uppercase tracking-tighter">
                            Valid till: {user?.plan_expiry_date ? new Date(user.plan_expiry_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                        </span>
                    </div>
                </div>
            )}

            <div className="max-w-[1530px] mx-auto px-3 sm:px-6 pt-2 sm:pt-4 page-container no-break">
                <Link href="/tenders" className="inline-flex items-center text-gray-400 hover:text-bid-green transition text-xs sm:text-sm font-medium mb-2 sm:mb-4">
                    <ChevronLeft size={14} className="mr-0.5 sm:mr-1 sm:w-4 sm:h-4" />
                    Back to Tenders
                </Link>

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-3 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex-1 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5 sm:mb-3">
                            <span className="bg-[#E4F9F2] text-[#00A86B] text-[8px] sm:text-[10px] uppercase font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#00A86B10]">
                                {safeTender.category || 'Tender'}
                            </span>
                            {safeTender.source_table && (
                                <span className="bg-blue-50 text-blue-600 text-[8px] sm:text-[10px] uppercase font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-100">
                                    {safeTender.source_table === 'GEM' ? 'GeM Tender' :
                                        safeTender.source_table === 'eProcurement' ? 'eProcurement Tender' :
                                            safeTender.source_table === 'iREPS' ? 'IREPS Tender' :
                                                `${safeTender.source_table} Tender`}
                                </span>
                            )}
                            <span className="text-gray-400 text-xs sm:text-sm font-medium">
                                Ref: {(() => {
                                    const rawId = String(safeTender.reference_number || safeTender.id || '');
                                    return rawId.replace(/^BIDALERT-/, 'BA-');
                                })()}
                            </span>
                        </div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0D1B2A] leading-tight mb-2 sm:mb-4">
                            {getCleanTitle(safeTender.title, safeTender.id, safeTender.authority)}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-8 text-[#4A5568]">
                            <div className="flex items-center gap-1.5 sm:gap-2.5">
                                <Building size={14} className="text-bid-green sm:w-[18px] sm:h-[18px]" />
                                <span className="text-xs sm:text-sm font-bold uppercase tracking-tight">
                                    {getCleanTitle(safeTender.title, safeTender.id, safeTender.authority) === safeTender.authority ? `Ref: ${String(safeTender.reference_number || safeTender.id || '').replace(/^BIDALERT-/, 'BA-')}` : safeTender.authority}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2.5">
                                <MapPin size={14} className="text-bid-green sm:w-[18px] sm:h-[18px]" />
                                <span className="text-xs sm:text-sm font-medium">{safeTender.city}, {safeTender.state}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
                        {!isPaid ? (
                            <Link href={`/plans?callbackUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '')}`} className="flex-1 lg:flex-none bg-bid-dark text-white font-black py-4 px-8 rounded-2xl hover:bg-bid-green hover:text-bid-dark transition-all flex items-center justify-center gap-3 shadow-2xl text-xs sm:text-sm border-2 border-transparent hover:border-bid-green group">
                                <Lock size={18} className="text-bid-green group-hover:text-bid-dark transition-colors" />
                                Unlock Full Tender (Premium)
                            </Link>
                        ) : (
                            <div className="flex gap-2 w-full lg:w-auto">
                                <button
                                    onClick={handleDownloadAll}
                                    className="flex-1 lg:flex-none bg-bid-green text-bid-dark font-black py-4 px-8 rounded-2xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-bid-green/20 text-xs sm:text-sm"
                                >
                                    <Download size={18} />
                                    Download All Tender Documents (Premium)
                                </button>
                                <button onClick={() => window.print()} className="p-4 bg-white border border-gray-200 rounded-2xl text-gray-400 hover:text-bid-dark hover:border-bid-dark transition-all">
                                    <Printer size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">

                        {/* Financial Details Card - ALWAYS VISIBLE BUT LIMITED */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F0F5F2] p-4 sm:p-6 shadow-sm">
                            <h3 className="text-sm sm:text-base font-black text-[#1A202C] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                                <IndianRupee size={16} className="text-bid-green sm:w-5 sm:h-5" />
                                Financial Details
                            </h3>
                            <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6">
                                <div className="border-r border-gray-50 last:border-0 pr-2 sm:pr-0">
                                    <p className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1 sm:mb-2">Est. Cost</p>
                                    <p className="text-sm sm:text-2xl font-black text-bid-dark break-all">
                                        {formatTenderValue(safeTender.estimated_value) === 'Refer Doc' ? (
                                            (safeTender.gemdoclink || safeTender.doclinks) ? (
                                                <a href={safeTender.gemdoclink || safeTender.doclinks} target="_blank" rel="noopener noreferrer" className="text-bid-green hover:underline text-xs sm:text-lg">Refer Document ↗</a>
                                            ) : 'Refer Doc'
                                        ) : formatTenderValue(safeTender.estimated_value)}
                                    </p>
                                </div>
                                <div className="border-r border-gray-50 last:border-0 pr-2 sm:pr-0">
                                    <p className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1 sm:mb-2">EMD</p>
                                    <p className="text-sm sm:text-2xl font-black text-bid-dark break-all">
                                        {formatTenderValue(safeTender.emd_value) === 'Refer Doc' ? (
                                            (safeTender.gemdoclink || safeTender.doclinks) ? (
                                                <a href={safeTender.gemdoclink || safeTender.doclinks} target="_blank" rel="noopener noreferrer" className="text-bid-green hover:underline text-xs sm:text-lg">Refer Document ↗</a>
                                            ) : 'Refer Doc'
                                        ) : formatTenderValue(safeTender.emd_value)}
                                    </p>
                                </div>
                                <div className="last:border-0">
                                    <p className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1 sm:mb-2">Tender Fee</p>
                                    <p className="text-sm sm:text-2xl font-black text-bid-dark">
                                        {isPaid ? '₹25,000' : '🔒 Locked'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Timelines Card */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F0F5F2] p-4 sm:p-6 shadow-sm">
                            <h3 className="text-sm sm:text-base font-black text-[#1A202C] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                                <Clock size={16} className="text-bid-green sm:w-5 sm:h-5" />
                                Important Timelines
                            </h3>
                            <div className="space-y-2 sm:space-y-4">
                                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-50">
                                    <span className="text-[#4A5568] font-bold text-xs sm:text-base">Publish Date</span>
                                    <span className="font-extrabold text-[#1A202C] text-xs sm:text-base">{parseDate(safeTender.created_at)}</span>
                                </div>
                                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-50">
                                    <span className="text-[#4A5568] font-bold text-xs sm:text-base">Deadline</span>
                                    <span className="font-extrabold text-red-500 text-xs sm:text-base">{parseDate(safeTender.deadline)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#4A5568] font-bold text-xs sm:text-base">Bid Opening</span>
                                    <span className="font-extrabold text-bid-green text-xs sm:text-base">
                                        {isPaid ? 'Oct 26, 2026' : '🔒 Upgrade to View'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* PREMIUM SECTIONS - ONLY FOR PAID USERS */}
                        {isPaid ? (
                            <>
                                {/* 2. Eligibility & Qualification Section (NEW) */}
                                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F0F5F2] p-4 sm:p-6 shadow-sm ring-2 ring-bid-green/10">
                                    <h3 className="text-sm sm:text-base font-black text-bid-dark mb-4 flex items-center gap-2 sm:gap-3 uppercase tracking-tight">
                                        <CheckCircle2 size={18} className="text-bid-green" />
                                        Eligibility & Qualification
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-[#F8FBFA] p-4 rounded-xl border border-emerald-50">
                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Technical Experience</p>
                                            <p className="text-sm font-bold text-bid-dark">✔ Minimum 3 similar {safeTender.category || 'CCTV'} projects in last 5 years.</p>
                                        </div>
                                        <div className="bg-[#F8FBFA] p-4 rounded-xl border border-emerald-50">
                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Financial Turnover</p>
                                            <p className="text-sm font-bold text-bid-dark">✔ Avg. Turnover: ₹50 Lakhs (last 3 years)</p>
                                        </div>
                                        <div className="bg-[#F8FBFA] p-4 rounded-xl border border-emerald-50">
                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Certifications</p>
                                            <p className="text-sm font-bold text-bid-dark">✔ OEM Authorization & GST Mandatory</p>
                                        </div>
                                        <div className="bg-[#F8FBFA] p-4 rounded-xl border border-emerald-50">
                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Local Office</p>
                                            <p className="text-sm font-bold text-bid-dark">✔ Service center required in {safeTender.state}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. BOQ & Cost Insights (NEW) */}
                                <div className="bg-[#0A1A14] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-10 bg-bid-green/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                    <h3 className="text-sm sm:text-base font-black mb-4 flex items-center gap-2 sm:gap-3 relative z-10">
                                        <Zap size={18} className="text-bid-green" />
                                        BOQ & Cost Insights
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-bid-green/80 uppercase">Units/Scope</p>
                                                <p className="text-base font-bold">120+ CCTV Camera Systems + NVR Setup</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-bid-green/80 uppercase">Maintenance Period</p>
                                                <p className="text-base font-bold">1 Year Official AMC Support</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                            <p className="text-[10px] font-bold text-bid-green uppercase">Bid Analysis</p>
                                            <div className="mt-2 text-2xl font-black">₹2,08,000</div>
                                            <p className="text-xs text-white/60">Estimated Monthly Value</p>
                                            <div className="mt-3 bg-bid-green/20 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-bid-green h-full w-[65%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Bid Submission Guide (NEW) */}
                                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F0F5F2] p-4 sm:p-6 shadow-sm">
                                    <h3 className="text-sm sm:text-base font-black text-bid-dark mb-4">How to Apply (Step-by-Step)</h3>
                                    <div className="space-y-4">
                                        {[
                                            "Download NIT and Technical Specifications below.",
                                            "Prepare Technical Bid as per Annexure-A.",
                                            "Prepare Financial Bid (BOQ) with Itemized Pricing.",
                                            "Upload documents on IREPS/Gem portal before deadline.",
                                            "Pay EMD/Fee through Online Mode (Net Banking)."
                                        ].map((step, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-bid-green text-bid-dark flex items-center justify-center font-black text-xs">{i + 1}</div>
                                                <p className="text-sm font-medium text-gray-600">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Description (Extended for Paid) */}
                                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F0F5F2] p-4 sm:p-6 shadow-sm">
                                    <h3 className="text-sm sm:text-base font-black text-[#1A202C] mb-3 sm:mb-4">Project Full Description</h3>
                                    <div className="text-[#4A5568] leading-relaxed text-xs sm:text-sm font-medium space-y-4">
                                        <p>{safeTender.description || 'Full scope of work involves the deployment, configuration, and testing of CCTV systems across major stations in Northern Railway. Contractor must provide 24/7 on-site support as part of the AMC.'}</p>
                                        <p className="bg-yellow-50 p-4 border-l-4 border-yellow-400 text-yellow-800 text-xs">
                                            <strong>Note:</strong> Special attention to technical compliance is required as per section 3.5 of the NIT.
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* Locked Content Placeholder for Free Users (PREVIEW MODE) */
                            <div className="space-y-4">
                                {/* Basic Description - Always show 1 line */}
                                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F0F5F2] p-4 sm:p-6 shadow-sm">
                                    <h3 className="text-sm sm:text-base font-black text-[#1A202C] mb-2">Short Description (Preview)</h3>
                                    <p className="text-gray-500 text-xs sm:text-sm italic line-clamp-2">
                                        {safeTender.description || 'Full scope of work involves the deployment, configuration, and testing of CCTV systems across Northern Railway...'}
                                    </p>
                                </div>

                                {/* Segmented Locked Sections */}
                                <div className="space-y-4">
                                    {/* 1. Locked Eligibility */}
                                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-6 flex items-center justify-between group hover:border-bid-green transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 group-hover:text-bid-green">
                                                <Lock size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-gray-400 uppercase tracking-tight">🔒 Eligibility & Qualification</h4>
                                                <p className="text-xs font-bold text-gray-400">Unlock to view eligibility criteria</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. Locked BOQ */}
                                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-6 flex items-center justify-between group hover:border-bid-green transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 group-hover:text-bid-green">
                                                <Lock size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-gray-400 uppercase tracking-tight">🔒 BOQ & Cost Insights</h4>
                                                <p className="text-xs font-bold text-gray-400">Unlock to view cost breakdown</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Locked Bid Guide */}
                                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-6 flex items-center justify-between group hover:border-bid-green transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 group-hover:text-bid-green">
                                                <Lock size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-gray-400 uppercase tracking-tight">🔒 How to Apply</h4>
                                                <p className="text-xs font-bold text-gray-400">Unlock for step-by-step instructions</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Big Unlock CTA */}
                                <div className="bg-bid-dark text-white rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-10 bg-bid-green/10 blur-3xl rounded-full"></div>
                                    <h3 className="text-lg sm:text-xl font-black mb-3 relative z-10">Premium Details Locked</h3>
                                    <p className="text-gray-400 max-w-sm mb-6 font-medium text-sm leading-relaxed mx-auto relative z-10 italic">
                                        "Don't miss out on Eligibility Criteria, BOQ Insights, and Bidding Guides trusted by 5,000+ businesses."
                                    </p>
                                    <Link href={`/plans?callbackUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '')}`} className="bg-bid-green text-bid-dark font-black py-5 px-10 rounded-2xl hover:scale-105 active:scale-95 transition shadow-xl text-base inline-flex items-center gap-3 relative z-10">
                                        <Zap size={20} fill="currentColor" />
                                        UNLOCK FULL TENDER (₹XXX/YEAR)
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Secondary Info */}
                    <div className="space-y-4 sm:space-y-6">

                        {/* Tender Intelligence (NEW) */}
                        {isPaid && (
                            <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1B263B] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/5 overflow-hidden relative">
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-bid-green/20 blur-3xl rounded-full"></div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm sm:text-base font-black flex items-center gap-2">
                                        <HelpCircle size={18} className="text-bid-green" />
                                        Tender Insights
                                    </h3>
                                    <span className="bg-bid-green text-bid-dark text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter flex items-center gap-1">
                                        <Zap size={8} fill="currentColor" /> AI Insights
                                    </span>
                                </div>
                                <div className="space-y-5">
                                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                                        <span className="text-[10px] font-bold text-gray-400">Competition</span>
                                        <span className="text-xs font-black text-orange-400">MEDIUM (8-12 Bidders)</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                                        <span className="text-[10px] font-bold text-gray-400">Risk Assessment</span>
                                        <span className="text-xs font-black text-bid-green">LOW RISK</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                                        <span className="text-[10px] font-bold text-gray-400">Past Trend</span>
                                        <span className="text-xs font-black text-white">₹23–26 Lakhs Avg. Win</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-2 text-white/40 mb-2">
                                        <TrendingUp size={14} />
                                        <span className="text-[9px] font-bold uppercase">Market Demand</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} className={`h-${Math.floor(Math.random() * 4) + 2} w-full bg-bid-green/40 rounded-t-sm`}></div>)}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Documents Section */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F0F5F2] p-4 sm:p-6 shadow-sm relative overflow-hidden">
                            {!isPaid && (
                                <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[6px] flex flex-col items-center justify-center p-6 text-center">
                                    <div className="bg-gray-100 p-3 rounded-full mb-4"><Lock size={20} className="text-gray-400" /></div>
                                    <p className="text-[10px] font-black text-bid-dark uppercase tracking-widest leading-relaxed">
                                        Tender Documents Locked<br />
                                        <span className="text-bid-green text-[12px]">Unlock to download documents</span>
                                    </p>
                                </div>
                            )}
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <h3 className="text-sm sm:text-base font-black text-bid-dark">Tender Documents</h3>
                                <span className="text-[8px] sm:text-[9px] font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-full uppercase tracking-tighter">
                                    {isPaid ? `${tenderDocs.length} Files Unlocked` : '1 Files Locked'}
                                </span>
                            </div>
                            <div className="space-y-4 sm:space-y-6">
                                {isPaid ? (
                                    <>
                                        {tenderDocs.length > 0 ? (
                                            tenderDocs.map((doc, idx) => (
                                                <a key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between hover:bg-gray-50 p-2 -mx-2 rounded-2xl transition group">
                                                    <div className="flex items-center gap-3 sm:gap-4">
                                                        <div className={`w-10 h-10 ${idx % 3 === 0 ? 'bg-emerald-50 text-emerald-600' : idx % 3 === 1 ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'} rounded-xl flex items-center justify-center group-hover:bg-bid-green group-hover:text-bid-dark transition-all`}>
                                                            <FileText size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black text-bid-dark leading-none mb-1">{doc.name}</p>
                                                            <p className="text-[9px] text-gray-400 font-bold uppercase">{doc.size}</p>
                                                        </div>
                                                    </div>
                                                    <Download size={16} className="text-gray-200 group-hover:text-bid-green" />
                                                </a>
                                            ))
                                        ) : (
                                            <div className="py-10 text-center">
                                                <p className="text-sm text-gray-400 font-bold italic">No document links found in portal.</p>
                                                {safeTender?.source_site && (
                                                    <a href={safeTender.source_site} target="_blank" rel="noopener noreferrer" className="text-xs text-bid-green hover:underline mt-2 inline-block">Visit Source Site</a>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    /* Blurred Document View */
                                    <div className="space-y-4 opacity-50 grayscale">
                                        <div className="flex items-center justify-between p-2">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300"><FileText size={18} /></div>
                                                <div className="h-4 w-32 bg-gray-100 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Consultant Support (Enhanced for Paid) */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F0F5F2] p-4 sm:p-6 text-center shadow-lg relative overflow-hidden group">
                            {isPaid && (
                                <div className="absolute top-0 right-0 bg-bid-green text-bid-dark text-[8px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest shadow-sm">
                                    Available only for paid users
                                </div>
                            )}
                            <h4 className="text-sm sm:text-lg font-black text-bid-dark mb-2 sm:mb-3">
                                {isPaid ? 'Consultant Expert Support' : 'Need Help Bidding?'}
                            </h4>
                            <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-6 leading-relaxed max-w-[200px] mx-auto italic">
                                {isPaid
                                    ? 'Get 1-on-1 assistance with your technical documentation and eligibility checks.'
                                    : 'Our experts can help you prepare documents and submit your bid correctly.'}
                            </p>
                            {!isPaid && (
                                <div className="mb-4 bg-gray-50 border border-dashed border-gray-200 p-3 rounded-xl text-[10px] text-gray-400 font-bold uppercase">
                                    🔒 Unlock Premium to Connect
                                </div>
                            )}
                            <Link
                                href={isPaid ? "/contact" : `/plans?callbackUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '')}`}
                                className={`w-full ${isPaid ? 'bg-[#0A1A14]' : 'bg-gray-200 cursor-not-allowed group-hover:bg-bid-green group-hover:text-bid-dark'} text-white font-bold py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 group-hover:translate-y-[-2px]`}
                            >
                                {isPaid ? <Zap size={16} className="text-bid-green" fill="currentColor" /> : <Lock size={16} className="text-gray-400 group-hover:text-bid-dark" />}
                                {isPaid ? 'Connect with Expert' : 'Unlock Expert Support'}
                            </Link>
                        </div>

                        {/* Social Share (Only for Paid) */}
                        {isPaid && (
                            <div className="flex gap-4">
                                <button className="flex-1 bg-white border border-gray-100 py-3 rounded-xl shadow-sm text-gray-500 hover:text-bid-green transition-all flex items-center justify-center gap-2 text-xs font-bold">
                                    <Share2 size={16} /> Share
                                </button>
                                <button className="flex-1 bg-white border border-gray-100 py-3 rounded-xl shadow-sm text-gray-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2 text-xs font-bold">
                                    <Facebook size={16} /> FaceBook
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
