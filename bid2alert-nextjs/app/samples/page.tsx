'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, MessageCircle, ChevronRight, Home, FileText, Download, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Cast to any to resolve React 19/Framer Motion v12 type conflicts
const MotionDiv = motion.div as any;

// Array of real scrutinized sample documents
const DOCUMENTS = [
    { id: 'BABID976631', dept: 'Public Works Dept', title: 'Road Construction & Maintenance' },
    { id: 'BAEPR946524', dept: 'IISER Pune', title: 'Brick Work & Augmentation' },
    { id: 'BABID1046109', dept: 'Municipal Corp', title: 'Drainage & Sewage Network' },
    { id: 'BAETE1053864', dept: 'Irrigation Dept', title: 'Canal Lining & Structural' },
    { id: 'BASBI1026565', dept: 'State Bank of India', title: 'Civil & Interior Works' },
    { id: 'BAMAH1103474', dept: 'NHAI India', title: 'Highway Development Phase 1' },
];

export default function SamplesPage() {
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
    const [documents, setDocuments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await fetch('/api/documents');
            if (res.ok) {
                const data = await res.json();
                // Map backend fields to frontend expectations if needed
                const formatted = data.map((doc: any) => ({
                    id: doc.id,
                    title: doc.title,
                    dept: doc.department || 'Verified Tender',
                    path: doc.file_path,
                    type: doc.file_type,
                    size: doc.size_bytes
                }));
                setDocuments(formatted);
            }
        } catch (error) {
            console.error('Failed to fetch documents', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Use fetched documents or fallback to defaults for initial appearance
    const displayDocs = documents.length > 0 ? documents : DOCUMENTS;
    const featuredDoc = displayDocs[0];

    return (
        <div className="bg-white min-h-screen relative">
            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <MotionDiv
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 20 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-bid-dark text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-bid-green/30"
                    >
                        <div className="w-6 h-6 rounded-full bg-bid-green/20 flex items-center justify-center">
                            <Check className="text-bid-green" size={14} />
                        </div>
                        <span className="text-sm font-bold">{notification.message}</span>
                        <button onClick={() => setNotification(null)} className="ml-2 hover:text-bid-green">
                            <X size={14} />
                        </button>
                    </MotionDiv>
                )}
            </AnimatePresence>

            {/* Hero / Banner */}
            <section style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a2d4e 60%, #0d1b2a 100%)' }} className="py-14 relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #00d084 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />
                <div className="container mx-auto px-4 text-center relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-5">
                        <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
                            <Home size={14} /> Home
                        </Link>
                        <ChevronRight size={14} className="text-gray-600" />
                        <span className="text-white font-semibold">Sample Document</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase">
                        Sample <span style={{ color: '#00d084' }}>Document</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Analyze official documents from the latest government bids. Real data, real intelligence, updated in real-time.
                    </p>
                </div>
            </section>

            {/* ─── Scrutinized Sample Tender Document ─── */}
            <section className="py-14 bg-gray-50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-xl font-bold mb-6" style={{ color: '#1a56db' }}>
                        Scrutinized Sample Tender Document:
                    </h2>

                    {/* Document Card with watermark */}
                    <div
                        className="relative bg-white rounded-2xl overflow-hidden shadow-md"
                        style={{ border: '2px solid #93c5fd' }}
                    >
                        {/* BID ALERT Watermark */}
                        <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                            style={{ zIndex: 0 }}
                        >
                            <span
                                style={{
                                    fontSize: '7rem',
                                    fontWeight: 900,
                                    color: 'rgba(0,0,0,0.045)',
                                    transform: 'rotate(-30deg)',
                                    letterSpacing: '0.15em',
                                    userSelect: 'none',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                BID ALERT
                            </span>
                        </div>

                        <div className="relative z-10 p-8 md:p-12">
                            {/* Logo row */}
                            <div className="flex justify-end mb-8">
                                <div
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg"
                                    style={{ background: 'linear-gradient(135deg, #0d1b2a, #1a2d4e)' }}
                                >
                                    <span className="text-white font-black text-lg tracking-tight">bid</span>
                                    <span style={{ color: '#00d084' }} className="font-black text-lg">alert</span>
                                    <span className="text-gray-400 text-xs">.in</span>
                                </div>
                            </div>

                            {/* Detail rows */}
                            <div className="divide-y divide-gray-100">
                                {[
                                    { label: 'Bid alert id', val: 'BAEPR946524' },
                                    { label: 'Tender id', val: '2022_IISRP_712337_1' },
                                    { label: 'Tender number', val: '12/IISER/PUNE/2021-22' },
                                    { label: 'Name of the work', val: 'CONSTRUCTION OF BRICK WORK, PLASTERING, PANELLING, PAINTING AND ALLIED AUGMENTATION WORKS IN CHEMISTRY WING AT MAIN BUILDING, IISER PUNE' },
                                    { label: 'Department name', val: 'Indian Institute of Science Education and Research Pune' },
                                    { label: 'ECV', val: '36,35,000/-' },
                                    { label: 'Contract period', val: '3 months' },
                                    { label: 'EMD', val: '72,700/-' },
                                    { label: 'EMD exemption', val: 'Yes' },
                                    { label: 'Mode of payment', val: 'Offline' },
                                    { label: 'Eligibility criteria', val: '' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row py-4 gap-2">
                                        <div className="md:w-56 font-bold text-gray-800 flex-shrink-0 text-sm">
                                            {item.label}
                                        </div>
                                        <div className="text-gray-700 text-sm leading-relaxed flex-1">
                                            <span className="mr-2 text-gray-400 font-bold">:</span>
                                            {item.val}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Eligibility Points */}
                            <div className="mt-8 space-y-4 text-gray-700 text-sm leading-relaxed">
                                <p>1. The intending bidder must read the terms and condition of NIT carefully. Bidder should submit his bid only if he considers himself eligible and he is in possession of all the required documents.</p>
                                <p>2. Bid documents should be submitted online complete in all respect along with requisite amount of tender fee ( cost of bid documents ). Complete set of tender documents comprising Volume I, II, III has been made available at e-tender portal (URL https://eprocure.gov.in/eprocure/app)</p>
                                <p>3. The bidder would be required to register at e-tender portal (URL https://eprocure.gov.in/eprocure/app) For submission of the bids, the Bidder is required to have digital Signature Certificate (DSC) from one of the authorised Certifying Authorities.</p>
                                <p>4. Information and Instruction for bidders posted on website shall form part of the bid document.</p>
                                <p>5. The bid document consisting of Vol I – Technical bid, Vol II Technical specifications, Vol IIIFinancial Bid (BOQ) and the other terms and conditions of the contract to be complied with and other necessary documents can be seen and downloaded from website (URL https://eprocure.gov.in/eprocure/app) free of cost.</p>
                                <p>6. But the Bid can only be submitted after uploading the mandatory scanned documents such as receipt of online payment towards tender fee, in favour of Director, IISER PUNE, with copies of other required documents as specified in the NIT. The tender fee should be deposited online with IISER PUNE within the period of bid submission as specified in the bid document.</p>
                            </div>
                        </div>
                    </div>

                    {/* Download Button */}
                    <div className="flex justify-center mt-8">
                        <a
                            href={featuredDoc.path || "/sample-tender-docs.zip"}
                            download={featuredDoc.title ? `${featuredDoc.title}.pdf` : "sample-tender-docs.zip"}
                            className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-sm shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
                            style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 100%)' }}
                        >
                            {/* Download icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <span>Download All Sample Documents</span>
                            {/* ZIP badge */}
                            <span
                                className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[11px] font-black tracking-wider"
                                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
                            >
                                .ZIP
                            </span>
                        </a>
                    </div>
                </div>
            </section>



            {/* ─── Sample WhatsApp Alert ─── */}
            <section className="py-14 bg-gray-50">

                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-xl font-bold mb-10" style={{ color: '#7c3aed' }}>
                        Sample WhatsApp Alert:
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        {/* Phone 1 — Welcome Message */}
                        <MotionDiv
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="mx-auto" style={{ maxWidth: 320 }}>
                                <PhoneMockup>
                                    <div className="bg-[#e8f5e9] min-h-full p-3 flex flex-col gap-3">
                                        {/* Incoming bubble 1 */}
                                        <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm max-w-[85%] text-sm leading-relaxed text-gray-800">
                                            <p className="font-semibold text-gray-900 mb-1">Hello! Welcome to &lt; BIDALERT &gt;</p>
                                            <p>We are glad you chose us to provide tender info to you. If you need to know more about your business related tenders please go through the website. Here&apos;s our website :</p>
                                            <p className="text-blue-600 mt-1 break-all text-xs">https://bidalert.in</p>
                                            <p className="mt-1 text-xs">Pricing page : <span className="text-blue-600">https://bidalert.in/pricing</span></p>
                                            <p className="mt-2">Regards Team BIDALERT.in</p>
                                            <p className="font-bold">Bid Quick &amp; Get Quick</p>
                                        </div>
                                        {/* Incoming bubble 2 */}
                                        <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm max-w-[85%] text-sm leading-relaxed text-gray-800">
                                            <p className="font-semibold mb-1">Good Morning Sir/Madam,</p>
                                            <p>Today&apos;s Tender Alert:</p>
                                            <div className="mt-2 border border-gray-200 rounded text-xs overflow-hidden">
                                                <table className="w-full text-xs">
                                                    <tbody>
                                                        {[
                                                            ['Date of Alerts', '08.10.2022'],
                                                            ['Bid alert ID', 'BAEPR946524'],
                                                            ['Tender id', '2022_IISRP...'],
                                                            ['Tender category', 'Refer'],
                                                            ['Name of work', 'Construction...'],
                                                            ['ECV', '36,35,000/-'],
                                                            ['EMD', '72,700/-'],
                                                        ].map(([k, v], i) => (
                                                            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                                <td className="px-1 py-0.5 font-medium text-gray-600 border-r border-gray-200">{k}</td>
                                                                <td className="px-1 py-0.5 text-gray-800">{v}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </PhoneMockup>
                            </div>
                        </MotionDiv>

                        {/* Phone 2 — Tender Table Alert */}
                        <MotionDiv
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="mx-auto" style={{ maxWidth: 320 }}>
                                <PhoneMockup>
                                    <div className="bg-[#e8f5e9] min-h-full p-3 flex flex-col gap-3">
                                        <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm max-w-[90%] text-sm">
                                            <p className="font-semibold text-gray-900 mb-1">Good Morning Sir/Madam,</p>
                                            <p className="text-xs text-gray-600 mb-2">Today&apos;s Tender Alert:</p>
                                            <div className="border border-gray-200 rounded overflow-hidden">
                                                <table className="w-full text-[10px]">
                                                    <tbody>
                                                        {[
                                                            ['Date of Alert', '24.12.2022'],
                                                            ['Bid alert ID', 'BAR123456'],
                                                            ['Tender id', 'GEM/2022/B/2771079'],
                                                            ['Tender category', 'Refer'],
                                                            ['Name of work', 'Electromechanical workstation...'],
                                                            ['State', 'Telangana'],
                                                            ['ECV', 'Online'],
                                                            ['Quantity', '—'],
                                                            ['Department', 'Ministry of Education Dept...'],
                                                            ['Location', 'Refer'],
                                                            ['Last date', '24-12-2022 15:00'],
                                                            ['Mode of apply', 'Online'],
                                                            ['Website link', 'https://bidalt.in/bid-alert/...'],
                                                            ['Penalties', 'Refer to attached Document'],
                                                            ['Financial bid', 'Refer to attached Document'],
                                                            ['Any hard copies', 'Refer to attached Document'],
                                                        ].map(([k, v], i) => (
                                                            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                                <td className="px-1 py-0.5 font-medium text-gray-600 border-r border-gray-200 leading-tight">{k}</td>
                                                                <td className="px-1 py-0.5 text-gray-800 leading-tight">{v}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <p className="mt-2 text-xs text-gray-500">Please see the tender document carefully and participate on:</p>
                                            <p className="text-xs text-gray-500">– Greetings from BIDALERT</p>
                                        </div>
                                    </div>
                                </PhoneMockup>
                            </div>
                        </MotionDiv>
                    </div>
                </div>
            </section>
        </div>
    );
}

// ─── Phone Mockup Component ───────────────────────────────────────────────────
function PhoneMockup({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="relative mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl"
            style={{
                width: 280,
                height: 560,
                background: '#1a1a1a',
                border: '6px solid #1a1a1a',
                boxShadow: '0 30px 80px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)',
            }}
        >
            {/* Notch */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-20 rounded-b-2xl"
                style={{ width: 100, height: 28, background: '#1a1a1a' }}
            />
            {/* WhatsApp header */}
            <div
                className="flex items-center gap-3 px-4 pt-10 pb-3 z-10 relative"
                style={{ background: '#075e54' }}
            >
                <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center">
                    <MessageCircle size={16} className="text-white" />
                </div>
                <div>
                    <div className="text-white font-bold text-xs leading-none">bidalert.in</div>
                    <div className="text-green-200 text-[10px] flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                        Verified Business
                    </div>
                </div>
            </div>
            {/* Chat area */}
            <div
                className="overflow-y-auto"
                style={{ height: 'calc(100% - 8.5rem)', background: '#ece5dd' }}
            >
                {children}
            </div>
            {/* Input bar */}
            <div
                className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-2"
                style={{ background: '#f0f0f0' }}
            >
                <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[10px] text-gray-400">Message</div>
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#075e54' }}>
                    <MessageCircle size={12} className="text-white" />
                </div>
            </div>
        </div>
    );
}
