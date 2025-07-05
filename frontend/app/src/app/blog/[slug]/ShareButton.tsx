"use client";

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { toast } from "sonner"

export default function ShareButton() {
    const pathname = usePathname();
    const url = typeof window !== 'undefined' ? window.location.origin + pathname : '';

    const handleShare = async () => {
        await navigator.clipboard.writeText(url);
        toast("Lien copié !")
    };

    return (
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleShare}>
                <Share className="h-4 w-4" />
                Partager
            </Button>
    );
}
