import teacherClassAction, { addStudentsToClassroom } from "@/api/endpoints/studentClass";
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


export const useStudentsInClass = (classroomId: string) => {
    return useQuery({
        queryKey: ["students", classroomId], // Key duy nhất cho query
        queryFn: () => teacherClassAction.list(classroomId), // Hàm lấy dữ liệu
        enabled: !!classroomId, // Chỉ chạy khi classroomId có giá trị
        staleTime: 5 * 60 * 1000, // Cache dữ liệu trong 5 phút
        refetchOnWindowFocus: true, // Tự động refetch khi chuyển đổi tab
    });
};


export const useDeleteStudentFromClassroom = (classroomId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ studentId }: { studentId: string }) => teacherClassAction.delete(classroomId, studentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students", classroomId] });
            console.log('Student deleted successfully');
        },
        onError: (error) => {
            console.error('Error deleting student from classroom:', error);
        },
    });
}


export const useUpdateInGroup = (classroomId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ groupId, studentId }: { groupId: string, studentId: string }) => teacherClassAction.updateInGroup(groupId, studentId),
        onSuccess: (data) => {
            console.log('Add student to group successfully:', data);
            queryClient.invalidateQueries({ queryKey: ["students", classroomId] });
        },
        onError: (error) => {
            console.error('Error adding student to group:', error);
        },
    });
};