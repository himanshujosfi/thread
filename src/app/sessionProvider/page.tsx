"use client"
import { SessionProvider } from "next-auth/react"


export default function CustomeProvider({ children }: { children: React.ReactNode }) {
    return (<SessionProvider>{children}</SessionProvider>)
}
