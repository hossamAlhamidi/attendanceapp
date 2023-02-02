import React, { Fragment, useEffect, useState ,useMemo,useRef} from 'react';
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
  FormControl
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
import { useAuthPermission } from '../../hook/useAuthPermission';
import * as Yup from 'yup'
import DeleteAbsencePrompt from '../../components/DeleteAbsencePrompt'
import { useAddExcuse } from '../../services/query/student';
// import cloudinary from 'cloudinary';

const editStudentValidation = Yup.object().shape({
  student_name:Yup.string().matches(/^[^\d]+$/, 'Name cannot contain numbers').min(3).required("Required"),
  student_id:Yup.string().min(3).max(12).required("Required"),
  email:Yup.string().email().required("Required"),
  phone_number:Yup.string().length(10),

})
const StudentInfo = () => {
  const [image,setImage] = useState("")
  const [reason,setReason] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const toast = useToast();
  const confirmPrompt = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [deletedItem,setDeletedItem] = useState(null)
  const { id } = params;
  const {is_admin,instructor_id} = useAuthPermission()
  const { student } = location.state || '';
  const inputFile = useRef(null);
  const submitImage = ()=>{

    const data = new FormData();
    data.append('file',image);
    data.append('upload_preset','tzrozs1z')
    data.append('cloud_name','dtadrokvy')
    //https://api.cloudinary.com/v1_1/dtadrokvy/image/upload
    fetch('https://api.cloudinary.com/v1_1/dtadrokvy/image/upload',{
        method:'post',
        body:data
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        addExcuse({
          ...deletedItem,
          reason:reason,
          file:data?.url
        })
    }).catch((err)=>{
        console.log(err)
    })
  }
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
       navigate(-1)
        console.log(err)
    },
    cacheTime: 0
  })
 console.log(image,"image")
 console.log(reason,"reason")
 console.log(deletedItem,"del")
  const {mutate:updateStudent} = useUpdateStudent({
    onSuccess:(res)=>{

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

  const {mutate:addExcuse,isLoading:isLoadingExcuse,refetch:getAllExcuse} = useAddExcuse({
    onSuccess:(res)=>{
      handleDelete(deletedItem)
    },
    onError:(err)=>{
      toast({
        title: 'Excuse not added',
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
 
  }
 

  const formik = useFormik({
    initialValues: studentInfo,
    validationSchema:editStudentValidation,
    isInitialValid:true,
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

     { is_admin?<Tabs>
        <TabList>
          <Tab>Student Info</Tab>
          <Tab>Student Absences</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          {!isLoadingStudentInformation? <Card my={5}>
              <CardBody>
                <Flex justifyContent={'flex-end'}>
                  <Button onClick={() => setIsEdit(!isEdit)} mb={10}>
                    {isEdit ? <HiLockClosed /> : <HiLockOpen />}
                  </Button>
                </Flex>
               <SimpleGrid columns={[1, 2]} spacing={10}>
                <FormControl>
                  <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Student ID</FormLabel>
                <Input
                    placeholder='Student ID'
                    name='student_id'
                    id='student_id'
                    value={values?.student_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={true}
                  />
                </FormControl>
                 
                 <FormControl>
                 <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Name</FormLabel>
                 <Input
                    placeholder='Name'
                    name='student_name'
                    id='student_name'
                    value={values?.student_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                    borderColor={formik.errors.student_name&&formik.touched.student_name && 'tomato' }
                  />
                    {formik.touched.student_name && formik.errors.student_name && (
              <Text color={'tomato'} >{formik.errors.student_name}</Text>
            )}
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
                    borderColor={formik.errors.email&&formik.touched.email && 'tomato' }
                  />
                    {formik.touched.email && formik.errors.email && (
              <Text color={'tomato'} >{formik.errors.email}</Text>
            )}
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
                    borderColor={formik.errors.phone_number&&formik.touched.phone_number && 'tomato' }
                  />
                    {formik.touched.phone_number && formik.errors.phone_number && (
              <Text color={'tomato'} >{formik.errors.phone_number}</Text>
            )}
                 </FormControl>
                 
                </SimpleGrid>
                
                <Button
                  onClick={() => formik.handleSubmit()}
                  mt={8}
                  isDisabled={!isEdit||!formik.isValid}
                >
                  Save
                </Button>
              </CardBody>
            </Card>: 
             <Box display={'flex'} justifyContent='center' mt={5}>
              <Spinner />
              </Box>
            }
          </TabPanel>
          <TabPanel>
            {
              !isLoadingStudentAbsence&&!isEmpty(studentAbsence)?
              <Card p={10}>
                {/* <Text>{JSON.stringify(Array.from(new Set(studentAbsence.filter((e)=>e.instructor_id=='Ahmad2131')?.map((e)=>e.section_id))))}</Text> */}
                {
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
                            aria_label: 'Delete absence',
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
              !isLoadingStudentAbsence&&<Text textAlign={'center'} mt={5}>No Absence for this student</Text>
              
            }
          </TabPanel>
        </TabPanels>
      </Tabs>
      :
      <Tabs>
      <TabList>
        <Tab>Student Absences</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {
            !isLoadingStudentAbsence&&!isEmpty(studentAbsence)?
            <Card p={10}>
              {/* <Text>{JSON.stringify(Array.from(new Set(studentAbsence.filter((e)=>e.instructor_id=='Ahmad2131')?.map((e)=>e.section_id))))}</Text> */}
              {
              Array.from(new Set(studentAbsence.filter((e)=>e.instructor_id==instructor_id)?.map((e)=>e.section_id)))
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
                          aria_label: 'Delete absence',
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
           !isLoadingStudentAbsence&& <Text textAlign={'center'} mt={5}>No Absence for this student</Text>
            
          }
        </TabPanel>
      </TabPanels>
    </Tabs>
}

      <DeleteAbsencePrompt
        isOpen={confirmPrompt.isOpen}
        onClose={() => {
          handleCloseDeleteModal();
        }}
        title={'Please provide us with the reason'}
        isUpload={true}
        setImage={setImage}
       
        setReason={setReason}
        reason={reason}
        buttons={[
          {
            label: 'Delete',
            type: 'danger',
            onPress: () => {
              // handleDelete(deletedItem);
              submitImage()
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
