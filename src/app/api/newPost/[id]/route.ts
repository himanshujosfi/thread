import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Db/db.config";
import { authOptions, customeSession } from "../../auth/[...nextauth]/option";

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


// updatr the post


import * as fs from "fs"
import path from "path"
import vine, { errors } from "@vinejs/vine"
import { newPostSchema } from "@/schemaValidation/postSchem"

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session: customeSession | null = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
        }

        const formData = await req.formData();
        const updatedText = String(formData.get("newPost") || "");
        const imageFile = formData.get("image") as File | null;

        let imageUrl: string | null = null;

        if (imageFile && imageFile.size > 0) {
            const uploadsDir = path.join(process.cwd(), "public");
            if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

            const fileName = `${Date.now()}_${imageFile.name}`;
            const filePath = path.join(uploadsDir, fileName);

            const arrayBuffer = await imageFile.arrayBuffer();
            fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

            imageUrl = `${fileName}`;
        }

        // ✅ Validate fields
        const validator = vine.compile(newPostSchema);
        const payload = await validator.validate({
            newPost: updatedText,
            image: imageUrl || "",
        });

        // ✅ Update post
        const updatedPost = await prisma.newPost.update({
            where: { id: Number(id) },
            data: {
                newPost: payload.newPost,
                image: payload.image || null,
                user: { connect: { id: Number(session.user.id) } },
            },
        });

        return NextResponse.json(
            { message: "Post updated successfully", data: updatedPost },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({ message: "Validation failed", errors: error.messages }, { status: 400 });
        }
        console.error("Error updating post:", error);
        return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
    }
}
