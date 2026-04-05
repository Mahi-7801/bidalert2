'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Search, Mail, Users, TrendingUp, Target,
    BarChart3, Megaphone, ArrowRight, Star, Award, CheckCircle2
} from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

const MotionDiv = motion.div as any;

const services = [
    {
        category: "SEO Services",
        icon: Search,
        description: "Boost your online visibility and rank higher on search engines with our proven SEO strategies.",
        color: "from-blue-500/20 to-cyan-500/20",
        items: [
            { name: "On-Page SEO Optimization", price: "₹15,000/month" },
            { name: "Off-Page SEO & Link Building", price: "₹20,000/month" },
            { name: "Local SEO", price: "₹12,000/month" },
            { name: "Technical SEO Audit", price: "₹8,000" },
            { name: "Keyword Research & Strategy", price: "₹5,000" },
            { name: "SEO Content Writing", price: "₹2,000/article" },
            { name: "Complete SEO Package", price: "₹35,000/month" }
        ]
    },
    {
        category: "Email Marketing",
        icon: Mail,
        description: "Engage your audience with targeted email campaigns that convert prospects into customers.",
        color: "from-purple-500/20 to-pink-500/20",
        items: [
            { name: "Email Campaign Design", price: "₹3,000/campaign" },
            { name: "Email List Management", price: "₹5,000/month" },
            { name: "Automated Email Sequences", price: "₹8,000/setup" },
            { name: "Newsletter Design & Sending", price: "₹4,000/month" },
            { name: "A/B Testing & Analytics", price: "₹6,000/month" },
            { name: "Complete Email Marketing", price: "₹15,000/month" }
        ]
    },

    {
        category: "Lead Generation",
        icon: Users,
        description: "Generate high-quality leads that convert into paying customers for your business.",
        color: "from-orange-500/20 to-red-500/20",
        items: [
            { name: "Landing Page Design", price: "₹8,000" },
            { name: "Lead Magnet Creation", price: "₹5,000" },
            { name: "Facebook Lead Ads", price: "₹12,000/month" },
            { name: "Google Ads Lead Generation", price: "₹15,000/month" },
            { name: "LinkedIn Lead Generation", price: "₹18,000/month" },
            { name: "CRM Integration", price: "₹10,000" },
            { name: "Complete Lead Gen Package", price: "₹40,000/month" }
        ]
    },
    {
        category: "Social Media Marketing",
        icon: Megaphone,
        description: "Build your brand presence and engage with your audience across all social platforms.",
        color: "from-pink-500/20 to-rose-500/20",
        items: [
            { name: "Social Media Strategy", price: "₹8,000" },
            { name: "Content Creation (10 posts)", price: "₹6,000/month" },
            { name: "Social Media Management", price: "₹15,000/month" },
            { name: "Paid Social Advertising", price: "₹20,000/month" },
            { name: "Influencer Marketing", price: "₹25,000/campaign" },
            { name: "Complete Social Package", price: "₹35,000/month" }
        ]
    },
    {
        category: "Blue Tick Verification",
        icon: Award,
        description: "Get verified on Instagram, Facebook, Twitter, and other platforms to build trust and credibility.",
        color: "from-blue-600/20 to-indigo-500/20",
        items: [
            { name: "Instagram Blue Tick", price: "₹50,000" },
            { name: "Facebook Blue Badge", price: "₹45,000" },
            { name: "Twitter Verification", price: "₹55,000" },
            { name: "LinkedIn Verification", price: "₹40,000" },
            { name: "YouTube Verification", price: "₹35,000" },
            { name: "Multi-Platform Package", price: "₹1,50,000" }
        ]
    }
];

const benefits = [
    "Increase brand visibility and awareness",
    "Generate qualified leads consistently",
    "Improve customer engagement and retention",
    "Boost sales and revenue growth",
    "Build trust and credibility online",
    "Stay ahead of your competition",
    "Get detailed analytics and reporting",
    "24/7 campaign monitoring and support"
];

export default function MarketingServices() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yHero = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div className="bg-[#F0F9FF] min-h-screen text-slate-900 selection:bg-bid-green selection:text-bid-dark font-sans overflow-x-hidden" ref={containerRef}>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-6 pb-4">
                {/* @ts-ignore */}
                <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-sm flex items-center gap-2"
                >
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Home
                    </Link>
                    <span className="text-slate-400 mx-1">&gt;</span>
                    <span className="text-slate-900 font-bold">Marketing Solutions</span>
                </MotionDiv>
            </div>

            {/* Page Header - Full Width Neon Theme Block */}
            {/* @ts-ignore */}
            <div className="relative w-full bg-gradient-to-r from-[#0b4d3c] to-[#10e981] text-white shadow-lg py-16 mb-16 overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
                            Marketing Solutions
                        </h1>
                        <p className="text-white/90 text-lg md:text-2xl font-medium max-w-3xl leading-relaxed">
                            Drive growth with data-driven marketing strategies. From SEO to social media,
                            we help businesses reach their target audience and achieve measurable results.
                        </p>
                    </MotionDiv>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">
                {/* Services & Pricing Section */}
                <section id="pricing" className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {services.map((service, i) => (
                            /* @ts-ignore */
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="group relative bg-white border border-blue-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                {/* Header Section */}
                                <div className="p-8 pb-6 border-b border-blue-50">
                                    <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-bid-green group-hover:text-white transition-all duration-500`}>
                                        <service.icon size={28} className="text-bid-green group-hover:text-white transition-colors" />
                                    </div>

                                    <h3 className="text-xl font-black uppercase mb-2 tracking-tight text-slate-900">{service.category}</h3>
                                    <p className="text-slate-500 font-medium text-xs leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Pricing Items */}
                                <div className="p-6 bg-white">
                                    <div className="space-y-1">
                                        {service.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-bid-green" />
                                                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                                                </div>
                                                <span className="text-xs font-black text-bid-green">
                                                    {item.price}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="p-6 pt-2">
                                    <Link href="/contact" className="flex items-center justify-center w-full py-4 rounded-full bg-bid-green text-bid-dark hover:brightness-110 transition-all text-xs font-black uppercase tracking-widest gap-2 shadow-lg shadow-bid-green/10">
                                        Get Quote
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>
                </section>
            </div>

            {/* Benefits Section */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-4 text-slate-900">Why Choose Us</h2>
                            <p className="text-slate-600 text-lg font-medium">Benefits of working with BidAlert Marketing</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {benefits.map((benefit, i) => (
                                /* @ts-ignore */
                                <MotionDiv
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-slate-200 hover:border-bid-green/30 transition-all hover:shadow-lg"
                                >
                                    <CheckCircle2 size={24} className="text-bid-green flex-shrink-0 mt-1" />
                                    <span className="text-slate-700 font-semibold text-base">{benefit}</span>
                                </MotionDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 sm:p-16 text-center relative overflow-hidden group shadow-2xl">
                        {/* @ts-ignore */}
                        <MotionDiv
                            whileHover={{ scale: 1.1 }}
                            className="absolute -top-24 -right-24 w-80 h-80 bg-bid-green/20 rounded-full blur-[80px]"
                        />
                        <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-[1]">
                            Ready to Grow <br />Your Business?
                        </h2>
                        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                            Let's create a custom marketing strategy that delivers real results for your business.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/contact" className="px-10 py-5 bg-bid-green text-bid-dark font-black rounded-full hover:brightness-110 transition-all shadow-xl shadow-bid-green/30 flex items-center gap-2 active:scale-95 text-lg">
                                GET IN TOUCH
                                <ArrowRight size={22} />
                            </Link>
                            <a href="mailto:support@bidalert.in" className="text-white/70 font-black tracking-widest text-base hover:text-white hover:underline transition-all underline-offset-4">
                                support@bidalert.in
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
