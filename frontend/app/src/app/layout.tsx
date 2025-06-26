import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';
import NavBar from "@/components/Navbar";
import { ThemeProvider } from "@/components/Theme";
import Footer from "@/components/Footer";


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
        <html lang="en" suppressHydrationWarning>
            <body className='antialiased h-full bg-background'>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <NavBar />
                        <main className="flex-1 container mx-auto px-4">
                            {children}
                        </main>
                        <Footer />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
