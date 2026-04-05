'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Building2, Search, ChevronLeft } from 'lucide-react';
import { departments } from '@/data/filterOptions';

const ITEMS_PER_PAGE = 100;

export default function TenderDepartmentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredDepartments = useMemo(() => {
        const unique = Array.from(new Set(departments));
        if (!searchQuery.trim()) return unique;
        const lowQuery = searchQuery.toLowerCase();
        return unique.filter(d => d.toLowerCase().includes(lowQuery));
    }, [searchQuery]);

    const totalPages = Math.ceil(filteredDepartments.length / ITEMS_PER_PAGE);
    const displayedDepartments = filteredDepartments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Breadcrumb Container */}
            <div className="container mx-auto px-3 sm:px-4 pt-4 pb-4 md:pt-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">Home</Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-slate-900 font-bold">Tenders by Department</span>
                </div>
            </div>

            {/* Main Heading - Full Width Neon Gradient Block */}
            <div className="relative w-full bg-gradient-to-r from-[#0b4d3c] to-[#10e981] text-white shadow-lg py-10 md:py-12 mb-8 overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-3 sm:px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
                        Tenders By Department
                    </h1>
                    <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                        Explore 25,000+ specialized tender opportunities across various Government Departments
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    {/* Search Bar - Tighter & More Professional */}
                    <div className="relative w-full max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search 25,000+ departments..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-2xl shadow-lg shadow-slate-200/50 focus:outline-none focus:border-bid-green focus:ring-4 focus:ring-bid-green/5 transition-all font-bold text-lg text-slate-700 placeholder:text-slate-300"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-bid-green transition-colors" size={24} />
                    </div>
                </div>
                {searchQuery && (
                    <div className="mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                         Found {filteredDepartments.length.toLocaleString()} matching departments
                    </div>
                )}

                {/* Departments Grid - Tighter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {displayedDepartments.map((department, index) => (
                        <Link
                            key={`${department}-${index}`}
                            href={`/tenders?department=${encodeURIComponent(department)}`}
                            className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:border-bid-green/30 hover:shadow-lg transition-all group flex items-center justify-between min-h-[50px]"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <Building2 size={16} className="text-slate-300 group-hover:text-bid-green transition-colors shrink-0" />
                                <span className="text-[13px] font-bold text-slate-700 group-hover:text-bid-green transition-colors truncate">
                                    {department}
                                </span>
                            </div>
                            <ChevronRight size={14} className="text-slate-200 group-hover:text-bid-green shrink-0" />
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-3 rounded-xl bg-white border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:border-bid-green transition-all shadow-sm"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">Page {currentPage}</span>
                                <span className="text-slate-400">of</span>
                                <span className="font-bold text-slate-900">{totalPages}</span>
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="p-3 rounded-xl bg-white border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:border-bid-green transition-all shadow-sm"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-loose text-center">
                            Total Departments: {filteredDepartments.length.toLocaleString()}
                        </p>
                    </div>
                )}

                {displayedDepartments.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-slate-400 font-bold italic">No departments found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}
