// components/LoginForm.tsx

'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            router.push('/');
        } catch (err) {
            alert('Register failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
            <h1>Register</h1>
            <input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="border px-2 py-1 rounded"
            />
            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                Register
            </Button>
        </form>
    );
}
