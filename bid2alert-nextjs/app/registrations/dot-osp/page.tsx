'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Handshake, Eye, BarChart3, Binary, Briefcase, PlusCircle, Headset, PhoneCall, Server, Building2, Landmark as Bank, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DOTOSPLicensePage() {
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

                {/* @ts-ignore */}
                <motion.div
                    // @ts-ignore
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-4 relative z-10 text-center"
                >
                    {/* @ts-ignore */}
                    <motion.span
                        // @ts-ignore
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black mb-6 border border-bid-green/30 inline-block uppercase tracking-[0.2em]"
                    >
                        Telecom Regulatory Compliance
                    </motion.span>
                    {/* @ts-ignore */}
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        DOT OSP <span className="text-bid-green">License</span>
                    </motion.h1>
                    {/* @ts-ignore */}
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Mandatory registration for Call Centers, BPOs, and E-commerce entities using telecom resources. Get your 20-year legal authorization from the Department of Telecommunications.
                    </motion.p>
                </motion.div>
            </section>

            {/* Pricing Strip - Premium Consistent Theme */}
            <section className="container mx-auto px-4 -mt-20 sm:-mt-28 relative z-30 mb-24">
                {/* @ts-ignore */}
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Telecom Package</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹29,999<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Govt Fees + Professional Charges + 20 Year Validity</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Includes DOT portal registration, MOA/AOA verification, processing of Board Resolutions, and coordination with Telecom authorities for seamless issuance.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Start Registration
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Core Info Sections (12A vs 80G style intro) */}
            <section className="container mx-auto px-4 max-w-7xl">

                {/* Intro Card */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3.5rem] shadow-sm flex flex-col lg:flex-row gap-12 items-center mb-10"
                >
                    <div className="flex-1">
                        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
                            What is <span className="text-bid-green italic leading-none">OSP License?</span>
                        </h3>
                        <div className="space-y-4 text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                            <p>
                                DOT refers to the Department of Telecommunication and OSP refers to **Other Service Providers**. Under the New Telecom Policy (NTP) 1999, it is compulsory for entities providing IT-enabled services using telecom resources to obtain this registration.
                            </p>
                            <p>
                                Whether you are starting a call center, an e-commerce platform, or a tele-medicine hub, OSP registration ensures you are legally authorized to use Integrated Services Digital Network (ISDN) and other telecom bandwidth from authorized providers.
                            </p>
                        </div>
                        <div className="mt-8 mb-6 flex items-center gap-4 text-bid-green font-black text-[10px] uppercase tracking-widest">
                            <div className="w-12 h-px bg-bid-green/30" />
                            NTP 1999 COMPLIANCE
                        </div>
                    </div>
                    <div className="lg:w-1/3 bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <Server size={100} />
                        </div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-bid-green">CORE ELIGIBILITY</h4>
                        <p className="font-bold text-lg leading-snug mb-6">
                            "To obtain OSP Registration in India, the entity MUST be incorporated as a Private Limited Company."
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-bid-green flex items-center justify-center font-black text-bid-dark text-[10px] shadow-lg">Pvt</div>
                            <span className="text-[11px] font-black uppercase tracking-widest opacity-60 italic">Mandatory Structure</span>
                        </div>
                    </div>
                </motion.div>

                {/* Registration Applicability - Bento Grid */}
                <div className="mb-24 mt-24">
                    <div className="text-center mb-12">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            LICENSE SCOPE
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Registration <span className="text-bid-green">Applicability</span></h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Call Centers", desc: "Compulsory for all domestic and international BPO operations.", icon: Headset },
                            { title: "Tele-Banking", desc: "Required for financial institutions offering services via telecom links.", icon: Bank },
                            { title: "E-Commerce", desc: "Mandatory for platform-based businesses handling massive data traffic.", icon: Globe },
                            { title: "Tele-Medicine", desc: "Necessary for healthcare providers offering remote medical consultations.", icon: Heart },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                className="bg-white border border-blue-50 p-8 rounded-[2.5rem] shadow-sm hover:border-bid-green/30 transition-all group"
                            >
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-bid-green group-hover:text-white transition-all mb-6">
                                    <item.icon size={22} />
                                </div>
                                <h5 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">{item.title}</h5>
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed lowercase first-letter:uppercase">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Procedure Roadmap - Vertical Alternate */}
                <div className="mb-24 px-4 overflow-hidden bg-white border border-blue-100 p-12 sm:p-20 rounded-[4rem] shadow-sm">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            1-3 MONTHS PROCESSING
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Filing <br /><span className="text-bid-green">Roadmap</span></h3>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "Company Incorporation", timeline: "Initial Phase", desc: "Ensuring your business is a Private Limited entity with appropriate MOA/AOA clauses specifically for telecom services." },
                                { step: "02", title: "Document Vetting", timeline: "Week 1", desc: "Compilation of Shareholding patterns, Director details, and address proofs via Form INC-22 for regulatory submission." },
                                { step: "03", title: "Online Submission", timeline: "Week 2", desc: "Authorized Power of Attorney filing on the Saral Sanchar DOT portal for OSP registration and tracking." },
                                { step: "04", title: "Dept. Coordination", timeline: "Week 3-6", desc: "Liaising with the Telecom Commission for terms and conditions compliance verification and addressing technical queries." },
                                { step: "05", title: "License Issuance", timeline: "Final Grant", desc: "Receipt of the OSP Registration certificate, typically valid for a period of 20 years with annual compliance requirements." }
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

                {/* Documents & Compliance (Side-by-side) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3.5rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <FileCheck size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Required Dossier</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { icon: Building, label: "COI of Pvt Ltd Company" },
                                { icon: FileText, label: "MOA & AOA (Telecom)" },
                                { icon: Scale, label: "Board Resolution Copy" },
                                { icon: Users, label: "List of Directors & Shares" },
                                { icon: MapPin, label: "Address Proof (INC-22)" },
                                { icon: Fingerprint, label: "Director KYC Details" }
                            ].map((right, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <right.icon size={14} className="text-bid-green shrink-0" />
                                    <span className="text-[9px] font-black uppercase tracking-tight text-slate-600">{right.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-10 -rotate-12 translate-x-1/2 -translate-y-1/2 group-hover:rotate-0 transition-transform duration-700">
                            <Shield size={200} className="text-bid-green" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-bid-green/20 rounded-2xl flex items-center justify-center text-bid-green">
                                    <Check className="text-bid-green" size={22} strokeWidth={4} />
                                </div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tighter">Ongoing Compliance</h4>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest mb-1">Annual Returns</h5>
                                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Mandatory submission to DOT within 6 months of FY end stating activity status.</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest mb-1">Consent Validity</h5>
                                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Approval is normally substantial for 20 years, provided annual compliances are met.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Benefits / IT Enabled Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto mt-24">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3.5rem] shadow-sm group">
                        <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green mb-6 group-hover:bg-bid-green group-hover:text-white transition-all">
                            <Zap size={22} />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">Telecom Resource Access</h4>
                        <div className="space-y-4 text-xs text-slate-500 font-medium leading-relaxed">
                            <p>An OSP License permits your business to legally utilize **Public Land Mobile Networks** and telecom bandwidth from authorized service providers specifically for call center and IT operations.</p>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-black text-bid-green uppercase mb-2">Technical Authority</h5>
                                <p className="text-[10px] uppercase tracking-widest opacity-70 leading-relaxed font-bold italic">Legally separates your business from switched telephony violations, ensuring your BPO operates within NTP 1999 guidelines.</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3.5rem] shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-bid-green -rotate-12 group-hover:rotate-0 transition-all">
                            <PhoneCall size={100} />
                        </div>
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-bid-green mb-6 group-hover:bg-bid-green group-hover:text-white transition-all">
                            <TrendingUp size={22} />
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-tighter mb-4 text-slate-900">Commercial Scalability</h4>
                        <div className="space-y-4">
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Establish a professional identity recognized by major telecom gateways. OSP registration is often a prerequisite for international BPO contracts and cross-border tele-trading.
                            </p>
                            <div className="bg-bid-green/5 p-4 rounded-xl border border-bid-green/20">
                                <span className="text-[9px] font-black uppercase tracking-widest text-bid-green">NATIONWIDE SERVICE</span>
                                <p className="text-[11px] font-bold text-slate-700 mt-1 uppercase">Bidalert handles DOT filings across all 36 States & UTs with expert liaison support.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Final Professional CTA Section */}
                {/* @ts-ignore */}
                <motion.div
                    // @ts-ignore
                    initial={{ scale: 0.98, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[4rem] shadow-sm flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-bid-green -rotate-12 translate-x-1/2 -translate-y-1/2">
                        <Rocket size={400} />
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">Enterprise Telecom Authorized</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Launch your <span className="text-bid-green italic text-3xl sm:text-5xl">BPO Operations</span> legally today.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">DOT OSP License starting for ₹29,999/- with 20 year validity and full compliance support.</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Get Registered
                        </Link>
                        <Link href="/contact" className="bg-slate-900 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center">
                            Consult Expert
                        </Link>
                    </div>
                </motion.div>

            </section>
        </div>
    );
}


