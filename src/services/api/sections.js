import { 
GET_ALL_SECTIONS, 
GET_ALL_SECTION_STUDENTS_URL
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
