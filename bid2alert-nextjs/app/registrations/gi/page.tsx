'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, MapPin, History, X, Leaf, Anchor, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GIRegistrationPage() {
    // Animation Variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    return (
        <div className="bg-[#F0F9FF] min-h-screen font-sans selection:bg-bid-green selection:text-bid-dark pb-24 border-b border-blue-100 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
                <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none" />

                <motion.div
                    //@ts-ignore
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-4 relative z-10 text-center"
                >
                    <motion.span
                        //@ts-ignore
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black mb-6 border border-bid-green/30 inline-block uppercase tracking-[0.2em]"
                    >
                        Regional Heritage Protection
                    </motion.span>
                    <motion.h1
                        //@ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        Geographical <span className="text-bid-green">Indication</span>
                    </motion.h1>
                    <motion.p
                        //@ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Protect products that originate from a specific place with unique qualities linked to their geographical origin. Secure your region's legacy.
                    </motion.p>
                </motion.div>
            </section>

            {/* Pricing Strip */}
            <section className="container mx-auto px-4 -mt-20 sm:-mt-28 relative z-30 mb-24">
                <motion.div
                    //@ts-ignore
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-blue-100 p-8 sm:p-12 rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto"
                >
                    <div className="flex-1 text-center md:text-left space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-3 text-bid-green mb-2">
                            <Tag size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Premium GI Protection</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹2,00,000<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Filing + Documentation + Policy Advice</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            Includes complete statement of case preparation, geographical area mapping, and representation at the GI Registry, Chennai.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Start GI Registration
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Content Sections */}
            <section className="container mx-auto px-4 max-w-7xl">

                {/* What is GI? */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3rem] shadow-sm flex flex-col lg:flex-row gap-12 items-center mb-10"
                >
                    <div className="flex-1">
                        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
                            What is <span className="text-bid-green italic leading-none">Geographical Indication?</span>
                        </h3>
                        <div className="space-y-4 text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                            <p>
                                A Geographical Indication (GI) is a legal tag given to products that originate from a specific place and have unique qualities or reputation because of that location.
                            </p>
                            <div className="bg-bid-green/5 border-l-4 border-bid-green p-4 rounded-r-2xl mt-4">
                                <p className="text-slate-800 font-bold text-sm italic">
                                    "The product’s quality, reputation, or characteristics are directly linked to its geographical origin."
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <Globe size={100} />
                        </div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-bid-green">Regional Identity</h4>
                        <p className="font-bold text-lg leading-snug mb-6">
                            "Protect the traditional legacy and unique heritage of your region's craftsmanship."
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-bid-green flex items-center justify-center font-black text-bid-dark text-[8px]">GI</div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Registry Certified</span>
                        </div>
                    </div>
                </motion.div>

                {/* Symbols & Examples */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <BadgeCheck size={28} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">What it PROTECTS</h4>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { title: "Name of the product", desc: "Exclusive use of the regional name." },
                                { title: "Regional Reputation", desc: "The unique status linked to the place." },
                                { title: "Traditional Knowledge", desc: "Skills of local artisan producers." },
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-bid-green mt-1.5" />
                                    <div>
                                        <p className="text-xs font-black text-slate-900 uppercase">{item.title}</p>
                                        <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                                <MapPin size={28} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Iconic Examples</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {["Darjeeling Tea", "Tirupati Laddu", "Kanchipuram Silk", "Banarasi Sarees", "Alphonso Mango", "Aranmula Kannadi", "Kolhapuri Chappals"].map((ex, i) => (
                                <span key={i} className="text-[10px] font-black bg-slate-50 border border-slate-100 text-slate-600 px-4 py-2 rounded-xl uppercase tracking-tight">{ex}</span>
                            ))}
                        </div>
                        <p className="mt-6 text-[10px] font-bold text-slate-500 italic">
                            Only producers from that specific region can legally use these names.
                        </p>
                    </motion.div>
                </div>

                {/* Not Protected & Who Applies */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div {...fadeInUp} className="bg-red-50/30 border border-red-100 p-10 rounded-[3rem] shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-500">
                                <X size={28} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">What it DOES NOT Protect</h4>
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: "Individual Brand Names", desc: "Trademark does that" },
                                { title: "Appearance / Design", desc: "Design Registration does that" },
                                { title: "Invention / Process", desc: "Patent does that" },
                                { title: "General Products", desc: "Products not linked to a place" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                    <p className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{item.title} — <span className="text-slate-400 font-medium normal-case">{item.desc}</span></p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Users size={120} />
                        </div>
                        <h4 className="text-xl font-black mb-8 uppercase tracking-tighter text-bid-green">Who Can Apply?</h4>
                        <p className="text-[10px] font-bold mb-4 text-white/40 uppercase tracking-widest">Not for individuals — Group applicants only</p>
                        <ul className="space-y-3">
                            {["Associations of Persons", "Producers' Groups", "Cooperatives", "Government Authorities", "NGOs representing producers"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <Check size={14} className="text-bid-green" />
                                    <span className="text-xs font-bold text-white/80">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Authority & Validity */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-8 rounded-[2.5rem] shadow-sm text-center">
                        <Landmark size={24} className="mx-auto mb-4 text-bid-green" />
                        <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Authority</h5>
                        <p className="text-xs font-black text-slate-900 uppercase leading-tight">GI Registry, Chennai <br /><span className="text-[9px] text-slate-500 font-medium">GI Act, 1999</span></p>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-8 rounded-[2.5rem] shadow-sm text-center">
                        <Timer size={24} className="mx-auto mb-4 text-bid-green" />
                        <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Validity</h5>
                        <p className="text-xs font-black text-slate-900 uppercase leading-tight">10 Years <br /><span className="text-[9px] text-slate-500 font-medium lowercase italic">renewable indefinitely</span></p>
                    </motion.div>

                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-8 rounded-[2.5rem] shadow-sm text-center">
                        <Clock size={24} className="mx-auto mb-4 text-bid-green" />
                        <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Timeline</h5>
                        <p className="text-xs font-black text-slate-900 uppercase leading-tight">12–24 Months <br /><span className="text-[9px] text-slate-500 font-medium leading-none">Approx. processing time</span></p>
                    </motion.div>
                </div>

                {/* Process Timeline */}
                <div className="mb-24 px-4 overflow-hidden pt-10">
                    <div className="text-center mb-16">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            REGISTRATION STEPS
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">GI Filing <br /><span className="text-bid-green">Lifecycle</span></h3>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />
                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "Identify Product", timeline: "Standard Audit", desc: "Checking eligibility based on geographical origin and unique traits. Identifying the producer group or association." },
                                { step: "02", title: "Statement of Case", timeline: "Month 1-2", desc: "Preparing the detailed historical, technical, and unique case for the regional product with mapping data." },
                                { step: "03", title: "Official Filing", timeline: "Month 3", desc: "Submission to the GI Registry, Chennai with comprehensive maps, producer details, and authorized signatures." },
                                { step: "04", title: "Examination", timeline: "Month 4-10", desc: "Rigorous vetting by the Registry for absolute grounds, reputation, and technical uniqueness of the GI claim." },
                                { step: "05", title: "Publication", timeline: "Month 11-15", desc: "Advertising in the GI Journal for public feedback and a 4-month opposition window for third-party claims." },
                                { step: "06", title: "Certification", timeline: "Final Grant", desc: "Final issuance of the GI tag after successful grant procedure and entry into the Geographical Indications Register." }
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

                {/* Documents Section */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3.5rem] shadow-sm mb-24 max-w-5xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Documents Checklist</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2 px-4 italic leading-relaxed">Required for GI Registry submission</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {[
                            "Statement of Case (History & Uniqueness)",
                            "Geographical Area Map (Official Bounds)",
                            "Product Description & Production Method",
                            "Proof of Regional Link & Reputation",
                            "Producers' Association Details",
                            "Official Application Forms"
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl group hover:bg-bid-green/5 transition-colors">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-bid-green shrink-0 group-hover:scale-110 transition-transform">
                                    <FileCheck size={18} />
                                </div>
                                <span className="text-xs font-black text-slate-700 uppercase tracking-tight leading-relaxed">{doc}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Professional CTA Section */}
                <motion.div
                    //@ts-ignore
                    initial={{ scale: 0.98, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-bid-green -rotate-12 translate-x-1/2 -translate-y-1/2">
                        <Anchor size={400} />
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">CULTURAL IP GUARD</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Protect your <span className="text-bid-green italic">Region's Identity</span> from misuse.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Establish your product's geographical heritage legally. GI registration starting from ₹15,000/- with lifetime brand value.</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Apply for GI Tag
                        </Link>
                        <Link href="/contact" className="bg-slate-900 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center">
                            Talk to GI Expert
                        </Link>
                    </div>
                </motion.div>

            </section>
        </div>
    );
}
