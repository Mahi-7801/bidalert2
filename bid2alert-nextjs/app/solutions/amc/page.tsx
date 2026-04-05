'use client';

import { motion } from 'framer-motion';
import {
    Clock, ShieldCheck, Database, Zap,
    Wrench, Settings, HeartPulse, Sparkles,
    ArrowRight, CheckCircle2, LifeBuoy, AlertCircle, Star
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const MotionDiv = motion.div as any;

const pricingPlans = [
    {
        name: "Basic Support",
        price: "₹6,000/year",
        description: "Essential maintenance for smaller websites.",
        features: ["Core Updates", "Monthly Backups", "Standard Security", "Email Support"]
    },
    {
        name: "Standard Maintenance",
        price: "₹12,000/year",
        description: "Ideal for business sites requiring regular updates and monitoring.",
        features: ["Priority Bug Fixes", "Weekly Backups", "Performance Optimization", "Server Maintenance"]
    },
    {
        name: "Premium Support",
        price: "₹24,000/year",
        description: "Comprehensive care for critical business systems and complex apps.",
        features: ["Daily Backups", "24/7 Security Monitoring", "Unlimited Website Updates", "Priority On-Call Support"]
    }
];

const services = [
    { title: "Website Updates", icon: Sparkles },
    { title: "Security Monitoring", icon: ShieldCheck },
    { title: "Backup Management", icon: Database },
    { title: "Performance Optimization", icon: Zap },
    { title: "Bug Fixes & Support", icon: Wrench },
    { title: "Server Maintenance", icon: Settings }
];

export default function AMCSolution() {
    const containerRef = useRef(null);

    return (
        <div className="bg-[#F8FAFC] min-h-screen text-slate-900 selection:bg-bid-green selection:text-bid-dark font-sans overflow-x-hidden" ref={containerRef}>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-6 pb-4">
                <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm flex items-center gap-2"
                >
                    <Link href="/" className="text-slate-500 hover:text-bid-green font-medium transition-colors">Home</Link>
                    <span className="text-slate-400 mx-1">&gt;</span>
                    <Link href="/solutions/web-app" className="text-slate-500 hover:text-bid-green font-medium transition-colors">IT Services</Link>
                    <span className="text-slate-400 mx-1">&gt;</span>
                    <span className="text-bid-greenhover font-bold">AMC & Support</span>
                </MotionDiv>
            </div>

            {/* Hero Section */}
            <div className="relative w-full bg-white border-b border-slate-100 py-16 md:py-24 mb-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-bid-green/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bid-green/10 border border-bid-green/20 text-bid-greenhover text-[10px] font-black uppercase tracking-widest mb-6">
                            <Clock size={12} />
                            24/7 Continuity
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9] text-slate-900">
                            Website / App <br /><span className="text-bid-greenhover">AMC</span> & Support
                        </h1>
                        <p className="text-slate-600 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
                            Keep your digital assets running smoothly with professional Annual Maintenance Contracts (AMC)
                            and on-demand technical support.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <Link href="/contact" className="px-10 py-5 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-[0_15px_40px_rgba(74,222,128,0.2)] flex items-center gap-3">
                                SECURE YOUR SITE
                                <ShieldCheck size={20} />
                            </Link>
                        </div>
                    </MotionDiv>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">

                {/* Services Section */}
                <section className="mb-24 px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Preventive <span className="text-bid-greenhover">Care</span></h2>
                        <div className="w-12 h-1 bg-bid-green mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {services.map((service, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 pb-10 rounded-[3rem] border border-slate-100 hover:border-bid-green/30 transition-all group hover:shadow-xl text-center"
                            >
                                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-bid-greenhover group-hover:bg-bid-green group-hover:text-bid-dark transition-all duration-300 transform group-hover:rotate-12">
                                    <service.icon size={32} />
                                </div>
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors leading-tight">{service.title}</h3>
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* Health Check Pulse */}
                <section className="mb-24 py-20 bg-white rounded-[4rem] border border-slate-100 text-slate-900 relative overflow-hidden shadow-sm">
                    <div className="container mx-auto px-12 max-w-6xl relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                            <div className="max-w-xl text-center lg:text-left">
                                <HeartPulse size={80} className="mb-8 opacity-40 animate-pulse text-bid-greenhover mx-auto lg:mx-0" />
                                <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.8] text-slate-900">Proactive, <br /><span className="text-bid-greenhover italic font-normal">Not Reactive.</span></h3>
                                <p className="text-xl font-bold text-slate-500 leading-relaxed italic">
                                    Don't wait for your site to break. Our AMC packages catch bugs,
                                    security vulnerabilities, and performance issues before they affect
                                    your business.
                                </p>
                            </div>
                            <div className="flex flex-col gap-6 w-full lg:w-auto">
                                <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 backdrop-blur-md flex items-center gap-6 group hover:border-bid-green transition-all shadow-sm">
                                    <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-greenhover">
                                        <AlertCircle size={24} />
                                    </div>
                                    <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-700">Early Detection</span>
                                </div>
                                <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 backdrop-blur-md flex items-center gap-6 group hover:border-bid-green transition-all shadow-sm">
                                    <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-greenhover">
                                        <LifeBuoy size={24} />
                                    </div>
                                    <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-700">24/7 Monitoring</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Table */}
                <section className="mb-24 px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Maintenance <span className="text-bid-greenhover">Plans</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {pricingPlans.map((plan, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`bg-white p-12 rounded-[3.5rem] border ${i === 1 ? 'border-bid-green ring-4 ring-bid-green/5 shadow-2xl relative scale-105 z-10' : 'border-slate-100 shadow-sm'} transition-all`}
                            >
                                {i === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bid-green text-bid-dark text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest whitespace-nowrap">Growth Favorite</div>}
                                <h3 className="text-xl font-black uppercase mb-3 tracking-tight text-slate-900">{plan.name}</h3>
                                <p className="text-4xl font-black text-bid-greenhover mb-8">{plan.price}</p>
                                <p className="text-slate-500 text-[10px] font-bold mb-10 leading-relaxed h-12 uppercase italic">{plan.description}</p>
                                <div className="space-y-4 mb-12 border-t border-slate-50 pt-10">
                                    {plan.features.map((f, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                                            <CheckCircle2 size={18} className="text-bid-greenhover shrink-0" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                                <Link href="/contact" className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all block text-center ${i === 1 ? 'bg-bid-green text-bid-dark shadow-xl shadow-bid-green/10' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'}`}>Subscribe</Link>
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="relative">
                    <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center border border-slate-800 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-bid-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10 leading-tight">
                            Secure Your <br /><span className="text-bid-greenhover italic font-normal">Digital Trust</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 relative z-10">
                            <Link href="/contact" className="px-14 py-6 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-lg flex items-center gap-4 text-xl uppercase tracking-widest">
                                GET SUPPORT
                                <ArrowRight size={24} />
                            </Link>
                            <a href="mailto:support@bidalert.in" className="text-slate-400 font-extrabold tracking-[0.3em] text-[10px] hover:text-white transition-all uppercase underline underline-offset-8 decoration-bid-green/40">support@bidalert.in</a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
