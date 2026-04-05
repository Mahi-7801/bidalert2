'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Palette, Type, Layers, Phone, Mail, Box, Shapes, Music, Share2, Landmark as Bank } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TrademarkRegistrationPage() {
    // Animation Variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    return (
        <div className="bg-[#F0F9FF] min-h-screen font-sans selection:bg-bid-green selection:text-bid-dark pb-24 border-b border-blue-100 overflow-x-hidden">
            {/* Hero Section - Light Blue Theme + Premium Green Headings */}
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
                        Intellectual Property Protection
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        Trademark <span className="text-bid-green">Registration</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Secure your brand, words, slogans, and logos with professional legal status. Our experts guide you through the Trade Marks Act, 1999 to establish absolute exclusivity in your industry.
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Brand Protection</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹10,000<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Public Search + TM-A Filing + Official Drafting</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Complete assistance for all entities — from initial availability search to certificate issuance. Includes NICE classification and handling of official queries.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Start Trademark Search
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Content Sections */}
            <section className="container mx-auto px-4 max-w-7xl">

                {/* Intro Card */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3rem] shadow-sm flex flex-col lg:flex-row gap-12 items-center mb-10"
                >
                    <div className="flex-1">
                        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
                            Overview of <span className="text-bid-green italic leading-none">Trademark</span>
                        </h3>
                        <div className="space-y-4 text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                            <p>
                                A trademark is a recognizable sign, design, or expression which identifies products or services of a particular source from those of others. It acts as a visual symbol used by a business to distinguish its goods or services.
                            </p>
                            <p>
                                Governed by the Trade Marks Act, 1999, registration is essential to protect your company's identity, prevent unauthorized use, and build a unique asset that increases in value over time.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-bid-green font-black text-[10px] uppercase tracking-widest">
                            <div className="w-12 h-px bg-bid-green/30" />
                            BRAND MONOPOLY GRANTED
                        </div>
                    </div>
                    <div className="lg:w-1/3 bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <ShieldCheck size={100} />
                        </div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-bid-green">Legal Rights</h4>
                        <p className="font-bold text-lg leading-snug mb-6">
                            "Valid for 10 years from the date of filing, renewable indefinitely every decade."
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-bid-green flex items-center justify-center font-black text-bid-dark text-[8px]">TM</div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">IPR Verified</span>
                        </div>
                    </div>
                </motion.div>

                {/* Types of Trademarks - Tabular Format */}
                <motion.div {...fadeInUp} className="mb-24 overflow-hidden rounded-[3rem] border border-blue-100 bg-white shadow-sm">
                    <div className="bg-slate-900 p-8 text-center sm:p-10">
                        <h4 className="text-2xl font-black text-bid-green uppercase tracking-tighter">Types of Trademarks <span className="text-white">Registered in India</span></h4>
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Classification under The Trade Marks Act, 1999</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-blue-50 bg-slate-50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Type of Trademark</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-blue-50">Description</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-blue-50">Example</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-50">
                                {[
                                    { icon: Box, type: "Product Mark", desc: "Used on tangible goods to identify their origin and ensure brand reputation. Typically registered under Classes 1–34.", ex: "FMCG goods, clothing, electronics" },
                                    { icon: Rocket, type: "Service Mark", desc: "Used to distinguish service-based businesses rather than physical products. Typically registered under Classes 35–45.", ex: "Legal firms, financial services, telecom" },
                                    { icon: Share2, type: "Collective Mark", desc: "Used by a group or association to represent collective standards or identity. Members use it under a code of conduct.", ex: "“CA” mark for Chartered Accountants (ICAI)" },
                                    { icon: Award, type: "Certification Mark", desc: "Indicates product quality, origin, material, or compliance with certain standards certified by the mark holder.", ex: "ISI, Agmark, FSSAI" },
                                    { icon: Shapes, type: "Shape Mark", desc: "Protects the unique shape of a product or packaging if it is inherently distinctive or widely recognized.", ex: "Coca-Cola bottle shape" },
                                    { icon: Palette, type: "Pattern Mark", desc: "Involves a specific pattern used as a distinguishing feature. Must demonstrate uniqueness and high brand recall.", ex: "Louis Vuitton checkerboard pattern" },
                                    { icon: Music, type: "Sound Mark", desc: "A distinctive sound or tune associated with a brand, capable of uniquely identifying its source.", ex: "IPL tune, Yahoo! yodel" },
                                    { icon: Globe, type: "Non-Conventional", desc: "Covers non-visual marks like smell or taste that have acquired a distinctive character in specific jurisdictions.", ex: "Smell marks (e.g. freshly cut grass for tennis balls)" }
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 bg-bid-green/10 rounded-lg flex items-center justify-center text-bid-green shrink-0">
                                                    <row.icon size={16} />
                                                </div>
                                                <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter whitespace-nowrap">{row.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 border-l border-blue-50">
                                            <p className="text-[11px] text-slate-600 font-medium leading-relaxed min-w-[300px]">{row.desc}</p>
                                        </td>
                                        <td className="px-8 py-6 border-l border-blue-50">
                                            <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-[9px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">{row.ex}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Eligibility & Documents (Bento Style) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
                    {/* Eligibility List */}
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm lg:col-span-1">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <Users size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Who Can Register?</h4>
                        </div>
                        <div className="space-y-3">
                            {[
                                "Individuals / Joint Owners",
                                "Proprietorship & Partnerships",
                                "LLPs & Private Limited Cos",
                                "Public Limited & OPCs",
                                "Foreign Companies",
                                "Trusts & Societies"
                            ].map((entity, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-1.5 h-1.5 bg-bid-green rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                    <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">{entity}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Documents Required */}
                    <motion.div {...fadeInUp} className="bg-slate-900 p-10 rounded-[3rem] text-white lg:col-span-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-bid-green -rotate-12 translate-x-1/4 -translate-y-1/4">
                            <FileText size={300} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8 text-bid-green">
                                <ClipboardList size={22} />
                                <h4 className="text-xl font-black uppercase tracking-tighter">Mandatory Documents</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h5 className="text-[10px] font-black uppercase text-white/40 tracking-widest">General Docs</h5>
                                    {[
                                        "Image of Logo/Trademark",
                                        "Signed Power of Attorney",
                                        "User Affidavit (for prior usage)",
                                        "KYC (PAN, Aadhaar of Applicant)"
                                    ].map((doc, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="bg-bid-green/20 p-1 rounded-full">
                                                <Check className="text-bid-green" size={10} strokeWidth={4} />
                                            </div>
                                            <span className="text-[11px] font-bold text-white/80">{doc}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <h5 className="text-[10px] font-black uppercase text-white/40 tracking-widest">Business Proofs</h5>
                                    {[
                                        "Company Incorporation Certificate",
                                        "Partnership Deed / Trust Deed",
                                        "Business Address Proof",
                                        "MSME / Udyam Certificate (if any)"
                                    ].map((doc, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="bg-bid-green/20 p-1 rounded-full">
                                                <Check className="text-bid-green" size={10} strokeWidth={4} />
                                            </div>
                                            <span className="text-[11px] font-bold text-white/80">{doc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Vertical Process Roadmap with Timelines */}
                <div className="mb-24 px-4 overflow-hidden">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            THE REGISTRATION LIFECYCLE
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Workflow & <br /><span className="text-bid-green">Timelines</span></h3>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "Trademark Filing", timeline: "Initial Filing", desc: "Submit Form TM-A after comprehensive availability search. Receive allotment number instantly." },
                                { step: "02", title: "Vienna Codification", timeline: "3-5 Working Days", desc: "Classification of logo/figurative elements based on international standards (Vienna 1973)." },
                                { step: "03", title: "Registry Examination", timeline: "3-4 Months", desc: "Formal review by a Trademark Officer for conflicts. Handling absolute or relative refusal grounds." },
                                { step: "04", title: "Objection Response", timeline: "Within 30 Days", desc: "Mandatory response window if examiner raises objections. Clear evidence of 'Uniqueness' is required." },
                                { step: "05", title: "Trademark Hearing", timeline: "1-2 Months Post-Objection", desc: "Formal hearing if objections aren't resolved through documentation. Attorneys present your case." },
                                { step: "06", title: "Journal Publication", timeline: "3-6 Months", desc: "Published in the global Trademark Journal for public notice. Open for third-party opposition." },
                                { step: "07", title: "Opposition Period", timeline: "90-120 Days Window", desc: "Allowing other brand owners to resist the application if they believe it causes them damage." },
                                { step: "08", title: "Certificate Grant", timeline: "6-12 Months (Final)", desc: "Issuance of the R certificate if no opposition. Valid for 10 years from the date of initial filing." }
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

                {/* Benefits Bento */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
                    {[
                        { icon: Shield, title: "Exclusive Rights", desc: "Sole ownership. Stop others from illegal use under your registered classes." },
                        { icon: Heart, title: "Goodwill & Trust", desc: "Establishes permanent customer loyalty through known quality indicators." },
                        { icon: Rocket, title: "Differentiation", desc: "Acts as an efficient commercial tool to commute your vision and unique identity." },
                        { icon: TrendingUp, title: "Asset Value", desc: "Trademarks are intangible assets that can be sold, licensed, or franchised." },
                        { icon: BadgeCheck, title: "R Symbol Authority", desc: "Legal proof of ownership. Enables direct legal action against infringers." },
                        { icon: Globe, title: "Global Protection", desc: "Provides basis for international registration under Madrid Protocol." }
                    ].map((adv, i) => (
                        <motion.div key={i} {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green mb-6">
                                <adv.icon size={22} />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-3">{adv.title}</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{adv.desc}</p>
                        </motion.div>
                    ))}
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
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">BRAND IP GUARD</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Secure your <span className="text-bid-green italic">Brand Identity</span> for 10 years.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Protected by the Trade Marks Act, 1999. Full professional assistance for ₹10,000/-</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Claim My Trademark
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
