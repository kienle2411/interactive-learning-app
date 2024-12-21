// "use client";
// import React, { useState } from 'react';
// import { usePathname } from 'next/navigation';

// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Label } from '@radix-ui/react-label';
// import { Input } from '@/components/ui/input';



// export default function InvoiceTable() {
//     const [open, setOpen] = useState(false);

//     const pathname = usePathname();
//     const id = pathname.split('/')[2]; // Assuming productId is always at the 3rd position
//     const [student, setStudent] = useState("");
//     const [students, setStudents] = useState<
//         { id: string; student: string; group: string; score: string }[]
//     >([
//         {
//             id: "1",
//             student: "Math Class",
//             group: 30,
//             score: "MATH101",
//         },
//         {
//             id: "2",
//             student: "English Class",
//             group: 45,
//             score: "ENG1234",
//         },
//     ]);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const newStudent = {
//             id: Math.random().toString(36).substr(2, 5), // Generate unique ID
//             student: student,
//             group: 0,
//             score: `CLASS${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
//         };
//         setStudents([...students, newStudent]);
//         setStudent("");
//         setOpen(false);
//     };

//     return (
//         <>
//             <div className="col-span-2 flex justify-end pb-4 w-full">
//                 <Dialog open={open} onOpenChange={setOpen}>
//                     <DialogTrigger asChild>
//                         <Button variant="default">Add new Student</Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                             <DialogTitle>Add new Student</DialogTitle>
//                         </DialogHeader>
//                         <form onSubmit={handleSubmit}>
//                             <div className="grid gap-4 py-4">
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="studentEmail">Email</Label>
//                                     <Input
//                                         id="studentEmail"
//                                         value={student}
//                                         onChange={(e) => setStudent(e.target.value)}
//                                         placeholder="Enter student's email"
//                                     />
//                                 </div>
//                             </div>
//                             <DialogFooter>
//                                 <Button type="submit">Create</Button>
//                             </DialogFooter>
//                         </form>
//                     </DialogContent>
//                 </Dialog>
//             </div>

//             <Table>
//                 <TableCaption>There are {7} students in {id} class</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>No.</TableHead>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Group</TableHead>
//                         <TableHead>Score</TableHead>
//                         <TableHead>Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {students.map((std) => (
//                         <TableRow key={std.id}>
//                             <TableCell className="font-medium">{std.id}</TableCell>
//                             <TableCell>{std.student}</TableCell>
//                             <TableCell>{std.group}</TableCell>
//                             <TableCell >{std.score}</TableCell>
//                             <TableCell></TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </>

//     )
// }



"use client";
import React, { useState } from 'react';
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

export default function InvoiceTable() {
    const [open, setOpen] = useState(false);
    const [editGroupOpen, setEditGroupOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<{ id: string; student: string; group: string; score: number } | null>(null);

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

    const pathname = usePathname();
    const id = pathname.split('/')[2]; // Assuming productId is always at the 3rd position
    const [student, setStudent] = useState("");
    const [students, setStudents] = useState<
        { id: string; student: string; group: string; score: number }[]
    >([]);

    const { classroom, isLoading, isError, error, refetch } = useClassById(id as string);


    if (isLoading) {
        // return <div>Loading class details...</div>;
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
        return <div>No class details found.</div>;
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!student.trim()) return; // Prevent adding empty students

        const newStudent = {
            id: (students.length + 1).toString(), // Sequential ID
            student: student,
            group: "null",
            score: 0,
        };
        setStudents([...students, newStudent]);
        setStudent("");
        setOpen(false);
    };

    const openEditGroupDialog = (student: { id: string; student: string; group: string; score: number }) => {
        setCurrentStudent(student);
        setEditGroupOpen(true);
    };

    const handleUpdateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentStudent) return;

        setStudents(students.map(std =>
            std.id === currentStudent.id
                ? { ...std, group: currentStudent.group }
                : std
        ));
        setEditGroupOpen(false);
    };

    // const handleDelete = (id: string) => {
    //     setStudents(students.filter(std => std.id !== id));
    // };

    const confirmDelete = (id: string) => {
        setStudentToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const handleDelete = () => {
        if (studentToDelete) {
            setStudents(students.filter(std => std.id !== studentToDelete));
            setDeleteConfirmOpen(false);
            setStudentToDelete(null);
        }
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
                                {/* <Input
                                    id="group"
                                    // type="number"
                                    value={currentStudent?.group || ""}
                                    onChange={(e) =>
                                        setCurrentStudent({
                                            ...currentStudent!,
                                            group: (e.target.value) || "null",
                                        })
                                    }
                                    placeholder="Enter new group"
                                    required
                                /> */}
                                <Select
                                    value={currentStudent?.group?.toString() || ""}
                                    onValueChange={(value) =>
                                        setCurrentStudent({
                                            ...currentStudent!,
                                            group: (value),
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Group 1">Group 1</SelectItem>
                                        <SelectItem value="Group 2">Group 2</SelectItem>
                                        <SelectItem value="Group 3">Group 3</SelectItem>
                                        <SelectItem value="Group 4">Group 4</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Update</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

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

            <Table>
                <TableCaption>
                    There are {students.length} students in {classroom.classroomName} class
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
                    {students.map((std) => (
                        <TableRow key={std.id}>
                            <TableCell className="text-center">{std.id}</TableCell>
                            <TableCell className="text-center">{std.student}</TableCell>
                            <TableCell className="text-center">{std.group}</TableCell>
                            <TableCell className="text-center">{std.score}</TableCell>
                            <TableCell className="text-center">
                                <Button className='m-2'
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => openEditGroupDialog(std)}>
                                    Update
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => confirmDelete(std.id)}>
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