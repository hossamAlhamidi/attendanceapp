import { useMutation, useQuery } from "react-query";
import { GET_INSTRUCTORS ,ADD_INSTRUCTOR,DELETE_INSTRUCTOR} from "../queryKeys";
import { getInstructors,addInstructor,deleteInstructor } from "../api/instructors";


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

export const useDeleteInstructor = (options)=>{
    const {data,isLoading,mutate} = useMutation(deleteInstructor,
        {
            mutationKey:[DELETE_INSTRUCTOR],
            ...options
        }
    )
    return {data,isLoading,mutate}
}
