import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    // public routes
    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyEmail";

    // get token from cookies
    const token = request.cookies.get("token")?.value || "";

    // logged in user trying to access login/signup
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // not logged in user trying to access protected routes
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/profile/:path*",
        "/login",
        "/signup",
        "/verifyEmail"
    ],
};