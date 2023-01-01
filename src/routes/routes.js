 import WithSuspense from '../components/WithSuspense';
 import { lazy } from 'react';
 import { PUBLIC_PATHS,PRIVATE_PATHS } from './constants';
 import { Navigate } from 'react-router-dom';
//  import { StudentInfo } from '../pages/Students/StudentInfo';
const {LOGIN,SIGNUP} = PUBLIC_PATHS;
const {SECTIONS,COURSES,SECTIONS_INNER,STUDENTS,STUDENT,ADD_SECTION,INSTRUCTORS} = PRIVATE_PATHS
  const Sections = WithSuspense(
    lazy(() => import('../pages/sections/index'))
  );

  const AddSection = WithSuspense(
    lazy(() => import('../pages/sections/AddSection'))
  );

  const SectionInner = WithSuspense(
    lazy(() => import('../pages/sections/SectionInner'))
  );

  const Courses = WithSuspense(
    lazy(()=>import('../pages/courses/Courses'))
  )
  const Instructors = WithSuspense(
    lazy(()=>import('../pages/instructors/index'))
  )
  const Login = WithSuspense(
    lazy(()=>import('../pages/Login'))
  )
  const Students = WithSuspense(
    lazy(() => import('../pages/Students/Students'))
  );
  const StudentInfo = WithSuspense(
    lazy(() => import('../pages/Students/StudentInfo'))
  );


  export const PUBLIC_ROUTES = [
    // { path: HOME, element: <Home /> },
    { path: LOGIN, element: <Login /> },
    // { path: SIGNUP, element: <SignUp /> },
    { path: '*', element: <Navigate to="/login" replace /> },
  
    // non existing url will redirect to home page
  ];


  export const PRIVATE_ROUTES= [
    { path: SECTIONS, element: <Sections /> },
    { path: COURSES, element: <Courses /> },
    { path: INSTRUCTORS, element: <Instructors /> },
    { path: SECTIONS_INNER, element: <SectionInner /> },
    { path: ADD_SECTION, element: <AddSection /> },
    { path: STUDENTS, element: <Students /> },
    { path: STUDENT, element: <StudentInfo /> },
    { path: '*', element: <Navigate to="/sections" replace /> },
  ]