import { useSession } from "next-auth/react"

export function Avatar() {
    const { data: session, status } = useSession()

    if (status === "loading") return <p>Loading...</p>
    return (
        <div className="text-sm">
            {session?.user?.name && <span>{session.user.email}</span>}

        </div>
    )

}