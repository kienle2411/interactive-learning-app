export interface Group {
    id: string;
    groupName: string;
    totalScore: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    classroomId: string;
}

export interface GroupData {
    data: Group[];
    total: number;
    page: number;
    lastPage: number;
}