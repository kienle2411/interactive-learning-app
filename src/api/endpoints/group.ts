import axiosClient from "@/api/axios-client";
import { GroupData } from "@/types/group-response";
import { ApiResponse } from "@/types/response-types";

export const fetchClassGroup = async (id: string): Promise<ApiResponse<GroupData>> => {
    try {
        const response = await axiosClient.get(`/classrooms/${id}/groups`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching groups: ", error);
        throw error;
    }
}