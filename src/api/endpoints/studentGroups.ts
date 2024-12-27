import { ApiGroupResponse } from "@/types/group-response-student";
import axiosClient from "../axios-client";

const studentGroupAction = {
    list: async (id: string) => {
        try {
            const response = await axiosClient.get<ApiGroupResponse>(`/classrooms/${id}/groups`);
            console.log(response.data.data.data);
            // return response.data.data.data.map((wrapper) => wrapper.group);
            return response.data.data.data;
        } catch (error) {
            console.error("Group fetch classes error: ", error);
            throw new Error("Failed to fetch data");
        }
    }
}

export default studentGroupAction;