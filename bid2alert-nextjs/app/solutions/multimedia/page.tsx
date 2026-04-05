'use client';

import { motion } from 'framer-motion';
import {
    PenTool, Video, Globe, Camera, Monitor, CheckCircle2, ArrowRight, Star,
    Layers, Zap, ShieldCheck
} from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

const MotionDiv = motion.div as any;
const MotionLi = motion.li as any;

const services = [
    {
        category: "Graphic Design & Branding",
        icon: PenTool,
        description: "Professional branding solutions that make your business stand out.",
        items: [
            { name: "Logo Design – Basic", price: "₹800" },
            { name: "Logo Design – Premium", price: "₹1,500" },
            { name: "Visiting Cards", price: "₹499" },
            { name: "Business Posters", price: "₹499 - ₹1,999" },
            { name: "Beauty Parlor (1 Mo)", price: "₹4,999" },
            { name: "Certificate Design", price: "₹699" },
            { name: "Thumbnail Design", price: "₹500 - ₹1,500" },
            { name: "AI Posters / Ads", price: "₹199 / ₹499" },
            { name: "CV / Resume Design", price: "₹499 - ₹999" }
        ]
    },
    {
        category: "Video Editing & Events",
        icon: Video,
        description: "Cinematic editing for your most memorable moments and professional needs.",
        items: [
            { name: "Wedding Cuts", price: "₹9,999 - ₹29,999" },
            { name: "Birthday Mashups", price: "₹999 - ₹1,999" },
            { name: "Event Footage (Small)", price: "₹9,999" },
            { name: "Corporate / School", price: "₹2,999" },
            { name: "Short Film Editing", price: "₹4,999 - ₹29,999" },
            { name: "Invitation Videos", price: "₹999" },
            { name: "Instagram Reels", price: "₹299/video" },
            { name: "Creator Packages", price: "₹800 - ₹1,2L/mo" }
        ]
    },
    {
        category: "Web & Digital Presence",
        icon: Globe,
        description: "Modern digital presence solutions for businesses and individuals.",
        items: [
            { name: "Portfolio Website", price: "₹2,999" },
            { name: "Static Web Design", price: "₹13,999" },
            { name: "Dynamic Web Design", price: "₹30,000+" },
            { name: "App Design (UI/UX)", price: "₹50,000+" },
            { name: "E-commerce Updates", price: "₹50,000" }
        ]
    }
];

const terms = [
    "50% advance for high-value projects.",
    "100% advance for small works (reels, posters, etc).",
    "Preview shared before final delivery.",
    "Three (3) free revisions included.",
    "Delivery timelines followed strictly as discussed.",
    "Client must provide all content and footage.",
    "Advance payments are non-refundable.",
    "No refunds after preview approval.",
    "Client owns final deliverables after full payment.",
    "Multimedia Solutions may use work for portfolio.",
    "Raw files are strictly confidential."
];

export default function MultimediaSolutions() {
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
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">Home</Link>
                    <span className="text-slate-400 mx-1">&gt;</span>
                    <span className="text-bid-greenhover font-bold">Multimedia Solutions</span>
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bid-green/10 border border-bid-green/20 text-bid-greenhover text-[10px] font-black uppercase tracking-widest mb-6 mx-auto">
                            <Star size={12} className="fill-bid-greenhover" />
                            Premium Content
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9] text-slate-900">
                            Multimedia <br /><span className="text-bid-greenhover uppercase">Solutions</span>
                        </h1>
                        <p className="text-slate-600 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed mx-auto">
                            Bring your stories to life with cinematic editing and stunning motion graphics.
                            Transform your message into engaging visual experiences.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <Link href="/contact" className="px-10 py-5 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-lg text-lg tracking-widest uppercase">
                                BOOK WORK
                            </Link>
                        </div>
                    </MotionDiv>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">
                {/* Services Section */}
                <section className="mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                        {services.map((service, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white border border-slate-100 rounded-[3rem] overflow-hidden transition-all duration-500 hover:border-bid-green/30 hover:shadow-xl"
                            >
                                <div className="p-10 pb-8 border-b border-slate-50">
                                    <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-10 group-hover:bg-bid-green group-hover:text-bid-dark transition-all duration-500 transform group-hover:-rotate-6">
                                        <service.icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-black uppercase mb-4 tracking-tight leading-tight text-slate-900">{service.category}</h3>
                                    <p className="text-slate-500 font-medium text-xs leading-relaxed italic h-10">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="p-8 space-y-2">
                                    {service.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-bid-green/40 group-hover:bg-bid-green transition-colors" />
                                                <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">{item.name}</span>
                                            </div>
                                            <span className="text-[11px] font-black text-bid-greenhover bg-bid-green/10 px-2 py-0.5 rounded-md whitespace-nowrap">
                                                {item.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-10 pt-4">
                                    <Link href="/contact" className="flex items-center justify-center w-full py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 hover:bg-bid-green hover:text-bid-dark hover:border-bid-green transition-all text-[11px] font-black uppercase tracking-[0.2em]">
                                        GET PRICE QUOTE
                                    </Link>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* Terms & Conditions Section */}
                <section className="py-24 bg-white rounded-[4rem] border border-slate-100 relative overflow-hidden shadow-sm">
                    <div className="container mx-auto px-8 max-w-5xl">
                        <div className="mb-16 text-center">
                            <span className="text-bid-greenhover font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Important Information</span>
                            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-slate-900">Project <span className="text-bid-greenhover italic font-normal">Terms</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 px-4">
                            {terms.map((term, i) => (
                                <MotionLi
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-4 py-3 border-b border-slate-50 group px-2"
                                >
                                    <div className="w-5 h-5 rounded-full border border-bid-green/30 flex items-center justify-center shrink-0 group-hover:bg-bid-green transition-all">
                                        <CheckCircle2 size={12} className="text-bid-greenhover group-hover:text-bid-dark" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{term}</span>
                                </MotionLi>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative mt-24">
                    <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center border border-slate-800 shadow-2xl relative overflow-hidden">
                        <Camera size={120} className="text-bid-green/10 absolute -top-10 -left-10 rotate-12" />
                        <Video size={120} className="text-bid-green/10 absolute -bottom-10 -right-10 -rotate-12" />

                        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10 leading-tight">
                            Capture Every <br /><span className="text-bid-green">Detail</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 relative z-10">
                            <Link href="/contact" className="px-14 py-6 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(74,222,128,0.3)] flex items-center gap-4 text-xl uppercase tracking-widest">
                                CONSULT EXPERT
                                <ArrowRight size={24} />
                            </Link>
                            <a href="mailto:support@bidalert.in" className="text-slate-400 font-black tracking-[0.4em] text-[10px] hover:text-white transition-all uppercase underline underline-offset-8 decoration-bid-green/40">support@bidalert.in</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
