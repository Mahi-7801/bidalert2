'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, TrendingUp, ShieldCheck, Globe2, Zap } from 'lucide-react';
import { default as Link } from 'next/link';

// @ts-ignore
const MotionDiv = motion.div as any;
// @ts-ignore
const MotionSpan = motion.span as any;
// @ts-ignore
const MotionLi = motion.li as any;

export default function AboutPage() {
    const services = [
        "Tender Aggregation & Centralization",
        "Instant Real-time Notifications",
        "Expert Bid Preparation Support",
        "Simplified Online Application System",
        "Custom Industry-Specific Alerts",
        "Start-up & Student Training Programs"
    ];

    const stats = [
        { label: "Trusted Tenders", value: "100,000+", icon: Globe2 },
        { label: "Daily Updates", value: "2,000+", icon: Zap },
        { label: "Services Provided", value: "3,180+", icon: TrendingUp },
        { label: "Happy Clients", value: "10,000+", icon: ShieldCheck }
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="bg-white min-h-screen font-sans text-slate-900 selection:bg-bid-green selection:text-bid-dark overflow-x-hidden">
            {/* Animated Hero Section */}
            <section className="relative pt-16 pb-12 md:pt-24 md:pb-20 px-4 bg-slate-50/50 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-bid-green/5 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <MotionDiv
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <MotionSpan
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-bid-green/10 text-bid-greenhover text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                        >
                            India's #1 Tender Platform
                        </MotionSpan>
                        <h1 className="text-4xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-slate-900">
                            Simplifying <span className="text-transparent bg-clip-text bg-gradient-to-r from-bid-greenhover to-emerald-600">Tenders</span> <br className="hidden md:block" /> For Modern India.
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto opacity-80">
                            BidAlert.in is the trusted bridge between complex government procurement and your business growth.
                        </p>
                    </MotionDiv>
                </div>
            </section>

            {/* Interactive Stats Section */}
            <section className="py-10 md:py-16 border-y border-slate-100 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 md:gap-12">
                        {stats.map((stat, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative text-center md:text-left p-3 sm:p-6 rounded-3xl hover:bg-slate-50 transition-all duration-500 cursor-default overflow-hidden"
                            >
                                <div className="mb-2 sm:mb-4 inline-flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-slate-50 group-hover:bg-bid-green group-hover:text-white transition-all duration-500 text-slate-400">
                                    <stat.icon size={18} />
                                </div>
                                <div className="text-xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-1 group-hover:text-bid-greenhover transition-colors duration-300 break-all">{stat.value}</div>
                                <div className="text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors leading-tight">{stat.label}</div>
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Narrative with Reveal Effects */}
            <section className="py-16 md:py-24 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <MotionDiv {...fadeInUp}>
                            <h2 className="text-4xl md:text-6xl font-black mb-10 uppercase tracking-tighter leading-none">Who <span className="text-bid-greenhover">We Are</span></h2>
                            <div className="space-y-6 text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                                <p>
                                    Founded with a clear vision: to democratize access to government contracts. What started as a simple alert service is now a sophisticated ecosystem powered by AI and human expertise.
                                </p>
                                <p>
                                    We help organizations of all sizes navigate the complex world of bids, RFPs, and empanelments with transparency and speed.
                                </p>
                            </div>
                        </MotionDiv>

                        <MotionDiv
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-1 rounded-[3rem] shadow-2xl shadow-slate-200/50 group"
                        >
                            <div className="bg-slate-50 p-10 md:p-16 rounded-[2.5rem] border border-slate-100 group-hover:border-bid-green/20 transition-all duration-500">
                                <h3 className="text-2xl font-black mb-10 uppercase tracking-tight text-slate-900 border-b border-slate-200 pb-6">Our Services</h3>
                                <ul className="grid grid-cols-1 gap-5">
                                    {services.map((service, i) => (
                                        <MotionLi
                                            key={i}
                                            whileHover={{ x: 10 }}
                                            className="flex items-center gap-4 group/item cursor-default"
                                        >
                                            <div className="bg-bid-green/10 text-bid-greenhover p-2 rounded-full group-hover/item:bg-bid-green group-hover/item:text-white transition-all duration-300">
                                                <CheckCircle2 size={20} className="shrink-0" />
                                            </div>
                                            <span className="text-slate-700 font-bold text-base md:text-lg tracking-tight group-hover/item:text-bid-greenhover transition-colors">{service}</span>
                                        </MotionLi>
                                    ))}
                                </ul>
                            </div>
                        </MotionDiv>
                    </div>
                </div>
            </section>

            {/* The Vision - High Impact Dark Section */}
            <section className="py-16 md:py-24 bg-slate-900 text-white text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-bid-green/20 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="container mx-auto max-w-4xl relative z-10">
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-6xl font-black italic mb-10 tracking-tighter leading-tight text-bid-green">
                            "Only when you find an opportunity you wish to win, your chance begins!"
                        </h2>
                        <p className="text-slate-400 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto opacity-80">
                            Stay ahead of the competition and secure valuable contracts with BidAlert's world-class tender intelligence.
                        </p>
                    </MotionDiv>
                </div>
            </section>

            {/* Final CTA with Hover Effects */}
            <section className="py-20 md:py-32 px-4 text-center">
                <div className="container mx-auto max-w-4xl">
                    <MotionDiv {...fadeInUp}>
                        <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-12 tracking-tighter leading-none">Start winning <br /> today.</h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link href="/register" className="group relative px-12 py-6 bg-bid-greenhover text-white font-black rounded-full hover:shadow-2xl hover:shadow-bid-green/30 transition-all duration-300 uppercase tracking-widest text-sm flex items-center gap-3 active:scale-95">
                                GET STARTED NOW
                                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
                            </Link>
                            <Link href="/contact" className="px-12 py-6 bg-white text-slate-900 font-black rounded-full border-2 border-slate-100 hover:border-slate-900 hover:text-white hover:bg-slate-900 transition-all duration-300 uppercase tracking-widest text-sm active:scale-95">
                                Contact Support
                            </Link>
                        </div>
                    </MotionDiv>
                </div>
            </section>
        </div>
    );
}
