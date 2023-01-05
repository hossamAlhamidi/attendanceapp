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
  useDisclosure
} from '@chakra-ui/react';
import { CgRowFirst, CgTrashEmpty } from 'react-icons/cg';
import { isEmpty } from '../../components/ModalTemplate';
import { IoIosArrowBack } from 'react-icons/io';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { TbPencil } from 'react-icons/tb';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useGetStudentById, useGetStudentByIdAlt } from '../../services/query/student';
import { useFormik } from 'formik';
import { useUpdateStudent } from '../../services/query/student';
import { useGetAbsenceForStudent } from '../../services/query/student';
import TableTemplate from '../../components/Table';
import { studentAbsenceTableHeader } from '../../data/studentAbsence.header';
import { useDeleteAbsence } from '../../services/query/student';
import Prompt from '../../components/Prompt'
const StudentInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const toast = useToast();
  const confirmPrompt = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [deletedItem,setDeletedItem] = useState(null)
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
 
  const {mutate:updateStudent} = useUpdateStudent({
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

  const {data:studentAbsence,isLoading:isLoadingStudentAbsence,refetch:getAllAbsence} = useGetAbsenceForStudent(id,{
    onSuccess:(res)=>{
      console.log(res,"abs")
    },
  })

  const {mutate:deleteAbsence,isLoading:isLoadingDelete} = useDeleteAbsence({
    onSuccess:(res)=>{
      console.log(res,'deleted')
      confirmPrompt.onClose();
      getAllAbsence()
      toast({
        title: 'Deleted',
        description: 'Student Absence has been Deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError:(err)=>{
      toast({
        title: 'Not Deleted',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  })

  const handleCloseDeleteModal = () => {
    setDeletedItem(null);
    confirmPrompt.onClose();
  };
  const handleDelete = (body)=>{
    deleteAbsence(body)
    // student_id:item?.student_id,
    // section_id:item?.section_id,
    // absence_date:item?.absence_date
  }
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
  const currentStudentAbsence = useMemo(() => {
    if (studentAbsence) {

      return [...studentAbsence];
    }
    return [];
  }, [studentAbsence]);

   const filterDataBySection = (section_id)=>{
    if (isEmpty(section_id)) {
      return currentStudentAbsence;
    }
    let filtered = currentStudentAbsence.filter((item) =>
      item.section_id == section_id
    );
    // console.log(filtered,"filtered")
    return filtered;
   }

     useEffect(()=>{

     },[])
   const sectionDetails = (section_id)=>{
     if(currentStudentAbsence){
      let filtered = currentStudentAbsence.filter((item)=>item.section_id==section_id)[0]
      return {
        // course_id:filtered.course_id,
        course_name:filtered.course_name,
        section_id:filtered.section_id,
        type:filtered.type
      }
     }
     return {}
   }
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
            {
              !isLoadingStudentAbsence&&!isEmpty(studentAbsence)?
              <Card p={10}>
                {
                // <Text>{JSON.stringify(Array.from(new Set(studentAbsence?.map((e)=>e.course_id))))}</Text>
                Array.from(new Set(studentAbsence?.map((e)=>e.section_id)))
                .map((section_id)=>{
                  return(
                    <Box my={10}>
                    
                    {/* <Text>{JSON.stringify(Object.keys(sectionDetails(section_id)).map((key)=>sectionDetails(section_id)[key]))}</Text> */}
                    <Stack
                    borderBottom={'1px solid #EDF1F7'}
                    alignItems={'center'}
                    paddingLeft={4}
                    gap={5}
                    // color={orgDetailsLabelColor}
                    fontSize={[11, 12]}
                    fontFamily={'Inter'}
                    fontWeight={400}
                    pb={3}
                    overflowX={'auto'}
                    direction='row'
                    flexWrap={'wrap'}
            >
              {
                Object.keys(sectionDetails(section_id)).map((key)=>
                {
                 return(
                  <> 
                  <Box>                             
                  {/* <Text fontSize={15} >{key.replace("_"," ")}</Text> */}
                  <Text  
                  fontSize={[12, 12, 15]}
                  fontWeight={'bold'}
                  >
                    {sectionDetails(section_id)[key]}
                    </Text>
                    </Box>  
                    </>
                 ) 
                })
              }
              </Stack>
                    <TableTemplate
                     columns={studentAbsenceTableHeader}
                     data={filterDataBySection(section_id)}
                      actions = {
                        [
                          {
                            aria_label: 'Delete Cognna Admins',
                            icon: <Icon as={CgTrashEmpty} color={'red'} />,
                            onPress: (item) => {
                              console.log(item,"item")
                              setDeletedItem({
                                student_id:item?.student_id,
                                section_id:item?.section_id,
                                absence_date:item?.absence_date
                              })
           
                              confirmPrompt.onOpen();
                            },
                          },
                        ]
                      }
                    />
                    </Box>
                  )
                })
                }
              </Card>:
              <Text textAlign={'center'} mt={5}>No Absence for this student</Text>
              
            }
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Prompt
        isOpen={confirmPrompt.isOpen}
        onClose={() => {
          handleCloseDeleteModal();
        }}
        title={'Are you sure you want to delete this record?'}
        buttons={[
          {
            label: 'Delete',
            type: 'danger',
            onPress: () => {
              handleDelete(deletedItem);
            },
            styles: {
              paddingX: 50,
            },
            isLoading: isLoadingDelete,
          },
          {
            label: 'Cancel',
            type: 'secondary',
            onPress: () => {
              handleCloseDeleteModal();
            },
            styles: {
              paddingX: 50,
            },
          },
        ]}
        type={'error'}
      />
    </Fragment>
  );
};
export default StudentInfo;
