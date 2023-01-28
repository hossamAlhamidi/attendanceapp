import { 
    MOST_INSTRUCTORS,
    MOST_SECTIONS,
    MOST_COURSES
    } from '../apiUrl';
    import axiosInstance, { baseUrl } from '../config/axiosInstance';
    import axios from 'axios';
     
    export const getMostInstructors = async (number)=>{
        const res = await axiosInstance.get(baseUrl+MOST_INSTRUCTORS(number));
    
        return res.data;
    }

    export const getMostSections = async (number)=>{
        const res = await axiosInstance.get(baseUrl+MOST_SECTIONS(number));
    
        return res.data;
    }

    export const getMostCourses = async (number)=>{
        const res = await axiosInstance.get(baseUrl+MOST_COURSES(number));
    
        return res.data;
    }

 