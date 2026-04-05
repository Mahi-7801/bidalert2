'use client';

import { ShieldCheck, Calendar, FileText, Scale, Lock, AlertCircle, CreditCard, Ban } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
    const sections = [
        {
            icon: <Scale size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "1. Acceptance of Terms",
            content: "By accessing and using BidAlert.in (the 'Site' or 'Service'), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services. Continued use of the platform constitutes acceptance of any updated terms."
        },
        {
            icon: <FileText size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "2. Description of Service",
            content: "BidAlert provides a platform for government tender information, bid analysis tools, and registration services. We aggregate data from official government portals including GEM, eProcurement, CPPP, IREPS, and others. While we strive for 100% accuracy, we do not guarantee the completeness or timeliness of information as it is sourced from third-party government portals. Users must verify critical tender details directly on the respective official portals before submitting any bids."
        },
        {
            icon: <Lock size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "3. User Accounts",
            content: "You are responsible for maintaining the confidentiality of your account credentials. Any activity occurring under your account is your sole responsibility. You must notify us immediately of any unauthorized use of your account. We reserve the right to suspend or permanently terminate accounts that violate our usage policies, engage in fraudulent activity, or misuse our platform in any way."
        },
        {
            icon: <ShieldCheck size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "4. Intellectual Property",
            content: "All content, features, and functionality on this Site — including text, graphics, logos, icons, images, data compilations, and software — are the exclusive property of BidAlert and are protected under Indian and international copyright, trademark, and intellectual property laws. You may not reproduce, distribute, modify, create derivative works, or commercially exploit any content without prior written permission from BidAlert."
        },
        {
            icon: <CreditCard size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "5. Subscription & Payments",
            content: "Subscription fees are billed in advance on a monthly or annual basis depending on your chosen plan. All payments are processed securely via Razorpay. Refunds are handled as per our Refund Policy. BidAlert reserves the right to modify pricing with at least 14 days' prior notice to active subscribers via email. Failure to pay may result in downgrading or suspension of your account to the free tier."
        },
        {
            icon: <AlertCircle size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "6. Limitation of Liability",
            content: "BidAlert shall not be liable for any indirect, incidental, special, punitive, or consequential damages resulting from the use or inability to use our services, including but not limited to loss of business opportunities, profits, or data. Our total aggregate liability for any claims arising from these terms shall not exceed the amount paid by you to BidAlert during the three months preceding the claim."
        },
        {
            icon: <Ban size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "7. Prohibited Conduct",
            content: "You agree not to: (a) use automated bots, scrapers, or crawlers to extract data from BidAlert without written permission; (b) attempt to gain unauthorized access to our systems; (c) reproduce, redistribute, or resell our tender data or alerts to third parties; (d) use the platform for any unlawful purpose; or (e) post false or misleading information through our services."
        },
        {
            icon: <FileText size={20} className="text-bid-green flex-shrink-0 mt-1" />,
            title: "8. Governing Law",
            content: "These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen overflow-x-hidden">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-bid-green/10 flex items-center justify-center flex-shrink-0">
                            <Scale className="text-bid-green" size={24} />
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-bid-dark uppercase tracking-tighter">
                            Terms of <span className="text-bid-green">Service</span>
                        </h1>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} /> Last Updated: February 2024
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText size={16} /> Version 1.2
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-10 md:p-16">
                    <p className="text-lg text-gray-600 leading-relaxed mb-12">
                        Please read these terms carefully before using our platform. These terms govern your access to
                        and use of BidAlert services and applications.
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

                    <div className="mt-16 p-6 sm:p-8 bg-bid-dark rounded-2xl text-white">
                        <h3 className="text-xl font-bold mb-4">Questions about our Terms?</h3>
                        <p className="text-gray-400 mb-6 font-medium">
                            If you have any questions regarding these Terms of Service, please contact our legal team.
                        </p>
                        <Link href="/contact" className="inline-block px-8 py-3 bg-bid-green text-bid-dark font-black rounded-full uppercase tracking-widest text-sm hover:brightness-110 transition-all">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
