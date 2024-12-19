// import axios from "axios";
// import axiosClient from "../axios-client";
// import { ClassroomResponse } from "@/types/class-response";

// // Hàm lấy danh sách các lớp học của giáo viên
// export const getTeacherClasses = async (
//     page: number = 1,
//     pageSize: number = 50
// ): Promise<ClassroomResponse> => {
//     try {
//         const response = await axiosClient.get("/teachers/classrooms", {
//             params: { page, pageSize },
//         });
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             if (error.response) {
//                 console.error(
//                     "Error during get teacher classes: ",
//                     error.response.data.message + ": " + error.response.data.errors?.[0]
//                 );
//             } else {
//                 console.error("Error with no response: ", error.message);
//             }
//         } else {
//             console.error("General error during get teacher classes: ", error);
//         }
//         throw error;
//     }
// };

import axiosClient from "@/api/axios-client";
import { ApiResponse } from "@/types/response-types";
import { ClassroomData } from "@/types/class-response";

// Fetch danh sách lớp học của giáo viên
export const fetchTeacherClasses = async (): Promise<ApiResponse<ClassroomData>> => {
    try {
        const response = await axiosClient.get("/teachers/classrooms");
        return response.data; // Trả về dữ liệu sau khi nhận được response từ server
    } catch (error) {
        console.error("Error fetching classrooms:", error);
        throw error; // Ném lỗi lên để các hàm gọi phía trên có thể xử lý
    }
};
