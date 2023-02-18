import React, { Fragment, useState, useMemo } from 'react';
import {
  Box,
  Input,
  useColorModeValue,
  InputGroup,
  Button,
  InputLeftElement,
  useToast,
  Flex,
  useDisclosure,
  Select,
  Icon,
} from '@chakra-ui/react';
import _ from 'lodash';
import EmptyState from '../../components/EmptyState';
import { AiOutlineEye } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { useGetAllSections } from '../../services/query/sections';
import { Link } from 'react-router-dom';
import TableTemplate from '../../components/Table';
import { sectionTableHeader } from '../../data/section.header';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/pagination';
import { isEmpty } from '../../components/ModalTemplate';
import { useDeleteSection } from '../../services/query/sections';
import { CgTrashEmpty } from 'react-icons/cg';
import { TbPencil } from 'react-icons/tb';
import Prompt from '../../components/Prompt';
import { useQueryClient } from 'react-query';
import { TOTAL_COUNT } from '../../services/queryKeys';

const Sections = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const toast = useToast();
  const confirmPrompt = useDisclosure();
  const [deletedItem, setDeletedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data,
    isLoading,
    refetch: getAllSections,
  } = useGetAllSections({
    onSuccess: (res) => {},
    onError: (err) => {
      console.log(err, 'error');
    },
  });

  const currentData = useMemo(() => {
    if (data) {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return [...data].slice(firstPageIndex, lastPageIndex);
    }
    return [];
  }, [data, currentPage, pageSize]);

  const keys = [
    'section_id',
    'course_id',
    'course_name',
    'type',
    'instructor_name',
  ];
  const handleFilterData = (param) => {
    if (isEmpty(param)) {
      return currentData;
    }
    // let filtered = currentData.filter((item) =>
    //   _.some(keys, (key) =>
    //     item[key]?.toString().toLowerCase()?.includes(param.toLowerCase()),
    //   ),
    // );
    let filtered = data?.filter((item) => {
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

  // delete section
  const { mutate: deleteSection, isLoading: isLoadingDelete } =
    useDeleteSection({
      onSuccess: (res) => {
        console.log(res, 'deleted');
        confirmPrompt.onClose();
        getAllSections();
        toast({
          title: 'Deleted',
          description: 'Section has been Deleted',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        queryClient.refetchQueries({ queryKey: [TOTAL_COUNT] });
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
  const handleDelete = (id) => {
    deleteSection(id);
  };
  return (
    <Fragment>
      <Flex alignItems={'center'} justifyContent={'space-between'} my={5}>
        <Link to={`/addsection`}>
          <Button marginRight={'10px'}>Add Section</Button>
        </Link>

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

      <TableTemplate
        columns={sectionTableHeader}
        data={isEmpty(search) ? currentData : handleFilterData(search)}
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
          {
            aria_label: 'Edit Section',
            icon: (
              <Icon
                as={TbPencil}
                h={4}
                w={4}
                color={'lightMode.secondary.lightBlue'}
              />
            ),
            onPress: (item) => {
              navigate(`/editSection/${item?.section_id}`, {
                state: { section: item },
              });
            },
          },
          {
            aria_label: 'Delete Section',
            icon: <Icon as={CgTrashEmpty} color={'red'} />,
            onPress: (item) => {
              setDeletedItem(item.section_id);

              confirmPrompt.onOpen();
            },
          },
        ]}
        emptyState={
          <EmptyState
            message={!search ? `No Sections added yet` : `No results`}
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
              ? data?.length || 0
              : handleFilterData(search)?.length || 0
          }
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Flex>

      {/* {
            !isLoading&&<CardStructure data={data}/>
          }    */}

      {/* <ModalTemplate isOpen={isOpen} onClose={onClose} title={'Add Section'} > */}

      <Prompt
        isOpen={confirmPrompt.isOpen}
        onClose={() => {
          handleCloseDeleteModal();
        }}
        title={`Are you sure you want to delete this record id:${deletedItem}?`}
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

export default Sections;
