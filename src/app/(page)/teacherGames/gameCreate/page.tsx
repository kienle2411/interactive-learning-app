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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import QuestionCard, { AnswerProps } from "../components/questionCard";
import { DialogClose } from "@radix-ui/react-dialog";

const Page = () => {
  const [questions, setQuestions] = useState([
    {
      question: "What is React?",
      answers: [
        { text: "Library for building UI", isCorrect: false },
        { text: "Programming language", isCorrect: true },
        { text: "Backend framework", isCorrect: false },
        { text: "Database", isCorrect: false },
      ],
    },
  ]);

  const [currentDate, setCurrentDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answers: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  });

  const updateQuestion = (
    index: number,
    updatedQuestion: { question: string; answers: AnswerProps[] }
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion; // Update the question at index
    setQuestions(updatedQuestions); // Update the state
  };

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const dateString = today.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
      setCurrentDate(dateString);
    };

    updateDate();
    const intervalId = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

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
          <span className="text-3xl font-bold">Create a new Game</span>
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
                <Select required>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">UIT123</SelectItem>
                    <SelectItem value="sveltekit">UIT100</SelectItem>
                    <SelectItem value="astro">ENG143</SelectItem>
                    <SelectItem value="nuxt">JPN312</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date" className="font-semibold">
                  Created Date
                </Label>
                <Input
                  id="date"
                  placeholder="Date"
                  readOnly
                  defaultValue={currentDate}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date" className="font-semibold">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter title"
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date" className="font-semibold">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Enter description"
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              className="ml-4 mr-4"
              onClick={(e) => e.preventDefault()}
            >
              Reset
            </Button>
            <Button className="ml-4" onClick={(e) => e.preventDefault()}>
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

// "use client";
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Textarea } from '@/components/ui/textarea';
// import React, { useEffect, useState } from 'react'
// import QuestionCard, { AnswerProps } from '../components/questionCard';

// const page = () => {
//     const [questions, setQuestions] = useState([
//         {
//             question: "What is React?",
//             answers: [
//                 { text: "Library for building UI", isCorrect: false },
//                 { text: "Programming language", isCorrect: true },
//                 { text: "Backend framework", isCorrect: false },
//                 { text: "Database", isCorrect: false },
//             ],
//         },
//         {
//             question: "What is React?",
//             answers: [
//                 { text: "Library for building UI", isCorrect: false },
//                 { text: "Programming language", isCorrect: true },
//                 { text: "Backend framework", isCorrect: false },
//                 { text: "Database", isCorrect: false },
//             ],
//         },
//         {
//             question: "What is React?",
//             answers: [
//                 { text: "Library for building UI", isCorrect: false },
//                 { text: "Programming language", isCorrect: true },
//                 { text: "Backend framework", isCorrect: false },
//                 { text: "Database", isCorrect: false },
//             ],
//         },
//         // Thêm các câu hỏi khác...
//     ]);

//     const [currentDate, setCurrentDate] = useState('');

//     const updateQuestion = (index: number, updatedQuestion: { question: string; answers: AnswerProps[] }) => {
//         const updatedQuestions = [...questions];
//         updatedQuestions[index] = updatedQuestion; // Cập nhật câu hỏi tại index
//         setQuestions(updatedQuestions); // Cập nhật state
//     };

//     useEffect(() => {
//         const updateDate = () => {
//             const today = new Date();
//             const dateString = today.toLocaleDateString('en-US', {
//                 month: '2-digit',
//                 day: '2-digit',
//                 year: 'numeric'
//             });
//             setCurrentDate(dateString);
//         };

//         updateDate();
//         const intervalId = setInterval(updateDate, 60000); // Cập nhật mỗi phút

//         return () => clearInterval(intervalId);
//     }, []);

//     const handleDeleteQuestion = (index: number) => {
//         const updatedQuestions = questions.filter((_, i) => i !== index);
//         setQuestions(updatedQuestions);
//     };

//     return (
//         <>
//             <div className='w-full p-8'>
//                 <div className="flex flex-col w-full gap-[20px]">
//                     <div className="flex justify-between items-center">
//                         <span className="text-3xl font-bold">Create a new Game</span>
//                     </div>

//                     <Card className=' shadow-md'>
//                         <CardHeader>
//                             <CardTitle className='text-lg'>General Information</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="grid w-full items-center grid-cols-2 gap-10">
//                                 <div className="flex flex-col space-y-1.5">
//                                     <Label htmlFor="framework" className='font-semibold'>Class Name</Label>
//                                     <Select required>
//                                         <SelectTrigger id="framework">
//                                             <SelectValue placeholder="Select" />
//                                         </SelectTrigger>
//                                         <SelectContent position="popper">
//                                             <SelectItem value="next">UIT123</SelectItem>
//                                             <SelectItem value="sveltekit">UIT100</SelectItem>
//                                             <SelectItem value="astro">ENG143</SelectItem>
//                                             <SelectItem value="nuxt">JPN312</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                                 <div className="flex flex-col space-y-1.5">
//                                     <Label htmlFor="date" className='font-semibold'>Created Date</Label>
//                                     <Input id="date" placeholder="Name of your project" readOnly defaultValue={currentDate} />
//                                 </div>
//                             </div>
//                         </CardContent>
//                         <CardFooter className="flex justify-end">
//                             <Button variant="outline" className='ml-4 mr-4' onClick={(e) => (e.preventDefault())} >Reset</Button>
//                             <Button className='ml-4' onClick={(e) => (e.preventDefault())} >Save changes</Button>
//                         </CardFooter>
//                     </Card>

//                     <div className='flex flex-row items-center justify-between w-full mt-8'>
//                         <Label className='font-bold text-2xl'>Questions</Label>
//                         <Dialog>
//                             <DialogTrigger asChild>
//                                 <Button variant="default">Create Question</Button>
//                             </DialogTrigger>
//                             <DialogContent className="sm:max-w-[625px]">
//                                 <DialogHeader>
//                                     <DialogTitle>Question</DialogTitle>
//                                 </DialogHeader>
//                                 <div className="grid gap-5 py-1">
//                                     <div className="grid grid-cols-5 items-center gap-4">
//                                         <Textarea className='col-span-5' placeholder="Type your question here" required />
//                                     </div>
//                                     <RadioGroup
//                                         className="flex flex-col space-y-1">

//                                         <div className="grid grid-cols-5 items-center gap-4">
//                                             <Label htmlFor="username" className="text-center">
//                                                 A.
//                                             </Label>
//                                             <Input
//                                                 id="username"
//                                                 placeholder='enter the answers'
//                                                 className="col-span-3"
//                                                 required />
//                                             <div className='text-center flex justify-center items-center'>
//                                                 <RadioGroupItem value="r1" id="r1" />
//                                             </div>
//                                         </div>

//                                         <div className="grid grid-cols-5 items-center gap-4">
//                                             <Label htmlFor="username" className="text-center">
//                                                 B.
//                                             </Label>
//                                             <Input
//                                                 id="username"
//                                                 placeholder='enter the answers'
//                                                 className="col-span-3"
//                                                 required />
//                                             <div className='text-center flex justify-center items-center'>
//                                                 <RadioGroupItem value="r2" id="r2" />
//                                             </div>
//                                         </div>

//                                         <div className="grid grid-cols-5 items-center gap-4">
//                                             <Label htmlFor="username" className="text-center">
//                                                 C.
//                                             </Label>
//                                             <Input
//                                                 id="username"
//                                                 placeholder='enter the answers'
//                                                 className="col-span-3"
//                                                 required />
//                                             <div className='text-center flex justify-center items-center'>
//                                                 <RadioGroupItem value="r3" id="r3" />
//                                             </div>
//                                         </div>

//                                         <div className="grid grid-cols-5 items-center gap-4">
//                                             <Label htmlFor="username" className="text-center">
//                                                 D.
//                                             </Label>
//                                             <Input
//                                                 id="username"
//                                                 placeholder='enter the answers'
//                                                 className="col-span-3"
//                                                 required />
//                                             <div className='text-center flex justify-center items-center'>
//                                                 <RadioGroupItem value="r4" id="r4" />
//                                             </div>
//                                         </div>
//                                     </RadioGroup>
//                                 </div>
//                                 <DialogFooter>
//                                     <Button type="submit">Add Question</Button>
//                                 </DialogFooter>
//                             </DialogContent>
//                         </Dialog>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//                         {questions.map((q, index) => (
//                             <QuestionCard
//                                 key={index}
//                                 question={q.question}
//                                 answers={q.answers}
//                                 onUpdate={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
//                                 onDelete={() => handleDeleteQuestion(index)}
//                             />
//                         ))}

//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default page

// "use client";
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import React, { useState, useEffect } from 'react';
// import QuestionCard, { AnswerProps } from '../components/questionCard';

// const Page = () => {
//     const [questions, setQuestions] = useState([
//         {
//             question: "What is React?",
//             answers: [
//                 { text: "Library for building UI", isCorrect: false },
//                 { text: "Programming language", isCorrect: true },
//                 { text: "Backend framework", isCorrect: false },
//                 { text: "Database", isCorrect: false },
//             ],
//         },
//     ]);

//     const [currentDate, setCurrentDate] = useState('');

//     const updateQuestion = (index: number, updatedQuestion: { question: string; answers: AnswerProps[] }) => {
//         const updatedQuestions = [...questions];
//         updatedQuestions[index] = updatedQuestion; // Update the question at index
//         setQuestions(updatedQuestions); // Update the state
//     };

//     useEffect(() => {
//         const updateDate = () => {
//             const today = new Date();
//             const dateString = today.toLocaleDateString('en-US', {
//                 month: '2-digit',
//                 day: '2-digit',
//                 year: 'numeric'
//             });
//             setCurrentDate(dateString);
//         };

//         updateDate();
//         const intervalId = setInterval(updateDate, 60000); // Update every minute

//         return () => clearInterval(intervalId);
//     }, []);

//     const handleDeleteQuestion = (index: number) => {
//         const updatedQuestions = questions.filter((_, i) => i !== index);
//         setQuestions(updatedQuestions);
//     };

//     return (
//         <div className='w-full p-8'>
//             <div className="flex flex-col w-full gap-[20px]">
//                 <div className="flex justify-between items-center">
//                     <span className="text-3xl font-bold">Create a new Game</span>
//                 </div>

//                 <Card className=' shadow-md'>
//                     <CardHeader>
//                         <CardTitle className='text-lg'>General Information</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="grid w-full items-center grid-cols-2 gap-10">
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="framework" className='font-semibold'>Class Name</Label>
//                                 <Select required>
//                                     <SelectTrigger id="framework">
//                                         <SelectValue placeholder="Select" />
//                                     </SelectTrigger>
//                                     <SelectContent position="popper">
//                                         <SelectItem value="next">UIT123</SelectItem>
//                                         <SelectItem value="sveltekit">UIT100</SelectItem>
//                                         <SelectItem value="astro">ENG143</SelectItem>
//                                         <SelectItem value="nuxt">JPN312</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="date" className='font-semibold'>Created Date</Label>
//                                 <Input id="date" placeholder="Date" readOnly defaultValue={currentDate} />
//                             </div>
//                         </div>
//                     </CardContent>
//                     <CardFooter className="flex justify-end">
//                         <Button variant="outline" className='ml-4 mr-4' onClick={(e) => e.preventDefault()}>Reset</Button>
//                         <Button className='ml-4' onClick={(e) => e.preventDefault()}>Save changes</Button>
//                     </CardFooter>
//                 </Card>

//                 <div className='flex flex-row items-center justify-between w-full mt-8'>
//                     <Label className='font-bold text-2xl'>Questions</Label>
//                     <Dialog>
//                         <DialogTrigger asChild>
//                             <Button variant="default">Create Question</Button>
//                         </DialogTrigger>
//                         <DialogContent className="sm:max-w-[625px]">
//                             <DialogHeader>
//                                 <DialogTitle>Question</DialogTitle>
//                             </DialogHeader>
//                             <div className="grid gap-5 py-1">
//                                 <div className="grid grid-cols-5 items-center gap-4">
//                                     <Textarea className='col-span-5' placeholder="Type your question here" required />
//                                 </div>
//                                 <RadioGroup className="flex flex-col space-y-1">
//                                     {['A', 'B', 'C', 'D'].map((option, idx) => (
//                                         <div key={idx} className="grid grid-cols-5 items-center gap-4">
//                                             <Label htmlFor={`answer-${option}`} className="text-center">
//                                                 {option}.
//                                             </Label>
//                                             <Input
//                                                 id={`answer-${option}`}
//                                                 placeholder={`Enter answer ${option}`}
//                                                 className="col-span-3"
//                                                 required
//                                             />
//                                             <div className='text-center flex justify-center items-center'>
//                                                 <RadioGroupItem value={`r${idx + 1}`} id={`r${idx + 1}`} />
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </RadioGroup>
//                             </div>
//                             <DialogFooter>
//                                 <Button type="submit">Add Question</Button>
//                             </DialogFooter>
//                         </DialogContent>
//                     </Dialog>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//                     {questions.map((q, index) => (
//                         <QuestionCard
//                             key={index}
//                             question={q.question}
//                             answers={q.answers}
//                             onUpdate={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
//                             onDelete={() => handleDeleteQuestion(index)}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Page;
