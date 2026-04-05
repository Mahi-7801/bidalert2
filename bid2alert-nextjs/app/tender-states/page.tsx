'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Map, Loader2 } from 'lucide-react';
import { states as allStates } from '@/data/filterOptions';

const StateMap = ({ name }: { name: string }) => {
    const [showImage, setShowImage] = useState(false);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    useEffect(() => {
        const img = new Image();
        img.src = `/states/${slug}.png`;
        img.onload = () => setShowImage(true);
        img.onerror = () => setShowImage(false);
    }, [slug]);

    if (!showImage) {
        return (
            <div className="w-full h-32 md:h-40 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:text-bid-green/50 transition-colors duration-300 mb-2">
                <Map size={48} strokeWidth={1.5} />
            </div>
        );
    }

    return (
        <div className="w-full h-32 md:h-40 flex items-center justify-center overflow-hidden mb-2">
            <img
                src={`/states/${slug}.png`}
                alt={`${name} Map`}
                className="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
            />
        </div>
    );
};

export default function TenderStatesPage() {
    const [counts, setCounts] = useState<{ [key: string]: number }>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStateStats = async () => {
            try {
                const response = await fetch('/api/tenders/state-stats');
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.states) {
                        const statsMap: { [key: string]: number } = {};
                        data.states.forEach((s: any) => {
                            statsMap[s.name] = s.count;
                        });
                        setCounts(statsMap);
                    }
                }
            } catch (error) {
                console.error('Error fetching state stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStateStats();
    }, []);

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Breadcrumb Container */}
            <div className="container mx-auto px-3 sm:px-4 pt-4 pb-4 md:pt-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Home
                    </Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-slate-900 font-bold">Tenders by State</span>
                </div>
            </div>

            {/* Page Header - Full Width Neon Gradient Block */}
            <div className="relative w-full bg-gradient-to-r from-[#0b4d3c] to-[#10e981] text-white shadow-lg py-10 md:py-12 mb-8 overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-3 sm:px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
                        Tenders by State
                    </h1>
                    <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                        Aggregated opportunities from every state and union territory in India
                    </p>
                </div>
            </div>

            {/* States Grid */}
            <div className="container mx-auto px-3 sm:px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {allStates.map((state, index) => {
                        const count = counts[state] || 0;

                        return (
                            <div key={index}>
                                <Link
                                    href={`/tenders?state=${encodeURIComponent(state)}`}
                                    className="group block text-center"
                                >
                                    <StateMap name={state} />

                                    <h3 className="text-slate-900 font-bold text-lg mb-1 group-hover:text-bid-green transition-colors duration-200">
                                        {state}
                                    </h3>
                                    <p className="text-slate-500 font-medium text-sm">
                                        {isLoading ? 'Checking live tenders...' : `${count.toLocaleString()} Live Tenders`}
                                    </p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
