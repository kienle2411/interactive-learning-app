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
import React, { useMemo } from "react";
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import useStudentGroups from "@/hooks/useStudentGroups";
import { useStudentsInClass } from "@/hooks/useStudentClass";

export default function Page() {
  // const [students] = useState<
  //   { id: string; student: string; group: string; score: number }[]
  // >([
  //   {
  //     id: "1",
  //     student: "joey",
  //     group: "Group 1",
  //     score: 123,
  //   },

  //   {
  //     id: "2",
  //     student: "joey",
  //     group: "Group 2",
  //     score: 142,
  //   },
  //   {
  //     id: "3",
  //     student: "joey",
  //     group: "Group 1",
  //     score: 98,
  //   },
  //   {
  //     id: "4",
  //     student: "joey",
  //     group: "Group 3",
  //     score: 120,
  //   },
  // ]);
  const pathname = usePathname();
  const id = pathname.split('/')[2];

  const { useListStudentClasses } = useStudentClasses();
  const { data: classes, isLoading: isLoadingStudentClasses, isError: isErrorStudentClasses } = useListStudentClasses();
  const { data: students, isLoading: studentIsLoading } = useStudentsInClass(id);

  const { useListStudentGroups } = useStudentGroups();
  const { data: groups, isLoading: isLoadingGroup } = useListStudentGroups(id);


  const enrichedStudents = useMemo(() => {
    if (!students || !groups) return [];

    return students.map((student) => {
      const groupId = student.student.groups[0]?.groupId;
      const groupName = groups.find((group) => group.id === groupId)?.groupName || "-";

      return {
        ...student,
        groupName,
      };
    });
  }, [students, groups]);


  if (isLoadingStudentClasses) {
    return <ThreeDotsWave />;
  }

  if (isErrorStudentClasses) {
    return <div>Error Loading classes</div>;
  }

  if (!classes || classes.length === 0) {
    return <div>No classes available</div>;
  }

  if (studentIsLoading) {
    return <ThreeDotsWave />;
  }

  if (isLoadingGroup) {
    return <ThreeDotsWave />;
  }

  const findClass = classes.find((cls) => cls.id === id);

  return (
    <div className="w-full">
      <Table>
        <TableCaption>
          There are {enrichedStudents.length} students in {findClass?.classroomName} class
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
          {enrichedStudents.map((std, index) => (
            <TableRow key={std.student.user.id}>
              <TableCell className="text-center p-4">{index + 1}</TableCell>
              <TableCell className="text-center">{std.student.user.username}</TableCell>
              <TableCell className="text-center">{std.groupName}</TableCell>
              <TableCell className="text-center">{std.totalScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
