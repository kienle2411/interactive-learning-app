"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Sử dụng useRouter từ Next.js
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";

interface ClassCardProps {
    id: string; // Unique ID for the class
    className: string;
    participants: number;
    code: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ id, className, participants, code }) => {
    const router = useRouter(); // Initialize router

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        alert("Code copied to clipboard!");
    };

    const handleImageClick = () => {
        router.push(`/teacherClasses/${id}`); // Điều hướng đến đường dẫn
    };

    return (
        <Card className="flex flex-row grid-cols-1 md:grid-cols-2 gap-1 shadow-md hover:shadow-lg transition-shadow">
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
                <h3 className="text-xl font-bold">{className}</h3>
                <p>Participants: {participants}</p>
                <p>
                    Code: {code}
                    <button className="ml-2" onClick={handleCopy}>
                        <Copy size={16} />
                    </button>
                </p>
            </CardContent>
        </Card>
    );
};

export default ClassCard;
