import { registerSchema } from "@/validation/registerSchema";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const validator = vine.compile(registerSchema)
        const output = await validator.validate(body)

        return NextResponse.json(
            { messages: "user registered", data: output },
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
        return NextResponse.json({ messages: "Unexpected error" }, { status: 500 });
    }

}