import { ApiAssignment, ApiAssignmentAll, ApiAssignmentById, AssignmentUpdate } from "@/types/assignment-response-teacher";
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
    },

    getById: async (id: string) => {
        try {
            const response = await axiosClient.get<ApiAssignmentById>(`/assignments/${id}`);
            return response.data.data;
        } catch (error) {
            console.error("Assignment fetched error: ", error);
            throw new Error("Failed to fetch data");
        }
    },

    update: async (id: string, data: AssignmentUpdate) => {
        try {
            const response = await axiosClient.patch(`/assignments/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Assignment updated error: ", error);
            throw new Error("Failed to update data");
        }
    },

    delete: async (id: string) => {
        try {
            const response = await axiosClient.delete(`/assignments/${id}`);
            return response.data;
        } catch (error) {
            console.error("Assignment delete error: ", error);
            throw new Error("Failed to delete data");
        }
    },
}

export default teacherAssignment;