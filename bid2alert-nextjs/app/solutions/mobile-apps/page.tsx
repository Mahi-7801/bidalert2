'use client';

import { motion } from 'framer-motion';
import {
    Smartphone, Link as LinkIcon, Lock,
    Bell, CreditCard, LayoutDashboard, Rocket,
    ArrowRight, CheckCircle2, Apple, Play, Zap, Star
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const MotionDiv = motion.div as any;

const pricingPlans = [
    {
        name: "Basic App",
        price: "₹60,000 – ₹1,00,000",
        description: "Perfect for single-purpose applications or MVP launches.",
        features: ["Android & iOS (Hybrid)", "Basic API Integration", "Email/Phone Auth", "Standard UI"]
    },
    {
        name: "Business Mobile App",
        price: "₹1,20,000 – ₹2,50,000",
        description: "Full-featured apps for established businesses looking for high engagement.",
        features: ["High Performance", "Offline Support", "Push Notifications", "Payment Integration"]
    },
    {
        name: "Advanced Enterprise App",
        price: "₹3,00,000 – ₹8,00,000",
        description: "High-scale applications with complex logic and deep system integrations.",
        features: ["Native Experience", "Real-time Sync", "Custom Animations", "Scalable Backend"]
    }
];

const features = [
    { title: "Android & iOS Development", icon: Smartphone },
    { title: "Full API Integration", icon: LinkIcon },
    { title: "Authentication System", icon: Lock },
    { title: "Push Notifications", icon: Bell },
    { title: "Secure Payment", icon: CreditCard },
    { title: "Admin Dashboard", icon: LayoutDashboard },
    { title: "App Store Publishing", icon: Apple },
    { title: "Play Store Publishing", icon: Play }
];

export default function MobileAppSolution() {
    const containerRef = useRef(null);

    return (
        <div className="bg-[#F8FAFC] min-h-screen text-slate-900 selection:bg-bid-green selection:text-bid-dark overflow-x-hidden" ref={containerRef}>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-6 pb-4">
                <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm flex items-center gap-2"
                >
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">Home</Link>
                    <span className="text-slate-400 mx-1">&gt;</span>
                    <Link href="/solutions/web-app" className="text-slate-500 hover:text-bid-green transition-colors font-medium">IT Services</Link>
                    <span className="text-slate-400 mx-1">&gt;</span>
                    <span className="text-bid-greenhover font-bold">Mobile Application Development</span>
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
                            <Smartphone size={12} />
                            Native Experience
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9] text-slate-900">
                            Mobile App <br /><span className="text-bid-greenhover">Development</span>
                        </h1>
                        <p className="text-slate-600 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
                            Transform your website or business idea into a powerful mobile application
                            for Android and iOS with seamless performance and premium UI.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <Link href="/contact" className="px-8 py-4 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-[0_10px_30px_rgba(74,222,128,0.2)] flex items-center gap-2">
                                DISCUSS APP IDEA
                                <Rocket size={20} />
                            </Link>
                        </div>
                    </MotionDiv>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">

                {/* Features Grid */}
                <section className="mb-24 px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Premium <span className="text-bid-greenhover uppercase">Features</span></h2>
                        <div className="w-12 h-1 bg-bid-green mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {features.map((feature, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white p-6 py-10 rounded-[2.5rem] border border-slate-100 hover:border-bid-green/30 transition-all group hover:shadow-xl text-center"
                            >
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-bid-greenhover group-hover:bg-bid-green group-hover:text-bid-dark transition-all duration-300">
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-500 group-hover:text-slate-900 transition-colors leading-tight">{feature.title}</h3>
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* Best For Section */}
                <section className="mb-24 py-16 bg-white rounded-[3rem] border border-slate-100 relative overflow-hidden text-center shadow-sm">
                    <div className="container mx-auto px-8 max-w-4xl relative z-10">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-bid-greenhover">Trusted By</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["Startups", "Service platforms", "E-commerce", "Enterprises"].map((item, i) => (
                                <span key={i} className="px-8 py-3 bg-slate-50 rounded-2xl text-slate-700 font-black text-xs uppercase tracking-widest border border-slate-100">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Table */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Budget & <span className="text-bid-greenhover italic font-normal">Pricing</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {pricingPlans.map((plan, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`bg-white p-10 rounded-[3rem] border ${i === 1 ? 'border-bid-green ring-4 ring-bid-green/5 shadow-2xl relative scale-105 z-10' : 'border-slate-100 shadow-sm'} transition-all`}
                            >
                                {i === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bid-green text-bid-dark text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest">Growth Plan</div>}
                                <h3 className="text-xl font-black uppercase mb-4 tracking-tight text-slate-900">{plan.name}</h3>
                                <p className="text-3xl font-black text-bid-greenhover mb-6 leading-none">{plan.price}</p>
                                <p className="text-slate-500 text-[10px] font-bold mb-10 leading-relaxed h-12 uppercase italic">{plan.description}</p>
                                <div className="space-y-4 mb-10 pt-10 border-t border-slate-50">
                                    {plan.features.map((f, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                                            <CheckCircle2 size={18} className="text-bid-greenhover shrink-0" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                                <Link href="/contact" className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all block text-center ${i === 1 ? 'bg-bid-green text-bid-dark' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>Get Quote</Link>
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* Add-ons */}
                <section className="mb-24">
                    <div className="max-w-4xl mx-auto bg-white p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-sm">
                        <h4 className="text-center text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-slate-400">Post-Launch Support</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {[
                                { title: "Store Publishing", price: "₹3,000", icon: Rocket },
                                { title: "App Maintenance", price: "₹2,000/mo", icon: Smartphone },
                                { title: "Admin Portal", price: "₹15,000", icon: LayoutDashboard }
                            ].map((addon, i) => (
                                <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center group hover:border-bid-green/40 transition-all shadow-sm">
                                    <addon.icon size={24} className="text-bid-greenhover mb-4 group-hover:scale-110 transition-transform" />
                                    <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest leading-tight">{addon.title}</p>
                                    <p className="text-lg font-black text-slate-900 leading-none whitespace-nowrap">{addon.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative">
                    <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center border border-slate-800 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-bid-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10 leading-tight">
                            Build Your Next <br />Mobile Success
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
                            <Link href="/contact" className="px-12 py-5 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(74,222,128,0.3)] flex items-center gap-3 text-lg uppercase tracking-widest">
                                START YOUR APP
                                <ArrowRight size={24} />
                            </Link>
                            <a href="mailto:support@bidalert.in" className="text-slate-400 font-black tracking-widest text-xs hover:text-white transition-all uppercase underline underline-offset-8 decoration-bid-green/40">support@bidalert.in</a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
