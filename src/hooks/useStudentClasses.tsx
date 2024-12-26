// import studentClassesAction from "@/api/endpoints/studentClasses";
// import { useQuery, useQueryClient } from "@tanstack/react-query"

// const useStudentClasses = () => {
//     const queryClient = useQueryClient();
//     const useListStudentClasses = () => useQuery({
//         queryKey: ["student-classes"],
//         queryFn: () => studentClassesAction.list(),
//     });

//     return {
//         useListStudentClasses,
//     };
// }

// export default useStudentClasses;

import { useQuery } from "@tanstack/react-query";
import studentClassesAction from "@/api/endpoints/studentClasses";
import { Classroom } from "@/types/class-response";

const useStudentClasses = () => {
    const useListStudentClasses = () =>
        useQuery<Classroom[], Error>({
            queryKey: ["student-classes"],
            queryFn: studentClassesAction.list,
        });

    return {
        useListStudentClasses,
    };
};

export default useStudentClasses;