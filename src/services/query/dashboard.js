import { useQuery } from "react-query";
import { MOST_INSTRUCTORS,MOST_SECTIONS,MOST_COURSES,NUMBER_ABSENCES,TOTAL_COUNT } from "../queryKeys";
import { getMostInstructors,getMostSections,getMostCourses,getNumberAbsences,getTotalCount} from "../api/dashboard";


export const useGetMostInstructors = (number,options)=>{
    const {data,isLoading,refetch} = useQuery(
        [MOST_INSTRUCTORS,number],
        ()=>getMostInstructors(number),
        {
            ...options
        }
    );

    return {data,isLoading,refetch}
}

export const useGetMostSections = (number,options)=>{
    const {data,isLoading,refetch} = useQuery(
        [MOST_SECTIONS,number],
        ()=>getMostSections(number),
        {
            ...options
        }
    );

    return {data,isLoading,refetch}
}

export const useGetMostCourses = (number,options)=>{
    const {data,isLoading,refetch} = useQuery(
        [MOST_COURSES,number],
        ()=>getMostCourses(number),
        {
            ...options
        }
    );

    return {data,isLoading,refetch}
}

export const useGetNumberAbsences = ({number,from,to},options)=>{
    const {data,isLoading,refetch} = useQuery(
        [NUMBER_ABSENCES,from,to],
        ()=>getNumberAbsences({from,to}),
        {
            ...options
        }
    );

    return {data,isLoading,refetch}
}



export const useGetTotalCount = (options)=>{
    const {data,isLoading,refetch} = useQuery(
        [TOTAL_COUNT],
        ()=>getTotalCount(),
        {
            ...options
        }
    );

    return {data,isLoading,refetch}
}
