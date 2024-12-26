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
import useStudentClasses from "@/hooks/useStudentClasses";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import ThreeDotsWave from "@/components/ui/three-dot-wave";

export default function Page() {
  const pathname = usePathname();
  const id = pathname.split("/")[2]; // Assuming productId is always at the 3rd position
  // const [group, setGroup] = useState("");
  const { useListStudentClasses } = useStudentClasses();
  const { data: classes, isLoading: isLoadingStudentClasses, isError: isErrorStudentClasses } = useListStudentClasses();
  const [groups] = useState<{ id: string; group: string; score: number }[]>([
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

  if (isLoadingStudentClasses) {
    return <ThreeDotsWave />;
  }

  if (isErrorStudentClasses) {
    return <div>Error Loading classes</div>;
  }

  if (!classes || classes.length === 0) {
    return <div>No classes available</div>;
  }

  const findClass = classes.find((cls) => cls.id === id);

  return (
    <div className="w-full">
      <Table>
        <TableCaption>
          There are {groups.length} groups in {findClass?.classroomName} class
        </TableCaption>
        <TableHeader className="bg-slate-200  text-base">
          <TableRow>
            <TableHead className="text-center font-bold text-black">
              No.
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Group Name
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Total Score
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
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
  );
}
