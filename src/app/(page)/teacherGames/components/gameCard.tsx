"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Copy, Play } from 'lucide-react'
import React, { useState } from 'react'

interface GamesCardProps {
    id: string; // Unique ID for the class
    nameOfClass: string;
    nameOfQuiz: string;
    questions: number;
    onDelete: (id: string) => void;
}
// {id, nameOfClass, nameOfQuiz, questions}
const GameCard: React.FC<GamesCardProps> = ({ id, nameOfClass, nameOfQuiz, questions, onDelete }) => {
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleDelete = () => {
        onDelete(id); // Gọi hàm onDelete khi xoá
        setDeleteConfirmOpen(false);
    };

    return (
        <>
            {/* Delete Confirmation Alert Dialog */}
            <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Card className="grid grid-cols-2 pl-2 pr-2 justify-around gap-1 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                    <h2 className='font-bold text-lg'>{nameOfQuiz}</h2>
                    <p>There are {questions} questions</p>
                </CardHeader>
                {/* card-content */}
                <CardContent className="pt-2 pb-2 pl-4 flex flex-row items-center justify-between">
                    <h2 className='font-bold text-lg'>{nameOfClass}</h2>
                    <button>
                        <Play color='green' size={28} fill='green' />
                    </button>
                    <div className='flex md:flex-col sm:flex-col lg:flex-row'>
                        <Button className='m-2'
                            variant="secondary"
                            size="sm"
                            onClick={() => window.location.href = `/teacherGames/${id}/updateGames`}>
                            Update
                        </Button>
                        <Button className='m-2'
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteConfirmOpen(true)}>
                            Delete
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>

    )
}

export default GameCard;