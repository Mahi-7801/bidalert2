'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

function LoginSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');

        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                login(token, user);

                // If phone number is missing (OAuth users), force profile completion
                if (!user.phone) {
                    router.push('/complete-profile');
                } else {
                    router.push('/');
                }
            } catch (err) {
                console.error('Failed to parse user data from OAuth', err);
                router.push('/login?error=oauth_parse_failed');
            }
        } else {
            router.push('/login?error=no_token');
        }
    }, [searchParams, login, router]);

    return (
        <div className="min-h-screen bg-[#050B15] flex flex-col items-center justify-center text-white">
            <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 text-bid-green animate-spin mx-auto" />
                <h1 className="text-2xl font-bold">Authenticating...</h1>
                <p className="text-gray-400">Finalizing your secure session.</p>
            </div>
        </div>
    );
}

export default function LoginSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050B15] flex flex-col items-center justify-center text-white">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-bid-green animate-spin mx-auto" />
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            </div>
        }>
            <LoginSuccessContent />
        </Suspense>
    );
}
