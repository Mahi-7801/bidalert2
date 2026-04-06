'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

// Expanded list for the carousel
const allFeaturedStates = [
    { name: 'Maharashtra', image: '/states/maharashtra.png', trend: '+12%', color: 'from-emerald-500 to-teal-600' },
    { name: 'Delhi', image: '/states/delhi.png', trend: '+8%', color: 'from-blue-500 to-indigo-600' },
    { name: 'Karnataka', image: '/states/karnataka.png', trend: '+15%', color: 'from-purple-500 to-pink-600' },
    { name: 'Gujarat', image: '/states/gujarat.png', trend: '+5%', color: 'from-orange-500 to-red-600' },
    { name: 'Tamil Nadu', image: '/states/tamil-nadu.png', trend: '+10%', color: 'from-cyan-500 to-blue-600' },
    { name: 'Uttar Pradesh', image: '/states/uttar-pradesh.png', trend: '+18%', color: 'from-indigo-500 to-purple-600' },
    { name: 'Rajasthan', image: '/states/rajasthan.png', trend: '+14%', color: 'from-orange-400 to-amber-600' },
    { name: 'West Bengal', image: '/states/west-bengal.png', trend: '+9%', color: 'from-blue-400 to-indigo-500' },
    { name: 'Kerala', image: '/states/kerala.png', trend: '+11%', color: 'from-emerald-400 to-green-600' },
    { name: 'Bihar', image: '/states/bihar.png', trend: '+7%', color: 'from-red-400 to-rose-600' },
    { name: 'Punjab', image: '/states/punjab.png', trend: '+13%', color: 'from-yellow-400 to-orange-500' },
    { name: 'Telangana', image: '/states/telangana.png', trend: '+16%', color: 'from-violet-400 to-purple-600' }
];

interface StateStats {
    [key: string]: number;
}

export default function StatesSection() {
    const [counts, setCounts] = useState<StateStats>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false); // State to track hover status
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchStateStats = async () => {
            try {
                // Fetch all state stats to map them to our featured list
                const response = await fetch('/api/tenders/state-stats');
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.states) {
                        const statsMap: StateStats = {};
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

    // Auto-scroll logic
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (!isHovered) {
            interval = setInterval(() => {
                if (scrollContainerRef.current) {
                    const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;

                    // If we've reached the end, scroll back to the start
                    // Added a small buffer (e.g., 10px) to account for potential sub-pixel rendering differences
                    if (scrollLeft + clientWidth >= scrollWidth - 10) {
                        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        // Scroll by client width to show the next set of items
                        scrollContainerRef.current.scrollTo({ left: scrollLeft + clientWidth, behavior: 'smooth' });
                    }
                }
            }, 5000); // Trigger every 5 seconds
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isHovered]); // Re-run effect when hover status changes

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-10 sm:py-20 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-bid-green/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-16 max-w-3xl mx-auto px-4">
                    <motion.div
                        // @ts-ignore
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bid-green/10 text-bid-greenhover text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-4"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bid-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-bid-green"></span>
                        </span>
                        Live Regional Feed
                    </motion.div>

                    <motion.h2
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-[1.1] py-2"
                    >
                        Regional <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-bid-greenhover to-emerald-600 pb-1">Intelligence</span>
                    </motion.h2>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-[13px] sm:text-lg font-medium leading-relaxed"
                    >
                        Real-time tracking of government procurement activity from every state and union territory.
                    </motion.p>
                </div>

                {/* Carousel Wrapper with Fading Edges */}
                <div className="relative group/carousel px-2 sm:px-0">
                    {/* Fading Edge Masks - more prominent on mobile */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="flex overflow-x-auto gap-5 sm:gap-10 pb-12 sm:pb-20 px-8 sm:px-32 scroll-smooth no-scrollbar"
                        style={{
                            scrollSnapType: 'x mandatory',
                            msOverflowStyle: 'none',  /* IE and Edge */
                            scrollbarWidth: 'none'    /* Firefox */
                        }}
                    >
                        {/* Hide scrollbar for WebKit (Chrome, Safari) */}
                        <style jsx>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                        {allFeaturedStates.map((state, index) => {
                            const count = counts[state.name] || 0;

                            return (
                                <motion.div
                                    key={state.name}
                                    // @ts-ignore
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="min-w-[170px] sm:min-w-[300px] scroll-snap-align-center"
                                    style={{ scrollSnapAlign: 'center' }}
                                >
                                    <Link
                                        href={`/tenders?state=${encodeURIComponent(state.name)}`}
                                        className="group block bg-white border-2 border-slate-50 p-5 sm:p-10 rounded-[2rem] sm:rounded-[4rem] hover:border-bid-green/40 transition-all duration-500 hover:shadow-2xl hover:shadow-bid-green/15 min-h-[200px] sm:min-h-[420px] relative overflow-hidden flex flex-col items-center justify-center text-center"
                                    >
                                        {/* Trend Badge */}
                                        {!isLoading && count > 0 && (
                                            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 z-10 transform group-hover:scale-110 transition-transform">
                                                <TrendingUp size={10} className="text-emerald-600 sm:w-3" />
                                                <span className="text-[9px] sm:text-[12px] font-black text-emerald-600 tracking-wider font-mono">{state.trend}</span>
                                            </div>
                                        )}

                                        {/* Centered Map Container */}
                                        <div className="relative w-[75%] sm:w-[85%] aspect-square bg-slate-50/70 rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden mb-6 sm:mb-10 p-6 sm:p-10 flex items-center justify-center border border-slate-100/50 group-hover:bg-white transition-all duration-700 group-hover:shadow-inner group-hover:rotate-3">
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <Image
                                                    src={state.image}
                                                    alt={state.name}
                                                    fill
                                                    className="object-contain drop-shadow-xl group-hover:scale-125 transition-transform duration-1000 ease-in-out"
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-sm sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tighter group-hover:text-bid-greenhover transition-colors line-clamp-2 px-1">
                                            {state.name}
                                        </h3>

                                        <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-100 mb-2 sm:mb-4 group-hover:bg-bid-green/5 transition-all">
                                            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bid-green opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-bid-green"></span>
                                            </span>
                                            <span className="text-xs sm:text-base font-black text-slate-800">
                                                {isLoading ? '...' : (count > 0 ? `${count.toLocaleString()}` : '0')}
                                                <span className="text-[9px] sm:text-[11px] text-slate-400 ml-1.5 font-black">LIVE</span>
                                            </span>
                                        </div>

                                        {/* Hover arrow hint */}
                                        <div className="absolute bottom-6 sm:bottom-10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                            <ArrowRight size={20} className="text-bid-greenhover" strokeWidth={3} />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-6">
                    <Link
                        href="/tender-states"
                        className="inline-flex items-center gap-3 bg-slate-900 text-white hover:bg-bid-greenhover px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm uppercase tracking-widest transition-all group active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-bid-green/20"
                    >
                        Explore Full Directory
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform sm:w-[18px]" strokeWidth={3} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
