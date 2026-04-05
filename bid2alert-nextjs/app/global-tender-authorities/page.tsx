'use client';

import Link from 'next/link';
import { ChevronRight, Building } from 'lucide-react';

const globalAuthorities = [
    // Major Multilateral Development Banks
    "World Bank", "Asian Development Bank", "African Development Bank",
    "Inter-American Development Bank", "Islamic Development Bank",
    "European Bank for Reconstruction and Development (EBRD)",
    "Caribbean Development Bank", "New Development Bank (NDB)",
    "Asian Infrastructure Investment Bank (AIIB)",
    "Council of Europe Development Bank (CEB)",
    "Nordic Investment Bank (NIB)",
    "Black Sea Trade and Development Bank (BSTDB)",
    "Central American Bank for Economic Integration (CABEI)",
    "West African Development Bank (BOAD)",
    "East African Development Bank (EADB)",
    "Development Bank of Southern Africa (DBSA)",
    "Eurasian Development Bank (EDB)",
    // United Nations Agencies
    "United Nations", "UNDP", "UNICEF", "WHO", "UNGM",
    "UN Women", "UNESCO", "UNFPA", "UNHCR", "WFP",
    "ILO", "FAO", "UNOPS", "UNEP", "UNCTAD",
    "UNIDO", "UNODC", "UNAIDS", "UNITAID", "IOM",
    "UNDSS", "OCHA", "DPPA", "UNMAS", "UN-Habitat",
    "UNFCCC", "UNDRR", "UNECA", "UNESCAP", "UNESCWA",
    "UNECE", "UNLOAS", "UNCCD", "UNFF", "UN-OHRLLS",
    "UNIDIR", "UNITAR", "UNSSC", "UNV", "UN Global Compact",
    // Bilateral Donor Agencies
    "USAID", "DFID", "JICA", "GIZ", "SIDA", "AFD",
    "Danida", "NORAD", "DFAT Australia", "CIDA Canada",
    "KfW Development Bank", "OECD", "UK Aid",
    "European Investment Bank (EIB)", "EU Delegation",
    "Swiss Development Cooperation (SDC)",
    "Netherlands Enterprise Agency (RVO)",
    "Italian Development Cooperation (AICS)",
    "Spanish AECID", "Belgian Development Agency (Enabel)",
    "Finnish FINNFUND", "Austrian Development Agency (ADA)",
    "Luxembourg Development Agency (LuxDev)",
    // European Union Institutions
    "European Commission", "European Parliament",
    "European Council", "European Court of Auditors",
    "European External Action Service (EEAS)",
    "European Investment Fund (EIF)",
    "DG DEVCO", "DG ECHO", "DG NEAR", "DG INTPA",
    "EU Humanitarian Office (ECHO)",
    "European Agency for Safety and Health (EU-OSHA)",
    "European Environment Agency (EEA)",
    "Europol", "Eurojust",
    // Global Health & Humanitarian
    "IFAD", "MCC", "NATO",
    "Global Fund (HIV/AIDS, TB, Malaria)",
    "Gavi The Vaccine Alliance",
    "PEPFAR", "USGOV Health Initiatives",
    "International Red Cross (ICRC)", "IFRC",
    "Doctors Without Borders (MSF)", "Oxfam",
    "Care International", "World Vision International",
    "IRC International Rescue Committee",
    "Save the Children", "Mercy Corps",
    "Plan International", "ActionAid", "Concern Worldwide",
    // Trade & Commerce Bodies
    "WTO", "ITC International Trade Centre",
    "UNCTAD Trade & Investment", "Commonwealth Secretariat",
    "G20 Secretariat", "APEC Secretariat",
    "ASEAN Secretariat", "African Union Commission",
    "SAARC Secretariat", "OIC Secretariat",
    "CARICOM Secretariat", "Pacific Islands Forum",
    // Finance & Standards
    "IMF", "BIS Bank for International Settlements",
    "FATF Financial Action Task Force",
    "Standards & Trade Development Facility (STDF)",
    "International Finance Corporation (IFC)",
    "Multilateral Investment Guarantee Agency (MIGA)",
    "ICSID", "OPEC Fund for International Development",
    // Research & Science
    "CERN", "WHO IARC", "CGIAR",
    "International Atomic Energy Agency (IAEA)",
    "Comprehensive Nuclear Test Ban Org (CTBTO)",
    "Organisation for the Prohibition of Chemical Weapons (OPCW)",
    "International Maritime Organization (IMO)",
    "International Civil Aviation Organization (ICAO)",
    "International Telecommunication Union (ITU)",
    "Universal Postal Union (UPU)",
    "World Meteorological Organization (WMO)",
    "World Intellectual Property Organization (WIPO)",
    "International Bureau of Weights and Measures (BIPM)",
    "International Agency for Research on Cancer (IARC)",
    // National Procurement Agencies & Platforms
    "Global Tenders", "dgMarket", "Tenders Info",
    "Procurement Notices World Bank", "UNGM Portal",
    "devex", "ReliefWeb", "TenderEasy",
    "Australian Government AusTender",
    "Canada Buy & Sell (PSPC)",
    "UK Find a Tender Service",
    "US SAM.gov", "US USAID Acquisitions",
    "Japan JICS Procurement", "Korea KOICA",
    "Germany DIHK", "France DGFiP Procurement",
    // Regional Organizations
    "Gulf Cooperation Council (GCC)",
    "League of Arab States", "OSCE",
    "Council of Europe", "OSCE Secretariat",
    "ECOWAS", "IGAD", "COMESA", "EAC",
    "SADC Secretariat", "MERCOSUR",
    "Pacific Community (SPC)", "IOC Indian Ocean Commission",
    "Caribbean Community (CARICOM)",
    "Arab Fund for Economic & Social Development",
    "Kuwait Fund for Arab Economic Development",
    "Abu Dhabi Fund for Development",
    "Saudi Fund for Development",
    // Environmental & Climate
    "Green Climate Fund (GCF)",
    "Global Environment Facility (GEF)",
    "Climate Investment Funds (CIF)",
    "Adaptation Fund",
    "Coalition for Epidemic Preparedness (CEPI)",
    "IPCC Secretariat",
    "Ramsar Convention Secretariat",
    "Convention on Biological Diversity (CBD)",
    // Other Intergovernmental Organizations
    "International Organization for Migration (IOM)",
    "International Criminal Court (ICC)",
    "International Court of Justice (ICJ)",
    "Permanent Court of Arbitration (PCA)",
    "International Labour Organization (ILO)",
    "International Fund for Agricultural Development (IFAD)",
    "Organization of American States (OAS)",
    "Pan American Health Organization (PAHO)",
    "Economic Commission for Latin America (ECLAC)",
    "Shanghai Cooperation Organisation (SCO)",
    "Commonwealth of Independent States (CIS)",
    "Intergovernmental Authority on Development (IGAD)",
    "International Seabed Authority (ISA)",
    "International Tribunal for the Law of the Sea (ITLOS)",
];

export default function GlobalTenderAuthoritiesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Breadcrumb Container */}
            <div className="container mx-auto px-3 sm:px-4 pt-4 pb-4 md:pt-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Link href="/" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Home
                    </Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <Link href="/global-tenders" className="text-slate-500 hover:text-bid-green transition-colors font-medium">
                        Global Tenders
                    </Link>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-slate-900 font-bold">Authorities</span>
                </div>
            </div>

            {/* Main Heading */}
            <div className="relative w-full bg-gradient-to-r from-[#034d3c] to-[#10b981] text-white shadow-lg py-12 md:py-16 mb-8 overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-3 sm:px-4 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                            <Building className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
                            Global Tenders <span className="text-white/70 italic">By Authority</span>
                        </h1>
                    </div>
                    <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                        Access procurement opportunities from major international financial institutions and global developmental organizations.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-3 sm:px-4 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {globalAuthorities.map((auth) => (
                        <Link
                            key={auth}
                            href={`/global-tenders?authority=${encodeURIComponent(auth)}`}
                            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-bid-green/30 hover:shadow-xl hover:shadow-bid-green/5 transition-all group flex items-center justify-between"
                        >
                            <span className="text-sm font-bold text-slate-700 group-hover:text-bid-green transition-colors truncate">
                                {auth}
                            </span>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-bid-green transform group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                        </Link>
                    ))}
                </div>
                
                {/* Search Prompt */}
                <div className="mt-16 p-8 bg-white rounded-[2rem] border border-slate-100 text-center shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">Looking for someone else?</h3>
                    <p className="text-slate-500 mb-6 font-medium">Use our smart filters to search for any specific agency or authority.</p>
                    <Link href="/global-tenders?focus=authority" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A0F1C] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-bid-green hover:text-bid-dark transition-all active:scale-95 shadow-xl">
                        Open Authority Filter
                    </Link>
                </div>
            </div>
        </div>
    );
}
