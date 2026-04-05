'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function TenderRequestBox() {
    const { user, isAuthenticated, openLogin } = useAuth();
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            openLogin();
            return;
        }

        if (!message.trim()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/user-requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message }),
            });

            if (response.ok) {
                setSubmitted(true);
                setMessage('');
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to submit request');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-bid-green/10 rounded-2xl flex items-center justify-center text-bid-green">
                    <MessageSquare size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Request Specific Tenders</h3>
                    <p className="text-slate-500 text-xs font-medium">Tell us what you need, and our admin will send you the best matches via Email.</p>
                </div>
            </div>

            {submitted ? (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center animate-in fade-in zoom-in duration-300">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h4 className="text-green-800 font-bold mb-1 uppercase tracking-tight">Request Received!</h4>
                    <p className="text-green-600 text-xs font-medium">Our admin team is searching for tenders matching your request. You will receive an update via Email shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Example: I need railway tenders in Maharashtra for civil works..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium text-slate-700 min-h-[120px] focus:outline-none focus:border-bid-green focus:ring-4 focus:ring-bid-green/5 transition-all placeholder:text-slate-400"
                            required
                        />
                        {error && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-bid-dark text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send size={16} />
                                Send Request to Admin
                            </>
                        )}
                    </button>
                    {!isAuthenticated && (
                        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            You need to <button type="button" onClick={openLogin} className="text-bid-green hover:underline">Sign In</button> to send a request.
                        </p>
                    )}
                </form>
            )}
        </div>
    );
}
