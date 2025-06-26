"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    // Détermine si le thème courant est dark dynamiquement
    const isDark = (theme === 'dark') || (theme === 'system' && resolvedTheme === 'dark');

    const toggleTheme = () => {
        if (isDark) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
    );
}
