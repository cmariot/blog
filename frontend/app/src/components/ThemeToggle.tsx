"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;
    const isDark = (theme === 'dark') || (theme === 'system' && resolvedTheme === 'dark');

    const toggleTheme = () => {
        if (isDark) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Theme switcher">
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
    );
}
