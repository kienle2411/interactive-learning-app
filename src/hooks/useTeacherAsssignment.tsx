import teacherAssignment from "@/api/endpoints/teacherAssignment";
import { Assignment, AssignmentUpdate } from "@/types/assignment-response-teacher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useTeacherAssignment = () => {
    const useListTeacherAssignmentByClass = (id: string) => {
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

    const useGetAssignmentById = (id: string) => {
        return useQuery<Assignment, Error>({
            queryKey: ["teacher-assignment-by-id", id],
            queryFn: async () => {
                const result = await teacherAssignment.getById(id);
                console.log("useGetAssignmentById: ", result);
                return result;
            },
            enabled: !!id,
        });
    };

    const useUpdateAssignment = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({
                id,
                body,
            }: {
                id: string;
                body: AssignmentUpdate;
            }) => teacherAssignment.update(id, body),
            onSuccess: (_, req) => {
                queryClient.invalidateQueries({
                    queryKey: ["teacher-assignment-by-id", req.id],
                });
            },
        });
    };

    return {
        useListTeacherAssignmentByClass,
        useListAllTeacherAssignment,
        useGetAssignmentById,
        useUpdateAssignment,
    }
}

export default useTeacherAssignment;