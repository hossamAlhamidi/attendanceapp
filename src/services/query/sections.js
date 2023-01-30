import { useQuery, useMutation } from 'react-query';
import {
  GET_SECTIONS,
  GET_ALL_SECTION_STUDENTS,
  ADD_SECTION,
  ADD_ALL_STUDENTS_TO_SECTION,
  ADD_STUDENT_TO_SECTION,
  GET_INSTRUCTOR_SECTIONS,
  DELETE_SECTION,
  GET_SECTION_BY_ID,
  GET_STUDENT_BY_ID,
  UPDATE_SECTION
} from '../queryKeys';
import {
  getAllSections,
  getAllSectionStudents,
  addSection,
  addAllStudentsToSection,
  addStudentToSection,
  getInstructorSections,
  deleteSection,
  getSectionById,
  updateSection
} from '../api/sections';

export const useGetAllSections = (options) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_SECTIONS],
    getAllSections,
    { ...options }
  );

  return { data, isLoading, refetch };
};

export const useGetInstructorSections = (id, options) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_INSTRUCTOR_SECTIONS, id],
    () => getInstructorSections(id),
    { ...options }
  );
  return { data, isLoading, refetch };
};

export const useGetAllSectionStudents = (id, options) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_ALL_SECTION_STUDENTS, id],
    () => getAllSectionStudents(id),
    { ...options }
  );
  return { data, isLoading, refetch };
};

export const useGetSectionById = (id, options) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_STUDENT_BY_ID, id],
    () => getSectionById(id),
    { ...options }
  );
  return { data, isLoading, refetch };
};


export const useAddSection = (options) => {
  const { data, mutate, isLoading } = useMutation(addSection, {
    mutationKey: ADD_SECTION,
    ...options,
  });

  return { mutate, data, isLoading };
};

export const useAddStudentToSection = (options) => {
  const { data, mutate, isLoading } = useMutation(addStudentToSection, {
    mutationKey: ADD_STUDENT_TO_SECTION,
    ...options,
  });

  return { mutate, data, isLoading };
};

export const useAddAllStudentsToSection = (options) => {
  const { data, mutate, isLoading } = useMutation(addAllStudentsToSection, {
    mutationKey: ADD_ALL_STUDENTS_TO_SECTION,
    ...options,
  });

  return { mutate, data, isLoading };
};

export const useUpdateSection = (options) => {
  const { data, isLoading, mutate } = useMutation(updateSection, {
    mutationKey: [UPDATE_SECTION],
    ...options,
  });
  return { data, isLoading, mutate };
};


export const useDeleteSection = (options) => {
  const { data, isLoading, mutate } = useMutation(deleteSection, {
    mutationKey: [DELETE_SECTION],
    ...options,
  });
  return { data, isLoading, mutate };
};
