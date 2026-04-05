'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Search, Loader2 } from 'lucide-react';

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

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/blogs');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch blog posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredPosts = posts.filter(post => {
        const isPublished = (post as any).status !== 'draft';
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase());
        return isPublished && matchesSearch;
    });

    const categories = ["All Topics", ...new Set(posts.map(post => post.category))];

    const getPlaceholderImage = (id: number) => {
        const curatedIds = [
            '1450101496223-f298948a0869',
            '1460925895917-afdab827c52f',
            '1504384308090-c894fdcc538d',
            '1454165205732-7a5ee224a0d9',
            '1486406146926-c627a92ad1ab',
            '1551434678-e076c223a692',
            '1507679799987-c73774586594',
            '1542744094-24638eff58bb'
        ];
        const selectedId = curatedIds[id % curatedIds.length];
        return `https://images.unsplash.com/photo-${selectedId}?auto=format&fit=crop&w=800&q=80`;
    };

    return (
        <div className="bg-white min-h-screen pb-16 overflow-x-hidden">
            {/* Page Header */}
            <div className="bg-[#0a0f1c] text-white py-16 mb-12 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">BidAlert Insights</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
                        Latest news, expert tips, and in-depth guides to help you master the world of government tenders.
                    </p>
                </div>
                {/* Decorative Elements — pointer-events-none so they don't cause overflow scrollbar */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
            </div>

            <div className="container mx-auto px-4">
                {/* Search — shown on mobile above grid */}
                <div className="lg:hidden mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Keywords, categories..."
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-500 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <main className="w-full lg:w-2/3 min-w-0">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Insights...</p>
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="bg-gray-50 rounded-3xl p-12 text-center border border-gray-100">
                                <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="text-gray-300" size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">No Articles Found</h3>
                                <p className="text-gray-500">Try adjusting your search or check back later for new content.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {filteredPosts.map((post, idx) => (
                                    <article
                                        key={post.id}
                                        className={`group bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col ${idx === 0 ? 'sm:col-span-2' : ''}`}
                                    >
                                        <div className={`${idx === 0 ? 'h-56 sm:h-72' : 'h-48'} overflow-hidden relative flex-shrink-0`}>
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                                                    {post.category}
                                                </span>
                                            </div>
                                            <img
                                                src={post.image_url || getPlaceholderImage(post.id)}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 sm:p-8 flex-1 flex flex-col">
                                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                                            </div>
                                            <h4 className={`${idx === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'} font-black text-gray-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors`}>
                                                <Link href={`/blog/${post.id}`}>{post.title}</Link>
                                            </h4>
                                            <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                            <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-sm font-black text-emerald-600 hover:text-emerald-700 transition">
                                                READ ARTICLE <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </main>

                    {/* Sidebar — hidden on mobile (shown via inline search above) */}
                    <aside className="hidden lg:block lg:w-1/3 space-y-8 flex-shrink-0">
                        {/* Search Widget */}
                        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                            <h4 className="font-black text-lg text-gray-900 mb-6 uppercase tracking-tight">Search Insights</h4>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Keywords, categories..."
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-500 transition-all font-medium"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* Newsletter Widget */}
                        <div className="bg-[#0a0f1c] p-10 rounded-[40px] text-white text-center relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                    <ArrowRight className="text-white -rotate-45" size={32} />
                                </div>
                                <h4 className="font-black text-2xl mb-3">Stay Ahead</h4>
                                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                    Get the latest tender opportunities and expert guides delivered to your inbox weekly.
                                </p>
                                <input type="email" placeholder="Your email" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                                <button className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                                    SUBSCRIBE NOW
                                </button>
                            </div>
                        </div>

                        {/* Categories Widget */}
                        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                            <h4 className="font-black text-lg text-gray-900 mb-6 uppercase tracking-tight">Categories</h4>
                            <div className="space-y-3">
                                {categories.map((cat, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center group cursor-pointer p-3 hover:bg-emerald-50 rounded-2xl transition-all"
                                        onClick={() => setSearchQuery(cat === 'All Topics' ? '' : cat)}
                                    >
                                        <span className={`font-bold transition-colors ${searchQuery === cat ? 'text-emerald-600' : 'text-gray-600 group-hover:text-emerald-600'}`}>
                                            {cat}
                                        </span>
                                        <ArrowRight size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
