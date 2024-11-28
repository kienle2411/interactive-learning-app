"use client";
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Link from 'next/link'
import React, { useState } from 'react'
import GameCard from './components/gameCard';

export default function page() {

    // {id, nameOfClass, nameOfQuiz, questions}
    const [quizzes, setQuizzes] = useState
        <
            { id: string, nameOfClass: string, nameOfQuiz: string, questions: number }[]
        >
        ([
            {
                id: "1",
                nameOfClass: "UIT123",
                nameOfQuiz: "Quiz1",
                questions: 17,
            },
            {
                id: "2",
                nameOfClass: "UIT123",
                nameOfQuiz: "Quiz2",
                questions: 10,
            },
            {
                id: "3",
                nameOfClass: "ENG100",
                nameOfQuiz: "Quiz14",
                questions: 30,
            },
        ]);

    // Hàm xử lý khi xoá
    const handleDeleteGame = (id: string) => {
        setQuizzes((prevGames) => prevGames.filter((game) => game.id !== id));
    };


    return (
        <div className="flex flex-col p-[24px] w-full">
            <div className="flex flex-col w-full gap-[20px]">
                <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">Games</span>
                </div>
                <div className="col-span-2 flex justify-end pb-4 w-full">
                    <Button onClick={() => { window.location.href = ("/teacherGames/gameCreate"); }}>Create Game</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* <GameCard id='123' nameOfClass='UIT123' nameOfQuiz='Quiz1' questions={17} /> */}
                    {quizzes.map((quiz) => (
                        <GameCard
                            key={quiz.id}
                            id={quiz.id}
                            nameOfClass={quiz.nameOfClass}
                            nameOfQuiz={quiz.nameOfQuiz}
                            questions={quiz.questions}
                            onDelete={handleDeleteGame} // Truyền hàm xoá vào component
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
