export interface Question {
    id: string;
    questionType: string;
    responseType: string;
    questionTitle: string
    content?: string | null;
    timeResponse?: number | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    score?: number | null;
    orderInSlide?: number;
    assignmentId: string;
    docFileId?: string | null;
}

//assignment/id/questions
export interface ApiQuestion {
    status: string;
    statusCode: number;
    data: Question[];
}