import type { Metadata } from "next";
import { Inter, Shrikhand } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import { ActiveThemeProvider } from "@/context/ColorSchemeContext";

const shrikhand = Shrikhand({
    variable: "--font-shrikhand",
    subsets: ["latin"],
    weight: "400",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "John's Pizza",
    description: "John's Pizza",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const activeThemeValue = cookieStore.get("active_theme")?.value;
    const isScaled = activeThemeValue?.endsWith("-scaled");
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    `${inter.className} ${shrikhand.variable} antialiased bg-background`,
                    activeThemeValue ? `theme-${activeThemeValue}` : "theme-red",
                    isScaled ? "theme-scaled" : ""
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    disableTransitionOnChange
                >
                    <ActiveThemeProvider initialTheme={activeThemeValue}>
                    {children}
                    </ActiveThemeProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
