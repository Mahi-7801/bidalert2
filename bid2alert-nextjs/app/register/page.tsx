'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/?auth=register');
    }, [router]);

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center overflow-x-hidden">
            <div className="w-10 h-10 border-4 border-bid-green border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
