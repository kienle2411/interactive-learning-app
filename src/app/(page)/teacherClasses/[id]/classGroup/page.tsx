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
import { useClassById } from '@/hooks/useTeacherClasses';
import ThreeDotsWave from "@/components/ui/three-dot-wave";

export default function GroupTable() {
    const [open, setOpen] = useState(false);
    const [editGroupOpen, setEditGroupOpen] = useState(false);
    const [currentGroup, setCurrentGroup] = useState<{ id: string; group: string; score: number } | null>(null);

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

    const pathname = usePathname();
    const id = pathname.split('/')[2]; // Assuming productId is always at the 3rd position
    const [group, setGroup] = useState("");
    const [groups, setGroups] = useState<
        { id: string; group: string; score: number }[]
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
        if (!group.trim()) return; // Prevent adding empty groups

        const newStudent = {
            id: (groups.length + 1).toString(), // Sequential ID
            group: group,
            score: 0,
        };
        setGroups([...groups, newStudent]);
        setGroup("");
        setOpen(false);
    };

    const openEditGroupDialog = (student: { id: string; group: string; score: number }) => {
        setCurrentGroup(student);
        setEditGroupOpen(true);
    };

    const handleUpdateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentGroup) return;

        setGroups(groups.map(std =>
            std.id === currentGroup.id
                ? { ...std, group: currentGroup.group }
                : std
        ));
        setEditGroupOpen(false);
    };

    const confirmDelete = (id: string) => {
        setStudentToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const handleDelete = () => {
        if (studentToDelete) {
            setGroups(groups.filter(std => std.id !== studentToDelete));
            setDeleteConfirmOpen(false);
            setStudentToDelete(null);
        }
    };

    return (
        <>
            <div className="col-span-2 flex justify-end pb-4 w-full">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">Create new Group</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create a new Group</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="groupName">Group Name</Label>
                                    <Input
                                        id="groupName"
                                        value={group}
                                        onChange={(e) => setGroup(e.target.value)}
                                        placeholder="Enter group's name"
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

            <Dialog open={editGroupOpen} onOpenChange={setEditGroupOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Group</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateGroup}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="group">Group</Label>
                                <Input
                                    id="group"
                                    // type="number"
                                    value={currentGroup?.group || ""}
                                    onChange={(e) =>
                                        setCurrentGroup({
                                            ...currentGroup!,
                                            group: (e.target.value) || "null",
                                        })
                                    }
                                    placeholder="Enter new group"
                                    required
                                />
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
                    There are {groups.length} groups in {classroom.classroomName} class
                </TableCaption>
                <TableHeader className='bg-slate-200 text-lg'>
                    <TableRow>
                        <TableHead className="text-center font-bold text-black">No.</TableHead>
                        <TableHead className="text-center font-bold text-black">Group Name</TableHead>
                        <TableHead className="text-center font-bold text-black">Total Score</TableHead>
                        <TableHead className="text-center font-bold text-black">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='text-base'>
                    {groups.map((std) => (
                        <TableRow key={std.id}>
                            <TableCell className="text-center">{std.id}</TableCell>
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