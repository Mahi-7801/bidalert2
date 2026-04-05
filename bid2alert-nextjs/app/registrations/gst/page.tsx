'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Phone, Mail, Layout, Database, Code, ShieldAlert, GraduationCap, Lightbulb, Coins, Briefcase, User, Users2, Binary } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GSTRegistrationPage() {
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
                        Official Tax Compliance
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        GST <span className="text-bid-green">Registration</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Fast, compliant, and hassle-free GST onboarding. Simplify your indirect tax structure and unlock Input Tax Credit (ITC) with official registration in 2 to 6 working days.
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Growth Compliance Package</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹1,999<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">TRN/ARN Generation + DSC Validation + Expert Filing</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Complete end-to-end application on the GST Portal. Includes HSN/SAC code identification, bank account linkage, and documentation support for all business types.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Start Registration
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Core Info Sections */}
            <section className="container mx-auto px-4 max-w-7xl">

                {/* Turnover Thresholds Grid */}
                <div className="text-center mb-12">
                    <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                        COMPLIANCE TRIGGERS
                    </span>
                    <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Turnover <span className="text-bid-green">Thresholds</span></h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {[
                        { title: "Service Providers", limit: "₹20 Lakhs", desc: "Mandatory for services exceeding this annual limit." },
                        { title: "Goods Suppliers", limit: "₹40 Lakhs", desc: "Mandatory for businesses supplying only physical goods." },
                        { title: "Special States", limit: "₹10/20 Lakhs", desc: "Lower thresholds for North-Eastern and Hilly states." },
                        { title: "Inter-State", limit: "Mandatory", desc: "Required for any supply crossing state borders, regardless of turnover." }
                    ].map((item, i) => (
                        <motion.div key={i} {...fadeInUp} className="bg-white border border-blue-100 p-8 rounded-[2.5rem] shadow-sm hover:border-bid-green/30 transition-all group">
                            <div className="text-bid-green font-black text-[10px] uppercase tracking-widest mb-2 opacity-60">{item.title}</div>
                            <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">{item.limit}</h4>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits Matrix (Table) */}
                <motion.div {...fadeInUp} className="mb-24 overflow-hidden rounded-[3rem] border border-blue-100 bg-white shadow-sm">
                    <div className="bg-slate-900 p-8 text-center sm:p-10">
                        <h4 className="text-2xl font-black text-bid-green uppercase tracking-tighter">Registration <span className="text-white">Benefits</span></h4>
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Why GSTIN is vital for your growth</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-blue-50 bg-slate-50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Benefit Type</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-blue-50">For Regular Registered Businesses</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-blue-50">For Composition Scheme Taxpayers</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-50">
                                {[
                                    { feature: "Tax Savings", regular: "Avail Input Tax Credit (ITC) on all purchases", comp: "Lower tax liability with a fixed percentage rate" },
                                    { feature: "Business Scope", regular: "Conduct inter-state trade without restrictions", comp: "Limited to intra-state operations mainly" },
                                    { feature: "Compliance", regular: "Detailed monthly/quarterly return filings", comp: "Reduced burden with simplified quarterly returns" },
                                    { feature: "Working Capital", regular: "Higher ITC offsets output tax liability", comp: "Minimal impact due to lower fixed tax payouts" },
                                    { feature: "Tenders & GeM", regular: "Fully eligible for all govt & public tenders", comp: "Eligible for specific intra-state limit tenders" }
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{row.feature}</span>
                                        </td>
                                        <td className="px-8 py-6 border-l border-blue-50">
                                            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{row.regular}</p>
                                        </td>
                                        <td className="px-8 py-6 border-l border-blue-50">
                                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">{row.comp}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Procedure & Workflow */}
                <div className="mb-24">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            TAX ENROLLMENT CYCLE
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Workflow & <br /><span className="text-bid-green">Procedure</span></h3>
                    </div>

                    <div className="relative max-w-7xl mx-auto">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "TRN Generation", timeline: "Hour 1", desc: "Generating a Temporary Reference Number (TRN) on the GST portal via PAN, Mobile, and Email validation." },
                                { step: "02", title: "Form Part-B", timeline: "Day 1", desc: "Detailed drafting of the business application including HSN/SAC codes, address proof, and authorized signatory values." },
                                { step: "03", title: "DSC/EVC Vetting", timeline: "Day 1", desc: "Digital verification of the application form using Class 3 DSC or Aadhar-based EVC authentication." },
                                { step: "04", title: "ARN Generation", timeline: "Immediate", desc: "Submission of the final application and issuance of the Application Reference Number (ARN) for real-time tracking." },
                                { step: "05", title: "Officer Review", timeline: "2-5 Days", desc: "Verification of documents and technical data by the Jurisdictional GST Officer. Handling of clarifications (if any)." },
                                { step: "06", title: "Grant of GSTIN", timeline: "Final Day", desc: "Official issuance of the GST Registration Certificate (Form REG-06) and generation of the unique GSTIN." }
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

                {/* Mandatory Documents Checklist */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto">
                    <motion.div
                        {...fadeInUp}
                        className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm lg:col-span-1"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <ClipboardList size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Required Docs</h4>
                        </div>
                        <div className="space-y-3">
                            {[
                                "PAN Card of the Business/Owner",
                                "Aadhar Card of Authorized Signatory",
                                "Business Address Proof (Elec. Bill)",
                                "Rent Agreement / NOC (if rented)",
                                "Bank Account Cancelled Cheque",
                                "Partnership Deed / COI",
                                "Digital Signature (Class 3)",
                                "Authorized Signatory Photo"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-1.5 h-1.5 bg-bid-green rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                    <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        {...fadeInUp}
                        className="bg-slate-900 p-10 rounded-[3rem] text-white lg:col-span-2 relative overflow-hidden flex flex-col justify-center"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-bid-green -rotate-12 translate-x-1/4 -translate-y-1/4">
                            <Binary size={300} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4 text-bid-green">
                                <ShieldCheck size={22} />
                                <h4 className="text-xl font-black uppercase tracking-tighter">Technical Accuracy</h4>
                            </div>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                                We ensure 100% compliance with GST REG-01 filing rules, avoiding common errors in HSN codes and address mapping that often lead to officer rejections.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="text-[9px] font-black text-bid-green uppercase tracking-widest block mb-1">Status Check</span>
                                    <span className="text-xs font-black uppercase tracking-tighter text-white">Application Vault</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
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
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">TAX COMPLIANT GROWTH</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Get your <span className="text-bid-green italic">GSTIN Identification</span> today.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Mandatory for high-value tenders and GeM procurement. Complete onboarding starting ₹1,999/-</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Apply Now
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
