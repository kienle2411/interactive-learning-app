import teacherChoice from "@/api/endpoints/teacherChoice";
import teacherQuestion from "@/api/endpoints/teacherQuestion";
import { ChoiceUpdate, QuestionWithChoices } from "@/types/choice-response-teacher";
import { Question } from "@/types/question-response-teacher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

    const useUpdateQuestion = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({
                id,
                questionTitle,
            }: {
                id: string;
                questionTitle: string;
            }) => teacherQuestion.update(id, questionTitle),
            onSuccess: (_, req) => {
                queryClient.invalidateQueries({
                    queryKey: ["teacher-assignment-by-id", req.id],
                });
            },
        });
    };

    const useUpdateChoice = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({
                id,
                data,
            }: {
                id: string;
                data: ChoiceUpdate;
            }) => teacherChoice.update(id, data),
            onSuccess: (_, req) => {
                queryClient.invalidateQueries({
                    queryKey: ["teacher-assignment-by-id", req.id],
                });
            },
        });
    };

    return {
        useListQuestionById,
        useDetailQuestion,
        useUpdateQuestion,
        useUpdateChoice,
    }
}

export default useTeacherQuestion;