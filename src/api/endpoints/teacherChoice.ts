import { ChoiceUpdate } from "@/types/choice-response-teacher";
import axiosClient from "../axios-client";

const teacherChoice = {
    update: async (id: string, data: ChoiceUpdate) => {
        try {
            const response = await axiosClient.patch(`/choice/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Choice updated error: ", error);
            throw new Error("Failed to update data");
        }
    }
}

export default teacherChoice;