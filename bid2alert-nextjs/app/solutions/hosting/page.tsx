'use client';

import { motion } from 'framer-motion';
import {
    Globe, Server, ShieldCheck, Mail,
    Settings, Database, Lock, Cpu,
    ArrowRight, CheckCircle2, Zap, Cloud, Star,
    Network, HardDrive, ShieldAlert, Monitor,
    RefreshCw, Share2, DollarSign, Wallet,
    Briefcase, Award, Headphones, MapPin
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const MotionDiv = motion.div as any;

const domainPricing = [
    { type: ".in", firstYear: "₹1299", renewal: "₹1,499" },
    { type: ".co.in", firstYear: "₹1299", renewal: "₹1499" },
    { type: ".com", firstYear: "₹1,499", renewal: "₹1,699" },
    { type: ".org", firstYear: "₹1,599", renewal: "₹1,799" },
    { type: ".net", firstYear: "₹1,699", renewal: "₹1,999" },
];

const hostingPlans = [
    {
        name: "Starter Hosting",
        price: "₹4,999/year",
        monthly: "₹399/mo",
        bestFor: "Small business, single-page or 5-page website",
        features: ["1 Website", "2 GB SSD Storage", "10 GB Monthly Bandwidth", "Free SSL Certificate", "2 Business Emails", "Weekly Backup", "Basic Support"]
    },
    {
        name: "Business Hosting",
        price: "₹7,999/year",
        monthly: "₹699/mo",
        recommended: true,
        bestFor: "Company website / school / clinic / traders",
        features: ["1 Website", "5 GB SSD Storage", "30 GB Monthly Bandwidth", "Free SSL Certificate", "5 Business Emails", "Weekly Backup", "Malware Scan", "Managed Control Panel"]
    },
    {
        name: "Professional Hosting",
        price: "₹9,999/year",
        monthly: "₹999/mo",
        bestFor: "Dynamic websites, lead portals, service sites",
        features: ["3 Websites", "10 GB SSD Storage", "75 GB Monthly Bandwidth", "Free SSL Certificate", "10 Business Emails", "Daily Backup", "Priority Support", "Performance Optimization"]
    },
    {
        name: "Premium Business",
        price: "₹18,999/year",
        monthly: "₹1,899/mo",
        bestFor: "E-commerce, heavy dynamic site, CRM-backed",
        features: ["5 Websites / 1 Large Project", "20 GB SSD Storage", "150 GB Monthly Bandwidth", "Free SSL Certificate", "20 Business Emails", "Daily Backup", "Security Hardening", "Priority WhatsApp Support"]
    }
];

const vpsPlans = [
    {
        name: "Managed VPS Starter",
        price: "₹2,500/month",
        annual: "₹27,000/year",
        features: ["Isolated VPS Environment", "Dedicated Deployment", "Linux Server", "1 App / Portal", "Managed Updates", "SSL Included", "Basic Monitoring"]
    },
    {
        name: "Managed VPS Business",
        price: "₹4,999/month",
        annual: "₹54,000/year",
        features: ["Managed VPS Deployment", "Priority Resources", "Security Updates", "Weekly Maintenance", "Daily Backup", "99.9% Uptime Target", "Advanced Support"]
    },
    {
        name: "Managed VPS Premium",
        price: "₹8,999/month",
        annual: "₹96,000/year",
        features: ["Full Managed VPS environment", "Advanced Security Hardening", "Performance Tuning", "Log Monitoring", "Priority Incident Response", "DevOps Support", "Premium Backup & Restore"]
    }
];

const emailPlans = [
    { name: "Basic Email", price: "₹1,999/year", storage: "1 GB per mailbox", count: "2 official emails" },
    { name: "Standard Email", price: "₹3,999/year", storage: "2 GB per mailbox", count: "5 official emails" },
    { name: "Professional Email", price: "₹7,999/year", storage: "5 GB per mailbox", count: "10 official emails" }
];

const addOns = [
    { service: "Basic SSL Installation", price: "Free with hosting" },
    { service: "Premium SSL Setup/Reissue", price: "₹1,500" },
    { service: "Website Malware Cleanup", price: "₹2,999 - ₹7,999" },
    { service: "Security Hardening", price: "₹3,999" },
    { service: "Firewall / WAF Setup", price: "₹4,999" },
    { service: "Website Migration", price: "₹2,500 - ₹7,500" },
    { service: "Speed Optimization", price: "₹3,999 - ₹9,999" },
    { service: "Cloudflare Setup", price: "₹1,499" }
];

const bundles = [
    {
        name: "New Business Starter",
        price: "₹4,999/year",
        target: "Shops / Clinics / Local Businesses",
        items: ["1 .in Domain", "Starter Hosting", "Free SSL", "2 Business Emails", "DNS Setup", "Basic Support"]
    },
    {
        name: "Business Growth Package",
        price: "₹8,999/year",
        target: "Local companies, service providers",
        items: ["1 .com or .in Domain", "Business Hosting", "Free SSL", "5 Emails", "Backup", "Technical Support"]
    },
    {
        name: "Professional Presence",
        price: "₹14,999/year",
        target: "Schools / Hospitals / Consultants",
        items: ["1 Domain", "Professional Hosting", "Free SSL", "10 Emails", "Daily Backup", "Priority Support"]
    },
    {
        name: "Premium Managed VPS",
        price: "₹39,999/year",
        target: "Portals / E-commerce / Web Apps",
        items: ["1 Domain", "Managed VPS Deployment", "SSL", "Daily Backup", "Security Maintenance", "Priority Support"]
    }
];

export default function HostingSolution() {
    const containerRef = useRef(null);

    return (
        <div className="bg-[#F8FAFC] min-h-screen text-slate-900 selection:bg-bid-green selection:text-bid-dark overflow-x-hidden" ref={containerRef}>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-6 pb-4">
                <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm flex items-center gap-2"
                >
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">Home</Link>
                    <span className="text-slate-400 mx-1">&gt;</span>
                    <Link href="/solutions/web-app" className="text-slate-500 hover:text-bid-green transition-colors font-medium">IT Services</Link>
                    <span className="text-slate-400 mx-1">&gt;</span>
                    <span className="text-bid-greenhover font-bold">Hosting & Domain</span>
                </MotionDiv>
            </div>

            {/* Hero Section */}
            <div className="relative w-full bg-white border-b border-slate-100 py-16 md:py-24 mb-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-bid-green/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6 italic">
                            Infrastructure Ready
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9] text-slate-900">
                            BidAlert <br /><span className="text-bid-greenhover">Hosting</span>
                        </h1>
                        <p className="text-slate-600 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
                            Reliable Website, Hosting, Domain & Server Management Services
                            for local businesses in Guntur.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <Link href="/contact" className="px-10 py-5 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-lg flex items-center gap-3">
                                CHECK AVAILABILITY
                                <Globe size={20} />
                            </Link>
                        </div>
                    </MotionDiv>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">

                {/* Service Overview */}
                <section className="mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white p-12 md:p-20 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-bid-green/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />
                        <div className="relative z-10">
                            <div className="w-16 h-1 bg-bid-green mb-8 rounded-full" />
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">Complete Managed <br /><span className="text-bid-greenhover">Digital Infrastructure</span></h2>
                            <p className="text-lg font-medium text-slate-500 mb-10 leading-relaxed">
                                Instead of buying domain from one company, hosting from another, and website from someone else, we provide complete managed digital infrastructure under one roof.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {["Domain Registration", "Shared Website Hosting", "Business Email Hosting", "VPS / Cloud Hosting", "SSL Security", "Backup & Recovery", "Server Maintenance", "Hosting Migration"].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-700">
                                        <CheckCircle2 size={18} className="text-bid-green" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:border-bid-green transition-all text-center">
                                <Cpu size={40} className="mb-6 text-bid-green mx-auto" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Primary Server</p>
                                <p className="text-base font-black text-slate-900 uppercase">E48+ (G4)</p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:border-bid-green transition-all text-center">
                                <Network size={40} className="mb-6 text-bid-green mx-auto" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Network Speed</p>
                                <p className="text-base font-black text-slate-900 uppercase">Ultra-Fast</p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:border-bid-green transition-all text-center">
                                <ShieldAlert size={40} className="mb-6 text-bid-green mx-auto" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Security</p>
                                <p className="text-base font-black text-slate-900 uppercase">Enterprise</p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:border-bid-green transition-all text-center">
                                <Monitor size={40} className="mb-6 text-bid-green mx-auto" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Support</p>
                                <p className="text-base font-black text-slate-900 uppercase">Local-Guntur</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Domain Pricing */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Domain <span className="text-bid-greenhover">Pricing</span></h2>
                        <p className="text-slate-500 font-bold mt-4 uppercase text-[10px] tracking-widest">Register your identity today</p>
                    </div>
                    <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Domain Extension</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">1st Year Price</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Renewal Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {domainPricing.map((d, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-10 py-6 font-black text-slate-900">{d.type}</td>
                                        <td className="px-10 py-6 font-black text-bid-greenhover">{d.firstYear}</td>
                                        <td className="px-10 py-6 text-slate-500 font-bold">{d.renewal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-8 bg-slate-50/50 border-t border-slate-50 text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Includes: Hosting Setup, DNS Mapping, SSL Integration & Guntur-Local Support</p>
                        </div>
                    </div>
                </section>

                {/* Hosting Plans */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Website <span className="text-bid-greenhover">Hosting</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {hostingPlans.map((plan, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`bg-white p-10 rounded-[3rem] border ${plan.recommended ? 'border-bid-green ring-4 ring-bid-green/5 scale-105 z-10 shadow-2xl relative' : 'border-slate-100 shadow-sm'} flex flex-col`}
                            >
                                {plan.recommended && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bid-green text-bid-dark text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter whitespace-nowrap">Highly Recommended</div>}
                                <div className="mb-8">
                                    <h3 className="text-lg font-black uppercase mb-1 tracking-tight text-slate-900">{plan.name}</h3>
                                    <p className="text-2xl font-black text-bid-greenhover">{plan.price}</p>
                                    <p className="text-[10px] text-slate-400 font-bold italic">or {plan.monthly}</p>
                                </div>
                                <p className="text-slate-500 text-[10px] font-bold mb-8 uppercase leading-tight h-8">{plan.bestFor}</p>
                                <div className="space-y-3 mb-10 pt-6 border-t border-slate-50 flex-grow">
                                    {plan.features.map((f, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                                            <CheckCircle2 size={14} className="text-bid-green shrink-0" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                                <Link href="/contact" className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all block text-center ${plan.recommended ? 'bg-bid-green text-bid-dark shadow-xl shadow-bid-green/20' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'}`}>Select Plan</Link>
                            </MotionDiv>
                        ))}
                    </div>
                </section>

                {/* VPS Hosting */}
                <section className="mb-24 bg-slate-900 p-12 md:p-20 rounded-[4rem] border border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bid-green/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Managed <span className="text-bid-green">VPS Hosting</span></h2>
                        <p className="text-slate-400 font-bold mt-4 uppercase text-[10px] tracking-widest">Powered by Virtual Server E48+ G4 Infrastructure</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {vpsPlans.map((vps, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] hover:border-bid-green/30 transition-all flex flex-col group">
                                <div className="mb-8">
                                    <h3 className="text-xl font-black uppercase mb-1 tracking-tight text-white group-hover:text-bid-green transition-colors">{vps.name}</h3>
                                    <p className="text-3xl font-black text-bid-green">{vps.price}</p>
                                    <p className="text-[10px] text-slate-500 font-bold italic tracking-widest uppercase">{vps.annual}</p>
                                </div>
                                <div className="space-y-4 mb-10 pt-6 border-t border-white/5 flex-grow">
                                    {vps.features.map((f, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                            <Zap size={14} className="text-bid-green shrink-0" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                                <Link href="/contact" className="w-full py-4 bg-white/10 text-white rounded-2xl border border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-bid-green hover:text-bid-dark hover:border-bid-green transition-all block text-center">Get Managed VPS</Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Email Plans & Security */}
                <section className="mb-24 grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div>
                        <div className="flex items-center gap-4 mb-12">
                            <div className="bg-bid-green p-4 rounded-2xl text-bid-dark">
                                <Mail size={32} />
                            </div>
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Business <span className="text-bid-greenhover">Email</span></h2>
                        </div>
                        <div className="space-y-4">
                            {emailPlans.map((email, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm hover:border-bid-green transition-all">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-bid-greenhover mb-1">{email.name}</p>
                                        <h4 className="text-lg font-black text-slate-900 uppercase italic">{email.count}</h4>
                                        <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">{email.storage}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-slate-900">{email.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-4 mb-12">
                            <div className="bg-slate-900 p-4 rounded-2xl text-bid-green">
                                <Lock size={32} />
                            </div>
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Security <span className="text-bid-greenhover">& Add-ons</span></h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {addOns.map((add, i) => (
                                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-bid-green transition-all shadow-sm">
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 truncate">{add.service}</p>
                                    <p className="text-base font-black text-slate-900 italic tracking-tighter">{add.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bundle Packages */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">Bundled <span className="text-bid-greenhover">Packages</span></h2>
                        <p className="text-slate-500 font-bold mt-4 uppercase text-[10px] tracking-widest">Optimized for Guntur Local Businesses</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {bundles.map((bundle, i) => (
                            <div key={i} className="bg-white flex flex-col md:flex-row rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                                <div className="md:w-1/3 bg-slate-900 p-10 italic flex flex-col justify-center text-center md:text-left">
                                    <h4 className="text-bid-green text-sm font-black uppercase tracking-widest mb-2">{bundle.name}</h4>
                                    <p className="text-white text-3xl font-black mb-4">{bundle.price}</p>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight">{bundle.target}</p>
                                </div>
                                <div className="md:w-2/3 p-10 flex flex-col justify-center">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                        {bundle.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                                                <Star size={12} className="text-bid-green fill-bid-green" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/contact" className="mt-8 text-bid-greenhover text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                        Activate Plan <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Local Advantage Section */}
                <section className="mb-24 py-20 bg-bid-green rounded-[4rem] text-bid-dark relative overflow-hidden shadow-2xl shadow-bid-green/10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="container mx-auto px-12 max-w-6xl relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-[0.8]">The Guntur <br /><span className="italic font-normal">Advantage</span></h2>
                            <p className="text-lg font-black uppercase tracking-widest opacity-80">Local support from your trusted team</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-bid-dark/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <MapPin size={32} />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight mb-4">Native Support</h3>
                                <p className="font-bold text-sm opacity-90 mb-4 leading-relaxed">Direct support in Telugu / English. WhatsApp support for instant issue resolution.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-bid-dark/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Briefcase size={32} />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight mb-4">Total Package</h3>
                                <p className="font-bold text-sm opacity-90 mb-4 leading-relaxed">One-point solution: domain + hosting + website + maintenance. No third-party confusion.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-bid-dark/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Headphones size={32} />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight mb-4">Zero Wait-Time</h3>
                                <p className="font-bold text-sm opacity-90 mb-4 leading-relaxed">No foreign support tickets or long queues. Talk directly to our Guntur technical team.</p>
                            </div>
                        </div>
                        <div className="mt-20 p-10 bg-bid-dark rounded-[3rem] text-center max-w-4xl mx-auto border border-white/10">
                            <p className="text-white text-lg md:text-2xl font-black italic tracking-tight italic opacity-90">
                                "Instead of buying domain from one company, hosting from another, and website from someone else, we provide complete managed digital infrastructure under one roof."
                            </p>
                        </div>
                    </div>
                </section>

                {/* Final Pitch / Strategy Card */}
                <section className="mb-24">
                    <div className="max-w-6xl mx-auto bg-white p-12 md:p-24 rounded-[4.5rem] border border-slate-100 shadow-2xl text-center flex flex-col items-center">
                        <Award size={64} className="text-bid-green mb-8" />
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-8 max-w-4xl">
                            Ready to Become Your <br /><span className="text-bid-greenhover italic font-normal">Technology Partner</span>
                        </h2>
                        <p className="text-lg md:text-xl font-medium text-slate-500 max-w-3xl leading-relaxed mb-12">
                            With local support from Guntur and our managed VPS environment powered by <span className="text-slate-900 font-black">Virtual Server E48+ (G4)</span>, we ensure performance, reliability, and long-term technical support for your business growth.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Domain Starts</p>
                                <p className="text-2xl font-black text-slate-900">₹1,299<span className="text-xs">/yr</span></p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Hosting Starts</p>
                                <p className="text-2xl font-black text-slate-900">₹2,999<span className="text-xs">/yr</span></p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Business Email</p>
                                <p className="text-2xl font-black text-slate-900">₹1,999<span className="text-xs">/yr</span></p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative">
                    <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center border border-slate-800 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-bid-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10 leading-tight">
                            Activate Your <br /><span className="text-bid-green italic font-normal">Digital Power</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
                            <Link href="/contact" className="px-14 py-6 bg-bid-green text-bid-dark font-black rounded-2xl hover:scale-105 transition-all shadow-lg flex items-center gap-4 text-xl uppercase tracking-widest">
                                GET STARTED
                                <ArrowRight size={24} />
                            </Link>
                            <a href="mailto:support@bidalert.in" className="text-slate-400 font-black tracking-[0.3em] text-[10px] hover:text-white transition-all uppercase underline underline-offset-8 decoration-bid-green/40">support@bidalert.in</a>
                        </div>
                    </div>
                </section>

            </div>

            <style jsx global>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
