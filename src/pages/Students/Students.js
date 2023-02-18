import React, { Fragment, useState } from 'react';
import {
  Box,
  Input,
  useColorModeValue,
  InputGroup,
  Button,
  InputLeftElement,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { AiOutlineEye } from 'react-icons/ai';
import { useAuthPermission } from '../../hook/useAuthPermission';
import { FiSearch } from 'react-icons/fi';
import { useGetStudentById } from '../../services/query/student';
import { useNavigate } from 'react-router-dom';
import TableTemplate from '../../components/Table';
import { studentsTableHeader } from '../../data/students.headers';
const Students = () => {
  const [search, setSearch] = useState('');
  const toast = useToast();
  const { instructor_id } = useAuthPermission();
  const navigate = useNavigate();
  const { data, mutate, isLoading } = useGetStudentById({
    onSuccess: (res) => {
      console.log(res, 'success');
    },
    onError: (err) => {
      console.log(err, 'error');
      toast({
        title: 'Not Found',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // mutate(search)
    mutate({
      student_id: search,
      instructor_id: instructor_id,
    });
    setSearch('');
  };

  const navigateTo = (student) => {
    navigate(`/students/${student?.student_id}`, {
      state: { student: student },
    });
  };
  return (
    <Fragment>
      <Box maxW={['100%', '50%']} mx={'auto'} my={'10px'}>
        <form onSubmit={handleSubmit}>
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
            <Button type='submit' mx={'5px'}>
              Submit
            </Button>
          </InputGroup>
        </form>
      </Box>
      <TableTemplate
        columns={studentsTableHeader}
        data={data}
        //  isLoading={isLoading}
        actions={[
          {
            aria_label: 'View ',
            icon: (
              <Icon
                as={AiOutlineEye}
                h={4}
                w={4}
                color={useColorModeValue(
                  'lightMode.primary.default',
                  'darkMode.secondary.gray'
                )}
              />
            ),
            onPress: (item) => navigateTo(item),
          },
        ]}
        //  emptyState={<EmptyState message={'No Founded Students'}/>}
      />

      {/* { !isLoading&&!isEmpty(data)?
       data.map((element)=>{
        return(
          <Card key={element.student_id} my={20}>
            <CardHeader>
                              <Flex justifyContent={'space-between'}>
                              <Heading size='sm'>name: {element?.student_name}</Heading>
                              <Heading size='sm'>id: {element?.student_id}</Heading>
                              </Flex>
                            </CardHeader>
                            <CardBody>
                              <Text>email: {element?.email}</Text>
                              <Text>phone: {element?.phone_number}</Text>
                      
                            </CardBody>
                            <CardFooter>
                             
                                
                                <Button onClick={()=>navigateTo(element)}>View here</Button>
                              
                            </CardFooter>
          </Card>
        )
       })
       :null
      //  !isLoading&&<Text textAlign={'center'} fontWeight={'bold'} my={20}>No student found</Text>
     } */}
    </Fragment>
  );
};

export default Students;
