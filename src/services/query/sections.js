import { useQuery } from 'react-query';
import { GET_SECTIONS } from '../queryKeys';
import { getAllSections } from '../api/sections';

export const useGetAllSections = (options) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_SECTIONS],
    getAllSections,
    { ...options }
  );

  return { data, isLoading, refetch };
};
