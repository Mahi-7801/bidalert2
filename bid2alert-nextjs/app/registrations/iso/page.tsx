'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Handshake, Eye, BarChart3, Binary, Briefcase, Boxes, Box, Phone, Mail, Layout, Database, Code, ShieldAlert, GraduationCap, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ISOCertificationPage() {
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
                        Quality Management Excellence
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        ISO <span className="text-bid-green">Certification</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Achieve global operational standards. ISO is an internationally recognized accreditation certifying your business's quality, efficiency, safety, and reliability across 160+ countries.
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Global Credibility Package</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹13,999<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accredited Registrar Fees + Audit Coordination + Documentation</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Full assistance for IAF or Non-IAF certifications. Includes document readiness check, audit complexity assessment, and 3-year validity maintenance.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Start ISO Audit
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Core Info Sections */}
            <section className="container mx-auto px-4 max-w-7xl">

                {/* ISO Standards Grid */}
                <div className="text-center mb-12">
                    <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                        GLOBAL COMPLIANCE
                    </span>
                    <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Standards <span className="text-bid-green">Available</span></h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24">
                    {[
                        { id: "9001", title: "Quality Management", desc: "QMS: Enhances efficiency and customer trust." },
                        { id: "14001", title: "Environmental", desc: "EMS: Focus on sustainable operations." },
                        { id: "27001", title: "Information Security", desc: "ISMS: Protecting data and IP assets." },
                        { id: "45001", title: "Occupational Safety", desc: "OHS: Ensuring workplace health & safety." },
                        { id: "22000", title: "Food Safety", desc: "FSMS: Vital for food chain industries." },
                        { id: "50001", title: "Energy Management", desc: "EnMS: Efficiency in energy consumption." },
                        { id: "37001", title: "Anti-Bribery", desc: "Ethical business conduct standards." },
                        { id: "31000", title: "Risk Management", desc: "Systematic identification of business risks." },
                        { id: "22301", title: "Business Continuity", desc: "Resilience against system disruptions." },
                        { id: "20000", title: "IT Service", desc: "ITSM: Standardizing IT deliverables." },
                        { id: "21001", title: "Educational Ops", desc: "Quality in education management." },
                        { id: "13485", title: "Medical Devices", desc: "Safety for medical equipment mfg." }
                    ].map((item, i) => (
                        <motion.div key={i} {...fadeInUp} className="bg-white border border-blue-100 p-6 rounded-[2.5rem] shadow-sm hover:border-bid-green/30 transition-all group">
                            <div className="w-10 h-10 bg-bid-green/10 rounded-xl flex items-center justify-center text-bid-green mb-4 group-hover:bg-bid-green group-hover:text-white transition-all font-black text-[10px]">
                                {item.id}
                            </div>
                            <h5 className="text-[12px] font-black text-slate-900 uppercase tracking-tighter mb-2">{item.title}</h5>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* IAF vs Non-IAF Table */}
                <motion.div {...fadeInUp} className="mb-24 overflow-hidden rounded-[3rem] border border-blue-100 bg-white shadow-sm">
                    <div className="bg-slate-900 p-8 text-center sm:p-10">
                        <h4 className="text-2xl font-black text-bid-green uppercase tracking-tighter">Accreditation <span className="text-white">Matrix</span></h4>
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Choosing the right certification path</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-blue-50 bg-slate-50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Feature</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-blue-50">IAF ISO Certificate</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-blue-50">Non-IAF ISO Certificate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-50">
                                {[
                                    { feature: "Recognition", iaf: "Global - Accepted by all MNCs & Govts", niaf: "Local - Suitable for internal branding" },
                                    { feature: "Cost Aspect", iaf: "Premium - Higher due to audit rigor", niaf: "Economical - Best for small budgets" },
                                    { feature: "Assurance", iaf: "High - Stringent accreditation norms", niaf: "Standard - Internal process focus" },
                                    { feature: "Market Edge", iaf: "Superior - Preferred in PSU tenders", niaf: "Moderate - Acceptable in local markets" },
                                    { feature: "Best For", iaf: "International trade & High-regulated ops", niaf: "SMBs focused on process improvement" }
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter whitespace-nowrap">{row.feature}</span>
                                        </td>
                                        <td className="px-8 py-6 border-l border-blue-50">
                                            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{row.iaf}</p>
                                        </td>
                                        <td className="px-8 py-6 border-l border-blue-50">
                                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">{row.niaf}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Benefits & Validity (Horizontal Bento) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green font-black">
                                <Award size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Strategic Benefits</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                            {[
                                "Enhanced Credibility",
                                "Operational Efficiency",
                                "Global Market Access",
                                "Regulatory Compliance",
                                "Stakeholder Trust",
                                "Reduced Operational Waste",
                                "Tender Eligibility"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 items-center group">
                                    <div className="bg-bid-green/10 p-1 rounded-lg shrink-0">
                                        <Check className="text-bid-green font-black" size={12} strokeWidth={4} />
                                    </div>
                                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-tight">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-bid-green -rotate-12 translate-x-1/4 -translate-y-1/4">
                            <Clock size={300} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-xl font-black text-bid-green uppercase tracking-tighter mb-4">Validity & Renewal</h4>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6 italic">
                                ISO certificates are typically valid for **3 years**, subject to annual surveillance audits.
                            </p>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                <p className="text-[11px] font-bold text-white uppercase tracking-widest leading-relaxed">
                                    Recertification ensures your organization continues to meet global standards and demonstrates ongoing improvement to stakeholders.
                                </p>
                            </div>
                        </div>
                        <div className="relative z-10 flex items-center gap-4 mt-8">
                            <div className="w-10 h-10 rounded-full bg-bid-green flex items-center justify-center font-black text-bid-dark text-xs">3Y</div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Triennial Recertification</span>
                        </div>
                    </motion.div>
                </div>

                {/* Audit Lifecycle */}
                <div className="mb-24 px-4 overflow-hidden">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            CERTIFICATION JOURNEY
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Certification <br /><span className="text-bid-green">Lifecycle</span></h3>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "Gap Analysis", timeline: "Week 1", desc: "Expert assessment of your current processes versus chosen ISO standards to identify operational deficiencies." },
                                { step: "02", title: "Documentation", timeline: "Week 2-3", desc: "Preparing the Quality Management System (QMS) manual, SOPs, and required policy documents for compliance." },
                                { step: "03", title: "Internal Audit", timeline: "Week 4", desc: "Initial verification by our experts to ensure readiness for the final audit and verify implementation of new controls." },
                                { step: "04", title: "External Audit", timeline: "Week 5-6", desc: "Final evaluation by the authorized Certification Body (Registrar) to validate adherence to international standards." },
                                { step: "05", title: "Non-Conformance", timeline: "Resolution Phase", desc: "Resolving any gaps identified by the auditor within stipulated timelines to meet certification requirements." },
                                { step: "06", title: "Certificate Issuance", timeline: "Final Grant", desc: "Final grant of accreditation and delivery of the official physical copy with the global ISO certification mark." }
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

                {/* Requirements Checklist Card */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm max-w-5xl mx-auto mb-24"
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                            <ClipboardList size={22} />
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Mandatory Paperwork</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
                        {[
                            { icon: User, label: "Signatory Pan & Aadhaar" },
                            { icon: Briefcase, label: "Brief Company Profile" },
                            { icon: Landmark, label: "Business Visiting Card" },
                            { icon: Layout, label: "Official Letterhead" },
                            { icon: FileCheck, label: "Latest Sales/Purchase Invoice" },
                            { icon: Building, label: "GST or COI Certificate" }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-bid-green/30 transition-all">
                                <item.icon size={16} className="text-bid-green shrink-0" />
                                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{item.label}</span>
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
                    className="mt-16 bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-bid-green -rotate-12 translate-x-1/2 -translate-y-1/2">
                        <Rocket size={400} />
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">GLOBAL OPERATIONAL ELITE</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Apply for <span className="text-bid-green italic">Trusted ISO</span> Certification.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Boost your operational credibility and tender eligibility with accredited ISO auditing. Full lifecycle support for ₹13,999/-</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Start Enrollment
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

// Icon fallbacks if needed
function Activity(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    );
}

function User(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
