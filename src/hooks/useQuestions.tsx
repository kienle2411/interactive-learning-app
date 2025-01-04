import {
  createChoice,
  createQuestion,
  updateChoice,
  updateQuestion,
} from "@/api/endpoints/question";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import axios from "axios";

export const useCreateChoice = () => {
  return useMutation({
    mutationFn: (data: CreateChoiceData) => createChoice(data.questionId, data),
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useCreateQuestion = () => {
  return useMutation({
    mutationFn: (data: CreateQuestionData) => createQuestion(data),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Question Created!",
        duration: 1000,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed",
        description:
          axios.isAxiosError(error) && error.response?.data.errors[0],
        duration: 1000,
      });
    },
  });
};

export const useUpdateQuestion = (questionId: string) => {
  return useMutation({
    mutationFn: (data: Partial<CreateQuestionData>) =>
      updateQuestion(questionId, data),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Question Updated!",
        duration: 1000,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed",
        description:
          axios.isAxiosError(error) && error.response?.data.errors[0],
        duration: 1000,
      });
    },
  });
};

export const useUpdateChoice = () => {
  return useMutation({
    mutationFn: ({
      choiceId,
      data,
    }: {
      choiceId: string;
      data: Partial<CreateChoiceData>;
    }) => updateChoice(choiceId, data),
    onSuccess: () => {},
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed",
        description:
          axios.isAxiosError(error) && error.response?.data.errors[0],
        duration: 1000,
      });
    },
  });
};
