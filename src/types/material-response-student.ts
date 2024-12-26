export interface Material {
    id: string;
    title: string;
    description: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    docFileId: string;
    classroomId: string;
}

interface MaterialResponse {
    data: Material[];
    total: number;
    page: number;
    lastPage: number;
}

export interface ApiMaterialResponse {
    status: string;
    statusCode: number;
    data: MaterialResponse;
}