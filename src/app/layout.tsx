import type { Metadata } from "next";
import "./globals.css";
import CustomeProvider from "./sessionProvider/page";
import { Toaster } from "@/components/ui/sonner"


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
    <html lang="en">
      <body >
        <CustomeProvider>
          {children}
          <Toaster />
        </CustomeProvider>
      </body>
    </html >
  );
}
