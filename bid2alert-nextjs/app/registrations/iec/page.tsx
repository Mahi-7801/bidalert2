'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Ship, Plane, DollarSign, CreditCard, User, Briefcase, RefreshCw, AlertCircle, Box, Phone, Mail, Layout, Database, Code, ShieldAlert, GraduationCap, Lightbulb, Users2, Binary } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function IECRegistrationPage() {
    // Animation Variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    return (
        <div className="bg-[#F0F9FF] min-h-screen font-sans selection:bg-bid-green selection:text-bid-dark pb-24 border-b border-blue-100 overflow-x-hidden">
            {/* Hero Section - Premium Light Blue + Green Heading */}
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
                        Global Trade Identity
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        Import Export <span className="text-bid-green">Code (IEC)</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Mandatory 10-digit Identification for Global Trade. Secure your DGFT-issued IEC to clear customs, receive foreign remittances, and access Export Benefits.
                    </motion.p>
                </motion.div>
            </section>

            {/* Pricing Strip - Premium Consistent Theme */}
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Global Export Package</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹4,999<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">DGFT Filing + ANF 2A Preparation + Certificate Issuance</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Full assistance for online filing on the Directorate General of Foreign Trade (DGFT) portal. Includes PAN linkage, bank validation, and immediate certificate delivery.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Apply for IEC Code
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Core Info Sections */}
            <section className="container mx-auto px-4 max-w-7xl">

                {/* Scope & Importance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <Search size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Who Needs IEC?</h4>
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: "International Traders", desc: "Mandatory for anyone importing or exporting goods/services." },
                                { title: "Custom Clearances", desc: "Required to clear shipments through Indian Customs." },
                                { title: "Foreign Remittances", desc: "Necessary for receiving export proceeds in foreign currency." },
                                { title: "Govt Incentives", desc: "Gateway to DGFT schemes like RoDTEP & Export Benefits." }
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-1">{item.title}</h5>
                                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-bid-green -rotate-12 translate-x-1/4 -translate-y-1/4">
                            <Globe size={300} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-2xl font-black text-bid-green uppercase tracking-tighter mb-4 italic">"Lifetime Validity"</h4>
                            <p className="text-sm text-white/70 font-medium leading-relaxed mb-8">
                                Issued by the **Directorate General of Foreign Trade (DGFT)**, the IEC is a 10-digit PAN-based unique identification number. It is valid for a lifetime and does not require frequent renewals, though annual profile updates are mandatory for compliance.
                            </p>
                        </div>
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                <span className="text-[8px] font-black text-bid-green uppercase tracking-[0.2em] block mb-1">Status</span>
                                <span className="text-xs font-black uppercase whitespace-nowrap">DGFT Issued</span>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                <span className="text-[8px] font-black text-bid-green uppercase tracking-[0.2em] block mb-1">Validity</span>
                                <span className="text-xs font-black uppercase whitespace-nowrap">Lifetime</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Technical Benefits Grid */}
                <div className="text-center mb-12">
                    <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                        GLOBAL BUSINESS UPSIDE
                    </span>
                    <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter leading-none">
                        Strategic <br className="hidden sm:block" /><span className="text-bid-green">IEC Advantages</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {[
                        { title: "Business Expansion", desc: "Unlock gates to international markets and sell your products/services globally.", icon: Rocket },
                        { title: "Govt Incentives", desc: "Exporters can avail various benefits under DGFT schemes like export subsidies.", icon: Award },
                        { title: "Simplified Process", desc: "One-time registration with no headache of filing recurring returns (unlike GST).", icon: Zap },
                        { title: "Enhanced Credibility", desc: "Build instant trust with foreign buyers using a verified DGFT identification number.", icon: ShieldCheck },
                        { title: "Faster Clearances", desc: "Speed up the custom clearance process at ports for incoming and outgoing goods.", icon: Ship },
                        { title: "Ease of Remittance", desc: "Banks easily process foreign currency payments for entities with valid IEC.", icon: Landmark }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            {...fadeInUp}
                            className="bg-white border border-blue-50 p-8 rounded-[2.5rem] shadow-sm hover:border-bid-green/30 transition-all group"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-bid-green group-hover:text-white transition-all mb-6">
                                <item.icon size={22} />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-3">{item.title}</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Required Documents Matrix */}
                <motion.div {...fadeInUp} className="mb-24 overflow-hidden rounded-[3rem] border border-blue-100 bg-white shadow-sm">
                    <div className="bg-slate-900 p-8 text-center sm:p-10">
                        <h4 className="text-2xl font-black text-bid-green uppercase tracking-tighter">Documentation <span className="text-white">Checklist</span></h4>
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Paperwork required for DGFT application</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-blue-50 bg-slate-50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Document Category</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-blue-50">For Proprietorships / Individuals</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-blue-50">For Companies / LLPs / Firms</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-50">
                                {[
                                    { feature: "Identity Proof", ind: "Owner's PAN & Aadhaar Card", company: "Company PAN Card & Director's PAN" },
                                    { feature: "Bank Verification", ind: "Current Account Cancelled Cheque / Statement", company: "Corporate Account Cancelled Cheque (Pre-printed Name)" },
                                    { feature: "Business Proof", ind: "Shop Act / MSME / GST Certificate", company: "Certificate of Incorporation / Partnership Deed / MOA" },
                                    { feature: "Address Proof", ind: "Electricity Bill (Owned) or Rent Agreement", company: "Registered Office Rent Agreement & Electricity Bill" },
                                    { feature: "Authentication", ind: "Email ID & Mobile Number for OTP", company: "Digital Signature Certificate (DSC) & Stakeholder KYC" }
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{row.feature}</span>
                                        </td>
                                        <td className="px-8 py-6 border-l border-blue-50">
                                            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{row.ind}</p>
                                        </td>
                                        <td className="px-8 py-6 border-l border-blue-50">
                                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{row.company}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Registration Journey */}
                <div className="mb-24 px-4 overflow-hidden">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            DGFT ROADMAP
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Registration <br /><span className="text-bid-green">Lifecycle</span></h3>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "Portal Enrollment", timeline: "Hour 1", desc: "Setting up a secure login profile on the National DGFT portal with business identity and mobile/email validation." },
                                { step: "02", title: "Form ANF-2A", timeline: "Day 1", desc: "Detailed drafting of the digital application form including nature of trade (Merchandise/Service) and selection of RA." },
                                { step: "03", title: "Vault Upload", timeline: "Day 1", desc: "Uploading of pre-printed cancelled cheques, business address proof, and digitized legal entity documents." },
                                { step: "04", title: "Fee Remittance", timeline: "Immediate", desc: "Online processing of the mandatory govt registration fee via the secure central payment gateway." },
                                { step: "05", title: "Digital Signing", timeline: "Day 1", desc: "Authentication of the final application using Class 3 DSC or Aadhar EVC for legal validity." },
                                { step: "06", title: "Instant Issuance", timeline: "24-48 Hours", desc: "Review by the Regional Authority and issuance of the 10-digit PAN-linked IEC certificate in digital format." }
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

                {/* Final Professional CTA Section */}
                <motion.div
                    // @ts-ignore
                    initial={{ scale: 0.98, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-bid-green -rotate-12 translate-x-1/2 -translate-y-1/2">
                        <Rocket size={400} />
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">Global Market Ready</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Start your <span className="text-bid-green italic">International Trade Journey</span> today.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">One-time registration. Lifetime validity. Fast DGFT filing for ₹4,999/-</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Register Online
                        </Link>
                        <Link href="/contact" className="bg-white border-2 border-slate-100 text-slate-800 px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg shadow-slate-200/50 active:scale-95 flex items-center justify-center gap-2">
                            Contact Support
                        </Link>
                    </div>
                </motion.div>

            </section>
        </div>
    );
}
