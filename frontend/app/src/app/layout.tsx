import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';
import NavBar from "@/components/Navbar";
import { ThemeProvider } from "@/components/Theme";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "cmariot's blog",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>

                        <NavBar />
                        <main className="w-full h-full">
                            {children}
                        </main>
                        <div>footer</div>
                        {/* <Footer /> */}
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
