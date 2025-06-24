'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Github, Linkedin, X, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function NavBar() {
    const [isDark, setIsDark] = useState(true);
    const { username, logout } = useAuth();

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('light');
    };

    const navItems = [
        { href: '/', label: 'Accueil' },
        { href: '/register', label: 'Register' },
        { href: '/login', label: 'Connexion' },
        // { href: '/about', label: 'À propos' },
        // { href: '/progress', label: 'Journal' },
        // { href: '/roadmap', label: 'Roadmap' },
        // { href: '/blog', label: 'Blog' },
        // { href: '/projects', label: 'Projets' },
        // { href: '/contact', label: 'Contact' },
    ];

    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className='p-4'>
                    <span className="font-mono font-semibold text-lg">cmariot</span>
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
                    {username && (
                        <Button variant="outline" onClick={logout}>
                            Logout
                        </Button>
                    )}
                </nav>

                <div className="flex items-center space-x-4">
                    {/* Social Links */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://github.com/cmariot" target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                            </a>
                        </Button>
                        {/* <Button variant="ghost" size="icon" asChild>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <X className="h-4 w-4" />
                            </a>
                        </Button> */}
                    </div>

                    {/* Theme Toggle */}
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[300px] sm:w-[400px]"
                            title="Menu"
                        >
                            <nav className="flex flex-col space-y-4 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`block px-2 py-1 text-lg transition-colors hover:text-primary ${isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <div className="flex items-center space-x-2 pt-4">
                                    <Button variant="ghost" size="icon" asChild>
                                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                            <Github className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="ghost" size="icon" asChild>
                                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="ghost" size="icon" asChild>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                            <X className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

