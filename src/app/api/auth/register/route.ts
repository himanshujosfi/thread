import prisma from "@/Db/db.config";
import { registerSchema } from "@/validation/registerSchema";
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validator = vine.compile(registerSchema);
        const output = await validator.validate(body);

        output.email = output.email.toLowerCase();

        output.password = await bcrypt.hash(output.password, 10);

        delete (output as any).password_confirmation;

        const existingUser = await prisma.user.findUnique({
            where: { email: output.email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }


        await prisma.user.create({
            data: {
                name: output.name,
                email: output.email,
                password: output.password
            }
        });

        return NextResponse.json(
            { message: "User account created successfully" },
            { status: 200 }
        );

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log("Validation Messages:", error.messages);
            return NextResponse.json(
                { messages: error.messages },
                { status: 400 }
            );
        }
        console.error("Unexpected Error:", error);
        return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
    }
}
