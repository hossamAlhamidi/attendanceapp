 import WithSuspense from '../components/WithSuspense';
 import { lazy } from 'react';
 import { PUBLIC_PATHS,PRIVATE_PATHS } from './constants';
 import { Navigate } from 'react-router-dom';
const {LOGIN,SIGNUP} = PUBLIC_PATHS;
const {SECTIONS,COURSES,SECTIONS_INNER} = PRIVATE_PATHS

  const Sections = WithSuspense(
    lazy(() => import('../pages/sections/index'))
  );

  const SectionInner = WithSuspense(
    lazy(() => import('../pages/sections/SectionInner'))
  );

  const Courses = WithSuspense(
    lazy(()=>import('../pages/courses/Courses'))
  )
  const Login = WithSuspense(
    lazy(()=>import('../pages/Login'))
  )


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
    { path: SECTIONS_INNER, element: <SectionInner /> },
    { path: '*', element: <Navigate to="/sections" replace /> },
  ]