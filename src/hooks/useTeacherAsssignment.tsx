import teacherAssignment from "@/api/endpoints/teacherAssignment";
import { Assignment } from "@/types/assignment-response-teacher";
import { useQuery } from "@tanstack/react-query";

const useTeacherAssignment = () => {
    const useListTeacherAssignment = (id: string) => {
        return useQuery<Assignment[], Error>({
            queryKey: ["teacher-assignment", id],
            queryFn: async () => {
                const result = await teacherAssignment.list(id);
                console.log("useListTeacherAssignment: ", result);
                return result;
            },
            enabled: !!id,
        });
    }

    const useListAllTeacherAssignment = () => {
        return useQuery<Assignment[], Error>({
            queryKey: ["teacher-assignment-all"],
            queryFn: async () => {
                const result = await teacherAssignment.listAll();
                console.log("useListAllTeacherAssignment: ", result);
                return result;
            },
        });
    }

    return {
        useListTeacherAssignment,
        useListAllTeacherAssignment,
    }


}

export default useTeacherAssignment;