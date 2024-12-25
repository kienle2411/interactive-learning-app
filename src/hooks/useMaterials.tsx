import { createMaterial, downloadDocFile, fetchClassMaterials } from "@/api/endpoints/materials";
import { Material, MaterialInput } from "@/types/material-response";
import { useEffect, useState } from "react";
import { useToast } from "./use-toast";

export const useTeacherMaterial = (id: string) => {
    const [materials, setMaterials] = useState<Material[]>([]);  // Lưu danh sách lớp học
    const [loading, setLoading] = useState<boolean>(true);    // Trạng thái tải dữ liệu
    const [error, setError] = useState<string | null>(null);   // Lỗi khi tải dữ liệu

    const loadMaterials = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchClassMaterials(id);
            if (response && response.data) {
                const filteredMaterial = response.data.data;
                setMaterials(filteredMaterial);
            }
            else {
                setError("No data available.");
            }
        } catch (err) {
            setError("Error fetching materials.");
            console.log("Hook error fetchClassMaterials", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMaterials();
    }, []);


    return {
        materials,
        loading,
        error,
        refetchMaterials: loadMaterials,
    };
}


export const useCreateMaterial = (classroomId: string, onSuccess?: () => void) => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const mutate = async (data: MaterialInput) => {
        setIsLoading(true);
        try {
            await createMaterial(classroomId, data);
            toast({
                title: "Success",
                description: "Material created successfully",
            });
            if (onSuccess) onSuccess();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create material",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { mutate, isLoading };
};


