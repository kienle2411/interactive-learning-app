import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, EllipsisVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';

export interface AnswerProps {
    text: string;
    isCorrect: boolean;
}

interface QuestionProps {
    question: string;
    answers?: AnswerProps[];
    onUpdate?: (updatedQuestion: { question: string; answers: AnswerProps[] }) => void;
    onDelete?: () => void;
}

const QuestionCard: React.FC<QuestionProps> = ({
    question,
    answers = [],
    onUpdate,
    onDelete
}) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Temporary state for editing that doesn't immediately update the card
    const [tempQuestion, setTempQuestion] = useState(question);
    const [tempAnswers, setTempAnswers] = useState<AnswerProps[]>(
        answers.length > 0
            ? answers
            : Array(4).fill({ text: '', isCorrect: false })
    );
    const [tempCorrectAnswerIndex, setTempCorrectAnswerIndex] = useState(
        answers.findIndex(answer => answer.isCorrect)
    );

    const handleOpenEditDialog = () => {
        // Reset temporary state when opening the dialog
        setTempQuestion(question);
        setTempAnswers(
            answers.length > 0
                ? answers
                : Array(4).fill({ text: '', isCorrect: false })
        );
        setTempCorrectAnswerIndex(
            answers.findIndex(answer => answer.isCorrect)
        );
        setIsEditDialogOpen(true);
    };

    const handleSave = () => {
        const updatedAnswers = tempAnswers.map((answer, index) => ({
            ...answer,
            isCorrect: index === tempCorrectAnswerIndex,
        }));

        if (onUpdate) {
            onUpdate({
                question: tempQuestion,
                answers: updatedAnswers.filter(answer => answer.text.trim() !== ''),
            });
        }

        setIsEditDialogOpen(false);
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
        setIsDeleteDialogOpen(false);
    };

    const updateTempAnswerText = (index: number, text: string) => {
        const newAnswers = [...tempAnswers];
        newAnswers[index] = { ...newAnswers[index], text };
        setTempAnswers(newAnswers);
    };

    const colors = ['#E03D50', '#EA9325', '#0F998C', '#306BDE'];

    return (
        <>
            {/* Hiển thị thẻ câu hỏi */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">{question}</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button>
                                <EllipsisVertical />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onSelect={handleOpenEditDialog}>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center grid-cols-2 gap-5">
                        {answers.map((answer, index) => (
                            <div
                                key={index}
                                className={`flex flex-row items-center justify-between p-4 rounded ${index % 2 === 0 ? 'mr-1' : 'ml-1'}`}
                                style={{
                                    backgroundColor: colors[index % colors.length],
                                }}
                            >
                                <Label htmlFor={`answer-${index}`} className="text-white text-base font-semibold">
                                    {String.fromCharCode(65 + index)}. <span className="font-normal">{answer.text}</span>
                                </Label>
                                {answer.isCorrect && (
                                    <div>
                                        <Check className="font-bold" style={{ backgroundColor: '#ffffff', color: 'green' }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Hộp thoại chỉnh sửa */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Edit Question</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Textarea
                                id="question"
                                value={tempQuestion}
                                onChange={(e) => setTempQuestion(e.target.value)}
                                className="col-span-4"
                            />
                        </div>
                        <RadioGroup
                            value={tempCorrectAnswerIndex.toString()}
                            onValueChange={(value) => setTempCorrectAnswerIndex(Number(value))}
                        >
                            {tempAnswers.map((answer, index) => (
                                <div key={index} className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={`answer-${index}`} className="text-right">
                                        Answer {String.fromCharCode(65 + index)}
                                    </Label>
                                    <Input
                                        id={`answer-${index}`}
                                        value={answer.text}
                                        onChange={(e) => updateTempAnswerText(index, e.target.value)}
                                        className="col-span-2"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={index.toString()} id={`correct-${index}`} />
                                    </div>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Hộp thoại xác nhận xóa */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the question.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default QuestionCard;