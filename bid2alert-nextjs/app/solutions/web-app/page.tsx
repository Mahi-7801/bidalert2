'use client';

import { motion } from 'framer-motion';
import {
    Globe, Layout, Database, Rocket,
    Code, Smartphone, Zap, CheckCircle2,
    ArrowRight, Monitor, Cpu, Star
} from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

const MotionDiv = motion.div as any;

const services = [
    {
        title: "Static Website Development",
        icon: Monitor,
        description: "Ideal for company profiles and landing pages with a focus on speed and SEO.",
        features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Professional UI/UX"],
        color: "from-blue-500/20 to-cyan-500/20",
        borderColor: "border-blue-500/30",
        price: "₹15,000 - ₹30,000"
    },
    {
        title: "Dynamic Website Development",
        icon: Database,
        description: "Scale your business with powerful tender portals, dashboards, and user management systems.",
        features: ["User Auth/Login", "Real-time Listings", "Admin Dashboards", "Payment Gateway"],
        color: "from-bid-green/20 to-emerald-500/20",
        borderColor: "border-bid-green/30",
        price: "₹60,000 - ₹1,50,000"
    },
    {
        title: "Mobile App Development",
        icon: Smartphone,
        description: "Native-quality experience for Android & iOS using modern cross-platform technologies.",
        features: ["Push Notifications", "Native Performance", "Offline Support", "Secure REST APIs"],
        color: "from-purple-500/20 to-pink-500/20",
        borderColor: "border-purple-500/30",
        price: "₹1,50,000 - ₹3,50,000"
    }
];

const techStack = [
    { name: "React / Next.js", category: "Frontend", icon: Cpu },
    { name: "Node.js / Laravel", category: "Backend", icon: Code },
    { name: "Flutter / React Native", category: "Mobile", icon: Smartphone },
    { name: "PostgreSQL / MySQL", category: "Database", icon: Database },
    { name: "Tailwind CSS", category: "Design", icon: Layout },
    { name: "AWS / Google Cloud", category: "Cloud", icon: Globe }
];

export default function Development() {
    const containerRef = useRef(null);

    return (
        <div className="bg-[#F8FAFC] min-h-screen text-slate-900 selection:bg-bid-green selection:text-bid-dark font-sans overflow-x-hidden" ref={containerRef}>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-6 pb-4">
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
                    <span className="text-bid-greenhover font-bold">Web & App Development</span>
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
                            <Zap size={12} className="fill-bid-greenhover" />
                            Premium Development
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9] text-slate-900">
                            Web & App <br /><span className="text-bid-greenhover">Development</span>
                        </h1>
                        <p className="text-slate-600 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
                            Elevate your brand with professionally designed static and dynamic websites
                            along with enterprise-grade mobile applications.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <Link href="/contact" className="px-10 py-5 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-lg flex items-center gap-3">
                                START YOUR PROJECT
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </MotionDiv>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">
                {/* Core Services */}
                <section id="services" className="relative mb-24 px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Core <span className="text-bid-greenhover">Services</span></h2>
                        <div className="w-12 h-1 bg-bid-green mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {services.map((service, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white border border-slate-100 p-10 rounded-[3rem] overflow-hidden transition-all duration-500 hover:border-bid-green/30 hover:shadow-xl"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity pointer-events-none">
                                    <service.icon size={100} />
                                </div>

                                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-10 group-hover:bg-bid-green group-hover:text-bid-dark transition-all duration-500">
                                    <service.icon size={32} />
                                </div>
                                <h3 className="text-xl font-black uppercase mb-3 tracking-wide text-slate-900 leading-tight">{service.title}</h3>
                                <p className="text-slate-500 font-medium text-xs mb-8 leading-relaxed h-12 uppercase italic">
                                    {service.description}
                                </p>

                                <div className="space-y-3 mb-10 border-t border-slate-50 pt-8">
                                    {service.features.map((f, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                                            <div className="w-1.5 h-1.5 rounded-full bg-bid-green group-hover:bg-bid-green transition-colors" />
                                            {f}
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Starting From</p>
                                        <p className="text-xl font-black text-bid-greenhover">{service.price}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-bid-green group-hover:text-bid-dark transition-all text-slate-400">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us - Tech Stack */}
                <section id="tech-stack" className="py-24 relative overflow-hidden bg-white rounded-[4rem] border border-slate-100 shadow-sm mb-24">
                    <div className="container mx-auto px-8 lg:px-16 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <MotionDiv
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-bid-greenhover font-black text-[10px] uppercase tracking-[0.4em] mb-8 block">Our Technology</span>
                                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-10 text-slate-900">
                                    Scalable <br /><span className="text-bid-greenhover italic font-normal">& Secure</span>
                                </h2>
                                <p className="text-slate-600 text-xl font-medium leading-relaxed mb-12 max-w-lg">
                                    We use industry-standard technologies to ensure your platform is lightning fast,
                                    secure, and ready for future growth.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    {techStack.slice(0, 4).map((tech, i) => (
                                        <div key={i} className="flex items-center gap-5 bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-bid-green/20 transition-all group">
                                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-bid-greenhover group-hover:bg-bid-green group-hover:text-bid-dark transition-all">
                                                <tech.icon size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase text-slate-900 leading-none tracking-wider mb-1.5">{tech.name}</p>
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{tech.category}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </MotionDiv>

                            <div className="relative">
                                <div className="aspect-square bg-slate-50 rounded-[4rem] flex items-center justify-center overflow-hidden border border-slate-100 shadow-inner relative group">
                                    <div className="text-center relative z-10 p-12">
                                        <Rocket size={120} className="text-bid-greenhover mx-auto mb-10 animate-bounce-slow" />
                                        <h4 className="text-4xl font-black uppercase tracking-tighter mb-4 text-slate-900 uppercase italic">Guntur's Finest</h4>
                                        <p className="text-lg font-bold text-slate-500 tracking-wider">Local Passion. Global Excellence.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Development Timeline */}
                <section id="timeline" className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-slate-900">Development <span className="text-bid-greenhover italic font-normal whitespace-nowrap">Timeline</span></h2>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {[
                            { phase: "Requirement Analysis", duration: "3-5 Days", desc: "Understanding your business goals and detailed scope." },
                            { phase: "UI/UX Design", duration: "5-7 Days", desc: "Creating clean, modern, and accessible layouts." },
                            { phase: "Development Phase", duration: "15-35 Days", desc: "Full-stack implementation and feature integration." },
                            { phase: "Testing & Deployment", duration: "5-7 Days", desc: "Rigorous quality check and production launch." }
                        ].map((p, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex flex-col sm:flex-row items-center justify-between bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-bid-green/20 transition-all shadow-sm"
                            >
                                <div className="text-center sm:text-left mb-6 sm:mb-0">
                                    <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-2">{p.phase}</h3>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm">{p.desc}</p>
                                </div>
                                <div className="px-8 py-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-bid-green/10 group-hover:border-bid-green/20 transition-colors">
                                    <span className="text-lg font-black text-bid-greenhover uppercase tracking-widest">{p.duration}</span>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative">
                    <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center border border-slate-800 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-bid-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10 leading-tight">
                            Build Your Future <br /><span className="text-bid-green">with Expert Tech</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 relative z-10">
                            <Link href="/contact" className="px-12 py-5 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-lg flex items-center gap-4 text-xl uppercase tracking-widest">
                                START PROJECT
                                <ArrowRight size={24} />
                            </Link>
                            <a href="mailto:support@bidalert.in" className="text-slate-500 font-bold tracking-[0.4em] text-[10px] hover:text-white transition-all uppercase underline underline-offset-8 decoration-bid-green/40">support@bidalert.in</a>
                        </div>
                    </div>
                </section>
            </div>

            <style jsx global>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
