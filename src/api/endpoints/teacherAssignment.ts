import { ApiAssignment, ApiAssignmentAll } from "@/types/assignment-response-teacher";
import axiosClient from "../axios-client";

const teacherAssignment = {
    list: async (id: string) => {
        try {
            const response = await axiosClient.get<ApiAssignment>(`/classrooms/${id}/assignments`);
            return response.data.data.data;
        } catch (error) {
            console.error("Assignment fetched error: ", error);
            throw new Error("Failed to fetch data");
        }
    },

    listAll: async () => {
        try {
            const response = await axiosClient.get<ApiAssignmentAll>(`/assignments`);
            return response.data.data;
        } catch (error) {
            console.error("Assignment fetched error: ", error);
            throw new Error("Failed to fetch data");
        }
    }
}

export default teacherAssignment;