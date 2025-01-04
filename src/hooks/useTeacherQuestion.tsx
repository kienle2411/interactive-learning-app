import teacherQuestion from "@/api/endpoints/teacherQuestion";
import { QuestionWithChoices } from "@/types/choice-response-teacher";
import { Question } from "@/types/question-response-teacher";
import { useQuery } from "@tanstack/react-query";

const useTeacherQuestion = () => {
    const useListQuestionById = (id: string) => {
        return useQuery<Question[], Error>({
            queryKey: ["teacher-assignment-question", id],
            queryFn: async () => {
                const result = await teacherQuestion.list(id);
                console.log("useListQuestionById: ", result);
                return result;
            },
            enabled: !!id,
        });
    }

    const useDetailQuestion = (id: string) => {
        return useQuery<QuestionWithChoices, Error>({
            queryKey: ["teacher-question-by-id", id],
            queryFn: async () => {
                const result = await teacherQuestion.detail(id);
                console.log("useDetailQuestion: ", result);
                return result;
            },
            enabled: !!id,
        });
    }

    return {
        useListQuestionById,
        useDetailQuestion,
    }
}

export default useTeacherQuestion;