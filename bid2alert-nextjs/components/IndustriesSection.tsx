'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function IndustriesSection() {
    const [activeTab, setActiveTab] = useState('works');

    const tabs = [
        { id: 'works', label: 'Works' },
        { id: 'services', label: 'Services' },
        { id: 'products', label: 'Products' }
    ];

    const industries = {
        works: [
            { name: 'Mechanical', image: '/sectors/mechanical.png', color: 'from-blue-500 to-cyan-600', href: '/tenders?q=Mechanical' },
            { name: 'Civil', image: '/sectors/civil.png', color: 'from-emerald-500 to-teal-600', href: '/tenders?q=Civil' },
            { name: 'Construction', image: '/sectors/construction.png', color: 'from-orange-500 to-red-600', href: '/tenders?q=Construction' },
            { name: 'Transportation', image: '/sectors/transportation.png', color: 'from-purple-500 to-pink-600', href: '/tenders?q=Transportation' },
            { name: 'Coal & Mining', image: '/sectors/mining.png', color: 'from-slate-600 to-slate-800', href: '/tenders?q=Coal,Mining' },
            { name: 'Electrical', image: '/sectors/electrical.png', color: 'from-yellow-500 to-orange-600', href: '/tenders?q=Electrical' }
        ],
        services: [
            { name: 'Consulting', image: '/sectors/consulting.png', color: 'from-indigo-500 to-purple-600', href: '/tenders?q=Consulting' },
            { name: 'Maintenance', image: '/sectors/maintenance.png', color: 'from-green-500 to-emerald-600', href: '/tenders?q=Maintenance' },
            { name: 'Security', image: '/sectors/security.png', color: 'from-red-500 to-rose-600', href: '/tenders?q=Security' },
            { name: 'Cleaning', image: '/sectors/cleaning.png', color: 'from-cyan-500 to-blue-600', href: '/tenders?q=Cleaning' },
            { name: 'Catering', image: '/sectors/catering.png', color: 'from-pink-500 to-rose-600', href: '/tenders?q=Catering' },
            { name: 'IT Services', image: '/sectors/it_services.png', color: 'from-violet-500 to-purple-600', href: '/tenders?q=IT,Software,Computer' }
        ],
        products: [
            { name: 'Equipment', image: '/sectors/equipment.png', color: 'from-slate-500 to-slate-700', href: '/tenders?q=Equipment' },
            { name: 'Machinery', image: '/sectors/machinery.png', color: 'from-orange-500 to-amber-600', href: '/tenders?q=Machinery' },
            { name: 'Furniture', image: '/sectors/furniture.png', color: 'from-amber-800 to-orange-950', href: '/tenders?q=Furniture' },
            { name: 'Stationery', image: '/sectors/stationery.png', color: 'from-blue-500 to-indigo-600', href: '/tenders?q=Stationery' },
            { name: 'Vehicles', image: '/sectors/vehicles.png', color: 'from-red-500 to-orange-600', href: '/tenders?q=Vehicle,Automobile' },
            { name: 'Electronics', image: '/sectors/electronics.png', color: 'from-purple-500 to-indigo-600', href: '/tenders?q=Electronics,Electronic' }
        ]
    };

    const currentIndustries = industries[activeTab as keyof typeof industries];

    return (
        <section className="py-10 sm:py-16 bg-[#F8FAFC] relative overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-bid-green/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-3 sm:px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
                    <motion.h2
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tighter"
                    >
                        Sector <span className="text-transparent bg-clip-text bg-gradient-to-r from-bid-greenhover to-emerald-600">Intelligence</span>
                    </motion.h2>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-sm sm:text-lg font-medium px-2 sm:px-0"
                    >
                        Explore the industry's most granular procurement data across 100+ specialized sectors.
                    </motion.p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-10">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-[10px] sm:text-sm uppercase tracking-wider transition-all ${activeTab === tab.id
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border-2 border-slate-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Industries Grid */}
                <motion.div
                    key={activeTab}
                    // @ts-ignore
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-[1530px] mx-auto mb-10 sm:mb-14"
                >
                    {currentIndustries.map((industry, index) => (
                        <motion.div
                            key={index}
                            // @ts-ignore
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={industry.href}
                                className="group block bg-white border-2 border-slate-100 p-2.5 sm:p-4 rounded-2xl hover:border-bid-green/30 transition-all duration-300 hover:shadow-xl hover:shadow-bid-green/5 text-center"
                            >
                                {/* Image Container */}
                                <div className="relative w-full aspect-square mx-auto mb-3 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-all duration-500">
                                    <Image
                                        src={industry.image}
                                        alt={industry.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${industry.color} group-hover:opacity-0 transition-opacity`} />
                                </div>

                                {/* Name */}
                                <h4 className="font-black text-[10px] sm:text-[13px] text-slate-900 uppercase tracking-tight group-hover:text-bid-greenhover transition-colors leading-tight">
                                    {industry.name}
                                </h4>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Button */}
                <div className="text-center">
                    <Link
                        href="/tender-industries"
                        className="inline-flex items-center gap-2 sm:gap-3 bg-slate-900 text-white hover:bg-bid-greenhover px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-sm uppercase tracking-wider transition-all group active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-bid-green/20"
                    >
                        View All Sectors
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
