import { 
    LOGIN
    } from '../apiUrl';
    import axiosInstance, { baseUrl } from '../config/axiosInstance';
    import axios from 'axios';
    
 
    

    export const login = async (body)=>{
      const res = await axiosInstance.post(baseUrl+LOGIN,body)

      return res.data
    }

 