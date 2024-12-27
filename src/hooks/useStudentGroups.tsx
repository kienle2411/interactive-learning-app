import studentGroupAction from "@/api/endpoints/studentGroups"
import { Group } from "@/types/group-response-student"
import { useQuery } from "@tanstack/react-query"

const useStudentGroups = () => {
    const useListStudentGroups = (id: string) => {
        return useQuery<Group[], Error>({
            queryKey: ["student-groups", id],
            queryFn: async () => {
                const result = await studentGroupAction.list(id);
                console.log(result);
                const filteredResult = result.filter((group) => group.deletedAt === null)
                return filteredResult;
            },
            enabled: !!id,
        });
    }
    return ({
        useListStudentGroups,
    });
}

export default useStudentGroups;

