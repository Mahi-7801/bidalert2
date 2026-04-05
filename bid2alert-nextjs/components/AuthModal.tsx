'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Mail, Lock, User, Phone, Github, ArrowRight, AlertCircle, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthModal() {
    const { isAuthModalOpen, authModalMode, closeAuthModal, openLogin, openRegister, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Reset fields when mode changes or modal opens
    useEffect(() => {
        setError('');
        setIsLoading(false);
    }, [authModalMode, isAuthModalOpen]);

    if (!isAuthModalOpen) return null;

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

            if (!response.ok) {
                let errorMsg = 'Login failed';
                try {
                    const data = await response.json();
                    errorMsg = data.message || errorMsg;
                } catch (e) {
                    // JSON parsing failed
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            login(data.token, data.user);
            closeAuthModal();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!phone || phone.length < 10) {
            setError('Valid phone number is compulsory');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, password }),
            });

            if (!response.ok) {
                let errorMsg = 'Registration failed';
                try {
                    const data = await response.json();
                    errorMsg = data.message || data.errors?.[0]?.msg || errorMsg;
                } catch (e) {
                    // JSON parsing failed
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            login(data.token, data.user);
            closeAuthModal();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        window.location.href = `${apiUrl}/api/auth/${provider}`;
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={closeAuthModal}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[480px] max-h-[90vh] bg-white border border-slate-100 rounded-[40px] overflow-y-auto shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15),0_0_1px_rgba(0,0,0,0.1)] transition-all duration-500 transform scale-100 scrollbar-hide">

                {/* Close Button */}
                <button
                    onClick={closeAuthModal}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all z-20"
                >
                    <X size={20} />
                </button>

                {/* Left Accent Bar */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-bid-green" />

                <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-100 mb-4 shadow-sm">
                            {authModalMode === 'login' ? <Zap className="w-4 h-4 text-bid-green fill-bid-green/20" /> : <ShieldCheck className="w-4 h-4 text-bid-green" />}
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                                {authModalMode === 'login' ? 'Secure Access' : 'Partner Setup'}
                            </span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 flex items-center justify-center gap-3">
                            {authModalMode === 'login' ? 'Welcome Back' : 'Create Account'}
                            {authModalMode === 'login' && <Sparkles className="w-5 h-5 text-yellow-500" />}
                        </h2>
                    </div>

                    {/* Mode Toggle Tabs */}
                    <div className="flex bg-slate-100/50 p-1.5 rounded-[22px] mb-8 border border-slate-200/50 shadow-inner">
                        <button
                            onClick={openLogin}
                            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-[18px] transition-all duration-300 ${authModalMode === 'login' ? 'bg-white text-bid-dark shadow-md ring-1 ring-slate-100' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={openRegister}
                            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-[18px] transition-all duration-300 ${authModalMode === 'register' ? 'bg-white text-bid-dark shadow-md ring-1 ring-slate-100' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-[11px] font-medium flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={authModalMode === 'login' ? handleLogin : handleRegister} className="space-y-3">
                        {authModalMode === 'register' && (
                            <div className="space-y-3">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-bid-green transition-colors" />
                                        <input
                                            type="text" required
                                            value={name} onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm shadow-sm focus:outline-none focus:border-bid-green focus:ring-4 focus:ring-bid-green/5 transition-all placeholder:text-slate-300 font-medium"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                    <div className="relative group">
                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-bid-green transition-colors" />
                                        <input
                                            type="tel" required
                                            value={phone} onChange={(e) => setPhone(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm shadow-sm focus:outline-none focus:border-bid-green focus:ring-4 focus:ring-bid-green/5 transition-all placeholder:text-slate-300 font-medium"
                                            placeholder="10-digit number"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-bid-green transition-colors" />
                                <input
                                    type="email" required
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm shadow-sm focus:outline-none focus:border-bid-green focus:ring-4 focus:ring-bid-green/5 transition-all placeholder:text-slate-300 font-medium"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative group">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-bid-green transition-colors" />
                                    <input
                                        type="password" required minLength={6}
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm shadow-sm focus:outline-none focus:border-bid-green focus:ring-4 focus:ring-bid-green/5 transition-all placeholder:text-slate-300 font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {authModalMode === 'register' && (
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm</label>
                                    <div className="relative group">
                                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-bid-green transition-colors" />
                                        <input
                                            type="password" required minLength={6}
                                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm shadow-sm focus:outline-none focus:border-bid-green focus:ring-4 focus:ring-bid-green/5 transition-all placeholder:text-slate-300 font-medium"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 mt-4 bg-bid-green text-bid-dark rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(74,222,128,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(74,222,128,0.4)] hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${isLoading ? 'opacity-70' : ''}`}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-bid-dark/30 border-t-bid-dark rounded-full animate-spin" />
                            ) : (
                                <>
                                    {authModalMode === 'login' ? 'Begin Session' : 'Claim Portfolio'}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Login Section */}
                    <div className="mt-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px bg-slate-100 flex-1" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rapid OAuth</span>
                            <div className="h-px bg-slate-100 flex-1" />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => handleSocialLogin('github')}
                                className="flex-1 flex items-center justify-center gap-3 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-700 text-xs font-bold shadow-sm hover:shadow-md hover:bg-slate-50 transition-all border-b-[3px] active:border-b-0 active:translate-y-[3px]"
                            >
                                <Github size={18} /> GitHub
                            </button>
                            <button
                                onClick={() => handleSocialLogin('google')}
                                className="flex-1 flex items-center justify-center gap-3 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-700 text-xs font-bold shadow-sm hover:shadow-md hover:bg-slate-50 transition-all border-b-[3px] active:border-b-0 active:translate-y-[3px]"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.39-7.84 5.39-4.84 0-8.79-4.01-8.79-8.91 0-4.9 3.95-8.91 8.79-8.91 2.76 0 4.61 1.15 5.67 2.1 l2.58-2.48c-1.66-1.55-3.82-2.49-8.25-2.49C5.48 1.13 1 5.61 1 11.12c0 5.51 4.48 9.99 10.12 9.99 5.89 0 9.81-4.14 9.81-9.99 0-.67-.07-1.18-.16-1.7h-8.29z" /></svg>
                                Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const UserPlus = ({ className, size = 20 }: { className?: string, size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size} height={size}
        viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        className={className}
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" />
    </svg>
);
