"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const [students] = useState<
    { id: string; student: string; group: string; score: number }[]
  >([
    {
      id: "1",
      student: "joey",
      group: "Group 1",
      score: 123,
    },

    {
      id: "2",
      student: "joey",
      group: "Group 2",
      score: 142,
    },
    {
      id: "3",
      student: "joey",
      group: "Group 1",
      score: 98,
    },
    {
      id: "4",
      student: "joey",
      group: "Group 3",
      score: 120,
    },
  ]);

  const pathname = usePathname();
  const id = pathname.split("/")[2]; // Assuming productId is always at the 3rd position

  return (
    <div className="w-full">
      <Table>
        <TableCaption>
          There are {students.length} students in {id} class
        </TableCaption>
        <TableHeader className="bg-slate-200 text-base">
          <TableRow>
            <TableHead className="text-center font-bold text-black">
              No.
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Name
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Group
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Score
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          {students.map((std) => (
            <TableRow key={std.id}>
              <TableCell className="text-center p-4">{std.id}</TableCell>
              <TableCell className="text-center">{std.student}</TableCell>
              <TableCell className="text-center">{std.group}</TableCell>
              <TableCell className="text-center">{std.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
