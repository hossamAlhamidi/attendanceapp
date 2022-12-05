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
  Flex
} from '@chakra-ui/react';
import {  FiSearch } from 'react-icons/fi';
import { useGetAllSections } from '../../services/query/sections';
import CardStructure from '../../components/Card';
const Sections = () => {
  const [search,setSearch] = useState("")

  const {data,isLoading,refetch} = useGetAllSections({
    onSuccess:(res)=>{
      console.log(res,'success')
    },
    onError:(err)=>{
      console.log(err,'error')
    }
  })
  return (
    <Fragment>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Button marginRight={'10px'}>Add Section</Button>
        
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

          {
            !isLoading&&<CardStructure data={data}/>
          }   
          
    </Fragment>
  )
}

export default Sections