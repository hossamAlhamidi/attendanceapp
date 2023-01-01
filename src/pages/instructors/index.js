import React, { Fragment,useState } from 'react'
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
  useDisclosure,
  Select,
  Wrap,
  WrapItem,
  Icon,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { AiOutlineEye } from 'react-icons/ai';
import {  FiSearch } from 'react-icons/fi';
import { useGetAllSections } from '../../services/query/sections';
import CardStructure from '../../components/Card';
import { Link } from 'react-router-dom';
import ModalTemplate from '../../components/ModalTemplate';
import TableTemplate from '../../components/Table';
import { sectionTableHeader } from '../../data/section.header';
import { useNavigate } from 'react-router-dom';
import { useGetAllInstructor } from '../../services/query/instructors';
import { instructorsTableHeader } from '../../data/instructors.headers';
import EmptyState from '../../components/EmptyState';
import { useAddInstructor } from '../../services/query/instructors';
const Instructors = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [search,setSearch] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {data:instructors,isLoading:isLoadingInstructor,refetch:getAllInstructors} = useGetAllInstructor({
        onError:(err)=>{
            console.log(err)
        }
    })

    const {mutate:addInstructor,data,isLoading:isLoadingAddInstructor} = useAddInstructor({
        onSuccess:(res)=>{
            console.log(res,"mutate")
            formik.resetForm();
            onClose()
            getAllInstructors();
            toast({
              title: 'Successful',
              description: 'Instructor has been added',
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

    const initialValues = {
        instructor_id:"",
        instructor_name:"",
        email:"",
        phone_number:""
    }
    const formik = useFormik({
        initialValues: initialValues ,
        onSubmit: (values) => {
          console.log(values)
           addInstructor(values);
         
          
          // setInitialValues(initValues)
        },
      });
  return (
    <Fragment>
         <Flex alignItems={'center'} justifyContent={'space-between'} my={5}>
        <Button marginRight={'10px'} onClick={onOpen}>Add Instructor</Button>
        
       <Box maxW={['100%','50%']} my={'10px'}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                  />

                  <Input
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    value={search}
                  />
                  <InputLeftElement children={<FiSearch color="green.500" />} />
                </InputGroup>
                
              </Box>
              </Flex>

              <TableTemplate
        columns={instructorsTableHeader}
        data={instructors}
        actions={[
        //   {
        //     aria_label: 'View ',
        //     icon: (
        //       <Icon
        //         as={AiOutlineEye}
        //         h={4}
        //         w={4}
        //         color={useColorModeValue(
        //           'lightMode.primary.default',
        //           'darkMode.secondary.gray'
        //         )}
        //       />
        //     ),
        //     onPress: (item) =>
        //       navigate(`/students/${item.student_id}`, {
        //         // state: { type: item.organization_type },
        //       }),
           
        //   },
         ]}
        isLoading={isLoadingInstructor}
        emptyState={<EmptyState message={'No Instructors added'}/>}
        />

<ModalTemplate isOpen={isOpen} onClose={onClose} title={'Add Course'} >
        <form onSubmit={formik.handleSubmit}>
          <Box mx={'5px'}>
            <Text mb='8px'>Instructor Name </Text>
            <Input
              id='instructor_name'
              name='instructor_name'
              onChange={formik.handleChange}
              value={formik.values.instructor_name}
              placeholder='@example hossam '
              size='md'
              mb={'10px'}
            />
            <Text mb='8px'>Instructor ID </Text>
            <Input
              id='instructor_id'
              name='instructor_id'
              onChange={formik.handleChange}
              value={formik.values.instructor_id}
              placeholder='@example 439'
              size='md'
              mb={'10px'}
            />
            <Text mb='8px'>email </Text>
            <Input
              id='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder='example@gmail.com'
              size='md'
              mb={'10px'}
            />

            <Text mb='8px'>Phone Number </Text>
            <Input
              id='phone_number'
              name='phone_number'
            //   type={'number'}
              onChange={formik.handleChange}
              value={formik.values.phone_number}
              placeholder='0501906666'
              size='md'
              mb={'10px'}
            />

          </Box>
          <Flex alignItems={'center'}>
            <Button isLoading={isLoadingAddInstructor} type='submit' m={'10px'} colorScheme={'blue'}>
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
  )
}

export default Instructors