import { ApiMaterialResponse } from "@/types/material-response-student";
import axiosClient from "../axios-client";

const studentMaterials = {
    list: async (id: string) => {
        try {
            const response = await axiosClient.get<ApiMaterialResponse>(`/classrooms/${id}/materials`);
            return response.data.data.data;
        } catch (error) {
            console.error("Group fetch classes error: ", error);
            throw new Error("Failed to fetch data");
        }
    }
}

export default studentMaterials;