"use client"

import React from 'react'
import { Button } from '../ui/button'
import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePushPin } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LeftBar = () => {
    const pathname = usePathname()
    return (
        <div className='h-screen w-screen bg-black md:w-1/4 lg:w-1/5 xl:w-1/6 p-4  shadow-md border-r-2 hidden md:block'>
            <div className='flex flex-col items-center h-full justify-between '>
                <img src="/file.svg" alt="img" width={40} height={40} className='mt-6' />

                <ul className='flex flex-col gap-6 text-white text-sm '>
                    <li className={`${pathname === "/" ? "font-bold " : ""}`}>
                        <Link href="/" className="hover:text-white flex flex-row gap-3 items-center ">
                            <MdHomeFilled size={24} />Home
                        </Link>
                    </li>
                    <li className={`${pathname === "/Dashboard" ? "font-bold" : ""}`}> <Link href={"/Dashboard"} className="hover:text-white"><IoSearch />Search</Link></li>
                    <li> <Link href={""} ><IoMdAdd /></Link></li>
                    <li>  <Link href={""} ><CiHeart /></Link></li>
                    <li>  <Link href={""}><CgProfile /></Link></li>
                </ul>

                <ul className='flex flex-col gap-6 text-white text-2xl'>
                    <li><Link href={""}><MdOutlinePushPin /></Link></li>
                    <li><Link href={""}><CgDetailsMore /></Link></li>

                </ul>
            </div>
        </div >
    )
}

export default LeftBar