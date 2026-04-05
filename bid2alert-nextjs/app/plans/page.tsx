'use client';

import { Suspense, useState } from 'react';
import { Check, X, Shield, Clock, Award, Star, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';

function PlansContent() {
    const { user, isAuthenticated, openLogin, refreshUser } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handlePayment = async (plan: any) => {
        if (!isAuthenticated) {
            openLogin();
            return;
        }

        const amount = parseInt(plan.price.replace(/,/g, ''));

        setLoadingPlan(plan.name);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token');

            if (amount === 0) {
                // Handle free subscription
                const response = await axios.post(`${apiUrl}/api/payments/free-subscription`, {
                    planName: plan.name
                }, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.success) {
                    await refreshUser();
                    alert("Subscription successful! You now have access to premium features.");
                    router.push(callbackUrl);
                }
                return;
            }

            if (isNaN(amount)) {
                return;
            }

            const { data: order } = await axios.post(`${apiUrl}/api/payments/create-order`, {
                amount,
                planName: plan.name,
                userId: user?.id
            });

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "BidAlert",
                description: `Subscription for ${plan.name} plan`,
                order_id: order.id,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await axios.post(`${apiUrl}/api/payments/verify-payment`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verifyRes.data.success) {
                            await refreshUser();
                            alert("Payment Successful! Your subscription is now active.");
                            router.push(callbackUrl);
                        }
                    } catch (err) {
                        console.error("Verification failed", err);
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: {
                    color: "#4ade80",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment error", error);
            alert("Failed to initiate payment. Please try again.");
        } finally {
            setLoadingPlan(null);
        }
    };

    const mainFeatures = [
        'Web Access',
        'Email Alerts',
        'Bidding Guidance',
        '24/7 Support',
        'SMS Alerts'
    ];

    const plans = [
        {
            name: 'Basic',
            price: '1,500',
            duration: '1 month',
            features: [true, false, false, false, false]
        },
        {
            name: 'Standard',
            price: '3,500',
            duration: '3 months',
            features: [true, true, false, false, true]
        },
        {
            name: 'Diamond',
            price: '7,500',
            duration: '6 months',
            features: [true, true, false, false, true]
        },
        {
            name: 'Premium',
            price: '12,500',
            duration: '12 months',
            popular: true,
            features: [true, true, true, true, true]
        }
    ];

    return (
        <section className="relative bg-[#F0F9FF] overflow-hidden py-12 sm:py-20 lg:py-28 font-sans selection:bg-bid-green selection:text-bid-dark border-b border-blue-100">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none" />

            <div className="relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 sm:mb-24">
                        <span className="bg-bid-green/20 text-bid-green px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold mb-4 inline-block uppercase tracking-[0.2em] border border-bid-green/30">
                            PRICING PLANS
                        </span>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight max-w-4xl mx-auto leading-tight text-slate-900">
                            Choose the Right Plan for Your <span className="text-bid-greenhover">Business</span>
                        </h1>
                        <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto">
                            Start with a 7-day free trial. Upgrade anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-[1530px] mx-auto items-center">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-[2rem] border transition-transform transition-shadow duration-300 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col ${plan.popular
                                    ? 'border-bid-green ring-1 ring-bid-green py-10 scale-105 z-20 shadow-2xl'
                                    : 'border-blue-100 p-8 shadow-sm'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bid-green text-bid-dark px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                        <Star size={12} fill="currentColor" /> Most Popular
                                    </div>
                                )}

                                <div className={`${plan.popular ? 'px-8 pb-8' : ''}`}>
                                    <div className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">{plan.name}</div>
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="text-3xl sm:text-5xl font-black text-slate-900">₹{plan.price}</span>
                                        <span className="text-slate-400 font-bold text-xs sm:text-sm">/-</span>
                                    </div>
                                    <div className="text-slate-500 font-medium text-sm mb-8">{plan.duration}</div>

                                    <div className="space-y-4 mb-10 text-left">
                                        {mainFeatures.map((feature, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <span className={`text-sm font-medium transition-colors ${plan.features[idx] ? 'text-slate-700' : 'text-slate-300'}`}>
                                                    {feature}
                                                </span>
                                                {plan.features[idx] ? (
                                                    <div className="bg-bid-green/20 p-1 rounded-full">
                                                        <Check className="text-bid-green" size={14} strokeWidth={3} />
                                                    </div>
                                                ) : (
                                                    <div className="bg-red-500/10 p-1 rounded-full">
                                                        <X className="text-red-500/60" size={14} strokeWidth={3} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handlePayment(plan)}
                                        disabled={loadingPlan === plan.name}
                                        className={`w-full py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${plan.popular
                                            ? 'bg-bid-green text-bid-dark'
                                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                            } ${loadingPlan === plan.name ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                        {loadingPlan === plan.name ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" /> Processing...
                                            </>
                                        ) : 'Select Plan'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1530px] mx-auto">
                        {/* AP MSME Card */}
                        <div className="bg-white border border-blue-100 p-5 sm:p-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 rounded-2xl sm:rounded-[2.5rem] shadow-sm">
                            <div className="flex-1 text-center sm:text-left">
                                <h4 className="text-lg sm:text-2xl font-black uppercase mb-2 sm:mb-4 tracking-tight text-slate-900">AP MSME</h4>
                                <div className="space-y-2.5 inline-block text-left">
                                    {[
                                        'Web Access',
                                        'Email Alerts',
                                        'Bidding Guidance',
                                        '24/7 Support',
                                        'SMS Alerts'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-slate-600 font-bold text-xs">
                                            <div className="w-1.5 h-1.5 bg-bid-green rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center sm:text-right px-6 sm:border-l border-blue-100">
                                <div className="text-3xl sm:text-4xl font-black mb-1 whitespace-nowrap text-slate-900">FREE<span className="text-base opacity-40">/-</span></div>
                                <div className="text-blue-600 font-bold text-[9px] uppercase tracking-widest mb-6">12 months</div>
                                <button
                                    onClick={() => handlePayment({ name: 'AP MSME', price: '0' })}
                                    className="bg-bid-green text-bid-dark px-6 py-2.5 rounded-full font-black uppercase text-[9px] tracking-widest hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto">
                                    Register Now
                                </button>
                            </div>
                        </div>

                        {/* Pay-Per-Tender Card */}
                        <div className="bg-white border border-blue-100 p-5 sm:p-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 rounded-2xl sm:rounded-[2.5rem] shadow-sm">
                            <div className="flex-1 text-center sm:text-left">
                                <h4 className="text-lg sm:text-2xl font-black uppercase mb-2 sm:mb-4 tracking-tight text-slate-900">Pay-Per-Tender</h4>
                                <div className="space-y-2.5 inline-block text-left">
                                    {[
                                        'Tender Applying',
                                        'Complete Documentation',
                                        'Dedicated Support Manager',
                                        'SMS Alerts'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-slate-600 font-bold text-xs">
                                            <div className="w-1.5 h-1.5 bg-bid-green rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center sm:text-right px-6 sm:border-l border-blue-100">
                                <div className="text-3xl sm:text-4xl font-black mb-1 whitespace-nowrap text-slate-900">₹1,999<span className="text-base opacity-40">/-</span></div>
                                <div className="text-blue-600 font-bold text-[9px] uppercase tracking-widest mb-6">per tender</div>
                                <button
                                    onClick={() => handlePayment({ name: 'Pay-Per-Tender', price: '1,999' })}
                                    className="bg-bid-green text-bid-dark px-6 py-2.5 rounded-full font-black uppercase text-[9px] tracking-widest hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 border-t border-blue-100 pt-16">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                { icon: Shield, title: 'Complete Guidance', desc: 'Expert help at every step' },
                                { icon: Award, title: 'Value for Money', desc: 'Premium features, fair pricing' },
                                { icon: Clock, title: 'End-to-End Support', desc: 'Round the clock assistance' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center text-center group transition-all duration-300">
                                    <div className="w-14 h-14 bg-white rounded-2xl border border-blue-100 shadow-sm flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 group-hover:shadow-[0_10px_20px_rgba(37,99,235,0.2)]">
                                        <item.icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={24} />
                                    </div>
                                    <h5 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-1">{item.title}</h5>
                                    <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function PlansPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PlansContent />
        </Suspense>
    );
}
