'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
    username: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null);

    // Récupère l'utilisateur au chargement
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/account/me/', {
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.username);
                } else if (res.status === 401) {
                    // Tente un refresh
                    const refreshRes = await fetch('http://localhost:8080/api/account/token/refresh/', {
                        method: 'POST',
                        credentials: 'include',
                    });
                    if (refreshRes.ok) {
                        // Retente /me
                        const retry = await fetch('http://localhost:8080/api/account/me/', {
                            credentials: 'include',
                        });
                        if (retry.ok) {
                            const data = await retry.json();
                            setUsername(data.username);
                        } else {
                            setUsername(null);
                        }
                    } else {
                        setUsername(null);
                    }
                } else {
                    setUsername(null);
                }
            } catch {
                setUsername(null);
            }
        };
        fetchUser();
    }, []);

    const login = async (username: string, password: string) => {

        const res = await fetch('http://localhost:8080/api/account/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include', // important !
        });

        if (res.status != 200) {
            throw new Error('Login failed');
        }

        setUsername(username);
    };


    const register = async (username: string, email: string, password: string) => {

        const res = await fetch('http://localhost:8080/api/account/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        if (res.status != 201) {
            throw new Error('Login failed');
        }

        await login(username, password);

    }

    const logout = async () => {
        await fetch('http://localhost:8080/api/account/logout/', {
            method: 'POST',
            credentials: 'include',
        });
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ username, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;
