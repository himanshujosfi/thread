
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        const body = await req.json()
        const validator = vine.compile(loginSchem)
        const output = await validator.validate(body)

        output.password = await bcrypt.hash(output.password, 10);


        // check the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email: output.email } })
        if (existingUser) {
            return NextResponse.json({
                status: 200, message: "Sucessfull Login"
            },
            )
        }
        if (!existingUser) {
            return NextResponse.json({
                status: 400, errors: "User does not exist , please register first"
            })
        }
        // passsword check in db
        const isPasswordValid = await bcrypt.compare(output.password, existingUser.password)
        if (!isPasswordValid) {
            return NextResponse.json({
                status: 400, errors: "Invalid password and email"
            })
        } else {
            return NextResponse.json({
                status: 200, message: "Login Sucessfull"
            })
        }

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