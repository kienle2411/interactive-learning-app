export interface Group {
    classroomId: string;
    createdAt: string;
    deletedAt: string;
    groupName: string;
    id: string;
    totalScore: number;
    updatedAt: string;
}


interface GroupResponse {
    data: Group[];
    total: number;
    page: number;
    lastPage: number;
}

export interface ApiGroupResponse {
    status: string;
    statusCode: number;
    data: GroupResponse;
}