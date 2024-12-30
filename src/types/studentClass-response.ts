export interface ApiResponse {
    status: string;
    statusCode: number;
    data: ResponseData;
}

export interface ResponseData {
    data: StudentData[];
    total: number;
    page: number;
    lastPage: number;
}

export interface StudentData {
    student: Student;
    totalScore: string;
}

export interface Student {
    id: string;
    user: User;
    groups: Group[];
}

export interface User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    school: string | null;
    gender: string;
    profileDescription: string | null;
    createdAt: string;
    updatedAt: string;
    mediaId: string | null;
    roleId: string;
    refreshToken: string;
}

export interface Group {
    studentId: string;
    groupId: string;
    classroomId: string;
    createdAt: string;
    deletedAt: string | null;
}