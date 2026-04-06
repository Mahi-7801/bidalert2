'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role?: string;
    subscription_status?: 'free' | 'pro';
    plan_type?: string;
    plan_expiry_date?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    isAuthModalOpen: boolean;
    authModalMode: 'login' | 'register';
    openLogin: () => void;
    openRegister: () => void;
    closeAuthModal: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    const refreshUser = useCallback(async () => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/auth/profile`, {
                headers: { 'Authorization': `Bearer ${storedToken}` }
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            }
        } catch (error) {
            console.error('Failed to refresh user data:', error);
        }
    }, []);

    // Periodic Refresh to catch subscription expirations or upgrades (Global)
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (token) {
            refreshUser();
            interval = setInterval(refreshUser, 10000); // Global refresh every 10 seconds
        }
        return () => { if (interval) clearInterval(interval); };
    }, [token, refreshUser]);

    useEffect(() => {
        setMounted(true);
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse user data from localStorage');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setIsLoading(false);

        // Check for auth triggers in URL
        const params = new URLSearchParams(window.location.search);
        const authTrigger = params.get('auth');
        if (authTrigger === 'login') {
            setAuthModalMode('login');
            setIsAuthModalOpen(true);
        } else if (authTrigger === 'register') {
            setAuthModalMode('register');
            setIsAuthModalOpen(true);
        }
    }, []);

    const login = useCallback((newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsAuthModalOpen(false); // Close modal on success

        if (newUser.role === 'admin') {
            router.push('/admin/dashboard');
        } else {
            router.refresh();
        }
    }, [router]);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/');
        router.refresh();
    }, [router]);

    const openLogin = useCallback(() => {
        setAuthModalMode('login');
        setIsAuthModalOpen(true);
    }, []);

    const openRegister = useCallback(() => {
        setAuthModalMode('register');
        setIsAuthModalOpen(true);
    }, []);

    const closeAuthModal = useCallback(() => {
        setIsAuthModalOpen(false);
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated: !!token,
            isLoading,
            isAuthModalOpen,
            authModalMode,
            openLogin,
            openRegister,
            closeAuthModal,
            refreshUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
