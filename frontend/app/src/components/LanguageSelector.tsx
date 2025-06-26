"use client";

import { useState } from "react";

const LANGUAGES = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
];

export default function LanguageSelector() {
    const [lang, setLang] = useState("fr");

    // Pour une vraie app, ici il faudrait changer la locale globale
    // ou utiliser next-intl/next-i18next, mais ici on simule juste le switch

    return (
        <select
            value={lang}
            onChange={e => setLang(e.target.value)}
            className="rounded border px-2 py-1 text-sm bg-background"
            aria-label="Choisir la langue"
        >
            {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
            ))}
        </select>
    );
}
