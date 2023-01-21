import React, { Fragment, useState ,useMemo} from 'react';
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
  Checkbox,CheckboxGroup,
  Icon
} from '@chakra-ui/react';
import Prompt from '../../components/Prompt';
import { isEmpty } from '../../components/ModalTemplate';
import Pagination from '../../components/pagination';
import EmptyState from '../../components/EmptyState'
import { FiSearch } from 'react-icons/fi';
import { useGetAllCourses } from '../../services/query/courses';
import CardStructure from '../../components/Card';
import ModalTemplate from '../../components/ModalTemplate';
import { useFormik } from 'formik';
import { useAddCourse } from '../../services/query/courses';
import TableTemplate from '../../components/Table';
import { courseTableHeader } from '../../data/courses.headers';
import { CgRowFirst, CgTrashEmpty } from 'react-icons/cg';
import { useDeleteCourse } from '../../services/query/courses';
const Courses = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const toast = useToast()
  const confirmPrompt = useDisclosure();
  const [deletedItem,setDeletedItem] = useState(null)
  const initValues ={
    course_name: '',
    course_id: '',
    abbreviation: '',
    course_hours:"",
    has_tutorial:true,
    has_lab:false
  }
    const [initialValues, setInitialValues] = useState(initValues)
  const { isOpen, onOpen, onClose } = useDisclosure();
  //get courses
  const { data:coursesData, isLoading:isLoadingCourses, refetch:getAllCourses } = useGetAllCourses({
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
  }, [coursesData,currentPage,pageSize]);

    const keys = ['course_id','course_name']
  const handleFilterData = (param) => {
    if (isEmpty(param)) {
      return currentData;
    }
  
    let filtered = coursesData?.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (item[key] && item[key].toString().toLowerCase().includes(param.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    return filtered;
  };
  // add course 
  const {mutate:addCourse,data,isLoading:isLoadingAddCourse} = useAddCourse({
    onSuccess:(res)=>{
      console.log(res,"mutate")
      formik.resetForm();
      onClose()
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
    onError:(err)=>{
      console.log(err)
      toast({
        title: 'Error',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  })

  // delete course 
  const {mutate:deleteCourse,isLoading:isLoadingDelete} = useDeleteCourse({
    onSuccess:(res)=>{
      console.log(res,'deleted')
      confirmPrompt.onClose();
      getAllCourses()
      toast({
        title: 'Deleted',
        description: 'Course has been Deleted',
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
  const handleDelete = (id)=>{
    deleteCourse(id)
 
  }

  const formik = useFormik({
    initialValues: initialValues ,
    onSubmit: (values) => {
      console.log(values)
       addCourse(values);
     
      
      // setInitialValues(initValues)
    },
  });
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
              data = {isEmpty(search)?currentData:handleFilterData(search)}
              isLoading={isLoadingCourses}
              emptyState={<EmptyState message={!search?`No courses added yet`:`No results`}/>}
              actions = {
                [
                  {
                    aria_label: 'Delete Course',
                    icon: <Icon as={CgTrashEmpty} color={'red'} />,
                    onPress: (item) => {
                      
                      setDeletedItem(item.course_id)
   
                      confirmPrompt.onOpen();
                    },
                  },
                ]
              }
              />

         <Flex w="100%" paddingTop="24px">
          <Flex flex={1}></Flex>
          <Select
            w="190px"
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
      {/* {!isLoadingCourses && (
        <SimpleGrid minChildWidth='300px' spacing='40px' mt={'2em'}>
          {coursesData.map((element, index) => {
            return (
              <Card key={element?.course_id}>
                <CardHeader>
                  <Flex justifyContent={'space-between'}>
                    <Heading size='sm'>
                      Course: {element?.abbreviation + ' ' + element?.course_id}
                    </Heading>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text>Course Name: {element?.course_name}</Text>
                </CardBody>
                <CardFooter>
                  <Button>View here</Button>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      )} */}

      <ModalTemplate isOpen={isOpen} onClose={onClose} title={'Add Course'} >
        <form onSubmit={formik.handleSubmit}>
          <Box mx={'5px'}>
            <Text mb='8px'>Course Name </Text>
            <Input
              id='course_name'
              name='course_name'
              onChange={formik.handleChange}
              value={formik.values.course_name}
              placeholder='@example Project Software Management '
              size='md'
              mb={'10px'}
            />
            <Text mb='8px'>Course Id </Text>
            <Input
              id='course_id'
              name='course_id'
              onChange={formik.handleChange}
              value={formik.values.course_id}
              placeholder='@example 466'
              size='md'
              mb={'10px'}
            />
            <Text mb='8px'>abbreviation </Text>
            <Input
              id='abbreviation'
              name='abbreviation'
              onChange={formik.handleChange}
              value={formik.values.abbreviation}
              placeholder='@example i.e SWE'
              size='md'
              mb={'10px'}
            />

            <Text mb='8px'>Course Hours </Text>
            <Input
              id='course_hours'
              name='course_hours'
              type={'number'}
              max={6}
              min={1}
              onChange={formik.handleChange}
              value={formik.values.course_hours}
              placeholder='@example 3'
              size='md'
              mb={'10px'}
            />

{/* <CheckboxGroup colorScheme='green' defaultValue={['has_tutorial']}> */}
  <Stack my={4} spacing={[1, 5]} direction="row" >
    <Checkbox defaultChecked name='has_tutorial' id='has_tutorial' value={formik.values.has_tutorial} onChange={formik.handleChange} >has tutorial</Checkbox>
    <Checkbox name='has_lab' id='has_lab' value={formik.values.has_lab} onChange={formik.handleChange}>has lab</Checkbox>
  </Stack>
{/* </CheckboxGroup> */}
          </Box>
          <Flex alignItems={'center'}>
            <Button isLoading={isLoadingAddCourse} type='submit' m={'10px'} colorScheme={'blue'}>
              Submit
            </Button>
            <Button type='button' m={'10px'} onClick={()=>{
              onClose()
              formik.resetForm()
            }}>
              Cancel
            </Button>
          </Flex>
        </form>
      </ModalTemplate>

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

export default Courses;
