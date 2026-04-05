'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// Comprehensive list of tender categories
const tenderCategories = [
    'Adhesive Tenders',
    'Admission Tenders',
    'Aerospace & Defence Tenders',
    'Agriculture & Forestry Works Tenders',
    'Air Conditioning & HVAC Tenders',
    'Air Transportation Tenders',
    'Aluminium & Metal Fabrication Tenders',
    'Animal & Animal Product Tenders',
    'Annual Maintenance Contract (AMC) Tenders',
    'Architect & Interior Designer Tenders',
    'Audio Visual & Multimedia Tenders',
    'Automobiles & Auto Parts Tenders',
    'Automation & Robotics Tenders',
    'Bag & Baggage Tenders',
    'Banking & Financial Services Tenders',
    'Banking Material Tenders',
    'Barricade & Divider Tenders',
    'Beautician Tenders',
    'Biometric & Access Control Tenders',
    'Boring & Drilling Tenders',
    'Bridge Construction Tenders',
    'Building Construction Tenders',
    'Canteen & Catering Tenders',
    'CCTV & Surveillance Tenders',
    'Cement & Concrete Tenders',
    'Chemical Machinery Tenders',
    'Chemical Products Tenders',
    'Civil & Architectural Services Tenders',
    'Civil And Construction Tenders',
    'Civil Works Others Tenders',
    'Cleaning/Sweeping Tenders',
    'Clothing & Uniform Tenders',
    'Computer Hardware Tenders',
    'Computer Networking Tenders',
    'Consultancy Services Tenders',
    'Construction Material Tenders',
    'Construction Tenders',
    'Contractor Tenders',
    'Crockery Tenders',
    'Cyber Security Tenders',
    'Data Centre & Server Tenders',
    'Defence Supplies & Equipment Tenders',
    'Designing Tenders',
    'Digital Marketing & IT Services Tenders',
    'Drainage Work Tenders',
    'Dredging & Desilting Tenders',
    'Drone & UAV Tenders',
    'Drugs & Pharmaceuticals Tenders',
    'E-Governance & Smart City Tenders',
    'Education And Training Services Tenders',
    'Electrical Cables And Wires Tenders',
    'Electrical And Electronics Tenders',
    'Electrical Goods and Equipments Tenders',
    'Electrical Works Tenders',
    'Electronics Equipment Tenders',
    'Energy, Oil and Gas Tenders',
    'Engineering Tenders',
    'Environmental Service Tenders',
    'Event Management Tenders',
    'Excavation Tenders',
    'Fabrication Tenders',
    'Facility Management Services Tenders',
    'Fencing/Wall Tenders',
    'Fertilizer Tenders',
    'Finance And Insurance Sectors Tenders',
    'Fire Alarm Tenders',
    'Fire Fighting Equipment Tenders',
    'Food & Beverages Tenders',
    'Food Processing Tenders',
    'Forestry & Plantation Tenders',
    'Fuel & Petroleum Products Tenders',
    'Furniture & Furnishing Tenders',
    'Gem & Jewellery Tenders',
    'General Tenders',
    'Generator & Power Backup Tenders',
    'Geotechnical & Geological Tenders',
    'Grass & Horticulture Tenders',
    'Handicraft & Handloom Tenders',
    'Health & Medicine Tenders',
    'Healthcare And Medicine Tenders',
    'Hiring Of Vehicles Tenders',
    'Hiring/Leasing Tenders',
    'Horticulture/Gardening Tenders',
    'Hospital Tenders',
    'Hotel/Guest & Tent Tenders',
    'House Keeping Tenders',
    'Housekeeping Services Tenders',
    'HVAC Tenders',
    'Hydro Projects Tenders',
    'Insurance Services Tenders',
    'Internet & Broadband Tenders',
    'IoT & Smart Technology Tenders',
    'Irrigation Work Tenders',
    'IT & Telecom Tenders',
    'Lab Equipment Tenders',
    'Laboratory Tenders',
    'Landscaping & Park Development Tenders',
    'Lift/Elevator Tenders',
    'Light & Fittings Tenders',
    'Machinery and Tools Tenders',
    'Manpower Supply Tenders',
    'Manpower Tenders',
    'Marine & Coastal Works Tenders',
    'Mechanical Articles Tenders',
    'Media & Communication Services Tenders',
    'Medical Equipment Tenders',
    'Minerals Tenders',
    'Mining & Minerals Tenders',
    'Mobile Applications Tenders',
    'Natural Gas Distribution Tenders',
    'Non Metallic Mineral Tenders',
    'Non-Ferrous Metals Tenders',
    'Office Equipment Tenders',
    'Oil/Grease Tenders',
    'Operation & Maintenance Tenders',
    'Other Services Tenders',
    'Painting Tenders',
    'Paints & Chemicals Tenders',
    'Parking/Toll Tenders',
    'Pipe Line Project Tenders',
    'Plastic & Rubber Products Tenders',
    'Plumbing Material Tenders',
    'Port & Waterway Infrastructure Tenders',
    'Power & Energy Projects Tenders',
    'Printing/Publishing Tenders',
    'Project Management Tenders',
    'Pumps/Compressor Tenders',
    'Railway Tenders',
    'Real Estate Service Tenders',
    'Renovation Tenders',
    'Repair/Maintenance Tenders',
    'Road Construction Tenders',
    'Rubber & Plastic Products Tenders',
    'Safety Equipment & PPE Tenders',
    'Safety/Security Tenders',
    'Sanitation Tenders',
    'Satellite & Communication Tenders',
    'Scraps Tenders',
    'Security and Emergency Services Tenders',
    'Security Services Tenders',
    'Seed Tenders',
    'Smart City Solutions Tenders',
    'Social Welfare & NGO Tenders',
    'Software and IT Solutions Tenders',
    'Solar Installation and Products Tenders',
    'Solar Tenders',
    'Solid Waste Management Tenders',
    'Sports Infrastructure Tenders',
    'Steel & Metal Products Tenders',
    'Storage & Warehousing Tenders',
    'Survey & Mapping Services Tenders',
    'Telecommunication Services Tenders',
    'Testing & Inspection Services Tenders',
    'Textile, Apparel and Footwear Tenders',
    'Training & Skill Development Tenders',
    'Transportation and Logistics Tenders',
    'Urban Infrastructure Tenders',
    'Water Storage And Supply Tenders',
    'Water Treatment Plant Tenders',
    'Web Development & Digital Services Tenders',
    'Wind Energy Tenders',
];


export default function TenderCategoriesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Breadcrumb Container */}
            <div className="container mx-auto px-3 sm:px-4 pt-4 pb-4 md:pt-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Home
                    </Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-slate-900 font-bold">Tender Categories</span>
                </div>
            </div>

            {/* Main Heading - Full Width Neon Gradient Block */}
            <div className="relative w-full bg-gradient-to-r from-[#0b4d3c] to-[#10e981] text-white shadow-lg py-10 md:py-12 mb-8 overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-3 sm:px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
                        Tender Categories
                    </h1>
                    <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                        Discover opportunities across dozens of specialized industries and sectors
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-3 sm:px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {([...new Set(tenderCategories)]).map((category, index) => (
                        <Link
                            key={`${category}-${index}`}
                            href={`/tenders?category=${encodeURIComponent(category.replace(' Tenders', ''))}`}
                            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-bid-green/30 hover:shadow-xl hover:shadow-slate-200/50 transition-all group flex items-center justify-between"
                        >
                            <span className="text-sm font-bold text-slate-700 group-hover:text-bid-greenhover transition-colors">
                                {category}
                            </span>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-bid-greenhover transform group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
