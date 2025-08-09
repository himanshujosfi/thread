import prisma from "@/Db/db.config";
import { loginSchema } from "@/validation/registerSchema";
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validator = vine.compile(loginSchema);
        const output = await validator.validate(body);

        // Normalize email
        output.email = output.email.toLowerCase();

        const existingUser = await prisma.user.findUnique({
            where: { email: output.email }
        });

        if (!existingUser) {
            return NextResponse.json(
                { error: "User does not exist, please register first" },
                { status: 400 }
            );
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            output.password,
            existingUser.password
        );


        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Successful login" },
            { status: 200 }
        );

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json(
                { message: "Invalid email or password format" },
                { status: 400 }
            );
        }
        return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
    }
}
