import React, { Fragment, useRef } from 'react';
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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from '@chakra-ui/react';
import { IoIosArrowBack, IoIosClose } from 'react-icons/io';
import { useGetAllSectionStudents } from '../../services/query/sections';
import { useParams,useNavigate } from 'react-router-dom';
import { isEmpty } from '../../components/ModalTemplate';
import TableTemplate from '../../components/Table';
import { studentsSectionTableHeader } from '../../data/studentsSection.headers';
import EmptyState from '../../components/EmptyState';
const SectionInner = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const inputFile = useRef(null);
  const toast = useToast();

  // get list of students
  const {
    data: sectionStudents,
    isLoading: isLoadingSectionStudents,
    refetch,
  } = useGetAllSectionStudents(id, {
    onSuccess: (res) => {
     
    },
    onError: (err) => {
      console.log(err, 'err');
    },
  });

 
  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleFileSelect = (e) => {
    e.preventDefault();

    if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
      return;
    }

    // Validate the file being uploaded
    const supportedIndicatorFileExtensions = ['csv'];
    const fileName = inputFile.current?.files?.[0].name;
    const fileExtention =
      fileName?.substring(fileName?.lastIndexOf('.') + 1) || '';

    if (!supportedIndicatorFileExtensions.includes(fileExtention)) {
      toast({
        title: 'Unsupported file type',
        description: 'Please upload a valid CSV file',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target?.result || '';

      // Ensure the file content isn't empty
      if (isEmpty(text)) {
        toast({
          title: 'Invalid import',
          description: 'file cannot be empty.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        return;
      }

      // let importedRuleObj = {
      //   title:
      //     typeof text === 'string' ? getIndicatorRuleTitle(text, ruleType) : '',
      //   indicator_type: ruleType,
      //   content_rule: text,
      //   severity: '',
      // };

      // setEditObj(importedRuleObj);

      // addModal.onOpen();
    };
    reader.readAsText(e.target.files[0]);

    // Clear the input so if we select the same file again it works
    e.target.value = '';
    return;
  };

  return (
    <Fragment>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
      <IoIosArrowBack
            size={24}
            cursor="pointer"
            onClick={() => navigate(-1)}
          />
        <input
          ref={inputFile}
          onChange={(e) => handleFileSelect(e)}
          type='file'
          style={{ display: 'none' }}
          // multiple={false}
        />
        {/* <Text m={'10px'}>Upload CSV file to add Students</Text> */}
        <Button onClick={onButtonClick}>Add CSV file to add students </Button>
      </Flex>

      <Box my={'20px'}>
        <TableTemplate
        columns={studentsSectionTableHeader}
        data={sectionStudents}
        actions={[]}
        isLoading={isLoadingSectionStudents}
        emptyState={<EmptyState message={'No Students in this section yet'}/>}
        />
         {/* {
        <TableContainer>

          <Table variant='simple'>
            <TableCaption>List of all students</TableCaption>
            <Thead>
              <Tr>
                <Th> </Th>
                <Th> id</Th>
                <Th> Name</Th>
                <Th> email</Th>
                <Th isNumeric>num of absence</Th>
                <Th isNumeric>absence percentage</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                !isLoadingSectionStudents&&!isEmpty(sectionStudents)&&sectionStudents.map((student,index)=>{
                  return (
                    <Tr key={student.student_id}>
                     <Td>{index+1}</Td>
                    <Td>{student.student_id}</Td>
                    <Td>{student.student_name}</Td>
                    <Td>{student.email}</Td>
                    <Td isNumeric>{student.number_of_absence}</Td>
                    <Td isNumeric>{student.absence_percentage}</Td>
                  </Tr>
                  )
                })
              }
             
             
            </Tbody>
         
          </Table>
        </TableContainer>

          } */}
      </Box>
    </Fragment>
  );
};

export default SectionInner;
