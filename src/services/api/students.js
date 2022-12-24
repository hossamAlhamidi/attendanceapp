import { 
    GET_STUDENT_URL,
    UPDATE_STUDENT_URL,
    GET_STUDENT_BY_ID_URL
    } from '../apiUrl';
    import axiosInstance, { baseUrl } from '../config/axiosInstance';
    import axios from 'axios';
    
 
    
    export const getStudentById = async (id)=>{
      const res = await axiosInstance.post(baseUrl+GET_STUDENT_URL(id),{
        student_id:id
      })
    
      return res.data
    }

    export const getStudentByIdAlt = async (id)=>{
      const res = await axiosInstance.get(baseUrl+GET_STUDENT_BY_ID_URL(id))

      return res.data
    }
    
    export const updateStudent = async ({id,body})=>{
        const res = await axiosInstance.put(baseUrl+UPDATE_STUDENT_URL+id,body)

        return res.data;
    }