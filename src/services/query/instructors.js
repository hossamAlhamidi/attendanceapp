import { useMutation, useQuery } from "react-query";
import { GET_INSTRUCTORS } from "../queryKeys";
import { getInstructors } from "../api/instructors";


export const useGetAllInstructor = (options)=>{
    const {data,isLoading,refetch} = useQuery(
        [GET_INSTRUCTORS],
        getInstructors,
        {
            ...options
        }
    );

    return {data,isLoading,refetch}
}

