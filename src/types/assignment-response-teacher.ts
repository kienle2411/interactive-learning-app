export interface Assignment {
    id: string;
    startTime: string;
    dueTime: string;
    title: string;
    description: string;
    assignmentType: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    score: number | null;
    classroomId: string;
}

interface AssignmentData {
    data: Assignment[];
    total: number;
    page: number;
    lastPage: number;
}

export interface ApiAssignment {
    status: string;
    statusCode: number;
    data: AssignmentData
}

export interface ApiAssignmentAll {
    status: string;
    statusCode: number;
    data: Assignment[];
}

export interface ApiAssignmentById {
    status: string;
    statusCode: number;
    data: Assignment;
}