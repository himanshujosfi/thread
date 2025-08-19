"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button'
import { ImagePreview } from '../common/imagePreview';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Loader from '@/app/Loader/page';
import { Avatars } from '../common/avatar/avatar';
import { Heart, MoreHorizontal, Share } from 'lucide-react';
import { CgComment } from 'react-icons/cg';
import formatRelativeDate from '../common/dateconverter/page';

interface UserData {
    name: string;
}
interface Post {
    id: string;
    newPost: string;
    image?: string;
    createdAt: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

const CenterList = () => {
    const myRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [image, setImage] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string | undefined>()
    const [errors, setErrors] = useState(false)
    const [data, setData] = useState<UserData>({
        name: "",
    });

    // fetch the post data
    useEffect(() => {
        setLoading(true)
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/newPost");
                if (!res.ok) throw new Error("Failed to fetch posts");

                const data = await res.json();
                setPosts(data);
            } catch (err) {
                toast.error("Fail to fetch the post ?")
            } finally {
                setLoading(false)
                toast.success("All post fetch sucessfully !")
            }
        };
        fetchPosts();
    }, []);

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

    const handlePost = async () => {
        if (!data.name?.trim().length) {
            setErrors(true)
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("newPost", data.name);
            if (image) formData.append("image", image);

            const res = await fetch("/api/newPost", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                toast.success("New post created successfully!");
                router.push("/");
                setData({ name: "" });
                setImage(null);
                setImageUrl(undefined);
            } else {
                toast.error("Error creating post: " + result.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 flex flex-col h-screen">
            {/* Top Logo */}
            <div className="flex items-center justify-center mb-8">
                <img src="/file.svg" alt="Logo" width={40} height={40} />
            </div>

            {/* Image Preview */}
            {imageUrl && (
                <ImagePreview image={image} imageUrl={imageUrl} callback={handleRemove} />
            )}

            {/* Textarea Row */}
            <div className="flex items-start gap-3 mb-1 w-full ">
                <Avatars />

                <div className="flex flex-col w-full">
                    <Textarea
                        placeholder="Type your message here."
                        id="message"
                        className={`w-full h-20 ${errors ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />

                    {errors && (
                        <p className="mt-1 text-sm text-red-500">
                            Fill the required field
                        </p>
                    )}
                </div>
            </div>


            {/* Button Row */}
            <div className="flex items-center gap-3 mb-6 p-2">
                <input type="file" className="hidden" ref={myRef} onChange={handleImage} />
                <img
                    src="/file.svg"
                    alt="Icon"
                    width={20}
                    height={20}
                    className="rounded-md shrink-0 cursor-pointer py-4 ml-8 "
                    onClick={handleRef}
                />
                <Button className="ml-auto" onClick={handlePost} >Post</Button>
            </div>

            {/* Feed Container */}
            <div className="flex-1 overflow-y-auto space-y-4">
                {posts.map((user) => (
                    <div key={user.id} className="flex flex-row items-start gap-4 p-2">
                        {/* Avatar */}
                        <Avatars />

                        <div className="flex flex-col flex-1 rounded-lg shadow-sm bg-white border px-2">
                            {/* Top row */}
                            <div className="flex justify-between items-center">
                                <strong className="text-lg font-semibold">{user.user.name}</strong>
                                <div className="flex gap-2 items-center text-gray-600 text-sm">
                                    <p>{formatRelativeDate(user.createdAt)}</p>
                                    <MoreHorizontal />
                                </div>
                            </div>

                            {/* Post content */}
                            <div className="flex flex-col mt-1 mb-1">
                                <p className="text-gray-700 font-semibold text-sm">
                                    Sample post content for {user.newPost}
                                </p>
                                <img
                                    src={user.image}
                                    alt="img"
                                    className="mt-2 w-full h-64 object-cover rounded-md border"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                                    <CgComment className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                                    <Share className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {loading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default CenterList;
