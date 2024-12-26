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
// import { usePathname } from "next/navigation";
import React from "react";
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import useStudentGroups from "@/hooks/useStudentGroups";
import { useParams } from 'next/navigation'


export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const { useListStudentClasses } = useStudentClasses();
  const { data: classes, isLoading: isLoadingStudentClasses, isError: isErrorStudentClasses } = useListStudentClasses();
  // const [groups] = useState<{ id: string; group: string; score: number }[]>([
  //   {
  //     id: "1",
  //     group: "Group 1",
  //     score: 123,
  //   },
  //   {
  //     id: "2",
  //     group: "Group 2",
  //     score: 105,
  //   },
  //   {
  //     id: "3",
  //     group: "Group 3",
  //     score: 117,
  //   },
  // ]);

  const { useListStudentGroups } = useStudentGroups();
  const { data: groups, isLoading: isLoadingGroup, isError: isErrorGroup } = useListStudentGroups(id);

  if (isLoadingStudentClasses) {
    return <ThreeDotsWave />;
  }

  if (isErrorStudentClasses) {
    return <div>Error Loading classes</div>;
  }

  if (!classes || classes.length === 0) {
    return <div>No class available</div>;
  }

  if (isLoadingGroup) {
    return <ThreeDotsWave />;
  }

  if (isErrorGroup) {
    return <div>Error Loading group</div>;
  }

  if (!groups || groups.length === 0) {
    return <div>No groups available</div>;
  }

  const findClass = classes.find((cls) => cls.id === id);

  console.log(groups);

  return (
    <div className="w-full">
      <Table>
        <TableCaption>
          There are {groups?.length} groups in {findClass?.classroomName} class
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
          {groups?.map((std, index) => (
            <TableRow key={std.id}>
              <TableCell className="text-center p-4">{index + 1}</TableCell>
              <TableCell className="text-center">{std.groupName}</TableCell>
              <TableCell className="text-center">{std.totalScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
