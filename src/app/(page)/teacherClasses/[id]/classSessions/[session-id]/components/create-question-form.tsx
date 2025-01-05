"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateChoice,
  useCreateQuestion,
  useUpdateChoice,
  useUpdateQuestion,
} from "@/hooks/useQuestions";
import { zodResolver } from "@hookform/resolvers/zod";
import { m } from "framer-motion";
import { Delete, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  questionType: z.string(),
  responseType: z.string(),
  questionTitle: z.string(),
  content: z.string(),
  timeResponse: z.string(),
  score: z.string(),
  orderInSlide: z.string(),
  docFileId: z.string(),
});

interface IQuestionForm {
  docFileId: string;
  order: number;
  question?: QuestionData;
}

export default function QuestionForm({
  docFileId,
  order,
  question,
}: IQuestionForm) {
  const [choices, setChoices] = useState<string[]>([]);
  const [questionType, setQuestionType] = useState("");
  const [correct, setCorrect] = useState("");
  const { mutate: createQuestion } = useCreateQuestion();
  const { mutate: createChoice } = useCreateChoice();
  const { mutate: updateChoice } = useUpdateChoice();
  const { mutate: updateQuestion } = useUpdateQuestion(
    (question && question.id) || ""
  );

  useEffect(() => {
    if (question) {
      setQuestionType(question.questionType);
      const correctAnswer = question.options?.find(
        (option) => option.isCorrectAnswer
      );
      if (correctAnswer) {
        setCorrect(correctAnswer.content);
      }
      const allChoices = question.options?.map((option) => option.content);
      console.log(question);
      setChoices(allChoices);
    }
  }, [question]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: question
      ? {
          questionType: question.questionType,
          responseType: question.responseType,
          questionTitle: question.questionTitle,
          content: question.content,
          timeResponse: question.timeResponse.toString(),
          score: question.score.toString(),
          orderInSlide: question.orderInSlide.toString(),
          docFileId: question.docFileId,
        }
      : {
          questionType: "",
          responseType: "TEXT",
          questionTitle: "",
          content: "",
          timeResponse: "0",
          score: "0",
          orderInSlide: order.toString(),
          docFileId: docFileId,
        },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const questionBody: CreateQuestionData = {
      questionType: values.questionType,
      responseType: values.responseType,
      questionTitle: values.questionTitle,
      content: values.content,
      timeResponse: parseInt(values.timeResponse),
      score: parseInt(values.score),
      orderInSlide: parseInt(values.orderInSlide),
      docFileId: values.docFileId,
    };
    {
      !question
        ? createQuestion(questionBody, {
            onSuccess: (data) => {
              const questionId = data.data.id;
              choices.forEach((choice) => {
                createChoice({
                  content: choice,
                  isCorrectAnswer: choice === correct,
                  questionId: questionId,
                });
              });
            },
          })
        : updateQuestion(questionBody, {
            onSuccess: (data) => {
              const questionId = data.data.id;
              const existingChoiceIds = question?.options?.map(
                (option) => option.id
              );
              choices.forEach((choice, index) => {
                updateChoice({
                  choiceId: existingChoiceIds[index],
                  data: {
                    content: choice,
                    isCorrectAnswer: choice === correct,
                    questionId: questionId,
                  },
                });
              });
            },
          });
    }
  }

  const handleAddChoice = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setChoices([...choices, ""]);
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const handleDelete = (
    index: number,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    event?.preventDefault();
    setChoices((prevChoices) => prevChoices.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="questionTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Title" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter the content" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex w-full justify-between">
            <FormField
              control={form.control}
              name="timeResponse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time to Response (s)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0" type="number" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Score</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0" type="number" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="questionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      form.setValue("questionType", value);
                      setQuestionType(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CHOICE">Multiple choice</SelectItem>
                      <SelectItem value="TEXT">Essay</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {questionType === "TEXT" && (
            <FormField
              control={form.control}
              name="responseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Response Type</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        form.setValue("responseType", value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a response type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TEXT">Text</SelectItem>
                        <SelectItem value="IMAGE">Image</SelectItem>
                        <SelectItem value="DRAW">Draw</SelectItem>
                        <SelectItem value="FILE">File</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {questionType === "CHOICE" && (
            <div className="flex-row space-y-4 space-x-4">
              <FormLabel>Choices</FormLabel>
              {choices?.map((choice, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={choice}
                    placeholder={`Choice ${index + 1}`}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                  />
                  <Checkbox
                    id={choice}
                    checked={choice === correct}
                    onClick={() => setCorrect(choice)}
                  />
                  <Button
                    variant="ghost"
                    onClick={(e) => handleDelete(index, e)}
                  >
                    <Delete />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={handleAddChoice}>
                <PlusCircle className="mr-2" />
                Add Choice
              </Button>
            </div>
          )}
          <Button type="submit">{question ? "Update" : "Create"}</Button>
        </form>
      </Form>
    </div>
  );
}
