'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, Bell, Sparkles, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const router = useRouter();
    const { user, logout, isAuthenticated, openLogin, openRegister } = useAuth();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
    const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [archiveYears, setArchiveYears] = useState<string[]>([]);
    const [notificationCount, setNotificationCount] = useState(0); // Admin unread requirements
    const [userNotifications, setUserNotifications] = useState<any[]>([]); // General user notifications
    const [showUserNotifications, setShowUserNotifications] = useState(false);
    const [unreadUserCount, setUnreadUserCount] = useState(0);
    const [logoClickCount, setLogoClickCount] = useState(0);
    const [showExpiryWarning, setShowExpiryWarning] = useState(false);
    const [showAdminLoginTrigger, setShowAdminLoginTrigger] = useState(false);
    const clickResetTimerRef = useRef<NodeJS.Timeout | null>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    const fetchNotificationCount = async () => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            // Only admins fetch the unified admin count
            if (user?.role === 'admin') {
                const response = await fetch(`${baseUrl}/api/admin/notifications/count`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotificationCount(data.total || 0);
                }
            }

            // All authenticated users fetch their notifications
            if (isAuthenticated) {
                const response = await fetch(`${baseUrl}/api/notifications`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserNotifications(data);
                    const unread = data.filter((n: any) => !n.is_read).length;

                    // Trigger browser notification if new unread items appear
                    if (unread > unreadUserCount && Notification.permission === 'granted') {
                        const newNote = data.find((n: any) => !n.is_read);
                        if (newNote) {
                            new Notification(newNote.title || 'New BidAlert Notification', {
                                body: newNote.message,
                                icon: '/favicon.ico'
                            });
                        }
                    }
                    setUnreadUserCount(unread);
                }
            }
        } catch (error) {
            // Use warn to avoid triggering interceptor overlays for handled network background tasks
            console.warn('Silent Background Fetch Note:', error instanceof Error ? error.message : 'Network error');
        }
    };

    const markAsRead = async (id?: number) => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const endpoint = id ? `/api/notifications/${id}/read` : '/api/notifications/read-all';
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.ok) {
                fetchNotificationCount();
            }
        } catch (err) {
            console.error('Mark read error:', err);
        }
    };

    const fetchArchiveYears = async () => {
        try {
            // Use relative URL so Next.js rewrite proxy handles it (avoids CORS/direct-fetch errors)
            const response = await fetch('/api/tenders/archive-years');
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setArchiveYears(data.years || []);
                }
            }
        } catch (err) {
            // Silently ignore — fallback static years are already defined in navItems
            console.warn('Archive years fetch skipped:', err instanceof Error ? err.message : 'Network error');
        }
    };

    const [expiryText, setExpiryText] = useState('');

    useEffect(() => {
        setMounted(true);
        fetchArchiveYears();
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowUserNotifications(false);
            }
        };

        if (showUserNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        if (isAuthenticated) {
            fetchNotificationCount();
            const interval = setInterval(fetchNotificationCount, 10000);

            if (Notification.permission === 'default') {
                Notification.requestPermission();
            }

            if (user?.plan_expiry_date) {
                const expiryDate = new Date(user.plan_expiry_date);
                const now = new Date();
                const diffTime = expiryDate.getTime() - now.getTime();

                if (diffTime > 0) {
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

                    if (diffDays > 0) {
                        setExpiryText(`${diffDays} ${diffDays === 1 ? 'day' : 'days'}`);
                        setShowExpiryWarning(diffDays <= 3);
                    } else if (diffHours > 0) {
                        setExpiryText(`${diffHours}h ${diffMinutes}m`);
                        setShowExpiryWarning(true);
                    } else {
                        setExpiryText(`${diffMinutes} minutes`);
                        setShowExpiryWarning(true);
                    }
                } else {
                    setShowExpiryWarning(false);
                }
            } else {
                setShowExpiryWarning(false);
            }

            return () => {
                window.removeEventListener('scroll', handleScroll);
                document.removeEventListener('mousedown', handleClickOutside);
                clearInterval(interval);
            };
        } else {
            setShowExpiryWarning(false);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAuthenticated, user?.role, user?.plan_expiry_date, showUserNotifications]);

    // Body scroll lock for mobile menu
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    if (!mounted) return <div className="h-[80px] bg-transparent" />;

    interface NavLink {
        label: string;
        href: string;
        price?: string;
        isDivider?: boolean;
        highlight?: boolean;
        hasArrow?: boolean;
        subLinks?: NavLink[];
    }

    interface NavColumn {
        title: string;
        links: NavLink[];
    }

    interface NavItem {
        title: string;
        links?: NavLink[];
        columns?: NavColumn[];
    }

    const navItems: NavItem[] = [
        {
            title: 'India Tenders',
            links: [
                { label: 'Active Tenders', href: '/tenders' },
                { label: 'News Paper Tenders', href: '/tenders?source=Newspaper' },
                {
                    label: 'Archive Tenders',
                    href: '/tenders?status=archive&nav=india',
                    hasArrow: true,
                    subLinks: archiveYears.length > 0 ? archiveYears.map(year => ({
                        label: `${year} Tenders`,
                        href: `/tenders?status=archive&nav=india&year=${year}`
                    })) : undefined
                },
                { label: 'Empanelment', href: '/tenders?type=Empanelment' },
                { label: 'EOI - Tenders', href: '/tenders?type=EOI' },
                { label: 'RFP - Tenders', href: '/tenders?type=RFP' },
                { label: 'RFQ - Tenders', href: '/tenders?type=RFQ' },
                { label: 'TOR - Tenders', href: '/tenders?type=TOR' },
                { label: 'Other Tenders', href: '/tenders' },
                { label: 'Sample Documents', href: '/samples', highlight: true },
            ]
        },
        {
            title: 'Tenders By',
            links: [
                { label: 'State', href: '/tender-states' },
                { label: 'Town/City', href: '/tender-cities' },
                { label: 'Category', href: '/tender-categories' },
                { label: 'Sector/Industry', href: '/tender-sectors' },
                { label: 'Department', href: '/tender-departments' },
                { label: 'Ministry', href: '/tender-ministries' },
                { label: 'Bank', href: '/tender-banks' },
                { label: 'Keyword', href: '/tender-keywords' },
                {
                    label: 'IREPS',
                    href: '/tenders?portal=ireps',
                    hasArrow: true,
                    subLinks: [
                        { label: 'IREPS ACTIVE', href: '/tenders?portal=ireps' },
                        {
                            label: 'IREPS ARCHIVE',
                            href: '/tenders?status=archive&portal=ireps',
                            hasArrow: true,
                            subLinks: archiveYears.length > 0 ? archiveYears.map(year => ({
                                label: `${year} ARCHIVE`,
                                href: `/tenders?status=archive&portal=ireps&year=${year}`
                            })) : undefined
                        },
                        { label: 'IREPS SERVICE', href: '/tenders?portal=ireps&type=Service' },
                        { label: 'IREPS WORK', href: '/tenders?portal=ireps&type=Work' },
                    ]
                },
            ]
        },
        {
            title: 'Global Tenders',
            links: [
                { label: 'GLOBAL ACTIVE', href: '/global-tenders' },
                {
                    label: 'GLOBAL ARCHIVE',
                    href: '/tenders?status=archive&portal=global',
                    hasArrow: true,
                    subLinks: archiveYears.length > 0 ? archiveYears.map(year => ({
                        label: `${year} GLOBAL ARCHIVE`,
                        href: `/tenders?status=archive&portal=global&year=${year}`
                    })) : undefined
                },
                { label: 'Country', href: '/global-tender-countries' },
                { label: 'City', href: '/global-tender-cities' },
                { label: 'Authority', href: '/global-tender-authorities' },
                { label: 'MAF', href: '/global-tenders?q=Funding' },
                { label: 'Category', href: '/global-tender-categories' },
            ]
        },

        {
            title: 'IPR Services',
            links: [
                { label: 'TRADEMARK REGISTRATION', href: '/registrations/trademark' },
                { label: 'COPYRIGHT REGISTRATION', href: '/registrations/copyright' },
                { label: 'PATENT REGISTRATION', href: '/registrations/patent' },
                { label: 'DESIGN REGISTRATION', href: '/registrations/design' },
                { label: 'GEOGRAPHICAL INDICATIONS (GI)', href: '/registrations/gi' },
                { label: '', href: '#', isDivider: true },
                {
                    label: 'REGISTRATIONS',
                    href: '#',
                    hasArrow: true,
                    subLinks: [
                        { label: 'GST REGISTRATION', href: '/registrations/gst' },
                        { label: 'STARTUP INDIA REGISTRATION', href: '/registrations/startup-india' },
                        { label: 'ISO REGISTRATION', href: '/registrations/iso' },
                        { label: 'IMPORT EXPORT CODE (IEC)', href: '/registrations/iec' },
                        { label: 'PF & ESI REGISTRATION', href: '/registrations/pf-esi' },
                        { label: 'FOOD LICENSE (FSSAI)', href: '/registrations/food-license' },
                        { label: 'MSME UDYOG AADHAAR', href: '/registrations/msme' },
                        { label: '12A & 80G REGISTRATION', href: '/registrations/12a-80g' },
                        { label: 'DOT OSP LICENSE', href: '/registrations/dot-osp' },
                    ]
                },
                { label: '', href: '#', isDivider: true },
                {
                    label: 'IPR AWARENESS PROGRAMS',
                    href: '#',
                    hasArrow: true,
                    subLinks: [
                        { label: 'FOR STARTUPS', href: '/solutions/ipr-awareness#startups' },
                        { label: 'FOR EDUCATIONAL INSTITUTIONS', href: '/solutions/ipr-awareness#educational-institutions' },
                        { label: 'FOR COMMUNITIES', href: '/solutions/ipr-awareness#communities' },
                        { label: 'FOR MANUFACTURERS', href: '/solutions/ipr-awareness#manufacturers' },
                    ]
                },
            ]
        },
        {
            title: 'IT Services',
            columns: [
                {
                    title: 'Website Development',
                    links: [
                        { label: 'Static Website Development', href: '/solutions/web-app' },
                        { label: 'Dynamic Website Development', href: '/solutions/web-app' },
                        { label: 'E-commerce Website Development', href: '/solutions/ecommerce' },
                        { label: 'CRM Website or Portal Development', href: '/solutions/crm-portal' },
                    ]
                },
                {
                    title: 'Mobile Solutions',
                    links: [
                        { label: 'Mobile Application Development', href: '/solutions/mobile-apps' },
                        { label: 'Custom Software Development', href: '/solutions/custom-software' },
                    ]
                },
                {
                    title: 'Other Services',
                    links: [
                        { label: 'Multimedia Solutions', href: '/solutions/multimedia' },
                        { label: 'Hosting & Domain Services', href: '/solutions/hosting' },
                        { label: 'Website / App AMC & Support Packages', href: '/solutions/amc' },
                    ]
                }
            ]
        }
    ];

    return (
        <>
            {showExpiryWarning && (
                <div className="fixed top-0 left-0 right-0 z-[110] bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] sm:text-xs font-black py-2.5 px-4 text-center flex items-center justify-center gap-4 shadow-lg border-b border-white/10 uppercase tracking-widest">
                    <Sparkles size={14} className="animate-pulse shrink-0" />
                    <span>Your plan expires in {expiryText}. Renew now for uninterrupted service!</span>
                    <Link href="/plans" className="bg-white text-orange-600 px-4 py-1 rounded-full hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95 shadow-sm">Renew Now</Link>
                </div>
            )}
            <header
                className={`fixed ${showExpiryWarning ? 'top-[42px] sm:top-[44px]' : 'top-0'} left-0 right-0 z-[100] w-full`}
            >
                <div className="w-full mx-auto transition-all duration-500 ease-in-out">
                    <div
                        className={`flex flex-col pointer-events-auto transition-all duration-500 bg-[#0A0F1C] border-b border-white/10 w-full px-0 py-0 shadow-lg`}
                    >
                        {/* Top Row: Logo & Utility Actions */}
                        <div className={`flex items-center justify-between w-full px-6 lg:px-12 py-2 transition-colors ${!scrolled ? 'bg-transparent' : 'bg-[#0A0F1C]'}`}>
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/"
                                    onClick={(e) => {
                                        setMobileMenuOpen(false);
                                        const newCount = logoClickCount + 1;
                                        setLogoClickCount(newCount);

                                        // Clear existing timer
                                        if (clickResetTimerRef.current) clearTimeout(clickResetTimerRef.current);

                                        // Set new reset timer
                                        clickResetTimerRef.current = setTimeout(() => {
                                            setLogoClickCount(0);
                                        }, 2000);

                                        if (newCount === 3) {
                                            setShowAdminLoginTrigger(true);
                                            setLogoClickCount(0);
                                            if (clickResetTimerRef.current) clearTimeout(clickResetTimerRef.current);
                                            setTimeout(() => setShowAdminLoginTrigger(false), 5000);
                                        }
                                    }}
                                    className="relative shrink-0 transition-transform active:scale-95 duration-200"
                                >
                                    <div className={`relative transition-all duration-500 ${scrolled ? 'h-5 w-[100px]' : 'h-7 w-[130px]'}`}>
                                        <Image
                                            src="/bidalert_logo.png"
                                            alt="BidAlert"
                                            fill
                                            className="object-contain object-left"
                                            priority
                                        />
                                    </div>
                                </Link>

                                {/* Admin login trigger hidden — removed to avoid confusion */}
                            </div>

                            {/* Action Section */}
                            <div className="hidden lg:flex items-center gap-4">
                                <Link href="/plans" className="px-2 py-1.5 text-[11px] font-bold text-white/60 border-b border-transparent hover:border-bid-green hover:text-white transition-all tracking-wider uppercase">Plans</Link>

                                {isAuthenticated ? (
                                    <>
                                        {user?.role === 'admin' && (
                                            <>
                                                <div className="h-3 w-px bg-white/10 mx-1" />
                                                <Link href="/admin/messages" className="px-2 py-1.5 text-[11px] font-bold text-white/60 border-b border-transparent hover:border-bid-green hover:text-white transition-all tracking-wider uppercase">User Requests</Link>
                                            </>
                                        )}
                                        <div className="h-3 w-px bg-white/10 mx-1" />
                                        <Link href="/my-requests" className="px-2 py-1.5 text-[11px] font-bold text-white/60 border-b border-transparent hover:border-bid-green hover:text-white transition-all tracking-wider uppercase">My Requests</Link>
                                    </>
                                ) : (
                                    <>
                                        {/* Hidden for non-logged in users per request */}
                                    </>
                                )}

                                <div className="h-3 w-px bg-white/10 mx-1" />

                                {isAuthenticated ? (
                                    <div className="flex items-center gap-3">
                                        {/* Unified Notification Center */}
                                        <div className="relative group" ref={notificationRef}>
                                            <button
                                                onClick={() => setShowUserNotifications(!showUserNotifications)}
                                                className={`p-2 rounded-full transition-all duration-300 ${showUserNotifications ? 'bg-bid-green text-white' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                                            >
                                                <Bell size={18} />
                                                {(user?.role === 'admin' ? notificationCount : unreadUserCount) > 0 && (
                                                    <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full animate-pulse shadow-lg shadow-red-500/50">
                                                        {user?.role === 'admin' ? notificationCount : unreadUserCount}
                                                    </span>
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {showUserNotifications && (
                                                    <motion.div
                                                        // @ts-ignore
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[120] overflow-hidden"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notifications</h3>
                                                            <div className="flex items-center gap-3">
                                                                {unreadUserCount > 0 && (
                                                                    <button
                                                                        onClick={() => markAsRead()}
                                                                        className="text-[9px] font-bold text-bid-green hover:underline uppercase"
                                                                    >
                                                                        Mark all read
                                                                    </button>
                                                                )}
                                                                <button onClick={() => setShowUserNotifications(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                                                                    <X size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                                            {userNotifications.length === 0 ? (
                                                                <div className="p-10 text-center">
                                                                    <Bell size={24} className="mx-auto mb-3 text-slate-200" />
                                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No new alerts</p>
                                                                </div>
                                                            ) : (
                                                                userNotifications.map((note) => (
                                                                    <div
                                                                        key={note.id}
                                                                        onClick={() => {
                                                                            if (typeof note.id === 'string' && note.id.startsWith('smart-')) {
                                                                                // Smart alerts aren't in DB
                                                                            } else {
                                                                                markAsRead(note.id);
                                                                            }

                                                                            if (note.link) {
                                                                                setShowUserNotifications(false);
                                                                                router.push(note.link);
                                                                            }
                                                                        }}
                                                                        className={`p-4 border-b border-slate-50 transition-colors cursor-pointer hover:bg-slate-50 ${!note.is_read ? 'bg-bid-green/5' : 'opacity-60'}`}
                                                                    >
                                                                        <div className="flex gap-3">
                                                                            <div className={`mt-1 shrink-0 w-2 h-2 rounded-full ${!note.is_read ? 'bg-bid-green' : 'bg-slate-200'}`} />
                                                                            <div className="flex-1">
                                                                                <h4 className={`text-xs font-bold leading-tight ${!note.is_read ? 'text-slate-900' : 'text-slate-500'}`}>{note.title}</h4>
                                                                                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{note.message}</p>
                                                                                <span className="text-[8px] font-black text-slate-300 uppercase mt-2 block tracking-tighter">
                                                                                    {new Date(note.created_at).toLocaleString()}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                        {user?.role === 'admin' && notificationCount > 0 && (
                                                            <Link
                                                                href="/admin/messages"
                                                                onClick={() => setShowUserNotifications(false)}
                                                                className="p-3 bg-bid-green/10 block text-center border-t border-bid-green/20 group"
                                                            >
                                                                <span className="text-[9px] font-black text-bid-green uppercase tracking-[0.2em] group-hover:brightness-125 transition-all">
                                                                    View {notificationCount} New Requests â†’
                                                                </span>
                                                            </Link>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <div className="flex items-center gap-2 bg-white/10 pl-2.5 pr-1 py-1 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
                                            <span className="text-[10px] font-black uppercase text-bid-green flex items-center justify-center w-5 h-5 bg-bid-green/20 rounded-full">{user?.name?.[0] || 'U'}</span>
                                            <button onClick={logout} className="p-1 px-2 text-white/40 hover:text-red-400 text-[9px] font-black border-l border-white/10 ml-0.5 tracking-widest uppercase">
                                                LOGOUT
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={openLogin}
                                            className="px-3 py-1.5 text-[12px] font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest"
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            onClick={openRegister}
                                            className="px-5 py-2 text-[11px] font-black tracking-[0.15em] bg-bid-green text-bid-dark rounded-full hover:brightness-110 transition-all uppercase active:scale-95 shadow-lg shadow-bid-green/20"
                                        >
                                            Join Now
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Btn */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 rounded-xl text-white/60 hover:text-white transition-colors"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Bottom Row: Navigation Links (Primary Tier) */}
                        <div className={`hidden lg:flex items-center justify-center w-full border-t border-white/10 transition-all duration-500 ${scrolled ? 'py-1' : 'py-2'}`}>
                            <nav className="flex items-center gap-1 xl:gap-2">
                                <Link
                                    href="/"
                                    className={`px-4 py-1.5 text-[12px] font-bold transition-all rounded-full tracking-wide ${pathname === '/' ? 'text-bid-green bg-bid-green/10' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                                >
                                    Home
                                </Link>
                                {navItems.map((item) => {
                                    const portal = searchParams.get('portal');
                                    const status = searchParams.get('status');
                                    const navParam = searchParams.get('nav');
                                    const isActive = (
                                        (item.title === 'India Tenders' && ((pathname === '/tenders' && !portal && status !== 'archive') || pathname?.startsWith('/samples') || (pathname === '/tenders' && status === 'archive' && navParam === 'india'))) ||
                                        (item.title === 'Tenders By' && (pathname?.startsWith('/tender-') || (pathname === '/tenders' && (portal === 'ireps' || (status === 'archive' && navParam !== 'india'))))) ||
                                        (item.title === 'Global Tenders' && pathname?.startsWith('/global-tenders')) ||
                                        (item.title === 'IPR Services' && pathname?.startsWith('/registrations')) ||
                                        (item.title === 'IT Services' && pathname?.startsWith('/solutions'))
                                    );

                                    return (
                                        <div
                                            key={item.title}
                                            className="relative"
                                            onMouseEnter={() => setActiveDropdown(item.title)}
                                            onMouseLeave={() => setActiveDropdown(null)}
                                        >
                                            <button className={`flex items-center gap-1 px-4 py-1.5 text-[12px] font-bold transition-all rounded-full tracking-wide ${activeDropdown === item.title || isActive ? 'text-bid-green bg-bid-green/10' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                                                {item.title}
                                                <ChevronDown size={12} className={`opacity-40 transition-transform duration-300 ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
                                            </button>


                                            <AnimatePresence>
                                                {activeDropdown === item.title && (
                                                    <motion.div
                                                        // @ts-ignore
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 5 }}
                                                        transition={{ duration: 0.15 }}
                                                        className={`absolute top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-[110] ${item.title === 'IT Services' ? 'w-[920px] right-[-180px] overflow-hidden' : 'w-72 bg-white border-slate-200 left-1/2 -translate-x-1/2'}`}
                                                    >
                                                        {item.title === 'IT Services' ? (
                                                            <div className="flex flex-wrap justify-center gap-12 p-10 bg-white">
                                                                {item.columns?.map((column, idx) => (
                                                                    <div key={idx} className="space-y-6">
                                                                        <div className="flex flex-col">
                                                                            <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-wider mb-2">{column.title}</h4>
                                                                            <div className="h-0.5 w-12 bg-emerald-500/40" />
                                                                        </div>
                                                                        <div className="flex flex-col gap-3">
                                                                            {column.links.map((link) => (
                                                                                <Link
                                                                                    key={link.label}
                                                                                    href={link.href}
                                                                                    className="text-[12px] font-bold text-slate-500 hover:text-emerald-600 transition-colors"
                                                                                >
                                                                                    {link.label}
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="px-1 py-3 bg-white">
                                                                {item.links?.map((link, idx) => (
                                                                    <div key={idx} className="relative group/link">
                                                                        {link.isDivider ? (
                                                                            <div className="h-px bg-slate-100 my-2 mx-4" />
                                                                        ) : (
                                                                            <>
                                                                                <Link
                                                                                    href={link.href}
                                                                                    className={`flex items-center justify-between px-5 py-2 text-[11px] font-bold transition-all rounded-xl mx-2 ${link.highlight ? 'text-bid-green bg-bid-green/5' : 'text-slate-600 hover:text-bid-green hover:bg-slate-50'
                                                                                        }`}
                                                                                >
                                                                                    <div className="flex flex-col">
                                                                                        <span className="uppercase tracking-tight">{link.label}</span>
                                                                                        {link.price && <span className={`text-[9px] font-black mt-0.5 ${link.highlight ? 'text-amber-500/80' : 'text-emerald-500/60'}`}>{link.price}</span>}
                                                                                    </div>
                                                                                    {link.subLinks ? (
                                                                                        <ChevronRight size={13} className="opacity-40 group-hover/link:translate-x-1 transition-transform" />
                                                                                    ) : link.hasArrow && (
                                                                                        <ChevronRight size={13} className="opacity-40" />
                                                                                    )}
                                                                                </Link>

                                                                                {link.subLinks && (
                                                                                    <div className="absolute top-0 left-full pl-4 hidden group-hover/link:block w-72">
                                                                                        <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] py-3 max-h-[70vh] overflow-y-auto scrollbar-hide">
                                                                                            {link.subLinks.map((sub, sIdx) => (
                                                                                                <Link
                                                                                                    key={sIdx}
                                                                                                    href={sub.href}
                                                                                                    className={`flex items-center justify-between px-6 py-2 text-[10px] font-bold transition-all ${sub.highlight ? 'text-bid-green' : 'text-slate-500 hover:text-bid-green hover:bg-slate-50'
                                                                                                        }`}
                                                                                                >
                                                                                                    <span className="uppercase tracking-tight">{sub.label}</span>
                                                                                                </Link>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}

                                <Link
                                    href="/upload"
                                    className={`flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-black transition-all rounded-full border group ml-3 active:scale-95 ${pathname === '/upload'
                                        ? 'text-bid-green bg-bid-green/10 border-bid-green/20'
                                        : 'text-white/70 hover:text-white border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <Sparkles size={13} className={`transition-transform group-hover:scale-110 ${pathname === '/upload' ? 'text-bid-green' : 'text-white/40 group-hover:text-white'}`} />
                                    Bid Analyser
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>

            </header>

            {/* Mobile Menu — rendered outside <header> for its own stacking context */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        // @ts-ignore
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="lg:hidden fixed inset-0 z-[999] bg-[#0A0F1C] p-5 sm:p-8 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-6 sm:mb-10">
                            <div className="relative h-7 w-[130px]">
                                <Image
                                    src="/bidalert_logo.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-white/50 hover:text-white transition-colors">
                                <X size={22} />
                            </button>
                        </div>
                        <div className="flex flex-col overflow-y-auto pr-2 custom-scrollbar">
                            <Link
                                href="/"
                                onClick={() => { setMobileMenuOpen(false); setMobileSectionOpen(null); }}
                                className={`py-4 text-[11px] font-black uppercase tracking-[0.2em] border-b border-white/5 transition-colors ${pathname === '/' ? 'text-bid-green' : 'text-white/40 hover:text-white'}`}
                            >
                                Home
                            </Link>

                            {navItems.map(item => {
                                const isSectionOpen = mobileSectionOpen === item.title;
                                return (
                                    <div key={item.title} className="border-b border-white/5">
                                        {/* Section header — tap to toggle */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMobileSectionOpen(isSectionOpen ? null : item.title);
                                                setMobileSubOpen(null);
                                            }}
                                            className="w-full flex items-center justify-between py-4 text-left group"
                                        >
                                            <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${isSectionOpen ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                                                {item.title}
                                            </span>
                                            <ChevronDown
                                                size={14}
                                                className={`text-white/30 transition-transform duration-300 ${isSectionOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Section content — animated height */}
                                        <AnimatePresence initial={false}>
                                            {isSectionOpen && (
                                                <motion.div
                                                    // @ts-ignore
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="flex flex-col gap-1.5 pl-2 pb-4">
                                                        {item.title === 'IT Services' ? (
                                                            item.columns?.map(column => (
                                                                <div key={column.title} className="mt-2">
                                                                    <h5 className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-2 px-1">{column.title}</h5>
                                                                    <div className="flex flex-col gap-1">
                                                                        {column.links.map(sub => (
                                                                            <Link
                                                                                key={sub.label}
                                                                                href={sub.href}
                                                                                onClick={() => { setMobileMenuOpen(false); setMobileSectionOpen(null); }}
                                                                                className="text-sm font-bold text-white/60 hover:text-bid-green transition-colors block py-1.5 px-1"
                                                                            >
                                                                                {sub.label}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            item.links?.map((sub, sIdx) => {
                                                                const subKey = `${item.title}-${sIdx}`;
                                                                const isSubOpen = mobileSubOpen === subKey;
                                                                return (
                                                                    <div key={sIdx}>
                                                                        {sub.isDivider ? (
                                                                            <div className="h-px bg-white/10 my-2 mx-1" />
                                                                        ) : sub.subLinks ? (
                                                                            // Items with sub-links: nested accordion toggle
                                                                            <>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => setMobileSubOpen(isSubOpen ? null : subKey)}
                                                                                    className={`w-full text-left text-sm font-bold flex items-center justify-between py-2 px-1 ${sub.highlight ? 'text-bid-green' : 'text-white/70'} transition-colors`}
                                                                                >
                                                                                    <span className="uppercase tracking-tight">{sub.label}</span>
                                                                                    <ChevronDown
                                                                                        size={15}
                                                                                        className={`opacity-40 transition-transform duration-300 ${isSubOpen ? 'rotate-180' : ''}`}
                                                                                    />
                                                                                </button>
                                                                                <AnimatePresence initial={false}>
                                                                                    {isSubOpen && (
                                                                                        <motion.div
                                                                                            // @ts-ignore
                                                                                            initial={{ height: 0, opacity: 0 }}
                                                                                            animate={{ height: 'auto', opacity: 1 }}
                                                                                            exit={{ height: 0, opacity: 0 }}
                                                                                            className="overflow-hidden"
                                                                                        >
                                                                                            <div className="mt-1 mb-2 flex flex-col gap-1.5 pl-3 border-l border-white/10 ml-1">
                                                                                                {sub.subLinks.map((nested, nIdx) => (
                                                                                                    <Link
                                                                                                        key={nIdx}
                                                                                                        href={nested.href}
                                                                                                        onClick={() => {
                                                                                                            setMobileMenuOpen(false);
                                                                                                            setMobileSubOpen(null);
                                                                                                            setMobileSectionOpen(null);
                                                                                                        }}
                                                                                                        className="text-xs font-bold text-white/40 hover:text-bid-green uppercase tracking-tight transition-colors block py-1"
                                                                                                    >
                                                                                                        {nested.label}
                                                                                                    </Link>
                                                                                                ))}
                                                                                            </div>
                                                                                        </motion.div>
                                                                                    )}
                                                                                </AnimatePresence>
                                                                            </>
                                                                        ) : (
                                                                            // Regular link
                                                                            <Link
                                                                                href={sub.href}
                                                                                onClick={() => { setMobileMenuOpen(false); setMobileSectionOpen(null); }}
                                                                                className={`text-sm font-bold block py-2 px-1 ${sub.highlight ? 'text-bid-green' : 'text-white/70 hover:text-bid-green transition-colors'}`}
                                                                            >
                                                                                <span className="uppercase tracking-tight">{sub.label}</span>
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}

                            <Link
                                href="/upload"
                                onClick={() => { setMobileMenuOpen(false); setMobileSectionOpen(null); }}
                                className={`py-4 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border-b border-white/5 transition-colors ${pathname === '/upload' ? 'text-bid-green' : 'text-white/40 hover:text-white'}`}
                            >
                                <Sparkles size={14} className={pathname === '/upload' ? 'text-bid-green' : 'text-white/30'} />
                                Bid Analyser
                            </Link>

                            <Link
                                href="/plans"
                                onClick={() => { setMobileMenuOpen(false); setMobileSectionOpen(null); }}
                                className={`py-4 text-[11px] font-black uppercase tracking-[0.2em] border-b border-white/5 transition-colors ${pathname === '/plans' ? 'text-bid-green' : 'text-white/40 hover:text-white'}`}
                            >
                                Plans
                            </Link>
                        </div>
                        <div className="mt-auto pt-5 sm:pt-8 border-t border-white/10 flex flex-col gap-3 sm:gap-4">
                            {!isAuthenticated ? (
                                <>
                                    <button
                                        onClick={() => { setMobileMenuOpen(false); openRegister(); }}
                                        className="w-full py-3.5 sm:py-5 text-center font-black bg-bid-green text-bid-dark rounded-xl sm:rounded-2xl shadow-xl uppercase tracking-widest text-xs sm:text-sm"
                                    >
                                        GET STARTED
                                    </button>
                                    <button
                                        onClick={() => { setMobileMenuOpen(false); openLogin(); }}
                                        className="w-full py-2 sm:py-3 text-center font-bold text-white/40 uppercase tracking-widest text-[10px] sm:text-xs hover:text-white transition-colors"
                                    >
                                        Sign In
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3 w-full">
                                    {/* User Profile Card — mirrors desktop behaviour */}
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                                        <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-bid-green/20 text-bid-green font-black text-sm uppercase">
                                            {user?.name?.[0] || 'U'}
                                        </span>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[12px] font-black text-white truncate">{user?.name || 'User'}</span>
                                            <span className="text-[10px] text-white/40 truncate">{user?.email || ''}</span>
                                        </div>
                                    </div>
                                    <Link
                                        href="/my-requests"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-3.5 sm:py-5 text-center font-black bg-white/10 text-white/70 hover:text-bid-green transition-colors rounded-xl sm:rounded-2xl border border-white/10 uppercase tracking-widest text-xs"
                                    >
                                        My Requests
                                    </Link>
                                    {user?.role === 'admin' && (
                                        <Link
                                            href="/admin/dashboard"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="w-full py-3.5 sm:py-5 text-center font-black bg-bid-green/10 text-bid-green rounded-xl sm:rounded-2xl border border-bid-green/20 uppercase tracking-widest text-xs"
                                        >
                                            Admin Panel
                                        </Link>
                                    )}
                                    <button onClick={() => { setMobileMenuOpen(false); logout(); }} className="w-full py-3.5 sm:py-5 bg-red-900/30 text-red-400 font-bold rounded-xl sm:rounded-2xl uppercase tracking-widest text-[10px] sm:text-xs border border-red-900/30">Logout</button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The spacer matches the height of the non-scrolled header */}
            <div className="h-[85px] bg-[#0A0F1C] transition-colors duration-500" />
        </>
    );
}

