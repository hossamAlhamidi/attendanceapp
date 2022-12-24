import React, { Fragment, useEffect, useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  Input,
  Card,
  CardBody,
  SimpleGrid,
  Button,
  Flex,
  useToast
} from '@chakra-ui/react';

import { IoIosArrowBack } from 'react-icons/io';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { TbPencil } from 'react-icons/tb';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useGetStudentById, useGetStudentByIdAlt } from '../../services/query/student';
import { useFormik } from 'formik';
import { useUpdateStudent } from '../../services/query/student';

const StudentInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const toast = useToast();
  const [isEdit, setIsEdit] = useState(false);
  const { id } = params;
  const { student } = location.state || '';

    const initialValues = {
    student_id: "",
    student_name:"",
    email:"",
    phone_number:  '',
  };
   const [studentInfo,setStudentInfo] = useState(initialValues)
//   if (!student) {
//     navigate('/students/');
//     // window.location.href = '/students/';
//     window.location.replace('/students/');
//   }

  const {data:studentInformation,isLoading:isLoadingStudentInformation,refetch} = useGetStudentByIdAlt(id,{
    onSuccess:(res)=>{
        console.log(res,"res")
        setStudentInfo({
            student_id:res[0]?.student_id,
            student_name:res[0]?.student_name,
            email:res[0]?.email,
            phone_number:res[0]?.phone_number||""
        })
    },
    onError:(err)=>{
        console.log(err)
    },
    cacheTime: 0
  })
 
  const {data,mutate:updateStudent} = useUpdateStudent({
    onSuccess:(res)=>{
        console.log(res,"success")
        toast({
            title: 'Updated',
            description: 'Student Information has been Updated',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
    },
    onError:(err)=>{
        console.log(err)
           toast({
          title: 'Not Updated',
          description: err?.response?.data?.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
    }
  })
  // useEffect(()=>{
  //  mutate(id)
  // },[id])
  // const {data,mutate,isLoading} = useGetStudentById({
  //     onSuccess:(res)=>{
  //     //   console.log(res,"success")
  //     },
  //     onError:(err)=>{
  //       console.log(err,"error");
  //     //   toast({
  //     //     title: 'Not Found',
  //     //     description: err?.response?.data?.message,
  //     //     status: 'error',
  //     //     duration: 5000,
  //     //     isClosable: true,
  //     //     position: 'top-right',
  //     //   });
  //     }
  //    })
//   const initialValues = {
//     student_id: studentInfo?.student_id,
//     student_name: studentInfo?.student_name,
//     email: studentInfo?.email,
//     phone_number: studentInfo?.phone_number || '',
//   };

  const formik = useFormik({
    initialValues: studentInfo,
    onSubmit: (values) => {
      console.log(values, 'submit');
      updateStudent({
        id:student?.student_id,
        body:{
            student_id:values.student_id,
            student_name:values.student_name,
            email:values.email,
            phone_number:values.phone_number
        }
        
      })
      refetch()
    //   setStudentInfo(values)
    },
    enableReinitialize: true,

  });
  const { values, handleChange, handleBlur } = formik;
  return (
    <Fragment>
      <Box my={5}>
        <IoIosArrowBack
          size={24}
          cursor='pointer'
          onClick={() => navigate(-1)}
        />
      </Box>

      <Tabs>
        <TabList>
          <Tab>Student Info</Tab>
          <Tab>Student Courses</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          {!isLoadingStudentInformation&& <Card my={5}>
              <CardBody>
                <Flex justifyContent={'flex-end'}>
                  <Button onClick={() => setIsEdit(!isEdit)} mb={10}>
                    {isEdit ? <HiLockClosed /> : <HiLockOpen />}
                  </Button>
                </Flex>
               <SimpleGrid columns={[1, 2]} spacing={10}>
                  <Input
                    placeholder='Student ID'
                    name='student_id'
                    id='student_id'
                    value={values?.student_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={true}
                  />
                  <Input
                    placeholder='Name'
                    name='student_name'
                    id='student_name'
                    value={values?.student_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                  />
                  <Input
                    placeholder='Email'
                    name='email'
                    id='email'
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                  />
                  <Input
                    placeholder='05********'
                    name='phone_number'
                    id='phone_number'
                    value={values?.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                  />
                </SimpleGrid>
                
                <Button
                  onClick={() => formik.handleSubmit()}
                  mt={8}
                  isDisabled={!isEdit}
                >
                  Save
                </Button>
              </CardBody>
            </Card>
            }
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Fragment>
  );
};
export default StudentInfo;
