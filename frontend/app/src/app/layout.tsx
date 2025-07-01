import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme";
import NavBar from "@/components/Navbar";
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
                    <NavBar />
                    <main className="flex-1 container mx-auto px-4 max-w-[1000px]">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
