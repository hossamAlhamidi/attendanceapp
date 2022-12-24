import { 
GET_ALL_SECTIONS, 
GET_ALL_SECTION_STUDENTS_URL,
ADD_SECTION
} from '../apiUrl';
import axiosInstance, { baseUrl } from '../config/axiosInstance';
import axios from 'axios';

export const getAllSections = async () => {
  const res = await axiosInstance.get(baseUrl + GET_ALL_SECTIONS);
  return res.data;
};

export const getAllSectionStudents = async (id)=>{
  const res = await axiosInstance.get(baseUrl+GET_ALL_SECTION_STUDENTS_URL(id))

  return res.data
}

export const addSection = async (body)=>{
 const res = await axiosInstance.post(baseUrl+ADD_SECTION,body)

 return res.data
}
