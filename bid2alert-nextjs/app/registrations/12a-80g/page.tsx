'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Handshake, Eye, BarChart3, Binary, Briefcase, PlusCircle, HeartHandshake, Gift, Landmark as Bank, ListChecks, MapPin, Phone, Mail, Layout, Database, Code, ShieldAlert, GraduationCap, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NGOExemptionPage() {
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
                        Non-Profit Tax Compliance
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        12A & 80G <span className="text-bid-green">Registration</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Essential tax exemptions for NGOs, Trusts, and Societies. 12A allows NGOs to claim tax exemption on their earnings, while 80G offers tax deductions to donors, making it a strong incentive for contributions.
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Charitable Exemption Package</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">Starting ₹24,999<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Govt Fees Included + Professional Compliance Handling</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Includes preparation of technical write-ups, online filing for 12A & 80G, liaison with Income Tax departments, and issuance of certificates.
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

                {/* Side-by-Side (12A & 80G Definitions) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-6 text-bid-green">
                                <Shield size={24} />
                                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">12A <span className="text-bid-green italic text-3xl">Tax-Free Income</span></h3>
                            </div>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">
                                Obtained under Section 12A of the Income Tax Act, 1961. It allows NGOs to claim tax exemption on earnings from grants, donations, and other unconditional contributions.
                            </p>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
                                <h4 className="text-[10px] font-black text-bid-green uppercase tracking-widest mb-2">NGO Benefit</h4>
                                <p className="text-xs font-bold text-slate-700 leading-snug">
                                    Full tax exemption on surplus income, ensuring all funds are used for charitable and social welfare activities.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <BadgeCheck size={16} className="text-bid-green" />
                            <span className="text-[10px] font-black uppercase text-slate-400">Essential for NGO Survival</span>
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] shadow-2xl text-white flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                            <Gift size={120} className="text-bid-green" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6 text-bid-green">
                                <HeartHandshake size={24} />
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">80G <span className="text-bid-green italic text-3xl">Donor Incentive</span></h3>
                            </div>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                                Specifically designed to benefit donors. Registered donors can claim tax deductions on their contributions, significantly boosting your fundraising potential.
                            </p>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-6">
                                <h4 className="text-[10px] font-black text-bid-green uppercase tracking-widest mb-2">Fundraising Edge</h4>
                                <p className="text-xs font-bold text-slate-300 leading-snug">
                                    Incentivizes people and businesses to donate by offering immediate tax relief on their donations.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 relative z-10">
                            <BadgeCheck size={16} className="text-bid-green" />
                            <span className="text-[10px] font-black uppercase text-slate-500">Post-12A Certification</span>
                        </div>
                    </motion.div>
                </div>

                {/* Strategic Benefits Grid */}
                <div className="text-center mb-12 mt-24">
                    <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                        TRUST & SUSTAINABILITY
                    </span>
                    <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter leading-none">
                        Registration <span className="text-bid-green">Advantages</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {[
                        { title: "Tax Relief for Donors", desc: "Donors to 80G NGOs can claim tax deductions, encouraging larger and more frequent contributions.", icon: Coins },
                        { title: "Credibility & Trust", desc: "Enhanced transparency makes NGOs more trustworthy for institutional donors and corporate sponsors.", icon: ShieldCheck },
                        { title: "Fundraising Potential", desc: "Tax incentives attract more donations, helping NGOs raise funds effectively for impact-driven projects.", icon: TrendingUp },
                        { title: "Govt Grants Access", desc: "Mandatory requirement for eligibility in many government funding programs and specialized schemes.", icon: Landmark },
                        { title: "Financial Sustainability", desc: "Tax exemptions allow NGOs to allocate more funds to long-term projects and social welfare.", icon: Building },
                        { title: "Efficient Resources", desc: "With tax-free donations, every rupee can be fully utilized for charitable and social activities.", icon: Zap }
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

                {/* Vertical Process Roadmap */}
                <div className="mb-24 px-4 overflow-hidden">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            APPROVAL ROADMAP
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Workflow & <br /><span className="text-bid-green">Timelines</span></h3>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "NGO Darpan Setup", timeline: "Standard Prerequisite", desc: "Mandatory registration on the NITI Aayog's NGO Darpan portal to obtain a unique ID for all future funding." },
                                { step: "02", title: "Form 10A / 10AB", timeline: "Drafting & Filing", desc: "Detailed drafting of the application for Provisional or Regular registration under sections 12A and 80G." },
                                { step: "03", title: "Evidence Compilation", timeline: "Documentation Phase", desc: "Merging trust deeds, bye-laws, and technical activity reports demonstrating social impact and non-profit nature." },
                                { step: "04", title: "CIT Exemption Review", timeline: "3-6 Months Processing", desc: "Review by the Commissioner of Income Tax. Handling of queries regarding charitable objectives and fund utilization." },
                                { step: "05", title: "Provisional Approval", timeline: "Immediate Grant", desc: "Issuance of initial approval for 3 years to start tax-exempt operations and receive deductible donations." },
                                { step: "06", title: "Final Regularization", timeline: "After 6 Months Activity", desc: "Filing for final 5-year registration after demonstrating consistent charitable performance and compliance." }
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

                {/* Eligibility & Documents Matrix */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <Search size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Eligibility Criteria</h4>
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: "Entity Type", value: "Trust / Society / Sec-8", desc: "Registered non-profit entities only." },
                                { label: "Prerequisite", value: "Valid 12A Registration", desc: "80G cannot be granted without 12A." },
                                { label: "Objective", value: "Public Charitable Purpose", desc: "Must benefit society as a whole." },
                                { label: "Governance", value: "Transparent Records", desc: "Proper financial statements and activity proofs." }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-start border-b border-blue-50 pb-4">
                                    <div>
                                        <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest mb-1">{item.label}</h5>
                                        <p className="text-xl font-black text-slate-900 uppercase tracking-tighter">{item.value}</p>
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-400 max-w-[120px] text-right uppercase tracking-widest leading-tight">{item.desc}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <FileText size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Required Paperwork</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                "Trust Deed / Registration Cert.",
                                "MOA and Bye-laws",
                                "Annual Accounts (Last 3 Years)",
                                "Audit Reports (CA Verified)",
                                "NGO Darpan ID (if available)",
                                "FCRA Certificate (if applicable)",
                                "Governing Body PAN & Aadhaar",
                                "Detailed Note on Activities"
                            ].map((doc, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="w-1.5 h-1.5 bg-bid-green rounded-full" />
                                    <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">{doc}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Final Professional CTA Section */}
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
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">Charity Excellence Shield</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Scale your <span className="text-bid-green italic">Social Mission</span> nationwide.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Professional end-to-end support for 12A & 80G filings. Unlock tax-free donations for your NGO from ₹24,999/-</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Apply for Exemption
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

// Fixed missing icon from lucide-react
function Coins(props: any) {
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
            <circle cx="8" cy="8" r="6" />
            <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
            <path d="M7 6h1v4" />
            <path d="m16.71 13.88.7.71-2.82 2.82" />
        </svg>
    );
}
