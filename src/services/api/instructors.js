import { 
    GET_INSTRUCTORS
    } from '../apiUrl';
    import axiosInstance, { baseUrl } from '../config/axiosInstance';
    import axios from 'axios';
    
 
    
    export const getInstructors = async ()=>{
      const res = await axiosInstance.get(baseUrl+GET_INSTRUCTORS)
    
      return res.data
    }

 