import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css";


export const metadata: Metadata = {
    title: "Home",
    description: "Thread to share your thought",
};

export default function FrontLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}
