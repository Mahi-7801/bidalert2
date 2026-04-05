'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, Check, Loader2, X } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// AlertMeButton
//
// Usage on India Tenders page:
//   <AlertMeButton keyword={searchQuery} tenderType="india" />
//
// Usage on Global Tenders page:
//   <AlertMeButton keyword={searchQuery} tenderType="global" />
// ─────────────────────────────────────────────────────────────────────────────

interface AlertMeButtonProps {
    keyword: string;          // current search query / keyword
    tenderType: 'india' | 'global';
    className?: string;
}

export default function AlertMeButton({ keyword, tenderType, className = '' }: AlertMeButtonProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'active' | 'success' | 'error'>('idle');
    const [alertId, setAlertId] = useState<number | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // ── On keyword change, check if alert already exists ────────────────────
    useEffect(() => {
        if (!keyword?.trim()) { setStatus('idle'); return; }

        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) { setStatus('idle'); return; }

        const check = async () => {
            try {
                const res = await fetch(
                    `${apiBase}/api/keyword-alerts/check?keyword=${encodeURIComponent(keyword.trim())}&tender_type=${tenderType}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const data = await res.json();
                if (data.exists) {
                    setStatus('active');
                    setAlertId(data.alertId);
                } else {
                    setStatus('idle');
                    setAlertId(null);
                }
            } catch {
                setStatus('idle');
            }
        };

        const debounce = setTimeout(check, 400);
        return () => clearTimeout(debounce);
    }, [keyword, tenderType, apiBase]);

    // ── Show toast helper ────────────────────────────────────────────────────
    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3500);
    };

    // ── Handle click: set alert or remove it ────────────────────────────────
    const handleClick = async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) {
            showToast('Please log in to set alerts');
            return;
        }

        if (!keyword?.trim()) {
            showToast('Type a keyword first to set an alert');
            return;
        }

        setStatus('loading');

        try {
            if (alertId) {
                // ── Remove alert ─────────────────────────────────────────────
                const res = await fetch(`${apiBase}/api/keyword-alerts/${alertId}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to remove alert');
                setStatus('idle');
                setAlertId(null);
                showToast(`🔕 Alert removed for "${keyword.trim()}"`);
            } else {
                // ── Create alert ─────────────────────────────────────────────
                const res = await fetch(`${apiBase}/api/keyword-alerts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        keyword: keyword.trim(),
                        tender_type: tenderType
                    })
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to set alert');

                setStatus('success');
                showToast(`🔔 Alert set! You'll get daily emails for "${keyword.trim()}"`);

                // Re-check to get the alertId
                setTimeout(async () => {
                    const check = await fetch(
                        `${apiBase}/api/keyword-alerts/check?keyword=${encodeURIComponent(keyword.trim())}&tender_type=${tenderType}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    const checkData = await check.json();
                    setAlertId(checkData.alertId);
                    setStatus('active');
                }, 600);
            }
        } catch (err: any) {
            setStatus('idle');
            showToast(err.message || 'Something went wrong');
        }
    };

    // ── Don't render if no keyword ───────────────────────────────────────────
    if (!keyword?.trim()) return null;

    // ── Button styles per state ──────────────────────────────────────────────
    const buttonConfig = {
        idle: {
            bg: 'bg-white border border-emerald-500 text-emerald-700 hover:bg-emerald-50',
            icon: <Bell size={15} className="flex-shrink-0" />,
            label: 'Alert Me'
        },
        loading: {
            bg: 'bg-white border border-slate-300 text-slate-400 cursor-not-allowed',
            icon: <Loader2 size={15} className="animate-spin flex-shrink-0" />,
            label: 'Saving...'
        },
        active: {
            bg: 'bg-emerald-600 border border-emerald-600 text-white hover:bg-red-500 hover:border-red-500 group',
            icon: (
                <>
                    <BellOff size={15} className="flex-shrink-0 hidden group-hover:block" />
                    <Check size={15} className="flex-shrink-0 group-hover:hidden" />
                </>
            ),
            label: (
                <>
                    <span className="group-hover:hidden">Alerted</span>
                    <span className="hidden group-hover:inline">Remove</span>
                </>
            )
        },
        success: {
            bg: 'bg-emerald-600 border border-emerald-600 text-white',
            icon: <Check size={15} className="flex-shrink-0" />,
            label: 'Alert Set!'
        },
        error: {
            bg: 'bg-red-50 border border-red-300 text-red-600',
            icon: <X size={15} className="flex-shrink-0" />,
            label: 'Try again'
        }
    };

    const cfg = buttonConfig[status] || buttonConfig.idle;

    return (
        <div className={`relative inline-flex flex-col items-start ${className}`}>
            {/* Toast */}
            {toast && (
                <div className="absolute -top-11 left-0 right-0 z-50 bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
                    {toast}
                    <div className="absolute bottom-[-5px] left-4 w-2.5 h-2.5 bg-slate-900 rotate-45" />
                </div>
            )}

            <button
                onClick={handleClick}
                disabled={status === 'loading'}
                className={`
                    inline-flex items-center gap-1.5 px-3 py-2 rounded-lg
                    font-semibold text-xs transition-all duration-200
                    ${cfg.bg}
                    disabled:opacity-60
                `}
                title={
                    status === 'active'
                        ? `Remove alert for "${keyword}"`
                        : `Get daily email alerts for "${keyword}"`
                }
            >
                {cfg.icon}
                <span>{cfg.label}</span>
            </button>
        </div>
    );
}
