'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Handshake, Eye, BarChart3, Binary, Briefcase, PlusCircle, Headset, PhoneCall, Server, Building2, Landmark as Bank, MapPin, Phone, Mail, Stethoscope, HeartPulse, GraduationCap, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PFESIRegistrationPage() {
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
                        Workforce Social Security
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        PF & ESI <span className="text-bid-green">Registration</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Mandatory social security compliance for businesses with 10+ employees. Secure your workforce's financial future and health with official EPF & ESIC portal registration.
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Employer Compliance Package</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹14,999<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Govt Fees + Professional Charges + Both PF & ESI</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Includes portal registration, UAN generation, employer code issuance, documentation support, and initial compliance guidance.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Start Registration
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Core Info Sections (PF vs ESI side-by-side card) */}
            <section className="container mx-auto px-4 max-w-7xl">

                {/* Intro Side-by-Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div
                        {...fadeInUp}
                        className="bg-white border border-blue-100 p-8 sm:p-10 rounded-[3rem] shadow-sm flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                    <Coins size={22} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Employees' <span className="text-bid-green italic">PF</span></h3>
                            </div>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">
                                The EPF is a retirement savings scheme governed by the EPF Act, 1952. It provides a secure financial future and is transferable across jobs.
                            </p>
                            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-6">
                                <h4 className="text-[10px] font-black text-bid-green uppercase tracking-widest mb-3">Contribution Split</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                                        <span>Employer Contribution</span>
                                        <span className="text-bid-green">4.75%*</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                                        <span>Employee Contribution</span>
                                        <span className="text-bid-green">1.75%*</span>
                                    </div>
                                    <div className="h-px bg-slate-200" />
                                    <div className="flex justify-between items-center text-xs font-black text-slate-900 tracking-widest uppercase">
                                        <span>Total Social Pot</span>
                                        <span>6.5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <BadgeCheck size={14} className="text-bid-green" />
                            EPF PORTAL MANAGED
                        </div>
                    </motion.div>

                    <motion.div
                        {...fadeInUp}
                        className="bg-slate-900 p-8 sm:p-10 rounded-[3rem] shadow-2xl text-white flex flex-col justify-between relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-10 -rotate-12">
                            <HeartPulse size={120} className="text-bid-green" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                    <Stethoscope size={22} />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Employees' <span className="text-bid-green italic">ESI</span></h3>
                            </div>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                                A self-supporting health insurance scheme for employees earning ₹21,000 or less. Covers medical, maternity, and disability benefits.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {[
                                    { label: "Medical Care", icon: Heart },
                                    { label: "Maternity", icon: PlusCircle },
                                    { label: "Sick Pay", icon: Clock },
                                    { label: "Ambulance", icon: Rocket }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                                        <item.icon size={12} className="text-bid-green shrink-0" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest relative z-10">
                            <BadgeCheck size={14} className="text-bid-green" />
                            ESIC CORPORATION GOVERNED
                        </div>
                    </motion.div>
                </div>

                {/* Benefits Bento Style */}
                <div className="text-center mb-12 mt-24">
                    <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                        VALUE FOR WORKFORCE
                    </span>
                    <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter leading-none">
                        Strategic <span className="text-bid-green">Benefits</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {[
                        { title: "Pension Coverage", desc: "Secure retirement with EPS contributions and long-term interest-bearing savings.", icon: Landmark },
                        { title: "Financial Shield", desc: "Protection against illness, accidents, or death with insurance-linked benefits.", icon: ShieldCheck },
                        { title: "Emergency Liquidity", desc: "Withdrawals allowed for marriage, children's education, or critical medical needs.", icon: Zap },
                        { title: "Account Portability", desc: "The Universal Account Number (UAN) stays with the employee across organizations.", icon: RefreshCw },
                        { title: "Healthcare Access", desc: "Full medical cover for employees and family members in ESI hospitals.", icon: Stethoscope },
                        { title: "Improved Morale", desc: "Social security benefits lead to better retention and increased productivity.", icon: Heart }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            {...fadeInUp}
                            className={`bg-white border border-blue-50 p-8 rounded-[2.5rem] shadow-sm hover:border-bid-green/30 transition-all group ${i % 3 === 1 ? 'md:mt-8' : ''}`}
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-bid-green group-hover:text-white transition-all mb-6 transform group-hover:-translate-y-1">
                                <item.icon size={22} />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-3">{item.title}</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mb-24 px-4 overflow-hidden">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            COMPLIANCE JOURNEY
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Registration <br /><span className="text-bid-green">Roadmap</span></h3>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "Establishment Enrollment", timeline: "Day 1", desc: "Digital registration of your business on the Unified Shram Suvidha Portal and EPF/ESIC portals." },
                                { step: "02", title: "Document Verification", timeline: "Day 2-3", desc: "Compilation of PAN, Aadhaar, Proof of Address, and employee headcount for regulatory vetting." },
                                { step: "03", title: "Digital Authorization", timeline: "Day 4", desc: "Submission of application forms (Form 1 for ESI) authorized via Digital Signature Certificate (DSC)." },
                                { step: "04", title: "Dept. Processing", timeline: "Week 1", desc: "Official verification by the PF Commissioner and ESI Regional Office to ensure business legitimacy." },
                                { step: "05", title: "Code Generation", timeline: "Final Grant", desc: "Official issuance of the PF Establishment Code and ESI Employer Code along with UAN activation." }
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

                {/* Documents & Eligibility */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <FileCheck size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Required Papers</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { icon: User, label: "PAN Card / Proprietor" },
                                { icon: Building, label: "PAN Card / Business" },
                                { icon: Fingerprint, label: "Aadhaar of Employer" },
                                { icon: Shield, label: "Digital Signature" },
                                { icon: Landmark, label: "Electricity Bill" },
                                { icon: FileText, label: "Specimen Signatures" }
                            ].map((right, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <right.icon size={14} className="text-bid-green shrink-0" />
                                    <span className="text-[9px] font-black uppercase tracking-tight text-slate-600">{right.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green font-black">
                                <Users size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Eligibility</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between items-start border-b border-blue-50 pb-4">
                                <div>
                                    <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest mb-1">Mandatory Clause</h5>
                                    <p className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">20+ Employees (PF)</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">10+ Employees (ESI)</p>
                                </div>
                                <div className="bg-bid-green/10 p-1.5 rounded-lg">
                                    <Check className="text-bid-green" size={14} strokeWidth={4} />
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest mb-1">Voluntary Clause</h5>
                                    <p className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">Registered Even Below 20</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">To enable worker benefits earlier</p>
                                </div>
                                <div className="bg-bid-green/10 p-1.5 rounded-lg">
                                    <Check className="text-bid-green" size={14} strokeWidth={4} />
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
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">Workforce Legal Guard</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Secure your <span className="text-bid-green italic">Employees' Future</span> today.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Complete PF & ESI filings professionally across all 36 States & UTs for ₹14,999/-</p>
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
                        <Link href="/contact" className="bg-slate-900 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center">
                            Talk to Expert
                        </Link>
                    </div>
                </motion.div>

            </section>
        </div>
    );
}

// Fixed missing icon imports from placeholder
function RefreshCw(props: any) {
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
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
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
