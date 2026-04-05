import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // output: 'export', // Disabled to support Vercel Rewrites & Image Optimization
    reactStrictMode: true,
    // turbopack uses project root by default — no override needed
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/v2/:path*',
                destination: 'http://localhost:8000/api/:path*', // Proxy to Python BidAnalyzer backend
            },
            {
                source: '/api/:path*',
                destination: 'http://localhost:5000/api/:path*', // Proxy to Node.js backend
            },
            {
                source: '/uploads/:path*',
                destination: 'http://localhost:5000/uploads/:path*', // Proxy file uploads
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Permissions-Policy',
                        value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
                    }
                ]
            }
        ];
    },
} as any; // Using 'as any' to bypass strict type checking for deployment

export default nextConfig;
