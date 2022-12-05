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
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useGetAllCourses } from '../../services/query/courses';
import CardStructure from '../../components/Card';
import ModalTemplate from '../../components/ModalTemplate';
import { useFormik } from 'formik';
import { useAddCourse } from '../../services/query/courses';
const Courses = () => {
  const [search, setSearch] = useState('');
 
  const initValues ={
    course_name: '',
    course_id: '',
    abbreviation: '',
  }
    const [initialValues, setInitialValues] = useState(initValues)
  const { isOpen, onOpen, onClose } = useDisclosure();
  //get courses
  const { data:sectionsData, isLoading:isLoadingSections, refetch:refetchSections } = useGetAllCourses({
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
      refetchSections();
    },
    onError:(err)=>{
      console.log(err)
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
      <Flex alignItems={'center'} justifyContent={'space-between'}>
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

      {!isLoadingSections && (
        <SimpleGrid minChildWidth='300px' spacing='40px' mt={'2em'}>
          {sectionsData.map((element, index) => {
            return (
              <Card key={element?.course_id}>
                <CardHeader>
                  <Flex justifyContent={'space-between'}>
                    <Heading size='sm'>
                      Course: {element?.abbreviation + ' ' + element?.course_id}
                    </Heading>
                    {/* <Heading size='sm'>Section: {element?.section_id}</Heading> */}
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
      )}

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
