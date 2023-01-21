import React, { Fragment, useEffect, useState ,useMemo} from 'react';
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
  useToast,
  Stack,
  Icon,
  useDisclosure,
  Spinner,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { CgRowFirst, CgTrashEmpty } from 'react-icons/cg';
import { isEmpty } from '../../components/ModalTemplate';
import { IoIosArrowBack } from 'react-icons/io';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { TbPencil } from 'react-icons/tb';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { useUpdateStudent } from '../../services/query/student';
import { useGetAbsenceForStudent } from '../../services/query/student';
import TableTemplate from '../../components/Table';
import { studentAbsenceTableHeader } from '../../data/studentAbsence.header';
import { useDeleteAbsence } from '../../services/query/student';
import Prompt from '../../components/Prompt'
import { useGetInstructor , useUpdateInstructor} from '../../services/query/instructors';
const InstructorProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const toast = useToast();

  const initialValues = {
    instructor_id: "",
    instructor_name:"",
    email:"",
    phone_number:  '',
    old_password:"",
    password:"",
    password_confirmation:""
  };
   const [instructorInfo,setInstructorInfo] = useState(initialValues)

   const {data:instructorInformation,isLoading:isLoadinginstructorInformation,refetch} = useGetInstructor({
    onSuccess:(res)=>{
        console.log(res,"res")
        setInstructorInfo({
            instructor_id:res?.instructor_id,
            instructor_name:res?.instructor_name,
            email:res?.email,
            phone_number:res?.phone_number||""
        })
    },
    onError:(err)=>{
        console.log(err)
    },
    cacheTime: 0
  })

  const {mutate:updateInstructor} = useUpdateInstructor({
    onSuccess:(res)=>{
        console.log(res,"success")
        toast({
            title: 'Updated',
            description: res?.message,
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
  const formik = useFormik({
    initialValues: instructorInfo,
    onSubmit: (values) => {
      console.log(values, 'submit');
      updateInstructor({
            instructor_id:values.instructor_id,
            instructor_name:values.instructor_name,
            email:values.email,
            phone_number:values.phone_number,
            old_password:values.old_password,
            password:values.password,
            password_confirmation:values.password_confirmation

      })
      refetch()
    //   setinstructorInfo(values)
    },
    enableReinitialize: true,

  });

  const { values, handleChange, handleBlur } = formik;
  return (
    <Fragment>
      {
      !isLoadinginstructorInformation?
       <Card my={5}>
              <CardBody>
                <Flex justifyContent={'flex-end'}>
                  <Button onClick={() => setIsEdit(!isEdit)} mb={10}>
                    {isEdit ? <HiLockClosed /> : <HiLockOpen />}
                  </Button>
                </Flex>
               <SimpleGrid columns={[1, 2]} spacing={10}>
                <FormControl>
                  <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>instructor ID</FormLabel>
                <Input
                    placeholder='instructor ID'
                    name='instructor_id'
                    id='instructor_id'
                    value={values?.instructor_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={true}
                  />
                </FormControl>
                 
                 <FormControl>
                 <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Name</FormLabel>
                 <Input
                    placeholder='Name'
                    name='instructor_name'
                    id='instructor_name'
                    value={values?.instructor_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                  />
                 </FormControl>
                 
                 <FormControl>
                 <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Email</FormLabel>
                 <Input
                    placeholder='Email'
                    name='email'
                    id='email'
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                  />
                 </FormControl>
                 
                 <FormControl>
                 <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Phone Number</FormLabel>
                 <Input
                    placeholder='05********'
                    name='phone_number'
                    id='phone_number'
                    value={values?.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                  />
                 </FormControl>

                 <FormControl>
                 <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Old Password</FormLabel>
                 <Input
                    type={'password'}
                    placeholder='**********'
                    name='old_password'
                    id='old_password'
                    value={values?.old_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                  />
                 </FormControl>

                 <FormControl>
                 <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>New Password</FormLabel>
                 <Input
                    type={'password'}
                    placeholder='**********'
                    name='password'
                    id='password'
                    value={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                  />
                 </FormControl>

                 <FormControl>
                 <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Password Confirmation</FormLabel>
                 <Input
                    type={'password'}
                    placeholder='**********'
                    name='password_confirmation'
                    id='password_confirmation'
                    value={values?.password_confirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                  />
                 </FormControl>
                 
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
            : 
             <Box display={'flex'} justifyContent='center' mt={5}>
              <Spinner />
              </Box>
            }
    </Fragment>
  )
}

export default InstructorProfile