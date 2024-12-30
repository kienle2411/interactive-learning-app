import { ApiResponse } from "@/types/studentClass-response";
import axiosClient from "../axios-client";

//role =  teacher
export const addStudentsToClassroom = async (classroomId: string, email: string) => {
    try {
        const response = await axiosClient.post(`/join-class/${classroomId}/students`, {
            emails: [email],
        });

        return response.data;
    } catch (error) {
        console.error('Error adding students to classroom:', error);
        throw error;
    }
};


const teacherClassAction = {
    list: async (classroomId: string) => {
        try {
            const response = await axiosClient.get<ApiResponse>(`/classrooms/${classroomId}/students`);
            console.log(response.data.data.data);
            return response.data.data.data;
        } catch (error) {
            console.error("Group fetch student error: ", error);
            throw new Error("Failed to fetch data");
        }
    },
    delete: async (classroomId: string, studentId: string) => {
        try {
            const response = await axiosClient.delete(`/join-class`, {
                data: { classroomId, studentId }
            });
            return response.data;
        } catch (error) {
            console.error("Group fetch student error: ", error);
            throw new Error("Failed to fetch data");
        }
    }
}

export default teacherClassAction;