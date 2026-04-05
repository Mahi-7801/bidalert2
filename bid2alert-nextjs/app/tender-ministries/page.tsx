'use client';

import Link from 'next/link';
import { ChevronRight, Landmark } from 'lucide-react';
import { ministries } from '@/data/filterOptions';
import { extraMinistries } from '@/data/extendedData';

const uniqueMinistries = [...new Set([...ministries, ...extraMinistries])].sort();

export default function TenderMinistriesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Breadcrumb Container */}
            <div className="container mx-auto px-3 sm:px-4 pt-4 pb-4 md:pt-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Home
                    </Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-slate-900 font-bold">Tenders by Ministry</span>
                </div>
            </div>

            {/* Main Heading - Full Width Neon Gradient Block */}
            <div className="relative w-full bg-gradient-to-r from-[#0b4d3c] to-[#10e981] text-white shadow-lg py-10 md:py-12 mb-8 overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-3 sm:px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
                        Tenders by Ministry
                    </h1>
                    <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                        Explore opportunities from various Central Ministries
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-3 sm:px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {uniqueMinistries.map((ministry, index) => (
                        <Link
                            key={`${ministry}-${index}`}
                            href={`/tenders?ministry=${encodeURIComponent(ministry)}`}
                            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-bid-green/30 hover:shadow-xl hover:shadow-slate-200/50 transition-all group flex items-center justify-between min-h-[60px]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-bid-green/10 transition-colors shrink-0">
                                    <Landmark size={18} className="text-slate-400 group-hover:text-bid-green transition-colors" />
                                </div>
                                <span className="text-sm font-bold text-slate-700 group-hover:text-bid-greenhover transition-colors line-clamp-2">
                                    {ministry}
                                </span>
                            </div>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-bid-greenhover transform group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
