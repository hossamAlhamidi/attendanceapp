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
import { AiOutlineEye } from 'react-icons/ai';
import {  FiSearch } from 'react-icons/fi';
import { useGetAllSections } from '../../services/query/sections';
import CardStructure from '../../components/Card';
import { Link } from 'react-router-dom';
import ModalTemplate from '../../components/ModalTemplate';
import TableTemplate from '../../components/Table';
import { sectionTableHeader } from '../../data/section.header';
import { useNavigate } from 'react-router-dom';
const Sections = () => {
  const navigate = useNavigate()
  const [search,setSearch] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <Flex alignItems={'center'} justifyContent={'space-between'} my={5}>
        <Button marginRight={'10px'}><Link to={`/addsection`}>Add Section</Link></Button>
        
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
              />

          {/* {
            !isLoading&&<CardStructure data={data}/>
          }    */}

{/* <ModalTemplate isOpen={isOpen} onClose={onClose} title={'Add Section'} > */}

        

         
        {/* <form onSubmit={formik.handleSubmit}>
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


  <Stack my={4} spacing={[1, 5]} direction="row" >
    <Checkbox defaultChecked name='has_tutorial' id='has_tutorial' value={formik.values.has_tutorial} onChange={formik.handleChange} >has tutorial</Checkbox>
    <Checkbox name='has_lab' id='has_lab' value={formik.values.has_lab} onChange={formik.handleChange}>has lab</Checkbox>
  </Stack>

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
        </form> */}
      {/* </ModalTemplate> */}
          
    </Fragment>
  )
}

export default Sections