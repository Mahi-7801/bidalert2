'use client';

import { motion } from 'framer-motion';
import {
    Shield, Rocket, GraduationCap, Users, Factory,
    CheckCircle2, ArrowRight, Zap, Target, Award,
    BookOpen, Lightbulb, Scale
} from 'lucide-react';
import Link from 'next/link';

const MotionDiv = motion.div as any;

const pricingData = [
    {
        id: "startups",
        category: "Startups",
        icon: Rocket,
        description: "Flexible IPR support for early-stage ventures to protect their unique innovations.",
        color: "from-blue-600 to-indigo-600",
        plans: [
            {
                name: "Basic Package",
                price: "₹4,999",
                features: ["IPR Consultation (1 Session)", "Trademark Search", "Basic Filing Guidance"]
            },
            {
                name: "Standard Package",
                price: "₹14,999",
                features: ["Trademark Registration Filing", "Startup India IPR Guidance", "Legal Documentation Support", "2 Consultation Sessions"],
                popular: true
            },
            {
                name: "Premium Package",
                price: "₹39,999",
                features: ["Patentability Assessment", "Trademark Filing", "Copyright Filing", "Complete IPR Strategy Support", "6 Months IP Guidance"]
            }
        ]
    },
    {
        id: "educational-institutions",
        category: "Educational Institutions",
        icon: GraduationCap,
        description: "Empowering students and faculty with the knowledge to navigate the complex world of patents.",
        color: "from-purple-600 to-pink-600",
        plans: [
            {
                name: "Basic Awareness",
                price: "₹15,000",
                features: ["1-Day IPR Awareness Seminar", "Expert Speaker Session", "Q&A Session", "E-Certificates"]
            },
            {
                name: "Advanced Training",
                price: "₹45,000",
                features: ["3-Day Patent Drafting Workshop", "Faculty Development Session", "Student Patent Guidance", "Training Materials"],
                popular: true
            },
            {
                name: "Institutional Support",
                price: "₹1,20,000",
                features: ["5-Day FDP Program", "IP Policy Drafting Support", "Incubation & Innovation Guidance", "Ongoing IPR Advisory (3 Months)"]
            }
        ]
    },
    {
        id: "communities",
        category: "Communities & MSMEs",
        icon: Users,
        description: "Bringing world-class IPR expertise to local business clusters and development groups.",
        color: "from-bid-green to-emerald-600",
        plans: [
            {
                name: "Awareness Camp",
                price: "₹10,000",
                features: ["Half-Day Awareness Session", "Brand Protection Guidance", "Government Scheme Information"]
            },
            {
                name: "Full Support Program",
                price: "₹25,000",
                features: ["1-Day Workshop", "Trademark Awareness", "MSME & Startup Registration Guidance", "Documentation Support"],
                popular: true
            }
        ]
    },
    {
        id: "manufacturers",
        category: "Manufacturers & Businesses",
        icon: Factory,
        description: "Comprehensive brand and innovation protection strategies for established enterprises.",
        color: "from-orange-600 to-amber-600",
        plans: [
            {
                name: "Brand Protection",
                price: "₹19,999",
                features: ["Trademark Search & Filing", "Brand Protection Strategy", "Legal Consultation"]
            },
            {
                name: "Innovation Protection",
                price: "₹75,000",
                features: ["Patentability Check", "Patent Drafting Support", "Trademark Filing", "IP Portfolio Planning"],
                popular: true
            }
        ]
    }
];

// Animation Variants
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemReveal = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
};

export default function IPRAwareness() {
    return (
        <div className="bg-[#F8FAFC] min-h-screen text-slate-900 selection:bg-bid-green selection:text-bid-dark overflow-x-hidden">

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-6 pb-2">
                <MotionDiv
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-[10px] sm:text-xs flex items-center gap-2"
                >
                    <Link href="/" className="text-slate-400 hover:text-bid-green transition-all font-bold uppercase tracking-widest flex items-center gap-1 group">
                        <span className="group-hover:-translate-x-0.5 transition-transform">Home</span>
                    </Link>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-600 font-black uppercase tracking-widest">IPR Awareness</span>
                </MotionDiv>
            </div>

            {/* Premium Header */}
            <div className="relative w-full py-12 sm:py-20 overflow-hidden mb-8 sm:mb-12">
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <MotionDiv
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_15%_50%,rgba(16,233,129,0.1)_0,transparent_50%)]"
                    />
                    <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-bid-green/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bid-green/10 border border-bid-green/20 text-bid-green text-[9px] font-black uppercase tracking-[0.2em] mb-6 cursor-default"
                    >
                        <Shield size={12} className="animate-pulse" />
                        Registration & Education
                    </MotionDiv>

                    <MotionDiv
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-tight mb-6">
                            IPR Awareness <br /><span className="text-bid-green italic font-medium">Programs</span>
                        </h1>
                        <p className="text-slate-500 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                            Helping organizations and individuals navigate the complex world of Intellectual Property
                            through custom consultation and education.
                        </p>
                    </MotionDiv>

                    <MotionDiv
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
                    >
                        <Link href="/contact" className="px-7 py-3.5 bg-bid-green text-bid-dark font-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-bid-green/10 flex items-center gap-2 text-[11px] tracking-widest uppercase">
                            BOOK NOW <ArrowRight size={16} />
                        </Link>
                        <a href="#pricing" className="px-7 py-3.5 bg-white text-slate-900 font-black rounded-xl border border-slate-200 hover:border-bid-green hover:shadow-lg transition-all text-[11px] uppercase tracking-widest shadow-sm">
                            VIEW PRICING
                        </a>
                    </MotionDiv>
                </div>
            </div>

            {/* Why IPR Section */}
            <div className="container mx-auto px-4 py-8 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {[
                        { icon: Lightbulb, title: "Innovation", desc: "Protect your ideas before someone else claims them." },
                        { icon: Scale, title: "Legal Rights", desc: "Establish exclusive ownership over your brand." },
                        { icon: Target, title: "Market Edge", desc: "Gain a competitive advantage with a strong IP portfolio." }
                    ].map((item, i) => (
                        <MotionDiv
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center group cursor-default"
                        >
                            <div className="w-12 h-12 bg-slate-50 group-hover:bg-bid-green group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-5 text-bid-green transition-all duration-300">
                                <item.icon size={24} className="group-hover:rotate-12 transition-transform" />
                            </div>
                            <h3 className="text-base font-black uppercase mb-2 tracking-tight text-slate-900 group-hover:text-bid-green transition-colors">{item.title}</h3>
                            <p className="text-slate-500 font-medium text-xs leading-relaxed group-hover:text-slate-600 transition-colors">{item.desc}</p>
                        </MotionDiv>
                    ))}
                </div>
            </div>

            {/* Pricing Sections */}
            <section id="pricing" className="container mx-auto px-4 pb-24">
                <div className="text-center mb-16">
                    <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter mb-3 text-slate-900">Program <span className="text-bid-green">Packages</span></h2>
                    <MotionDiv
                        initial={{ width: 0 }}
                        whileInView={{ width: 32 }}
                        className="h-1 bg-bid-green mx-auto rounded-full"
                    />
                </div>

                <div className="space-y-32 sm:space-y-48">
                    {pricingData.map((section, idx) => (
                        <div key={idx} id={section.id} className="relative pt-24 -mt-24">
                            <div className="flex flex-col gap-12 items-center">
                                <MotionDiv
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="max-w-3xl text-center flex flex-col items-center"
                                >
                                    <MotionDiv
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.color} text-white flex items-center justify-center mb-8 shadow-xl`}
                                    >
                                        <section.icon size={32} />
                                    </MotionDiv>
                                    <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-4 text-slate-900 leading-none">
                                        For <span className="text-bid-green">{section.category}</span>
                                    </h3>
                                    <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed max-w-2xl px-4">
                                        {section.description}
                                    </p>
                                </MotionDiv>

                                <div className="w-full flex flex-wrap justify-center gap-8">
                                    {section.plans.map((plan, pIdx) => (
                                        <MotionDiv
                                            key={pIdx}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: pIdx * 0.1 }}
                                            whileHover={{ y: -12, scale: 1.02 }}
                                            className={`relative group bg-white border ${plan.popular ? 'border-bid-green shadow-xl shadow-bid-green/5' : 'border-slate-100 shadow-sm'} p-8 rounded-[3rem] hover:shadow-2xl transition-all duration-300 flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[400px]`}
                                        >
                                            {plan.popular && (
                                                <MotionDiv
                                                    initial={{ y: 10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-bid-green text-bid-dark text-[9px] font-black uppercase tracking-widest rounded-full shadow-md z-10"
                                                >
                                                    Best Value
                                                </MotionDiv>
                                            )}

                                            <div className="mb-10 flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-bid-green transition-colors">{plan.name}</h4>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-4xl font-black text-slate-900 tracking-tighter">{plan.price}</span>
                                                        <span className="text-xs font-bold text-slate-400">/ p.</span>
                                                    </div>
                                                </div>
                                                <MotionDiv
                                                    whileHover={{ rotate: 180 }}
                                                    className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center transition-colors ${plan.popular ? 'text-bid-green group-hover:bg-bid-green group-hover:text-white' : 'text-slate-300 group-hover:text-bid-green'}`}
                                                >
                                                    <Zap size={18} />
                                                </MotionDiv>
                                            </div>

                                            <MotionDiv
                                                variants={staggerContainer}
                                                initial="hidden"
                                                whileInView="show"
                                                viewport={{ once: true }}
                                                className="space-y-4 mb-14 flex-1"
                                            >
                                                {plan.features.map((feature, fIdx) => (
                                                    <MotionDiv
                                                        key={fIdx}
                                                        variants={itemReveal}
                                                        className="flex items-start gap-3 group/item"
                                                    >
                                                        <CheckCircle2 size={15} className="text-bid-green mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" />
                                                        <span className="text-xs font-bold text-slate-600 leading-tight group-hover/item:text-slate-900 transition-colors uppercase tracking-tight">{feature}</span>
                                                    </MotionDiv>
                                                ))}
                                            </MotionDiv>

                                            <Link
                                                href={`/contact?subject=IPR Inquiry - ${section.category} - ${plan.name}`}
                                                className={`w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest text-center transition-all ${plan.popular ? 'bg-bid-green text-bid-dark shadow-lg active:scale-95 shadow-bid-green/20' : 'bg-slate-50 text-slate-900 hover:bg-slate-900 hover:text-white active:scale-95'}`}
                                            >
                                                GET STARTED
                                            </Link>
                                        </MotionDiv>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <div className="container mx-auto px-4 pb-24">
                <MotionDiv
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-900 rounded-[3rem] p-10 sm:p-20 text-center relative overflow-hidden shadow-2xl group"
                >
                    <MotionDiv
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-0 right-0 w-[400px] h-[400px] bg-bid-green/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"
                    />

                    <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-6 max-w-3xl mx-auto leading-tight relative z-10">
                        Transform Your <span className="text-bid-green italic font-medium">Intellectual Assets</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 relative z-10">
                        <Link href="/contact" className="px-10 py-5 bg-bid-green text-bid-dark font-black rounded-xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-bid-green/20 text-[11px] tracking-widest flex items-center gap-2">
                            CONTACT US NOW <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="tel:+919985102111" className="text-white font-black tracking-widest text-xs hover:text-bid-green transition-all uppercase underline underline-offset-8 decoration-white/20 hover:decoration-bid-green group/phone">
                            <span className="group-hover/phone:mr-2 transition-all">+91 99851 02111</span>
                        </a>
                    </div>
                </MotionDiv>
            </div>
        </div>
    );
}
