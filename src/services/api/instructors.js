import { 
    GET_INSTRUCTORS,
    ADD_INSTRUCTOR
    } from '../apiUrl';
    import axiosInstance, { baseUrl } from '../config/axiosInstance';
    import axios from 'axios';
    
 
    
    export const getInstructors = async ()=>{
      const res = await axiosInstance.get(baseUrl+GET_INSTRUCTORS)
    
      return res.data
    }

    export const addInstructor = async (body)=>{
      const res = await axiosInstance.post(baseUrl+ADD_INSTRUCTOR,body)

      return res.data
    }

 