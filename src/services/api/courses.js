import { 
    GET_ALL_COURSES,
    ADD_COURSE,
    DELETE_COURSE
    } from '../apiUrl';
    import axiosInstance, { baseUrl } from '../config/axiosInstance';
    import axios from 'axios';
     
    export const getAllCourses = async ()=>{
        const res = await axiosInstance.get(baseUrl+GET_ALL_COURSES);
    
        return res.data;
    }

    export const addCourse = async (body)=>{
        const res = await axiosInstance.post(baseUrl+ADD_COURSE,body)

        return res.data
    }

    export const deleteCourse = async(id)=>{
        const res = await axiosInstance.delete(baseUrl+DELETE_COURSE(id))

        return res.data
    }