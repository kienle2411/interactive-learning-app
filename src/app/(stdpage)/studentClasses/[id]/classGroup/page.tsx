"use client";
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

export default function page() {
    const pathname = usePathname();
    const id = pathname.split('/')[2]; // Assuming productId is always at the 3rd position
    const [group, setGroup] = useState("");
    const [groups, setGroups] = useState<
        { id: string; group: string; score: number }[]
    >([
        {
            id: "1",
            group: "Group 1",
            score: 123,
        },
        {
            id: "2",
            group: "Group 2",
            score: 105,
        },
        {
            id: "3",
            group: "Group 3",
            score: 117,
        },
    ]);

    return (
        <div className='w-full'>
            <Table>
                <TableCaption>
                    There are {groups.length} groups in {id} class
                </TableCaption>
                <TableHeader className='bg-slate-200  text-base'>
                    <TableRow>
                        <TableHead className="text-center font-bold text-black">No.</TableHead>
                        <TableHead className="text-center font-bold text-black">Group Name</TableHead>
                        <TableHead className="text-center font-bold text-black">Total Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='text-sm'>
                    {groups.map((std) => (
                        <TableRow key={std.id}>
                            <TableCell className="text-center p-4">{std.id}</TableCell>
                            <TableCell className="text-center">{std.group}</TableCell>
                            <TableCell className="text-center">{std.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
