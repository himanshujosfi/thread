import { useSession } from "next-auth/react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function Avatars() {
    const { data: session, status } = useSession()

    if (status === "loading") return <p>Loading...</p>
    return (
        // <div className="text-sm">
        //     {/* {session?.user?.name && <span>{session.user.email}</span>} */}

        // </div>
        <div className="flex flex-row flex-wrap items-center gap-12">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </div>
    )
}