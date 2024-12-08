"use client";
import React, { useState } from 'react'
import QuestionCard from '../components/questionCards'



export default function page() {
    const [quest, setQuest] = useState(
        {
            question: "What is the capital of France?",
            answers: [
                { text: "London", isCorrect: false },
                { text: "Paris", isCorrect: true },
                { text: "Berlin", isCorrect: false },
                { text: "Madrid", isCorrect: false }
            ]
        });
    // const [quest, setQuest] = useState('');

    return (
        <div className="space-y-4 w-full p-4">
            {/* <QuestionCard
                question="What is the capital of France?"
                answers={[
                    { text: "London", isCorrect: false },
                    { text: "Paris", isCorrect: true },
                    { text: "Berlin", isCorrect: false },
                    { text: "Madrid", isCorrect: false }
                ]}
            /> */}
            <QuestionCard question={quest.question}
                answers={quest.answers} />
        </div>
    )
}
