import { useMutation, useQuery } from "react-query";
import { GET_COURSES,ADD_COURSE,DELETE_COURSE } from "../queryKeys";
import { getAllCourses,addCourse ,deleteCourse} from "../api/courses";


export const useGetAllCourses = (options)=>{
    const {data,isLoading,refetch} = useQuery(
        [GET_COURSES],
        getAllCourses,
        {
            ...options
        }
    );

    return {data,isLoading,refetch}
}

export const useAddCourse = (options)=>{
    const {data,mutate,isLoading}=useMutation(addCourse,{
        mutationKey:ADD_COURSE,
        ...options
    });

    return {mutate,data,isLoading}
}

export const useDeleteCourse = (options)=>{
    const {data,isLoading,mutate} = useMutation(deleteCourse,
        {
            mutationKey:[DELETE_COURSE],
            ...options
        }
    )
    return {data,isLoading,mutate}
}