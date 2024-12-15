// import axios from "axios";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//         const cookieStore = cookies();
//         const accessToken = (await cookieStore).get('accessToken')?.value;
//         if (!accessToken) {
//             return NextResponse.json({ message: "Access token not found" }, { status: 401 });
//             //co nen push ve login?
//         }

//         const teacherClassesResponse = await axios.get("https://learn.kienle2411.id.vn/api/teachers/classrooms", {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });

//         if (teacherClassesResponse.data.status === "success") {
//             const classes = teacherClassesResponse.data.data.data; // Lấy data của data
//             return NextResponse.json({
//                 message: "Classes fetched successfully",
//                 classes: classes // Trả về danh sách lớp học 
//             });
//         } else {
//             return NextResponse.json({ message: "Failed to fetch user's classes'" }, { status: 403 });
//         }

//     } catch (error) {
//         console.error("Teacher Class API error: ", error);
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 });

//     }
// }




import axios from 'axios';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function GET() {
    try {
        // Get access token from cookies
        const cookieStore = cookies();
        const accessToken = (await cookieStore).get('accessToken')?.value;

        if (!accessToken) {
            return NextResponse.json({ message: "Access token not found" }, { status: 401 });
        }

        // Fetch teacher classes using the access token
        const response = await axios.get("https://learn.kienle2411.id.vn/api/teachers/classrooms", {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        // Assuming the data is inside 'data' and we need the 'data' array
        if (response.status === 200) {
            return NextResponse.json(response.data.data); // Return the classrooms array
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error(error);
    }
}