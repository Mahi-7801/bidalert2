'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings, Building2, Truck, Pickaxe, Zap, Wifi,
    DollarSign, Users, Monitor, Calendar, Shield, Shirt,
    Smartphone, Beaker, Cog, Sofa, TestTube, ArrowUpRight
} from 'lucide-react';

export default function CategoriesSection() {
    const [activeTab, setActiveTab] = useState('work');

    const workCategories = [
        { name: 'Mechanical', icon: Settings, link: '/tenders?q=Mechanical' },
        { name: 'Civil', icon: Building2, link: '/tenders?q=Civil' },
        { name: 'Construction', icon: Cog, link: '/tenders?q=Construction' },
        { name: 'Transportation', icon: Truck, link: '/tenders?q=Transportation' },
        { name: 'Coal & Mining', icon: Pickaxe, link: '/tenders?q=Coal,Mining' },
        { name: 'Electrical', icon: Zap, link: '/tenders?q=Electrical' },
    ];

    const serviceCategories = [
        { name: 'Telecom', icon: Wifi, link: '/tenders?q=Telecom' },
        { name: 'Financial', icon: DollarSign, link: '/tenders?q=Financial' },
        { name: 'Consultancy', icon: Users, link: '/tenders?q=Consultancy' },
        { name: 'IT & Software', icon: Monitor, link: '/tenders?q=IT,Software,Computer' },
        { name: 'Event Mgmt', icon: Calendar, link: '/tenders?q=Event' },
        { name: 'Security', icon: Shield, link: '/tenders?q=Security' },
    ];

    const productCategories = [
        { name: 'Textile', icon: Shirt, link: '/tenders?q=Textile' },
        { name: 'Electronics', icon: Smartphone, link: '/tenders?q=Electronics,Electronic' },
        { name: 'Medical', icon: Beaker, link: '/tenders?q=Medical' },
        { name: 'Machinery', icon: Settings, link: '/tenders?q=Machinery' },
        { name: 'Furniture', icon: Sofa, link: '/tenders?q=Furniture' },
        { name: 'Chemical', icon: TestTube, link: '/tenders?q=Chemical' },
    ];

    const getCurrentCategories = () => {
        switch (activeTab) {
            case 'work': return workCategories;
            case 'service': return serviceCategories;
            case 'product': return productCategories;
            default: return workCategories;
        }
    };

    const tabs = [
        { id: 'work', label: 'Works' },
        { id: 'service', label: 'Services' },
        { id: 'product', label: 'Products' }
    ];

    return (
        <section className="py-12 sm:py-20 bg-[#F1F7FF] relative overflow-hidden">
            {/* Soft Ambient Radials */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-3 sm:px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-16">
                    <motion.h2
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-4 sm:mb-8 tracking-tighter"
                    >
                        Sector <span className="text-emerald-500">Intelligence</span>
                    </motion.h2>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-base sm:text-xl font-medium leading-relaxed max-w-3xl mx-auto px-2 sm:px-0"
                    >
                        Explore the industry's most granular procurement data across 100+ specialized sectors.
                    </motion.p>
                </div>

                {/* Refined Tab Switcher */}
                <div className="flex justify-center mb-8 sm:mb-16">
                    <div className="inline-flex p-1 sm:p-1.5 bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-6 sm:px-14 py-2.5 sm:py-4 rounded-[1.2rem] sm:rounded-[1.5rem] text-[10px] sm:text-sm font-black transition-all duration-300 uppercase tracking-[0.15em] sm:tracking-[0.2em] ${activeTab === tab.id
                                    ? 'text-white'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        // @ts-ignore
                                        layoutId="activeTabSelection"
                                        className="absolute inset-0 bg-slate-900 rounded-[1.5rem] shadow-xl shadow-slate-900/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-8">
                    <AnimatePresence mode="wait">
                        {getCurrentCategories().map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <motion.div
                                    key={`${activeTab}-${category.name}`}
                                    // @ts-ignore
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <Link
                                        href={category.link}
                                        className="group block bg-white h-28 sm:h-48 rounded-xl sm:rounded-[2.5rem] p-3 sm:p-6 border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:border-emerald-500/20 transition-all duration-500 flex flex-col items-center justify-center text-center relative overflow-hidden active:scale-[0.98]"
                                    >
                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500" />

                                        <div className="mb-2 sm:mb-4 relative">
                                            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-emerald-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-500 shadow-sm border border-emerald-500/10">
                                                <Icon size={18} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
                                            </div>
                                        </div>

                                        <h3 className="font-black text-slate-900 text-[7px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.25em] group-hover:text-emerald-500 transition-colors leading-tight">
                                            {category.name}
                                        </h3>

                                        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500 hidden sm:block">
                                            <ArrowUpRight size={24} className="text-emerald-500" />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <motion.div
                    // @ts-ignore
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 sm:mt-24"
                >
                    <Link href="/tenders" className="inline-flex items-center gap-3 sm:gap-6 bg-slate-900 text-white hover:bg-emerald-500 px-8 sm:px-14 py-4 sm:py-6 rounded-xl sm:rounded-[2rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all group active:scale-95 shadow-2xl shadow-slate-900/10 hover:shadow-emerald-500/20">
                        Enter Intelligence Hub
                        <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={3} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
