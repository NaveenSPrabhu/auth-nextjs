import { connect } from "@/dbconfig/dbConfig";
import User from "@/modules/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { email, password } = reqBody;

        // check if user exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return NextResponse.json(
                { message: "User does not exist" },
                { status: 400 }
            );
        }

        // verify password
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 400 }
            );
        }

        // create token data
        const tokenData = {
            id: existingUser._id,
            email: existingUser.email,
        };

        // create token
        const token = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" }
        );

        // create response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        // set cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: false, // change to true in production
            sameSite: "lax",
            path: "/",
        });

        return response;

    } catch (error: any) {

        console.error("Error logging in:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}