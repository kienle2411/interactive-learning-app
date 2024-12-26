// import axiosClient from "../axios-client"

// const studentClassesAction = {
//     list: async () => {
//         try {
//             const response = await axiosClient.get(`/students/classrooms`);
//             return response.data.data.data;
//         } catch (error) {
//             console.log("Student fetch classes error: ", error);
//             console.error("Failed to fetch data");
//         }
//     }
// }

// export default studentClassesAction;



import axiosClient from "../axios-client";
import { ApiResponse } from "@/types/class-response-student";

const studentClassesAction = {
    list: async () => {
        try {
            const response = await axiosClient.get<ApiResponse>(`/students/classrooms`);
            // Transform the data to match the component's expectations
            return response.data.data.data.map(wrapper => wrapper.classroom);

        } catch (error) {
            console.error("Student fetch classes error: ", error);
            throw new Error("Failed to fetch data");
        }
    }
};

export default studentClassesAction;