import { fetchClassGroup } from "@/api/endpoints/group";
import { Group } from "@/types/group-response";
import { useState, useEffect } from "react";


export const useTeacherGroup = (id: string) => {
    const [groups, setGroups] = useState<Group[]>([]);  // Lưu danh sách lớp học
    const [loading, setLoading] = useState<boolean>(true);    // Trạng thái tải dữ liệu
    const [error, setError] = useState<string | null>(null);   // Lỗi khi tải dữ liệu

    const loadGroups = async () => {
        try {
            const response = await fetchClassGroup(id);

            if (response && response.data) {
                // Filter groups that are not deleted
                const filteredGroups = response.data.data.filter((group) => group.deletedAt === null);
                setGroups(filteredGroups);
            } else {
                setError("No data available.");
            }
        } catch (err) {
            setError("Error fetching groups.");
            console.log("Hook error fetchClassGroup", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGroups();
    }, []);

    return {
        groups,
        loading,
        error,
        refetchGroups: loadGroups,  // Cung cấp hàm làm mới danh sách lớp học
    };
}
