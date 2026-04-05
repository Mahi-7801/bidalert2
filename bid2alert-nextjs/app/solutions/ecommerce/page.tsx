'use client';

import { motion } from 'framer-motion';
import {
    ShoppingCart, ShieldCheck, Zap, BarChart3,
    Truck, CreditCard, Layout, Search,
    ArrowRight, CheckCircle2, MessageSquare, Star
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const MotionDiv = motion.div as any;

const pricingPlans = [
    {
        name: "Starter Store",
        price: "₹25,000 – ₹40,000",
        description: "Perfect for small businesses starting their online journey.",
        features: ["Product Catalog", "Secure Payments", "Shopping Cart", "Mobile Responsive"]
    },
    {
        name: "Business Store",
        price: "₹45,000 – ₹80,000",
        description: "Advanced features for growing retail businesses and wholesalers.",
        features: ["Order Tracking", "Inventory Management", "Customer Dashboard", "SEO Optimized"]
    },
    {
        name: "Advanced Marketplace",
        price: "₹90,000 – ₹2,50,000",
        description: "Full-scale multi-vendor marketplace with custom features.",
        features: ["Multi-Vendor Support", "Mobile App Integration", "Custom Analytics", "Priority Support"]
    }
];

const features = [
    { title: "Product Catalog Management", icon: Layout },
    { title: "Secure Payment Gateway", icon: ShieldCheck },
    { title: "Shopping Cart & Checkout", icon: ShoppingCart },
    { title: "Order Tracking System", icon: Truck },
    { title: "Inventory Management", icon: BarChart3 },
    { title: "Customer Login Dashboard", icon: Zap },
    { title: "SEO Optimized Store", icon: Search },
    { title: "Mobile Responsive Design", icon: CreditCard }
];

export default function EcommerceSolution() {
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
                    <span className="text-bid-greenhover font-bold">E-Commerce Development</span>
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bid-green/10 border border-bid-green/20 text-bid-greenhover text-[11px] font-black uppercase tracking-widest mb-6">
                            <Star size={12} className="fill-bid-greenhover" />
                            Retail Excellence
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9] text-slate-900">
                            E-Commerce <br /><span className="text-bid-greenhover">Development</span>
                        </h1>
                        <p className="text-slate-600 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
                            Launch a powerful online store to sell products globally. We build secure,
                            scalable, and mobile-friendly platforms with integrated payments.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <Link href="/contact" className="px-8 py-4 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-[0_10px_30px_rgba(74,222,128,0.2)] flex items-center gap-2">
                                GET STARTED
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </MotionDiv>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">

                {/* Features Grid */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Store <span className="text-bid-greenhover">Features</span></h2>
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
                                className="bg-white p-8 pb-10 rounded-[2.5rem] border border-slate-100 hover:border-bid-green/40 transition-all group hover:shadow-xl text-center"
                            >
                                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-bid-greenhover group-hover:bg-bid-green group-hover:text-bid-dark transition-all duration-300">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors leading-tight">{feature.title}</h3>
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* Best For Section */}
                <section className="mb-24 py-20 bg-white rounded-[4rem] border border-slate-100 relative overflow-hidden text-center shadow-sm">
                    <div className="container mx-auto px-8 max-w-4xl relative z-10">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-bid-greenhover">Ideal For</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["Retail businesses", "Wholesalers", "Manufacturers", "Online Sellers"].map((item, i) => (
                                <span key={i} className="px-10 py-5 bg-slate-50 rounded-2xl text-slate-700 font-black text-xs uppercase tracking-widest border border-slate-100 shadow-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Table */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Investment <span className="text-bid-greenhover italic font-normal">Plans</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {pricingPlans.map((plan, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`bg-white p-10 rounded-[3rem] border ${i === 1 ? 'border-bid-green ring-4 ring-bid-green/5 shadow-2xl relative scale-105 z-10' : 'border-slate-100 shadow-sm'} transition-all`}
                            >
                                {i === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bid-green text-bid-dark text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest">Most Popular</div>}
                                <h3 className="text-xl font-black uppercase mb-2 tracking-tight text-slate-900">{plan.name}</h3>
                                <p className="text-3xl font-black text-bid-greenhover mb-6">{plan.price}</p>
                                <p className="text-slate-500 text-xs font-medium mb-10 leading-relaxed h-12 uppercase italic">{plan.description}</p>
                                <div className="space-y-4 mb-10 border-t border-slate-50 pt-10">
                                    {plan.features.map((f, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                                            <CheckCircle2 size={18} className="text-bid-greenhover shrink-0" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                                <Link href="/contact" className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all block text-center ${i === 1 ? 'bg-bid-green text-bid-dark shadow-lg shadow-bid-green/20' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>Select Plan</Link>
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* Add-ons */}
                <section className="mb-24 px-4">
                    <div className="max-w-5xl mx-auto bg-white p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm">
                        <h4 className="text-center text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-slate-400">Optional Enhancements</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Payment Gateway Setup", price: "₹3,000", icon: Zap },
                                { title: "Mobile App Integration", price: "₹35,000", icon: MessageSquare },
                                { title: "SEO Optimization", price: "₹10,000", icon: Search }
                            ].map((addon, i) => (
                                <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center group hover:border-bid-green/30 transition-all">
                                    <addon.icon size={28} className="text-bid-greenhover mb-4 group-hover:scale-110 transition-transform" />
                                    <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">{addon.title}</p>
                                    <p className="text-lg font-black text-slate-900 leading-none">{addon.price}</p>
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
                            Ready to Sell <br />Everywhere?
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                            <Link href="/contact" className="px-14 py-6 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(74,222,128,0.3)] flex items-center gap-3 text-xl uppercase tracking-widest">
                                OPEN YOUR STORE
                                <ArrowRight size={24} />
                            </Link>
                            <a href="mailto:support@bidalert.in" className="text-slate-400 font-extrabold tracking-widest text-xs hover:text-white transition-all uppercase underline underline-offset-8 decoration-bid-green/40">support@bidalert.in</a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
