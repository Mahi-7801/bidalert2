'use client';

import { motion } from 'framer-motion';
import { Search, Bell, FileCheck, Rocket, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
    const steps = [
        {
            icon: Search,
            title: "Discovery",
            description: "Browse through thousands of verified government tenders categorized by state, city, and industry.",
            details: ["Real-time database updates", "Advanced keyword search", "Global tender opportunities"]
        },
        {
            icon: Bell,
            title: "Smart Alerts",
            description: "Set up personalized watchlists and receive instant notifications for new relevant opportunities.",
            details: ["Email alerts", "Keyword matching", "Deadline reminders"]
        },
        {
            icon: FileCheck,
            title: "Analysis",
            description: "Use our Bid Analyser AI to quickly understand tender requirements and eligibility criteria.",
            details: ["AI-powered summaries", "Risk assessment", "Eligibility checking"]
        },
        {
            icon: Rocket,
            title: "Submission",
            description: "Access our expert support for registration and document preparation to ensure a win.",
            details: ["Expert documentation help", "Compliance checklist", "Winner analysis"]
        }
    ];

    return (
        <div className="bg-white min-h-screen overflow-x-hidden">
            {/* Hero Header */}
            <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-24 relative overflow-hidden border-b border-slate-100">
                <div className="absolute inset-0 opacity-[0.05]">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-bid-greenhover" />
                    <div className="absolute top-1/2 left-1/4 w-px h-full bg-bid-greenhover" />
                </div>

                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bid-green/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
                        Simple Steps to <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-bid-greenhover to-emerald-600">Scale Your Business</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                        BidAlert simplifies the complex world of government tendering into
                        a streamlined, data-driven process.
                    </p>
                </div>
            </section>

            {/* Workflow Steps */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="space-y-24 max-w-[1530px] mx-auto">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                // @ts-ignore
                                initial={{ opacity: 0, y: 30 }}
                                // @ts-ignore
                                whileInView={{ opacity: 1, y: 0 }}
                                // @ts-ignore
                                viewport={{ once: true }}
                                className={`flex flex-col lg:flex-row gap-12 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className="lg:w-1/2 text-center lg:text-left">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-bid-green text-bid-dark font-black rounded-full mb-6 text-xl">
                                        {i + 1}
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-bid-dark uppercase tracking-tighter mb-6">
                                        {step.title}
                                    </h2>
                                    <p className="text-lg text-gray-600 font-medium mb-8">
                                        {step.description}
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {step.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-tight">
                                                <CheckCircle2 size={16} className="text-bid-green" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="lg:w-1/2 w-full">
                                    <div className="aspect-video bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center group hover:border-bid-green transition-colors overflow-hidden relative shadow-lg">
                                        <step.icon size={80} className="text-gray-200 group-hover:text-bid-green transition-colors" />
                                        <div className="absolute inset-0 bg-gradient-to-br from-bid-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black text-bid-dark uppercase tracking-tight mb-8">Ready to grow your business?</h2>
                    <Link href="/register" className="inline-flex items-center gap-3 px-12 py-5 bg-bid-green text-bid-dark font-black rounded-full hover:brightness-110 transition-all uppercase tracking-widest text-sm shadow-xl active:scale-95 group">
                        Sign Up Today
                        <ChevronRight className="transition-transform group-hover:translate-x-1" size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
