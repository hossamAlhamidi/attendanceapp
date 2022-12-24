import { useQuery ,useMutation} from 'react-query';
import { GET_SECTIONS,GET_ALL_SECTION_STUDENTS, ADD_SECTION } from '../queryKeys';
import { getAllSections,getAllSectionStudents,addSection } from '../api/sections';

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