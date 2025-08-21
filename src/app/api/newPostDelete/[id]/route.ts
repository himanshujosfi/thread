import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/Db/db.config";
import { authOptions } from "../../auth/[...nextauth]/option";

// DELETE /api/newPost/:id
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;

        const deleted = await prisma.newPost.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "Post deleted", deleted });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}