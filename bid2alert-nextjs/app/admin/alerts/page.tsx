'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Send, Users, AlertTriangle, CheckCircle, Bell, X, Plus,
    Trash2, BellOff, RefreshCw, Megaphone, Info, AlertCircle
} from 'lucide-react';

interface NotificationItem {
    id: number;
    title: string;
    message: string;
    type: string;
    is_read: boolean;
    user_id: number | null;
    link: string | null;
    created_at: string;
}

const BASE_URL = '';

function AlertsContent() {
    const searchParams = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const [alerts, setAlerts] = useState<NotificationItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        recipient: 'all',
        subject: '',
        message: ''
    });

    useEffect(() => {
        if (searchParams?.get('action') === 'create') {
            setIsModalOpen(true);
        }
    }, [searchParams]);

    const fetchAlerts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/admin/alerts`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (res.ok) {
                const data = await res.json();
                setAlerts(data.alerts || []);
            }
        } catch (err) {
            console.error('Failed to fetch alerts', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    const handleMarkAllRead = async () => {
        try {
            await fetch(`${BASE_URL}/api/admin/alerts/mark-all-read`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setAlerts(prev => prev.map(a => ({ ...a, is_read: true })));
        } catch (err) {
            console.error('Failed to mark all read', err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await fetch(`${BASE_URL}/api/admin/alerts/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setAlerts(prev => prev.filter(a => a.id !== id));
        } catch (err) {
            console.error('Failed to delete alert', err);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setStatusMessage('');

        try {
            const res = await fetch(`${BASE_URL}/api/alerts/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setStatusMessage('Alert sent successfully!');
                setFormData({ ...formData, subject: '', message: '' });
                setTimeout(() => {
                    setIsModalOpen(false);
                    setStatus('idle');
                    fetchAlerts(); // Refresh the list
                }, 1500);
            } else {
                setStatus('error');
                setStatusMessage(data.message || 'Failed to send alert');
            }
        } catch (error) {
            setStatus('error');
            setStatusMessage('Network error. Check server.');
        }
    };

    const unreadCount = alerts.filter(a => !a.is_read).length;

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'alert': return <Megaphone size={16} className="text-red-500" />;
            case 'info': return <Info size={16} className="text-blue-500" />;
            case 'warning': return <AlertCircle size={16} className="text-amber-500" />;
            default: return <Bell size={16} className="text-gray-400" />;
        }
    };

    const formatDate = (dateStr: string) => {
        try {
            const d = new Date(dateStr);
            return d.toLocaleString('en-IN', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        } catch { return dateStr; }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">System Alerts</h1>
                    {unreadCount > 0 && (
                        <p className="text-sm text-red-500 font-semibold mt-0.5">
                            {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllRead}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
                        >
                            <BellOff size={16} /> Mark all read
                        </button>
                    )}
                    <button
                        onClick={fetchAlerts}
                        className="p-2 text-gray-400 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                        title="Refresh"
                    >
                        <RefreshCw size={16} />
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#0a0f1c] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-emerald-600 transition font-bold flex items-center gap-2 text-sm"
                    >
                        <Plus size={18} /> <span className="whitespace-nowrap">Create Alert</span>
                    </button>
                </div>
            </div>

            {/* Alerts List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm text-gray-400 font-medium">Loading alerts...</p>
                    </div>
                ) : alerts.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="bg-gray-50 text-gray-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">No Active Alerts</h3>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto">
                            There are no system-wide alerts currently. Create a new alert to notify users about important updates.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`flex items-start gap-4 px-6 py-4 transition-colors hover:bg-gray-50/60 ${!alert.is_read ? 'bg-emerald-50/30 border-l-4 border-l-emerald-400' : ''}`}
                            >
                                {/* Icon */}
                                <div className={`mt-0.5 p-2 rounded-lg flex-shrink-0 ${!alert.is_read ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                                    {getTypeIcon(alert.type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className={`text-sm font-bold ${!alert.is_read ? 'text-gray-900' : 'text-gray-600'}`}>
                                            {alert.title}
                                        </p>
                                        {!alert.is_read && (
                                            <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-black rounded-full uppercase tracking-wider">
                                                New
                                            </span>
                                        )}
                                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-bold rounded uppercase tracking-wider">
                                            {alert.user_id === null ? 'Global' : `User #${alert.user_id}`}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{alert.message}</p>
                                    {alert.link && (
                                        <a href={alert.link} className="text-xs text-emerald-600 hover:underline mt-0.5 inline-block">
                                            View →
                                        </a>
                                    )}
                                    <p className="text-[10px] text-gray-400 mt-1.5 font-medium">{formatDate(alert.created_at)}</p>
                                </div>

                                {/* Delete */}
                                <button
                                    onClick={() => handleDelete(alert.id)}
                                    className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition flex-shrink-0"
                                    title="Delete alert"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Compose Alert Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-2xl">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Send size={20} className="text-emerald-500" /> Compose Alert
                            </h2>
                            <button onClick={() => { setIsModalOpen(false); setStatus('idle'); }} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleSend} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Recipients</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer transition ${formData.recipient === 'all' ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input type="radio" name="recipient" value="all" checked={formData.recipient === 'all'} onChange={e => setFormData({ ...formData, recipient: e.target.value })} className="hidden" />
                                            <Users className={formData.recipient === 'all' ? 'text-emerald-500' : 'text-gray-400'} size={20} />
                                            <div>
                                                <div className="font-bold text-sm">All Users</div>
                                                <div className="text-xs text-gray-500">Broadcast to everyone</div>
                                            </div>
                                        </label>
                                        <label className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer transition ${formData.recipient === 'bidalertdemo@gmail.com' ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input type="radio" name="recipient" value="bidalertdemo@gmail.com" checked={formData.recipient === 'bidalertdemo@gmail.com'} onChange={e => setFormData({ ...formData, recipient: e.target.value })} className="hidden" />
                                            <AlertTriangle className={formData.recipient === 'bidalertdemo@gmail.com' ? 'text-emerald-500' : 'text-gray-400'} size={20} />
                                            <div>
                                                <div className="font-bold text-sm">Test Alert</div>
                                                <div className="text-xs text-gray-500">Send to self only</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition font-medium text-sm"
                                        placeholder="e.g. Important: System Maintenance"
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                    <textarea
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none h-36 resize-none transition text-sm"
                                        placeholder="Type your message here..."
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                {status === 'success' && (
                                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium">
                                        <CheckCircle size={16} /> {statusMessage}
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium">
                                        <AlertTriangle size={16} /> {statusMessage}
                                    </div>
                                )}

                                <div className="pt-2 flex justify-end gap-3">
                                    <button type="button" onClick={() => { setIsModalOpen(false); setStatus('idle'); }} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition font-medium text-sm">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className={`px-6 py-2.5 bg-[#0a0f1c] text-white rounded-xl font-bold flex items-center gap-2 transition text-sm ${status === 'sending' ? 'opacity-60 cursor-not-allowed' : 'hover:bg-emerald-600'}`}
                                    >
                                        {status === 'sending' ? (
                                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                                        ) : (
                                            <><Send size={16} /> Send Alert</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AdminAlertsPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading alerts...</div>}>
            <AlertsContent />
        </Suspense>
    );
}
