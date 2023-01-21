import { 
    GET_INSTRUCTORS,
    ADD_INSTRUCTOR,
    DELETE_INSTRUCTOR,
    GET_INSTRUCTOR,
    UPDATE_INSTRUCTOR
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

    export const deleteInstructor = async(id)=>{
      const res = await axiosInstance.delete(baseUrl+DELETE_INSTRUCTOR(id))

      return res.data
  }

  // only one instructor
  export const getInstructor = async ()=>{
    const res = await axiosInstance.get(baseUrl+GET_INSTRUCTOR)
  
    return res.data
  }

  export const updateInstructor = async (body)=>{
    const res = await axiosInstance.put(baseUrl+UPDATE_INSTRUCTOR,body)

    return res.data;
}