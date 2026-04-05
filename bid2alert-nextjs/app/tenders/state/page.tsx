'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, ChevronRight, Building2, Globe, ArrowRight } from 'lucide-react';
import { states } from '@/data/filterOptions';

export default function TendersByStatePage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredStates = states.filter(state =>
        state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Dark Hero Section */}
            <section className="relative bg-bid-dark pt-20 pb-24 sm:pt-28 sm:pb-32 overflow-hidden hero-pattern">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-400 mb-8 font-medium animate-in fade-in slide-in-from-top-4 duration-700">
                        <Link href="/" className="hover:text-bid-green transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/tenders" className="hover:text-bid-green transition-colors">Tenders</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">By State</span>
                    </nav>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Tenders by <span className="text-bid-green">State</span>
                    </h1>
                    <p className="text-gray-400 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Explore latest government opportunities organized by states. Choose your state to find local tenders.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-bid-green/20 to-transparent rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/10 p-1">
                            <div className="flex-grow flex items-center pl-6">
                                <Search className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Find your state..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-sm sm:text-base py-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* States Grid Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12 border-b border-gray-200 pb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-bid-dark rounded-xl flex items-center justify-center text-bid-green shadow-lg">
                                <Globe className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">All India Regions</h2>
                                <p className="text-sm text-gray-500 font-medium">Click on a state to view all active tenders</p>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-bold border border-gray-200">
                                {states.length} States & UTs
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {filteredStates.map((state) => (
                            <Link
                                key={state}
                                href={`/tenders?state=${encodeURIComponent(state)}`}
                                className="group relative bg-white p-6 rounded-2xl border border-gray-200 hover:border-bid-green/50 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Decorative Initial */}
                                <div className="absolute -right-4 -bottom-4 text-8xl font-black text-gray-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                    {state[0]}
                                </div>

                                <div className="relative flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-bid-green/10 transition-colors">
                                        <MapPin className="w-6 h-6 text-gray-400 group-hover:text-bid-green transition-colors" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-gray-900 group-hover:text-bid-dark transition-colors text-lg mb-1">
                                            {state}
                                        </h3>
                                        <div className="flex items-center text-xs text-gray-400 font-bold uppercase tracking-wider group-hover:text-bid-green transition-colors">
                                            View Tenders <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {filteredStates.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No results for "{searchQuery}"</h3>
                                <p className="text-gray-500">Try searching for a different state or region.</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-6 text-bid-green font-bold hover:underline"
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Quick Stats / Info Strip */}
            <section className="bg-white border-y border-gray-200 py-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Total Tenders', value: '100,000+' },
                            { label: 'States Covered', value: '37' },
                            { label: 'Daily Updates', value: '500+' },
                            { label: 'Success Rate', value: '98%' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl sm:text-3xl font-black text-bid-dark mb-1">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="py-20 sm:py-24 container mx-auto px-4">
                <div className="bg-bid-dark rounded-[3rem] p-8 sm:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-bid-green/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-bid-green/20 text-bid-green px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                            <Building2 className="w-4 h-4" /> Dedicated Support
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-white mb-8 tracking-tight">
                            Looking for specific <span className="text-bid-green">Local Tenders?</span>
                        </h2>
                        <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed font-medium">
                            Our team tracking 24/7. Get expert help in finding and applying for tenders in any state or department.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto bg-bid-green hover:bg-bid-greenhover text-bid-dark font-black px-10 py-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                Contact Expert
                            </Link>
                            <Link
                                href="/register"
                                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold px-10 py-5 rounded-full border border-white/10 transition-all"
                            >
                                Join BidAlert
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
