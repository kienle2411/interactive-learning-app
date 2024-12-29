import { Student, StudentForDisplay } from "@/types/studentClass-response";
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


export const getStudentsInClassroom = async (classroomId: string): Promise<StudentForDisplay[]> => {
    try {
        const response = await axiosClient.get(`/classrooms/${classroomId}/students`);
        // return response.data; // Dữ liệu học sinh trong lớp học
        return response.data.data.data.map((item: Student) => ({
            id: item.student.user.id,
            name: item.student.user.username,
            group: "Not Assigned",
            score: item.totalScore,
        }));
    } catch (error) {
        console.error('Error fetching students in classroom:', error);
        throw error; // Throw error để xử lý ở nơi gọi API
    }
};