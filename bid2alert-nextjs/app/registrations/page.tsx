'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Shield, Building, FileText, Globe, UtensilsCrossed,
    Award, Landmark, Zap, Scale, Heart, Fingerprint,
    Rocket, ArrowRight, Check, Star
} from 'lucide-react';

// @ts-ignore
const MotionDiv = motion.div as any;
// @ts-ignore
const MotionSpan = motion.span as any;
// @ts-ignore
const MotionH1 = motion.h1 as any;
// @ts-ignore
const MotionP = motion.p as any;

const registrationServices = [
    {
        name: "GST Registration",
        desc: "Complete tax compliance for businesses. Get your unique GSTIN and start operating legally.",
        href: "/registrations/gst",
        icon: Scale,
        tag: "Taxation",
        trending: true
    },
    {
        name: "Startup India",
        desc: "Unlock tax exemptions, capital gains relief, and government tender priority for your startup.",
        href: "/registrations/startup-india",
        icon: Rocket,
        tag: "Government"
    },
    {
        name: "Trademark",
        desc: "Protect your brand identity. Register your logo, name, and slogan for nationwide IP protection.",
        href: "/registrations/trademark",
        icon: Shield,
        tag: "Intellectual Property"
    },
    {
        name: "Patent",
        desc: "Secure your inventions. Exclusive rights to your technological breakthroughs and innovations.",
        href: "/registrations/patent",
        icon: Zap,
        tag: "Intellectual Property"
    },
    {
        name: "Copyright",
        desc: "Legal protection for your creative works, software, literature, and artistic expressions.",
        href: "/registrations/copyright",
        icon: FileText,
        tag: "Intellectual Property"
    },
    {
        name: "ISO Certification",
        desc: "International standards for quality management, information security, and environment.",
        href: "/registrations/iso",
        icon: Award,
        tag: "Standards"
    },
    {
        name: "IEC Code",
        desc: "Mandatory Import Export Code for global trade. Lifetime validity with PAN linkage.",
        href: "/registrations/iec",
        icon: Globe,
        tag: "Trade"
    },
    {
        name: "PF & ESI",
        desc: "Workforce social security registration for healthcare, pension, and employee welfare.",
        href: "/registrations/pf-esi",
        icon: Heart,
        tag: "Compliance"
    },
    {
        name: "Food License (FSSAI)",
        desc: "14-digit hygiene permit for restaurants, cloud kitchens, and food manufacturers.",
        href: "/registrations/food-license",
        icon: UtensilsCrossed,
        tag: "Food Industry"
    },
    {
        name: "MSME Aadhaar",
        desc: "Priority lending and economic benefits for small and medium enterprises via UAM.",
        href: "/registrations/msme",
        icon: LandPlot,
        tag: "Economy"
    },
    {
        name: "NGO Exemption (12A/80G)",
        desc: "Income tax relief for NGOs and 50% tax deduction benefits for your charitable donors.",
        href: "/registrations/12a-80g",
        icon: Landmark,
        tag: "Non-Profit"
    },
    {
        name: "DOT OSP License",
        desc: "Telecom authorization for call centers, BPOs, and network operation centers.",
        href: "/registrations/dot-osp",
        icon: PhoneCall,
        tag: "Telecom"
    }
];

function LandPlot(props: any) {
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
            <path d="M12 3v18" />
            <path d="M3 12h18" />
            <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
    )
}

function PhoneCall(props: any) {
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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            <path d="M14.05 2a9 9 0 0 1 8 8" />
            <path d="M14.05 6A5 5 0 0 1 18 10" />
        </svg>
    )
}

export default function RegistrationsIndexPage() {
    return (
        <div className="bg-[#F0F9FF] min-h-screen selection:bg-bid-green selection:text-bid-dark pb-32 overflow-x-hidden">

            {/* Hero Header */}
            <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-40 lg:pt-48 border-b border-blue-100/50">
                <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <MotionSpan
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-bid-green/20 text-bid-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 inline-block"
                    >
                        Corporate Compliance Hub
                    </MotionSpan>
                    <MotionH1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-6xl lg:text-9xl font-black mb-8 tracking-tighter text-slate-900 uppercase"
                    >
                        Professional <br /><span className="text-bid-green">Registrations</span>
                    </MotionH1>
                    <MotionP
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        Your all-in-one portal for statutory registrations, tax compliance, and intellectual property protection in India.
                    </MotionP>
                </div>
            </section>

            {/* Grid of Services */}
            <section className="container mx-auto px-4 -mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {registrationServices.map((service, i) => (
                        <MotionDiv
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group bg-white border border-blue-100 p-10 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-blue-200/50 transition-all relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-14 h-14 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green group-hover:bg-bid-green group-hover:text-white transition-all duration-500">
                                        <service.icon size={26} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 group-hover:text-bid-green transition-colors">{service.tag}</span>
                                </div>

                                {service.trending && (
                                    <div className="absolute top-8 right-10">
                                        <div className="flex items-center gap-1 bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full text-[8px] font-black">
                                            <Star size={8} fill="currentColor" />
                                            TRENDING
                                        </div>
                                    </div>
                                )}

                                <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter leading-none group-hover:text-bid-green transition-colors">
                                    {service.name}
                                </h3>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed mb-10">
                                    {service.desc}
                                </p>
                            </div>

                            <Link
                                href={service.href}
                                className="relative z-10 w-full bg-slate-50 group-hover:bg-bid-green py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 group-hover:translate-y-[-4px]"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-bid-dark transition-colors">Apply Now</span>
                                <ArrowRight size={14} className="text-slate-300 group-hover:text-bid-dark transition-colors" />
                            </Link>

                            {/* Background blur effect on hover */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-bid-green/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        </MotionDiv>
                    ))}
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="container mx-auto px-4 mt-32 max-w-6xl">
                <div className="bg-slate-900 rounded-[4rem] p-12 sm:p-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                        <Award size={400} className="text-bid-green" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
                        <div>
                            <span className="text-bid-green font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Elite Professional Network</span>
                            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                                Why Trust <br /><span className="text-bid-green italic">Bidalert?</span>
                            </h2>
                            <p className="text-slate-400 font-medium leading-relaxed mb-8">
                                We handle thousands of statutory filings every month for businesses ranging from solopreneurs to multi-state enterprises.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "100% Online & Paperless Processing",
                                    "Fixed Pricing – No Hidden Government Fees",
                                    "Automated Compliance & Renewal Alerts",
                                    "Expert Liaison with Statuatory Authorities"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-6 h-6 bg-bid-green/20 rounded-lg flex items-center justify-center text-bid-green group-hover:bg-bid-green group-hover:text-white transition-all">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { label: "Client Base", val: "50,000+" },
                                    { label: "Success Rate", val: "99.8%" },
                                    { label: "States Covered", val: "36 Units" },
                                    { label: "Expert Panel", val: "200+ CAs/CS" }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                                        <div className="text-3xl font-black text-bid-green mb-1">{stat.val}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="container mx-auto px-4 mt-16 max-w-6xl">
                <div className="bg-white border border-blue-100 p-8 sm:p-12 lg:p-16 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10">
                    <div className="max-w-xl">
                        <h4 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Need help with <br /><span className="text-bid-green">your registration?</span></h4>
                        <p className="text-slate-500 font-medium text-sm mt-4">Talk to our compliance experts for personalized guidance on business setup and statutory requirements.</p>
                    </div>
                    <Link href="/contact" className="bg-bid-green text-bid-dark px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-bid-green/20 active:scale-95">
                        Contact Support
                    </Link>
                </div>
            </section>
        </div>
    );
}
