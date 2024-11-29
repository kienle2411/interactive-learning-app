"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

export interface AnswerProps {
    text: string;
    isCorrect: boolean;
}

interface QuestionCardProps {
    question: string;
    answers?: AnswerProps[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    answers = []
}) => {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

    const colors = [
        { base: '#E03D50', hover: '#B02C3D' },
        { base: '#EA9325', hover: '#C87519' },
        { base: '#0F998C', hover: '#0A6E65' },
        { base: '#306BDE', hover: '#1F4BA2' }
    ];

    const handleAnswerSelect = (index: number) => {
        setSelectedAnswerIndex(index);
    };

    return (
        <div className='w-full flex items-center align-middle justify-center'>
            <Card className="border-none border-white p-4">
                <CardHeader>
                    <CardTitle className="text-lg pb-4">{question}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center grid-cols-1 gap-5">
                        {answers.length > 0 ? (
                            answers.map((answer, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleAnswerSelect(index)}
                                    className={`flex flex-row items-center justify-between p-4 rounded cursor-pointer transition-all duration-300`}
                                    style={{
                                        backgroundColor: selectedAnswerIndex === index
                                            ? colors[index % colors.length].hover
                                            : colors[index % colors.length].base,
                                    }}
                                >
                                    <Label
                                        htmlFor={`answer-${index}`}
                                        className="text-white text-base font-semibold cursor-pointer"
                                    >
                                        {String.fromCharCode(65 + index)}. <span className="font-normal">{answer.text}</span>
                                    </Label>
                                    {answer.isCorrect && selectedAnswerIndex === index && (
                                        <div>
                                            <Check
                                                className="font-bold"
                                                style={{ backgroundColor: '#ffffff', color: 'green' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center text-gray-500">
                                No answers available
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuestionCard;