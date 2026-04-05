'use client';

import { motion } from 'framer-motion';
import { FileText, MessageSquare, Search, Sparkles } from 'lucide-react';

export default function FeaturesSection() {
    const features = [
        {
            icon: FileText,
            title: 'Comprehensive Database',
            description: 'Access 150,000+ live tenders from central, state, and private organizations across India.',
            color: 'blue'
        },
        {
            icon: MessageSquare,
            title: 'Instant Notifications',
            description: 'Never miss an opportunity with real-time email alerts for relevant tenders.',
            color: 'green'
        },
        {
            icon: Search,
            title: 'Advanced Search',
            description: 'Find the perfect tenders using powerful filters by category, location, value, and deadline.',
            color: 'purple'
        },
        {
            icon: Sparkles,
            title: 'BidGPT AI Assistant',
            description: 'Get intelligent insights, document analysis, and bid recommendations powered by AI.',
            color: 'orange'
        }
    ];

    const colorClasses = {
        blue: 'bg-blue-50 text-blue-500',
        green: 'bg-emerald-50 text-emerald-500',
        purple: 'bg-violet-50 text-violet-500',
        orange: 'bg-amber-50 text-amber-500'
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="relative z-30 -mt-10 sm:-mt-12 pb-16 bg-[#F1F7FF]">
            <div className="container mx-auto px-4">
                <motion.div
                    // @ts-ignore
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                // @ts-ignore
                                variants={itemVariants}
                                onClick={feature.title === 'BidGPT AI Assistant' ? () => window.dispatchEvent(new CustomEvent('open-bidgpt')) : undefined}
                                className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group ${feature.title === 'BidGPT AI Assistant' ? 'cursor-pointer' : 'cursor-default'} hover:border-emerald-500/20 active:scale-95`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 shadow-sm ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                                    <Icon size={24} strokeWidth={2} />
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight group-hover:text-emerald-500 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed group-hover:text-slate-700 transition-colors">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
