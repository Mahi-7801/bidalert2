'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const DEFAULT_GALLERY = [
    { id: -1, image_path: 'https://images.unsplash.com/photo-1540910419892-f0c74b0e8966?w=800&q=80', image_name: 'Quality Assurance' },
    { id: -2, image_path: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80', image_name: 'Business Strategy' },
    { id: -3, image_path: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', image_name: 'Legal Documentation' },
    { id: -4, image_path: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', image_name: 'Data Analysis' },
];

export default function GallerySection() {
    const [images, setImages] = useState<{ id: number; image_path: string; image_name: string }[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/images');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setImages(data);
                }
            } catch (err) {
                console.error('Failed to fetch gallery images:', err);
            }
        };
        fetchImages();
    }, []);

    const displayImages = images.length > 0 ? images : DEFAULT_GALLERY;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                        Our <span className="text-bid-greenhover">Gallery</span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Explore our latest updates, event highlights, and platform features through our curated image collection.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayImages.map((img, i) => (
                        <MotionDiv
                            key={img.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative aspect-square overflow-hidden rounded-3xl bg-slate-100 shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <img
                                src={img.image_path.startsWith('/uploads') ? img.image_path : img.image_path}
                                alt={img.image_name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white font-bold text-lg">{img.image_name}</p>
                            </div>
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </section>
    );
}
