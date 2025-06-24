'use client';

import { createContext, useContext, useState } from 'react';

type AuthContextType = {
    user: string | null;
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const login = async (email: string, password: string) => {

        console.log("Login atempt")

        const res = await fetch('http://localhost:8080/api/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        console.log(res)

        if (res.status != 200) {
            throw new Error('Login failed');
        }

        const data = await res.json();
        setAccessToken(data.access);
        localStorage.setItem('refresh', data.refresh);
        setUser(email);
    };

    const logout = () => {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem('refresh');
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;
