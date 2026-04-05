'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Cities organized by state - accurate data from bidalert.in
const citiesByState = [
    {
        state: 'Andhra Pradesh',
        cities: [
            'Adoni', 'Anantapuram', 'Bhimavaram', 'Chilakaluripet', 'Chittoor',
            'Dharmavaram', 'Eluru', 'Gudivada', 'Guntakal', 'Guntur',
            'Hindupur', 'Kadapa', 'Kadiri', 'Kakinada', 'Kurnool',
            'Machilipatnam', 'Madanapalle', 'Mangalagiri', 'Nandyal', 'Narasaraopet',
            'Nellore', 'Ongole', 'Proddatur', 'Rajahmundry', 'Sattenapalle',
            'Srikakulam', 'Tadepalligudem', 'Tadipatri', 'Tenali', 'Tirupati',
            'Vijayawada', 'Visakhapatnam', 'Vizianagaram'
        ]
    },
    {
        state: 'Andaman & Nicobar',
        cities: [
            'Bakultala', 'Bambooflat', 'Garacharma', 'Port Blair', 'Prothrapur'
        ]
    },
    {
        state: 'Arunachal Pradesh',
        cities: [
            'Anjaw', 'Changlang', 'Itanagar', 'Dibang Valley', 'East Kameng',
            'East Siang', 'Lohit', 'Lower Dibang Valley', 'Lower Subansiri',
            'Papum Pare', 'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri',
            'West Kameng', 'West Siang'
        ]
    },
    {
        state: 'Assam',
        cities: [
            'Bongaigaon', 'Dibrugarh', 'Guwahati', 'Jorhat', 'Silchar', 'Tezpur', 'Tinsukia'
        ]
    },
    {
        state: 'Bihar',
        cities: [
            'Arrah', 'Aurangabad', 'Bagaha', 'Begusarai', 'Bettiah',
            'Bhagalpur', 'Bihar Sharif', 'Buxar', 'Chhapra', 'Danapur',
            'Darbhanga', 'Dehri', 'Gaya', 'Hajipur', 'Jamalpur',
            'Jehanabad', 'Katihar', 'Kishanganj', 'Motihari', 'Munger',
            'Muzaffarpur', 'Nawada', 'Patna', 'Purnia', 'Saharsa',
            'Sasaram', 'Sitamarhi', 'Siwan'
        ]
    },
    {
        state: 'Chandigarh',
        cities: [
            'Basti Bhagwanpura', 'Basti Kishangarh', 'Behlana', 'Chandigarh',
            'Daria', 'Khuda Alisher', 'Khuda Jassu', 'Lahora', 'Mani Majra', 'Mauli Jagran'
        ]
    },
    {
        state: 'Chhattisgarh',
        cities: [
            'Ambikapur', 'Bhilai', 'Bilaspur', 'Chirmiri', 'Dhamtari',
            'Korba', 'Mahasamund', 'Raigarh', 'Raipur', 'Rajnandgaon'
        ]
    },
    {
        state: 'Dadra & Nagar Haveli',
        cities: [
            'Dadra', 'Masat', 'Naroli', 'Rakholi', 'Samarvarni', 'Silvassa'
        ]
    },
    {
        state: 'Gujarat',
        cities: [
            'Ahmedabad', 'Amreli', 'Anand', 'Bharuch', 'Bhavnagar',
            'Bhuj', 'Botad', 'Dahod', 'Deesa', 'Gandhidham',
            'Gandhinagar', 'Godhra', 'Gondal', 'Jamnagar', 'Jetpur',
            'Junagadh', 'Kalol', 'Mehsana', 'Morbi', 'Nadiad',
            'Navsari', 'Palanpur', 'Patan', 'Porbandar', 'Rajkot',
            'Surat', 'Surendranagar', 'Vadodara', 'Valsad', 'Vapi', 'Veraval'
        ]
    },
    {
        state: 'Haryana',
        cities: [
            'Ambala', 'Bahadurgarh', 'Bhiwani', 'Faridabad', 'Gurugram',
            'Hisar', 'Jind', 'Kaithal', 'Karnal', 'Kosli',
            'Narnaul', 'Panchkula', 'Panipat', 'Pundri', 'Rewari',
            'Rohtak', 'Sirsa', 'Sonipat', 'Thanesar', 'Yamunanagar'
        ]
    },
    {
        state: 'Himachal Pradesh',
        cities: [
            'Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur',
            'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'
        ]
    },
    {
        state: 'Jammu & Kashmir',
        cities: [
            'Anantnag', 'Jammu', 'Srinagar'
        ]
    },
    {
        state: 'Jharkhand',
        cities: [
            'Bokaro', 'Chirkunda', 'Deoghar', 'Dhanbad', 'Giridih',
            'Hazaribagh', 'Jamshedpur', 'Medininagar', 'Phusro-Bermo-Bokaro', 'Ramgarh', 'Ranchi'
        ]
    },
    {
        state: 'Karnataka',
        cities: [
            'Bagalkot', 'Bangalore', 'Belgaum', 'Bellary', 'Bhadravati',
            'Bidar', 'Chikmagalur', 'Chitradurga', 'Davanagere', 'Gadag-Betageri',
            'Gangavati', 'Hassan', 'Hospet', 'Hubli-Dharwad', 'Kalaburagi',
            'Kolar', 'Mandya', 'Mangalore', 'Mysore', 'Raichur',
            'Ranebennuru', 'Robertsonpet', 'Shimoga', 'Tumkur', 'Udupi', 'Vijayapura'
        ]
    },
    {
        state: 'Kerala',
        cities: [
            'Alappuzha', 'Beypore', 'Kanhangad', 'Kannur', 'Kasaragod',
            'Kayamkulam', 'Kochi', 'Kollam', 'Kottayam', 'Koyilandy',
            'Kozhikode', 'Kunnamkulam', 'Malappuram', 'Manjeri', 'Neyyattinkara',
            'Nileshwaram', 'Payyanur', 'Ponnani', 'Taliparamba', 'Thalassery',
            'Thiruvananthapuram', 'Thrissur', 'Tirur', 'Vadakara'
        ]
    },
    {
        state: 'Madhya Pradesh',
        cities: [
            'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur',
            'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dindori',
            'Guna', 'Gwalior', 'Indore', 'Itarsi', 'Jabalpur',
            'Katni', 'Khandwa', 'Khargone', 'Mandsaur', 'Morena',
            'Nagda', 'Narmadapuram', 'Neemuch', 'Pithampur', 'Ratlam',
            'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni',
            'Shivpuri', 'Singrauli', 'Ujjain', 'Vidisha'
        ]
    },
    {
        state: 'Maharashtra',
        cities: [
            'Achalpur', 'Ahmednagar', 'Akola', 'Ambarnath', 'Amravati',
            'Badlapur', 'Barshi', 'Beed', 'Bhiwandi Nizampur', 'Bhusawal',
            'Chandrapur', 'Dhule', 'Dombivli', 'Gondia', 'Hinganghat',
            'Ichalkaranji', 'Jalgaon', 'Jalna', 'Kalyan', 'Kolhapur',
            'Latur', 'Malegaon', 'Mira Bhayandar', 'Mumbai', 'Nagpur',
            'Nanded', 'Nandurbar', 'Nashik', 'Navi Mumbai', 'Osmanabad',
            'Panvel', 'Parbhani', 'Pune', 'Sambhajinagar', 'Sangli Miraj Kupwad',
            'Satara', 'Solapur', 'Thane', 'Udgir', 'Ulhasnagar',
            'Vasai Virar', 'Wardha', 'Yavatmal'
        ]
    },
    {
        state: 'Manipur',
        cities: [
            'Bishnupur', 'Chandel', 'Churachandpur', 'Imphal', 'Senapati',
            'Tamenglong', 'Thoubal', 'Ukhrul'
        ]
    },
    {
        state: 'Meghalaya',
        cities: [
            'Ampati', 'Cherrapunjee', 'Jowai', 'Khliehriat', 'Madanrting',
            'Mawkyrwat', 'Mawlai', 'Nongmynsong', 'Nongthymmai', 'Pynthorumkhrah',
            'Pynursla', 'Shillong', 'Tura'
        ]
    },
    {
        state: 'Mizoram',
        cities: [
            'Aizawl', 'Champhai', 'Kolasib', 'Lawngtlai', 'Lunglei',
            'Mamit', 'Saiha', 'Serchhip'
        ]
    },
    {
        state: 'Nagaland',
        cities: [
            'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung',
            'Peren', 'Phek', 'Soma', 'Tuensang', 'Wokha', 'Zunheboto'
        ]
    },
    {
        state: 'Odisha',
        cities: [
            'Balasore', 'Baripada', 'Berhampur', 'Bhubaneswar', 'Cuttack',
            'Puri', 'Rourkela', 'Sambalpur'
        ]
    },
    {
        state: 'Punjab',
        cities: [
            'Abohar', 'Amritsar', 'Barnala', 'Batala', 'Bathinda',
            'Faridkot', 'Firozpur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala',
            'Khanna', 'Ludhiana', 'Malerkotla', 'Moga', 'Mohali',
            'Muktsar', 'Pathankot', 'Patiala', 'Phagwara', 'Rajpura', 'Sunam'
        ]
    },
    {
        state: 'Rajasthan',
        cities: [
            'Ajmer', 'Alwar', 'Baran', 'Beawar', 'Bharatpur',
            'Bhilwara', 'Bhiwadi', 'Bikaner', 'Dhaulpur', 'Hanumangarh',
            'Jaipur', 'Jodhpur', 'Kishangarh', 'Kota', 'Pali',
            'Sikar', 'Sri Ganganagar', 'Tonk', 'Udaipur'
        ]
    },
    {
        state: 'Sikkim',
        cities: [
            'Gangtok', 'Gyalshing', 'Jorethang', 'Mangan', 'Namchi',
            'Nayabazar', 'Rangpo', 'Rhenak', 'Singtam'
        ]
    },
    {
        state: 'Tamil Nadu',
        cities: [
            'Ambur', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dindigul',
            'Erode', 'Gudiyatham', 'Hosur', 'Kanchipuram', 'Karaikkudi',
            'Karur', 'Kumarapalayam', 'Kumbakonam', 'Madurai', 'Nagapattinam',
            'Nagercoil', 'Neyveli', 'Pollachi', 'Pudukkottai', 'Rajapalayam',
            'Ranipet', 'Salem', 'Sivakasi', 'Thanjavur', 'Thoothukkudi',
            'Tiruchirappalli', 'Tirunelveli', 'Tiruppur', 'Tiruvannamalai', 'Udhagamandalam',
            'Vaniyambadi', 'Vellore'
        ]
    },
    {
        state: 'Telangana',
        cities: [
            'Adilabad', 'Hyderabad', 'Jagtial', 'Kagaznagar', 'Karimnagar',
            'Khammam', 'Mahabubnagar', 'Miryalaguda', 'Nalgonda', 'Nizamabad',
            'Ramagundam', 'Secunderabad', 'Siddipet', 'Suryapet', 'Warangal'
        ]
    },
    {
        state: 'Tripura',
        cities: [
            'Agartala', 'Amarpur', 'Ambassa', 'Belonia', 'Bishalgarh',
            'Dharmanagar', 'Jirania', 'Kailashahar', 'Kamalpur', 'Khowai',
            'Kumarghat', 'Melaghar', 'Mohanpur', 'Panisagar', 'Ranirbazar',
            'Sabroom', 'Santirbazar', 'Sonamura', 'Teliamura'
        ]
    },
    {
        state: 'Uttar Pradesh',
        cities: [
            'Agra', 'Akbarpur', 'Aligarh', 'Amroha', 'Awagarh',
            'Ayodhya', 'Azamgarh', 'Baduai', 'Bahraich', 'Ballia',
            'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bijnor',
            'Bulandshahr', 'Chandausi', 'Deoria', 'Etah', 'Etawah',
            'Farrukhabad', 'Fatehpur', 'Firozabad', 'Ghaziabad', 'Ghazipur',
            'Gonda', 'Gorakhpur', 'Greater Noida', 'Hapur', 'Hardoi',
            'Hathras', 'Jaunpur', 'Jhansi', 'Kanpur', 'Kasganj',
            'Khurja', 'Lakhimpur', 'Lalitpur', 'Lucknow', 'Mainpuri',
            'Mathura', 'Maunath Bhanjan', 'Meerut', 'Mirzapur', 'Modinagar',
            'Moradabad', 'Muzaffarnagar', 'Noida', 'Orai', 'Pilibhit',
            'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sahaswan',
            'Sambhal', 'Shahjahanpur', 'Shamli', 'Shikohabad', 'Sitapur',
            'Sultanpur', 'Tanda', 'Ujhani', 'Unnao', 'Varanasi'
        ]
    },
    {
        state: 'Uttarakhand',
        cities: [
            'Dehradun', 'Haldwani', 'Haridwar', 'Kashipur', 'Rishikesh',
            'Roorkee', 'Rudrapur'
        ]
    },
    {
        state: 'West Bengal',
        cities: [
            'Alipurduar', 'Asansol', 'Baharampur', 'Balurghat', 'Bangaon',
            'Bankura', 'Bardhaman', 'Basirhat', 'Bolpur', 'Chakdaha',
            'Cooch Behar', 'Dankuni', 'Darjeeling', 'Dhulian', 'Durgapur',
            'Habra', 'Haldia', 'Jalpaiguri', 'Jangipur', 'Kharagpur',
            'Kolkata', 'Krishnanagar', 'Malda', 'Medinipur', 'Nabadwip',
            'Purulia', 'Raiganj', 'Ranaghat', 'Shantipur', 'Siliguri'
        ]
    }
];

export default function TenderCitiesPage() {
    // State to track which states are expanded
    const [expandedStates, setExpandedStates] = useState<{ [key: string]: boolean }>({});

    // Number of cities to show initially
    const INITIAL_CITIES_COUNT = 20;

    const toggleState = (stateName: string) => {
        setExpandedStates(prev => ({
            ...prev,
            [stateName]: !prev[stateName]
        }));
    };

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Breadcrumb Container */}
            <div className="container mx-auto px-3 sm:px-4 pt-4 pb-4 md:pt-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Home
                    </Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-slate-900 font-bold">Tenders by Town/City</span>
                </div>
            </div>

            {/* Page Header - Full Width Neon Gradient Block */}
            <div className="relative w-full bg-gradient-to-r from-[#0b4d3c] to-[#10e981] text-white shadow-lg py-10 md:py-12 mb-8 overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-3 sm:px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">
                        Tenders by Town/City
                    </h1>
                    <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                        Latest Tenders Information of popular towns and cities from all over Indian States
                    </p>
                </div>
            </div>

            {/* Cities by State */}
            <div className="container mx-auto px-3 sm:px-4 py-8">
                <div className="space-y-6 sm:space-y-8">
                    {citiesByState.map((stateData, index) => {
                        const isExpanded = expandedStates[stateData.state] || false;
                        const citiesToShow = isExpanded ? stateData.cities : stateData.cities.slice(0, INITIAL_CITIES_COUNT);
                        const hasMore = stateData.cities.length > INITIAL_CITIES_COUNT;

                        return (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                {/* State Header */}
                                <h2 className="text-2xl font-black text-bid-dark mb-6 pb-2 border-b-2 border-bid-green inline-block uppercase tracking-tight">
                                    {stateData.state}
                                </h2>

                                {/* Cities Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {citiesToShow.map((city, cityIndex) => (
                                        <Link
                                            key={cityIndex}
                                            href={`/tenders?city=${encodeURIComponent(city)}`}
                                            className="group flex items-center px-4 py-3 text-sm font-semibold text-gray-700 hover:text-bid-greenhover hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-100 shadow-sm hover:shadow-md"
                                        >
                                            <span className="w-2 h-2 bg-bid-green rounded-full mr-3 group-hover:scale-125 transition-transform shadow-sm shadow-bid-green/50"></span>
                                            {city} Tenders
                                        </Link>
                                    ))}
                                </div>

                                {/* View More/Less Button */}
                                {hasMore && (
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => toggleState(stateData.state)}
                                            className="inline-flex items-center gap-2 px-6 py-2 bg-bid-green text-white font-medium rounded-lg hover:bg-bid-greenhover transition-all duration-200 shadow-md hover:shadow-lg"
                                        >
                                            {isExpanded ? (
                                                <>
                                                    <span>View Less</span>
                                                    <ChevronUp className="w-4 h-4" />
                                                </>
                                            ) : (
                                                <>
                                                    <span>View More</span>
                                                    <ChevronDown className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Info Section */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-5">
                    <h2 className="text-xl font-bold text-bid-dark mb-3">How to Use This Page</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-bid-green font-bold mr-2">•</span>
                            <span>Browse tenders by selecting your city or town from the list above</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-bid-green font-bold mr-2">•</span>
                            <span>Cities are organized by state for easy navigation</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-bid-green font-bold mr-2">•</span>
                            <span>Click "View More" to see all cities in a state</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-bid-green font-bold mr-2">•</span>
                            <span>Click on any city to view all active tenders in that location</span>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
