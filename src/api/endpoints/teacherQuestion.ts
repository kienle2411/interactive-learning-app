import { ApiQuestion } from "@/types/question-response-teacher";
import axiosClient from "../axios-client";
import { ApiQuestionWithChoice } from "@/types/choice-response-teacher";

const teacherQuestion = {
    list: async (id: string) => {
        try {
            const response = await axiosClient.get<ApiQuestion>(`/assignments/${id}/questions`);
            return response.data.data;
        } catch (error) {
            console.error("Questions fetched error: ", error);
            throw new Error("Failed to fetch data");
        }
    },

    detail: async (id: string) => {
        try {
            const response = await axiosClient.get<ApiQuestionWithChoice>(`/questions/${id}`);
            return response.data.data;
        } catch (error) {
            console.error("Questions fetched error: ", error);
            throw new Error("Failed to fetch data");
        }
    },

    update: async (id: string, title: string) => {
        try {
            const response = await axiosClient.patch(`/questions/${id}`, { questionTitle: title });
            return response.data;
        } catch (error) {
            console.error("Questions update error: ", error);
            throw new Error("Failed to update data");
        }
    },
}

export default teacherQuestion;