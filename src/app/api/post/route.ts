import { NextRequest, NextResponse } from "next/server";
import { authOptions, customeSession } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import vine, { errors } from "@vinejs/vine";
import { postSchema } from "@/schemaValidation/postSchem";
import { imageSchema } from "@/schemaValidation/imageValidator";
import { join, extname } from "path";
import { randomNum } from "@/lib/utils";
import { writeFile, mkdir } from "fs/promises";
import prisma from "@/Db/db.config";

export async function POST(request: NextRequest) {
    try {
        // ✅ check session
        const session: customeSession | null = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // ✅ parse form data
        const formData = await request.formData();
        const content = formData.get("content")?.toString();

        const data = { content, image: "" };

        // ✅ validate text content
        const validator = vine.compile(postSchema);
        const output = await validator.validate(data);

        // ✅ process image if provided
        const file = formData.get("image");
        if (file && file instanceof File) {
            // validate image
            const imageNotValid = imageSchema(file.size, file.name);
            if (imageNotValid) {
                return NextResponse.json(
                    { errors: "Image is not valid" },
                    { status: 400 }
                );
            }

            // convert file to buffer
            const buffer = Buffer.from(await file.arrayBuffer());

            // ensure upload dir exists
            const uploadDir = join(process.cwd(), "public", "upload");
            await mkdir(uploadDir, { recursive: true });

            // generate unique filename
            const fileExt = extname(file.name) || ".jpg";
            const fileName = `${Date.now()}_${randomNum(1, 9999)}${fileExt}`;

            // save file
            await writeFile(join(uploadDir, fileName), buffer);
            data.image = fileName;
        }

        // ✅ insert in DB
        await prisma.post.create({
            data: {
                content: output.content,
                userId: Number(session.user?.id),
                image: data.image || null,
            },
        });

        return NextResponse.json(
            { message: "Post created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("❌ API /api/post failed:", error);

        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json(
                { message: "Validation failed", details: error.messages },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Unexpected error occurred", details: String(error) },
            { status: 500 }
        );
    }
}
