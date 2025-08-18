import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

import { RefObject, ChangeEventHandler } from "react";

type InputListProps = {
    textValue: string;
    onTextChange: ChangeEventHandler<HTMLTextAreaElement>;
    onFileChange: ChangeEventHandler<HTMLInputElement>;
    fileInputRef: RefObject<HTMLInputElement>;
    onFileClick: () => void;
    onPost: () => void;
    disable?: boolean;
};


export default function InputList({
    textValue,
    onTextChange,
    onFileChange,
    fileInputRef,
    onFileClick,
    onPost,
    disable
}: InputListProps) {
    return (
        <div>
            <div className="flex items-start gap-3 mb-4">
                <img src="/file.svg" alt="Avatar" width={30} height={30} className="rounded-md shrink-0" />
                <Textarea
                    placeholder="Type your message here."
                    id="message"
                    className="w-full h-20"
                    value={textValue}
                    onChange={onTextChange}
                />
            </div>

            {/* Button Row */}
            <div className="flex items-center gap-3 mb-6">
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={onFileChange}
                />
                <img
                    src="/file.svg"
                    alt="Icon"
                    width={20}
                    height={20}
                    className="rounded-md shrink-0 cursor-pointer"
                    onClick={onFileClick}
                />
                <Button className="ml-auto" onClick={onPost} disabled={disable}>
                    Post
                </Button>
            </div>
        </div>
    );
}
