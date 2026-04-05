'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Loader2, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    image_url?: string;
    created_at: string;
}

export default function BlogPostDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPost();
    }, [resolvedParams.id]);

    const fetchPost = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/blogs/${resolvedParams.id}`);
            if (res.ok) {
                const data = await res.json();
                if (data.status === 'draft') {
                    setPost(null);
                } else {
                    setPost(data);
                }
            }
        } catch (error) {
            console.error('Failed to fetch blog post:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPlaceholderImage = (id: number) => {
        const curatedIds = [
            '1450101496223-f298948a0869', '1460925895917-afdab827c52f',
            '1504384308090-c894fdcc538d', '1454165205732-7a5ee224a0d9',
            '1486406146926-c627a92ad1ab', '1551434678-e076c223a692',
            '1507679799987-c73774586594', '1542744094-24638eff58bb'
        ];
        const selectedId = curatedIds[id % curatedIds.length];
        return `https://images.unsplash.com/photo-${selectedId}?auto=format&fit=crop&w=1200&q=90`;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">Retrieving Intelligence...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <ArrowLeft size={32} />
                </div>
                <h1 className="text-2xl font-black text-gray-900 mb-2">Insight Not Found</h1>
                <p className="text-gray-500 mb-8">The requested article might have been moved or archived.</p>
                <Link href="/blog" className="px-8 py-3 bg-[#0a0f1c] text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all">
                    Return to Library
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header / Hero */}
            <div className="relative h-[40vh] md:h-[60vh] bg-gray-900 flex items-end">
                <div className="absolute inset-0 z-0">
                    <img
                        src={post.image_url || getPlaceholderImage(post.id)}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 pb-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm mb-6 hover:text-white transition-colors">
                        <ArrowLeft size={16} /> BACK TO INSIGHTS
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                            {post.category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl tracking-tight">
                        {post.title}
                    </h1>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-2/3">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-8 py-8 border-y border-gray-100 mb-12">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Written By</p>
                                    <p className="font-bold text-gray-900">{post.author}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="text-emerald-500" size={20} />
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Published</p>
                                    <p className="font-bold text-gray-900">
                                        {new Date(post.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Article Text */}
                        <div className="prose prose-lg prose-emerald max-w-none">
                            <p className="text-xl text-gray-500 font-medium italic mb-10 leading-relaxed border-l-4 border-emerald-500 pl-6">
                                {post.excerpt}
                            </p>
                            <div className="text-gray-700 leading-relaxed space-y-6 text-lg whitespace-pre-wrap">
                                {post.content}
                            </div>
                        </div>

                        {/* Social Share */}
                        <div className="mt-16 pt-8 border-t border-gray-100">
                            <h4 className="font-black text-gray-900 uppercase tracking-tight mb-6">Share this knowledge</h4>
                            <div className="flex gap-4">
                                <button className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-600/20">
                                    <Facebook size={20} />
                                </button>
                                <button className="w-12 h-12 bg-sky-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-sky-500/20">
                                    <Twitter size={20} />
                                </button>
                                <button className="w-12 h-12 bg-blue-700 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-700/20">
                                    <Linkedin size={20} />
                                </button>
                                <button className="w-12 h-12 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <aside className="lg:w-1/3 space-y-12">
                        {/* Summary Widget */}
                        <div className="bg-[#0a0f1c] text-white p-10 rounded-[40px] relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="font-black text-xl mb-4 text-emerald-400">Key Takeaway</h4>
                                <p className="text-gray-400 leading-relaxed text-sm mb-8">
                                    Staying updated with procurement changes is critical for tender success. Explore our dedicated plans to get expert analysis for your specific industry.
                                </p>
                                <Link
                                    href="/plans"
                                    className="w-full inline-block text-center bg-white text-[#0a0f1c] font-black py-4 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl shadow-black/20"
                                >
                                    EXPLORE PREMIUM PLANS
                                </Link>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        {/* Newsletter Tag */}
                        <div className="bg-emerald-50 rounded-[40px] p-10 border border-emerald-100">
                            <h4 className="font-black text-gray-900 text-xl mb-3 tracking-tight">Never Miss an Insight</h4>
                            <p className="text-gray-500 text-sm mb-6 leading-relaxed">Join 5,000+ professionals receiving our weekly procurement intelligence report.</p>
                            <div className="space-y-3">
                                <input type="email" placeholder="Email address" className="w-full px-5 py-3 border border-emerald-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium text-sm" />
                                <button className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                                    JOIN NEWSLETTER
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
