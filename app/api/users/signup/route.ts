import { connect } from "@/dbconfig/dbConfig";
import User from "@/modules/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return NextResponse.json(
            { message: "User created successfully", success: true },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating user:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}