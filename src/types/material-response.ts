export interface Material {
    id: string;
    title: string;
    description: string;
    url?: string;
    createdAt: string;
    updatedAt: string;
    docFileId?: string;
    classroomId: string;
}

export interface MaterialInput {
    title: string;
    description: string;
    url?: string;
    file?: File;
}

export interface MaterialData {
    data: Material[];
    total: number;
    page: number;
    lastPage: number;
}