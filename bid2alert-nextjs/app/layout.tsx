import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BidAlert - India's Most Trusted Tender Information Portal",
    description: "Access 50,000+ live tenders, get instant alerts, and win more contracts with India's most comprehensive tender platform.",
    icons: {
        icon: [
            { url: '/icon', type: 'image/png', sizes: '32x32' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        apple: [
            { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
        ],
        shortcut: '/icon',
    },
    manifest: '/manifest.json',
};

export const viewport = {
    themeColor: '#0f1b35',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <AuthProvider>
                    <LayoutWrapper>
                        {children}
                    </LayoutWrapper>
                </AuthProvider>
            </body>
        </html>
    );
}
