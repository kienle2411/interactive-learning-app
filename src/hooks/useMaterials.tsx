import { createMaterial, downloadDocFile, fetchClassMaterials, updateMaterial } from "@/api/endpoints/materials";
import { Material, MaterialInput, MaterialUpdate } from "@/types/material-response";
import { useEffect, useState } from "react";
import { useToast } from "./use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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


export const useTeacherMaterial_tanstack = (id: string) => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["classMaterials", id],
        queryFn: async () => {
            const response = await fetchClassMaterials(id);
            if (!response || !response.data) {
                throw new Error("No data available.");
            }
            return response.data.data;
        },
    });

    return {
        materials: data || [],
        loading: isLoading,
        error: isError,
        refetchMaterials: refetch,
    };
};


export const useUpdateMaterial = (classroomId: string) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: (variables: { id: string; newMaterial: MaterialUpdate }) =>
            updateMaterial(variables.id, variables.newMaterial),
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: "Material updated successfully",
            });
            // Refetch the updated materials list for the classroom
            queryClient.invalidateQueries({ queryKey: ["classMaterials", classroomId] });

        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to update material",
                variant: "destructive",
            });
        },
    });

    return mutation;
};