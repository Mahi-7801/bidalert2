'use client';

import Link from 'next/link';
import { ChevronRight, Briefcase, Factory } from 'lucide-react';

const sectors = [
    'Aerospace & Defence',
    'Agriculture & Food Processing',
    'Animal Husbandry & Veterinary',
    'Architecture & Urban Planning',
    'Automobile & Transport',
    'Aviation & Airports',
    'Banking & Financial Services',
    'Biotechnology & Life Sciences',
    'Broadcasting & Media',
    'Chemicals & Petrochemicals',
    'Civil Engineering & Infrastructure',
    'Coal & Mining',
    'Construction & Real Estate',
    'Consultancy & Professional Services',
    'Culture & Heritage',
    'Cyber Security & Digital Services',
    'Defence & Military',
    'Disaster Management & Relief',
    'E-Governance & Smart City',
    'Education & Training',
    'Electrical & Electronics',
    'Energy & Power',
    'Environment & Waste Management',
    'Event Management & Public Relations',
    'Finance & Insurance',
    'Fisheries & Aquaculture',
    'Food Processing & Storage',
    'Forestry & Environment',
    'Gas & Petroleum',
    'Handicraft & Handloom',
    'Healthcare & Pharmaceuticals',
    'Highways & Roads',
    'Horticulture & Floriculture',
    'Hospitality & Tourism',
    'Housing & Urban Development',
    'Information Technology & Telecom',
    'Infrastructure & Engineering',
    'Iron & Steel',
    'Irrigation & Water Resources',
    'Labour & Employment',
    'Law & Justice',
    'Logistics & Warehousing',
    'Manufacturing & Industrial',
    'Marine & Ports',
    'Media & Communications',
    'Medical Devices & Equipment',
    'Micro, Small & Medium Enterprises',
    'Mining & Metals',
    'Natural Gas & LNG',
    'Nuclear Energy',
    'Oil & Gas',
    'Panchayati Raj & Rural Development',
    'Petroleum & Refining',
    'Ports, Shipping & Waterways',
    'Power Generation & Distribution',
    'Printing & Stationery',
    'Public Administration',
    'Railways & Metro',
    'Real Estate & Construction',
    'Research & Development',
    'Retail & Commerce',
    'Rural Development & Livelihood',
    'Sanitation & Solid Waste Management',
    'Science & Technology',
    'Security & Safety',
    'Skill Development & Vocational Training',
    'Social Welfare & NGO',
    'Solar & Renewable Energy',
    'Sports & Recreation',
    'Steel & Metals',
    'Telecommunications',
    'Textile & Apparel',
    'Tourism & Hospitality',
    'Urban Local Bodies & Municipalities',
    'Waste to Energy',
    'Water & Sanitation',
    'Water Supply & Sewerage',
    'Wind & Green Energy',
    'Agro-based Industries',
    'Air Quality Monitoring',
    'Ambulance & Emergency Services',
    'Ammunition & Ordnance',
    'Aquaculture & Marine Products',
    'Audiovisual & Film Production',
    'Biofuel & Alternative Energy',
    'Blood Banks & Medical Supplies',
    'Border Roads & CPWD Works',
    'Bridge & Tunnel Engineering',
    'Canal Irrigation & Water Management',
    'Carbon Credits & Climate Finance',
    'Central Public Works Department',
    'Ceramic & Glass Products',
    'Cold Chain & Refrigeration',
    'Community Health Centres',
    'Compressed Natural Gas (CNG)',
    'Computer & IT Hardware Supply',
    'Consumer Affairs & Retail',
    'Cooperative Societies & Credit Unions',
    'Corporate Social Responsibility (CSR)',
    'Customs & Border Services',
    'Dairy & Milk Processing',
    'Dam Construction & Hydro Power',
    'Data Analytics & AI Services',
    'Defense Shipbuilding & Naval',
    'Desalination & Water Treatment',
    'Digital India & e-Services',
    'Dredging & Port Dredging',
    'Drone & UAV Technology',
    'Drug Regulatory & Pharmacovigilance',
    'Early Childhood & ICDS Programs',
    'Electric Vehicles & EV Infrastructure',
    'Explosives & Mining Safety',
    'Export Promotion & Trade',
    'Fertilizer Distribution & Supply',
    'Financial Inclusion & Microfinance',
    'Fire Fighting & Rescue Services',
    'Flood Control & Embankment Works',
    'Gas Pipelines & Distribution',
    'Geological Survey & Mapping',
    'Government Printing Press',
    'Gram Panchayat Development',
    'Green Buildings & Sustainable Infrastructure',
    'Ground Water Development',
    'Health Mission & NRHM',
    'Heavy Engineering & Capital Goods',
    'High-Speed Rail',
    'Hill Area Development',
    'Hospital Construction & Management',
    'Hotels & Guest Houses',
    'Human Rights & Legal Aid',
    'Hydrocarbon Exploration',
    'IIT & Central Universities',
    'Immigration & Passport Services',
    'Incubation & Startup Ecosystem',
    'Indoor & Outdoor Advertising',
    'Industrial Parks & SEZs',
    'Inland Waterways',
    'Insurance & Risk Management',
    'Integrated Child Development',
    'Intelligence & Surveillance Systems',
    'International Trade Fairs & Expos',
    'Jal Jeevan Mission (Drinking Water)',
    'Judicial & Court Infrastructure',
    'Land Acquisition & Revenue',
    'Land Records & GIS Mapping',
    'Libraries & Documentation',
    'Lighting & Smart Streetlights',
    'Livelihood & Self-Help Groups',
    'Maintenance & Allied Services',
    'Management Consultancy',
    'Market & Mandi Development',
    'Mass Rapid Transit Systems (MRTS)',
    'Medical & Health Research',
    'Metro Construction & Operations',
    'Mid-Day Meal Programme',
    'Military Canteen & Stores',
    'Mobile Health Units',
    'Museum & Heritage Conservation',
    'NABARD & Rural Finance',
    'National Highways (NHAI)',
    'Natural Disaster Response',
    'Non-Destructive Testing (NDT)',
    'Nuclear Medicine & Radiology',
    'Nutrition & Food Fortification',
    'Organic Farming & Natural Agriculture',
    'Parks & Public Spaces Development',
    'Passenger Rail & Coach Manufacturing',
    'Pension & Social Security',
    'Pest Control & Agricultural Support',
    'Petrochemical Plants',
    'Pilot Training & Simulator Services',
    'Police Infrastructure & Equipment',
    'Pollution Monitoring & Control',
    'Post & Courier Services',
    'Power Electronics & Inverters',
    'Primary Health Centres (PHC)',
    'Prison Administration & Jail Management',
    'Project Finance & Feasibility Studies',
    'Public Distribution System (PDS)',
    'Quality Control & Standardisation',
    'Rain Water Harvesting',
    'Recycling & Scrap Management',
    'Refrigeration & Cold Storage',
    'Rehabilitation & Resettlement',
    'Remote Sensing & Satellite Applications',
    'Roads & Bridges (State PWD)',
    'Rural Electrification',
    'Rural Road Connectivity (PMGSY)',
    'Safe Drinking Water Supply',
    'School Building Construction',
    'Seed Production & Distribution',
    'Sericulture & Silk Industry',
    'Sewage Treatment Plants (STP)',
    'Ship Breaking & Recycling',
    'Slum Development & PMAY',
    'Smart Grid & Energy Efficiency',
    'Smart Metering & AMI Projects',
    'Social Audit & Impact Assessment',
    'Software Development & IT Projects',
    'Soil Conservation & Watershed',
    'Special Economic Zones (SEZ)',
    'State Financial Corporations',
    'State Police & Home Department',
    'Street Lighting & Traffic Management',
    'Sugar & Ethanol Production',
    'Surface Transport & Logistics',
    'Surveillance & CCTV Security',
    'Swachh Bharat Mission',
    'Swimming Pools & Sports Complex',
    'Tank Rehabilitation & Minor Irrigation',
    'Tea & Coffee Plantations',
    'Testing & Certification Labs',
    'Tidal & Wave Energy',
    'Toll Operations & Highway Services',
    'Town Planning & Development Authority',
    'Trade & Commerce Promotion',
    'Transport Aggregation & Mobility',
    'Tree Plantation & Carbon Sequestration',
    'Tribal Area Development',
    'Urban Bus Services (BRTS)',
    'Urban Forestry & Greening',
    'Urban Slums & Jhuggi Rehabilitation',
    'Veterinary & Animal Disease Control',
    'Village Electrification',
    'Vocational & Technical Education',
    'Waste Water Recycling & Reuse',
    'Water ATM & Purification Kiosks',
    'Weather Monitoring & Meteorology',
    'Welfare of Scheduled Castes & OBC',
    'Wi-Fi Hotspot & Broadband Projects',
    'Wildlife Conservation & National Parks',
    'Women Empowerment & SHG Programs',
    'Workers Safety & Industrial Hygiene',
    'World Heritage Conservation',
    'Yoga & Alternative Medicine',
    'Youth Hostels & NCC Infrastructure',
    'Zero Waste & Circular Economy',
];

export default function TenderSectorsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb Container */}
            <div className="container mx-auto px-3 sm:px-4 pt-4 pb-4 md:pt-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Home
                    </Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-slate-900 font-bold">Tenders by Sector</span>
                </div>
            </div>

            {/* Main Heading - Full Width Neon Gradient Block */}
            <div className="relative w-full bg-gradient-to-r from-[#0b4d3c] to-[#10e981] text-white shadow-lg py-10 md:py-12 mb-8 overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-3 sm:px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
                        Tenders by Sector
                    </h1>
                    <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                        Discover government opportunities categorized by key industry sectors across India
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-3 sm:px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {([...new Set(sectors)]).map((sector, index) => (
                        <Link
                            key={`${sector}-${index}`}
                            href={`/tenders?sector=${encodeURIComponent(sector)}`}
                            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-bid-green hover:shadow-xl hover:shadow-bid-green/5 transition-all group flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-bid-green/10 transition-colors">
                                <Briefcase size={20} className="text-gray-400 group-hover:text-bid-green" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-black text-bid-dark uppercase tracking-tight group-hover:text-bid-green transition-colors">
                                    {sector}
                                </h3>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                    Browse Tenders
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-300 group-hover:text-bid-green transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ))}
                </div>

                {/* Info Card */}
                <div className="mt-10 bg-bid-dark rounded-[1.5rem] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-bid-green/10 rounded-full blur-[80px]" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Don't see your sector?</h2>
                            <p className="text-gray-400 text-lg font-medium">Use our advanced search tool to find tenders by specific keywords or industry terms.</p>
                        </div>
                        <Link href="/tenders" className="px-10 py-4 bg-bid-green text-bid-dark font-black rounded-full uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl">
                            ADVANCED SEARCH
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
