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
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
// import ThreeDotsWave from "@/components/ui/three-dot-wave";
// import { useTeacherGroup } from '@/hooks/useTeacherGroup';
// import { useClassById } from '@/hooks/useTeacherClasses';

// export default function GroupTable() {
//     const [open, setOpen] = useState(false);
//     const [editGroupOpen, setEditGroupOpen] = useState(false);
//     const [currentGroup, setCurrentGroup] = useState<{ id: string; group: string; score: number } | null>(null);

//     const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//     const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

//     const pathname = usePathname();
//     const id = pathname.split('/')[2]; // Assuming productId is always at the 3rd position
//     const [group, setGroup] = useState("");

//     const { classroom } = useClassById(id as string);


//     const { groups, loading, error } = useTeacherGroup(id as string);


//     if (loading) {
//         return <ThreeDotsWave />;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!groups) {
//         return <div>No group details found.</div>;
//     }


//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!group.trim()) return; // Prevent adding empty groups

//         // const newStudent = {
//         //     id: (groups.length + 1).toString(), // Sequential ID
//         //     group: group,
//         //     score: 0,
//         // };
//         // setGroups([...groups, newStudent]);
//         setGroup("");
//         setOpen(false);
//     };

//     // const openEditGroupDialog = (student: { id: string; group: string; score: number }) => {
//     //     setCurrentGroup(student);
//     //     setEditGroupOpen(true);
//     // };

//     const handleUpdateGroup = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!currentGroup) return;

//         // setGroups(groups.map(std =>
//         //     std.id === currentGroup.id
//         //         ? { ...std, group: currentGroup.group }
//         //         : std
//         // ));
//         setEditGroupOpen(false);
//     };

//     const confirmDelete = (id: string) => {
//         setStudentToDelete(id);
//         setDeleteConfirmOpen(true);
//     };

//     const handleDelete = () => {
//         if (studentToDelete) {
//             // setGroups(groups.filter(std => std.id !== studentToDelete));
//             setDeleteConfirmOpen(false);
//             setStudentToDelete(null);
//         }
//     };

//     return (
//         <>
//             <div className="col-span-2 flex justify-end pb-4 w-full">
//                 <Dialog open={open} onOpenChange={setOpen}>
//                     <DialogTrigger asChild>
//                         <Button variant="default">Create new Group</Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                             <DialogTitle>Create a new Group</DialogTitle>
//                         </DialogHeader>
//                         <form onSubmit={handleSubmit}>
//                             <div className="grid gap-4 py-4">
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="groupName">Group Name</Label>
//                                     <Input
//                                         id="groupName"
//                                         value={group}
//                                         onChange={(e) => setGroup(e.target.value)}
//                                         placeholder="Enter group's name"
//                                         required
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

//             <Dialog open={editGroupOpen} onOpenChange={setEditGroupOpen}>
//                 <DialogContent className="sm:max-w-[425px]">
//                     <DialogHeader>
//                         <DialogTitle>Update Group</DialogTitle>
//                     </DialogHeader>
//                     <form onSubmit={handleUpdateGroup}>
//                         <div className="grid gap-4 py-4">
//                             <div className="grid gap-2">
//                                 <Label htmlFor="group">Group</Label>
//                                 <Input
//                                     id="group"
//                                     // type="number"
//                                     value={currentGroup?.group || ""}
//                                     onChange={(e) =>
//                                         setCurrentGroup({
//                                             ...currentGroup!,
//                                             group: (e.target.value) || "null",
//                                         })
//                                     }
//                                     placeholder="Enter new group"
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <DialogFooter>
//                             <Button type="submit">Update</Button>
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>

//             {/* Delete Confirmation Alert Dialog */}
//             <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
//                 <AlertDialogContent>
//                     <AlertDialogHeader>
//                         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                         <AlertDialogDescription>
//                             This action cannot be undone.
//                         </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
//                     </AlertDialogFooter>
//                 </AlertDialogContent>
//             </AlertDialog>

//             <Table>
//                 <TableCaption>
//                     There are {groups.length} groups in {classroom?.classroomName} class
//                 </TableCaption>
//                 <TableHeader className='bg-slate-200 text-lg'>
//                     <TableRow>
//                         <TableHead className="text-center font-bold text-black">No.</TableHead>
//                         <TableHead className="text-center font-bold text-black">Group Name</TableHead>
//                         {/* <TableHead className="text-center font-bold text-black">Total Score</TableHead> */}
//                         <TableHead className="text-center font-bold text-black">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody className='text-base'>
//                     {groups.map((std, index) => (
//                         <TableRow key={std.id}>
//                             <TableCell className="text-center">{index + 1}</TableCell>
//                             <TableCell className="text-center">{std.groupName}</TableCell>
//                             {/* <TableCell className="text-center">{std.score}</TableCell> */}
//                             <TableCell className="text-center">
//                                 <Button className='m-2'
//                                     variant="secondary"
//                                     size="sm"
//                                 // onClick={() => openEditGroupDialog(std)}
//                                 >
//                                     Update
//                                 </Button>
//                                 <Button
//                                     variant="destructive"
//                                     size="sm"
//                                     onClick={() => confirmDelete(std.id)}>
//                                     Delete
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </>
//     )
// }



"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import { useTeacherGroup } from "@/hooks/useTeacherGroup";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useClassById } from "@/hooks/useTeacherClasses";

export default function GroupTable() {
    const pathname = usePathname();
    const classroomId = pathname.split("/")[2]; // Assuming ID is at position 3
    const { groups, loading, error, createGroup, editGroup, removeGroup } = useTeacherGroup(classroomId);

    const [groupName, setGroupName] = useState("");
    const [editGroupId, setEditGroupId] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const id = pathname.split('/')[2];
    const { classroom } = useClassById(id as string);

    if (loading) return <ThreeDotsWave />;
    if (error) return <div>Error: {error}</div>;

    const handleAddGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (groupName.trim()) {
            await createGroup(groupName);
            setGroupName("");
            setOpenDialog(false);
        }
    };

    const handleEditGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editGroupId && groupName.trim()) {
            await editGroup(editGroupId, groupName);
            setGroupName("");
            setEditGroupId(null);
            setOpenDialog(false);
        }
    };

    const handleDeleteGroup = async (groupId: string) => {
        await removeGroup(groupId);
    };

    return (
        <>
            <div className="col-span-2 flex justify-end pb-4 w-full">
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        <Button variant="default">{editGroupId ? "Update Group" : "Create Group"}</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editGroupId ? "Update Group" : "Create New Group"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={editGroupId ? handleEditGroup : handleAddGroup}>
                            <Input
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder="Enter group name"
                                required
                            />
                            <DialogFooter className="mt-4">
                                <Button type="submit">{editGroupId ? "Update" : "Create"}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableCaption>
                    There are {groups.length} groups in {classroom?.classroomName} class
                </TableCaption>
                <TableHeader className='bg-slate-200 text-lg'>
                    <TableRow>
                        <TableHead className="text-center font-bold text-black">No.</TableHead>
                        <TableHead className="text-center font-bold text-black">Group Name</TableHead>
                        {/* <TableHead className="text-center font-bold text-black">Total Score</TableHead> */}
                        <TableHead className="text-center font-bold text-black">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='text-base'>
                    {groups.map((std, index) => (
                        <TableRow key={std.id}>
                            <TableCell className="text-center">{index + 1}</TableCell>
                            <TableCell className="text-center">{std.groupName}</TableCell>
                            {/* <TableCell className="text-center">{std.score}</TableCell> */}
                            <TableCell className="text-center">
                                <Button
                                    className="mr-2"
                                    variant="secondary"
                                    onClick={() => {
                                        setEditGroupId(std.id);
                                        setGroupName(std.groupName);
                                        setOpenDialog(true);
                                    }}
                                >
                                    Update
                                </Button>
                                <Button variant="destructive" onClick={() => handleDeleteGroup(std.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
