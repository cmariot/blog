'use client';

import { useAuth } from "@/context/AuthContext";

export default function Home() {

    const { username } = useAuth();

    return (
        <div>
            Hello {username} !
        </div>
    );
}
