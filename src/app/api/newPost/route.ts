import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions, customeSession } from "../auth/[...nextauth]/option";
import vine, { errors } from "@vinejs/vine";
import { newPostSchema } from "@/schemaValidation/postSchem";
import fs from "fs";
import path from "path";
import prisma from "@/Db/db.config";

export async function POST(req: NextRequest) {
    try {
        const session: customeSession | null = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const formData = await req.formData();
        const newPostText = String(formData.get("newPost") || "");
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
        console.log("url", imageUrl)

        const validator = vine.compile(newPostSchema);
        const payload = await validator.validate({
            newPost: newPostText,
            image: imageUrl || "",
        });

        const newPost = await prisma.newPost.create({
            data: {
                newPost: payload.newPost,
                image: payload.image || null,
                user: { connect: { id: Number(session.user.id) } },
            },
        });

        return NextResponse.json(
            { message: "Post created successfully", data: newPost },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({ message: "Validation failed", errors: error.messages }, { status: 400 });
        }
        console.error("Unexpected API error:", error);
        return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
    }
}


// get data from the post

export async function GET() {
    try {
        const session: customeSession | null = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        const posts = await prisma.newPost.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}


// delete the post

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session: customeSession | null = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const postId = params.id;

        // Check if post exists
        const existingPost = await prisma.newPost.findUnique({
            where: { id: postId },
        });

        if (!existingPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // (Optional) Ensure only the owner can delete their post
        if (existingPost.userId !== session.user.id) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        // Delete the post
        await prisma.newPost.delete({
            where: { id: postId },
        });

        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}
