import { useMutation, useQuery } from "react-query";
import { GET_INSTRUCTORS ,ADD_INSTRUCTOR} from "../queryKeys";
import { getInstructors,addInstructor } from "../api/instructors";


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

export const useAddInstructor = (options)=>{
    const {data,mutate,isLoading}=useMutation(addInstructor,{
        mutationKey:ADD_INSTRUCTOR,
        ...options
    });

    return {mutate,data,isLoading}
}

