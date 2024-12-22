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

// Add new group
export const addGroup = async (classroomId: string, groupName: string): Promise<void> => {
    try {
        await axiosClient.post(`/classrooms/${classroomId}/groups`, { groupName });
    } catch (error) {
        console.error("Error adding group:", error);
        throw error;
    }
};

// Update group
export const updateGroup = async (groupId: string, groupName: string): Promise<void> => {
    try {
        await axiosClient.patch(`/groups/${groupId}`, { groupName });
    } catch (error) {
        console.error("Error updating group:", error);
        throw error;
    }
};

// Delete group
export const deleteGroup = async (groupId: string): Promise<void> => {
    try {
        await axiosClient.delete(`/groups/${groupId}`);
    } catch (error) {
        console.error("Error deleting group:", error);
        throw error;
    }
};