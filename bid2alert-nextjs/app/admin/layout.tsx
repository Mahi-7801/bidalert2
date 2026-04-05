'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Gavel,
    Newspaper,
    FileText,
    CreditCard,
    Bell,
    MessageSquare,
    LogOut,
    Menu,
    X,
    Users,
    Settings
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [counts, setCounts] = useState({
        requirements: 0,
        alerts: 0,
        messages: 0
    });

    const fetchCounts = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/admin/notifications/count`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setCounts(data);
            }
        } catch (error) {
            console.error('Fetch counts error:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated && user?.role === 'admin') {
            fetchCounts();
            const interval = setInterval(fetchCounts, 30000); // Check every 30s
            return () => clearInterval(interval);
        }
    }, [isAuthenticated, user]);

    // Mark as read when page is visited
    useEffect(() => {
        if (pathname === '/admin/messages' && counts.requirements > 0) {
            fetch(`/api/admin/user-requests/mark-all-read`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            })
                .then(() => fetchCounts());
        }
        if (pathname === '/admin/alerts' && counts.alerts > 0) {
            fetch(`/api/admin/alerts/mark-all-read`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            })
                .then(() => fetchCounts());
        }
    }, [pathname, counts.requirements, counts.alerts]);

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (user?.role !== 'admin') {
                router.push('/'); // Redirect non-admins to home
            }
        }
    }, [isAuthenticated, user, isLoading, router]);

    if (isLoading || !user || user.role !== 'admin') {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Or return null
    }

    const navItems = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/tenders', label: 'Tenders', icon: Gavel },
        { href: '/admin/users', label: 'Users', icon: Users },
        { href: '/admin/blog', label: 'Blog & News', icon: Newspaper },
        { href: '/admin/documents', label: 'Documents', icon: FileText },
        { href: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
        { href: '/admin/alerts', label: 'Alerts', icon: Bell, count: counts.alerts },
        { href: '/admin/messages', label: 'Messages', icon: MessageSquare, count: counts.requirements },
        { href: '/admin/dynamic-mapper', label: 'AI Smart Mapper', icon: Gavel, highlight: true },
        { href: '/admin/settings', label: 'Settings', icon: Settings }
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <div className="h-screen overflow-hidden bg-gray-100 flex font-sans">
            {/* Mobile Top Bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-bid-dark text-white h-16 flex items-center px-4 z-50 shadow-lg">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-gray-800 rounded-md transition-colors mr-3"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center">
                    <span className="text-xl font-bold tracking-tighter">
                        Bid<span className="text-bid-green">Alert</span>
                        <span className="ml-2 py-0.5 px-2 bg-bid-green text-bid-dark text-[10px] rounded uppercase font-extrabold">Admin</span>
                    </span>
                </div>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-bid-dark text-white transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-gray-700 flex justify-center">
                    <div className="bg-white px-3 py-1.5 rounded shadow-sm">
                        {/* Placeholder for Logo if image is not available, using text */}
                        <span className="text-xl font-bold text-bid-dark tracking-tighter">Bid<span className="text-bid-green">Alert</span></span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto h-[calc(100vh-140px)] custom-scrollbar">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`
                                relative flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                                ${isActive(item.href)
                                    ? 'bg-bid-green text-bid-dark font-bold shadow-md'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                                ${item.highlight && !isActive(item.href) ? 'bg-gray-800 border border-gray-700' : ''}
                            `}
                        >
                            <item.icon className={`w-5 h-5 mr-3 ${isActive(item.href) ? 'text-bid-dark' : 'text-gray-400'}`} />
                            <span className="flex-1">{item.label}</span>
                            {item.count !== undefined && item.count > 0 && (
                                <span className="flex items-center justify-center min-w-[18px] h-[18px] bg-red-600 text-white text-[10px] font-black rounded-full px-1 animate-pulse shadow-lg shadow-red-600/40">
                                    {item.count}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-700 bg-bid-dark">
                    <button
                        onClick={logout}
                        className="flex items-center justify-center w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-bold text-sm shadow-sm"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto w-full relative">
                <div className="lg:hidden h-16 shrink-0" /> {/* Spacer for fixed top bar */}
                <div className="p-4 sm:p-6 lg:p-10">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
