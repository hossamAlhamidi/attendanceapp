import { useQuery } from 'react-query';
import { GET_SECTIONS,GET_ALL_SECTION_STUDENTS } from '../queryKeys';
import { getAllSections,getAllSectionStudents } from '../api/sections';

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