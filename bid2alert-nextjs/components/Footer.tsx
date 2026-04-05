'use client';

import { MapPin, Mail, Phone, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Footer() {
    const { openLogin } = useAuth();
    const FooterSection = ({ title, items, baseUrl, viewAllUrl = "/tenders" }: { title: string; items: string[]; baseUrl: string; viewAllUrl?: string }) => (
        <div className="mb-8 w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center mb-3 gap-2">
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                    {title}
                </h3>
                <a href={viewAllUrl} className="text-bid-green text-sm hover:underline whitespace-nowrap">
                    View All
                </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm break-words">
                {items.map((item, idx) => {
                    // Clean the item name for searching (e.g., "Andhrapradesh Tenders" -> "Andhrapradesh")
                    const searchTerm = item.replace(/\s+Tenders?$/i, '').trim();
                    return (
                        <span key={idx} className="flex items-center">
                            <a
                                href={`${baseUrl}${encodeURIComponent(searchTerm)}`}
                                className="text-gray-400 hover:text-bid-green transition-colors break-words"
                            >
                                {item}
                            </a>
                            {idx < items.length - 1 && <span className="text-gray-600 ml-2">|</span>}
                        </span>
                    );
                })}
            </div>
        </div>
    );
    const indianStates = [
        'Andhra Pradesh Tenders', 'Mizoram Tenders', 'Nagaland Tenders', 'Odisha Tenders',
        'Puducherry Tenders', 'Manipur Tenders', 'Meghalaya Tenders', 'Madhya Pradesh Tenders',
        'Sikkim Tenders', 'Tamil Nadu Tenders', 'Telangana Tenders', 'Tripura Tenders',
        'Uttarakhand Tenders', 'Uttar Pradesh Tenders', 'West Bengal Tenders'
    ];

    const cities = [
        'Eluru Tenders', 'Guntur Tenders', 'Tirupati Tenders', 'Vijayawada Tenders',
        'Bakultala Tenders', 'Garacharma Tenders', 'Anjaw Tenders', 'Changlang Tenders',
        'Bongaigaon Tenders', 'Dibrugarh Tenders', 'Arrah Tenders', 'Aurangabad Tenders',
        'Tirur Tenders', 'Behlana Tenders', 'Raipur'
    ];

    const departments = [
        'ACC Limited', 'APMSIDC Tenders', 'Airseva Tenders', 'BCU Tenders', 'Cabin Tenders',
        'CADA Tenders', 'DHT Tenders', 'DAHOD Tenders', 'ELCOT Tenders', 'ECGC Tenders',
        'FD Tenders', 'FINANCE Tenders', 'GMDA Tenders', 'HAFED Tenders', 'HDUDA Tenders'
    ];

    const categories = [
        'Alternators Tenders', 'Iron Tenders', 'Minerals Tenders', 'Beverages Tenders',
        'Chemicals Tenders', 'Tourism Tenders', 'Desilting Tenders', 'Diversified Tenders',
        'Environmental Tenders', 'Fasteners Tenders', 'Generators Tenders', 'Painting Tenders',
        'Machinery Tenders', 'Meters Tenders', 'Refrigerator Tenders'
    ];

    const sectors = [
        'Commerce Tenders', 'Defence Tenders', 'Housing Tenders', 'Foreign Affairs Tenders',
        'Other Industries Tenders', 'Power And Energy Tenders', 'Rural Tenders', 'Education Tenders',
        'Transport Tenders', 'Travelling And Tourism Tenders', 'Housing Tenders', 'Agriculture Tenders',
        'Infrastructure Tenders', 'Employment Tender', 'Law And Justice Tenders'
    ];

    const banks = [
        'Axis', 'Bandhan', 'Canara', 'CSB', 'HDFC', 'ICICI', 'DCB', 'IDBI',
        'RBL', 'YES', 'UCO', 'IndusInd', 'Dhanlaxmi', 'Indian Bank', 'J&K Gramin Bank'
    ];

    const keywords = [
        'AAA', 'ABAQUS', 'Bus', 'Bush', 'Buzzer', 'Cabinet', 'Cabling', 'Catalyst',
        'Dam', 'Decoration', 'Electrical', 'Elevation', 'Fabric', 'Flange', 'Flap'
    ];

    const countries = [
        'Algeria', 'Austria', 'Belgium', 'Brazil', 'China', 'Denmark', 'Egypt',
        'France', 'Germany', 'Green Land', 'Italy', 'Japan', 'Kuwait', 'Malaysia', 'Nepal'
    ];

    const globalCities = [
        'Aarau', 'Bacolod', 'Cadiz', 'Delhi', 'Easton', 'Fasa', 'Golden',
        'Greenock', 'Newtown', 'Nicolas', 'Obudu', 'Odessa', 'Patana', 'Penza', 'Rafah'
    ];

    const authorities = [
        'ACTASPA', 'ADEF', 'Alcaldia', 'Alight', 'Aximo', 'Alteal', 'Amey',
        'Amref', 'Ancv', 'Andra', 'Angdm', 'Anwil', 'Aogea', 'Advivo', 'Amendis'
    ];

    const mfas = [
        'World Bank', 'United Nations', 'UNDP', 'UNICEF', 'WHO', 'UNESCO',
        'ADB', 'USAID', 'ILO', 'FAO', 'WFP', 'IMF', 'EIB', 'AfDB', 'IFAD'
    ];

    const globalCategories = [
        'Aircraft', 'Cards', 'Clothing', 'Diodes', 'Excavation', 'Filters',
        'Fuels', 'Hoses', 'Mineral Water', 'Pumps', 'Refractories', 'Software',
        'Transistors', 'Uniforms', 'Valves'
    ];

    return (
        <footer className="bg-bid-dark text-white">

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <FooterSection title="India Tender by States" items={indianStates} baseUrl="/tenders?state=" viewAllUrl="/tender-states" />
                <FooterSection title="India Tender by Town/City" items={cities} baseUrl="/tenders?city=" viewAllUrl="/tender-cities" />
                <FooterSection title="India Tender by Department" items={departments} baseUrl="/tenders?authority=" viewAllUrl="/tender-departments" />
                <FooterSection title="India Tender by Categories" items={categories} baseUrl="/tenders?category=" viewAllUrl="/tender-categories" />
                <FooterSection title="India Tender by Sector/Industry" items={sectors} baseUrl="/tenders?category=" viewAllUrl="/tender-industries" />
                <FooterSection title="India Tender by Bank" items={banks} baseUrl="/tenders?q=" viewAllUrl="/tender-banks" />
                <FooterSection title="India Tender by Keyword" items={keywords} baseUrl="/tenders?q=" />

                {/* Legal Registrations Section */}
                <div className="mb-8 w-full overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-3 gap-2">
                        <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                            Legal Registrations
                        </h3>
                        <a href="/registrations" className="text-bid-green text-sm hover:underline whitespace-nowrap">
                            View All
                        </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm break-words">
                        {[
                            { name: 'GST', href: '/registrations/gst' },
                            { name: 'Startup India', href: '/registrations/startup-india' },
                            { name: 'Trademark', href: '/registrations/trademark' },
                            { name: 'Copyright', href: '/registrations/copyright' },
                            { name: 'Patent', href: '/registrations/patent' },
                            { name: 'ISO Certification', href: '/registrations/iso' },
                            { name: 'IEC Code', href: '/registrations/iec' },
                            { name: 'PF & ESI', href: '/registrations/pf-esi' },
                            { name: 'Food License (FSSAI)', href: '/registrations/food-license' },
                            { name: 'MSME Udyog Aadhaar', href: '/registrations/msme' },
                            { name: 'Incubation Support', href: '/registrations/incubation' },
                            { name: '12A & 80G', href: '/registrations/12a-80g' },
                            { name: 'DOT OSP', href: '/registrations/dot-osp' },
                            { name: 'IPR Services', href: '/registrations/trademark' }
                        ].map((item, idx, arr) => (
                            <span key={idx} className="flex items-center flex-shrink-0">
                                <a
                                    href={item.href}
                                    className="text-gray-400 hover:text-bid-green transition-colors break-words"
                                >
                                    {item.name}
                                </a>
                                {idx < arr.length - 1 && <span className="text-gray-600 ml-2">|</span>}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Web & App Solutions Section */}
                <div className="mb-8 w-full overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-3 gap-2">
                        <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                            Web & App Solutions
                        </h3>
                        <a href="/solutions/web-app" className="text-bid-green text-sm hover:underline whitespace-nowrap">
                            View All
                        </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm break-words">
                        {[
                            { name: 'Static Websites', href: '/solutions/web-app' },
                            { name: 'Dynamic Applications', href: '/solutions/web-app' },
                            { name: 'Mobile App Development', href: '/solutions/web-app' },
                            { name: 'Custom Dashboards', href: '/solutions/web-app' },
                            { name: 'E-commerce Solutions', href: '/solutions/web-app' },
                            { name: 'SEO Optimization', href: '/solutions/web-app' }
                        ].map((item, idx, arr) => (
                            <span key={idx} className="flex items-center flex-shrink-0">
                                <a
                                    href={item.href}
                                    className="text-gray-400 hover:text-bid-green transition-colors break-words"
                                >
                                    {item.name}
                                </a>
                                {idx < arr.length - 1 && <span className="text-gray-600 ml-2">|</span>}
                            </span>
                        ))}
                    </div>
                </div>

                {/* IREPS Section */}
                <div className="mb-8">
                    <div className="flex items-center mb-3">
                        <h3 className="font-bold text-sm text-white uppercase tracking-wider mr-4">
                            India Tender by IREPS
                        </h3>
                        <a href="/tenders" className="text-bid-green text-sm hover:underline">
                            View All
                        </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                        <a href="/tenders?type=Services" className="text-gray-400 hover:text-bid-green transition-colors">Services Tenders</a>
                        <span className="text-gray-600">|</span>
                        <a href="/tenders?type=Work" className="text-gray-400 hover:text-bid-green transition-colors">Work Tenders</a>
                    </div>
                </div>

                <FooterSection title="Tender by Country" items={countries} baseUrl="/global-tenders?country=" />
                <FooterSection title="Global Tender by City" items={globalCities} baseUrl="/global-tenders?city=" />
                <FooterSection title="Tender by Authority" items={authorities} baseUrl="/global-tenders?authority=" />
                <FooterSection title="Tender by MFA" items={mfas} baseUrl="/global-tenders?authority=" />
                <FooterSection title="Global Tender by Category" items={globalCategories} baseUrl="/global-tenders?category=" />

                {/* Company, Policies, Support Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/5">
                    <div>
                        <h3 className="font-bold text-sm mb-4 text-white uppercase tracking-wider">Company</h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                            <a href="/about" className="text-gray-400 hover:text-bid-green transition-colors">About Us</a>
                            <span className="text-gray-600">|</span>
                            <a href="/blog" className="text-gray-400 hover:text-bid-green transition-colors">News</a>
                            <span className="text-gray-600">|</span>
                            <a href="/contact" className="text-gray-400 hover:text-bid-green transition-colors">Contact Us</a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm mb-4 text-white uppercase tracking-wider">Policies</h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                            <a href="/terms" className="text-gray-400 hover:text-bid-green transition-colors">Terms of Use</a>
                            <span className="text-gray-600">|</span>
                            <a href="/privacy" className="text-gray-400 hover:text-bid-green transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm mb-4 text-white uppercase tracking-wider">Support</h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                            <a href="/faq" className="text-gray-400 hover:text-bid-green transition-colors">FAQ</a>
                            <span className="text-gray-600">|</span>
                            <a href="/plans" className="text-gray-400 hover:text-bid-green transition-colors">Pricing</a>
                            <span className="text-gray-600">|</span>
                            <a href="/how-it-works" className="text-gray-400 hover:text-bid-green transition-colors">How It Works</a>
                        </div>
                    </div>
                </div>

                {/* Contact Info and Social */}
                <div className="mt-12 pt-8 border-t border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-sm mb-4 text-white uppercase tracking-wider">Contact Information</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start">
                                    <MapPin className="h-4 w-4 text-bid-green mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-gray-400">
                                        Ramannapet 1st Ln, Lakshmipuram, Naidupet, Guntur, Andhra Pradesh 522007
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="h-4 w-4 text-bid-green mr-3" />
                                    <a href="mailto:support@bidalert.in" className="text-gray-400 hover:text-bid-green">
                                        support@bidalert.in
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-4 w-4 text-bid-green mr-3" />
                                    <div className="text-gray-400 text-sm">
                                        <a href="tel:+919985102111" className="hover:text-bid-green transition-colors">+91 99851 02111</a>
                                        <span className="text-gray-600 text-xs ml-2">(Sales)</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-4 w-4 text-bid-green mr-3" />
                                    <div className="text-gray-400 text-sm">
                                        <a href="tel:+919106323130" className="hover:text-bid-green transition-colors">+91 91063 23130</a>
                                        <span className="text-gray-600 text-xs ml-2">(Support)</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-4 text-white uppercase tracking-wider">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/Bidalert/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bid-green transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="https://www.instagram.com/bidalert.in/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bid-green transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="https://x.com/Bidalert1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bid-green transition-colors">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="https://in.linkedin.com/company/bidalert" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bid-green transition-colors">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 bg-black/20">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                        <p>© 2022 BIDALERT.IN ALL RIGHTS RESERVED</p>
                        <div className="flex flex-wrap gap-2 mt-2 md:mt-0 items-center">
                            <a href="/faq" className="hover:text-bid-green">FAQs</a>
                            <span className="text-gray-600">|</span>
                            <a href="/privacy" className="hover:text-bid-green">Privacy Policy</a>
                            <span className="text-gray-600">|</span>
                            <a href="/refund" className="hover:text-bid-green">Refund Policy</a>
                            <span className="text-gray-600">|</span>
                            <a href="/terms" className="hover:text-bid-green">TOS</a>
                            <span className="text-gray-600">|</span>
                            <button onClick={openLogin} className="hover:text-bid-green focus:outline-none">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
