import { addGroup, deleteGroup, fetchClassGroup, updateGroup } from "@/api/endpoints/group";
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

    const createGroup = async (groupName: string) => {
        try {
            await addGroup(id, groupName);
            await loadGroups(); // Refresh groups after adding
        } catch (error) {
            console.error("Error adding group:", error);
        }
    };

    const editGroup = async (groupId: string, groupName: string) => {
        try {
            await updateGroup(groupId, groupName);
            await loadGroups(); // Refresh groups after editing
        } catch (error) {
            console.error("Error updating group:", error);
        }
    };

    const removeGroup = async (groupId: string) => {
        try {
            await deleteGroup(groupId);
            await loadGroups(); // Refresh groups after deleting
        } catch (error) {
            console.error("Error deleting group:", error);
        }
    };

    return {
        groups,
        loading,
        error,
        refetchGroups: loadGroups,
        createGroup,
        editGroup,
        removeGroup,
    };
}
