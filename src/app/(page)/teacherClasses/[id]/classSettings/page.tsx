import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function ClassSetting() {
    return (
        <div className='w-full flex flex-col p-10 pt-0'>
            <div className='pt-10 pb-4'>
                <h2 className='font-bold text-lg'>Edit Class</h2>
                <p className='pt-2 pb-2'>Change the name of your Class</p>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button style={{ backgroundColor: '#5048E5' }}>Edit Class</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Class</DialogTitle>
                            <DialogDescription>
                                Change the name of your Class
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Class Name
                                </Label>
                                <Input
                                    id="name"
                                    className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <hr></hr>
            <div className='pt-10'>
                <h2 className='font-bold text-lg'>Delete Class</h2>
                <p className='pt-2 pb-2'>Permanently delete this Class</p>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button style={{ backgroundColor: '#DC2828' }}>Delete Class</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>

    )
}
