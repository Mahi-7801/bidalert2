'use client';

import { useState, useEffect } from 'react';
import { Search, MessageCircle, Mail, Loader2, User, Calendar, Phone, Globe, Tag, Clock, Send, Archive, CheckCircle, FileText } from 'lucide-react';

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sendingEmail, setSendingEmail] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'contact' | 'requests'>('all');
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');
    const [sendingReply, setSendingReply] = useState(false);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/admin/user-requests`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            setMessages(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleAutoEmailSend = async (msg: any) => {
        setSendingEmail(msg.id);
        try {
            const response = await fetch(`/api/admin/auto-send-matches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ requestId: msg.id }),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message || 'Tender list emailed successfully!');
                fetchMessages();
            } else {
                alert(data.message || 'Failed to send email.');
            }
        } catch (err) {
            alert('Error sending email.');
        } finally {
            setSendingEmail(null);
        }
    };

    const handleStatusUpdate = async (id: number, status: string) => {
        try {
            await fetch(`/api/admin/user-requests/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status }),
            });
            fetchMessages();
        } catch (err) {
            console.error('Update failed:', err);
        }
    };

    const handleSendReply = async (msg: any) => {
        if (!replyText.trim()) return;
        setSendingReply(true);
        try {
            await fetch(`/api/admin/auto-send-matches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ requestId: msg.id, customReply: replyText })
            });
            setReplyingTo(null);
            setReplyText('');
            fetchMessages();
            alert('Reply sent successfully!');
        } catch (err) {
            alert('Error sending reply.');
        } finally {
            setSendingReply(false);
        }
    };

    // Categorise messages
    const isContactForm = (msg: any) => msg.message?.startsWith('[Contact Form]');
    const contactMessages = messages.filter(isContactForm);
    const tenderRequests = messages.filter(m => !isContactForm(m));

    const filtered =
        activeTab === 'contact' ? contactMessages :
        activeTab === 'requests' ? tenderRequests :
        messages;

    const newCount = messages.filter(m => m.status === 'new').length;
    const contactCount = contactMessages.filter(m => m.status === 'new').length;
    const requestCount = tenderRequests.filter(m => m.status === 'new').length;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-bid-green" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Messages...</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                        <MessageCircle className="text-bid-green" size={28} />
                        User Messages & Requests
                        {newCount > 0 && (
                            <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full animate-pulse">
                                {newCount} New
                            </span>
                        )}
                    </h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">
                        Contact form inquiries and custom tender requests from users.
                    </p>
                </div>
                <button
                    onClick={fetchMessages}
                    className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                >
                    <Loader2 size={12} /> Refresh
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-100 pb-0 overflow-x-auto scrollbar-hide w-full max-w-full">
                {[
                    { key: 'all', label: 'All Messages', count: messages.length, newCt: newCount },
                    { key: 'contact', label: '📩 Contact Form', count: contactMessages.length, newCt: contactCount },
                    { key: 'requests', label: '🎯 Tender Requests', count: tenderRequests.length, newCt: requestCount },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={`px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 whitespace-nowrap -mb-px shrink-0 ${
                            activeTab === tab.key
                                ? 'border-bid-green text-bid-green bg-bid-green/5'
                                : 'border-transparent text-slate-400 hover:text-slate-700'
                        }`}
                    >
                        {tab.label}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${activeTab === tab.key ? 'bg-bid-green/10 text-bid-green' : 'bg-slate-100 text-slate-400'}`}>
                            {tab.count}
                        </span>
                        {tab.newCt > 0 && (
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        )}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center">
                    <MessageCircle className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-slate-400 font-bold uppercase tracking-widest">No messages found</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filtered.map((msg) => {
                        const isContact = isContactForm(msg);
                        // Parse contact form message to extract subject and body
                        let displayMessage = msg.message || '';
                        let contactSubject = '';
                        if (isContact) {
                            const parts = displayMessage.replace('[Contact Form] Subject: ', '').split('\n\n');
                            contactSubject = parts[0] || '';
                            displayMessage = parts.slice(1).join('\n\n') || '';
                        }

                        return (
                            <div
                                key={msg.id}
                                className={`bg-white rounded-3xl shadow-sm border transition-all hover:shadow-xl hover:shadow-slate-200/50 overflow-hidden ${
                                    msg.status === 'new' ? 'border-bid-green/30 shadow-bid-green/5' :
                                    msg.status === 'archived' ? 'border-slate-100 opacity-60' :
                                    'border-slate-100'
                                }`}
                            >
                                {/* Type Badge Bar */}
                                <div className={`h-1 w-full ${isContact ? 'bg-blue-400' : 'bg-bid-green'}`} />

                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">

                                        {/* Left: Sender Info */}
                                        <div className="md:w-56 shrink-0 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
                                                    isContact
                                                        ? 'bg-blue-50 border-blue-200 text-blue-600'
                                                        : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                                }`}>
                                                    {isContact ? <><FileText size={10} /> Contact Form</> : <><Search size={10} /> Tender Request</>}
                                                </span>
                                                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${
                                                    msg.status === 'new' ? 'bg-red-50 text-red-500 animate-pulse' :
                                                    msg.status === 'replied' ? 'bg-green-50 text-green-600' :
                                                    msg.status === 'archived' ? 'bg-slate-100 text-slate-400' :
                                                    'bg-orange-50 text-orange-500'
                                                }`}>{msg.status}</span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-lg">
                                                    {(msg.user_name || 'U')[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 text-sm leading-none">{msg.user_name || '—'}</p>
                                                    {msg.user_id && <p className="text-[10px] text-slate-400 mt-0.5">User #{msg.user_id}</p>}
                                                </div>
                                            </div>

                                            <div className="space-y-1.5 text-[11px]">
                                                {msg.user_email && (
                                                    <a href={`mailto:${msg.user_email}`} className="flex items-center gap-2 text-slate-500 hover:text-bid-green transition-colors font-medium break-all">
                                                        <Mail size={11} className="shrink-0 text-slate-300" /> {msg.user_email}
                                                    </a>
                                                )}
                                                {msg.user_phone && (
                                                    <a href={`tel:${msg.user_phone}`} className="flex items-center gap-2 text-slate-500 hover:text-bid-green transition-colors font-medium">
                                                        <Phone size={11} className="shrink-0 text-slate-300" /> {msg.user_phone}
                                                    </a>
                                                )}
                                                <p className="flex items-center gap-2 text-slate-400 font-medium">
                                                    <Calendar size={11} className="shrink-0 text-slate-300" />
                                                    {new Date(msg.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Middle: Message Content */}
                                        <div className="flex-1 min-w-0">
                                            {isContact && contactSubject && (
                                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1.5">
                                                    Subject: {contactSubject}
                                                </p>
                                            )}
                                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-3">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Message</p>
                                                <p className="text-slate-800 font-medium text-sm leading-relaxed whitespace-pre-wrap">
                                                    "{displayMessage}"
                                                </p>
                                            </div>

                                            {/* Tags for Tender Requests */}
                                            {!isContact && (msg.keyword || msg.state || msg.country || msg.department || msg.duration_value) && (
                                                <div className="flex flex-wrap gap-2">
                                                    {msg.keyword && <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">🔑 {msg.keyword}</span>}
                                                    {msg.state && <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">📍 {msg.state}</span>}
                                                    {msg.country && <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">🌍 {msg.country}</span>}
                                                    {msg.department && <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">🏢 {msg.department}</span>}
                                                    {msg.duration_value && (
                                                        <span className="px-3 py-1 bg-bid-green/10 border border-bid-green/20 rounded-full text-[10px] font-black text-bid-green uppercase tracking-wider">
                                                            ⏱ {msg.duration_value} {msg.duration_unit?.toLowerCase()}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Inline Reply Box */}
                                            {replyingTo === msg.id && (
                                                <div className="mt-4 border border-bid-green/20 rounded-2xl p-4 bg-bid-green/5">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-bid-green mb-2">Reply to {msg.user_name}</p>
                                                    <textarea
                                                        value={replyText}
                                                        onChange={e => setReplyText(e.target.value)}
                                                        rows={3}
                                                        placeholder="Type your reply..."
                                                        className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bid-green resize-none mb-3"
                                                    />
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleSendReply(msg)}
                                                            disabled={sendingReply}
                                                            className="px-5 py-2 bg-bid-green text-bid-dark text-xs font-black rounded-xl hover:brightness-105 flex items-center gap-2 disabled:opacity-50"
                                                        >
                                                            {sendingReply ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                                                            Send Reply
                                                        </button>
                                                        <button onClick={() => setReplyingTo(null)} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-900 border border-slate-200 rounded-xl">Cancel</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right: Actions */}
                                        <div className="md:w-40 shrink-0 flex flex-col gap-2">
                                            {/* Quick reply inline switch */}
                                            {msg.user_email && (
                                                <button
                                                    onClick={() => {
                                                        const isRequest = !isContactForm(msg);
                                                        const noActivePlan = msg.status === 'new';
                                                        
                                                        setReplyingTo(replyingTo === msg.id ? null : msg.id);
                                                        
                                                        if (replyingTo !== msg.id && isRequest && noActivePlan) {
                                                            setReplyText(`Hello ${msg.user_name},\n\nThank you for your tender request. To access our specialized curation service, please upgrade to one of our professional plans:\n\n💎 BIDALERT PRICING PLANS 💎\n\n1. Basic\n   ₹1,500 / 1 Month\n   - Web Access, Email Alerts, Bidding Guidance, 24/7 Support\n\n2. Standard\n   ₹3,500 / 3 Months\n   - Web Access, Email Alerts, Bidding Guidance, 24/7 Support\n\n3. Diamond\n   ₹7,500 / 6 Months\n   - Web Access, Email Alerts, Bidding Guidance, 24/7 Support\n\n4. Premium (MOST POPULAR)\n   ₹12,500 / 12 Months\n   - Web Access, Email Alerts, Bidding Guidance, 24/7 Support\n\nYou can select your plan directly from the 'Plans' section. Once active, your request will be processed immediately.`);
                                                        } else {
                                                            setReplyText('');
                                                        }
                                                    }}
                                                    className={`w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                                                        !isContactForm(msg) && msg.status === 'new' 
                                                            ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                                    }`}
                                                >
                                                    <Mail size={12} /> 
                                                    {replyingTo === msg.id 
                                                        ? 'Cancel Reply' 
                                                        : (!isContactForm(msg) && msg.status === 'new' ? 'Send Pricing Plans' : 'Send Email Reply')
                                                    }
                                                </button>
                                            )}

                                            {!isContact && (
                                                <>
                                                    <a
                                                        href={`/tenders?q=${encodeURIComponent(msg.keyword || msg.message?.substring(0, 40) || '')}`}
                                                        target="_blank"
                                                        className="w-full bg-white border-2 border-slate-900 text-slate-900 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                                                    >
                                                        <Search size={12} /> Search Tenders
                                                    </a>
                                                    <button
                                                        onClick={() => handleAutoEmailSend(msg)}
                                                        disabled={sendingEmail === msg.id}
                                                        className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-700 transition-all disabled:opacity-50"
                                                    >
                                                        {sendingEmail === msg.id ? <Loader2 size={12} className="animate-spin" /> : <Mail size={12} />}
                                                        Send Tender List
                                                    </button>
                                                </>
                                            )}

                                            <div className="grid grid-cols-2 gap-1.5 mt-1">
                                                <button
                                                    onClick={() => handleStatusUpdate(msg.id, 'read')}
                                                    className="py-2 border border-slate-200 rounded-xl text-[9px] font-black text-slate-500 uppercase hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all"
                                                >
                                                    ✓ Read
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(msg.id, 'archived')}
                                                    className="py-2 border border-slate-200 rounded-xl text-[9px] font-black text-slate-500 uppercase hover:bg-slate-100 transition-all"
                                                >
                                                    Archive
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
