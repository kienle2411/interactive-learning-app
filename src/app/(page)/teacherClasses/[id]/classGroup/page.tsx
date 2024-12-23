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
                        <TableHead className="text-center font-bold text-black">Total Score</TableHead>
                        <TableHead className="text-center font-bold text-black">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='text-base'>
                    {groups.map((std, index) => (
                        <TableRow key={std.id}>
                            <TableCell className="text-center">{index + 1}</TableCell>
                            <TableCell className="text-center">{std.groupName}</TableCell>
                            <TableCell className="text-center">{std.totalScore}</TableCell>
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
