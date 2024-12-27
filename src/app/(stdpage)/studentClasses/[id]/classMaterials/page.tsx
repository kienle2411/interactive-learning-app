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
import React from "react";
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import useStudentMaterials from "@/hooks/useStudentMaterials";

export default function Page() {
  const pathname = usePathname();
  const id = pathname.split("/")[2]; // Assuming productId is always at the 3rd position

  const { useListStudentClasses } = useStudentClasses();
  const { data: classes, isLoading: isLoadingStudentClasses, isError: isErrorStudentClasses } = useListStudentClasses();

  const { useListStudentMaterials } = useStudentMaterials();
  const { data: materials, isLoading: isLoadingStudentMaterials, isError: isErrorStudentMaterials } = useListStudentMaterials(id);

  // const [materials] = useState<
  //   { id: string; material: string; link: string }[]
  // >([
  //   {
  //     id: "1",
  //     material: "Something1",
  //     link: "https://www.youtube.com/watch?v=-tKUE3Uk1fw&list=PLY7-QN21UfSMSvqgx7TqXLmMu8UrrbIwe&index=10&ab_channel=Kjr-B%E1%BA%A1nc%E1%BB%A7as%C3%A1ch",
  //   },
  //   {
  //     id: "2",
  //     material: "Something2",
  //     link: "https://www.youtube.com/watch?v=-tKUE3Uk1fw&list=PLY7-QN21UfSMSvqgx7TqXLmMu8UrrbIwe&index=10&ab_channel=Kjr-B%E1%BA%A1nc%E1%BB%A7as%C3%A1ch",
  //   },
  //   {
  //     id: "3",
  //     material: "Something3",
  //     link: "https://www.youtube.com/watch?v=-tKUE3Uk1fw&list=PLY7-QN21UfSMSvqgx7TqXLmMu8UrrbIwe&index=10&ab_channel=Kjr-B%E1%BA%A1nc%E1%BB%A7as%C3%A1ch",
  //   },
  // ]);

  if (isLoadingStudentClasses) {
    return <ThreeDotsWave />;
  }

  if (isErrorStudentClasses) {
    return <div>Error Loading classes</div>;
  }

  if (!classes || classes.length === 0) {
    return <div>No classes available</div>;
  }

  if (isLoadingStudentMaterials) {
    return <ThreeDotsWave />;
  }

  if (isErrorStudentMaterials) {
    return <div>Error Loading material</div>;
  }

  if (!materials || materials.length === 0) {
    return <div>No material available</div>;
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
              Title
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Description
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Link
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              File
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          {materials.map((std, index) => (
            <TableRow key={std.id}>
              <TableCell className="text-center p-4">{index + 1}</TableCell>
              <TableCell className="text-center">{std.title}</TableCell>
              <TableCell className="text-center">{std.description}</TableCell>
              <TableCell className="text-center">
                {std.url && std.url.trim() !== "" ? (
                  <a href={std.url} className="underline text-blue-700">{std.url}</a>
                ) : (
                  <p>-</p>
                )}
              </TableCell>
              <TableCell className="text-center">
                {std.docFileId && std.docFileId.trim() !== "" ? (
                  <a
                    className="underline text-blue-700"
                    href={`https://learn.kienle2411.id.vn/api/docfiles/${std.docFileId}/download`}
                  >
                    {std.title}
                  </a>
                ) : (
                  <p>-</p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div >
  );
}



// <TableCell className="text-center">
//   {mat.url && mat.url.trim() !== "" ? (
//     <a href={mat.url} className="underline text-blue-700">{mat.url}</a>
//   ) : (
//     <p>-</p>
//   )}
// </TableCell>
// <TableCell className="text-center">
//   {mat.docFileId && mat.docFileId.trim() !== "" ? (
//     <a
//       className="underline text-blue-700"
//       href={`https://learn.kienle2411.id.vn/api/docfiles/${mat.docFileId}/download`}
//     >
//       {mat.title}
//     </a>
//   ) : (
//     <p>-</p>
//   )}
// </TableCell>