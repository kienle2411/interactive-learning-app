interface QuestionData {
  id: string;
  questionType: string;
  responseType: string;
  questionTitle: string;
  content: string;
  timeResponse: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  score: number;
  orderInSlide: number;
  options: OptionData[];
  assignmentId: string;
  docFileId: string;
}

interface OptionData {
  id: string;
  content: string;
  isCorrectAnswer: boolean;
  questionId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface CreateQuestionData {
  questionType: string;
  responseType: string;
  questionTitle: string;
  content?: string;
  timeResponse?: number;
  score?: number;
  orderInSlide: number;
  assignmentId?: string;
  docFileId?: string;
}

interface CreateChoiceData {
  content: string;
  isCorrectAnswer: boolean;
  questionId: string;
}
