"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useMemo, useEffect } from "react";
import { useTeacherClasses } from "@/hooks/useTeacherClasses";
import useTeacherAssignment from "@/hooks/useTeacherAsssignment";
import { DialogClose } from "@radix-ui/react-dialog";
import QuestionCard, { AnswerProps } from "../../components/questionCard";
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import { useParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import useTeacherQuestion from "@/hooks/useTeacherQuestion";
import { Question } from "@/types/question-response-teacher";
import { QuestionWithChoices } from "@/types/choice-response-teacher";
import teacherQuestion from "@/api/endpoints/teacherQuestion";

interface QuestionState {
  id?: string;
  question: string;
  answers: AnswerProps[];
}

interface AssignmentState {
  title: string;
  description: string;
  classRoom: string;
  createdDate: string;
}

const Page = () => {
  const params = useParams();
  const id = params?.id as string;

  // Hooks for data fetching
  const { classes, loading: loadingClasses } = useTeacherClasses();
  const { useGetAssignmentById, useUpdateAssignment } = useTeacherAssignment();
  const { mutate: updateAssignment } = useUpdateAssignment();
  const { data: assignmentData, isLoading: loadingAssignment, isError: assignmentError } = useGetAssignmentById(id);
  const { useListQuestionById, useUpdateQuestion } = useTeacherQuestion();
  const { data: questionsList, isLoading: loadingQuestions } = useListQuestionById(id);
  const { mutate: updateQuestion } = useUpdateQuestion();

  // State management
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [assignment, setAssignment] = useState<AssignmentState>({
    title: "",
    description: "",
    classRoom: "",
    createdDate: "",
  });

  const [newQuestion, setNewQuestion] = useState<QuestionState>({
    question: "",
    answers: Array(4).fill({ text: "", isCorrect: false }),
  });

  // Process assignment data
  const enrichedAssignment = useMemo(() => {
    if (!assignmentData || !classes?.length) return null;

    const classroom = classes.find((cls) => cls.id === assignmentData.classroomId);
    const classroomName = classroom?.classroomName || "-";

    return {
      ...assignmentData,
      className: Array.isArray(classroomName) ? classroomName.join("") : classroomName,
    };
  }, [assignmentData, classes]);

  // Fetch question details
  useEffect(() => {
    const fetchQuestionDetails = async () => {
      if (!questionsList?.length) return;

      try {
        const detailedQuestions = await Promise.all(
          questionsList.map(async (question: Question) => {
            try {
              const questionDetail = await teacherQuestion.detail(question.id);
              return formatQuestionDetail(questionDetail);
            } catch (error) {
              console.error(`Error fetching question ${question.id}:`, error);
              return null;
            }
          })
        );

        const validQuestions = detailedQuestions.filter((q): q is QuestionState => q !== null);
        setQuestions(validQuestions);
      } catch (error) {
        console.error("Error fetching question details:", error);
        toast({
          title: "Error loading questions",
          variant: "destructive"
        });
      }
    };

    fetchQuestionDetails();
  }, [questionsList]);

  // Update assignment data when available
  useEffect(() => {
    if (enrichedAssignment) {
      const createdDate = new Date(enrichedAssignment.createdAt);
      const formattedDate = formatDate(createdDate);

      setAssignment({
        title: enrichedAssignment.title,
        description: enrichedAssignment.description,
        classRoom: enrichedAssignment.className,
        createdDate: formattedDate,
      });
    }
  }, [enrichedAssignment]);

  // Helper functions
  const formatDate = (date: Date): string => {
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const formatQuestionDetail = (detail: QuestionWithChoices): QuestionState => {
    return {
      id: detail.id,
      question: detail.content || detail.questionTitle,
      answers: detail.options?.map(choice => ({
        text: choice.content,
        isCorrect: choice.isCorrectAnswer
      })) || []
    };
  };

  const validateNewQuestion = (): boolean => {
    if (!newQuestion.question.trim()) {
      toast({
        title: "Question text is required",
        variant: "destructive"
      });
      return false;
    }

    if (newQuestion.answers.some(answer => !answer.text.trim())) {
      toast({
        title: "All answer options must be filled",
        variant: "destructive"
      });
      return false;
    }

    if (!newQuestion.answers.some(answer => answer.isCorrect)) {
      toast({
        title: "Please select a correct answer",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  // Event handlers
  const handleReset = () => {
    if (enrichedAssignment) {
      const createdDate = new Date(enrichedAssignment.createdAt);
      setAssignment({
        title: enrichedAssignment.title,
        description: enrichedAssignment.description,
        classRoom: enrichedAssignment.className,
        createdDate: formatDate(createdDate),
      });
    }
  };

  const handleUpdate = async () => {
    updateAssignment(
      {
        id,
        body: {
          title: assignment.title,
          description: assignment.description,
        }
      },
      {
        onSuccess: () => {
          toast({
            title: "Assignment updated successfully",
            variant: "success"
          });
        },
        onError: () => {
          toast({
            title: "Failed to update assignment",
            variant: "destructive"
          });
        }
      }
    );
  };


  const handleUpdateQuestion = (
    index: number,
    updatedQuestion: Omit<QuestionState, 'id'>
  ) => {
    const questionId = questions[index].id;
    if (!questionId) {
      toast({
        title: "Cannot update question - ID not found",
        variant: "destructive"
      });
      return;
    }

    // Update the question title in the backend
    updateQuestion(
      {
        id: questionId,
        questionTitle: updatedQuestion.question,
      },
      {
        onSuccess: () => {
          // Update local state
          const updatedQuestions = [...questions];
          updatedQuestions[index] = {
            ...updatedQuestion,
            id: questionId
          };
          setQuestions(updatedQuestions);

          toast({
            title: "Question updated successfully",
            variant: "success"
          });
        },
        onError: () => {
          toast({
            title: "Failed to update question",
            variant: "destructive"
          });
        }
      }
    );
  };


  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleAddQuestion = () => {
    if (!validateNewQuestion()) return;

    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      question: "",
      answers: Array(4).fill({ text: "", isCorrect: false }),
    });
  };

  // Loading and error states
  if (loadingClasses || loadingAssignment || loadingQuestions) {
    return <ThreeDotsWave />;
  }

  if (assignmentError || !classes?.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-600">No assignment available</p>
      </div>
    );
  }

  return (
    <div className="w-full p-8">
      <div className="flex flex-col w-full gap-[20px]">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold">Update Assignment</span>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">General Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center grid-cols-2 gap-10">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="class-name" className="font-semibold">
                  Class Name
                </Label>
                <Input
                  id="class-name"
                  placeholder="Class Name"
                  readOnly
                  value={assignment.classRoom}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="created-date" className="font-semibold">
                  Created Date
                </Label>
                <Input
                  id="created-date"
                  placeholder="Date"
                  readOnly
                  value={assignment.createdDate}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title" className="font-semibold">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter title"
                  value={assignment.title}
                  onChange={(e) => setAssignment(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description" className="font-semibold">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Enter description"
                  value={assignment.description}
                  onChange={(e) => setAssignment(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              className="mx-4"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button onClick={handleUpdate}>
              Save changes
            </Button>
          </CardFooter>
        </Card>

        <div className="flex flex-row items-center justify-between w-full mt-8">
          <Label className="font-bold text-2xl">Questions</Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Create Question</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add New Question</DialogTitle>
              </DialogHeader>
              <div className="grid gap-5 py-1">
                <div className="grid grid-cols-5 items-center gap-4">
                  <Textarea
                    className="col-span-5"
                    placeholder="Type your question here"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion(prev => ({
                      ...prev,
                      question: e.target.value
                    }))}
                  />
                </div>
                <RadioGroup
                  value={String(newQuestion.answers.findIndex(ans => ans.isCorrect))}
                  onValueChange={(value) => {
                    const selectedIndex = parseInt(value);
                    setNewQuestion(prev => ({
                      ...prev,
                      answers: prev.answers.map((answer, index) => ({
                        ...answer,
                        isCorrect: index === selectedIndex
                      }))
                    }));
                  }}
                  className="flex flex-col space-y-1"
                >
                  {["A", "B", "C", "D"].map((option, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-5 items-center gap-4"
                    >
                      <Label
                        htmlFor={`answer-${option}`}
                        className="text-center"
                      >
                        {option}.
                      </Label>
                      <Input
                        id={`answer-${option}`}
                        placeholder={`Enter answer ${option}`}
                        value={newQuestion.answers[idx].text}
                        onChange={(e) => {
                          const updatedAnswers = [...newQuestion.answers];
                          updatedAnswers[idx] = {
                            ...updatedAnswers[idx],
                            text: e.target.value
                          };
                          setNewQuestion(prev => ({
                            ...prev,
                            answers: updatedAnswers
                          }));
                        }}
                        className="col-span-3"
                      />
                      <div className="text-center flex justify-center items-center">
                        <RadioGroupItem
                          value={String(idx)}
                          id={`r${idx + 1}`}
                        />
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleAddQuestion}>
                    Add Question
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {questions.map((q, index) => (
            <QuestionCard
              key={q.id || index}
              question={q.question}
              answers={q.answers}
              onUpdate={(updatedQuestion) =>
                handleUpdateQuestion(index, updatedQuestion)
              }
              onDelete={() => handleDeleteQuestion(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;