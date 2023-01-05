import { useMutation, useQuery } from 'react-query';
import { GET_STUDENT,UPDATE_STUDENT,GET_STUDENT_BY_ID,GET_ABSENCE_FOR_STUDENT,DELETE_ABSENCE } from '../queryKeys';
import { getStudentById,updateStudent , getStudentByIdAlt,getAbsenceForStudent,deleteAbsence} from '../api/students';


export const useGetStudentById = (options)=>{
  const {data,mutate,isLoading} = useMutation(getStudentById,{
    mutationKey:[GET_STUDENT],
    ...options
});


    return {data,mutate,isLoading}
}

export const useUpdateStudent = (options)=>{
    const {data,mutate,isLoading,refetch} = useMutation(updateStudent,{
        mutationKey:[UPDATE_STUDENT],
        ...options
    })

    return {data,mutate,isLoading,refetch}
}

export const useGetStudentByIdAlt = (id,options)=>{
    const {data,isLoading,refetch} = useQuery(
        [GET_STUDENT_BY_ID,id],
        ()=>getStudentByIdAlt(id),
        {...options}
    )
    return {data,isLoading,refetch}
}

export const useGetAbsenceForStudent = (id,options)=>{
    const {data,isLoading,refetch} = useQuery(
        [GET_ABSENCE_FOR_STUDENT,id],
        ()=>getAbsenceForStudent(id),
        {...options}
    )
    return {data,isLoading,refetch}
}

export const useDeleteAbsence = (options)=>{
    const {data,isLoading,mutate} = useMutation(deleteAbsence,
        {
            mutationKey:[DELETE_ABSENCE],
            ...options
        }
    )
    return {data,isLoading,mutate}
}