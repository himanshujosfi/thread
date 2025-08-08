"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const Login = () => {
    const [authRegister, setAuthRegister] = useState<authType>({
        email: "",
        password: "",
        // name: "",
        // conformPassword: ""
    })

    const handleSubmit = () => {
        console.log("auth", authRegister)
    }
    return (
        <div className=" items-center justify-center h-screen w-screen flex">

            <div className='w-full max-w-md p-6 bg-muted rounded-lg shadow-md'>
                <div className='flex  justify-center'>
                    <img src="/vercel.svg" alt="img" width={50} height={20} />
                </div>

                <h1 className='text-sm font-bold py-2 mt-3'>Login</h1>
                <span>Welcome back !</span>

                <form action="" onSubmit={handleSubmit} className='gap-4 flex flex-col mt-4'>
                    <Label htmlFor="email" >Email</Label>
                    <Input
                        name='email'
                        placeholder='Email'
                        type='email'
                        value={authRegister.email}
                        onChange={(e) => setAuthRegister({ ...authRegister, email: e.target.value })}
                    />
                    <Label htmlFor="password" >Password</Label>

                    <Input
                        name='password'
                        placeholder='Password'
                        type='password'
                        value={authRegister.password}
                        onChange={(e) => setAuthRegister({ ...authRegister, password: e.target.value })}
                    />
                    <Button>
                        Login
                    </Button>

                    <span className='text-center text-sm text-muted-foreground mt-4'>
                        Don't have an account ?
                        <a href="/register" className=' '>Register</a>
                    </span>

                </form>

            </div>


        </div>
    )
}

export default Login