import React, { Fragment ,useRef} from 'react'
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
  useToast
} from '@chakra-ui/react';

import { isEmpty } from '../../components/ModalTemplate';
const SectionInner = () => {
  const inputFile = useRef(null);
  const toast = useToast()
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
      <Flex justifyContent={'flex-end'}>
      <input
          ref={inputFile}
          onChange={(e) => handleFileSelect(e)}
          type="file"
          style={{ display: "none" }}
          // multiple={false}
        />
        {/* <Text m={'10px'}>Upload CSV file to add Students</Text> */}
      <Button onClick={onButtonClick}>Add CSV file to add students </Button>
      </Flex>

      <Box my={'20px'}>
      <TableContainer>
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
      </Box>
    </Fragment>
  )
}

export default SectionInner