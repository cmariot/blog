// components/LoginForm.tsx

'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            alert('Register in');
        } catch (err) {
            alert('Register failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
            <h2>Register</h2>
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
            <button type="submit" className="bg-blue-500 text-white py-1 rounded">
                Register
            </button>
        </form>
    );
}
