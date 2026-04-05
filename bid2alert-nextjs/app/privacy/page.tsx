'use client';

import { ShieldCheck, Calendar, Lock, Eye, Database, Share2, Cookie, UserCheck, Mail, Globe } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
    const sections = [
        {
            icon: <Database size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "1. Information We Collect",
            content: "We collect information you provide directly when you create an account, subscribe to our services, or use our bid analysis tools. This includes your name, email address, phone number, company/business name, GST number (optional), and preferred tender categories. We also collect usage data such as pages visited, features used, and search queries to improve our services."
        },
        {
            icon: <Eye size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "2. How We Use Your Information",
            content: "We use collected information to: (a) provide, maintain, and continuously improve our services; (b) send you personalized tender alerts based on your keyword and category preferences; (c) process subscription payments; (d) communicate important updates, new features, and relevant offers; and (e) ensure platform security and prevent fraud. We do not sell your personal data to third parties."
        },
        {
            icon: <Lock size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "3. Data Security",
            content: "We implement industry-standard security measures to protect your personal information, including SSL/TLS encryption for data in transit, hashed password storage, and access control policies. Our infrastructure is hosted on secure cloud servers. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security. We encourage you to use a strong, unique password for your account."
        },
        {
            icon: <Cookie size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "4. Cookies & Tracking",
            content: "We use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and analyze site traffic. Essential cookies are required for the site to function correctly. Analytics cookies help us understand how users interact with BidAlert. You can manage or disable non-essential cookies through your browser settings, though this may affect some functionality."
        },
        {
            icon: <Share2 size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "5. Third-Party Services",
            content: "We use trusted third-party services to operate our platform, including Razorpay for payment processing, Fast2SMS and Twilio for SMS notifications, and Google Analytics for usage insights. These services operate under their own privacy policies. We recommend reviewing their policies. We share only the minimum data necessary with these providers to deliver our services."
        },
        {
            icon: <Mail size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "6. Email Communications",
            content: "By registering on BidAlert, you consent to receiving transactional emails (account confirmations, password resets), daily or weekly tender alert emails based on your filters, and occasional promotional communication about new features or plans. You can unsubscribe from promotional emails at any time via the link in each email or through your account settings."
        },
        {
            icon: <UserCheck size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "7. Your Data Rights",
            content: "You have the right to: (a) access the personal data we hold about you; (b) request correction of inaccurate data; (c) request deletion of your account and associated data; (d) object to certain processing of your information; and (e) data portability. To exercise these rights, please contact us at privacy@bidalert.in. We will respond within 30 days."
        },
        {
            icon: <Globe size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "8. Policy Updates",
            content: "We may update this Privacy Policy from time to time to reflect changes in law, technology, or our services. When we make significant changes, we will notify registered users via email and display a notice on the platform. Your continued use of BidAlert after any changes constitutes your acceptance of the updated policy."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen overflow-x-hidden">
            {/* Header Section */}
            <header className="bg-white border-b border-gray-200 py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-bid-green/10 flex items-center justify-center flex-shrink-0">
                            <ShieldCheck className="text-bid-green" size={24} />
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-bid-dark uppercase tracking-tighter">
                            Privacy <span className="text-bid-green">Policy</span>
                        </h1>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} /> Last Updated: February 2024
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock size={16} /> Secure & Compliant
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <main className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-10 md:p-16">
                    <p className="text-lg text-gray-600 leading-relaxed mb-12">
                        At BidAlert, we take your privacy seriously. This policy explains how we collect, use, protect,
                        and share your information when you use our platform.
                    </p>

                    <div className="space-y-10">
                        {sections.map((section, i) => (
                            <section key={i} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                                <div className="flex items-start gap-3 mb-3">
                                    {section.icon}
                                    <h2 className="text-xl sm:text-2xl font-black text-bid-dark uppercase tracking-tight">
                                        {section.title}
                                    </h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed font-medium pl-8">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>

                    <div className="mt-16 p-6 sm:p-8 bg-blue-50 rounded-2xl border border-blue-100">
                        <h3 className="text-xl font-bold mb-4 text-blue-900">Your Data Protection Rights</h3>
                        <p className="text-blue-800 mb-6 font-medium">
                            Under applicable data protection regulations, you have the right to access, rectify, or delete your personal data.
                            Contact us to exercise these rights — we'll respond within 30 days.
                        </p>
                        <Link href="/contact" className="inline-block px-8 py-3 bg-bid-dark text-white font-black rounded-full uppercase tracking-widest text-sm hover:bg-gray-800 transition-all shadow-lg">
                            Send Request
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
