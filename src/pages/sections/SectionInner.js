import React, { Fragment, useRef, useState, useMemo } from 'react';
import {
  Box,
  Input,
  useColorModeValue,
  InputGroup,
  Button,
  InputLeftElement,
  Text,
  Select,
  Flex,
  useToast,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { CgTrashEmpty } from 'react-icons/cg';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineEye } from 'react-icons/ai';
import { useGetAllSectionStudents } from '../../services/query/sections';
import { useParams, useNavigate } from 'react-router-dom';
import { isEmpty } from '../../components/ModalTemplate';
import TableTemplate from '../../components/Table';
import { studentsSectionTableHeader } from '../../data/studentsSection.headers';
import EmptyState from '../../components/EmptyState';
import { useAddAllStudentsToSection } from '../../services/query/sections';
import Prompt from '../../components/Prompt';
import { useFormik } from 'formik';
import { FiSearch } from 'react-icons/fi';
import ModalTemplate from '../../components/ModalTemplate';
import Pagination from '../../components/pagination';
import { useAddStudentToSection } from '../../services/query/sections';
import { useDeleteStudentFromSection } from '../../services/query/student';
import * as Yup from 'yup';

const addStudentValidation = Yup.object().shape({
  student_id: Yup.string()
    .min(3)
    .matches(/^\d+$/, 'Input can only contain numbers')
    .max(10, 'Input cannot be more than 10 characters')
    .required('Input is required'),
});
const SectionInner = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [deletedItem, setDeletedItem] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const confirmPrompt = useDisclosure();
  const { id } = params;
  const inputFile = useRef(null);
  const toast = useToast();
  const warningPrompt = useDisclosure();
  const [promptErrMsg, setPromptErrMsg] = useState('');
  const addStudentModal = useDisclosure();
  if (isEmpty(id)) {
    navigate(-1);
  }
  // get list of students
  const {
    data: sectionStudents,
    isLoading: isLoadingSectionStudents,
    refetch,
  } = useGetAllSectionStudents(id, {
    onSuccess: (res) => {},
    onError: (err) => {
      console.log(err, 'err');
    },
  });

  const currentData = useMemo(() => {
    if (sectionStudents) {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return [...sectionStudents].slice(firstPageIndex, lastPageIndex);
    }
    return [];
  }, [sectionStudents, currentPage, pageSize]);

  const keys = ['student_id', 'student_name'];
  const handleFilterData = (param) => {
    if (isEmpty(param)) {
      return currentData;
    }

    let filtered = sectionStudents?.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (
          item[key] &&
          item[key].toString().toLowerCase().includes(param.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });

    return filtered;
  };
  // add students from csv
  const {
    mutate: addAllStudents,
    data,
    isLoading: isLoadingAddAll,
  } = useAddAllStudentsToSection({
    onSuccess: (res) => {
      console.log(res, 'res');
      toast({
        title: 'Success',
        description: 'All students are added',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
    },
    onError: (err) => {
      setPromptErrMsg(err?.response?.data?.message);
      warningPrompt.onOpen();
      refetch();
    },
  });

  const { mutate: addStudent, isLoading: isLoadingAddStudent } =
    useAddStudentToSection({
      onSuccess: (res) => {
        toast({
          title: 'Success',
          description: 'Student is added',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        addStudentModal.onClose();
        formik.resetForm();
        refetch();
      },
      onError: (err) => {
        toast({
          title: 'Error',
          description: err?.response?.data?.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    });

  // delete
  const { mutate: deleteStudentFromSection, isLoading: isLoadingDelete } =
    useDeleteStudentFromSection({
      onSuccess: (res) => {
        console.log(res, 'deleted');
        confirmPrompt.onClose();
        refetch();
        toast({
          title: 'Deleted',
          description: 'Student is deleted from this section',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
      onError: (err) => {
        toast({
          title: 'Not Deleted',
          description: err?.response?.data?.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    });

  const handleCloseDeleteModal = () => {
    setDeletedItem(null);
    confirmPrompt.onClose();
  };
  const handleDelete = (body) => {
    deleteStudentFromSection(body);
  };

  const initValues = {
    student_id: '',
    section_id: id,
  };
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: addStudentValidation,
    isInitialValid: false,
    onSubmit: (values) => {
      console.log(values);
      addStudent(values);

      // setInitialValues(initValues)
    },
  });
  // read file
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
        description: 'Please upload a valid xls file',
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
      // setTemp(text)
      // Ensure the file content isn't empty
      if (isEmpty(text)) {
        toast({
          title: 'Error',
          description: 'file cannot be empty.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        return;
      }
      let filtered_text = text.match(/^[0-9];.*/gimu);
      const arr = filtered_text.map((element) => {
        return element.replaceAll(/^[0-9];/g, '');
      });
      //  console.log(text,"text")
      console.log(arr);
      let temp = arr.map((element, i) => {
        return element.split(';');
      });

      let arr_id = temp.map((element) => element[0]);
      // console.log(arr_student,"obj")

      addAllStudents({
        student_array: arr_id,
        section_id: id,
      });
      // addModal.onOpen();
    };
    reader.readAsText(e.target.files[0]);

    // Clear the input so if we select the same file again it works
    e.target.value = '';
    return;
  };
  //  console.log(temp,"temp")
  return (
    <Fragment>
      {/* <Text>{temp}</Text> */}
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Box mr={5}>
          <IoIosArrowBack
            size={24}
            cursor='pointer'
            onClick={() => navigate(-1)}
          />
        </Box>

        <input
          ref={inputFile}
          onChange={(e) => handleFileSelect(e)}
          type='file'
          style={{ display: 'none' }}
          // multiple={false}
        />
        {/* <Text m={'10px'}>Upload CSV file to add Students</Text> */}
        <Flex flexWrap={'wrap'} alignItems={'center'}>
          <Button onClick={onButtonClick} m={1}>
            Add CSV file to add students{' '}
          </Button>
          <Button m={1} onClick={addStudentModal.onOpen}>
            {' '}
            add student
          </Button>
          <Box maxW={['100%', '50%']} my={'10px'}>
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
            </InputGroup>
          </Box>
        </Flex>
      </Flex>

      <Box my={'20px'}>
        <TableTemplate
          columns={studentsSectionTableHeader}
          data={isEmpty(search) ? currentData : handleFilterData(search)}
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
                navigate(`/students/${item.student_id}`, {
                  // state: { type: item.organization_type },
                }),
            },
            {
              aria_label: 'Delete student',
              icon: <Icon as={CgTrashEmpty} color={'red'} />,
              onPress: (item) => {
                console.log(item, 'item');
                setDeletedItem({
                  student_id: item?.student_id,
                  section_id: item?.section_id,
                });

                confirmPrompt.onOpen();
              },
            },
          ]}
          isLoading={isLoadingSectionStudents}
          emptyState={
            <EmptyState
              message={
                !search ? `No Students in this section yet` : `No results`
              }
            />
          }
        />
        <Flex w='100%' paddingTop='24px'>
          <Flex flex={1}></Flex>
          <Select
            w='190px'
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
                ? sectionStudents?.length || 0
                : handleFilterData(search).length
            }
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Flex>
      </Box>

      <ModalTemplate
        isOpen={addStudentModal.isOpen}
        onClose={addStudentModal.onClose}
        title={'Add Course'}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box mx={'5px'}>
            <Text mb='8px'>Student ID </Text>
            <Input
              id='student_id'
              name='student_id'
              onChange={formik.handleChange}
              value={formik.values.student_id}
              onBlur={formik.handleBlur}
              placeholder='439... '
              size='md'
              mb={'10px'}
              borderColor={
                formik.errors.student_id &&
                formik.touched.student_id &&
                'tomato'
              }
            />
            {formik.touched.student_id && formik.errors.student_id && (
              <Text color={'tomato'}>{formik.errors.student_id}</Text>
            )}
            <Text mb='8px'>Section Id </Text>
            <Input
              id='section_id'
              name='section_id'
              onChange={formik.handleChange}
              value={formik.values.section_id}
              placeholder='@example 466'
              size='md'
              mb={'10px'}
              isDisabled
            />

            {/* <CheckboxGroup colorScheme='green' defaultValue={['has_tutorial']}> */}

            {/* </CheckboxGroup> */}
          </Box>
          <Flex alignItems={'center'}>
            <Button
              isDisabled={!formik.isValid}
              isLoading={isLoadingAddStudent}
              type='submit'
              m={'10px'}
              colorScheme={'blue'}
            >
              Submit
            </Button>
            <Button
              type='button'
              m={'10px'}
              onClick={() => {
                addStudentModal.onClose();
                formik.resetForm();
              }}
            >
              Cancel
            </Button>
          </Flex>
        </form>
      </ModalTemplate>

      <Prompt
        isOpen={warningPrompt.isOpen}
        onClose={warningPrompt.onClose}
        title={promptErrMsg}
        type={'success'}
      />

      <Prompt
        isOpen={confirmPrompt.isOpen}
        onClose={() => {
          handleCloseDeleteModal();
        }}
        title={`Are you sure you want to delete this record id: ${deletedItem?.student_id}?`}
        buttons={[
          {
            label: 'Delete',
            type: 'danger',
            onPress: () => {
              handleDelete(deletedItem);
            },
            styles: {
              paddingX: 50,
            },
            isLoading: isLoadingDelete,
          },
          {
            label: 'Cancel',
            type: 'secondary',
            onPress: () => {
              handleCloseDeleteModal();
            },
            styles: {
              paddingX: 50,
            },
          },
        ]}
        type={'error'}
      />
    </Fragment>
  );
};

export default SectionInner;
