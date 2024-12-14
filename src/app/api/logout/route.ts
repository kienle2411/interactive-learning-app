import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Delete cookies
        const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });

        // Delete cookies
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        response.cookies.delete('userProfile');

        return response;
    } catch (error) {
        console.error("Logout API error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}




