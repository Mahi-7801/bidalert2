'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Cpu as Chip, FlaskConical, Settings, Lightbulb, Box, Code, Phone, Mail, XSquare, Ban, Layers, Globe2, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PatentRegistrationPage() {
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
                        Intellectual Property Monopoly
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        Patent <span className="text-bid-green">Registration</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-6 font-medium"
                    >
                        Are you looking for patent registration? Before that, you need to understand the process in detail. Our team of experts and chartered accountants will assist you in navigating this long and complicated journey.
                    </motion.p>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Governed by Patent Act 1970 & Patent Rules 1972</p>
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Global Innovation Package</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹30,000<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Full Drafting + Registry Filing + Expert Assistance</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Includes novelty search, complete specification drafting, specialized claims, filing with IPO, and 20 years of legal monopoly.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Start Patent Search
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Core Info Sections */}
            <section className="container mx-auto px-4 max-w-7xl">

                {/* Intro Card */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3rem] shadow-sm flex flex-col lg:flex-row gap-12 items-center mb-10"
                >
                    <div className="flex-1">
                        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
                            Overview of <span className="text-bid-green italic leading-none">Patent Registration</span>
                        </h3>
                        <div className="space-y-4 text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                            <p>
                                A patent is a legal right granted by the Government that allows an individual or a company to exclusively manufacture, use, sell, or import an invention for a specified period.
                            </p>
                            <p>
                                Governed by the Patents Act, 1970, it provides a legal monopoly for 20 years, after which the technical know-how falls into the public domain. Our experts handle the complex workflow ensuring your innovations are shielded legally.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-bid-green font-black text-[10px] uppercase tracking-widest">
                            <div className="w-12 h-px bg-bid-green/30" />
                            SECURE YOUR INTELLECTUAL ASSETS
                        </div>
                    </div>
                    <div className="lg:w-1/3 bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <Chip size={100} />
                        </div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-bid-green">Innovation Proof</h4>
                        <p className="font-bold text-lg leading-snug mb-6">
                            "Full legal precedence over your invention for two decades."
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-bid-green flex items-center justify-center font-black text-bid-dark text-[8px]">PAT</div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">IP Registry India</span>
                        </div>
                    </div>
                </motion.div>

                {/* Requirement for Patentability */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <Award size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Filing Criteria</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="flex flex-col border-b border-blue-50 pb-4">
                                <div className="flex justify-between items-end mb-2">
                                    <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest">Novelty</h5>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No Prior Art</span>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">The invention must never have been made, published, or used before. It must show new attributes that are not part of existing public knowledge (Prior Art).</p>
                            </div>
                            <div className="flex flex-col border-b border-blue-50 pb-4">
                                <div className="flex justify-between items-end mb-2">
                                    <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest">Inventive Step</h5>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Non-Obvious (PHOSITA)</span>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">Must be non-obvious to a 'Person Having Ordinarily Skilled in the Art'. It could not be deduced by an expert with common information in that technical field.</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-end mb-2">
                                    <h5 className="text-[10px] font-black text-bid-green uppercase tracking-widest">Industrial Application</h5>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mass Usable</span>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">The invention should be helpful and capable of being manufactured or used within an industrial process or business.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green font-black">
                                <Lightbulb size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Patentable Subject</h4>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">The creation can be any of the following:</p>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Box, label: "New Products" },
                                { icon: Settings, label: "Industrial Processes" },
                                { icon: Landmark, label: "Particular Apparatus" },
                                { icon: FlaskConical, label: "Chemicals & Drugs" },
                                { icon: Chip, label: "Technical Apps" },
                                { icon: Gavel, label: "Machines" },
                                { icon: Network, label: "Method to Manufacture" },
                                { icon: Code, label: "Computer Software" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-bid-green/30 transition-all">
                                    <item.icon size={16} className="text-bid-green lg:shrink-0" />
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                            <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase italic">
                                ⚠️ Crucial: A patent application should be filed PRIOR to any disclosure to the public. Known public use prevents registration.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Application Types Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            FILING OPTIONS
                        </span>
                        <h3 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Types of <br /><span className="text-bid-green">Patent Applications</span></h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Clock, title: "Provisional", desc: "A temporary filing for inventions under development to secure an early priority date." },
                            { icon: BadgeCheck, title: "Ordinary", desc: "A formal application filed with full specifications and claims." },
                            { icon: Share2, title: "Convention", desc: "Filed in India within 12 months of filing in a convention country to claim priority." },
                            { icon: Globe2, title: "PCT International", desc: "Enables protection in multiple countries under the Patent Cooperation Treaty (PCT)." },
                            { icon: Landmark, title: "National Phase", desc: "Filed in India after the international PCT phase for formal examination." },
                            { icon: Layers, title: "Divisional", desc: "Splitting applications containing multiple inventions into independent filings." },
                            { icon: Zap, title: "Direct Filing", desc: "Submitting complete specifications directly without any provisional application." },
                            { icon: ArrowRight, title: "Subsequent", desc: "Complete specification filed after a provisional, claiming its priority date." }
                        ].map((type, i) => (
                            <motion.div key={i} {...fadeInUp} className="bg-white border border-blue-100 p-8 rounded-[2.5rem] shadow-sm hover:border-bid-green/30 transition-all group">
                                <div className="w-10 h-10 bg-bid-green/10 rounded-xl flex items-center justify-center text-bid-green mb-4 group-hover:bg-bid-green group-hover:text-white transition-all">
                                    <type.icon size={20} />
                                </div>
                                <h5 className="text-[13px] font-black text-slate-900 uppercase tracking-tighter mb-2">{type.title}</h5>
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{type.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Non-Patentable Inventions */}
                <motion.div {...fadeInUp} className="bg-slate-900 p-10 rounded-[3rem] text-white mb-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-bid-green -rotate-12 translate-x-1/4 -translate-y-1/4">
                        <Ban size={300} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                            <div>
                                <div className="flex items-center gap-4 mb-2 text-bid-green">
                                    <XSquare size={22} />
                                    <h4 className="text-xl font-black uppercase tracking-tighter">What Cannot Be Patented?</h4>
                                </div>
                                <p className="text-xs text-white/60 font-medium">Certain inventions are expressly excluded under Sections 3 and 4 of the Indian Patents Act.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                            {[
                                "Inventions Contrary to Natural Laws",
                                "Harmful to Life or Environment",
                                "Scientific Principles or Abstract Theories",
                                "Discovery of Natural Substances",
                                "Known Processes without Syrian Improvement",
                                "Mere Admixtures without Synergistic Props",
                                "Agricultural or Horticultural Methods",
                                "Mathematical Methods or Algorithms",
                                "Literary, Musical, or Artistic Works",
                                "Methods of Playing Games",
                                "Mere Presentation of Information",
                                "Aggregation of Known Properties"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-bid-green rounded-full" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Procedure Roadmap - Vertical Alternate */}
                <div className="mb-24 px-4 overflow-hidden">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            PORTAL PROCEDURE
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Registration <br /><span className="text-bid-green">Procedure</span></h3>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "Patentability Search", timeline: "Initial Action", desc: "Verifying the novelty of your idea among existing inventions. Saves you from filing for a non-patentable thought." },
                                { step: "02", title: "Patent Drafting", timeline: "Week 1-2", desc: "Preparing complete specifications and claims (Form 2). This defines the legal boundary of your invention." },
                                { step: "03", title: "Application Filing", timeline: "Week 3", desc: "Filing Form 1 with applicant details, Form 3 for foreign apps, and Form 5 for inventorship declaration." },
                                { step: "04", title: "Publication", timeline: "18 Months (Standard)", desc: "Official publication in the journal. You can file Form 9 for early publication to expedite the process." },
                                { step: "05", title: "Request for Examination", timeline: "Within 48 Months", desc: "Filing Form 18 (RFE) within 48 months to initiate substantive technical merit examination." },
                                { step: "06", title: "Examination Report", timeline: "3-6 Months Post-RFE", desc: "Review by the officer. Objections must be responded to with office action responses within timelines." },
                                { step: "07", title: "Controller Hearing", timeline: "1-2 Months Post-FER", desc: "Formal hearing to address persistent objections and prove the technical advancement of the invention." },
                                { step: "08", title: "Grant of Patent", timeline: "Final Approval", desc: "Approved status updated. Issuance of legal monopoly valid for 20 years from the priority filing date." }
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

                {/* Statutory Forms Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Mandatory <span className="text-bid-green">Statutory Forms</span></h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { id: "Form 1", label: "Application Form", desc: "Applicant and invention profile." },
                            { id: "Form 2", label: "Specifications", desc: "Full technical description." },
                            { id: "Form 3", label: "Undertaking", desc: "Foreign application disclosure." },
                            { id: "Form 5", label: "Inventorship", desc: "Declaration of true inventors." },
                            { id: "Form 9", label: "Expedition", desc: "Request for early publication." },
                            { id: "Form 18", label: "RFE", desc: "Request for Examination." },
                            { id: "Form 26", label: "Authorization", desc: "Patent Agent authorization." },
                            { id: "Form 28", label: "Small Entity", desc: "Claim fee benefits (MSME)." }
                        ].map((form, i) => (
                            <div key={i} className="bg-white border border-blue-100 p-6 rounded-3xl shadow-sm text-center">
                                <span className="text-[10px] font-black text-bid-green uppercase tracking-widest">{form.id}</span>
                                <h5 className="text-[11px] font-black text-slate-900 uppercase mt-1">{form.label}</h5>
                                <p className="text-[10px] text-slate-500 mt-2 font-medium">{form.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Strategic Advantages (Bento Style) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm group">
                        <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green mb-6 group-hover:bg-bid-green group-hover:text-white transition-all">
                            <TrendingUp size={22} />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">Commercial Yield</h4>
                        <div className="space-y-4 text-xs text-slate-500 font-medium leading-relaxed">
                            <p>A patent is a tangible financial asset. registration allows you to **Sell**, **Transfer**, or **Franchise** your invention, helping you raise signficant income and royalty revenue.</p>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-black text-bid-green uppercase mb-2">Defense Strategy</h5>
                                <p className="text-[10px] uppercase tracking-widest opacity-70">Protection for 20 years allows you to defend your invention and establish a market monopoly.</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div {...fadeInUp} className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 group-hover:rotate-0 transition-all">
                            <Shield size={100} className="text-bid-green" />
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-tighter mb-4 text-bid-green">Expert Assistance</h4>
                        <div className="space-y-4">
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                Our team of Chartered Accountants and IPR specialists assist you in preparing complex technical details and handling controller hearings nationwide.
                            </p>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-white">
                                    <Users size={12} className="text-bid-green" />
                                    <span className="text-[10px] font-black">Eligible: Inventors, Assignees, Legal Heirs</span>
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
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">INNOVATION SHIELD</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Secure your <span className="text-bid-green italic">Global Intellectual Monopoly</span> today.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Full 20-year legal protection for your invention. All-inclusive filing for ₹30,000/-</p>
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
                        <Link href="/contact" className="bg-slate-900 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center">
                            Talk to Expert
                        </Link>
                    </div>
                </motion.div>

            </section>
        </div>
    );
}
