"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { fetchTeacherClasses, updateClass } from '@/api/endpoints/teacherClasses';
import { useTeacherClasses } from "@/hooks/useTeacherClasses";
import { useRouter } from "next/navigation";


export default function ClassSetting() {
    const [className, setClassName] = React.useState("");
    const [classDescription, setClassDescription] = React.useState("");
    const [capacity, setCapacity] = React.useState<number>(0);
    const [classroomCode, setClassroomCode] = React.useState("");

    const pathname = usePathname();
    const id = pathname.split('/')[2];

    const { deleteClassroom } = useTeacherClasses();

    const router = useRouter();

    // Load thông tin lớp học khi mở trang
    useEffect(() => {
        const loadClassDetails = async () => {
            try {
                const response = await fetchTeacherClasses();
                const classDetails = response.data?.data.find((cls) => cls.id === id);
                if (classDetails) {
                    setClassName(classDetails.classroomName);
                    setClassDescription(classDetails.description);
                    setCapacity(classDetails.capacity);
                    setClassroomCode(classDetails.classroomCode);
                }
            } catch (error) {
                console.error("Error loading class details:", error);
            }
        };
        loadClassDetails();
    }, [id]);


    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateClass(id, { classroomName: className, description: classDescription, capacity, classroomCode });
            alert("Class updated successfully!");
        } catch (error) {
            console.error("Error updating class:", error);
            alert("Failed to update class.");
        }
    }


    const handleDeleteClassroom = async () => {
        try {
            await deleteClassroom(id);
            router.push(`/teacherClasses`);

        } catch (err) {
            console.error("Error deleting class:", err);
        }
    };

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
                        <form onSubmit={handleEditSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-4">
                                    <Label htmlFor="name" className="text-left">
                                        Class Name
                                    </Label>
                                    <Input
                                        id="name"
                                        required
                                        value={className}
                                        onChange={(e) => setClassName(e.target.value)}
                                        placeholder="Enter class name"
                                    />
                                </div>
                                <div className="grid gap-4">
                                    <Label htmlFor="description" className="text-left">
                                        Class Description
                                    </Label>
                                    <Input
                                        id="description"
                                        value={classDescription}
                                        onChange={(e) => setClassDescription(e.target.value)}
                                        placeholder="Enter class description (Optional)"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
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
                            <AlertDialogAction onClick={handleDeleteClassroom}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>

    )
}
