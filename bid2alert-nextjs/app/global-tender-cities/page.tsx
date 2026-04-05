'use client';

import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';
import { globalCities } from '@/data/filterOptions';
import { extraGlobalCities } from '@/data/extendedData';

const allCities = [...new Set([...globalCities, ...extraGlobalCities])].sort();


export default function GlobalTenderCitiesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Breadcrumb Container */}
            <div className="container mx-auto px-3 sm:px-4 pt-4 pb-4 md:pt-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Home
                    </Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <Link href="/global-tenders" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Global Tenders
                    </Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-slate-900 font-bold">Cities</span>
                </div>
            </div>

            {/* Main Heading */}
            <div className="relative w-full bg-gradient-to-r from-[#034d3c] to-[#10b981] text-white shadow-lg py-12 md:py-16 mb-8 overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-3 sm:px-4 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
                            Global Tenders <span className="text-white/70 italic">By City</span>
                        </h1>
                    </div>
                    <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                        Explore international government contracts and business opportunities in the world's major business hubs.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-3 sm:px-4 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {allCities.map((city) => (
                        <Link
                            key={city}
                            href={`/global-tenders?city=${encodeURIComponent(city)}`}
                            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-bid-green/30 hover:shadow-xl hover:shadow-bid-green/5 transition-all group flex items-center justify-between"
                        >
                            <span className="text-sm font-bold text-slate-700 group-hover:text-bid-green transition-colors truncate">
                                {city}
                            </span>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-bid-green transform group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                        </Link>
                    ))}
                </div>
                
                {/* Search Prompt */}
                <div className="mt-16 p-8 bg-white rounded-[2rem] border border-slate-100 text-center shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">Don't see your city?</h3>
                    <p className="text-slate-500 mb-6 font-medium">Use our smart filters to search for any city in the world.</p>
                    <Link href="/global-tenders?focus=city" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A0F1C] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-bid-green hover:text-bid-dark transition-all active:scale-95 shadow-xl">
                        Open City Filter
                    </Link>
                </div>
            </div>
        </div>
    );
}
