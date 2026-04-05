'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Music, Film, PenTool, Layout, Database, Code, Binary, Users2, Phone, Mail, Ban, AlertTriangle, Scale as Justice } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CopyrightRegistrationPage() {
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
                        Intellectual Property Protection
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        Copyright <span className="text-bid-green">Registration</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Protect your creative expressions—novels, code, melodies, and films. Secure exclusive rights under The Copyright Act, 1957 and establish absolute legal proof of original authorship.
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Global Author Protection</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹10,000<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Full Application + NOC Drafting + Professional Scrutiny</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Includes complete filing on the Copyright Portal, tracking of diary numbers, and specialized assistance for literary, musical, and software works.
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

                {/* Intro Card */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3rem] shadow-sm flex flex-col lg:flex-row gap-12 items-center mb-10"
                >
                    <div className="flex-1">
                        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
                            Legal Significance of <span className="text-bid-green italic leading-none">Copyright</span>
                        </h3>
                        <div className="space-y-4 text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                            <p>
                                Copyright is a form of legal protection granted under The Copyright Act, 1957 to individuals who create original artistic, literary, musical, or dramatic works.
                            </p>
                            <p>
                                While protection is automatic upon creation, formal registration provides **prima facie evidence** of ownership. It protects the unique expression of ideas once they are transformed into tangible creative works for the lifetime of the author plus 60 years.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-bid-green font-black text-[10px] uppercase tracking-widest">
                            <div className="w-12 h-px bg-bid-green/30" />
                            AUTHORSHIP LIFETIME + 60 YEARS
                        </div>
                    </div>
                    <div className="lg:w-1/3 bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <ShieldCheck size={100} />
                        </div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-bid-green">Creative Guard</h4>
                        <p className="font-bold text-lg leading-snug mb-6">
                            "Legally indication of protection via the © symbol for absolute deterrence."
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-bid-green flex items-center justify-center font-black text-bid-dark text-[10px]">©</div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Copyright Office India</span>
                        </div>
                    </div>
                </motion.div>

                {/* Types of Works Bento */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-24">
                    {[
                        { icon: PenTool, title: "Literary", desc: "Novels, poems, articles, blogs, website content." },
                        { icon: Layout, title: "Artistic", desc: "Paintings, drawings, graphic designs, sculptures." },
                        { icon: Music, title: "Musical", desc: "Melodies, rhythms, and original written scores." },
                        { icon: Film, title: "Cinematograph", desc: "Films, documentaries, and digital videos." },
                        { icon: Binary, title: "Software", desc: "Computer programs, source code, and UIs." },
                        { icon: Database, title: "Databases", desc: "Structured data arrangement and selection." },
                        { icon: Building, title: "Architectural", desc: "Building designs, plans, and 3D models." },
                        { icon: Users2, title: "Performing Arts", desc: "Original dance routines and movement sequences." },
                        { icon: Star, title: "Dramatic", desc: "Plays, scripts, and theatrical arrangements." },
                        { icon: Globe, title: "Global Protection", desc: "Reciprocity in Berne Convention countries." }
                    ].map((type, i) => (
                        <motion.div key={i} {...fadeInUp} className="bg-white border border-blue-100 p-6 rounded-[2.5rem] shadow-sm hover:border-bid-green/30 transition-all group">
                            <div className="w-10 h-10 bg-bid-green/10 rounded-xl flex items-center justify-center text-bid-green mb-4 group-hover:bg-bid-green group-hover:text-white transition-all">
                                <type.icon size={18} />
                            </div>
                            <h5 className="text-[12px] font-black text-slate-900 uppercase tracking-tighter mb-2">{type.title}</h5>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{type.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Exclusive Rights & Penalties (Two Column) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green font-black text-xl">
                                <Award size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Exclusive Legal Rights</h4>
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: "Right to Reproduce", desc: "Exclusive right to make copies or store the work electronically." },
                                { title: "Distribution Rights", desc: "Control over the sale, rental, or lending of the original work." },
                                { title: "Derivative Works", desc: "Exclusive right to create translations or adaptations (e.g. book to film)." },
                                { title: "Public Performance", desc: "Authorization required for public screening/recital/broadcasting." },
                                { title: "Moral Rights", desc: "Paternity and integrity rights (protection against distortion)." }
                            ].map((right, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                    <div className="bg-bid-green/20 p-1.5 h-fit rounded-lg group-hover:bg-bid-green transition-colors">
                                        <Check size={12} className="text-bid-green group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h6 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">{right.title}</h6>
                                        <p className="text-[10px] text-slate-500 font-medium">{right.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-red-500 -rotate-12 translate-x-1/4 -translate-y-1/4">
                            <Justice size={300} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8 text-red-400">
                                <AlertTriangle size={22} />
                                <h4 className="text-xl font-black uppercase tracking-tighter">Infringement Penalties</h4>
                            </div>
                            <div className="space-y-8 mb-12">
                                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10">
                                    <h5 className="text-[9px] font-black text-bid-green uppercase tracking-widest mb-4">First Conviction</h5>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                            <span className="text-[10px] font-bold text-white/60">Minimum Jail</span>
                                            <span className="text-xl font-black text-white">6 Months</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                            <span className="text-[10px] font-bold text-white/60">Minimum Fine</span>
                                            <span className="text-xl font-black text-white">₹50,000</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10">
                                    <h5 className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-4">Subsequent Offense</h5>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                            <span className="text-[10px] font-bold text-white/60">Minimum Jail</span>
                                            <span className="text-xl font-black text-white">1 Year</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                            <span className="text-[10px] font-bold text-white/60">Minimum Fine</span>
                                            <span className="text-xl font-black text-white">₹1,00,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 p-4 bg-red-950/30 rounded-2xl border border-red-500/20 text-center">
                            <p className="text-[9px] font-black text-red-400 leading-relaxed uppercase">⚠️ Copyright infringement is a cognizable and non-bailable offense.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Vertical Process Roadmap */}
                <div className="mb-24 px-4 overflow-hidden">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            REGISTRATION LIFECYCLE
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">7-Step <br /><span className="text-bid-green">Procedure</span></h3>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "Portal Submission", timeline: "Day 1", desc: "Submit the application on the official Copyright Office website with full work descriptors and applicant details." },
                                { step: "02", title: "Diary Number", timeline: "Immediate", desc: "Receive a specialized Diary Number for tracking. Marks the start of the 'Mandatory Waiting Period' required by law." },
                                { step: "03", title: "Wait Period (30 Days)", timeline: "Statutory Month", desc: "A mandatory 30-day window to allow for any objections from third parties or the public regarding the work's ownership." },
                                { step: "04", title: "Objection Handling", timeline: "Post-30 Days", desc: "If objections are raised, responses must be filed within 30 days. A hearing with the Registrar may be scheduled if required." },
                                { step: "05", title: "Objection Resolution", timeline: "2-4 Weeks", desc: "Providing technical justifications or NOCs to resolve conflicts. Transition to the 'Scrutiny' phase once cleared." },
                                { step: "06", title: "Registry Scrutiny", timeline: "1-2 Months", desc: "Final technical merit review of the work against existing archives and prior art by a designated examiner." },
                                { step: "07", title: "Certificate Grant", timeline: "Final Approval", desc: "Final approval by the Registrar. Issuance of the formal Copyright Registration Certificate with the official seal." }
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

                {/* Mandatory Documents (Bento) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm lg:col-span-1">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <ClipboardList size={22} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Required Docs</h4>
                        </div>
                        <div className="space-y-3">
                            {[
                                "2 Hard Copies of the Work",
                                "Form XIV (Application)",
                                "Statement of Particulars",
                                "Power of Attorney (Signed)",
                                "KYC of the Applicant",
                                "Diary Number Ack."
                            ].map((doc, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-1.5 h-1.5 bg-bid-green rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                    <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">{doc}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="lg:col-span-2 bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-bid-green -rotate-12 translate-x-1/4 -translate-y-1/4">
                            <FileCheck size={300} />
                        </div>
                        <h4 className="text-xl font-black text-bid-green uppercase tracking-tighter mb-4 relative z-10">Crucial NOC Policy</h4>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6 relative z-10">Depending on authorship status, the following No-Objection Certificates are mandatory:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                            {[
                                "NOC from author if distinct from applicant",
                                "NOC from publisher if work is published",
                                "Search Certificate (TM-60) for design logos",
                                "NOC from persons in photographs",
                                "NOC from all lyricists/composers for music",
                                "NOC from heirs if author is deceased"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                                    <div className="w-1.5 h-1.5 bg-bid-green rounded-full" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{item}</span>
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
                    className="mt-16 bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-bid-green -rotate-12 translate-x-1/2 -translate-y-1/2">
                        <Rocket size={400} />
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">CREATIVE IP GUARD</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Secure your <span className="text-bid-green italic">Creative Work</span> for a lifetime.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Available across all 28 states and UTs. Professional filing and tracking for ₹10,000/-</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Claim My Copyright
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
