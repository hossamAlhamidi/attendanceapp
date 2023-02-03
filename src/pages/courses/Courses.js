import React, { Fragment, useState, useMemo } from 'react';
import {
  Box,
  Input,
  useColorModeValue,
  InputGroup,
  Button,
  Stack,
  InputLeftElement,
  Card,
  CardHeader,
  Select,
  CardFooter,
  Heading,
  CardBody,
  Text,
  Flex,
  SimpleGrid,
  useDisclosure,
  Label,
  useToast,
  Checkbox,
  CheckboxGroup,
  Icon,
} from '@chakra-ui/react';
import CourseForm from './CourseForm';
import Prompt from '../../components/Prompt';
import { isEmpty } from '../../components/ModalTemplate';
import Pagination from '../../components/pagination';
import EmptyState from '../../components/EmptyState';
import { FiSearch } from 'react-icons/fi';
import { useGetAllCourses } from '../../services/query/courses';
import CardStructure from '../../components/Card';
import ModalTemplate from '../../components/ModalTemplate';
import { useFormik } from 'formik';
import { useAddCourse } from '../../services/query/courses';
import TableTemplate from '../../components/Table';
import { courseTableHeader } from '../../data/courses.headers';
import { TbPencil } from 'react-icons/tb';
import { CgRowFirst, CgTrashEmpty } from 'react-icons/cg';
import { useDeleteCourse,useUpdateCourse } from '../../services/query/courses';
import * as Yup from 'yup'

const addCourseValidation = Yup.object().shape({
  course_id:Yup.string().min(3).max(7).required("Required"),
  course_name:Yup.string().matches(/^[^\d]+$/, 'Name cannot contain numbers').min(3).required("Required"),
  abbreviation:Yup.string().min(3).max(6).required("Required"),
  course_hours:Yup.number().min(1).max(6).required("Required")
})
const Courses = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const toast = useToast();
  const confirmPrompt = useDisclosure();
  const [deletedItem, setDeletedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const initValues = {
    course_name: '',
    course_id: '',
    abbreviation: '',
    course_hours: '',
    has_tutorial: true,
    has_lab: false,
  };
  const [initialValues, setInitialValues] = useState(initValues);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editModal = useDisclosure();
  //get courses
  const {
    data: coursesData,
    isLoading: isLoadingCourses,
    refetch: getAllCourses,
  } = useGetAllCourses({
    onSuccess: (res) => {
      console.log(res, 'success');
    },
    onError: (err) => {
      console.log(err, 'error');
    },
  });

  const currentData = useMemo(() => {
    if (coursesData) {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return [...coursesData].slice(firstPageIndex, lastPageIndex);
    }
    return [];
  }, [coursesData, currentPage, pageSize]);

  const keys = ['course_id', 'course_name'];
  const handleFilterData = (param) => {
    if (isEmpty(param)) {
      return currentData;
    }

    let filtered = coursesData?.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (
          item[key] &&
          item[key].toString().toLowerCase().includes(param.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });

    return filtered;
  };
  // add course
  const {
    mutate: addCourse,
    data,
    isLoading: isLoadingAddCourse,
  } = useAddCourse({
    onSuccess: (res) => {
      console.log(res, 'mutate');
      formik.resetForm();
      onClose();
      getAllCourses();
      toast({
        title: 'Successful',
        description: 'Your course has been added',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: 'Error',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  // update course
  const { mutate: updateCourse, isLoading: isUpdating } =
  useUpdateCourse({
    onSuccess: () => {
      // setEditCognnaAdmin(res.data);
      editModal.onClose();
      getAllCourses();
      toast({
        title: 'Updated',
        description: 'Course is updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  // delete course
  const { mutate: deleteCourse, isLoading: isLoadingDelete } = useDeleteCourse({
    onSuccess: (res) => {
      console.log(res, 'deleted');
      confirmPrompt.onClose();
      getAllCourses();
      toast({
        title: 'Deleted',
        description: 'Course has been Deleted',
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
  const handleCloseDeleteModal = () => {
    setDeletedItem(null);
    confirmPrompt.onClose();
  };
  const handleDelete = (id) => {
    deleteCourse(id);
  };

  const [formData, setFormData] = useState(initialValues);
  const formik = useFormik({
    initialValues: formData,
    validationSchema:addCourseValidation,
    enableReinitialize: true,
    isInitialValid:isEditing?true:false,
    onSubmit: (values) => {
      if (isEditing) {
        let payload = {
         course_id:values.course_id,
         course_name:values.course_name,
         course_hours:values.course_hours

        };
        updateCourse(payload)
      } else {
        addCourse(values);
      }

      // setInitialValues(initValues)
    },
  });

  const onPressEdit = (course) => {
    let courseData = {
      course_id: course.course_id,
      course_name: course.course_name,
      abbreviation: course.course_id.split(" ")[0],
      course_hours: course.course_hours,
      has_tutorial: course.has_tutorial,
      has_lab: course.has_lab,
    };
    // setEditCognnaAdmin(dataAdmin);
    setFormData(courseData);
    setIsEditing(true);
  };
  return (
    <Fragment>
      <Flex alignItems={'center'} justifyContent={'space-between'} my={5}>
        <Button marginRight={'10px'} onClick={onOpen}>
          Add Course
        </Button>
        <Box maxW={['100%', '50%']} my={'10px'}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='1.2em'
            />

            <Input
              placeholder='Search...'
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
            <InputLeftElement children={<FiSearch color='green.500' />} />
          </InputGroup>
        </Box>
      </Flex>

      <TableTemplate
        columns={courseTableHeader}
        data={isEmpty(search) ? currentData : handleFilterData(search)}
        isLoading={isLoadingCourses}
        emptyState={
          <EmptyState
            message={!search ? `No courses added yet` : `No results`}
          />
        }
        actions={[
          {
            aria_label: 'Edit Course',
            icon: (
              <Icon
                as={TbPencil}
                h={4}
                w={4}
                color={'lightMode.secondary.lightBlue'}
              />
            ),
            onPress: (item) => {
              onPressEdit(item);
              editModal.onOpen();
            },
          },
          {
            aria_label: 'Delete Course',
            icon: <Icon as={CgTrashEmpty} color={'red'} />,
            onPress: (item) => {
              setDeletedItem(item.course_id);

              confirmPrompt.onOpen();
            },
          },
        ]}
      />

      <Flex w='100%' paddingTop='24px'>
        <Flex flex={1}></Flex>
        <Select
          w='190px'
          defaultValue={20}
          onChange={(e) => {
            setPageSize(parseInt(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10 Items Per Page</option>
          <option value={20}>20 Items Per Page</option>
          <option value={50}>50 Items Per Page</option>
          <option value={100}>100 Items Per Page</option>
        </Select>
        <Pagination
          currentPage={currentPage}
          totalCount={
            isEmpty(search)
              ? coursesData?.length || 0
              : handleFilterData(search).length
          }
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Flex>

      <ModalTemplate
        isOpen={isOpen}
        onClose={onClose}
        title={'Add Course'}
        onCloseComplete={() => {
          formik.resetForm({ values: initialValues });
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <CourseForm
            formik={formik}
            isLoading={isLoadingAddCourse}
            onClose={onClose}
            isEditing={isEditing}
          />
        </form>
      </ModalTemplate>

      <ModalTemplate
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        title={'Edit Course'}
        onCloseComplete={() => {
          // setEditObject(initialValues);
          setIsEditing(false);
          formik.resetForm({ values: initialValues });
          // formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit}>
        
          <CourseForm
            formik={formik}
            isLoading={isUpdating}
            onClose={editModal.onClose}
            isEditing={isEditing}
          />
        </form>
      </ModalTemplate>

      <Prompt
        isOpen={confirmPrompt.isOpen}
        onClose={() => {
          handleCloseDeleteModal();
        }}
        title={`Are you sure you want to delete this record id:${deletedItem}?`}
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

export default Courses;
