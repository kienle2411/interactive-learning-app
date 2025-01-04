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

const Page = () => {
  const params = useParams();
  const id = params?.id as string;

  const { classes, loading: loadingClasses } = useTeacherClasses();

  const { useGetAssignmentById, useUpdateAssignment } = useTeacherAssignment();
  const { mutate: updateAssignment } = useUpdateAssignment();
  const { data: assignmentt, isLoading, isError } = useGetAssignmentById(id);

  const enrichedAssignment = useMemo(() => {
    if (!assignmentt || !classes) return null;


    const clsId = assignmentt.classroomId;
    const classrooms = classes.find((cls) => cls.id === clsId);
    const classNames = classrooms?.classroomName || "";
    let className = Array.isArray(classNames) ? classNames.join("") : classNames;
    if (!className) className = "-";
    return {
      ...assignmentt,
      className,
    };
  }, [assignmentt, classes]);

  console.log("[id]/updateGames enrichedAssignment: ", enrichedAssignment);

  const [questions, setQuestions] = useState([
    {
      question: "What is React?",
      answers: [
        { text: "Library for building UI", isCorrect: true },
        { text: "Programming language", isCorrect: false },
        { text: "Backend framework", isCorrect: false },
        { text: "Database", isCorrect: false },
      ],
    },
  ]);

  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    classRoom: "",
    createdDate: "",
  })

  useEffect(() => {
    if (enrichedAssignment) {
      const createdDate = new Date(enrichedAssignment.createdAt);
      const day = String(createdDate.getDate()).padStart(2, "0");
      const month = String(createdDate.getMonth() + 1).padStart(2, "0");
      const year = createdDate.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      setAssignment({
        title: enrichedAssignment.title,
        description: enrichedAssignment.description,
        classRoom: enrichedAssignment.className,
        createdDate: formattedDate,
      });
    }
  }, [enrichedAssignment]);

  const handleReset = () => {
    if (enrichedAssignment) {
      const createdDate = new Date(enrichedAssignment.createdAt);
      const day = String(createdDate.getDate()).padStart(2, "0");
      const month = String(createdDate.getMonth() + 1).padStart(2, "0");
      const year = createdDate.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      console.log(enrichedAssignment);

      setAssignment({
        title: enrichedAssignment.title,
        description: enrichedAssignment.description,
        classRoom: enrichedAssignment.className,
        createdDate: formattedDate,
      });
    }
  };

  const handleUpdate = async () => {
    const updateData = {
      title: assignment.title,
      description: assignment.description,
    };
    updateAssignment(
      { id: id, body: updateData },
      {
        onSuccess: () => {
          toast({
            title: "Assignment updated Successfully",
            variant: 'success'
          })
        }
      }
    );
  }

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answers: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  });

  if (loadingClasses || isLoading) {
    return <ThreeDotsWave />;
  }

  if (!classes || classes.length === 0 || isError) {
    <div>No assignment available</div>
  }

  const updateQuestion = (
    index: number,
    updatedQuestion: { question: string; answers: AnswerProps[] }
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion; // Update the question at index
    setQuestions(updatedQuestions); // Update the state
  };


  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      question: "",
      answers: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ], // Reset after adding the question
    });
  };

  return (
    <div className="w-full p-8">
      <div className="flex flex-col w-full gap-[20px]">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold">Update a Game</span>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">General Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center grid-cols-2 gap-10">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework" className="font-semibold">
                  Class Name
                </Label>
                <Input
                  id="class-name"
                  placeholder="ClassName"
                  readOnly
                  value={assignment.classRoom}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date" className="font-semibold">
                  Created Date
                </Label>
                <Input
                  id="date"
                  placeholder="Date"
                  readOnly
                  defaultValue={assignment.createdDate}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date" className="font-semibold">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter title"
                  value={assignment.title}
                  onChange={(e) => {
                    setAssignment((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date" className="font-semibold">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Enter description"
                  value={assignment.description}
                  onChange={(e) => {
                    setAssignment((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              className="ml-4 mr-4"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button className="ml-4" onClick={handleUpdate}>
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
                <DialogTitle>Question</DialogTitle>
              </DialogHeader>
              <div className="grid gap-5 py-1">
                <div className="grid grid-cols-5 items-center gap-4">
                  <Textarea
                    className="col-span-5"
                    placeholder="Type your question here"
                    value={newQuestion.question}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        question: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <RadioGroup
                  value={newQuestion.answers
                    .findIndex((ans) => ans.isCorrect)
                    .toString()}
                  onValueChange={(value) => {
                    const selectedIndex = parseInt(value);
                    const updatedAnswers = newQuestion.answers.map(
                      (answer, index) => ({
                        ...answer,
                        isCorrect: index === selectedIndex,
                      })
                    );
                    setNewQuestion({ ...newQuestion, answers: updatedAnswers });
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
                          updatedAnswers[idx].text = e.target.value;
                          setNewQuestion({
                            ...newQuestion,
                            answers: updatedAnswers,
                          });
                        }}
                        className="col-span-3"
                        required
                      />
                      <div className="text-center flex justify-center items-center">
                        <RadioGroupItem
                          value={idx.toString()}
                          id={`r${idx + 1}`}
                        />
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" onClick={handleAddQuestion}>
                    Add Question
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {questions.map((q, index) => (
            <QuestionCard
              key={index}
              question={q.question}
              answers={q.answers}
              onUpdate={(updatedQuestion) =>
                updateQuestion(index, updatedQuestion)
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
