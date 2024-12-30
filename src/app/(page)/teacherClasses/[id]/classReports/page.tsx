"use client";

import React from "react";
import FullWidthBarChart from "../../components/barChart";
import { usePathname } from "next/navigation";
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import { useStudentsInClass } from "@/hooks/useStudentClass";

export default function Dashboard() {
    const pathname = usePathname();
    const id = pathname.split('/')[2];
    const { data: students, isLoading: studentIsLoading } = useStudentsInClass(id);

    if (studentIsLoading) {
        return <ThreeDotsWave />;
    }

    if (!students) {
        return <div>No class details found.</div>;
    }

    const chartData = students.map((std) => ({
        student: std.student.user.username,
        score: Number(std.totalScore),
    }))

    return (
        <div className="flex flex-col w-full items-center align-middle h-full" style={{ padding: "20px" }}>
            <h2 className="mt-4 font-bold text-lg">Students' Scores Overview</h2>
            <FullWidthBarChart data={chartData} />
        </div>
    );
}