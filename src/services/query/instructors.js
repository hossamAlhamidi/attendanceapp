import { useMutation, useQuery } from "react-query";
import { GET_INSTRUCTORS ,ADD_INSTRUCTOR,DELETE_INSTRUCTOR,GET_INSTRUCTOR,UPDATE_INSTRUCTOR} from "../queryKeys";
import { getInstructors,addInstructor,deleteInstructor,getInstructor,updateInstructor } from "../api/instructors";


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

// only one instructor 
export const useGetInstructor = (options)=>{
    const {data,isLoading,refetch} = useQuery(
        [GET_INSTRUCTOR],
        getInstructor,
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

export const useUpdateInstructor = (options)=>{
    const {data,mutate,isLoading,refetch} = useMutation(updateInstructor,{
        mutationKey:[UPDATE_INSTRUCTOR],
        ...options
    })

    return {data,mutate,isLoading,refetch}
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


