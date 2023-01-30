import { 
    MOST_INSTRUCTORS,
    MOST_SECTIONS,
    MOST_COURSES,
    NUMBER_ABSENCES,
    TOTAL_COUNT
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

    export const getNumberAbsences = async ({number,from,to})=>{

        const res = await axiosInstance.get(baseUrl+NUMBER_ABSENCES({number,from,to}));
    
        return res.data;
    }

    export const getTotalCount = async ()=>{

        const res = await axiosInstance.get(baseUrl+TOTAL_COUNT);
    
        return res.data;
    }



 