"use client";
import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";
import GameCard from "./components/gameCard";
import { useTeacherClasses } from "@/hooks/useTeacherClasses";
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import useTeacherAssignment from "@/hooks/useTeacherAsssignment";

export default function Page() {
  const { classes, loading: loadingClasses } = useTeacherClasses();

  const { useListAllTeacherAssignment, useDeleteAssignment } = useTeacherAssignment();
  const { data: assignments, isLoading, isError } = useListAllTeacherAssignment();
  const { mutate: deleteAssignment } = useDeleteAssignment();

  // const enrichedAssignments = useMemo(() => {
  //   if (!assignments || !classes) return [];

  //   return assignments.map((asm) => {
  //     const clsId = asm.classroomId;
  //     const classrooms = classes.find((clss) => clss.id === clsId);
  //     const classNames = classrooms?.classroomName || "";

  //     let className = Array.isArray(classNames) ? classNames.join("") : classNames;

  //     if (!className) className = "-";

  //     return {
  //       ...asm,
  //       className,
  //     };
  //   });
  // }, [assignments, classes]);

  const enrichedAssignments = useMemo(() => {
    if (!assignments || !classes) return [];

    // Lọc các bài tập không có deletedAt và các lớp có deletedAt là null
    const filteredClasses = classes.filter((clss) => clss.deletedAt === null);
    const filteredAssignments = assignments.filter((asm) => asm.deletedAt === null);

    return filteredAssignments.map((asm) => {
      const clsId = asm.classroomId;
      const classrooms = filteredClasses.find((clss) => clss.id === clsId);
      const classNames = classrooms?.classroomName || "";

      let className = Array.isArray(classNames) ? classNames.join("") : classNames;

      if (!className) className = "-";

      return {
        ...asm,
        className,
      };
    });
  }, [assignments, classes]);


  if (loadingClasses || isLoading) {
    return <ThreeDotsWave />;
  }

  if (!classes || classes.length === 0 || isError) {
    <div>No assignment available</div>
  }

  console.log("assignment: ", enrichedAssignments);

  const handleDeleteGame = (id: string) => {
    deleteAssignment(id, {
      onSuccess: () => {
        console.log("Assignment deleted successfully.");
      },
      onError: (error) => {
        console.error("Error deleting assignment:", error);
      },
    });
  };

  return (
    <div className="flex flex-col p-[24px] w-full">
      <div className="flex flex-col w-full gap-[20px]">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold">Games</span>
        </div>
        <div className="col-span-2 flex justify-end pb-4 w-full">
          <Button
            onClick={() => {
              window.location.href = "/teacherGames/gameCreate";
            }}
          >
            Create Game
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {enrichedAssignments?.map((assignment) => (
            <GameCard
              key={assignment.id}
              id={assignment.id}
              nameOfClass={assignment.className}
              nameOfQuiz={assignment.title}
              questions={assignment.description}
              onDelete={handleDeleteGame} // Truyền hàm xoá vào component
            />
          ))}
        </div>
      </div>
    </div>
  );
}
