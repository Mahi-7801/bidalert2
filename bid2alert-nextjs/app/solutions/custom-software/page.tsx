'use client';

import { motion } from 'framer-motion';
import {
    Cpu, Settings, Database, Users,
    Truck, Landmark, Building2, Stethoscope,
    ArrowRight, CheckCircle2, Zap, Star
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const MotionDiv = motion.div as any;

const pricingPlans = [
    {
        name: "Small Business Software",
        price: "₹70,000 – ₹1,50,000",
        description: "Focused automation for specific departments or singular business problems.",
        features: ["Specific Workflow Design", "User Management", "Basic Reporting", "6 Months Support"]
    },
    {
        name: "Business Automation",
        price: "₹1,80,000 – ₹4,00,000",
        description: "End-to-end automation of your core business processes and operations.",
        features: ["Inter-department Sync", "Advanced Dashboard", "Data Export/Import", "1 Year Maintenance"]
    },
    {
        name: "Enterprise Solutions",
        price: "₹5,00,000+",
        description: "Massive scale architecture designed for thousands of users and complex logic.",
        features: ["Microservices Design", "Premium Security", "Cloud Infrastructure", "24/7 Priority Support"]
    }
];

const solutions = [
    { title: "Inventory Management Systems", icon: Database },
    { title: "Hospital Management Software", icon: Stethoscope },
    { title: "School / College ERP Systems", icon: Landmark },
    { title: "HR & Payroll Software", icon: Users },
    { title: "Logistics Management Systems", icon: Truck },
    { title: "Government Service Portals", icon: Building2 }
];

export default function CustomSoftwareSolution() {
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
                    <span className="text-bid-greenhover font-bold">Custom Software</span>
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
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bid-green/10 border border-bid-green/20 text-bid-greenhover text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                            <Cpu size={12} className="animate-pulse" />
                            Enterprise Engineering
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9] text-slate-900">
                            Custom Software <br /><span className="text-bid-greenhover">Development</span>
                        </h1>
                        <p className="text-slate-600 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
                            We build tailor-made software systems to automate business operations
                            and increase productivity with specialized industry-focused solutions.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <Link href="/contact" className="px-10 py-5 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-[0_15px_40px_rgba(74,222,128,0.2)] flex items-center gap-3">
                                START ARCHITECTING
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </MotionDiv>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">

                {/* Solutions Grid */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Industry <span className="text-bid-greenhover italic font-normal">Specializations</span></h2>
                        <div className="w-12 h-1 bg-bid-green mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {solutions.map((solution, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-bid-green/30 transition-all group hover:shadow-xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none text-bid-greenhover">
                                    <solution.icon size={120} />
                                </div>
                                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-10 text-bid-greenhover group-hover:bg-bid-green group-hover:text-bid-dark transition-all duration-500 transform group-hover:scale-110">
                                    <solution.icon size={32} />
                                </div>
                                <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors mb-4">{solution.title}</h3>
                                <div className="h-0.5 w-8 bg-slate-100 group-hover:w-16 group-hover:bg-bid-green transition-all duration-500" />
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* Core Benefits */}
                <section className="mb-24 py-20 bg-white rounded-[4rem] border border-slate-100 text-slate-900 relative overflow-hidden shadow-sm">
                    <div className="container mx-auto px-10 max-w-6xl relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-tight">Scale Without <br /><span className="text-bid-greenhover">Limits</span></h3>
                                <div className="space-y-8">
                                    {[
                                        "Automated Workflow Optimization",
                                        "Seamless Department Integration",
                                        "Data-Driven Decision Making",
                                        "High Volume Performance"
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-6 group">
                                            <div className="w-8 h-8 rounded-full border border-bid-green/30 flex items-center justify-center group-hover:bg-bid-green transition-all">
                                                <div className="w-2 h-2 rounded-full bg-bid-green group-hover:bg-bid-dark" />
                                            </div>
                                            <span className="text-xl font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 p-4">
                                <div className="aspect-square bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center p-8">
                                    <Cpu size={48} className="mb-4 text-bid-greenhover/40" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Optimized</p>
                                </div>
                                <div className="aspect-square bg-white rounded-3xl border border-bid-green/20 flex flex-col items-center justify-center text-center p-8 shadow-xl">
                                    <Settings size={48} className="mb-4 animate-spin-slow text-bid-greenhover" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 font-black">Controlled</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Table */}
                <section className="mb-24 px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Software <span className="text-bid-greenhover italic font-normal">Pricing</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {pricingPlans.map((plan, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`bg-white p-12 rounded-[3.5rem] border ${i === 1 ? 'border-bid-green ring-4 ring-bid-green/5 shadow-2xl scale-105 z-10' : 'border-slate-100'}`}
                            >
                                {i === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bid-green text-bid-dark text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest leading-none">Best Value</div>}
                                <h3 className="text-xl font-black uppercase mb-3 tracking-tight text-slate-900">{plan.name}</h3>
                                <p className="text-4xl font-black text-bid-greenhover mb-8">{plan.price}</p>
                                <p className="text-slate-500 text-xs font-medium mb-10 leading-relaxed h-12 uppercase italic">{plan.description}</p>
                                <div className="space-y-4 mb-12 pt-10 border-t border-slate-50">
                                    {plan.features.map((f, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                                            <CheckCircle2 size={18} className="text-bid-greenhover shrink-0" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                                <Link href="/contact" className={`w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all block text-center ${i === 1 ? 'bg-bid-green text-bid-dark shadow-lg shadow-bid-green/10' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'}`}>Start Build</Link>
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="relative">
                    <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center border border-slate-800 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-bid-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10 leading-tight">
                            Build Your Legacy <br /><span className="text-bid-green italic font-normal whitespace-nowrap">with Custom Tech</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 relative z-10">
                            <Link href="/contact" className="px-14 py-6 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-lg flex items-center gap-4 text-xl uppercase tracking-widest">
                                GET IN TOUCH
                                <ArrowRight size={24} />
                            </Link>
                            <a href="mailto:support@bidalert.in" className="text-slate-500 font-black tracking-[0.3em] text-[10px] hover:text-white transition-all uppercase underline underline-offset-8 decoration-bid-green/40">support@bidalert.in</a>
                        </div>
                    </div>
                </section>

            </div>

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
                }
            `}</style>
        </div>
    );
}
