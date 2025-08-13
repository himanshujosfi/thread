"use client"

import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { signIn, useSession } from "next-auth/react"

export default function Login() {
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        if (session) {
            router.push("/")
        }
    }, [session, router])

    const [loader, setLoader] = useState(false)
    const [authRegister, setAuthRegister] = useState<authType>({
        email: "",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { email, password } = authRegister
        if (!email || !password) {
            return alert("please fill all fields")
        }

        setLoader(true)
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            if (res.ok) {
                await signIn("credentials", {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: "/"
                })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className="items-center justify-center h-screen w-screen flex">
            <div className='w-full max-w-md p-6 bg-muted rounded-lg shadow-md'>
                <div className='flex justify-center'>
                    <img src="/vercel.svg" alt="img" width={50} height={20} />
                </div>

                <h1 className='text-sm font-bold py-2 mt-3'>Login</h1>
                <span>Welcome back!</span>

                <form onSubmit={handleSubmit} className='gap-4 flex flex-col mt-4'>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name='email'
                        placeholder='Email'
                        type='email'
                        value={authRegister.email}
                        onChange={(e) => setAuthRegister({ ...authRegister, email: e.target.value })}
                    />
                    <Label htmlFor="password">Password</Label>
                    <Input
                        name='password'
                        placeholder='Password'
                        type='password'
                        value={authRegister.password}
                        onChange={(e) => setAuthRegister({ ...authRegister, password: e.target.value })}
                    />
                    <Button disabled={loader} type='submit'>
                        {loader ? "Loading..." : "Login"}
                    </Button>

                    <span className='text-center text-sm text-muted-foreground mt-4'>
                        Don't have an account?
                        <a href="/register"> Register</a>
                    </span>
                </form>
            </div>
        </div>
    )
}
