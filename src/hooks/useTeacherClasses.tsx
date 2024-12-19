import { useEffect, useState } from "react";
import { fetchTeacherClasses } from "@/api/endpoints/teacherClasses";
import { Classroom } from "@/types/class-response";

// Custom Hook để lấy danh sách lớp học
export const useTeacherClasses = () => {
    const [classes, setClasses] = useState<Classroom[]>([]);  // Lưu danh sách lớp học
    const [loading, setLoading] = useState<boolean>(true);    // Trạng thái tải dữ liệu
    const [error, setError] = useState<string | null>(null);   // Lỗi khi tải dữ liệu

    useEffect(() => {
        const loadClasses = async () => {
            try {
                const response = await fetchTeacherClasses(); // Gọi API để lấy lớp học

                // Kiểm tra nếu response và response.data tồn tại
                if (response && response.data) {
                    setClasses(response.data.data); // Cập nhật danh sách lớp học vào state
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

        loadClasses();
    }, []); // Chạy một lần khi component mount

    return { classes, loading, error };
};
