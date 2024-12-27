import studentMaterials from "@/api/endpoints/studentMaterials";
import { Material } from "@/types/material-response-student"
import { useQuery } from "@tanstack/react-query"

const useStudentMaterials = () => {
    const useListStudentMaterials = (id: string) => {
        return useQuery<Material[], Error>({
            queryKey: ["student-materials", id],
            queryFn: async () => {
                const result = await studentMaterials.list(id);
                console.log(result);
                return result;
            }
        });
    }
    return {
        useListStudentMaterials,
    }
}

export default useStudentMaterials;