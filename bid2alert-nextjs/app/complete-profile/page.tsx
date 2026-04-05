'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Phone, ArrowRight, AlertCircle, ShieldCheck, Zap } from 'lucide-react';

export default function CompleteProfilePage() {
    const router = useRouter();
    const { user, token, login } = useAuth();
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // If user already has a phone, they shouldn't be here
    useEffect(() => {
        if (user && user.phone) {
            router.push('/');
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!phone || phone.length < 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setIsLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/auth/complete-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ phone }),
            });

            if (!response.ok) {
                let errorMsg = 'Failed to update profile';
                try {
                    const data = await response.json();
                    errorMsg = data.message || errorMsg;
                } catch (e) {
                    // JSON parsing failed
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();

            // Update user in context
            if (user) {
                const updatedUser = { ...user, phone };
                login(token || '', updatedUser);
            }

            router.push('/');
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050B15] flex flex-col items-center justify-center p-4 relative font-sans">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

            <div className="w-full max-w-[440px] relative z-10 transition-all duration-500">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 mb-4">
                        <ShieldCheck className="w-4 h-4 text-bid-green" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Final Step</span>
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2">
                        Complete Your <span className="text-bid-green">Profile</span>
                    </h1>
                    <p className="text-gray-400 text-sm font-medium">
                        To secure your account and receive alerts, we need your phone number.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 shadow-2xl backdrop-blur-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-2xl text-xs flex items-center gap-3 animate-in fade-in transition-all">
                                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-500 group-focus-within:text-bid-green transition-colors" />
                                </div>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-bid-green transition-all font-medium text-sm"
                                    placeholder="Enter 10-digit number"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full group relative flex justify-center py-4 px-4 bg-bid-green text-bid-dark rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${isLoading ? 'opacity-70 disabled:grayscale' : 'shadow-[0_10px_20px_rgba(0,168,107,0.3)] hover:shadow-[0_15px_30px_rgba(0,168,107,0.4)] active:scale-[0.98]'}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-3">
                                    <svg className="animate-spin h-5 w-5 text-bid-dark" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Complete Setup <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
