'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { CreditCard, CheckCircle, Clock, Filter, Calendar, BarChart3, TrendingUp, Download, User } from 'lucide-react';

export default function AdminSubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [summary, setSummary] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Filters
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            // Build query params
            const params: any = {};
            if (month) params.month = month;
            if (year) params.year = year;
            if (fromDate) params.from = fromDate;
            if (toDate) params.to = toDate;

            const token = localStorage.getItem('token');
            const config = { headers: { 'Authorization': `Bearer ${token}` } };

            const [subRes, sumRes] = await Promise.all([
                axios.get(`/api/admin/subscriptions`, config),
                axios.get(`/api/admin/subscriptions/summary`, { ...config, params })
            ]);

            setSubscriptions(subRes.data);
            setSummary(sumRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [month, year, fromDate, toDate]);

    useEffect(() => {
        fetchData();
    }, []); // Initial fetch only

    const handleApplyFilters = () => {
        fetchData();
    };

    const resetFilters = () => {
        setMonth('');
        setYear(new Date().getFullYear().toString());
        setFromDate('');
        setToDate('');
    };

    const exportToCSV = () => {
        if (subscriptions.length === 0) {
            alert("No data to export");
            return;
        }

        const headers = ["User", "Email", "Plan", "Amount", "Status", "Created At"];
        const rows = subscriptions.map(sub => [
            sub.user_name || 'Quick Checkout',
            sub.user_email || 'N/A',
            sub.plan_name,
            sub.amount,
            sub.status,
            new Date(sub.created_at).toLocaleString()
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `subscriptions_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div className="w-full md:w-auto">
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight">Subscription Management</h1>
                    <p className="text-gray-500 text-sm font-medium">Monitor and analyze your revenue streams</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 bg-bid-green text-bid-dark font-black rounded-2xl hover:brightness-110 transition-all text-xs uppercase tracking-widest shadow-lg shadow-bid-green/20"
                >
                    <Download size={16} />
                    Export Report
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
                {[
                    { label: 'Total Revenue', value: summary?.active_amount || 0, icon: CheckCircle, color: 'bg-emerald-500', sub: 'Verified & Collected' },
                    { label: 'Active Plans', value: summary?.active_count || 0, icon: BarChart3, color: 'bg-blue-500', sub: 'Total active subscriptions', isStatus: true },
                    { label: 'Success Rate', value: `${summary?.success_rate || 0}%`, icon: TrendingUp, color: 'bg-purple-500', sub: 'Collection efficiency', isStatus: true }
                ].map((card, i) => (
                    <div key={i} className="bg-white p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-[0.03] rounded-full translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110`} />
                        <div className="flex items-center gap-4 mb-3 sm:mb-4">
                            <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${card.color} text-white shadow-lg`}>
                                <card.icon size={18} />
                            </div>
                            <span className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">{card.label}</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-gray-900 mb-1">
                            {card.isStatus ? card.value : `₹${Number(card.value).toLocaleString()}`}
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-tight break-words whitespace-normal leading-tight">{card.sub}</div>
                    </div>
                ))}
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 p-4 sm:p-6 mb-8 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex flex-wrap items-center justify-between lg:justify-start gap-2 px-4 py-2 bg-gray-50 rounded-xl text-gray-500 w-full lg:w-auto">
                        <div className="flex items-center gap-2">
                            <Filter size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Filters</span>
                        </div>
                        <button
                            onClick={resetFilters}
                            className="lg:hidden text-[10px] font-black uppercase tracking-widest text-red-500"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="grid grid-cols-2 lg:flex lg:items-center gap-3 w-full">
                        <select
                            value={month} onChange={(e) => setMonth(e.target.value)}
                            className="bg-gray-50 border-none rounded-xl text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-3 sm:py-2.5 focus:ring-2 focus:ring-bid-green/20 w-full"
                        >
                            <option value="">Select Month</option>
                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => (
                                <option key={m} value={i + 1}>{m}</option>
                            ))}
                        </select>

                        <select
                            value={year} onChange={(e) => setYear(e.target.value)}
                            className="bg-gray-50 border-none rounded-xl text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-3 sm:py-2.5 focus:ring-2 focus:ring-bid-green/20 w-full"
                        >
                            {[2024, 2025, 2026].map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
                        <input
                            type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)}
                            className="bg-gray-50 border-none rounded-xl text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-3 sm:py-2.5 focus:ring-2 focus:ring-bid-green/20 w-full"
                        />
                        <span className="text-gray-300 text-[10px] font-black uppercase hidden sm:inline">to</span>
                        <input
                            type="date" value={toDate} onChange={(e) => setToDate(e.target.value)}
                            className="bg-gray-50 border-none rounded-xl text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-3 sm:py-2.5 focus:ring-2 focus:ring-bid-green/20 w-full"
                        />
                    </div>

                    <div className="flex items-center gap-3 mt-2 lg:mt-0 lg:ml-auto w-full lg:w-auto">
                        <button
                            onClick={resetFilters}
                            className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors px-2"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleApplyFilters}
                            className="flex-1 lg:flex-none px-4 py-3 sm:py-2.5 bg-bid-dark text-white rounded-xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest hover:brightness-125 transition-all shadow-lg shadow-bid-dark/10 whitespace-nowrap"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full gap-8">
                {/* Tables Section */}
                <div className="w-full">
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Recent Transactions</h3>
                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter">Updated Just Now</span>
                        </div>
                        <div className="overflow-x-auto overflow-y-auto max-h-[600px] custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">User / Identity</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Plan Details</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Amount</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Payment Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-10 h-10 border-4 border-bid-green/20 border-t-bid-green rounded-full animate-spin" />
                                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Synchronizing Encrypted Data...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : subscriptions.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center">
                                                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">No matching transactions found</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        subscriptions.map((sub) => (
                                            <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-gray-400 group-hover:from-bid-green/10 group-hover:to-emerald-50/20 group-hover:text-bid-green transition-all duration-300">
                                                            <User size={18} />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-black text-gray-900 mb-0.5 tracking-tight">{sub.user_name || 'Quick Checkout'}</div>
                                                            <div className="text-[10px] text-gray-400 font-bold tracking-tight">{sub.user_email || 'anonymous-user@bidalert.in'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1 px-3 py-1 bg-gray-100 rounded-lg inline-block w-fit">{sub.plan_name}</span>
                                                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                                                            <Calendar size={12} className="opacity-50" />
                                                            {sub.start_date ? `${new Date(sub.start_date).toLocaleDateString()}` : 'No Access Date'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <span className="text-base font-black text-gray-900 tracking-tighter">₹{Number(sub.amount).toLocaleString()}</span>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <div className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${sub.status?.toLowerCase() === 'active'
                                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500'
                                                        : sub.status?.toLowerCase() === 'pending'
                                                            ? 'bg-amber-50 text-amber-600 border-amber-100'
                                                            : 'bg-red-50 text-red-600 border-red-100'
                                                        }`}>
                                                        {sub.status?.toLowerCase() === 'active' ? <CheckCircle size={14} className="group-hover:animate-bounce" /> : <Clock size={14} />}
                                                        {sub.status}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-tighter leading-tight">
                                                        {new Date(sub.created_at).toLocaleDateString()}
                                                        <br />
                                                        <span className="opacity-60 font-bold">{new Date(sub.created_at).toLocaleTimeString()}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
