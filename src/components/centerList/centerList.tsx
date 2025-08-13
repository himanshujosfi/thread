"use client"

import React, { useRef, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button'
import { ImagePreview } from '../common/imagePreview';

interface UserData {
    name: string;
}
const CenterList = () => {
    const myRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string | undefined>()
    const [data, setData] = useState<UserData>({
        name: "",
    });


    const handleRef = () => {
        myRef.current?.click()
    }
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectFile = e.target.files?.[0]
        if (selectFile) {
            setImage(selectFile)
            const imgUrl = URL.createObjectURL(selectFile)
            setImageUrl(imgUrl)
        }
    }
    const handleRemove = () => {
        setImage(null)
        setImageUrl(undefined);
    };

    const handlePost = () => { "" }

    const users = [
        { id: 1, name: "Aarav Sharma", email: "aarav.sharma@example.com", image: "/file.svg" },
        { id: 2, name: "Priya Mehta", email: "priya.mehta@example.com", image: "/file.svg" },
        { id: 3, name: "Rohan Kapoor", email: "rohan.kapoor@example.com", image: "/file.svg" },
        { id: 4, name: "Neha Singh", email: "neha.singh@example.com", image: "/file.svg" },
        { id: 5, name: "Ishaan Verma", email: "ishaan.verma@example.com", image: "/file.svg" },
        { id: 6, name: "Simran Kaur", email: "simran.kaur@example.com", image: "/file.svg" },
    ];

    return (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 flex flex-col h-screen">
            {/* Top Logo */}
            <div className="flex items-center justify-center mb-8">
                <img src="/file.svg" alt="Logo" width={40} height={40} />
            </div>

            {
                imageUrl ? <ImagePreview image={image} imageUrl={imageUrl} callback={handleRemove} /> : ""
            }

            {/* Textarea Row */}
            <div className="flex items-start gap-3 mb-4">
                <img src="/file.svg" alt="Avatar" width={30} height={30} className="rounded-md shrink-0" />
                <Textarea
                    placeholder="Type your message here."
                    id="message"
                    className="w-full h-20"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
            </div>

            {/* Button Row */}
            <div className="flex items-center gap-3 mb-6">
                <input type="file" className='hidden' ref={myRef} onChange={handleImage}
                />
                <img
                    src="/file.svg"
                    alt="Icon"
                    width={20}
                    height={20}
                    className="rounded-md shrink-0"
                    onClick={handleRef}
                />
                <Button className="ml-auto" onClick={handlePost} disabled={data.name.length <= 5}>Post</Button>
            </div>

            {/* User List - Scrollable */}
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col items-center gap-3">
                    {users.map((item) => (
                        <div
                            key={item.id}
                            className="shadow-lg rounded-lg w-full p-4 bg-white border border-gray-200"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt="profile"
                                    width={40}
                                    height={40}
                                    className="rounded-lg bg-red-400 shrink-0"
                                />
                                <h2 className="text-lg font-bold flex-1 truncate">
                                    {item.name}
                                </h2>
                                <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm shrink-0">
                                    View
                                </button>
                            </div>
                            <div className="text-gray-600 mt-1 pl-14 break-words">
                                {item.email}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default CenterList;
