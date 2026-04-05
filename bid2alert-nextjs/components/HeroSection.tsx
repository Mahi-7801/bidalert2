'use client';

import { Search, ArrowRight, FileText, GraduationCap, Briefcase, Shield, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { default as Link } from 'next/link';
import { categories } from '@/data/filterOptions';

// @ts-ignore
const MotionDiv = motion.div as any;
// @ts-ignore
const MotionH1 = motion.h1 as any;
// @ts-ignore
const MotionP = motion.p as any;

// ─── Fallback images (used if no admin-set images exist in storage) ──────────
const DEFAULT_BG_IMAGES = [
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
];

const SLIDE_INTERVAL = 5000; // ms

// ─── Storage key — must match the key used in BackgroundImageManager ─────────
const STORAGE_KEY = 'bg_image_home_hero';

export default function HeroSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [bgImages, setBgImages] = useState<string[]>(DEFAULT_BG_IMAGES);
    const [searchType, setSearchType] = useState('Indian Tenders');
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [stats, setStats] = useState<any>(null);
    const searchTypes = ['Indian Tenders', 'Global Tenders'];

    // ── Load images from unified gallery API ────────────────────────────────
    useEffect(() => {
        const fetchHeroImages = async () => {
            try {
                const res = await fetch('/api/images');
                if (!res.ok) throw new Error();
                const data = await res.json();

                if (Array.isArray(data) && data.length > 0) {
                    const images = data.map(img => {
                        return img.image_path.startsWith('/uploads')
                            ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${img.image_path}`
                            : img.image_path;
                    });
                    setBgImages(images);
                } else {
                    setBgImages(DEFAULT_BG_IMAGES);
                }
            } catch {
                setBgImages(DEFAULT_BG_IMAGES);
            }
        };

        const fetchStats = async () => {
            try {
                const res = await fetch('/api/tenders/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (err) {
                console.error('Error fetching stats:', err);
            }
        };

        fetchHeroImages();
        fetchStats();
    }, []);

    // ── Auto-advance slides ───────────────────────────────────────────────────
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % bgImages.length);
        }, SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [bgImages.length]);

    const filteredCategories = categories
        .filter(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            if (searchType === 'Global Tenders') {
                window.location.href = `/global-tenders?q=${encodeURIComponent(searchQuery)}&expand_filters=true`;
            } else {
                window.location.href = `/tenders?q=${encodeURIComponent(searchQuery)}&expand_filters=true`;
            }
        } else {
            // If empty search, still navigate
            if (searchType === 'Global Tenders') {
                window.location.href = `/global-tenders?expand_filters=true`;
            } else {
                window.location.href = `/tenders?expand_filters=true`;
            }
        }
    };

    const handleCategoryClick = (category: string) => {
        window.location.href = `/tenders?category=${encodeURIComponent(category)}`;
    };

    const services = [
        {
            icon: FileText,
            title: 'Apply for Tenders',
            description: 'Get expert assistance in finding & applying for tenders.',
            action: 'Start Now',
            href: '/contact',
            color: 'from-blue-500 to-cyan-600',
        },
        {
            icon: GraduationCap,
            title: 'Learn Tender Process',
            description: 'Understand how tenders work and boost your success rate.',
            action: 'Learn More',
            href: 'https://courses.bidalert.in/',
            color: 'from-emerald-500 to-teal-600',
        },
        {
            icon: Briefcase,
            title: 'Entrepreneurial Support',
            description: 'Join programs that help students build their businesses.',
            action: 'Join Now',
            href: '/contact',
            color: 'from-purple-500 to-pink-600',
        },
        {
            icon: Shield,
            title: 'IPR Services',
            description: 'Protect your ideas, inventions & brand with expert Intellectual Property Rights support.',
            action: 'Protect Now',
            href: '/registrations/trademark',
            color: 'from-orange-500 to-amber-600',
        },
    ];

    return (
        <>
            {/* ── Hero Section ───────────────────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center py-20 lg:py-32 overflow-hidden">

                {/* ── Sliding Background Images ──────────────────────────────── */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence>
                        {bgImages.map((src, i) =>
                            i === currentSlide ? (
                                <MotionDiv
                                    key={src}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={src}
                                        alt=""
                                        className="w-full h-full object-cover object-center"
                                    />
                                </MotionDiv>
                            ) : null
                        )}
                    </AnimatePresence>

                    {/* Premium multi-layered overlay for better visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80 z-10" />
                    <div className="absolute inset-0 bg-black/20 z-10" />
                </div>

                {/* ── Slide Indicator Dots ───────────────────────────────────── */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
                    {bgImages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`transition-all duration-500 rounded-full ${i === currentSlide
                                ? 'w-10 h-2 bg-bid-green'
                                : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* ── Content ───────────────────────────────────────────────── */}
                <div className="container mx-auto px-4 relative z-30 max-w-[1400px]">
                    <div className="text-center">

                        <MotionDiv
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-4 py-1.5 bg-bid-green/20 backdrop-blur-md border border-bid-green/30 rounded-full mb-6"
                        >
                            <span className="text-bid-green font-black text-[10px] uppercase tracking-[0.2em]">India's #1 Tender Analytics Platform</span>
                        </MotionDiv>

                        <MotionH1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.05]"
                        >
                            <span className="text-white drop-shadow-2xl">
                                Find Government & <br className="hidden lg:block" /> Private Tenders <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-bid-green">Across India</span>
                            </span>
                        </MotionH1>

                        <MotionP
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-white/80 text-lg md:text-xl mb-10 max-w-3xl mx-auto font-medium leading-relaxed"
                        >
                            Access 50,000+ live tenders with AI-powered analytics. Stay ahead of the competition with instant smart alerts.
                        </MotionP>

                        <MotionDiv
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-4xl mx-auto relative px-1 sm:px-0"
                        >
                            <form onSubmit={handleSearch} className="bg-white rounded-[14px] shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center w-full relative p-1.5 focus-within:shadow-[0_0_30px_rgba(32,178,170,0.3)] transition-all duration-300">

                                {/* Dropdown Box */}
                                <div className="relative border-b sm:border-b-0 sm:border-r border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                                        className="flex items-center justify-between w-full sm:w-[170px] px-4 py-3 sm:py-0 h-full text-sm sm:text-[15px] text-slate-700 hover:text-slate-900 transition-colors bg-transparent border-0 outline-none whitespace-nowrap"
                                    >
                                        {searchType}
                                        <ChevronDown size={14} className="text-[#3B82F6] ml-2 font-bold" strokeWidth={3} />
                                    </button>

                                    <AnimatePresence>
                                        {showTypeDropdown && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setShowTypeDropdown(false)} />
                                                <MotionDiv
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute top-full left-0 mt-3 w-full sm:w-[200px] bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)] z-50 rounded-lg overflow-hidden flex flex-col"
                                                >
                                                    {searchTypes.map(type => {
                                                        let count = 0;
                                                        if (stats) {
                                                            if (type === 'Indian Tenders') count = (stats.breakdown?.gem || 0) + (stats.breakdown?.eprocurement || 0) + (stats.breakdown?.ireps || 0);
                                                            else if (type === 'Global Tenders') count = stats.breakdown?.global || 0;
                                                        }

                                                        return (
                                                            <div
                                                                key={type}
                                                                onClick={() => { setSearchType(type); setShowTypeDropdown(false); }}
                                                                className={`px-5 py-3.5 text-sm cursor-pointer transition-colors border-b border-gray-50 last:border-0 flex justify-between items-center ${searchType === type ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
                                                            >
                                                                <span>{type}</span>
                                                                {/* Show real-time count badge for both search types directly from stats API */}
                                                                {stats && (
                                                                    <span className="text-[10px] bg-bid-green/10 text-bid-green px-2 py-0.5 rounded-full">
                                                                        {count.toLocaleString()}+
                                                                    </span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </MotionDiv>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Input Field */}
                                <div className="flex-grow flex items-center relative z-30">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setShowSuggestions(true);
                                        }}
                                        onFocus={() => setShowSuggestions(true)}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                        placeholder="Type keyword eg-cpwd, gem etc."
                                        className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-transparent outline-none text-slate-800 placeholder-slate-400 text-[15px] sm:text-[16px]"
                                    />

                                    {/* Suggestions Dropdown */}
                                    {showSuggestions && searchQuery.length > 0 && filteredCategories.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-[100] text-left">
                                            <div className="p-3 bg-slate-50 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suggested Categories</span>
                                            </div>
                                            {filteredCategories.map((cat, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => handleCategoryClick(cat)}
                                                    className="w-full px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-between group"
                                                >
                                                    {cat}
                                                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#3B82F6]" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Search Button */}
                                <div className="flex-shrink-0 pt-1 sm:pt-0 pb-1 sm:pb-0 sm:pr-0 pl-1 sm:pl-0">
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-bid-greenhover text-white px-8 py-3.5 sm:py-3.5 rounded-[10px] text-[17px] font-bold tracking-wide hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-95 transition-all shadow-md focus:outline-none flex justify-center items-center"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </MotionDiv>

                    </div>
                </div>
            </section >

            {/* ── Services Section ───────────────────────────────────────────── */}
            < section className="py-8 sm:py-14 bg-[#F8FAFC]" >
                <div className="container mx-auto px-3 sm:px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-7xl mx-auto">
                        {services.map((service, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={service.href}
                                    className="group block bg-white border-2 border-slate-100 p-5 sm:p-8 rounded-2xl sm:rounded-3xl hover:border-bid-green/30 transition-all duration-300 hover:shadow-2xl hover:shadow-bid-green/5 h-full"
                                >
                                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        <service.icon size={20} className="text-white sm:w-8 sm:h-8" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1 sm:mb-2 group-hover:text-bid-greenhover transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 font-medium mb-3 sm:mb-4 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center gap-1.5 sm:gap-2 text-bid-greenhover font-bold group-hover:gap-3 transition-all text-xs sm:text-sm">
                                        {service.action}
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform sm:w-[18px] sm:h-[18px]" />
                                    </div>
                                </Link>
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </section >
        </>
    );
}