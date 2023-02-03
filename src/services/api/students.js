import { 
    GET_STUDENT_URL,
    UPDATE_STUDENT_URL,
    GET_STUDENT_BY_ID_URL,
    GET_ABSENCE_FOR_STUDENT,
    DELETE_ABSENCE,
    DELETE_STUDENT_FROM_SECTION,
    ADD_EXCUSE,
    GET_EXCUSE_FOR_STUDENT
    } from '../apiUrl';
    import axiosInstance, { baseUrl } from '../config/axiosInstance';
    import axios from 'axios';
    
 
    
    export const getStudentById = async (body)=>{
      const res = await axiosInstance.post(baseUrl+GET_STUDENT_URL,{
        student_id:body.student_id,
        instructor_id:body.instructor_id
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

    
    export const getAbsenceForStudent = async (id)=>{
      const res = await axiosInstance.get(baseUrl+GET_ABSENCE_FOR_STUDENT(id))
    
      return res.data
    }

    export const getExcuseForStudent = async (id)=>{
      const res = await axiosInstance.get(baseUrl+GET_EXCUSE_FOR_STUDENT(id))
    
      return res.data
    }

    export const deleteAbsence = async (body)=>{
      const res = await axiosInstance.delete(baseUrl+DELETE_ABSENCE(body))
    
      return res.data
    }

    export const addExcuse = async (body)=>{
      const res = await axiosInstance.post(baseUrl+ADD_EXCUSE,body)
    
      return res.data
    }
  
    export const deleteStudentFromSection = async (body)=>{
     const res = await axiosInstance.delete(baseUrl+DELETE_STUDENT_FROM_SECTION(body))
   
     return res.data
   }
 