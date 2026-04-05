'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Bell, CreditCard, FileText, Settings, Shield, Zap, Globe, Building } from 'lucide-react';
import Link from 'next/link';

// @ts-ignore
const MotionDiv = motion.div as any;

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

interface FAQCategory {
    label: string;
    icon: React.ReactNode;
    color: string;
    faqs: FAQ[];
}

const faqCategories: FAQCategory[] = [
    {
        label: "General",
        icon: <HelpCircle size={18} />,
        color: "bg-bid-green/10 text-bid-green border-bid-green/20",
        faqs: [
            {
                id: 1,
                question: "What is BidAlert?",
                answer: "BidAlert is a comprehensive platform for government tenders and business opportunities across India. We provide real-time tender alerts, advanced AI-powered bid analysis, documentation support, and registration services to help businesses of all sizes successfully secure government contracts from portals like GEM, eProcurement, CPPP, IREPS, and many more."
            },
            {
                id: 2,
                question: "Who is BidAlert designed for?",
                answer: "BidAlert is built for anyone who wants to participate in government procurement — from individual freelancers and MSMEs to mid-sized companies and large enterprises. Whether you are a manufacturer, service provider, consultant, or contractor, BidAlert helps you discover relevant tenders and bid effectively."
            },
            {
                id: 3,
                question: "Is BidAlert free to use?",
                answer: "Yes! BidAlert offers a free tier that gives you access to basic tender listings and limited alerts. For advanced features like unlimited alerts, AI Bid Analyser, keyword filters, priority notifications, and IPR/registration services, we offer affordable paid plans starting at very competitive pricing. You can explore our Plans page for full details."
            },
            {
                id: 4,
                question: "What government portals does BidAlert cover?",
                answer: "BidAlert aggregates tenders from over 25+ official government portals including Government e-Marketplace (GEM), Central Public Procurement Portal (CPPP), Indian Railways e-Procurement System (IREPS), various state government eProcurement portals, MSTC, BEL, BHEL, ONGC, HAL, and many more. We also cover global tenders from UN, World Bank, ADB, and other international bodies."
            }
        ]
    },
    {
        label: "Alerts & Notifications",
        icon: <Bell size={18} />,
        color: "bg-orange-50 text-orange-600 border-orange-200",
        faqs: [
            {
                id: 5,
                question: "How do I get tender alerts?",
                answer: "Once you register and subscribe to a plan, you can set up personalized filters based on keywords, state/location, category, estimated value, and tender type. Our system scans government portals daily and sends you matching tender alerts via email. Premium subscribers also receive WhatsApp and SMS notifications."
            },
            {
                id: 6,
                question: "How often are tender alerts sent?",
                answer: "Alerts are sent daily — typically once in the morning. For urgent or high-value tenders with close deadlines, we may send additional notifications. You can customize the frequency and timing of your alerts from your account dashboard under 'Alert Preferences'."
            },
            {
                id: 7,
                question: "Can I filter alerts by state or category?",
                answer: "Absolutely. BidAlert offers granular filtering by: State/Union Territory, Tender Category (Works, Goods, Services), Department/Ministry, Estimated Value Range, Bid Submission Deadline, and Custom Keywords. You can set multiple filters and save them as 'Profiles' to quickly switch between different alert strategies."
            },
            {
                id: 8,
                question: "Will I miss tenders that appeared before I signed up?",
                answer: "No. Our database includes historical tenders going back several months. After signing up, you can search our full archive to review past tenders, analyze bid patterns, and study winning bid details to improve your future submissions."
            }
        ]
    },
    {
        label: "Bid Analyser",
        icon: <Zap size={18} />,
        color: "bg-purple-50 text-purple-600 border-purple-200",
        faqs: [
            {
                id: 9,
                question: "What is Bid Analyser?",
                answer: "Bid Analyser is our proprietary AI tool powered by Google Gemini 2.5 Flash. It reads complex tender documents (PDF, DOCX, TXT) and instantly extracts key information including: project scope, eligibility criteria, EMD amounts, submission deadlines, required documents, technical specifications, and financial requirements — saving you hours of manual document review."
            },
            {
                id: 10,
                question: "What file formats does Bid Analyser support?",
                answer: "Bid Analyser supports PDF, DOCX, DOC, and TXT files. For best results, upload the original tender document directly downloaded from the government portal. The AI processes documents up to 50MB in size. Scanned image-only PDFs may have reduced accuracy compared to text-based PDFs."
            },
            {
                id: 11,
                question: "Can I translate the analysis into regional languages?",
                answer: "Yes! After analysis, you can switch the language of the results using the language dropdown. We support Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Gujarati, Bengali, Punjabi, and Urdu — all using AI-powered translation to ensure terminology accuracy."
            },
            {
                id: 12,
                question: "Can I download the analysis as a PDF?",
                answer: "Yes. After the analysis is complete, click the 'Save PDF' button in the top-right corner of the results. A professionally formatted PDF report will be downloaded to your device, including the executive summary, stakeholder details, financial requirements, submission timeline, and eligibility information."
            },
            {
                id: 13,
                question: "Is Bid Analyser available for free users?",
                answer: "Free users get access to the Standard Analysis mode which provides basic document extraction. The Advanced Bid Analysis Pro — featuring Smart Compliance Matrix, Risk Scoring Engine, Competitive Benchmarking, and Price Optimization AI — is available exclusively to Basic, Standard, Diamond, and Premium plan subscribers."
            }
        ]
    },
    {
        label: "Plans & Billing",
        icon: <CreditCard size={18} />,
        color: "bg-blue-50 text-blue-600 border-blue-200",
        faqs: [
            {
                id: 14,
                question: "Can I cancel my subscription?",
                answer: "Yes, you can cancel your subscription at any time through your dashboard under 'Account Settings → Subscription'. Your plan will remain active until the end of the current billing cycle. Please refer to our Refund Policy page for details on eligibility for refunds."
            },
            {
                id: 15,
                question: "What payment methods are accepted?",
                answer: "We accept all major payment methods via Razorpay, including: Credit Cards (Visa, Mastercard, Amex), Debit Cards, Net Banking, UPI (GPay, PhonePe, Paytm), and Wallets. All transactions are secured with 256-bit SSL encryption."
            },
            {
                id: 16,
                question: "Is there an annual billing discount?",
                answer: "Yes! When you choose annual billing, you save up to 20% compared to paying month-to-month. The discount is applied automatically at checkout when you select the 'Annual' billing cycle. Annual subscriptions are billed as a single upfront payment."
            },
            {
                id: 17,
                question: "Can I switch plans mid-subscription?",
                answer: "Yes. You can upgrade your plan at any time. The upgrade takes effect immediately and you'll be charged a prorated amount for the remainder of the billing cycle. Downgrading is also possible, and the new plan will take effect at the start of the next billing cycle."
            }
        ]
    },
    {
        label: "Data & Security",
        icon: <Shield size={18} />,
        color: "bg-emerald-50 text-emerald-600 border-emerald-200",
        faqs: [
            {
                id: 18,
                question: "Is the tender data verified?",
                answer: "Yes. All tender data on BidAlert is sourced directly from official government portals. Our system cross-references information across multiple sources for accuracy and flags any discrepancies. However, we always recommend verifying critical details (especially deadlines and EMD amounts) directly on the respective government portal before making any submission."
            },
            {
                id: 19,
                question: "How is my personal data protected?",
                answer: "BidAlert employs industry-standard security practices: all data is encrypted in transit (TLS 1.3), passwords are hashed using bcrypt, and payment data is never stored on our servers (handled entirely by Razorpay, a PCI-DSS compliant processor). We perform regular security audits and do not sell your data to third parties under any circumstances."
            },
            {
                id: 20,
                question: "Can I delete my account and data?",
                answer: "Yes. You have the right to request complete deletion of your account and all associated personal data. To do this, go to 'Account Settings → Delete Account' or email us at privacy@bidalert.in. We process deletion requests within 7 business days. Please note that deletion is irreversible."
            }
        ]
    },
    {
        label: "Global Tenders",
        icon: <Globe size={18} />,
        color: "bg-sky-50 text-sky-600 border-sky-200",
        faqs: [
            {
                id: 21,
                question: "Does BidAlert cover international tenders?",
                answer: "Yes! BidAlert's Global Tenders section covers procurement opportunities from major multilateral organizations including the United Nations (UN), World Bank, Asian Development Bank (ADB), African Development Bank (AfDB), European Bank for Reconstruction and Development (EBRD), and many bilateral aid agencies. These represent billions of dollars in international project opportunities."
            },
            {
                id: 22,
                question: "How do I apply for a global tender?",
                answer: "Global tenders listed on BidAlert include direct links to the official procurement portal of the respective organization. You will need to register on those portals separately, meet their specific eligibility criteria (which often include country of origin requirements and financial thresholds), and follow their individual submission processes. BidAlert helps you discover and analyze these opportunities quickly."
            }
        ]
    },
    {
        label: "IPR & Registrations",
        icon: <Building size={18} />,
        color: "bg-rose-50 text-rose-600 border-rose-200",
        faqs: [
            {
                id: 23,
                question: "What registration services does BidAlert offer?",
                answer: "BidAlert offers comprehensive registration and compliance services to help businesses become tender-eligible, including: MSME/Udyam Registration, GST Registration, ISO Certification, Trademark Registration, Patent Filing, Copyright Registration, IEC (Import-Export Code), PF & ESI Registration, Startup India Recognition, and more."
            },
            {
                id: 24,
                question: "Why do I need MSME registration for tenders?",
                answer: "MSME registration provides significant advantages in government procurement: (a) Reservation of certain tenders exclusively for MSMEs; (b) Exemption from EMD (Earnest Money Deposit) requirements in many tenders; (c) Price preference of up to 15% over non-MSMEs in open tenders; (d) Special schemes and credit facilities from government banks. BidAlert's team can help you obtain your Udyam/MSME certificate quickly and correctly."
            },
            {
                id: 25,
                question: "How long does the registration process take?",
                answer: "Processing times vary by service: MSME/Udyam Registration (same day), GST Registration (3-7 working days), Trademark Registration (18-24 months for full registration, certificate of filing immediately), ISO Certification (2-4 weeks), Patent Filing (acknowledgment within 48 hours, full grant takes 2-5 years). Our team guides you through every step."
            }
        ]
    }
];

export default function FAQPage() {
    const [activeId, setActiveId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const allFaqs = faqCategories.flatMap(cat => cat.faqs);

    const filteredFaqs = (() => {
        if (activeCategory === 'All') {
            return allFaqs;
        } else {
            const cat = faqCategories.find(c => c.label === activeCategory);
            return cat ? cat.faqs : allFaqs;
        }
    })();

    return (
        <div className="bg-white min-h-screen overflow-x-hidden">
            {/* Header */}
            <section className="bg-bid-dark py-20 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-bid-green/5 rounded-full blur-3xl -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-32 -mb-32" />
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-bid-green/10 border border-bid-green/20 text-bid-green px-5 py-1.5 rounded-full text-[11px] font-black tracking-widest mb-6">
                        <HelpCircle size={14} />
                        HELP CENTER
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
                        Frequently Asked <span className="text-bid-green">Questions</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-medium">
                        Everything you need to know about BidAlert — from getting started to advanced features.
                    </p>


                </div>
            </section>

            {/* Category Filter Pills */}
            <div className="bg-gray-50 border-b border-gray-100 sticky top-0 z-20">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                        <button
                            onClick={() => setActiveCategory('All')}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${activeCategory === 'All' ? 'bg-bid-dark text-white border-bid-dark' : 'bg-white text-gray-500 border-gray-200 hover:border-bid-green hover:text-bid-green'}`}
                        >
                            All Topics
                        </button>
                        {faqCategories.map((cat) => (
                            <button
                                key={cat.label}
                                onClick={() => setActiveCategory(cat.label)}
                                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${activeCategory === cat.label ? 'bg-bid-dark text-white border-bid-dark' : `bg-white text-gray-500 border-gray-200 hover:border-bid-green hover:text-bid-green`}`}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white border-b border-gray-100 py-4">
                <div className="container mx-auto px-4 max-w-4xl">
                    <p className="text-sm text-gray-500 font-bold">
                        Showing <span className="text-bid-dark">{filteredFaqs.length}</span> question{filteredFaqs.length !== 1 ? 's' : ''} 
                        {activeCategory !== 'All' && <span> in <span className="text-bid-green">{activeCategory}</span></span>}
                    </p>
                </div>
            </div>

            {/* Content */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-3">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="border border-gray-100 rounded-3xl overflow-hidden hover:border-bid-green/30 transition-all shadow-sm hover:shadow-xl hover:shadow-bid-green/5"
                                >
                                    <button
                                        onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                                        className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between gap-4 group"
                                    >
                                        <span className={`text-base sm:text-lg font-black uppercase tracking-tight transition-colors ${activeId === faq.id ? 'text-bid-green' : 'text-bid-dark'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`flex-shrink-0 p-2 rounded-full transition-all ${activeId === faq.id ? 'bg-bid-green text-bid-dark' : 'bg-gray-50 text-gray-400 group-hover:bg-bid-green/10 group-hover:text-bid-green'}`}>
                                            {activeId === faq.id ? <Minus size={18} /> : <Plus size={18} />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {activeId === faq.id && (
                                            <MotionDiv
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-600 font-medium leading-relaxed bg-gray-50/50 border-t border-gray-100 pt-4">
                                                    {faq.answer}
                                                </div>
                                            </MotionDiv>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-3xl">
                                <HelpCircle size={64} className="text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-400 mb-2">No questions found</h3>
                                <p className="text-gray-400 text-sm">Please select a different category to view more FAQs.</p>
                                <button
                                    onClick={() => setActiveCategory('All')}
                                    className="mt-6 px-6 py-3 bg-bid-dark text-white font-black rounded-full text-sm uppercase tracking-widest hover:brightness-110 transition-all"
                                >
                                    View All Topics
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Category Sections (only shown in All view) */}
                    {activeCategory === 'All' && (
                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {faqCategories.map((cat) => (
                                <button
                                    key={cat.label}
                                    onClick={() => setActiveCategory(cat.label)}
                                    className={`group p-5 rounded-2xl border text-left transition-all hover:shadow-lg hover:-translate-y-0.5 ${cat.color}`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        {cat.icon}
                                        <span className="font-black text-sm uppercase tracking-widest">{cat.label}</span>
                                    </div>
                                    <p className="text-xs font-bold opacity-70">{cat.faqs.length} question{cat.faqs.length !== 1 ? 's' : ''}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 border-t border-gray-100 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-16 h-16 bg-bid-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <HelpCircle className="text-bid-green" size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-bid-dark mb-3 uppercase tracking-tight">Still have questions?</h2>
                    <p className="text-gray-500 font-bold text-sm mb-8 max-w-md mx-auto">
                        Our support team is available Monday–Saturday, 9 AM to 6 PM IST. We typically respond within a few hours.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-bid-dark text-white font-black rounded-full hover:brightness-110 transition-all uppercase tracking-widest text-sm shadow-xl">
                            Get In Touch
                        </Link>
                        <Link href="/plans" className="inline-flex items-center gap-2 px-10 py-4 bg-bid-green text-bid-dark font-black rounded-full hover:brightness-110 transition-all uppercase tracking-widest text-sm shadow-xl shadow-bid-green/20">
                            View Plans
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
