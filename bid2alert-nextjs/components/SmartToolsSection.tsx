'use client';

import { motion } from 'framer-motion';
import { Upload, MessageCircle, Search, Sparkles, ChevronRight } from 'lucide-react'; // Added ChevronRight import
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SmartToolsSection() {
    const router = useRouter();
    const tools = [
        {
            icon: Upload,
            title: 'Upload documents',
            description: 'Easily upload tender-related documents to streamline your process.',
            color: 'from-blue-500 to-cyan-600'
        },

        {
            icon: Search,
            title: 'Search easily',
            description: 'Quickly find tenders using our advanced search capabilities.',
            color: 'from-purple-500 to-pink-600'
        },
        {
            icon: Sparkles,
            title: 'BidGPT',
            description: 'Use BidGPT for intelligent tender analysis & recommendations.',
            color: 'from-orange-500 to-red-600'
        }
    ];

    return (
        <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bid-green/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-14 max-w-3xl mx-auto">
                    <motion.h2
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        // @ts-ignore
                        whileInView={{ opacity: 1, y: 0 }}
                        // @ts-ignore
                        viewport={{ once: true }}
                        className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tighter"
                    >
                        Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-bid-greenhover to-emerald-600">
                            Smart Tender Tools!
                        </span>
                    </motion.h2>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0, y: 20 }}
                        // @ts-ignore
                        whileInView={{ opacity: 1, y: 0 }}
                        // @ts-ignore
                        viewport={{ once: true }}
                        // @ts-ignore
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-lg font-medium"
                    >
                        Powerful tools designed to make tender management effortless and efficient.
                    </motion.p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
                    {tools.map((tool, i) => (
                        <motion.div
                            key={i}
                            // @ts-ignore
                            initial={{ opacity: 0, y: 30 }}
                            // @ts-ignore
                            whileInView={{ opacity: 1, y: 0 }}
                            // @ts-ignore
                            viewport={{ once: true }}
                            // @ts-ignore
                            transition={{ delay: i * 0.1 }}
                        >
                            {tool.title === 'Upload documents' ? (
                                <Link
                                    href="/upload"
                                    className="group block h-full bg-white border-2 border-slate-100 p-5 rounded-2xl hover:border-bid-green/30 transition-all duration-300 hover:shadow-xl hover:shadow-bid-green/5 text-center"
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <tool.icon size={28} className="text-white" strokeWidth={2.5} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-black text-slate-900 mb-1.5 group-hover:text-bid-greenhover transition-colors">
                                        {tool.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                        {tool.description}
                                    </p>
                                </Link>
                            ) : tool.title === 'BidGPT' ? (
                                <button
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-bidgpt'))}
                                    className="w-full group block h-full bg-white border-2 border-slate-100 p-5 rounded-2xl hover:border-bid-green/30 transition-all duration-300 hover:shadow-xl hover:shadow-bid-green/5 text-center"
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <tool.icon size={28} className="text-white" strokeWidth={2.5} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-black text-slate-900 mb-1.5 group-hover:text-bid-greenhover transition-colors">
                                        {tool.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                        {tool.description}
                                    </p>
                                </button>
                            ) : (
                                <Link
                                    href={tool.title === 'Search easily' ? '/tenders' : '/plans'}
                                    className="group block h-full bg-white border-2 border-slate-100 p-5 rounded-2xl hover:border-bid-green/30 transition-all duration-300 hover:shadow-xl hover:shadow-bid-green/5 text-center"
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <tool.icon size={28} className="text-white" strokeWidth={2.5} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-black text-slate-900 mb-1.5 group-hover:text-bid-greenhover transition-colors">
                                        {tool.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                        {tool.description}
                                    </p>
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-14">
                    <Link
                        href="/plans"
                        className="inline-flex items-center gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-bid-green text-bid-dark hover:bg-bid-greenhover hover:text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:shadow-bid-green/20 active:scale-95 cursor-pointer border-2 border-transparent hover:border-white/20"
                    >
                        View Premium Features & Pricing
                        <ChevronRight size={16} className="sm:w-[18px]" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
