'use client';

import { useState, useEffect } from 'react';
import {
    Plus, X, Edit, Trash2, Search, FileText,
    CheckCircle, AlertTriangle, MessageSquare, Image as ImageIcon,
    Loader2, MoreVertical
} from 'lucide-react';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    status: string;
    image_url: string;
    created_at: string;
}

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'News',
        author: 'Admin',
        status: 'published',
        image_url: ''
    });
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            if (Array.isArray(data)) {
                setPosts(data);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenCreate = () => {
        setEditingPost(null);
        setFormData({ title: '', excerpt: '', content: '', category: 'News', author: 'Admin', status: 'published', image_url: '' });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            author: post.author,
            status: post.status || 'published',
            image_url: post.image_url || ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingPost ? `/api/blogs/${editingPost.id}` : '/api/blogs';
        const method = editingPost ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchPosts();
            } else {
                alert('Save failed');
            }
        } catch (error) {
            console.error('Error saving blog', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this article?')) return;
        setIsDeleting(id);
        try {
            const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Delete error', error);
        } finally {
            setIsDeleting(null);
        }
    };

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingImage(true);
        const uploadData = new FormData();
        uploadData.append('image', file);

        try {
            const res = await fetch('/api/blogs/upload-image', {
                method: 'POST',
                body: uploadData
            });
            const data = await res.json();
            if (res.ok) {
                setFormData(prev => ({ ...prev, image_url: data.imageUrl }));
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Image upload error:', error);
            alert('Upload error');
        } finally {
            setIsUploadingImage(false);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 lg:p-10 bg-[#f8fafc] min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Blog & Insights</h1>
                    <p className="text-sm text-gray-500 font-medium">Manage articles, news and guides published on the platform.</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="bg-[#0a0f1c] text-white px-6 py-3 rounded-2xl hover:bg-emerald-600 transition-all font-bold flex items-center justify-center gap-2 shadow-xl shadow-black/10 active:scale-95"
                >
                    <Plus size={20} /> <span className="whitespace-nowrap">Create New Article</span>
                </button>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                {/* Search Bar */}
                <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading Database Content...</span>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="py-24 text-center">
                        <div className="bg-gray-100 w-20 h-20 rounded-[32px] flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <FileText size={40} />
                        </div>
                        <h3 className="text-xl font-black text-gray-800">No Content Found</h3>
                        <p className="text-sm text-gray-500 max-w-xs mx-auto mt-2">
                            {searchQuery ? 'Try matching keywords instead.' : "You haven't published any articles yet. Start sharing value with your users today."}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left min-w-[900px]">
                            <thead className="bg-gray-50 text-[10px] uppercase font-black tracking-widest text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5">Article Details</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5 text-center">Published Date</th>
                                    <th className="px-8 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-emerald-50/20 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 group-hover:bg-emerald-100 transition-colors">
                                                    {post.image_url ? (
                                                        <img src={post.image_url} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="text-gray-300 group-hover:text-emerald-500" size={20} />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 line-clamp-1 max-w-[300px] mb-1 group-hover:text-emerald-700 transition-colors">{post.title}</div>
                                                    <div className="text-[11px] text-gray-400 font-medium">by {post.author}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="text-sm font-bold text-gray-700">{new Date(post.created_at).toLocaleDateString()}</div>
                                            <div className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">
                                                {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight shadow-sm border ${post.status === 'published'
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100/50'
                                                : 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-100/50'
                                                }`}>
                                                {post.status || 'published'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                <button
                                                    onClick={() => handleOpenEdit(post)}
                                                    className="p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    disabled={isDeleting === post.id}
                                                    className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    {isDeleting === post.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-[#0a0f1c]/80 backdrop-blur-md z-[100] flex items-center justify-center p-2 sm:p-4">
                    <div className="bg-white rounded-[24px] sm:rounded-[40px] shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-6 sm:p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="p-3 sm:p-4 bg-emerald-500 text-white rounded-[18px] sm:rounded-[24px] shadow-lg shadow-emerald-500/20">
                                    <MessageSquare size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{editingPost ? 'Edit Article' : 'Create New Article'}</h2>
                                    <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 sm:mt-1">Publish insightful content for your users</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-2 sm:p-3 hover:bg-gray-100 rounded-full">
                                <X size={24} className="sm:w-7 sm:h-7" />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-5 sm:p-10 custom-scrollbar">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Article Title</label>
                                        <input
                                            type="text" required
                                            placeholder="Enter a compelling title..."
                                            className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[20px] text-sm font-bold text-gray-800 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all placeholder:text-gray-300"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Category</label>
                                        <select
                                            className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[20px] text-sm font-bold text-gray-800 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option>News</option>
                                            <option>Guide</option>
                                            <option>Update</option>
                                            <option>Compliance</option>
                                            <option>Tips</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Author Name</label>
                                        <input
                                            type="text" required
                                            className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[20px] text-sm font-bold text-gray-800 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all"
                                            value={formData.author}
                                            onChange={e => setFormData({ ...formData, author: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Status</label>
                                        <select
                                            className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[20px] text-sm font-bold text-gray-800 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
                                            value={formData.status}
                                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="published">Published</option>
                                            <option value="draft">Draft</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Feature Image</label>
                                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                                        <div className={`w-full sm:w-48 h-32 rounded-3xl overflow-hidden bg-gray-50 border-2 border-dashed flex items-center justify-center transition-all ${formData.image_url ? 'border-emerald-200 bg-emerald-50/10' : 'border-gray-100'}`}>
                                            {formData.image_url ? (
                                                <div className="relative w-full h-full group/preview">
                                                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                                                        className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity font-black text-[10px] uppercase tracking-widest"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center p-4">
                                                    <ImageIcon className="mx-auto text-gray-200 mb-2" size={24} />
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Dimensions<br />1200 x 630</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleUploadImage}
                                                    className="hidden"
                                                    id="blog-image-upload"
                                                    disabled={isUploadingImage}
                                                />
                                                <label
                                                    htmlFor="blog-image-upload"
                                                    className={`inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-700 cursor-pointer hover:bg-emerald-50 hover:border-emerald-100 hover:text-emerald-700 transition-all active:scale-95 ${isUploadingImage ? 'opacity-50 pointer-events-none' : ''}`}
                                                >
                                                    {isUploadingImage ? <Loader2 size={16} className="animate-spin text-emerald-500" /> : <Plus size={16} />}
                                                    {formData.image_url ? 'Change Image' : 'Select Hero Image'}
                                                </label>
                                            </div>
                                            <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-xs">
                                                Recommended size: 1200x630px. Max file size: 2MB. Supports JPG, PNG and WebP formats.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Short Excerpt</label>
                                    <textarea
                                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[24px] text-sm font-medium text-gray-800 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all h-24 resize-none leading-relaxed"
                                        placeholder="Brief summary of the article..."
                                        value={formData.excerpt}
                                        onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Full Article Content</label>
                                    <textarea
                                        required
                                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[32px] text-sm font-medium text-gray-800 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all h-48 resize-none leading-relaxed"
                                        placeholder="Write your article content here..."
                                        value={formData.content}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-6 sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-50 mt-4 -mx-5 sm:-mx-10 px-5 sm:px-10 pb-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50 rounded-[20px] transition-colors"
                                    >
                                        Discard Changes
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-2 px-12 py-4 bg-[#0a0f1c] text-white font-black text-[11px] uppercase tracking-widest rounded-[20px] shadow-xl shadow-black/20 hover:bg-emerald-500 active:scale-95 transition-all w-full sm:w-auto"
                                    >
                                        {editingPost ? 'Update Article' : 'Publish Article'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
