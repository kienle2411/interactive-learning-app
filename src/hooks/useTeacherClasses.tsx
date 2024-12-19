import { useEffect, useState } from "react";
import { fetchTeacherClasses } from "@/api/endpoints/teacherClasses";
import { Classroom } from "@/types/class-response";
import { updateClass as apiUpdateClass } from "@/api/endpoints/teacherClasses";

// Custom Hook để lấy danh sách lớp học
export const useTeacherClasses = () => {
    const [classes, setClasses] = useState<Classroom[]>([]);  // Lưu danh sách lớp học
    const [loading, setLoading] = useState<boolean>(true);    // Trạng thái tải dữ liệu
    const [error, setError] = useState<string | null>(null);   // Lỗi khi tải dữ liệu

    const loadClasses = async () => {
        try {
            const response = await fetchTeacherClasses();
            if (response && response.data) {
                setClasses(response.data.data);
            } else {
                setError("No data available.");
            }
        } catch (err) {
            setError("Error fetching classrooms.");
            console.log("Hook error useTeacherClasses", err);
        } finally {
            setLoading(false);
        }
    };


    // Chạy một lần khi component mount
    useEffect(() => {
        loadClasses();
    }, []);


    const updateClass = async (id: string, updatedData: Partial<Omit<Classroom, "id" | "createdAt" | "updatedAt" | "deletedAt" | "teacherId">>) => {
        try {
            const updatedClass = await apiUpdateClass(id, updatedData);
            setClasses((prevClasses) =>
                prevClasses.map((cls) => (cls.id === id ? { ...cls, ...updatedClass } : cls))
            );
        } catch (error) {
            console.error("Failed to update class", error);
            throw error;
        }
    }

    return {
        classes,
        loading,
        error,
        refetchClasses: loadClasses,  // Cung cấp hàm làm mới danh sách lớp học
        updateClass,
    };
};




