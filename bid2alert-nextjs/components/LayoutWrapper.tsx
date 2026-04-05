'use client';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

import AuthModal from '@/components/AuthModal';
import TenderTicker from '@/components/TenderTicker';
import BidGPTWidget from '@/components/BidGPTWidget';
import WhatsAppWidget from '@/components/WhatsAppWidget';


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    const isViewDocument = pathname?.startsWith('/view-document');
    const isHome = pathname === '/';

    const showLayout = !isAdmin && !isViewDocument;

    return (
        <>
            {showLayout && (
                <div suppressHydrationWarning>
                    <Suspense fallback={<div className="h-[85px] bg-[#0A0F1C]" />}>
                        <Header />
                        {isHome && <TenderTicker />}
                    </Suspense>
                </div>
            )}
            <main className={!isAdmin && !isViewDocument ? "min-h-screen pb-24 sm:pb-0" : "h-screen"}>
                {children}
            </main>
            {showLayout && <Footer />}
            {showLayout && (
                <>
                    <BidGPTWidget />
                    <WhatsAppWidget />
                </>
            )}
            <AuthModal />
        </>
    );
}
