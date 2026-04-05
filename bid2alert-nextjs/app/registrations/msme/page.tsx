'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Handshake, Eye, BarChart3, Binary, Briefcase, PlusCircle, CreditCard, User, Landmark as Bank, ListChecks, Phone, Mail, Coins, ShieldAlert, GraduationCap, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MSMERegistrationPage() {
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
                        Small Business Growth Shield
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        MSME Udyam <span className="text-bid-green">Registration</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        The official Udyam system streamlines classification for Micro, Small, and Medium Enterprises. Launched in July 2020, it offers a range of benefits to support growth and sustainability across India.
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
                            <span className="text-[10px] font-black uppercase tracking-widest">SME Growth Launchpad</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">Starting ₹1,999<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Aadhar Verification + Category Selection + Instant Certificate</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Complete paperless online registration on the official MSME portal. Includes NIC code classification, bank linkage, and turnover declaration.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Register My MSME
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Core Info Sections */}
            <section className="container mx-auto px-4 max-w-7xl">

                {/* Intro Section - Who can register */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[4rem] shadow-sm mb-10"
                >
                    <div className="mb-12">
                        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">
                            Who can register <br /><span className="text-bid-green italic">under Udyam?</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Micro", inv: "Up to ₹1 Cr", turn: "Up to ₹5 Cr", color: "bg-blue-50/50" },
                            { title: "Small", inv: "Up to ₹10 Cr", turn: "Up to ₹50 Cr", color: "bg-emerald-50/50" },
                            { title: "Medium", inv: "Up to ₹50 Cr", turn: "Up to ₹250 Cr", color: "bg-slate-900", dark: true }
                        ].map((cat, i) => (
                            <div key={i} className={`p-8 rounded-[2.5rem] border ${cat.dark ? 'bg-slate-900 border-slate-800 text-white' : `${cat.color} border-blue-100/20 text-slate-900`}`}>
                                <h4 className="text-lg font-black uppercase mb-6 text-bid-green tracking-tight">{cat.title}</h4>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="text-[9px] uppercase font-black tracking-widest opacity-40">Investment</div>
                                        <div className="text-xl font-black tracking-tight">{cat.inv}</div>
                                    </div>
                                    <div className="h-px bg-current opacity-10" />
                                    <div className="space-y-1">
                                        <div className="text-[9px] uppercase font-black tracking-widest opacity-40">Turnover</div>
                                        <div className="text-xl font-black tracking-tight">{cat.turn}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group border border-slate-800 flex flex-col justify-between">
                            <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
                                <Fingerprint size={80} />
                            </div>
                            <div>
                                <h4 className="font-black text-[9px] uppercase tracking-[0.3em] mb-6 text-bid-green">Verification</h4>
                                <p className="font-bold text-lg leading-tight mb-6">
                                    "Aadhar-based self-declaration with no paper documents required for filing."
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-bid-green flex items-center justify-center font-black text-bid-dark text-[9px] shadow-lg shadow-bid-green/20">UAM</div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Ministry of MSME</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Benefits Bento Style */}
                <div className="text-center mb-12 mt-24">
                    <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                        UDYAM ADVANTAGES
                    </span>
                    <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter leading-none">
                        Financial & <span className="text-bid-green">Growth Benefits</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {[
                        { title: "Priority Lending", desc: "No collateral loans under CGTMSE. 1% interest exemption on Overdraft loans.", icon: Bank },
                        { title: "IPR Subsidies", desc: "50% subsidy on Patent & Barcode registration. Financial aid for Trademark filing.", icon: ShieldCheck },
                        { title: "Delayed Payment Shield", desc: "Payments must be made within 45 days. Delayed payments incur 3x RBI interest rate.", icon: ShieldAlert },
                        { title: "Tax Exemptions", desc: "Exemption from direct taxes in initial years and 50-75% subsidy on ISO certifications.", icon: Coins },
                        { title: "Tender Participation", desc: "Exemption from EMD (Earnest Money Deposit) and priority in government procurement.", icon: Award },
                        { title: "Utility Discounts", desc: "Concessions on electricity bills and reimbursement of ISO certification fees.", icon: Zap },
                        { title: "Innovation Grant", desc: "Up to ₹6.25 Lakh grant per idea for commercializing new technologies and products.", icon: Lightbulb },
                        { title: "Market Growth", desc: "Financial aid for attending international exhibitions and trade expos.", icon: Globe },
                        { title: "Fast-Track Approval", desc: "59-minute loan approvals and simplified compliance regimes for small units.", icon: Rocket }
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

                {/* Requirements Checklist Card */}
                {/* Procedure & Workflow */}
                <div className="mb-24">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            UDYAM CERTIFICATION JOURNEY
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Workflow & <br /><span className="text-bid-green">Procedure</span></h3>
                    </div>

                    <div className="relative max-w-7xl mx-auto">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "Aadhar OTP Auth", timeline: "Instant", desc: "Initial validation via mobile-linked Aadhar for the authorized signatory or proprietor." },
                                { step: "02", title: "Entity Selection", timeline: "Day 1", desc: "Selection of organization type (Proprietary, Partnership, LLP, or Company) and PAN verification." },
                                { step: "03", title: "NIC Assignment", timeline: "Day 1", desc: "National Industrial Classification of all business activities to determine primary & secondary sectors." },
                                { step: "04", title: "Financial Input", timeline: "Day 1", desc: "Disclosure of Turnover & Plant/Machinery investment figures as per latest Income Tax records." },
                                { step: "05", title: "Bank Linkage", timeline: "Day 1", desc: "Integration of business account details to unlock direct benefit transfers and credit schemes." },
                                { step: "06", title: "Certificate Grant", timeline: "Instant/24H", desc: "Final verification and digital issuance of the Udyam Registration Certificate with a unique ID." }
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto">
                    <motion.div
                        {...fadeInUp}
                        className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm lg:col-span-1"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <ClipboardList size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Required Data</h4>
                        </div>
                        <div className="space-y-3">
                            {[
                                "Aadhar Card of Authorised Signatory",
                                "PAN card of the Firm/Entity",
                                "GSTIN Identification Number",
                                "Business Commencement Date",
                                "Bank Account & IFSC Code",
                                "Investment & Turnover Figures",
                                "Current Employee Count"
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
                                <Award size={22} />
                                <h4 className="text-xl font-black uppercase tracking-tighter">Priority Assistance</h4>
                            </div>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                                We ensure error-free NIC code assignment and financial disclosure to prevent certificate rejection or blocking of MSME benefits.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="text-[9px] font-black text-bid-green uppercase tracking-widest block mb-1">Status Check</span>
                                    <span className="text-xs font-black uppercase tracking-tighter text-white">Udyam Optimized</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Strategic Call to Action Section */}
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
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">SME EMPOWERMENT</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Scale your <span className="text-bid-green italic">Business Potential</span> nationwide.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Simplified, paperless registration with instant digital certification for ₹1,999/-</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Register Now
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
