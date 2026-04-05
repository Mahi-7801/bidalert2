'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Sparkles, Zap, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginContent() {
    const { login, isAuthenticated, isLoading: authLoading } = useAuth();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            login(data.token, data.user);
            // Redirect to callbackUrl if it exists, otherwise use default
            const redirectUrl = data.user.role === 'admin' ? '/admin/dashboard' : (callbackUrl || '/');
            window.location.href = redirectUrl;
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading) return null;

    return (
        <div className="min-h-screen bg-[#050B15] flex items-center justify-center p-4 relative overflow-hidden overflow-x-hidden">
            {/* Background Accents - Softer for Light Mode */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-bid-green/[0.03] blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/[0.03] blur-[100px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <motion.div
                // @ts-ignore
                initial={{ opacity: 0, scale: 0.95 }}
                // @ts-ignore
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[450px] z-10"
            >
                <div className="bg-[#0A0F1C] border border-white/5 rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-bid-green" />

                    <div className="p-8 sm:p-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 mb-4">
                                <Zap className="w-3.5 h-3.5 text-bid-green fill-bid-green" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">Secure Entrance</span>
                            </div>
                            <h1 className="text-3xl font-black text-white flex items-center justify-center gap-3 tracking-tighter">
                                Account Login
                                <ShieldCheck className="w-6 h-6 text-bid-green" />
                            </h1>
                            <p className="text-white/60 text-sm mt-2">Access your BidAlert account to manage your tenders</p>
                        </div>

                        {error && (
                            <motion.div
                                // @ts-ignore
                                initial={{ opacity: 0, y: -10 }}
                                // @ts-ignore
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-[11px] font-medium flex items-center gap-3 mb-6"
                            >
                                <AlertCircle className="w-4 h-4 text-red-500" />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Account Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-bid-green transition-colors" />
                                    <input
                                        type="email" required
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-[#F1F5F9] border border-transparent rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-bid-green focus:bg-white transition-all placeholder:text-slate-400"
                                        placeholder="admin@bidalert.in"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Account Password</label>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-bid-green transition-colors" />
                                    <input
                                        type="password" required
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-[#F1F5F9] border border-transparent rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-bid-green focus:bg-white transition-all placeholder:text-slate-400"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 mt-6 bg-bid-green text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_10px_20px_rgba(0,168,107,0.2)] hover:shadow-[0_15px_30px_rgba(0,168,107,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:brightness-110'}`}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <Link href="/" className="text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors font-medium">
                                ← Return to Marketplace
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="text-center text-slate-400 text-[10px] mt-8 uppercase tracking-[0.3em] font-bold">
                    Property of Resilient Shield Cyber Solutions
                </p>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginContent />
        </Suspense>
    );
}
