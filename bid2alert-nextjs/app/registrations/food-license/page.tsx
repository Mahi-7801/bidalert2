'use client';

import { Check, Shield, FileText, Users, Building, Scale, ArrowRight, BookOpen, Clock as Timer, Clock, BadgeCheck, FileCheck, ClipboardList, Zap, Info, HelpCircle, Award, Star, Rocket, Landmark, HardDrive, Cpu, Network, Gavel, Search, Globe, Fingerprint, Lock, ShieldCheck, Tag, Heart, TrendingUp, Handshake, Eye, BarChart3, Binary, Briefcase, PlusCircle, UtensilsCrossed, Soup, Coffee, Truck, ShoppingCart, Store, ChevronRight, MapPin, Layers, Home, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FoodLicenseRegistrationPage() {
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
                        FSSAI ACT 2006 COMPLIANCE
                    </motion.span>
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-5xl lg:text-8xl font-black mb-8 tracking-tighter max-w-5xl mx-auto leading-[0.95] text-slate-900 uppercase"
                    >
                        Food License <span className="text-bid-green">FSSAI</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Mandatory 14-digit legal identity for all food businesses in India. Whether you are a cloud kitchen, manufacturer, or exporter, ensure hygiene compliance under the FSSAI Act today.
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Global Food Safety Package</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter">₹4,999<span className="text-bid-green leading-none">/-</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Includes Govt & Professional Fees + Expert Filing</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-24 bg-blue-100" />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6 leading-relaxed">
                            FSSAI License is mandatory starting from day one of operations. We provide end-to-end support for Basic, State, and Central categories with 100% online processing.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link href="/contact" className="bg-bid-green text-bid-dark px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                                Get Food License
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
                            Legal <span className="text-bid-green italic leading-none">Context</span>
                        </h3>
                        <div className="space-y-4 text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                            <p>
                                FSSAI (Food Safety and Standards Authority of India) is the 14-digit registration number mandatory for any business involved in food processing, manufacturing, storage, or distribution.
                            </p>
                            <p>
                                Under the **FSSAI Act 2006**, businesses must display their license number and logo on all packaged products. This not only ensures legal compliance but significantly boosts consumer confidence in your hygiene standards.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-bid-green font-black text-[10px] uppercase tracking-widest">
                            <div className="w-12 h-px bg-bid-green/30" />
                            REPORTS TO MINISTRY OF HEALTH & FAMILY WELFARE
                        </div>
                    </div>
                    <div className="lg:w-1/3 bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <UtensilsCrossed size={100} />
                        </div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-bid-green">LICENSE STRENGTH</h4>
                        <p className="font-bold text-lg leading-snug mb-6">
                            "One license, multiple benefits. Build trust, eliminate legal risks, and promote new products with FSSAI."
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-bid-green flex items-center justify-center font-black text-bid-dark text-[8px]">FOO</div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">FSSAI Certified Business</span>
                        </div>
                    </div>
                </motion.div>

                {/* Who Needs FSSAI? Grid */}
                <div className="mb-24 mt-24">
                    <div className="text-center mb-12">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            MANDATORY ELIGIBILITY
                        </span>
                        <h3 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Who Needs <span className="text-bid-green">This License?</span></h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Restaurants & Cafes", desc: "Mandatory for all dining establishments and cloud kitchens.", icon: UtensilsCrossed },
                            { title: "Food Manufacturers", desc: "For brands engaged in large-scale food processing and production.", icon: Layers },
                            { title: "Online Delivery", desc: "Required for Swiggy, Zomato partners and grocery delivery apps.", icon: Truck },
                            { title: "Food Exporters", desc: "Mandatory for shipping Indian food products to global markets.", icon: Globe },
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
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Place of Work Note */}
                <motion.div
                    {...fadeInUp}
                    className="bg-bid-green/5 border border-bid-green/20 p-8 rounded-[2.5rem] mb-24 flex flex-col md:flex-row items-center gap-8 group"
                >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-bid-green shadow-xl shadow-bid-green/10 shrink-0">
                        <Home size={30} />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-1">Residential Property <span className="text-bid-green">Registration</span></h4>
                        <p className="text-sm text-slate-600 font-medium">Planning to start a home-based food business? FSSAI permits registration on residential addresses as long as specific hygiene documentation is provided. Bidalert handles home-based cloud kitchen licenses daily.</p>
                    </div>
                </motion.div>

                {/* Detailed Document Split (Form A vs Form B) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    {/* Basic - Form A */}
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm group">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-bid-green/10 rounded-xl flex items-center justify-center text-bid-green group-hover:bg-bid-green group-hover:text-white transition-colors">
                                    <FileText size={20} />
                                </div>
                                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Basic Registration <span className="text-bid-green italic text-sm">(Form A)</span></h4>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                "Signed Form-A (Proprietor/Partners)",
                                "FSMS Statement on Firm Letterhead",
                                "Annual Turnover Evidence",
                                "Nomination in Form IX + Resolution",
                                "Self-Declaration by Directors",
                                "Affidavit on Non-Judicial Stamp Paper",
                                "PAN & KYC Docs of Applicant",
                                "Property Proof (Owned/Rented/Home)"
                            ].map((doc, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-blue-50 pb-3">
                                    <span className="text-[11px] font-black uppercase tracking-tight text-slate-600">{doc}</span>
                                    <Check className="text-bid-green font-black" size={14} strokeWidth={4} />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* State/Central - Form B */}
                    <motion.div {...fadeInUp} className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white group">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-bid-green/20 rounded-xl flex items-center justify-center text-bid-green">
                                    <Building size={20} />
                                </div>
                                <h4 className="text-xl font-black uppercase tracking-tighter">State & Central <span className="text-bid-green italic text-sm">(Form B)</span></h4>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                "Filled Form-B signed by Directors",
                                "MOA/AOA & PLC Constitution",
                                "Analysis Reports (Activity Specific)",
                                "Food Safety Management Plan",
                                "Production Unit Infrastructure Photo",
                                "Local Authority NOC (if needed)",
                                "List of Food Categories/Items",
                                "Turnover & Income Evidence"
                            ].map((doc, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3">
                                    <span className="text-[11px] font-black uppercase tracking-tight text-slate-400">{doc}</span>
                                    <Check className="text-bid-green font-black" size={14} strokeWidth={4} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Procedure Roadmap - Vertical Alternate */}
                <div className="mb-24 px-4 overflow-hidden">
                    <div className="text-center mb-20">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-bid-green/30">
                            FOSCOS PORTAL PROCESS
                        </span>
                        <h3 className="text-3xl sm:text-6xl font-black text-slate-900 mt-4 uppercase tracking-tighter">Registration <br /><span className="text-bid-green">Roadmap</span></h3>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: "01", title: "Submit Application", timeline: "Hour 1", desc: "Filling the customized FSSAI form (A or B) with precise business activity codes on the FoSCoS portal." },
                                { step: "02", title: "Online Payment", timeline: "Day 1", desc: "Securely processing government fees via net banking or digital wallets to initiate the verification process." },
                                { step: "03", title: "Credential Verification", timeline: "Day 2-3", desc: "Uploading scanned copies of PAN, Photos, and Property documents for immediate department review." },
                                { step: "04", title: "Expert Submission", timeline: "Day 4-7", desc: "Our specialists submit the application to FoSCoS to avoid rejection queries and ensure priority processing." },
                                { step: "05", title: "License Delivery", timeline: "Final Grant", desc: "Immediate issuance of the 14-digit FSSAI certificate delivered digitally via email once approved by DO." }
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

                {/* Strategic Guidelines Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto">
                    <motion.div {...fadeInUp} className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm group">
                        <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green mb-6 group-hover:bg-bid-green group-hover:text-white transition-all">
                            <Layers size={22} />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">Centralized Compliance</h4>
                        <div className="space-y-4 text-xs text-slate-500 font-medium leading-relaxed">
                            <p>Operating in 10+ states? A **Central FSSAI Registration** is required for your head office to manage nationwide food compliance efficiently.</p>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-black text-bid-green uppercase mb-2">Exporter Note</h5>
                                <p className="text-[10px] uppercase tracking-widest opacity-70 leading-relaxed font-bold italic">Food exporters/importers must obtain an IEC (Import Export Code) before applying for FSSAI on the same address.</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div {...fadeInUp} className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 group-hover:rotate-0 transition-all">
                            <BadgeCheck size={100} className="text-bid-green" />
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-tighter mb-4 text-bid-green">Validation Period</h4>
                        <div className="space-y-4">
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                FSSAI licenses are generally issued for **1-5 years**. We provide automated renewal alerts 90 days before expiry to ensure your business operations never face a legal pause.
                            </p>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">PRO TIP</span>
                                <p className="text-[11px] font-bold text-bid-green mt-1 uppercase">Display the FSSAI logo and license number prominently on your storefront and packaging to build immediate trust.</p>
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
                    className="mt-16 bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[4rem] shadow-sm flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-bid-green -rotate-12 translate-x-1/2 -translate-y-1/2">
                        <Rocket size={400} />
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <span className="bg-bid-green text-bid-dark px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">Global Food Quality Mark</span>
                        </div>
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Scale your <span className="text-bid-green italic text-3xl sm:text-5xl">Food Brand</span> nationwide.</h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Professional end-to-end FSSAI support for Cloud Kitchens to Large Manufacturers for ₹4,999/-</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">

                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={14} className="text-bid-green" />
                                <span className="text-[10px] font-black uppercase">support@bidalert.in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                            Start Registration
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
