'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';



const banks = [
    "Axis Bank", "Bandhan Bank", "Bank of Baroda",
    "Bank of India", "Bank of Maharashtra", "Canara Bank",
    "Central Bank of India", "City Union Bank", "CSB Bank",
    "DCB Bank", "Dhanlaxmi Bank", "Federal Bank",
    "HDFC Bank", "ICICI Bank", "IDBI Bank",
    "Indian Bank", "Indian Overseas Bank", "IndusInd Bank",
    "Jammu & Kashmir Bank", "Karnataka Bank", "Karur Vysya Bank",
    "Kotak Mahindra Bank", "Nainital Bank", "Punjab & Sind Bank",
    "Punjab National Bank", "RBL Bank", "South Indian Bank",
    "State Bank of India", "Tamilnad Mercantile Bank", "UCO Bank",
    "Union Bank of India", "Yes Bank"
];

const ruralBanks = [
    "Andhra Pradesh Grameena Vikas Bank", "Andhra Pragathi Grameena Bank", "Chaitanya Godavari Grameena Bank",
    "Saptagiri Grameena Bank", "Arunachal Pradesh Rural Bank", "Assam Gramin Vikas Bank",
    "Dakshin Bihar Gramin Bank", "Uttar Bihar Gramin Bank", "Chhattisgarh Rajya Gramin Bank",
    "Baroda Gujarat Gramin Bank", "Saurashtra Gramin Bank", "Sarva Haryana Gramin Bank",
    "Himachal Pradesh Gramin Bank", "Ellaquai Dehati Bank", "J&K Grameen Bank",
    "Jharkhand Rajya Gramin Bank", "Karnataka Gramin Bank", "Karnataka Vikas Grameena Bank",
    "Madhya Pradesh Gramin Bank", "Madhyanchal Gramin Bank", "Maharashtra Gramin Bank",
    "Vidharbha Konkan Gramin Bank", "Manipur Rural Bank", "Meghalaya Rural Bank",
    "Mizoram Rural Bank", "Nagaland Rural Bank", "Odisha Gramya Bank",
    "Utkal Grameen Bank", "Puduvai Bharathiar Grama Bank", "Punjab Gramin Bank",
    "Rajasthan Marudhara Gramin Bank", "Tamilnadu Grama Bank", "Telangana Grameena Bank",
    "Tripura Gramin Bank", "Aryavart Bank", "Baroda UP Bank",
    "Prathama UP Gramin Bank", "Uttarakhand Gramin Bank", "Bangiya Gramin Vikash Bank",
    "Paschim Banga Gramin Bank", "Uttar Banga Kshetriya Gramin Bank"
];

const smallFinanceBanks = [
    "Ujjivan Small Finance Bank", "Jana Small Finance Bank", "Equitas Small Finance Bank",
    "AU Small Finance Bank", "Capital Small Finance Bank", "ESAF Small Finance Bank",
    "North East Small Finance Bank", "Suryoday Small Finance Bank", "Utkarsh Small Finance Bank",
    "Shivalik Small Finance Bank"
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

// Type cast motion components to avoid TS errors
const MotionDiv = motion.div as any;

export default function TenderBanksPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Breadcrumb Container */}
            <div className="container mx-auto px-3 sm:px-4 pt-4 pb-4 md:pt-6">
                <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                >
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Home
                    </Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-slate-900 font-bold">Tenders by Bank</span>
                </MotionDiv>
            </div>

            {/* Main Heading - Full Width Neon Gradient Block */}
            <div className="relative w-full bg-gradient-to-r from-[#0b4d3c] to-[#10e981] text-white shadow-lg py-10 md:py-12 mb-8 overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-3 sm:px-4 relative z-10">
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
                            Tenders by Bank
                        </h1>
                        <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                            Latest Tenders from Nationalised and Private Banks across India
                        </p>
                    </MotionDiv>
                </div>
            </div>

            <main className="container mx-auto px-3 sm:px-4 py-8">

                {/* Banks Grid */}
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-10">
                    <h2 className="text-2xl font-black text-bid-dark mb-8 pb-3 border-b-2 border-bid-green inline-block uppercase tracking-tight">
                        Nationalised & Private Banks:
                    </h2>

                    <MotionDiv
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                    >
                        {banks.map((bank, index) => (
                            <MotionDiv variants={item} key={index}>
                                <Link
                                    href={`/tenders?authority_group=Bank&authority=${encodeURIComponent(bank)}`}
                                    className="group flex flex-col p-4 border border-gray-100 rounded-xl hover:border-bid-greenhover/50 hover:shadow-md transition-all duration-300 bg-white"
                                >
                                    <h3 className="text-gray-900 font-semibold text-base group-hover:text-bid-greenhover transition-colors duration-200">
                                        {bank}
                                    </h3>
                                    <span className="text-xs text-gray-500 group-hover:text-gray-600 mt-1">View Tenders</span>
                                </Link>
                            </MotionDiv>
                        ))}
                    </MotionDiv>
                </div>

                {/* l Banks Grid */}
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-10 mt-10">
                    <h2 className="text-2xl font-black text-bid-dark mb-8 pb-3 border-b-2 border-bid-green inline-block uppercase tracking-tight">
                        Rural Banks:
                    </h2>

                    <MotionDiv
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {ruralBanks.map((bank, index) => (
                            <MotionDiv variants={item} key={index}>
                                <Link
                                    href={`/tenders?authority_group=Bank&authority=${encodeURIComponent(bank)}`}
                                    className="group flex flex-col p-4 border border-gray-100 rounded-xl hover:border-bid-greenhover/50 hover:shadow-md transition-all duration-300 bg-white"
                                >
                                    <h3 className="text-gray-900 font-semibold text-base group-hover:text-bid-greenhover transition-colors duration-200">
                                        {bank}
                                    </h3>
                                    <span className="text-xs text-gray-500 group-hover:text-gray-600 mt-1">View Tenders</span>
                                </Link>
                            </MotionDiv>
                        ))}
                    </MotionDiv>
                </div>

                {/* Small Finance Banks Grid */}
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-10 mt-10">
                    <h2 className="text-2xl font-black text-bid-dark mb-8 pb-3 border-b-2 border-bid-green inline-block uppercase tracking-tight">
                        Small Finance Banks:
                    </h2>

                    <MotionDiv
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {smallFinanceBanks.map((bank, index) => (
                            <MotionDiv variants={item} key={index}>
                                <Link
                                    href={`/tenders?authority_group=Bank&authority=${encodeURIComponent(bank)}`}
                                    className="group flex flex-col p-4 border border-gray-100 rounded-xl hover:border-bid-greenhover/50 hover:shadow-md transition-all duration-300 bg-white"
                                >
                                    <h3 className="text-gray-900 font-semibold text-base group-hover:text-bid-greenhover transition-colors duration-200">
                                        {bank}
                                    </h3>
                                    <span className="text-xs text-gray-500 group-hover:text-gray-600 mt-1">View Tenders</span>
                                </Link>
                            </MotionDiv>
                        ))}
                    </MotionDiv>
                </div>
            </main>
        </div>
    );
}
