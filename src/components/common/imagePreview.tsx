"use client";

import React from "react";
import { X } from "lucide-react";

interface ImagePreviewProps {
    image: File | null;
    callback: () => void;
    imageUrl?: string | null;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ image, callback }) => {
    if (!(image instanceof File)) return null;

    const previewUrl = URL.createObjectURL(image);

    return (
        <div className="relative w-full bg-cover bg-size flex justify-center items-center p-2">
            <img
                src={previewUrl}
                alt="Selected preview"
                className="max-h-40 rounded-lg border"
            />

            <button
                type="button"
                onClick={callback}
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black"
            >
                <X size={16} />
            </button>
        </div>
    );
};
