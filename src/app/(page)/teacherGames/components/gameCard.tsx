"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Play } from 'lucide-react'
import React, { useState } from 'react'
import QRCode from 'qrcode';

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
    const [randomCode, setRandomCode] = useState<string>('');

    //qr code
    const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

    const handlePlay = async () => {
        try {
            //create random code
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            const code = (array[0] % 900000 + 100000).toString();
            setRandomCode(code);
            //create random code ends

            const dataUrl = await QRCode.toDataURL(code.toString());
            setQrCodeImage(dataUrl);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };
    //qr code ends




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
                    <h2 className='font-bold text-base'>{nameOfClass}</h2>
                    {/*  */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <button onClick={() => handlePlay()}>
                                <Play color='green' size={28} fill='green' />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Let's start the Game!</DialogTitle>
                                <DialogDescription>
                                    Please enter or scan this code
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center space-x-2 ">
                                <div className="grid flex-1 gap-2 w-full text-center pb-4">
                                    <Label className='text-5xl font-semibold'>{randomCode}</Label>
                                </div>
                                {qrCodeImage && (
                                    <img
                                        src={qrCodeImage}
                                        alt="QR Code"
                                        className="max-w-[200px] mx-auto" />)}
                            </div>
                            <DialogFooter className="sm:justify-end">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button type="button" variant="default">
                                    Start
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    {/*  */}

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