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

  const { useListStudentClasses } = useStudentClasses();
  const { data: classes, isLoading: isLoadingStudentClasses, isError: isErrorStudentClasses } = useListStudentClasses();

  const [materials] = useState<
    { id: string; material: string; link: string }[]
  >([
    {
      id: "1",
      material: "Something1",
      link: "https://www.youtube.com/watch?v=-tKUE3Uk1fw&list=PLY7-QN21UfSMSvqgx7TqXLmMu8UrrbIwe&index=10&ab_channel=Kjr-B%E1%BA%A1nc%E1%BB%A7as%C3%A1ch",
    },
    {
      id: "2",
      material: "Something2",
      link: "https://www.youtube.com/watch?v=-tKUE3Uk1fw&list=PLY7-QN21UfSMSvqgx7TqXLmMu8UrrbIwe&index=10&ab_channel=Kjr-B%E1%BA%A1nc%E1%BB%A7as%C3%A1ch",
    },
    {
      id: "3",
      material: "Something3",
      link: "https://www.youtube.com/watch?v=-tKUE3Uk1fw&list=PLY7-QN21UfSMSvqgx7TqXLmMu8UrrbIwe&index=10&ab_channel=Kjr-B%E1%BA%A1nc%E1%BB%A7as%C3%A1ch",
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
          There are {materials.length} materials in {findClass?.classroomName} class
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
              Link
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          {materials.map((std) => (
            <TableRow key={std.id}>
              <TableCell className="text-center p-4">{std.id}</TableCell>
              <TableCell className="text-center">{std.material}</TableCell>
              <TableCell className="text-center text-blue-600 underline">
                <a href={std.link}>{std.material}</a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
