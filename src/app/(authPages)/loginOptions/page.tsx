import { FaGoogle, FaGithub } from "react-icons/fa";



interface LoginOptionsProps {
    onGoogleClick: React.MouseEventHandler<HTMLButtonElement>;
    onGithubClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function LoginOptions({ onGoogleClick, onGithubClick }: LoginOptionsProps) {
    return (
        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mt-6">
            <button
                onClick={onGoogleClick}
                className="flex items-center gap-3 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
                <FaGoogle className="text-red-500 text-xl" />
                <span className="font-medium text-gray-700">Login with Google</span>
            </button>

            <button
                onClick={onGithubClick}
                className="flex items-center gap-3 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
                <FaGithub className="text-gray-800 text-xl" />
                <span className="font-medium text-gray-700">Login with GitHub</span>
            </button>
        </div>
    );
}
