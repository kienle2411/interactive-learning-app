"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Sử dụng useRouter từ Next.js
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";

interface ClassCardProps {
    id: string; // Unique ID for the class
    className: string;
    participants: number;
}

const StudentClassCard: React.FC<ClassCardProps> = ({ id, className, participants }) => {
    const router = useRouter(); // Initialize router

    const handleImageClick = () => {
        router.push(`/studentClasses/${id}`); // Điều hướng đến đường dẫn
    };

    return (
        <Card className="flex flex-row grid-cols-1 gap-1 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
                <img
                    className="cursor-pointer"
                    src="/elearning_pic.jpg"
                    height={60}
                    width={60}
                    alt="Class Image"
                    onClick={handleImageClick} // Điều hướng khi click vào ảnh
                />
            </CardHeader>
            <CardContent className="card-content pt-2 pb-2 pl-4">
                <span className="text-lg font-bold">{className}</span>
                <span>Participants: {participants}</span>
            </CardContent>
        </Card>
    );
};

export default StudentClassCard;
