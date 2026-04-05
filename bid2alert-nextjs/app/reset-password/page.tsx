'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, CheckCircle, AlertTriangle } from 'lucide-react';

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams?.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setStatus('error');
            setMessage('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setStatus('error');
            setMessage('Password must be at least 6 characters');
            return;
        }

        setStatus('sending');
        setMessage('');

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password })
            });

            if (res.ok) {
                const data = await res.json();
                setStatus('success');
                setMessage('Password updated successfully.');
                setTimeout(() => router.push('/login'), 3000);
            } else {
                let errorMsg = 'Failed to reset password.';
                try {
                    const data = await res.json();
                    errorMsg = data.message || errorMsg;
                } catch (e) {
                    // JSON parsing failed, likely a 500 error page
                }
                setStatus('error');
                setMessage(errorMsg);
            }
        } catch (error) {
            setStatus('error');
            setMessage('Network error. Check server.');
        }
    };

    if (!token) {
        return (
            <div className="text-center p-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Invalid Link</h3>
                <p className="text-gray-500 mb-4">This password reset link is invalid or missing a token.</p>
                <Link href="/forgot-password" className="text-bid-green font-medium hover:underline">
                    Request a new link
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 w-full max-w-md">
            {status === 'success' ? (
                <div className="text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Password Reset!</h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto mb-6">
                        Your password has been successfully updated. Redirecting to login...
                    </p>
                    <Link href="/login" className="text-bid-green hover:underline">
                        Login now
                    </Link>
                </div>
            ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-bid-green focus:border-bid-green sm:text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-bid-green focus:border-bid-green sm:text-sm"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            {status === 'sending' ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 items-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Set new password
                </h2>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordContent />
            </Suspense>
        </div>
    );
}
