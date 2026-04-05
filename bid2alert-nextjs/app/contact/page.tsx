'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${baseUrl}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('Could not connect to server. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-16 sm:pt-24 pb-12 sm:pb-20 overflow-x-hidden">
            <div className="container mx-auto px-3 sm:px-4 max-w-6xl">

                {/* Clean Professional Header */}
                <div className="text-center mb-8 sm:mb-16">
                    <motion.h1
                        // @ts-ignore
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-2 sm:mb-4"
                    >
                        Get in <span className="text-bid-green">Touch</span>
                    </motion.h1>
                    <motion.p
                        // @ts-ignore
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-xs sm:text-base text-slate-500 font-medium max-w-xl mx-auto"
                    >
                        We're here to assist with your business registrations, tender submissions, and international trade compliance.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* Contact Channels */}
                    <div className="lg:col-span-4 space-y-4">
                        {[
                            {
                                icon: Mail,
                                title: "Email Us",
                                value: "support@bidalert.in",
                                sub: "Official Support Channel",
                                href: "mailto:support@bidalert.in"
                            },
                            {
                                icon: Phone,
                                title: "Sales Enquiries",
                                value: "+91 99851 02111",
                                sub: "Tap to call — Sales Team",
                                href: "tel:+919985102111"
                            },
                            {
                                icon: Phone,
                                title: "Technical Support",
                                value: "+91 91063 23130",
                                sub: "Tap to call — Support Team",
                                href: "tel:+919106323130"
                            },
                            {
                                icon: MapPin,
                                title: "Visit Us",
                                value: "Ramannapet 1st Ln, Lakshmipuram",
                                sub: "Naidupet, Guntur, AP 522007",
                                href: undefined
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm flex items-center gap-3 sm:gap-5">
                                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-slate-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-bid-green">
                                    <item.icon size={16} className="sm:w-5 sm:h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{item.title}</h3>
                                    {item.href ? (
                                        <a href={item.href} className="text-sm sm:text-base font-black text-slate-800 hover:text-bid-green transition-colors">{item.value}</a>
                                    ) : (
                                        <p className="text-sm sm:text-base font-black text-slate-800">{item.value}</p>
                                    )}
                                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium uppercase tracking-tight">{item.sub}</p>
                                </div>
                            </div>
                        ))}

                        <div className="bg-slate-900 rounded-xl sm:rounded-[2rem] p-5 sm:p-8 text-white">
                            <h3 className="text-sm sm:text-lg font-black uppercase mb-3 sm:mb-4 flex items-center gap-2">
                                <Clock size={16} className="text-bid-green sm:w-[18px] sm:h-[18px]" />
                                Office Hours
                            </h3>
                            <div className="space-y-2 sm:space-y-3 opacity-80">
                                <div className="flex justify-between text-[10px] sm:text-[11px] font-bold border-b border-white/10 pb-2">
                                    <span>Monday - Friday</span>
                                    <span>09:00 - 19:30</span>
                                </div>
                                <div className="flex justify-between text-[10px] sm:text-[11px] font-bold">
                                    <span>Saturday</span>
                                    <span>09:00 - 21:30</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simple Inquiry Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl sm:rounded-[2.5rem] border border-slate-200 p-5 sm:p-10 shadow-sm h-full">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-bid-green outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-bid-green outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Your Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-bid-green outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Service Required"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-bid-green outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="How can we help?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-bid-green outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-bid-green text-bid-dark py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-105 transition-all shadow-lg shadow-bid-green/10 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? "Sending..." : submitted ? "✅ Inquiry Sent!" : "Submit Inquiry"}
                                    {!isSubmitting && !submitted && <Send size={14} />}
                                </button>
                                {submitted && (
                                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl text-center">
                                        <p className="text-xs font-bold text-green-700">✅ Your inquiry has been received! We'll get back to you within 24 hours.</p>
                                    </div>
                                )}
                                {error && (
                                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-center">
                                        <p className="text-xs font-bold text-red-600">❌ {error}</p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section - Simplified & Colored */}
                <div className="mt-8 sm:mt-12">
                    <div className="rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm bg-white p-1 sm:p-2">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.235613888712!2d80.43133527490949!3d16.3109010844042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a358bc5e8606d4f%3A0x651858cf8fa04c3b!2sBidalert!5e0!3m2!1sen!2sin!4v1767608735121!5m2!1sen!2sin"
                            className="w-full h-[250px] sm:h-[400px] rounded-xl sm:rounded-[2rem]"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
