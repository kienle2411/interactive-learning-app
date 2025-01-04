export interface Choice {
    id: string;
    content: string;
    isCorrectAnswer: boolean;
    questionId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

export interface QuestionWithChoices {
    id: string;
    questionType: string;
    responseType: string;
    questionTitle: string;
    content?: string;
    timeResponse: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    score?: number;
    orderInSlide: number;
    medias?: string[];
    options?: Choice[],
    assignmentId: string;
    docFileId?: string;
}

export interface ApiQuestionWithChoice {
    status: string;
    statusCode: number;
    data: QuestionWithChoices;
}