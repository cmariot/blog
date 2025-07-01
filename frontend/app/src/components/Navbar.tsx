"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/blog', label: 'Blog' },
        { href: '/projects', label: 'Projets' },
        { href: '/contact', label: 'Contact' },
    ];

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname === path || pathname.startsWith(path + "/");
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background">
            <div className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="font-mono font-semibold text-lg p-2">cmariot</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`transition-colors hover:text-primary ${isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center">
                    <ThemeToggle />
                    {/* Mobile Menu */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            title="Menu principal"
                            description="Acces aux pages du site"
                            hideTitle={true}
                            side="right"
                            className="w-[300px] sm:w-[400px]"
                        >
                            <nav className="flex flex-col space-y-4 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`block px-2 py-1 text-lg transition-colors hover:text-primary ${isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                                            }`}
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;
