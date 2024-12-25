import { Material, MaterialData, MaterialInput } from "@/types/material-response";
import { ApiResponse } from "@/types/response-types";
import axiosClient from "../axios-client";

export const fetchClassMaterials = async (id: string): Promise<ApiResponse<MaterialData>> => {
    try {
        const response = await axiosClient.get(`/classrooms/${id}/materials`);
        return response.data;
    } catch (error) {
        console.error("Error fetching materials: ", error);
        throw error;
    }
}

export const downloadDocFile = async (docFileId: string): Promise<Blob> => {
    try {
        const response = await axiosClient.get(`/docfiles/${docFileId}/download`, {
            responseType: 'blob', // Đảm bảo API trả về tệp dưới dạng blob
        });
        return response.data;
    } catch (error) {
        console.error("Error downloading doc file: ", error);
        throw error;
    }
};

export const createMaterial = async (classroomId: string, data: MaterialInput): Promise<ApiResponse<Material>> => {
    try {
        const formData = new FormData();
        formData.append('title', data.title.trim());
        formData.append('description', data.description.trim());
        if (data.url) formData.append('url', data.url.trim());
        if (data.file) formData.append('file', data.file);

        const response = await axiosClient.post(`/classrooms/${classroomId}/materials`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating material: ", error);
        throw error;
    }
}