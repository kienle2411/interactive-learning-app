import { addStudentsToClassroom, getStudentsInClassroom } from "@/api/endpoints/studentClass";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//role = teacher
export const useAddStudentToClassroom = (classroomId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ email }: { email: string }) => addStudentsToClassroom(classroomId, email),
        onSuccess: (data) => {
            console.log('Student added successfully:', data);
            queryClient.invalidateQueries({ queryKey: ["students", classroomId] });
            // Chắc sẽ thêm toast
        },
        onError: (error) => {
            console.error('Error adding student to classroom:', error);
        },
    });
};


export const useStudentsInClassroom = (classroomId: string) => {
    return useQuery({
        queryKey: ["students", classroomId],
        queryFn: () => getStudentsInClassroom(classroomId),
        enabled: !!classroomId,
        staleTime: 5 * 60 * 1000,
    });
};
