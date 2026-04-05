'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { categories } from '@/data/filterOptions';
import { extraCategories } from '@/data/extendedData';

const allCategories = [...new Set([...categories, ...extraCategories])].sort();

export default function GlobalTenderCategoriesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Breadcrumb Container */}
            <div className="container mx-auto px-3 sm:px-4 pt-4 pb-4 md:pt-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Home
                    </Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-slate-900 font-bold">Global Tender Categories</span>
                </div>
            </div>

            {/* Main Heading - Full Width Neon Gradient Block */}
            <div className="relative w-full bg-gradient-to-r from-[#0b4d3c] to-[#10e981] text-white shadow-lg py-10 md:py-12 mb-8 overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-3 sm:px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
                        Global Tender Categories
                    </h1>
                    <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                        Discover global opportunities across dozens of specialized industries, sectors, and capabilities.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-3 sm:px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allCategories.map((category) => (
                        <Link
                            key={category}
                            href={`/global-tenders?category=${encodeURIComponent(category.replace(' Tenders', ''))}`}
                            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-bid-green/30 hover:shadow-xl hover:shadow-slate-200/50 transition-all group flex items-center justify-between"
                        >
                            <span className="text-sm font-bold text-slate-700 group-hover:text-bid-greenhover transition-colors">
                                {category}
                            </span>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-bid-greenhover transform group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
