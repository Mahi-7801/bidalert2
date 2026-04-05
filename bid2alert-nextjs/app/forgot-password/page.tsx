'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setMessage('');

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (res.ok) {
                const data = await res.json();
                setStatus('success');
                setMessage('Reset link sent to your email.');
            } else {
                let errorMsg = 'Failed to send reset email.';
                try {
                    const data = await res.json();
                    errorMsg = data.message || errorMsg;
                } catch (e) {
                    // JSON parsing failed
                }
                setStatus('error');
                setMessage(errorMsg);
            }
        } catch (error) {
            setStatus('error');
            setMessage('Network error. Check server.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Recover your password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter your email to receive a reset link
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {status === 'success' ? (
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
                            <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto mb-6">
                                We've sent a password reset link to <span className="font-bold">{email}</span>.
                            </p>
                            <Link href="/login" className="text-bid-green hover:underline">
                                Return to login
                            </Link>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-bid-green focus:border-bid-green sm:text-sm"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                                    <AlertTriangle size={16} /> {message}
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bid-dark hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bid-green transition
                                    ${status === 'sending' ? 'opacity-70 cursor-wait' : ''}`}
                                >
                                    {status === 'sending' ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </div>
                        </form>
                    )}

                    {status !== 'success' && (
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Or
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <Link href="/login" className="font-medium text-bid-green hover:text-bid-dark">
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
