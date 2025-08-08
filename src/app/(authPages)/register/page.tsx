"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import bcrypt from 'bcryptjs'

const Register = () => {
    const router = useRouter()
    const [authRegister, setAuthRegister] = useState<authType>({
        email: "",
        password: "",
        name: "",
        conformPassword: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const hashPassword = bcrypt.hashSync(authRegister?.password ?? "", 10);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: authRegister.name,
                    email: authRegister.email,
                    password: hashPassword,
                    password_confirmation: hashPassword
                })
            });
            if (res.ok) {
                const data = await res.json()
                console.log("register", data)
                router.push("/logIn")
            }

        } catch (error) {
            console.error("error", error)
        }

    }


    return (
        <div className=" items-center justify-center h-screen w-screen flex">

            <div className='w-full max-w-md p-6 bg-muted rounded-lg shadow-md'>
                <div className='flex  justify-center'>
                    <img src="/vercel.svg" alt="img" width={40} height={10} />
                </div>

                <h1 className='text-sm font-bold py-2 mt-3'>Login</h1>
                <span>Welcome back !</span>

                <form action="" onSubmit={handleSubmit} className='gap-3 flex flex-col mt-6'>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                        name='name'
                        placeholder='name'
                        type='tezt'
                        value={authRegister.name}
                        onChange={(e) => setAuthRegister({ ...authRegister, name: e.target.value })}
                    />
                    <Label htmlFor='email'>Email</Label>

                    <Input
                        name='email'
                        placeholder='Email'
                        type='email'
                        value={authRegister.email}
                        onChange={(e) => setAuthRegister({ ...authRegister, email: e.target.value })}
                    />
                    <Label htmlFor='password'>Password</Label>

                    <Input
                        name='password'
                        placeholder='Password'
                        type='password'
                        value={authRegister.password}
                        onChange={(e) => setAuthRegister({ ...authRegister, password: e.target.value })}
                    />
                    <Label htmlFor='password'>Conform Password </Label>

                    <Input
                        name='conformPassword'
                        placeholder='Password'
                        type='password'
                        value={authRegister.conformPassword}
                        onChange={(e) => setAuthRegister({ ...authRegister, conformPassword: e.target.value })}
                    />
                    <Button>
                        Register
                    </Button>

                    <span className='text-center text-sm text-muted-foreground mt-4'>
                        Already have an account ?
                        <a href="/logIn" className=' '>Login</a>
                    </span>

                </form>

            </div>


        </div>
    )
}

export default Register