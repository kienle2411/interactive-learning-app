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

interface ClassroomWrapper {
    classroom: Classroom;
}

interface ClassResponse {
    data: ClassroomWrapper[];
    total: number;
    page: number;
    lastPage: number;
}

export interface ApiResponse {
    status: string;
    statusCode: number;
    data: ClassResponse;
}