"use client";
import React, { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClassById } from '@/hooks/useTeacherClasses';
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import { useAddStudentToClassroom, useDeleteStudentFromClassroom, useStudentsInClass, useUpdateInGroup } from '@/hooks/useStudentClass';
import { useTeacherGroup } from '@/hooks/useTeacherGroup';
import { Student } from '@/types/studentClass-response';

export default function TeacherBoard() {
    const [open, setOpen] = useState(false);
    const [editGroupOpen, setEditGroupOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState<string | null>(null);


    const pathname = usePathname();
    const id = pathname.split('/')[2];
    const [student, setStudent] = useState("");

    const { data: students, isLoading: studentIsLoading } = useStudentsInClass(id);
    const { groups } = useTeacherGroup(id);
    const { mutate: deleteStudent } = useDeleteStudentFromClassroom(id);
    const { mutate: updateGroup } = useUpdateInGroup(id);


    const enrichedStudents = useMemo(() => {
        if (!students || !groups) return [];

        return students.map((student) => {
            const groupNames = student.student.groups.map((grp) => {
                const grpId = grp.groupId;
                return groups.find((group) => group.id === grpId && grp.classroomId === id)?.groupName || "";
            });

            let groupName = groupNames.join("");
            if (groupName === "")
                groupName = "-";

            return {
                ...student,
                groupName,
            };
        });
    }, [students, groups, id]);


    const { classroom, isLoading, isError, error, refetch } = useClassById(id as string);

    const { mutate } = useAddStudentToClassroom(id);

    if (isLoading) {
        return <ThreeDotsWave />;
    }

    if (isError) {
        return (
            <div>
                <p>Error loading class details: {error?.message || "Unknown error"}</p>
                <button onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    if (!classroom) {
        <div>No class details found.</div>;
    }

    if (studentIsLoading) {
        return <ThreeDotsWave />;
    }

    if (!students) {
        <div>No class details found.</div>;
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!student.trim()) return; // Prevent adding empty studentsW

        try {
            await mutate({ email: student });
            setStudent("");
            setOpen(false);
        } catch (error) {
            console.error("Error adding student: ", error);
        }
    };

    const handleUpdateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentStudent?.groups?.[0]) return;

        const updatedGroupId = currentStudent.groups[0].groupId;
        console.log("updateGroupId: ", updatedGroupId);
        console.log("studentId: ", currentStudent.id);
        try {
            await updateGroup({
                studentId: currentStudent.id, // ID của học sinh cần cập nhật
                groupId: updatedGroupId,            // groupId mới
            });
            setEditGroupOpen(false); // Đóng dialog
            setCurrentStudent(null); // Reset current student
        } catch (error) {
            console.error("Error updating group:", error); // Xử lý lỗi
        }
    };

    const openEditGroupDialog = (student: Student) => {
        setCurrentStudent(student);
        setEditGroupOpen(true);  // Mở popup cập nhật
    };

    const handleDelete = () => {
        if (studentToDelete) {
            deleteStudent({ studentId: studentToDelete });

            console.log("Heh I deleted ", studentToDelete);
            setDeleteConfirmOpen(false);
            setStudentToDelete(null);
        }
    };

    const confirmDelete = (studentId: string) => {
        setStudentToDelete(studentId);
        setDeleteConfirmOpen(true);
    };



    return (
        <>
            <div className="col-span-2 flex justify-end pb-4 w-full">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">Add new Student</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add new Student</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="studentEmail">Email</Label>
                                    <Input
                                        id="studentEmail"
                                        value={student}
                                        onChange={(e) => setStudent(e.target.value)}
                                        placeholder="Enter student's email"
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* edit dialog  */}
            <Dialog open={editGroupOpen} onOpenChange={setEditGroupOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Group</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateGroup}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="group">Group</Label>
                                <Label htmlFor="group-title" className="text-red-600 text-sm italic font-semibold">Please acknowledge that you can only choose the group once</Label>
                                <Select
                                    value={currentStudent?.groups[0]?.groupId.toString() || ""}
                                    onValueChange={(value) => {
                                        if (currentStudent && currentStudent.groups?.[0]) {
                                            setCurrentStudent({
                                                ...currentStudent,
                                                groups: [{
                                                    ...currentStudent.groups[0],
                                                    groupId: value
                                                }]
                                            });
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {groups?.map((grp) => (
                                            <SelectItem key={grp.id} value={grp.id}>
                                                {grp.groupName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Update</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >

            {/* Delete Confirmation Alert Dialog */}
            < AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen} >
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
            </ AlertDialog>

            <Table>
                <TableCaption>
                    {/* There are {students!.length} students in {classroom.classroomName} class */}
                </TableCaption>
                <TableHeader className='bg-slate-200 text-lg'>
                    <TableRow>
                        <TableHead className="text-center font-bold text-black">No.</TableHead>
                        <TableHead className="text-center font-bold text-black">Name</TableHead>
                        <TableHead className="text-center font-bold text-black">Group</TableHead>
                        <TableHead className="text-center font-bold text-black">Score</TableHead>
                        <TableHead className="text-center font-bold text-black">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='text-base'>
                    {enrichedStudents?.map((std, index: number) => (
                        <TableRow key={std.student.user.id}>
                            <TableCell className="text-center">{index + 1}</TableCell>
                            <TableCell className="text-center">{std.student.user.username}</TableCell>
                            <TableCell className="text-center">{std.groupName}</TableCell>
                            <TableCell className="text-center">{std.totalScore}</TableCell>
                            <TableCell className="text-center">
                                <Button className='m-2'
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => openEditGroupDialog(std.student)}
                                    disabled={std.groupName !== "-" ? true : false}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => confirmDelete(std.student.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}


