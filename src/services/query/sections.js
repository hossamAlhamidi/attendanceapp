import { useQuery ,useMutation} from 'react-query';
import { GET_SECTIONS,GET_ALL_SECTION_STUDENTS, ADD_SECTION,ADD_ALL_STUDENTS_TO_SECTION,ADD_STUDENT_TO_SECTION } from '../queryKeys';
import { getAllSections,getAllSectionStudents,addSection,addAllStudentsToSection,addStudentToSection } from '../api/sections';

export const useGetAllSections = (options) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_SECTIONS],
    getAllSections,
    { ...options }
  );

  return { data, isLoading, refetch };
};

export const useGetAllSectionStudents = (id,options)=>{
  const {data,isLoading,refetch} = useQuery(
    [GET_ALL_SECTION_STUDENTS,id],
    ()=>getAllSectionStudents(id),
    {...options}

    )
    return {data,isLoading,refetch}
}

export const useAddSection = (options)=>{
  const {data,mutate,isLoading}=useMutation(addSection,{
      mutationKey:ADD_SECTION,
      ...options
  });

  return {mutate,data,isLoading}
}

export const useAddStudentToSection = (options)=>{
  const {data,mutate,isLoading}=useMutation(addStudentToSection,{
      mutationKey:ADD_STUDENT_TO_SECTION,
      ...options
  });

  return {mutate,data,isLoading}
}

export const useAddAllStudentsToSection = (options)=>{
  const {data,mutate,isLoading}=useMutation(addAllStudentsToSection,{
      mutationKey:ADD_ALL_STUDENTS_TO_SECTION,
      ...options
  });

  return {mutate,data,isLoading}
}