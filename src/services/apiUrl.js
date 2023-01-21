export const GET_ALL_SECTIONS = 'sections/';
export const GET_ALL_COURSES = 'courses/'
export const ADD_COURSE = 'courses/'
export const GET_ALL_SECTION_STUDENTS_URL = (id) => `section/students/${id}`;
export const GET_STUDENT_URL = `students/`;
export const UPDATE_STUDENT_URL =`students/`;
export const GET_STUDENT_BY_ID_URL =(id)=> `students/${id}`
export const ADD_SECTION = 'sections/'
export const GET_INSTRUCTORS = 'instructors/'
export const ADD_INSTRUCTOR = 'instructor/register/'
export const ADD_ALL_STUDENTS_TO_SECTION = 'students/sections/all'
export const ADD_STUDENT_TO_SECTION = 'students/sections'
export const GET_ABSENCE_FOR_STUDENT =(id)=> `student/absence/${id}`
export const DELETE_ABSENCE = ({student_id,section_id,absence_date})=>`student/absence/?student_id=${student_id}&section_id=${section_id}&absence_date=${absence_date}`
export const LOGIN = 'instructor/login'
export const GET_INSTRUCTOR_SECTIONS = (id)=>`instructor/sections/${id}`
export const DELETE_COURSE = (id)=>`courses/${id}`
export const DELETE_INSTRUCTOR = (id)=>`instructor/${id}`