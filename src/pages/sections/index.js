import React, { Fragment,useState,useMemo } from 'react'
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
import _ from 'lodash';
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
import Pagination from '../../components/pagination';
import { isEmpty } from '../../components/ModalTemplate';
const Sections = () => {
  const navigate = useNavigate()
  const [search,setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {data,isLoading,refetch} = useGetAllSections({
    onSuccess:(res)=>{
      console.log(res,'success')
    },
    onError:(err)=>{
      console.log(err,'error')
    }
  })

  const currentData = useMemo(() => {
     if (data) {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return [...data].slice(firstPageIndex, lastPageIndex);
    }
    return [];
  }, [data,currentPage,pageSize]);
  
  const keys = ['section_id','course_id','course_name','type','instructor_name']
  const handleFilterData = (param) => {
    if (isEmpty(param)) {
      return currentData;
    }
    // let filtered = currentData.filter((item) =>
    //   _.some(keys, (key) =>
    //     item[key]?.toString().toLowerCase()?.includes(param.toLowerCase()),
    //   ),
    // );
    let filtered = currentData.filter((item) => {
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
               data={handleFilterData(search)}
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
               emptyState={<EmptyState message={'No sections'}/>}
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
                ? data?.length || 0
                : handleFilterData(search).length
            }
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Flex>
              

          {/* {
            !isLoading&&<CardStructure data={data}/>
          }    */}

{/* <ModalTemplate isOpen={isOpen} onClose={onClose} title={'Add Section'} > */}

        

         
       
          
    </Fragment>
  )
}

export default Sections