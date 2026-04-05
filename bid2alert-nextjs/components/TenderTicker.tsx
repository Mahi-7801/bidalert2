'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface Tender {
    id: string | number;
    title: string;
    created_at?: string;
    deadline?: string;
    estimated_value?: string;
    authority?: string;
}

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

export default function TenderTicker() {
    const [tenders, setTenders] = useState<Tender[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestTenders = async () => {
            try {
                // Increased limit to 10 for better ticker experience
                const res = await fetch('/api/tenders?limit=10&sort=latest');
                if (res.ok) {
                    const data = await res.json();
                    if (data.tenders && data.tenders.length > 0) {
                        setTenders(data.tenders);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch ticker tenders', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestTenders();
    }, []);

    // If no tenders loaded (real data), don't show ticker at all
    if (loading || tenders.length === 0) return null;

    return (
        <div className="relative z-40 w-full px-2 sm:px-6 py-2 sm:py-4 bg-bid-dark hero-pattern shadow-inner">
            <div className="max-w-[1530px] mx-auto relative z-10">
                <div className="bg-white border border-gray-100 shadow-2xl rounded-full py-1.5 sm:py-2 px-1 text-xs sm:text-sm flex items-center overflow-hidden">
                    {/* Badge */}
                    <div className="bg-red-600 text-white font-bold px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[8px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest whitespace-nowrap z-10 shadow-md flex items-center gap-1.5 sm:gap-2 ml-0.5 sm:ml-1">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        Live Tenders
                    </div>

                    {/* Marquee Content */}
                    <div className="flex-1 overflow-hidden relative mask-pill">
                        <div className="whitespace-nowrap animate-marquee inline-block py-1">
                            {[...tenders, ...tenders, ...tenders].map((tender, index) => (
                                <span key={`${tender.id}-${index}`} className="inline-flex items-center mx-2 sm:mx-4 group">
                                    <span className={`mr-1.5 sm:mr-2.5 p-1 sm:p-1.5 rounded-full transition-transform group-hover:scale-110 ${index % 2 === 0 ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                        {index % 2 === 0 ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[14px] sm:h-[14px]"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[14px] sm:h-[14px]"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" /></svg>
                                        )}
                                    </span>
                                    <Link href={`/tenders/${encodeURIComponent(tender.id)}`} className="font-semibold text-gray-800 mr-2 sm:mr-3 hover:text-red-600 transition-colors text-xs sm:text-sm max-w-[200px] sm:max-w-xs truncate">
                                        {getCleanTitle(tender.title, tender.id, tender.authority)}
                                    </Link>
                                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-50 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-gray-200">
                                        {tender.deadline ? `Closes: ${tender.deadline.split(' ')[0]}` : 'Active'}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 80s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
                .mask-pill {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </div>
    );
}
