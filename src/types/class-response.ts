// Định nghĩa kiểu dữ liệu cho lớp học
export interface Classroom {
    id: string;
    classroomName: string;
    description: string;
    capacity: number;
    classroomCode: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    teacherId: string;
}

export interface ClassroomData {
    data: Classroom[];
    total: number;
    page: number;
    lastPage: number;
}
