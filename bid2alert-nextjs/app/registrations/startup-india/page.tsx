'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Coins, Briefcase, Share2, Phone, Mail, Layout, Database, Code, ShieldAlert, GraduationCap, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StartupIndiaRegistrationPage() {
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
                        National Startup Initiative
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        Startup India <span className="text-bid-green">Recognition</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Achieve formal acknowledgement from the DPIIT. Unlock ₹80 IAC tax exemptions, seed funding up to ₹50 Lakhs, and 80% rebates on patent filings to scale your innovation globally.
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
                            <span className="text-[10px] font-black uppercase tracking-widest">DPIIT Recognition Package</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹4,999<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">NSWS Setup + Innovation Write-up + DPIIT Certificate</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Includes complete profile setup on the National Single Window System, drafting of technical innovation essays, and facilitation of the Recognition Certificate.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Get Recognized
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Core Info Sections */}
            <section className="container mx-auto px-4 max-w-7xl">

                {/* Eligibility & Recognition Bento */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
                    {/* Left Side: Eligibility Cards (Bento style) */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-8 rounded-[2.5rem] shadow-sm hover:border-bid-green/30 transition-all group relative overflow-hidden">
                            <div className="absolute -right-2 -bottom-2 opacity-[0.03] text-slate-900 group-hover:text-bid-green transition-all pointer-events-none">
                                <Timer size={80} />
                            </div>
                            <div className="w-10 h-10 bg-bid-green/10 rounded-xl flex items-center justify-center text-bid-green mb-4 group-hover:bg-bid-green group-hover:text-white transition-all">
                                <Timer size={20} />
                            </div>
                            <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest mb-1">Entity Age</h5>
                            <p className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">Under 10 Years</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">From the date of incorporation or registration.</p>
                        </motion.div>

                        <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-8 rounded-[2.5rem] shadow-sm hover:border-bid-green/30 transition-all group relative overflow-hidden">
                            <div className="absolute -right-2 -bottom-2 opacity-[0.03] text-slate-900 group-hover:text-bid-green transition-all pointer-events-none">
                                <Building size={80} />
                            </div>
                            <div className="w-10 h-10 bg-bid-green/10 rounded-xl flex items-center justify-center text-bid-green mb-4 group-hover:bg-bid-green group-hover:text-white transition-all">
                                <Building size={20} />
                            </div>
                            <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest mb-1">Structure</h5>
                            <p className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">PVT / LLP / FIRM</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Must be a registered legal entity (not a split-off).</p>
                        </motion.div>

                        <motion.div {...fadeInUp} className="md:col-span-2 bg-white border border-blue-100 p-8 rounded-[2.5rem] shadow-sm hover:border-bid-green/30 transition-all group relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-bid-green/10 rounded-xl flex items-center justify-center text-bid-green group-hover:bg-bid-green group-hover:text-white transition-all">
                                        <TrendingUp size={20} />
                                    </div>
                                    <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest">Growth & Turnover</h5>
                                </div>
                                <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">Max <span className="text-bid-green">₹100 Crore</span></p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Startups must not have exceeded this turnover in any financial year since incorporation.</p>
                            </div>
                            <div className="w-px h-full bg-blue-50 hidden md:block" />
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-bid-green/10 rounded-xl flex items-center justify-center text-bid-green group-hover:bg-bid-green group-hover:text-white transition-all">
                                        <Lightbulb size={20} />
                                    </div>
                                    <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest">Innovation Scope</h5>
                                </div>
                                <p className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">Scalable Model</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Focus on innovation, development or improvement of products or scalable employment.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Recognition Card */}
                    <motion.div {...fadeInUp} className="lg:col-span-5 bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-bid-green -rotate-12 translate-x-1/4 -translate-y-1/4 group-hover:rotate-0 transition-all duration-700">
                            <Rocket size={400} />
                        </div>
                        <div className="relative z-10">
                            <motion.span
                                // @ts-ignore
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-block bg-bid-green/20 text-bid-green px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 border border-bid-green/30"
                            >
                                DPIIT RECOGNITION
                            </motion.span>
                            <h4 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-6 leading-none italic">
                                "Innovation <br /> <span className="text-bid-green">at Core"</span>
                            </h4>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10 max-w-sm">
                                Recognized startups receive formal acknowledgement from the **DPIIT**, enhancing market credibility and unlocking sovereign incentives across the ecosystem.
                            </p>
                        </div>
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <div className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:border-bid-green/50 transition-colors">
                                <span className="text-[8px] font-black text-bid-green uppercase tracking-[0.2em] block mb-2">Verification</span>
                                <span className="text-xs font-black uppercase whitespace-nowrap">Govt Approved</span>
                            </div>
                            <div className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:border-bid-green/50 transition-colors">
                                <span className="text-[8px] font-black text-bid-green uppercase tracking-[0.2em] block mb-2">Impact</span>
                                <span className="text-xs font-black uppercase whitespace-nowrap">Nationwide</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Major Advantages Bento */}
                <div className="text-center mb-12">
                    <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                        STARTUP POWER-UPS
                    </span>
                    <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter leading-none">
                        Strategic & <span className="text-bid-green">Financial Benefits</span>
                    </h3>
                </div>

                <motion.div {...fadeInUp} className="mb-24 overflow-hidden rounded-[3rem] border border-blue-100 bg-white shadow-sm">
                    <div className="bg-slate-900 p-8 text-center sm:p-10">
                        <h4 className="text-2xl font-black text-bid-green uppercase tracking-tighter">Strategic & <span className="text-white">Financial Benefits Matrix</span></h4>
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Powering Indian Startups with Government Support</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-blue-50 bg-slate-50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Benefit Category</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-blue-50">Impact & Details</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-blue-50 text-center">Reference</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-50">
                                {[
                                    { category: "Tax Exemption", title: "Income Tax Holiday", desc: "3-year income tax exemption under Section 80 IAC within the first 10 years.", icon: Coins, ref: "Section 80 IAC" },
                                    { category: "Fundraising", title: "Seed Fund Access", desc: "Eligible for grants of ₹20 Lakhs or loans up to ₹50 Lakhs for growth and scaling.", icon: Landmark, ref: "SISFS Scheme" },
                                    { category: "Govt Tenders", title: "EMD Exemption", desc: "Exemption from paying 10% Earnest Money Deposit or security deposits in govt tenders.", icon: Award, ref: "Public Procurement" },
                                    { category: "Intellectual Property", title: "Patent Fee Rebate", desc: "80% discount on patent filing fees and expedited examination for faster protection.", icon: ShieldCheck, ref: "SIPP Program" },
                                    { category: "Digital Growth", title: "Cloud & SaaS Credits", desc: "Free AWS Cloud credits and one year of free Zoho productivity suite for recognized units.", icon: Database, ref: "Startup Deals" },
                                    { category: "Self-Compliance", title: "Regulatory Relief", desc: "Self-certification for labor and environmental laws to reduce regulatory burdens.", icon: FileCheck, ref: "Self-Certification" },
                                    { category: "Exit Strategy", title: "Fast-Track Exit", desc: "Easier winding-up procedures for startups under the Insolvency and Bankruptcy Code.", icon: Gavel, ref: "IBC 2016" },
                                    { category: "IPR Support", title: "Facilitation Support", desc: "Government covers all facilitator fees for filing patents and trademarks globally.", icon: Scale, ref: "DPIIT Support" },
                                    { category: "Community", title: "Networking Hub", desc: "Direct access to international meetups, mentorship events, and government stakeholders.", icon: Share2, ref: "Startup Hub" }
                                ].map((item, i) => (
                                    <tr key={i} className="hover:bg-blue-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-bid-green group-hover:text-white transition-all">
                                                    <item.icon size={18} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-bid-green uppercase tracking-widest mb-0.5">{item.category}</span>
                                                    <span className="text-[13px] font-black text-slate-900 uppercase tracking-tighter">{item.title}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 border-l border-blue-50">
                                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-md">{item.desc}</p>
                                        </td>
                                        <td className="px-8 py-6 border-l border-blue-50 text-center">
                                            <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:bg-bid-green/10 group-hover:text-bid-green transition-colors">
                                                {item.ref}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Documents & Process */}
                <div className="mb-24">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            THE REGISTRATION JOURNEY
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Workflow & <br /><span className="text-bid-green">Process</span></h3>
                    </div>

                    <div className="relative max-w-7xl mx-auto">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "NSWS Enrollment", timeline: "Day 1", desc: "Registering profile on the National Single Window System portal to initiate the central application." },
                                { step: "02", title: "Class 3 DSC", timeline: "Day 1-2", desc: "Verifying PAN and Company details using a secure Organizational Class 3 Digital Signature Certificate." },
                                { step: "03", title: "Profile Completion", timeline: "Day 2-3", desc: "Inputting detailed info about innovation, scalability potential, and employment generation capabilities." },
                                { step: "04", title: "Vault Upload", timeline: "Day 3", desc: "Uploading technical write-ups, pitch decks, and constitutional documents like MOA/AOA to the portal." },
                                { step: "05", title: "Self-Certification", timeline: "Immediate", desc: "Formally confirming adherence to all DPIIT eligibility norms and absence of prior split-off status." },
                                { step: "06", title: "DPIIT Review", timeline: "5-10 Days", desc: "Vetting by the Department experts and final issuance of the Recognition ID and Startup Certificate." }
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

                {/* Mandatory Documents Bento */}
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
                                "Certificate of Incorporation",
                                "MOA and AOA (for Companies)",
                                "Partnership Deed (for Firms)",
                                "Organizational Class 3 DSC",
                                "Detailed Business Description",
                                "Letter of Authorization",
                                "Director/Partner e-KYC"
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
                            <Cpu size={300} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4 text-bid-green">
                                <Award size={22} />
                                <h4 className="text-xl font-black uppercase tracking-tighter">Expert Support</h4>
                            </div>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                                We handle the entire NSFWS portal complexity and technical write-ups to ensure your application is recognized by the DPIIT on the first attempt without objections.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="text-[9px] font-black text-bid-green uppercase tracking-widest block mb-1">Consultation</span>
                                    <span className="text-xs font-black uppercase tracking-tighter text-white">Free Initial Vetting</span>
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
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">STARTUP EXCLUSIVE</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Fast-track your <span className="text-bid-green italic">DPIIT Recognition</span> certificate.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Unlock 10 years of tax and public procurement benefits for ₹4,999/-</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Apply for Recognition
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
