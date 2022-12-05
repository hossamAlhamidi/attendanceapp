import { 
GET_ALL_SECTIONS, 

} from '../apiUrl';
import axiosInstance, { baseUrl } from '../config/axiosInstance';
import axios from 'axios';

export const getAllSections = async () => {
  const res = await axiosInstance.get(baseUrl + GET_ALL_SECTIONS);
  return res.data;
};

