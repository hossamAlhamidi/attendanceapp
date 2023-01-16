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
  Icon
} from '@chakra-ui/react';
import EmptyState from '../../components/EmptyState';
import { AiOutlineEye } from 'react-icons/ai';
import {  FiSearch } from 'react-icons/fi';
import { useGetAllSections } from '../../services/query/sections';
import CardStructure from '../../components/Card';
import { Link } from 'react-router-dom';
import ModalTemplate from '../../components/ModalTemplate';
import TableTemplate from '../../components/Table';
import { sectionTableHeader } from '../../data/section.header';
import { useNavigate } from 'react-router-dom';
import { useGetInstructorSections } from '../../services/query/sections';
import { useAuthPermission } from '../../hook/useAuthPermission';
const Sections = () => {
  const navigate = useNavigate()
  const [search,setSearch] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {data,isLoading,refetch} = useGetInstructorSections(useAuthPermission()?.instructor_id,{
    onSuccess:(res)=>{
      console.log(res,'success')
    },
    onError:(err)=>{
      console.log(err,'error')
    }
  })
  
  return (
    <Fragment>
        <Flex alignItems={'center'} justifyContent={'space-between'} my={5}>
        <Button marginRight={'10px'} ><Link to={`/addsection`}>Add Section</Link></Button>
        
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
               columns={sectionTableHeader}
               data={data}
               isLoading={isLoading}
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
                  onPress: (item) =>
                    navigate(`/sections/${item.section_id}`, {
                      // state: { type: item.organization_type },
                    }),
                 
                },
               ]}
               emptyState={<EmptyState message={'No added sections'}/>}
              />

          {/* {
            !isLoading&&<CardStructure data={data}/>
          }    */}

{/* <ModalTemplate isOpen={isOpen} onClose={onClose} title={'Add Section'} > */}

        

         
       
          
    </Fragment>
  )
}

export default Sections