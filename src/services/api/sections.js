import { 
GET_ALL_SECTIONS, 
GET_ALL_SECTION_STUDENTS_URL,
ADD_SECTION,
ADD_ALL_STUDENTS_TO_SECTION,
ADD_STUDENT_TO_SECTION,
GET_INSTRUCTOR_SECTIONS,
DELETE_SECTION,
GET_SECTION_BY_ID,
UPDATE_SECTION
} from '../apiUrl';
import axiosInstance, { baseUrl } from '../config/axiosInstance';
import axios from 'axios';

export const getAllSections = async () => {
  const res = await axiosInstance.get(baseUrl + GET_ALL_SECTIONS);
  return res.data;
};

export const getInstructorSections = async (id) => {
  const res = await axiosInstance.get(baseUrl + GET_INSTRUCTOR_SECTIONS(id));
  return res.data;
};

export const getAllSectionStudents = async (id)=>{
  const res = await axiosInstance.get(baseUrl+GET_ALL_SECTION_STUDENTS_URL(id))

  return res.data
}

export const getSectionById = async (id)=>{
  const res = await axiosInstance.get(baseUrl+GET_SECTION_BY_ID(id))

  return res.data
}

export const addSection = async (body)=>{
 const res = await axiosInstance.post(baseUrl+ADD_SECTION,body)

 return res.data
}
export const addStudentToSection = async (body)=>{
  const res = await axiosInstance.post(baseUrl+ADD_STUDENT_TO_SECTION,body)
 
  return res.data
 }
export const addAllStudentsToSection = async(body)=>{
  const res = await axiosInstance.post(baseUrl+ADD_ALL_STUDENTS_TO_SECTION,body)
  return res.body;
}

export const updateSection = async(body)=>{
  const res = await axiosInstance.put(baseUrl+UPDATE_SECTION,body)

  return res.data
}

export const deleteSection = async(id)=>{
  const res = await axiosInstance.delete(baseUrl+DELETE_SECTION(id))

  return res.data
}