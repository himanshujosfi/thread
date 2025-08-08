import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Thread",
  description: "Thread to share your thought",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        {children}
      </body>
    </html>
  );
}
