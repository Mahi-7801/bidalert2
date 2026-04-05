'use client';

import { useState, useEffect } from 'react';
import { Upload, Save, Image as ImageIcon, CheckCircle, AlertCircle, RefreshCw, RotateCcw } from 'lucide-react';

const SLIDE_KEYS = ['hero_bg_1', 'hero_bg_2', 'hero_bg_3', 'hero_bg_4'];
const SLIDE_LABELS = ['Slide 1 (Main)', 'Slide 2', 'Slide 3', 'Slide 4'];

const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
];

export default function AdminSettings() {
    const [slides, setSlides] = useState<{ url: string; file: File | null; preview: string }[]>(
        SLIDE_KEYS.map(() => ({ url: '', file: null, preview: '' }))
    );
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [dbImages, setDbImages] = useState<{ id: number; image_path: string; image_name: string }[]>([]);
    const [isUploadingDb, setIsUploadingDb] = useState(false);

    // Fetch existing settings on load
    useEffect(() => {
        const fetchAll = async () => {
            const results = await Promise.all(
                SLIDE_KEYS.map(key => fetch(`/api/settings/${key}`).then(r => r.json()).catch(() => null))
            );
            setSlides(prev =>
                prev.map((slide, i) => {
                    const data = results[i];
                    if (data?.success && data.value) {
                        const fullUrl = data.value.startsWith('/uploads')
                            ? data.value
                            : data.value;
                        return { ...slide, url: fullUrl, preview: fullUrl };
                    }
                    // Fallback to default in admin preview so they know what is showing
                    return { ...slide, url: '', preview: DEFAULT_IMAGES[i] };
                })
            );
        };

        const fetchDbImages = async () => {
            try {
                const res = await fetch('/api/images');
                const data = await res.json();
                if (Array.isArray(data)) setDbImages(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAll();
        fetchDbImages();
    }, []);

    const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setSlides(prev => prev.map((s, i) =>
                i === index ? { ...s, file, preview: reader.result as string } : s
            ));
        };
        reader.readAsDataURL(file);
    };

    const handleDbFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingDb(true);
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch('/api/admin/images', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setDbImages(prev => [data.image, ...prev]);
                setMessage({ type: 'success', text: '✅ Image stored in database successfully!' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to upload' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Network error during upload' });
        } finally {
            setIsUploadingDb(false);
        }
    };

    const handleDeleteDbImage = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this image from the database?')) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/admin/images/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setDbImages(prev => prev.filter(img => img.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUrlChange = (index: number, value: string) => {
        setSlides(prev => prev.map((s, i) =>
            i === index ? { ...s, url: value, preview: value || DEFAULT_IMAGES[i], file: null } : s
        ));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage({ type: '', text: '' });
        const token = localStorage.getItem('token');

        try {
            // 1. Save individual slide settings (to persist URLs/file paths)
            const slidePaths: string[] = [];
            
            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];
                const key = SLIDE_KEYS[i];
                const formData = new FormData();
                formData.append('key', key);
                
                if (slide.file) {
                    formData.append('image', slide.file);
                } else if (slide.url) {
                    formData.append('value', slide.url);
                } else {
                    continue;
                }

                const res = await fetch('/api/admin/settings', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData
                });
                const data = await res.json();
                if (data.success) {
                    slidePaths.push(data.value);
                }
            }

            // 2. Sync these 4 paths to the 'images' table and set theme to custom
            await fetch('/api/admin/gallery/sync', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    images: slidePaths.map((path, i) => ({ 
                        name: SLIDE_LABELS[i] || `Slide ${i+1}`, 
                        path 
                    }))
                })
            });

            // 3. Refresh local DB images list
            const resImg = await fetch('/api/images');
            const dataImg = await resImg.json();
            if (Array.isArray(dataImg)) setDbImages(dataImg);

            setMessage({ type: 'success', text: '✅ Gallery synced with your 4 slides! Homepage is now showing your custom theme.' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleResetToDefault = async () => {
        if (!window.confirm('This will restore the original professional theme with the default Unsplash images. Are you sure?')) return;
        setIsSaving(true);
        setMessage({ type: '', text: '' });
        const token = localStorage.getItem('token');

        try {
            // 1. Set theme to default in DB
            await fetch('/api/admin/gallery/reset', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // 2. Clear individual slide settings to show empty in admin (falling back to defaults)
            await Promise.all(SLIDE_KEYS.map(key => {
                const formData = new FormData();
                formData.append('key', key);
                formData.append('value', '');
                return fetch('/api/admin/settings', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData
                });
            }));

            // 3. Update local state
            setSlides(SLIDE_KEYS.map((_, i) => ({ url: '', file: null, preview: DEFAULT_IMAGES[i] })));
            
            const resImg = await fetch('/api/images');
            const dataImg = await resImg.json();
            if (Array.isArray(dataImg)) setDbImages(dataImg);

            setMessage({ type: 'success', text: '✅ Default theme restored! The homepage and gallery will now show professional stock images.' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to reset. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
                <p className="text-gray-500 text-sm">Upload up to 4 images for the homepage hero slideshow.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {SLIDE_KEYS.map((key, i) => (
                    <div key={key} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Card Header */}
                        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                            <div className="p-2 bg-bid-green/10 rounded-lg text-bid-green">
                                <ImageIcon size={18} />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-800 text-sm">{SLIDE_LABELS[i]}</h2>
                                <p className="text-xs text-gray-400">{key}</p>
                            </div>
                        </div>

                        <div className="p-4 space-y-3">
                            {/* Preview */}
                            <div className="relative aspect-video w-full bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-200">
                                {slides[i].preview ? (
                                    <img
                                        src={slides[i].preview}
                                        alt={`Slide ${i + 1} preview`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 gap-2">
                                        <ImageIcon size={28} />
                                        <span className="text-xs">No image set</span>
                                    </div>
                                )}
                            </div>

                            {/* URL input */}
                            <input
                                type="text"
                                value={slides[i].url}
                                onChange={e => handleUrlChange(i, e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bid-green outline-none text-xs transition-all"
                                placeholder="Paste image URL or upload a file..."
                            />

                            {/* Reset to Default button */}
                            <button
                                onClick={() => handleUrlChange(i, '')} // Resets to empty URL which triggers fallback preview
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg transition-all border border-gray-200 text-xs font-medium w-full"
                                title="Click Save after resetting to apply changes"
                            >
                                <RotateCcw size={14} />
                                Reset this Slide
                            </button>

                            {/* Upload button */}
                            <label className="flex items-center justify-center gap-2 px-4 py-2 bg-bid-green/10 hover:bg-bid-green/20 text-bid-green rounded-lg cursor-pointer transition-all border border-bid-green/20 text-xs font-semibold w-full">
                                <Upload size={14} />
                                Upload & Replace
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={e => handleFileChange(i, e)}
                                />
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action buttons for Hero Slides */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
                <button
                    onClick={handleResetToDefault}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                    title="Reset all hero slides back to the original default professional images"
                >
                    <RotateCcw size={18} />
                    <span>Reset to Default Theme</span>
                </button>

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-8 py-3 bg-bid-green text-bid-dark font-bold rounded-xl shadow-lg shadow-bid-green/20 hover:shadow-bid-green/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isSaving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                    <span>{isSaving ? 'Saving All...' : 'Save All 4 Slides'}</span>
                </button>
            </div>

            <hr className="border-gray-100 mb-12" />

            {/* NEW SECTION: Database Image Gallery */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Image Database</h1>
                <p className="text-gray-500 text-sm">Upload any image to store it in the dedicated 'images' database table.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-2">Upload New Image</h3>
                        <p className="text-xs text-gray-500 mb-4">Choose a file to store in the SQL 'images' table. These can be used across the site.</p>
                        
                        <label className={`flex items-center justify-center gap-3 px-6 py-4 bg-bid-green/10 text-bid-green hover:bg-bid-green/20 border-2 border-dashed border-bid-green/30 rounded-2xl cursor-pointer transition-all font-bold text-sm ${isUploadingDb ? 'opacity-50 pointer-events-none' : ''}`}>
                            {isUploadingDb ? <RefreshCw className="animate-spin" size={20} /> : <Upload size={20} />}
                            {isUploadingDb ? 'Uploading to DB...' : 'Choose File to Store in Database'}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleDbFileUpload}
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {dbImages.map((img) => (
                    <div key={img.id} className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <img 
                            src={img.image_path.startsWith('/uploads') ? img.image_path : img.image_path} 
                            alt={img.image_name}
                            className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <button 
                                onClick={() => handleDeleteDbImage(img.id)}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                title="Delete from database"
                             >
                                <AlertCircle size={16} />
                             </button>
                        </div>
                        <div className="p-2 border-t border-gray-50">
                            <p className="text-[10px] text-gray-400 truncate font-mono">{img.image_path}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Status message */}
            {message.text && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-sm mb-6 ${message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-100'
                    : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <p>{message.text}</p>
                </div>
            )}

            {/* Festival Tip */}
            <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-xl p-6 flex gap-4">
                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700 shrink-0">
                    <ImageIcon size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-yellow-800 text-sm mb-1">🎉 Festival Time Tip!</h3>
                    <p className="text-yellow-700/80 text-xs leading-relaxed">
                        During festivals (Diwali, Holi, Independence Day etc.), upload themed images to all 4 slots here.
                        Changes reflect instantly across the site for all users — no redeployment needed.
                        Once the festival is over, click <strong>"Reset to Default Theme"</strong> to instantly restore all 4 slides to the original professional look — no manual uploads needed!
                    </p>
                </div>
            </div>
        </div>
    );
}
