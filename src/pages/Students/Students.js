import React, { Fragment, useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useGetStudentById } from '../../services/query/student';
import { isEmpty } from '../../components/ModalTemplate';
import { Link,useNavigate } from 'react-router-dom';
const Students = () => {
  const [search, setSearch] = useState('');
  const toast = useToast()
  const navigate = useNavigate()
   const {data,mutate,isLoading} = useGetStudentById({
    onSuccess:(res)=>{
      console.log(res,"success")
    },
    onError:(err)=>{
      console.log(err,"error");
      toast({
        title: 'Not Found',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
   })
 
   const handleSubmit = (e)=>{
    e.preventDefault();
    mutate(search)
    setSearch("")
    
   }

   const navigateTo = (student)=>{
    navigate(`/students/${student?.student_id}`,{
      state:{student:student}
    })
   }
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
        <Button type='submit' mx={'5px'}>Submit</Button>
        </InputGroup>
        </form>
      </Box>
     { !isLoading&&!isEmpty(data)?
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
                              {/* <Link to={`/students/${element.student_id}`}> */}
                                
                                <Button onClick={()=>navigateTo(element)}>View here</Button>
                                {/* </Link> */}
                            </CardFooter>
          </Card>
        )
       })
       :null
      //  !isLoading&&<Text textAlign={'center'} fontWeight={'bold'} my={20}>No student found</Text>
     }
    </Fragment>
  );
};

export default Students;
