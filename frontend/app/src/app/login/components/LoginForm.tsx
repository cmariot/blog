// components/LoginForm.tsx

'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            router.push('/');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
            <h1>Login</h1>
            <input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="border px-2 py-1 rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border px-2 py-1 rounded"
            />
            <Button type='submit'>
                Login
            </Button>
        </form>
    );
}
