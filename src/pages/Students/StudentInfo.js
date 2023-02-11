import React, { Fragment, useEffect, useState, useMemo, useRef } from 'react';
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

import TableTemplate from '../../components/Table';
import { studentAbsenceTableHeader } from '../../data/studentAbsence.header';
import { useDeleteAbsence,useAddExcuse,useGetAbsenceForStudent,useUpdateStudent,useGetStudentByIdAlt,useGetExcuseForStudent } from '../../services/query/student';
import Prompt from '../../components/Prompt';
import { useAuthPermission } from '../../hook/useAuthPermission';
import * as Yup from 'yup';
import DeleteAbsencePrompt from '../../components/DeleteAbsencePrompt';
import EditForm from './components/EditForm';
import { StudentAbsence } from './components/StudentAbsence';

// import cloudinary from 'cloudinary';

const editStudentValidation = Yup.object().shape({
  student_name: Yup.string()
    .matches(/^[^\d]+$/, 'Name cannot contain numbers')
    .min(3)
    .required('Required'),
  student_id: Yup.string().min(3).max(12).required('Required'),
  email: Yup.string().email().required('Required'),
  phone_number: Yup.string().length(10),
  mac_address: Yup.string().required("Required"),
});
const cloudName = process.env.REACT_APP_CLOUD_NAME;
const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
const StudentInfo = () => {
  const [image, setImage] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const toast = useToast();
  const confirmPrompt = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);
  const { id } = params;
  const { is_admin, instructor_id } = useAuthPermission();
  const { student } = location.state || '';
  const [isLoadingPostImage,setIsLoadingPostImage]= useState(false)
  const submitImage = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset',uploadPreset);
    data.append('cloud_name', cloudName);
    setIsLoadingPostImage(true)
    //https://api.cloudinary.com/v1_1/dtadrokvy/image/upload
    fetch('https://api.cloudinary.com/v1_1/dtadrokvy/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoadingPostImage(false)
        addExcuse({
          ...deletedItem,
          reason: reason,
          file: data?.url,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const initialValues = {
    student_id: '',
    student_name: '',
    email: '',
    phone_number: '',
    mac_address:''
  };
  const [studentInfo, setStudentInfo] = useState(initialValues);
  //   if (!student) {
  //     navigate('/students/');
  //     // window.location.href = '/students/';
  //     window.location.replace('/students/');
  //   }

  const {
    data: studentInformation,
    isLoading: isLoadingStudentInformation,
    refetch,
  } = useGetStudentByIdAlt(id, {
    onSuccess: (res) => {
      console.log(res, 'res');
      setStudentInfo({
        student_id: res[0]?.student_id,
        student_name: res[0]?.student_name,
        email: res[0]?.email,
        phone_number: res[0]?.phone_number || '',
        mac_address: res[0]?.mac_address || '',
      });
    },
    onError: (err) => {
      navigate(-1);
      console.log(err);
    },
    cacheTime: 0,
  });
  //  console.log(image,"image")
  //  console.log(reason,"reason")
  //  console.log(deletedItem,"del")
  const { mutate: updateStudent } = useUpdateStudent({
    onSuccess: (res) => {
      toast({
        title: 'Updated',
        description: 'Student Information has been Updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: 'Not Updated',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const {
    data: studentAbsence,
    isLoading: isLoadingStudentAbsence,
    refetch: getAllAbsence,
  } = useGetAbsenceForStudent(id, {
    onSuccess: (res) => {},
  });

  const {
    data: studentExcuse,
    isLoading: isLoadingStudentExcuse,
    refetch: getAllExcuse,
  } = useGetExcuseForStudent(id, {
    onSuccess: (res) => {},
  });

  const { mutate: deleteAbsence, isLoading: isLoadingDelete } =
    useDeleteAbsence({
      onSuccess: (res) => {
        console.log(res, 'deleted');
        confirmPrompt.onClose();
        getAllAbsence();
        getAllExcuse()
        toast({
          title: 'Deleted',
          description: 'Student Absence has been Deleted',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
      onError: (err) => {
        toast({
          title: 'Not Deleted',
          description: err?.response?.data?.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    });

  const {
    mutate: addExcuse,
    isLoading: isLoadingExcuse,
    // refetch: getAllExcuse,
  } = useAddExcuse({
    onSuccess: (res) => {
      handleDelete(deletedItem);
    },
    onError: (err) => {
      toast({
        title: 'Excuse not added',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const handleCloseDeleteModal = () => {
    setDeletedItem(null);
    setImage("")
    setReason("")
    confirmPrompt.onClose();
  };
  const handleDelete = (body) => {
    deleteAbsence(body);
  };

  const formik = useFormik({
    initialValues: studentInfo,
    validationSchema: editStudentValidation,
    isInitialValid: true,
    onSubmit: (values) => {
      console.log(values, 'submit');
      updateStudent({
        id: student?.student_id,
        body: {
          student_id: values.student_id,
          student_name: values.student_name,
          email: values.email,
          phone_number: values.phone_number,
          mac_address: values.mac_address,
        },
      });
      refetch();
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

  const currentStudentExcuse = useMemo(() => {
    if (studentExcuse) {
      return [...studentExcuse];
    }
    return [];
  }, [studentExcuse]);


 // could be enhanced by doing an array to loop through components
  return (
    <Fragment>
      <Box my={5}>
        <IoIosArrowBack
          size={24}
          cursor='pointer'
          onClick={() => navigate(-1)}
        />
      </Box>

      {is_admin ? (
        <Tabs>
          <TabList>
            <Tab>Student Info</Tab>
            <Tab>Student Absences</Tab>
            <Tab>Removed Absences</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <EditForm
                formik={formik}
                isLoadingStudentInformation={isLoadingStudentInformation}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
            </TabPanel>
            <TabPanel>
             <StudentAbsence
              studentAbsence={studentAbsence}
              isLoadingStudentAbsence={isLoadingStudentAbsence}
              confirmPrompt={confirmPrompt}
              currentStudentAbsence={currentStudentAbsence}
              setDeletedItem={setDeletedItem}      
             />
            </TabPanel>
            <TabPanel>
            <StudentAbsence
              studentAbsence={studentExcuse}
              isLoadingStudentAbsence={isLoadingStudentExcuse}
              confirmPrompt={confirmPrompt}
              currentStudentAbsence={currentStudentExcuse}
              setDeletedItem={setDeletedItem}  
              isExcuse={true} 
                 
             />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        // =========================================================================================== else
        <Tabs>
          <TabList>
            <Tab>Student Absences</Tab>
            <Tab>Removed Absences</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
            <StudentAbsence
              studentAbsence={studentAbsence}
              isLoadingStudentAbsence={isLoadingStudentAbsence}
              confirmPrompt={confirmPrompt}
              currentStudentAbsence={currentStudentAbsence}
              setDeletedItem={setDeletedItem}      
             />
            </TabPanel>
            <TabPanel>
            <StudentAbsence
              studentAbsence={studentExcuse}
              isLoadingStudentAbsence={isLoadingStudentExcuse}
              confirmPrompt={confirmPrompt}
              currentStudentAbsence={currentStudentExcuse}
              setDeletedItem={setDeletedItem}  
              isExcuse={true} 
                 
             />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      <DeleteAbsencePrompt
        isOpen={confirmPrompt.isOpen}
        onClose={() => {
          handleCloseDeleteModal();
        }}
        title={'Please provide us with the reason'}
        isUpload={true}
        setImage={setImage}
        image={image}
        setReason={setReason}
        reason={reason}
        buttons={[
          {
            label: 'Delete',
            type: 'danger',
            onPress: () => {
              // handleDelete(deletedItem);
              isEmpty(image?.name)? addExcuse({
                ...deletedItem,
                reason: reason, 
                file:""            
              }):submitImage();
              // submitImage();
            
            },
            styles: {
              paddingX: 50,
            },
            isLoading: isLoadingPostImage||isLoadingExcuse||isLoadingDelete,
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
