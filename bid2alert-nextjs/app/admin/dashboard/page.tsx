'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    Users, 
    FileText, 
    Layout, 
    MessageSquare, 
    TrendingUp, 
    CheckCircle2, 
    Clock, 
    PlusCircle, 
    Newspaper, 
    Send,
    Activity
} from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        users: 0,
        total_users: 0,
        admins: 0,
        tenders: 0,
        blogs: 0,
        documents: 0,
        revenue: 0,
        pending_revenue: 0,
        pending_requests: 0,
        recent_requests: [] as any[],
        infrastructure_health: 0,
        tender_breakdown: {
            gem: 0,
            eprocurement: 0,
            ireps: 0,
            global: 0
        }
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`/api/admin/stats`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            label: 'Total Tenders',
            value: stats.tenders,
            change: 'Active & Live',
            color: 'blue',
            icon: Layout,
            breakdown: stats.tender_breakdown
        },
        { 
            label: 'Total Customers', 
            value: stats.total_users, 
            change: `${stats.users} Active Clients`, 
            color: 'emerald',
            icon: Users 
        },
        { 
            label: 'Pending Requirements', 
            value: stats.pending_requests, 
            change: 'Critical Tasks', 
            color: 'orange',
            icon: Clock 
        },
        { 
            label: 'Total Revenue', 
            value: `₹${stats.revenue.toLocaleString('en-IN')}`, 
            change: `+₹${stats.pending_revenue.toLocaleString('en-IN')} Unpaid`, 
            color: 'purple',
            icon: TrendingUp 
        },
    ];

    const messages = stats.recent_requests || [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'replied': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'archived': return 'bg-gray-100 text-gray-500 border-gray-200';
            default: return 'bg-amber-50 text-amber-600 border-amber-100';
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto pb-10 overflow-hidden lg:overflow-visible w-full">
            {/* Header with quick stats */}
            <div className="mb-6 sm:mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="min-w-0">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2 uppercase break-words">Command Center</h1>
                    <div className="text-gray-500 font-medium flex items-start sm:items-center gap-2">
                        <Activity size={16} className="text-bid-green animate-pulse shrink-0 mt-1 sm:mt-0" />
                        <p className="min-w-0">System fully operational. Monitoring 5 core modules.</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 transition hover:shadow-md">
                        <div className="w-10 h-10 rounded-xl bg-bid-green/10 flex items-center justify-center text-bid-green">
                            <Newspaper size={20} />
                        </div>
                        <div>
                            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Blog Posts</span>
                            <span className="text-lg font-bold text-gray-900">{stats.blogs}</span>
                        </div>
                    </div>
                    <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 transition hover:shadow-md">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <FileText size={20} />
                        </div>
                        <div>
                            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Library Docs</span>
                            <span className="text-lg font-bold text-gray-900">{stats.documents}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 min-h-[220px]">
                        <div className="flex justify-between items-center mb-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                stat.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                'bg-purple-50 text-purple-600'
                            }`}>
                                <stat.icon size={20} />
                            </div>
                            <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${
                                stat.color === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>
                                {stat.change}
                            </span>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-2">
                            <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.15em] mb-2 block">{stat.label}</span>
                            <span className="text-4xl font-black text-gray-900 leading-tight">
                                {isLoading ? '...' : stat.value}
                            </span>
                        </div>

                        {stat.breakdown && (
                            <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-2 gap-2">
                                {[
                                    { label: 'GeM', val: stat.breakdown.gem },
                                    { label: 'ePro', val: stat.breakdown.eprocurement },
                                    { label: 'IREPS', val: stat.breakdown.ireps },
                                    { label: 'Global', val: stat.breakdown.global }
                                ].map((b, i) => (
                                    <div key={i} className="flex justify-between items-center bg-gray-50/50 px-2 py-1.5 rounded-lg border border-gray-100/50">
                                        <span className="text-[8px] font-bold text-gray-400 uppercase">{b.label}</span>
                                        <span className="text-[10px] font-black text-gray-700">{isLoading ? '-' : b.val}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Requirements Table Feed */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
                        <div className="flex items-center gap-3 truncate">
                            <div className="w-10 h-10 shrink-0 rounded-2xl bg-bid-dark text-white flex items-center justify-center">
                                <MessageSquare size={20} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase truncate">Recent Intelligence</h2>
                        </div>
                        <Link href="/admin/messages" className="text-[10px] sm:text-xs font-black text-bid-green hover:underline uppercase tracking-widest bg-bid-green/5 px-4 py-2 rounded-full self-start sm:self-auto shrink-0">View Repository</Link>
                    </div>

                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="p-12 text-center">
                                <div className="w-8 h-8 border-4 border-bid-green/20 border-t-bid-green rounded-full animate-spin mx-auto mb-4" />
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Retrieving Secure Data...</span>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="bg-white p-20 rounded-[2.5rem] border-2 border-dashed border-gray-100 text-center">
                                <MessageSquare size={40} className="mx-auto text-gray-200 mb-4" />
                                <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">No active requirements captured</p>
                            </div>
                        ) : messages.map((msg: any) => (
                            <div key={msg.id} className="bg-white p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-bid-green/30 transition-all group relative overflow-hidden">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 w-full sm:w-auto">
                                        <div className={`h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-2xl flex items-center justify-center font-black text-lg sm:text-xl transition-transform group-hover:scale-110 ${msg.status === 'new' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                                            {(msg.user_name || 'U').charAt(0)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between sm:justify-start gap-2 mb-0.5">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <h4 className="font-black text-gray-900 text-base sm:text-lg tracking-tight group-hover:text-bid-green transition-colors truncate max-w-[120px] sm:max-w-xs">{msg.user_name}</h4>
                                                    <span className={`text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded-lg border uppercase tracking-widest shrink-0 ${getStatusColor(msg.status)}`}>
                                                        {msg.status}
                                                    </span>
                                                </div>
                                                <div className="text-[8px] sm:text-[10px] font-black text-gray-300 uppercase tracking-widest bg-gray-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl shrink-0 sm:hidden">
                                                    {new Date(msg.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </div>
                                            </div>
                                            <div className="text-[9px] sm:text-[11px] text-gray-400 font-bold tracking-tight truncate">
                                                {msg.user_email} {msg.user_phone ? `• ${msg.user_phone}` : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block text-[10px] font-black text-gray-300 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-xl shrink-0">
                                        {new Date(msg.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </div>
                                </div>
                                <div className="bg-gray-50/50 p-3 sm:p-4 rounded-2xl border border-gray-100/50 mb-3 sm:mb-4">
                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium break-words">"{msg.message}"</p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        {msg.duration_value && (
                                            <span className="text-[8px] sm:text-[9px] font-black text-bid-green bg-bid-green/5 border border-bid-green/10 px-3 py-2 sm:py-1 rounded-xl sm:rounded-full uppercase tracking-wider text-center flex-1 sm:flex-none truncate">
                                                {msg.duration_value} {msg.duration_unit} Monitoring
                                            </span>
                                        )}
                                        {msg.state && <span className="text-[8px] sm:text-[9px] font-black text-gray-400 bg-gray-50 border border-gray-100 px-3 py-2 sm:py-1 rounded-xl sm:rounded-full uppercase tracking-wider text-center flex-1 sm:flex-none truncate">{msg.state}</span>}
                                    </div>
                                    <Link href="/admin/messages" className="text-[10px] sm:text-[10px] font-black text-white bg-bid-dark hover:bg-black px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-black/10 text-center shrink-0">Analyze →</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Controls Column */}
                <div className="space-y-6 sm:space-y-10 mt-8 lg:mt-0">
                    <div>
                        <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase mb-4 sm:mb-6">Execution Suite</h2>
                        <div className="bg-white p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 space-y-3 sm:space-y-4">
                            {[
                                { href: '/admin/tenders', label: 'Add New Tender', color: 'bg-blue-50 text-blue-600', icon: PlusCircle },
                                { href: '/admin/blog', label: 'Publish Insight', color: 'bg-purple-50 text-purple-600', icon: Newspaper },
                                { href: '/admin/alerts?action=create', label: 'Broadcast Alert', color: 'bg-amber-50 text-amber-600', icon: Send },
                            ].map((action, i) => (
                                <Link key={i} href={action.href} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-md transition-all group overflow-hidden">
                                    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${action.color}`}>
                                        <action.icon size={20} />
                                    </div>
                                    <span className="font-bold text-gray-700 tracking-tight text-sm sm:text-base truncate">{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="bg-bid-dark rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 text-white shadow-2xl shadow-bid-dark/40 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-bid-green/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                        <h3 className="font-black text-[9px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white/40 mb-6 sm:mb-8 border-b border-white/5 pb-3 sm:pb-4">Infrastructure Integrity</h3>
                        <div className="relative inline-flex items-center justify-center mb-6 group">
                            <svg className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90">
                                <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5 sm:hidden" />
                                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5 hidden sm:block" />
                                <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="213.6" strokeDashoffset={`${213.6 * (1 - (isLoading ? 0 : stats.infrastructure_health) / 100)}`} className="text-bid-green group-hover:brightness-125 transition-all duration-1000 sm:hidden" />
                                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={`${251.2 * (1 - (isLoading ? 0 : stats.infrastructure_health) / 100)}`} className="text-bid-green group-hover:brightness-125 transition-all duration-1000 hidden sm:block" />
                            </svg>
                            <span className="absolute text-xl sm:text-2xl font-black tracking-tighter">{isLoading ? '...' : `${stats.infrastructure_health}%`}</span>
                        </div>
                        <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest sm:tracking-[0.1em] text-white/60">
                            {isLoading ? 'Checking...' : stats.infrastructure_health === 100 ? 'All subsystems operational' : 'Partial degraded operations'}
                        </p>
                        <div className="mt-6 sm:mt-8 flex justify-center gap-3 sm:gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-bid-green animate-ping" />
                            <div className="w-1.5 h-1.5 rounded-full bg-bid-green" />
                            <div className="w-1.5 h-1.5 rounded-full bg-bid-green" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

