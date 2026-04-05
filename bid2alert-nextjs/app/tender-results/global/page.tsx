'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, Search, Calendar, MapPin, Building, Globe, Facebook, Instagram, Linkedin, MessageCircle, FileText, ChevronRight, X } from 'lucide-react';
import { countries, categories } from '@/data/filterOptions';

// Global Sources
const sources = [
    "World Bank",
    "Asian Development Bank",
    "United Nations",
    "UNGM",
    "dgMarket",
    "Tenders Info",
    "Global Tenders",
    "UNDP",
    "European Union"
];

// Helper for Highlight
const Highlight = ({ text, query }: { text: string; query: string }) => {
    const keywords = query ? query.split(',').map(k => k.trim()).filter(k => k.length > 0) : [];
    if (keywords.length === 0) return <>{text}</>;

    const escapedKeywords = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    // Using word boundaries to avoid partial highlights like "GAS" in "SARGASAN"
    const regex = new RegExp(`(\\b(?:${escapedKeywords})\\b)`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) => {
                const lowerPart = part.toLowerCase();
                const isMatch = keywords.some(k => lowerPart === k.toLowerCase());
                return isMatch ? (
                    <mark key={i} className="highlight-blink">{part}</mark>
                ) : (
                    part
                );
            })}
        </>
    );
};

// Suspense wrapper for SearchParams
function GlobalTendersContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State for filters
    const [filters, setFilters] = useState({
        q: searchParams.get('q') || '',
        country: searchParams.get('country') || '',
        city: searchParams.get('city') || '',
        category: searchParams.get('category') || '',
        source: searchParams.get('source') || '',
        authority: searchParams.get('authority') || '',
        page: parseInt(searchParams.get('page') || '1'),
        sort: searchParams.get('sort') || 'latest',
        limit: 20
    });

    const [tenders, setTenders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalTenders, setTotalTenders] = useState(0);

    // Debounced search for keyword & city
    useEffect(() => {
        const urlQ = searchParams.get('q') || '';
        const urlCity = searchParams.get('city') || '';
        if (filters.q === urlQ && filters.city === urlCity) return;

        const timer = setTimeout(() => {
            const queryParams = new URLSearchParams();
            Object.entries({ ...filters, page: 1 }).forEach(([key, val]) => {
                if (val) queryParams.append(key, String(val));
            });
            router.push(`/tender-results/global?${queryParams.toString()}`);
        }, 800);

        return () => clearTimeout(timer);
    }, [filters.q, filters.city, router, searchParams]);

    // Fetch tenders when URL params change (Single source of truth)
    useEffect(() => {
        const urlFilters = {
            q: searchParams.get('q') || '',
            country: searchParams.get('country') || '',
            city: searchParams.get('city') || '',
            category: searchParams.get('category') || '',
            source: searchParams.get('source') || '',
            authority: searchParams.get('authority') || '',
            page: parseInt(searchParams.get('page') || '1'),
            sort: searchParams.get('sort') || 'latest',
            limit: 20
        };

        // Sync local form state
        setFilters(urlFilters);

        const fetchTenders = async () => {
            setIsLoading(true);
            try {
                const queryParams = new URLSearchParams();
                Object.entries(urlFilters).forEach(([key, value]) => {
                    if (value) queryParams.append(key, String(value));
                });

                const response = await fetch(`/api/global-tenders?${queryParams.toString()}`);

                if (response.ok) {
                    const data = await response.json();
                    setTenders(data.tenders || []);
                    setTotalTenders(data.total || 0);
                }
            } catch (error) {
                console.error('Error fetching global tenders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTenders();
    }, [searchParams, router]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, tagName } = (e.target as any);
        const newFilters = { ...filters, [name]: value, page: 1 };
        setFilters(newFilters);

        // If it's a dropdown (select), apply filters immediately
        if (tagName === 'SELECT') {
            const queryParams = new URLSearchParams();
            Object.entries(newFilters).forEach(([key, val]) => {
                if (val) queryParams.append(key, String(val));
            });
            router.push(`/tender-results/global?${queryParams.toString()}`);
        }
    };

    const applyFilters = (e: React.FormEvent) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.append(key, String(value));
        });
        router.push(`/tender-results/global?${queryParams.toString()}`);
    };

    const clearFilters = () => {
        setFilters({ q: '', country: '', city: '', category: '', source: '', authority: '', page: 1, sort: 'latest', limit: 20 });
        router.push('/tender-results/global');
    };

    const handlePageChange = (newPage: number) => {
        const queryParams = new URLSearchParams(searchParams.toString());
        queryParams.set('page', newPage.toString());
        router.push(`/tender-results/global?${queryParams.toString()}`);

        // Scroll list to top
        const container = document.getElementById('tenders-list-container');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleSortChange = (newSort: string) => {
        const queryParams = new URLSearchParams(searchParams.toString());
        queryParams.set('sort', newSort);
        queryParams.set('page', '1'); // Reset to page 1 on sort change
        router.push(`/tender-results/global?${queryParams.toString()}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
            {/* Full Width Top Section */}
            <div className="w-full flex-shrink-0 bg-white">
                <div className="container mx-auto px-4 max-w-[1530px]">
                    {/* Breadcrumb Container */}
                    <div className="pt-6 pb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium pb-4">
                            <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                                Home
                            </Link>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-900 font-bold">Tender Results</span>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                            <span className="text-bid-green">Global</span>
                        </div>

                        {/* Tab Navigation for Tender Results */}
                        <div className="flex items-center gap-6 mt-2 border-b border-slate-200">
                            <Link
                                href="/tender-results/india"
                                className="text-sm font-black uppercase tracking-widest transition-all pb-3 -mb-[1px] border-b-2 text-slate-400 border-transparent hover:text-slate-600 hover:border-slate-300"
                            >
                                India Tender Results
                            </Link>
                            <Link
                                href="/tender-results/global"
                                className="text-sm font-black uppercase tracking-widest transition-all pb-3 -mb-[1px] border-b-2 text-bid-green border-bid-green"
                            >
                                Global Tender Results
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Truly Full Width Banner */}
                <div className="w-full bg-gradient-to-r from-[#0b7e43] via-[#10b981] to-[#10b981] text-white py-12 mb-8 relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-[1530px]">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight uppercase italic decoration-white">
                                    Global Tender <span className="opacity-95">Results</span>
                                </h1>
                                <p className="text-white/95 text-base md:text-lg max-w-2xl font-medium tracking-wide">
                                    Search and discover {totalTenders.toLocaleString()}+ international global tender results worldwide.
                                </p>
                            </div>

                            <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md rounded-2xl px-8 py-5 border border-white/20">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"></div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Live</span>
                                </div>
                                <div className="h-8 w-[2px] bg-white/30 mx-2" />
                                <span className="text-3xl font-black text-white">{totalTenders.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1530px] flex-grow">
                <div className="flex flex-col lg:flex-row gap-8 items-start h-full">

                    {/* SIDEBAR FILTER */}
                    <aside className="w-full lg:w-1/4 pb-8">
                        <form onSubmit={applyFilters} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 flex flex-col h-full lg:sticky lg:top-24">
                            <div className="bg-[#0A0F1C] px-6 py-6 border-b border-white/5 flex justify-between items-center flex-shrink-0">
                                <h3 className="font-bold text-white text-base flex items-center gap-3">
                                    <Filter className="w-5 h-5 text-bid-green" />
                                    Smart Filters
                                </h3>
                                <button type="button" onClick={clearFilters} className="text-[10px] font-black text-bid-green hover:brightness-110 uppercase tracking-widest bg-bid-green/10 px-3 py-1.5 rounded-lg transition-all">Reset</button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Search */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Keyword Search</label>
                                    <div className="relative group">
                                        <input
                                            type="text" name="q" value={filters.q}
                                            onChange={handleFilterChange}
                                            placeholder="Tender ID or Keyword..."
                                            className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-bid-green focus:ring-4 focus:ring-bid-green/5 transition-all"
                                        />
                                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4 group-focus-within:text-bid-green transition-colors" />
                                        {filters.q && (
                                            <button
                                                type="button"
                                                onClick={() => setFilters(prev => ({ ...prev, q: '' }))}
                                                className="absolute right-4 top-4 text-slate-400 hover:text-red-500"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Country Select */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Country</label>
                                    <select
                                        name="country" value={filters.country} onChange={handleFilterChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-bid-green transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Countries</option>
                                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                {/* City Input */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">City / Local Region</label>
                                    <input
                                        type="text"
                                        name="city" value={filters.city} onChange={handleFilterChange}
                                        placeholder="City Name"
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-bid-green focus:ring-4 focus:ring-bid-green/5 transition-all"
                                    />
                                </div>

                                {/* Category Select */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Category</label>
                                    <select
                                        name="category" value={filters.category} onChange={handleFilterChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-bid-green transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                {/* Source Select */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Source Platform</label>
                                    <select
                                        name="source" value={filters.source} onChange={handleFilterChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-bid-green transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Platforms</option>
                                        {sources.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 border-t border-slate-100 flex-shrink-0">
                                <button type="submit" className="w-full bg-[#0A0F1C] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                                    Apply Search
                                </button>
                            </div>
                        </form>
                    </aside>

                    {/* Main Content Area - Independently Scrollable */}
                    <main className="w-full lg:w-3/4 pb-12">

                        {/* Results Header */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 sticky top-0 z-30 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-5">
                                <div className="p-4 bg-bid-green/10 rounded-2xl text-bid-green shadow-inner">
                                    <Globe className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Results Inventory</p>
                                    <p className="text-sm font-medium text-slate-500">
                                        {filters.q ? (
                                            <>
                                                Found <span className="font-black text-bid-green text-lg">{totalTenders.toLocaleString()}</span> results for <span className="text-slate-900 font-black italic">"{filters.q}"</span>
                                            </>
                                        ) : (
                                            <>
                                                Showing <span className="font-black text-slate-900 text-lg">{(filters.page - 1) * 20 + 1}-{Math.min(filters.page * 20, totalTenders)}</span> of <span className="font-black text-bid-green text-lg">{totalTenders.toLocaleString()}</span> tender results
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                    {[
                                        { id: 'latest', label: 'Latest' },
                                        { id: 'closing_date', label: 'Closing Soon' },
                                        { id: 'estimated_value', label: 'Value' }
                                    ].map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => handleSortChange(s.id)}
                                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filters.sort === s.id
                                                ? 'bg-white text-bid-green shadow-md shadow-slate-200'
                                                : 'text-slate-400 hover:text-slate-600'
                                                }`}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tender List Cards */}
                        <div id="tenders-list-container" className="space-y-4 pr-1 sm:pr-2">
                            {isLoading ? (
                                <div className="space-y-6">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="bg-white rounded-xl border border-slate-100 p-8 animate-pulse shadow-sm">
                                            <div className="h-4 bg-slate-100 rounded-full w-1/4 mb-6"></div>
                                            <div className="h-8 bg-slate-50 rounded-xl w-3/4 mb-4"></div>
                                            <div className="h-12 bg-slate-50/50 rounded-lg w-full mb-6"></div>
                                            <div className="flex justify-between">
                                                <div className="h-4 bg-slate-100 rounded-lg w-32"></div>
                                                <div className="h-4 bg-slate-100 rounded-lg w-32"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : tenders.length > 0 ? (
                                <>
                                    {tenders.map((tender: any, index: number) => {
                                        const combinedQuery = [filters.q, filters.country, filters.city, filters.category, filters.source, filters.authority].filter(Boolean).join(',');
                                        return (
                                            <div key={`${tender.id}-${index}`} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                                                {/* Header - Solid Green Bar */}
                                                <div className="bg-[#41a367] px-4 py-2.5 flex justify-between items-center text-white">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-[#1a4d2e]"></div>
                                                        <span className="text-[11px] font-bold uppercase tracking-wider">#{(filters.page - 1) * 20 + index + 1} [<Highlight text={tender.source || 'Global Tender'} query={combinedQuery} />] <Highlight text={tender.country || 'GLOBAL'} query={combinedQuery} /> RESULTS</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 opacity-90">
                                                        <FileText className="w-3.5 h-3.5" />
                                                        <span className="text-[11px] font-bold">{tender.id || 'REF-N/A'}</span>
                                                    </div>
                                                </div>

                                                {/* Body */}
                                                <div className="p-5">
                                                    <div className="mb-1 text-[11px] text-slate-500 font-medium">Tender Info:</div>
                                                    <Link href={`/global-tenders/${encodeURIComponent(tender.id)}`}>
                                                        <h2 className="text-lg font-bold text-[#1e293b] leading-tight mb-4 group-hover:text-[#41a367] transition-colors uppercase">
                                                            <Highlight text={tender.title} query={combinedQuery} />
                                                        </h2>
                                                    </Link>

                                                    {/* Info Pill - Authority & Location */}
                                                    <div className="bg-[#f1f5f9]/60 border border-slate-100 rounded-lg py-2.5 px-4 flex items-center gap-4 mb-5">
                                                        <div className="flex items-center gap-2 text-[10px] text-slate-600 font-bold uppercase truncate max-w-[60%]">
                                                            <Building className="w-3.5 h-3.5 text-slate-400" />
                                                            <Highlight text={tender.authority || 'Refer Document'} query={combinedQuery} />
                                                        </div>
                                                        <div className="w-px h-3 bg-slate-200"></div>
                                                        <div className="flex items-center gap-2 text-[10px] text-slate-600 font-bold uppercase">
                                                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                            <Highlight text={`${tender.city ? tender.city + ', ' : ''}${tender.country || 'International'}`} query={combinedQuery} />
                                                        </div>
                                                    </div>

                                                    {/* Stats Grid */}
                                                    <div className="space-y-4 mb-6">
                                                        <div className="flex justify-between items-center">
                                                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                                                PUBLISHED: <span className="text-slate-600 ml-1">{tender.created_at ? new Date(tender.created_at).toLocaleDateString() : 'N/A'}</span>
                                                            </div>
                                                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-tight flex items-center">
                                                                CLOSING: <span className="ml-2 bg-red-50 text-red-600 px-3 py-1 rounded-md border border-red-100 font-black">{tender.deadline || 'Refer Document'}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="text-[11px] font-bold text-[#b45cd6] uppercase">
                                                                EMD: <span className="ml-1">
                                                                    {tender.tender_emd && tender.tender_emd !== '0' && !isNaN(Number(tender.tender_emd)) ? (tender.currency ? `${tender.currency} ` : '₹') + tender.tender_emd : 'Refer Doc'}
                                                                </span>
                                                            </div>
                                                            <div className="text-[11px] font-bold text-blue-600 uppercase">
                                                                ECV: <span className="ml-1">
                                                                    {tender.estimated_value && tender.estimated_value !== '0' && !isNaN(Number(tender.estimated_value)) ? (tender.currency ? `${tender.currency} ` : '₹') + tender.estimated_value : 'Refer Doc'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Footer Actions */}
                                                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                                        <div className="flex gap-1.5">
                                                            <Link href="https://www.facebook.com/Bidalert/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#3b5998] text-white rounded flex items-center justify-center hover:brightness-90 transition-all"><Facebook size={14} fill="currentColor" /></Link>
                                                            <Link href="https://www.instagram.com/bidalert.in/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#e1306c] text-white rounded flex items-center justify-center hover:brightness-90 transition-all"><Instagram size={14} /></Link>
                                                            <Link href="https://in.linkedin.com/company/bidalert" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#007fb1] text-white rounded flex items-center justify-center hover:brightness-90 transition-all"><Linkedin size={14} fill="currentColor" /></Link>
                                                            <button className="w-7 h-7 bg-[#25d366] text-white rounded flex items-center justify-center hover:brightness-90 transition-all"><MessageCircle size={14} fill="currentColor" /></button>
                                                        </div>
                                                        <Link href={`/global-tenders/${encodeURIComponent(tender.id)}`} className="bg-[#41a367] text-white px-5 py-2.5 rounded-[4px] shadow-sm font-black text-[10px] uppercase tracking-[0.1em] hover:bg-[#358a55] transition-all flex items-center gap-2">
                                                            <FileText size={14} /> VIEW TENDER
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {/* Pagination UI */}
                                    <div className="mt-12 flex flex-col items-center gap-6">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handlePageChange(filters.page - 1)}
                                                disabled={filters.page === 1}
                                                className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:border-bid-green transition-all shadow-sm active:scale-95"
                                            >
                                                Prev
                                            </button>

                                            <div className="flex items-center gap-2">
                                                {[...Array(Math.min(5, Math.ceil(totalTenders / 20)))].map((_, i) => {
                                                    const pageNum = i + 1;
                                                    return (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${filters.page === pageNum
                                                                ? 'bg-[#0A0F1C] text-white shadow-xl shadow-slate-300 scale-110'
                                                                : 'bg-white border border-slate-200 text-slate-400 hover:border-bid-green hover:text-bid-green shadow-sm'
                                                                }`}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    );
                                                })}
                                                {Math.ceil(totalTenders / 20) > 5 && (
                                                    <span className="flex items-center px-2 text-slate-300">...</span>
                                                )}
                                                {Math.ceil(totalTenders / 20) > 5 && (
                                                    <button
                                                        onClick={() => handlePageChange(Math.ceil(totalTenders / 20))}
                                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${filters.page === Math.ceil(totalTenders / 20)
                                                            ? 'bg-[#0A0F1C] text-white shadow-xl shadow-slate-300 scale-110'
                                                            : 'bg-white border border-slate-200 text-slate-400 shadow-sm'
                                                            }`}
                                                    >
                                                        {Math.ceil(totalTenders / 20)}
                                                    </button>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => handlePageChange(filters.page + 1)}
                                                disabled={filters.page >= Math.ceil(totalTenders / 20)}
                                                className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:border-bid-green transition-all shadow-sm active:scale-95"
                                            >
                                                Next
                                            </button>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            Page {filters.page} of {Math.ceil(totalTenders / 20)}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm">
                                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-10 h-10 text-gray-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Global Tenders Found</h3>
                                    <button onClick={clearFilters} className="inline-block bg-bid-dark text-white px-6 py-2.5 rounded-lg font-bold hover:bg-bid-green hover:text-bid-dark transition">Clear Filters</button>
                                </div>
                            )}
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}

export default function GlobalTendersPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GlobalTendersContent />
        </Suspense>
    );
}
