'use client';

import { motion } from 'framer-motion';
import { RotateCcw, AlertCircle, CheckCircle2, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function RefundPage() {
    return (
        <div className="bg-gray-50 min-h-screen overflow-x-hidden">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                            <RotateCcw className="text-red-500" size={24} />
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-bid-dark uppercase tracking-tighter">
                            Refund <span className="text-bid-green">& Cancellation</span>
                        </h1>
                    </div>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Our commitment to transparency and fairness</p>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-16">
                    <div className="prose prose-slate max-w-none space-y-12">

                        <section>
                            <h2 className="text-2xl font-black text-bid-dark mb-4 uppercase tracking-tight flex items-center gap-3">
                                <CreditCard size={20} className="text-bid-green" /> Subscription Cancellations
                            </h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                You can cancel your subscription at any time through your User Dashboard.
                                Upon cancellation, you will continue to have access to our services until the
                                end of your current billing cycle.
                            </p>
                        </section>

                        <section className="p-8 bg-amber-50 rounded-2xl border border-amber-100">
                            <h3 className="text-xl font-bold mb-4 text-amber-900 flex items-center gap-2">
                                <AlertCircle size={20} /> Policy on Refunds
                            </h3>
                            <p className="text-amber-800 font-medium leading-relaxed">
                                Due to the nature of digital information services, we generally do not offer refunds
                                once a subscription has been activated and used. We offer free trial previews and
                                basic access so users can evaluate our platform before committing to a paid plan.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-bid-dark mb-4 uppercase tracking-tight">
                                Exceptional Circumstances
                            </h2>
                            <p className="text-gray-600 leading-relaxed font-medium mb-6">
                                We may consider refund requests on a case-by-case basis under the following circumstances:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "Technical Issues", desc: "Proven persistent technical failure on our part that prevents service access." },
                                    { title: "Duplicate Charge", desc: "Accidental multiple payments for the same service period." },
                                    { title: "Unauthorized Payment", desc: "Verified unauthorized use of your payment method." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <CheckCircle2 className="text-bid-green shrink-0 mt-1" size={18} />
                                        <div>
                                            <span className="block font-black text-bid-dark uppercase text-xs tracking-wider">{item.title}</span>
                                            <span className="text-gray-500 text-sm font-medium">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-bid-dark mb-4 uppercase tracking-tight">Process for Refund</h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                To request a refund, please email <span className="text-bid-green">billing@bidalert.in</span> with
                                your transaction ID and reason for request. Approved refunds are processed back to the
                                original payment method within 7-10 working days.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-gray-100">
                            <Link href="/contact" className="block w-full text-center py-5 bg-bid-dark text-white font-black rounded-xl uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-lg">
                                CONTACT BILLING SUPPORT
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
