import { useEffect, useState } from "react";
import { fetchTeacherClasses } from "@/api/endpoints/teacherClasses";
import { Classroom } from "@/types/class-response";

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

    return {
        classes,
        loading,
        error,
        refetchClasses: loadClasses,  // Cung cấp hàm làm mới danh sách lớp học
    };
};




