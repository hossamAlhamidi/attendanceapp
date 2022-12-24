import React, { Fragment, useState } from 'react';
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
  CardFooter,
  Heading,
  CardBody,
  Text,
  Flex,
  SimpleGrid,
  useDisclosure,
  Label,
  useToast,
  Checkbox,CheckboxGroup
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useGetAllCourses } from '../../services/query/courses';
import CardStructure from '../../components/Card';
import ModalTemplate from '../../components/ModalTemplate';
import { useFormik } from 'formik';
import { useAddCourse } from '../../services/query/courses';
import TableTemplate from '../../components/Table';
import { courseTableHeader } from '../../data/courses.headers';
const Courses = () => {
  const [search, setSearch] = useState('');
  const toast = useToast()
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
              data = {coursesData}
              isLoading={isLoadingCourses}
              actions={[]}
              />
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
    </Fragment>
  );
};

export default Courses;
