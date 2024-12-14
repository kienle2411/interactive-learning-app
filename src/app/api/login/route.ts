// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(request: NextRequest) {
//     try {
//         const { username, password } = await request.json();

//         const response = await axios.post("https://learn.kienle2411.id.vn/api/auth/signin", {
//             username,
//             password,
//         });

//         if (response.data.status === "success") {
//             const { accessToken, refreshToken } = response.data.data;

//             const responseWithCookies = NextResponse.json({ message: "Login successful" }, { status: 200 });

//             // Set HTTP-only cookies
//             responseWithCookies.cookies.set("accessToken", accessToken, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === "production",
//                 sameSite: "strict",
//                 path: "/"
//             });

//             responseWithCookies.cookies.set("refreshToken", refreshToken, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === "production",
//                 sameSite: "strict",
//                 path: "/"
//             });

//             return responseWithCookies;
//         } else {
//             return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
//         }
//     } catch (error) {
//         console.error("Login API error:", error);
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        // Authen the user
        const authResponse = await axios.post("https://learn.kienle2411.id.vn/api/auth/signin", {
            username,
            password,
        });

        if (authResponse.data.status === "success") {
            const { accessToken, refreshToken } = authResponse.data.data;

            // Fetch user profile using the access token
            const profileResponse = await axios.get("https://learn.kienle2411.id.vn/api/users/profile", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (profileResponse.data.status === "success") {
                const userProfile = profileResponse.data.data;

                const responseWithCookies = NextResponse.json({
                    message: "Login successful",
                    role: userProfile.roleId
                }, { status: 200 });

                // Set HTTP-only cookies
                responseWithCookies.cookies.set("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/"
                });

                responseWithCookies.cookies.set("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/"
                });

                // Set user profile
                responseWithCookies.cookies.set("userProfile", JSON.stringify({
                    id: userProfile.id,
                    username: userProfile.username,
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName,
                    roleId: userProfile.roleId
                }), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/"
                });

                return responseWithCookies;
            } else {
                return NextResponse.json({ message: "Failed to fetch user profile" }, { status: 403 });
            }
        } else {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }
    } catch (error) {
        console.error("Login API error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}