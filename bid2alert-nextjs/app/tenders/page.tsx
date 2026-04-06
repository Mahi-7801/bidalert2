'use client';
// Re-bundle trigger


import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    Filter, Search, Calendar, MapPin, Building, Info,
    ArrowRight, Globe, Layers, Map as MapIcon,
    ChevronRight, Facebook, Instagram, Linkedin, MessageCircle, FileText
} from 'lucide-react';
import { states, ministries, departments, cities, categories, sectors, tenderKeywords } from '@/data/filterOptions';
import { ChevronDown, Save, X, Briefcase } from 'lucide-react';

// Deduplicate filter arrays to prevent React duplicate-key warnings
const uniqueMinistries = [...new Set(ministries)];
const uniqueDepartments = [...new Set(departments)];
const uniqueCategories = [...new Set(categories)];
const uniqueSectors = [...new Set(sectors)];
const uniqueStates = [...new Set(states)];
const uniqueCities = [...new Set(cities)];

// Helper for Highlight — uses word-boundary regex to avoid splitting mid-word
const Highlight = ({ text, query }: { text: string; query: string }) => {
    const stopWords = ['tender', 'tenders', 'work', 'at', 'under', 'india', 'national'];
    // Split by comma and space to get all relevant search terms
    const keywords = query
        ? query.split(/[,\s]+/)
            .map(k => k.trim())
            .filter(k => k.length >= 2 && !stopWords.includes(k.toLowerCase()))
        : [];

    if (keywords.length === 0) return <>{text}</>;

    // Escape and join keywords for regex
    // Removed \b word boundaries to support partial matches (LIKE %term% consistency)
    const escapedKeywords = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regexSource = escapedKeywords.join('|');

    let regex: RegExp;
    try {
        // Enforce word boundaries to prevent highlighting mid-word matches (e.g. 'TOR' inside 'SECTOR')
        regex = new RegExp(`\\b(${regexSource})\\b`, 'gi');
    } catch {
        return <>{text}</>;
    }

    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) => {
                const lowerPart = part.toLowerCase();
                // Test if this part is the one that matched the regex exact capture group
                const isExactMatch = new RegExp(`^(${regexSource})$`, 'i').test(part);

                return isExactMatch ? (
                    <mark key={i} className="highlight-blink">{part}</mark>
                ) : (
                    part
                );
            })}
        </>
    );
};

const getStateName = (stateSlug: string) => {
    if (!stateSlug) return '';
    const state = states.find(s => s.toLowerCase() === stateSlug.toLowerCase());
    return state || stateSlug;
};

const formatTenderValue = (value: any) => {
    if (!value) return 'Refer Doc';
    const cleanValue = String(value).replace(/,/g, '').trim();
    if (cleanValue === '' || cleanValue === '0' || cleanValue === '0.00') return 'Refer Doc';
    const num = Number(cleanValue);
    if (!isNaN(num) && num > 0) {
        return `â‚¹${num.toLocaleString('en-IN')}`;
    }
    // If it's a descriptive string like "Exempted", show it
    return value;
};

const formatHumanDate = (dateStr: string) => {
    if (!dateStr) return 'Refer Doc';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    } catch { return dateStr; }
};

const getDisplayId = (id: any) => {
    const rawId = String(id || '');
    return rawId.replace(/^BIDALERT-/, 'BA-');
};

const getCleanTitle = (title: string, id: string | number, authority?: string) => {
    if (!title || typeof title !== 'string') return `Tender ${id}`;
    if (title.toLowerCase().startsWith('http')) {
        if (authority && authority.length > 5 && authority.toLowerCase() !== 'refer document' && authority.toLowerCase() !== 'refer doc') {
            return authority;
        }
        return `Tender Details - ${getDisplayId(id)}`;
    }
    return title;
};

function TendersContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initial state from URL
    const [filters, setFilters] = useState({
        q: searchParams.get('q') || '',
        state: searchParams.get('state') || '',
        city: searchParams.get('city') || '',
        category: searchParams.get('category') || '',
        sector: searchParams.get('sector') || '',
        type: searchParams.get('type') || '',
        ministry: searchParams.get('ministry') || '',
        department: searchParams.get('department') || '',
        portal: searchParams.get('portal') || '',
        authority: searchParams.get('authority') || '',
        value_min: searchParams.get('value_min') || '',
        value_max: searchParams.get('value_max') || '',
        status: searchParams.get('status') || '',
        source: searchParams.get('source') || '',
        nav: searchParams.get('nav') || '',
        page: parseInt(searchParams.get('page') || '1'),
        sort: searchParams.get('sort') || 'latest',
        year: searchParams.get('year') || '',
        limit: 20
    });

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const [tenders, setTenders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalTenders, setTotalTenders] = useState(0);
    const [archiveYears, setArchiveYears] = useState<string[]>([]);

    // Fetch tenders when URL params change (Single source of truth)
    useEffect(() => {
        const urlFilters = {
            q: searchParams.get('q') || '',
            state: searchParams.get('state') || '',
            city: searchParams.get('city') || '',
            category: searchParams.get('category') || '',
            sector: searchParams.get('sector') || '',
            type: searchParams.get('type') || '',
            ministry: searchParams.get('ministry') || '',
            department: searchParams.get('department') || '',
            portal: searchParams.get('portal') || '',
            authority: searchParams.get('authority') || '',
            value_min: searchParams.get('value_min') || '',
            value_max: searchParams.get('value_max') || '',
            status: searchParams.get('status') || '',
            source: searchParams.get('source') || '',
            nav: searchParams.get('nav') || '',
            page: parseInt(searchParams.get('page') || '1'),
            sort: searchParams.get('sort') || 'latest',
            year: searchParams.get('year') || '',
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

                const response = await fetch(`/api/tenders?${queryParams.toString()}`);
                if (response.ok) {
                    const data = await response.json();
                    setTenders(data.tenders || []);
                    setTotalTenders(data.total || 0);
                }
            } catch (error) {
                console.error('Error fetching tenders:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTenders();
    }, [searchParams, router]);

    // Fetch archive years once
    useEffect(() => {
        const fetchYears = async () => {
            try {
                const res = await fetch('/api/tenders/archive-years');
                if (res.ok) {
                    const data = await res.json();
                    setArchiveYears(data.years || []);
                }
            } catch (err) { console.error('Error fetching years:', err); }
        };
        fetchYears();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, tagName } = e.target;
        const newFilters = { ...filters, [name]: value, page: 1 };
        setFilters(newFilters);

        // If it's a dropdown (select), apply filters immediately
        if (tagName === 'SELECT') {
            const queryParams = new URLSearchParams();
            Object.entries(newFilters).forEach(([key, val]) => {
                if (val) queryParams.append(key, String(val));
            });
            router.push(`/tenders?${queryParams.toString()}`);
        }
    };

    const handlePageChange = (newPage: number) => {
        const queryParams = new URLSearchParams();
        Object.entries({ ...filters, page: newPage }).forEach(([key, value]) => {
            if (value) queryParams.append(key, String(value));
        });
        router.push(`/tenders?${queryParams.toString()}`);
    };

    const handleSortChange = (newSort: string) => {
        const queryParams = new URLSearchParams();
        Object.entries({ ...filters, sort: newSort, page: 1 }).forEach(([key, value]) => {
            if (value) queryParams.append(key, String(value));
        });
        router.push(`/tenders?${queryParams.toString()}`);
    };

    const applyFilters = (e: React.FormEvent) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        Object.entries({ ...filters, page: 1 }).forEach(([key, value]) => {
            if (value) queryParams.append(key, String(value));
        });
        router.push(`/tenders?${queryParams.toString()}`);
    };

    const clearFilters = () => {
        setFilters({ q: '', state: '', city: '', category: '', sector: '', type: '', ministry: '', department: '', portal: '', authority: '', value_min: '', value_max: '', status: '', source: '', nav: '', year: '', page: 1, sort: 'latest', limit: 20 });
        router.push('/tenders');
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setFilters(prev => ({ ...prev, q: val }));

        if (val.trim().length > 1) {
            const lowVal = val.toLowerCase();
            const filtered = tenderKeywords.filter(k =>
                k.toLowerCase().includes(lowVal)
            ).slice(0, 8);
            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const selectSuggestion = (s: string) => {
        const newFilters = { ...filters, q: s, page: 1 };
        setFilters(newFilters);
        setShowSuggestions(false);

        const queryParams = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) queryParams.append(key, String(value));
        });
        router.push(`/tenders?${queryParams.toString()}`);
    };

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    // Debounced search for keyword
    useEffect(() => {
        const urlQ = searchParams.get('q') || '';
        if (filters.q === urlQ) return;

        const timer = setTimeout(() => {
            const queryParams = new URLSearchParams();
            Object.entries({ ...filters, page: 1 }).forEach(([key, val]) => {
                if (val) queryParams.append(key, String(val));
            });
            router.push(`/tenders?${queryParams.toString()}`);
        }, 700); // 700ms debounce

        return () => clearTimeout(timer);
    }, [filters.q, router, searchParams]);

    const handleSelectFilter = (name: string, value: string) => {
        const newFilters = { ...filters, [name]: value, page: 1 };
        setFilters(newFilters);
        setActiveDropdown(null);

        const queryParams = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) queryParams.append(key, String(value));
        });
        router.push(`/tenders?${queryParams.toString()}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden" onClick={() => { setShowSuggestions(false); setActiveDropdown(null); }}>
            {/* Full Width Top Section */}
            <div className="w-full flex-shrink-0 bg-white">
                <div className="container mx-auto px-4 max-w-[1530px]">
                    {/* Breadcrumb Container */}
                    <div className="pt-6 pb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <Link href="/" className="hover:text-bid-green transition-colors">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-slate-900 font-bold">Tenders</span>
                            {filters.state && (
                                <>
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="text-bid-green">{getStateName(filters.state)}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Truly Full Width Banner */}
                <div className="w-full bg-gradient-to-r from-[#0b7e43] via-[#10b981] to-[#10b981] text-white py-12 mb-8 relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-[1530px]">
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight uppercase italic decoration-white break-words overflow-visible">
                                    Tenders <span className="opacity-95">Intelligence</span>
                                </h1>
                                <p className="text-white/95 text-base md:text-lg max-w-2xl font-medium tracking-wide">
                                    Access {totalTenders.toLocaleString()}+ active government contracts across India.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4 bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3 sm:px-8 sm:py-5 border border-white/20">
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
                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden w-full mb-4">
                        <button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="w-full flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm font-black text-xs uppercase tracking-widest text-[#0A0F1C]"
                        >
                            <div className="flex items-center gap-3">
                                <Filter className={`w-5 h-5 ${showMobileFilters ? 'text-bid-green' : 'text-slate-400'}`} />
                                {showMobileFilters ? 'Hide Search Filters' : 'Show Search Filters'}
                            </div>
                            <ChevronDown className={`w-5 h-5 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Sidebar Filters - Fixed/Sticky */}
                    <aside className={`w-full lg:w-1/4 pb-8 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                        <form onSubmit={applyFilters} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
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
                                    <div className="relative group" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="text" name="q" value={filters.q}
                                            onChange={handleKeywordChange}
                                            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                                            placeholder="Tender ID or Keyword..."
                                            className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-bid-green focus:ring-4 focus:ring-bid-green/5 transition-all"
                                        />
                                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4 group-focus-within:text-bid-green transition-colors" />

                                        {filters.q && (
                                            <button
                                                type="button"
                                                onClick={() => { setFilters(prev => ({ ...prev, q: '' })); setShowSuggestions(false); }}
                                                className="absolute right-4 top-4 text-slate-400 hover:text-red-500"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}

                                        {showSuggestions && suggestions.length > 0 && (
                                            <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
                                                {suggestions.map((s, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => selectSuggestion(s)}
                                                        className="w-full px-5 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-bid-green transition-all flex items-center gap-3"
                                                    >
                                                        <Search className="w-3.5 h-3.5 opacity-40" />
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Location Select */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Region / State</label>
                                    <select
                                        name="state" value={filters.state} onChange={handleFilterChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-bid-green transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Regions</option>
                                        {uniqueStates.map((s, i) => <option key={`state-${i}`} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                {/* Category Select */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Classification</label>
                                    <select
                                        name="category" value={filters.category} onChange={handleFilterChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-bid-green transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Categories</option>
                                        {uniqueCategories.map((c, i) => <option key={`cat-${i}`} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                {/* Sector Select */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sector / Industry</label>
                                    <select
                                        name="sector" value={filters.sector} onChange={handleFilterChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-bid-green transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Sectors</option>
                                        {uniqueSectors.map((s, i) => <option key={`sector-${i}`} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                {/* Type Select */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Tender Type</label>
                                    <select
                                        name="type" value={filters.type} onChange={handleFilterChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-bid-green transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Types</option>
                                        <option value="Goods">Goods</option>
                                        <option value="Services">Services</option>
                                        <option value="Works">Works</option>
                                        <option value="IT invited">IT invited</option>
                                    </select>
                                </div>

                                {/* Ministry Select */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Ministry</label>
                                    <select
                                        name="ministry" value={filters.ministry} onChange={handleFilterChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-bid-green transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Ministries</option>
                                        {uniqueMinistries.map((m, i) => <option key={`min-${i}`} value={m}>{m}</option>)}
                                    </select>
                                </div>

                                {/* Department Select */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Department</label>
                                    <select
                                        name="department" value={filters.department} onChange={handleFilterChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-bid-green transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Departments</option>
                                        {uniqueDepartments.map((d, i) => <option key={`dept-${i}`} value={d}>{d}</option>)}
                                    </select>
                                </div>

                                {/* Town / City Select */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Town / City</label>
                                    <select
                                        name="city" value={filters.city} onChange={handleFilterChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-bid-green transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Cities</option>
                                        {uniqueCities.sort().map((c, i) => <option key={`city-${i}`} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                {/* Archive Year Filter - Only show if in Archive mode */}
                                {filters.status === 'archive' && (
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Archive Year</label>
                                        <select
                                            name="year" value={filters.year} onChange={handleFilterChange}
                                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-bid-green focus:outline-none focus:border-bid-green transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">All Archived Years</option>
                                            {archiveYears.length > 0 ? (
                                                archiveYears.map(y => <option key={y} value={y}>{y}</option>)
                                            ) : (
                                                <>
                                                    <option value="2025">2025</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2018">2018</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 bg-slate-50 border-t border-slate-100 flex-shrink-0">
                                <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-bid-greenhover text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all shadow-xl active:scale-95">
                                    Apply Search
                                </button>
                            </div>
                        </form>
                    </aside>

                    {/* Main Content Area - Independently Scrollable */}
                    <main className="w-full lg:w-3/4 pb-12">
                        <div className="bg-white p-4 sm:p-6 rounded-[20px] sm:rounded-3xl shadow-sm border border-slate-100 mb-8 sticky top-0 z-30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                            <div className="flex items-center gap-3 sm:gap-5">
                                <div className="p-3 sm:p-4 bg-bid-green/10 rounded-2xl text-bid-green shadow-inner shrink-0">
                                    <Layers className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{filters.status === 'archive' ? 'Archive Inventory' : 'Live Inventory'}</p>
                                    <p className="text-sm font-medium text-slate-500">
                                        {filters.q ? (
                                            <>
                                                Found <span className="font-black text-bid-green text-lg">{totalTenders.toLocaleString()}</span> results for <span className="text-slate-900 font-black italic">"{filters.q}"</span>
                                            </>
                                        ) : (
                                            <>
                                                Showing <span className="font-black text-slate-900 text-lg">{(filters.page - 1) * 20 + 1}-{Math.min(filters.page * 20, totalTenders)}</span> of <span className="font-black text-bid-green text-lg">{totalTenders.toLocaleString()}</span> {filters.status === 'archive' ? `${filters.year || ''} archived tenders` : 'active tenders'}
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

                        {/* Tenders List */}
                        <div className="space-y-8 min-h-[60vh]">
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
                                    {tenders.map((tender, index) => {
                                        // If ANY filter is active, ALL returned results are already matched by the API → highlight all cards.
                                        // Using simple boolean: are any filters set?
                                        const hasActiveFilter = !!(filters.q || filters.type || filters.category || filters.state || filters.ministry || filters.department || filters.authority || filters.portal || filters.city);

                                        // Combined query for highlighting all matching terms in the card
                                        const combinedHighlightQuery = [
                                            filters.q,
                                            filters.type,
                                            filters.category,
                                            filters.authority,
                                            filters.state,
                                            filters.ministry,
                                            filters.department,
                                            filters.portal,
                                            filters.city
                                        ].filter(Boolean).join(',');

                                        return (
                                            <div
                                                key={`${tender.id || 'tender'}-${index}`}
                                                className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group`}
                                            >
                                                {/* Header - Solid Green Bar */}
                                                <div className="bg-[#41a367] px-3 sm:px-4 py-2.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-white">
                                                    <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-[#1a4d2e] shrink-0"></div>
                                                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider line-clamp-2 sm:line-clamp-none min-w-0">
                                                            #{(filters.page - 1) * 20 + index + 1} [
                                                            <Highlight
                                                                text={tender.source_table === 'GEM' ? 'GeM Tender' : tender.source_table === 'eProcurement' ? 'eProcurement Tender' : tender.source_table === 'iREPS' ? 'IREPS Tender' : tender.source_table ? `${tender.source_table} Tender` : 'Tender'}
                                                                query={combinedHighlightQuery}
                                                            />] <Highlight text={tender.state || 'National'} query={combinedHighlightQuery} /> TENDERS
                                                        </span>
                                                        {tender.status === 'archive' && (
                                                            <span className="shrink-0 px-2 py-0.5 bg-red-500 text-white rounded-[4px] text-[9px] font-black uppercase tracking-widest shadow-sm">Archived</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 opacity-90 self-end sm:self-auto shrink-0">
                                                        <FileText className="w-3.5 h-3.5" />
                                                        <span className="text-[10px] sm:text-[11px] font-bold whitespace-nowrap">{getDisplayId(tender.id)}</span>
                                                    </div>
                                                </div>

                                                {/* Body */}
                                                <div className="p-4 sm:p-5">
                                                    <div className="mb-1 flex items-center justify-between">
                                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tender Title:</div>
                                                        {tender.category && (
                                                            <span className="bg-purple-50 text-purple-600 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-purple-100 tracking-tighter">
                                                                {tender.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Link href={`/tenders/${encodeURIComponent(tender.id)}`}>
                                                        <h2 className="text-base sm:text-lg font-black text-[#1e293b] leading-snug mb-4 group-hover:text-bid-green transition-colors uppercase line-clamp-2">
                                                            <Highlight text={getCleanTitle(tender.title, tender.id, tender.authority)} query={combinedHighlightQuery} />
                                                        </h2>
                                                    </Link>

                                                    {/* Info Pill - Authority & Location */}
                                                    <div className="bg-[#f8fafc] border border-slate-100 rounded-xl py-3 px-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 mb-5">
                                                        <div className="flex items-center gap-2.5 text-[10px] text-slate-700 font-black uppercase w-full sm:w-auto sm:max-w-[60%] min-w-0">
                                                            <Building className="w-4 h-4 text-bid-green shrink-0" />
                                                            <div className="flex flex-col min-w-0 overflow-hidden">
                                                                <span className="text-[8px] text-slate-400 mb-0.5 whitespace-nowrap">{getCleanTitle(tender.title, tender.id, tender.authority) === tender.authority ? 'TENDER ID / BA-NO.' : 'AUTHORITY / DEPT'}</span>
                                                                <span className="truncate leading-none">
                                                                    <Highlight text={getCleanTitle(tender.title, tender.id, tender.authority) === tender.authority ? getDisplayId(tender.id) : (tender.authority || 'Refer Document')} query={combinedHighlightQuery} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="hidden sm:block w-px h-6 bg-slate-200"></div>
                                                        <div className="flex items-center gap-2.5 text-[10px] text-slate-700 font-black uppercase w-full sm:w-auto min-w-0 flex-1">
                                                            <MapPin className="w-4 h-4 text-bid-green shrink-0" />
                                                            <div className="flex flex-col min-w-0 overflow-hidden">
                                                                <span className="text-[8px] text-slate-400 mb-0.5 whitespace-nowrap">LOCATION</span>
                                                                <span className="truncate leading-none">{tender.city ? `${tender.city}, ` : ''}{tender.state || 'India'}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Stats Grid */}
                                                    <div className="space-y-3 sm:space-y-4 mb-6">
                                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                                                            <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                                                PUBLISHED: <span className="text-slate-600 ml-1">{formatHumanDate(tender.created_at)}</span>
                                                            </div>
                                                            <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-tight flex items-center w-full sm:w-auto">
                                                                CLOSING: <span className="ml-auto sm:ml-2 bg-red-50 text-red-600 px-3 py-1 rounded-md border border-red-100 font-black whitespace-nowrap">{formatHumanDate(tender.deadline)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                                                            <div className="text-[10px] sm:text-[11px] font-bold text-[#b45cd6] uppercase">
                                                                EMD: <span className="text-[#b45cd6]/80 ml-1">
                                                                    {formatTenderValue(tender.emd)}
                                                                </span>
                                                            </div>
                                                            <div className="text-[10px] sm:text-[11px] font-bold text-blue-600 uppercase w-full sm:w-auto flex justify-between sm:justify-start">
                                                                <span>ECV:</span>
                                                                <span className="ml-1 text-blue-600/80">
                                                                    {formatTenderValue(tender.estimated_value)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Footer Actions */}
                                                    <div className="flex flex-col xs:flex-row justify-between items-stretch xs:items-center gap-3 pt-4 border-t border-slate-100">
                                                        <div className="flex gap-2 justify-center xs:justify-start flex-wrap">
                                                            <Link href="https://www.facebook.com/Bidalert/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 bg-[#3b5998] text-white rounded-lg flex items-center justify-center hover:brightness-90 transition-all shadow-sm"><Facebook size={12} className="sm:w-[14px]" fill="currentColor" /></Link>
                                                            <Link href="https://www.instagram.com/bidalert.in/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 bg-[#e1306c] text-white rounded-lg flex items-center justify-center hover:brightness-90 transition-all shadow-sm"><Instagram size={12} className="sm:w-[14px]" /></Link>
                                                            <Link href="https://in.linkedin.com/company/bidalert" target="_blank" rel="noopener noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 bg-[#007fb1] text-white rounded-lg flex items-center justify-center hover:brightness-90 transition-all shadow-sm"><Linkedin size={12} className="sm:w-[14px]" fill="currentColor" /></Link>
                                                            <button className="w-7 h-7 sm:w-8 sm:h-8 bg-[#25d366] text-white rounded-lg flex items-center justify-center hover:brightness-90 transition-all shadow-sm"><MessageCircle size={12} className="sm:w-[14px]" fill="currentColor" /></button>
                                                        </div>
                                                        <Link href={`/tenders/${encodeURIComponent(tender.id)}`} className="bg-gradient-to-r from-emerald-600 to-bid-greenhover text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg shadow-md font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:shadow-emerald-200/50 transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95">
                                                            <FileText size={14} /> VIEW TENDER
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Pagination UI */}
                                    <div className="pt-12 flex flex-col items-center gap-6">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handlePageChange(filters.page - 1)}
                                                disabled={filters.page === 1}
                                                className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:border-bid-green transition-all shadow-sm active:scale-95"
                                            >
                                                Previous
                                            </button>

                                            <div className="flex gap-2">
                                                {Array.from({ length: Math.min(5, Math.ceil(totalTenders / 20)) }, (_, i) => {
                                                    const pageNum = i + 1;
                                                    // This is simplified, real pagination would handle middle pages
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
                                <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 md:p-24 text-center border-2 border-dashed border-slate-100 shadow-inner group overflow-hidden">
                                    <div className="bg-slate-50 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        <Search className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-slate-300" />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight break-words">No Opportunities Found</h3>
                                    <p className="text-slate-500 max-w-md mx-auto mb-10 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                                        We couldn't find any tenders matching <strong>"{filters.q || filters.category || filters.department || 'your search'}"</strong>.
                                        Sometimes active data might be missing from our indexed records.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                                        <button onClick={clearFilters} className="w-full sm:w-auto bg-slate-100 text-slate-900 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95">
                                            Clear Filters
                                        </button>
                                        <Link
                                            href={`/my-requests?keyword=${encodeURIComponent(filters.q || filters.category || filters.department || '')}&state=${encodeURIComponent(filters.state)}&dept=${encodeURIComponent(filters.department)}`}
                                            className="w-full sm:w-auto bg-[#00C853] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl hover:shadow-emerald-200/50 active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            Request Custom Search
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                    <div className="mt-12 pt-8 border-t border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                                        Custom searches are typically processed within 24-48 hours
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-bid-green border-t-transparent"></div></div>}>
            <TendersContent />
        </Suspense>
    );
}

