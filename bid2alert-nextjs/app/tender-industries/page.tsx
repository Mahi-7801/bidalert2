'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Leaf, Palette, Briefcase, Laptop, Plane, BookOpen,
    CloudRain, CircleDollarSign, Utensils, Handshake,
    Landmark, Heart, Shield, Wrench, Zap, Trees,
    Satellite, Users, Car, Globe, Trophy, Home,
    RadioTower, Building2, HardHat, Scale
} from 'lucide-react';

const MotionDiv = motion.div as any;

const industries = [
    { name: 'Agriculture Tenders', icon: Leaf, color: 'text-green-600' },
    { name: 'Art & Culture Tenders', icon: Palette, color: 'text-red-600' },
    { name: 'Commerce Tenders', icon: Briefcase, color: 'text-blue-600' },
    { name: 'Communication & IT Tenders', icon: Laptop, color: 'text-purple-600' },
    { name: 'Defence Tenders', icon: Plane, color: 'text-orange-600' },
    { name: 'Education Tenders', icon: BookOpen, color: 'text-blue-700' },
    { name: 'Environment & Forest Tenders', icon: CloudRain, color: 'text-green-500' },
    { name: 'Finance & Taxes Tenders', icon: CircleDollarSign, color: 'text-yellow-600' },
    { name: 'Food & Public Distribution Tenders', icon: Utensils, color: 'text-cyan-600' },
    { name: 'Foreign Affairs Tenders', icon: Handshake, color: 'text-indigo-600' },
    { name: 'Governance & Administration Tenders', icon: Landmark, color: 'text-blue-800' },
    { name: 'Health & Family Welfare Tenders', icon: Heart, color: 'text-pink-600' },
    { name: 'Home Affairs & Enforcement Tenders', icon: Shield, color: 'text-blue-900' },
    { name: 'Other Industries Tenders', icon: Wrench, color: 'text-gray-600' },
    { name: 'Power & Energy Tenders', icon: Zap, color: 'text-yellow-500' },
    { name: 'Rural Tenders', icon: Trees, color: 'text-green-700' },
    { name: 'Science & Technology Tenders', icon: Satellite, color: 'text-cyan-500' },
    { name: 'Social Development Tenders', icon: Users, color: 'text-orange-500' },
    { name: 'Transport Tenders', icon: Car, color: 'text-blue-500' },
    { name: 'Travel & Tourism Tenders', icon: Globe, color: 'text-red-500' },
    { name: 'Youth Sports Tenders', icon: Trophy, color: 'text-orange-700' },
    { name: 'Housing Tenders', icon: Home, color: 'text-purple-700' },
    { name: 'Information & Broadcasting Tenders', icon: RadioTower, color: 'text-green-800' },
    { name: 'Infrastructure Tenders', icon: Building2, color: 'text-yellow-700' },
    { name: 'Labour & Employment Tenders', icon: HardHat, color: 'text-yellow-600' },
    { name: 'Law & Justice Tenders', icon: Scale, color: 'text-blue-900' },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function TenderIndustriesPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Breadcrumb Container */}
            <div className="container mx-auto px-4 pt-2 pb-2 md:pt-3">
                <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 text-sm text-slate-600"
                >
                    <Link href="/" className="hover:text-bid-green transition-colors font-medium text-slate-500">
                        Home
                    </Link>
                    <span className="text-slate-400 mx-1">&gt;</span>
                    <span className="text-slate-900 font-bold">Tenders by Sector/Industry</span>
                </MotionDiv>
            </div>

            {/* Page Header - Full Width Neon Gradient Block */}
            <MotionDiv
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full bg-gradient-to-r from-[#0b4d3c] to-[#10e981] text-white shadow-lg py-6 md:py-8 mb-4 overflow-hidden border-y border-white/5"
            >
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter">
                        Tenders by Industry
                    </h1>
                    <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                        Latest Tenders Information of popular sectors and industries from all over India
                    </p>
                </div>
            </MotionDiv>

            {/* Industries Grid */}
            <div className="container mx-auto px-4 py-4">
                <MotionDiv
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
                >
                    {industries.map((industry, index) => {
                        const Icon = industry.icon;
                        return (
                            <MotionDiv variants={item} key={index}>
                                <Link
                                    href={`/tenders?category=${encodeURIComponent(industry.name.replace(' Tenders', ''))}`}
                                    className="group flex flex-col items-center text-center"
                                >
                                    {/* Icon Container - Large circular container with white bg and subtle shadow */}
                                    <MotionDiv
                                        whileHover={{ y: -5, scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="relative mb-6"
                                    >
                                        <div className={`w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100 group-hover:shadow-xl group-hover:border-bid-greenhover/20 transition-all duration-300`}>
                                            <Icon
                                                size={36}
                                                strokeWidth={1.8}
                                                className={`${industry.color} transition-colors duration-300 group-hover:scale-110`}
                                            />
                                        </div>
                                    </MotionDiv>

                                    {/* Text Label */}
                                    <h3 className="text-gray-900 font-semibold text-base px-2 group-hover:text-bid-greenhover transition-colors duration-200">
                                        {industry.name}
                                    </h3>
                                </Link>
                            </MotionDiv>
                        );
                    })}
                </MotionDiv>
            </div>
        </main >
    );
}
