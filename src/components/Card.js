import React, { Fragment } from 'react'
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
    SimpleGrid
  } from '@chakra-ui/react';
  import { Link,useParams } from 'react-router-dom';
const CardStructure = ({data}) => {
  // const params = useParams();
  // const {id} = params
  return (
    <SimpleGrid minChildWidth='300px' spacing='40px' mt={'2em'}>
        {  data.map((element,index)=>{
                return (
                    <Card key={element?.section_id}>       
                    <CardHeader>
                              <Flex justifyContent={'space-between'}>
                              <Heading size='sm'>Course: {element?.course_id}</Heading>
                              <Heading size='sm'>Section: {element?.section_id}</Heading>
                              </Flex>
                            </CardHeader>
                            <CardBody>
                              <Text>Instructor Name: {element?.instructor_name}</Text>
                              <Text>classroom: {element?.classroom}</Text>
                              <Text>time: {element?.time}</Text>
                            </CardBody>
                            <CardFooter>
                              <Link to={`/sections/${element.section_id}`}><Button>View here</Button></Link>
                            </CardFooter>
                          </Card>
                )
            })}
    </SimpleGrid>
   
  )
}

export default CardStructure