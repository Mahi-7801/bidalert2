'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Palette, Box, Layers, Image as ImageIcon, X, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DesignRegistrationPage() {
    // Animation Variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    return (
        <div className="bg-[#F0F9FF] min-h-screen font-sans selection:bg-bid-green selection:text-bid-dark pb-24 border-b border-blue-100 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
                <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none" />

                <motion.div
                    // @ts-ignore
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-4 relative z-10 text-center"
                >
                    <motion.span
                        // @ts-ignore
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black mb-6 border border-bid-green/30 inline-block uppercase tracking-[0.2em]"
                    >
                        Aesthetic IP Protection
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        Design <span className="text-bid-green">Registration</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Protect the visual appearance of your unique products. Secure the shape, configuration, pattern, and ornamentation that define your market identity.
                    </motion.p>
                </motion.div>
            </section>

            {/* Pricing Strip */}
            <section className="container mx-auto px-4 -mt-20 sm:-mt-28 relative z-30 mb-24">
                <motion.div
                    // @ts-ignore
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-blue-100 p-8 sm:p-12 rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto"
                >
                    <div className="flex-1 text-center md:text-left space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-3 text-bid-green mb-2">
                            <Tag size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Industrial Design Security</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹20,000<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Govt Portal Fee + Professional Charges</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Includes comprehensive design search, drafting of descriptive details, and official filing by qualified IPR experts.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Start Design Process
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Content Sections */}
            <section className="container mx-auto px-4 max-w-7xl">

                {/* What is Design Registration? */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3rem] shadow-sm flex flex-col lg:flex-row gap-12 items-center mb-10"
                >
                    <div className="flex-1">
                        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
                            What is <span className="text-bid-green italic leading-none">Design Registration?</span>
                        </h3>
                        <div className="space-y-4 text-slate-600 text-sm sm:text-base font-medium leading-relaxed font-sans">
                            <p>
                                Design Registration is a legal protection given to the visual appearance of a product. It protects how a product looks, not how it works.
                            </p>
                            <p className="font-black text-slate-900 mt-4 uppercase tracking-wider text-xs">It covers:</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                {[
                                    { icon: <Box size={14} />, label: "Shape" },
                                    { icon: <Layers size={14} />, label: "Pattern" },
                                    { icon: <Cpu size={14} />, label: "Configuration" },
                                    { icon: <Award size={14} />, label: "Ornamentation" },
                                    { icon: <Palette size={14} />, label: "Lines, colours, or surface design" },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                        <span className="text-bid-green">{item.icon}</span>
                                        <span className="text-slate-700 text-xs font-bold">{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="pt-2 italic text-xs text-bid-green font-black">📌 Applicable only to physical / industrial products.</p>
                        </div>
                    </div>
                    <div className="lg:w-1/3 bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <Palette size={100} />
                        </div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-bid-green">Aesthetic Value</h4>
                        <p className="font-bold text-lg leading-snug mb-6">
                            "Protect the outer look of your innovation from copycats and look-alikes."
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-bid-green flex items-center justify-center font-black text-bid-dark text-[8px]">DR</div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">IPR Verified</span>
                        </div>
                    </div>
                </motion.div>

                {/* Protects vs Not Protect */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green font-black text-xl">
                                <BadgeCheck />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">What it PROTECTS</h4>
                        </div>
                        <div className="space-y-4">
                            <p className="text-slate-600 text-xs font-medium leading-relaxed">
                                Design Registration protects the aesthetic (outer look) of a product.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["Bottle shape", "Mobile body", "Furniture", "Jewellery", "Packaging", "Switch design", "Helmet", "Fan", "Lamp"].map((ex, i) => (
                                    <span key={i} className="text-[9px] font-black bg-slate-50 border border-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-tighter">{ex}</span>
                                ))}
                            </div>
                            <p className="text-xs font-bold text-slate-800 italic border-l-2 border-bid-green pl-3">If someone copies the same look, you can take legal action.</p>
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-red-50/30 border border-red-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 font-black text-xl">
                                <X />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">What it does NOT protect</h4>
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: "Functional Working", desc: "How the product works" },
                                { title: "Brand Name/Logo", desc: "Trademark does that" },
                                { title: "Technical Invention", desc: "Patent does that" },
                                { title: "Software UI alone", desc: "Unless part of physical product" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                    <div>
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{item.title}</p>
                                        <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Who Should Apply & Authority */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div {...fadeInUp} className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 p-10 opacity-5">
                            <Users size={150} />
                        </div>
                        <h4 className="text-2xl font-black mb-8 uppercase tracking-tighter relative z-10">Who should <span className="text-bid-green">Apply?</span></h4>
                        <ul className="space-y-4 relative z-10">
                            {["Manufacturers", "Startups", "MSMEs", "Product Designers", "Industrial Design Companies", "Packaging & FMCG Brands"].map((user, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-bid-green" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-white/70">{user}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-xs font-medium text-white/50 leading-relaxed italic border-t border-white/10 pt-6">
                            "If your product's look gives market value, you should register it."
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-8 rounded-[2.5rem] shadow-sm flex items-center gap-6">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                                <Landmark size={28} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Legal Authority</h4>
                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Indian Patent Office (IPO) <br /><span className="text-[9px] text-slate-500">Governed by Designs Act, 2000</span></p>
                            </div>
                        </motion.div>

                        <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-8 rounded-[2.5rem] shadow-sm flex items-center gap-6">
                            <div className="w-14 h-14 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <Clock size={28} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Validity & Duration</h4>
                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">10 Years + 5 Years Extension <br /><span className="text-[9px] text-slate-500 font-bold uppercase">(Total 15 Years Protection)</span></p>
                            </div>
                        </motion.div>

                        <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-8 rounded-[2.5rem] shadow-sm flex items-center gap-6">
                            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                                <Gavel size={28} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Infringement Rights</h4>
                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Claim Damages & Stop Copying <br /><span className="text-[9px] text-slate-500 font-bold uppercase">Court injunctions & Financial Penalties</span></p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Registration Process */}
                <div className="mb-24 px-4 overflow-hidden pt-20">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            THE DESIGN JOURNEY
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Registration <br /><span className="text-bid-green">Process</span></h3>
                        <p className="text-slate-500 mt-2 font-black uppercase tracking-widest text-[10px]">Estimated Timeline: 6–12 months</p>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "Design Creation", timeline: "Initial Setup", desc: "Develop the unique visual elements including shape, pattern, and ornamentation that define your product's aesthetic value." },
                                { step: "02", title: "Design Search", timeline: "Week 1", desc: "Comprehensive check against existing registered designs in the IPO database to ensure absolute novelty and uniqueness." },
                                { step: "03", title: "Application Filing", timeline: "Week 2", desc: "Official submission to the Indian Patent Office with 360° product views, representations, and descriptive statements." },
                                { step: "04", title: "Examination", timeline: "Month 1-4", desc: "Rigorous technical review by state authorities for compliance with the Designs Act, addressing any stylistic objections." },
                                { step: "05", title: "Registration", timeline: "Month 6-12", desc: "Issuance of the Design Registration Certificate grant after successful examination and entry into the Official Register." }
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    {...fadeInUp}
                                    className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                                >
                                    <div className="flex-1 lg:px-20 text-center lg:text-right">
                                        {i % 2 === 0 ? (
                                            <div className="lg:text-right">
                                                <h5 className="text-[10px] font-black text-bid-green uppercase tracking-[0.2em] mb-1">{s.timeline}</h5>
                                                <h4 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-2">{s.title}</h4>
                                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                                            </div>
                                        ) : <div className="hidden lg:block" />}
                                    </div>

                                    <div className="w-16 h-16 bg-white border-2 border-bid-green rounded-full flex items-center justify-center relative z-20 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                                        <span className="text-bid-green font-black text-lg">{s.step}</span>
                                    </div>

                                    <div className="flex-1 lg:px-20 text-center lg:text-left">
                                        {i % 2 !== 0 ? (
                                            <div className="lg:text-left text-center">
                                                <h5 className="text-[10px] font-black text-bid-green uppercase tracking-[0.2em] mb-1">{s.timeline}</h5>
                                                <h4 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-2">{s.title}</h4>
                                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                                            </div>
                                        ) : <div className="hidden lg:block text-center" />}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Documents Section */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3.5rem] shadow-sm mb-24 max-w-5xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Documents Required</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2 px-4 italic leading-relaxed">Essential checklist for a error-free design application</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {[
                            "Applicant Name & Address",
                            "Product Drawings / Images (Multiple Views)",
                            "Clear Description of the Design",
                            "Class of Product (Industrial Category)",
                            "Power of Attorney (If filed via agent)",
                            "Priority Documents (If applicable)"
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl group hover:bg-bid-green/5 transition-colors">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-bid-green shrink-0 group-hover:scale-110 transition-transform">
                                    <FileCheck size={18} />
                                </div>
                                <span className="text-xs font-black text-slate-700 uppercase tracking-tight leading-relaxed">{doc}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Final Professional CTA Section */}
                <motion.div
                    // @ts-ignore
                    initial={{ scale: 0.98, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-bid-green -rotate-12 translate-x-1/2 -translate-y-1/2">
                        <Rocket size={400} />
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">VISUAL ASSET GUARD</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Secure your <span className="text-bid-green italic">Product Aesthetics</span> for 15 years.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Stop visual copycats and cloning. Get your design certificate in 6-12 months for ₹20,000/-</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Apply Design Now
                        </Link>
                        <Link href="/contact" className="bg-slate-900 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center">
                            Talk to Expert
                        </Link>
                    </div>
                </motion.div>

            </section>
        </div>
    );
}
