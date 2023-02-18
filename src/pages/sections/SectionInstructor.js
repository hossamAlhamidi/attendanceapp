import React, { Fragment, useState } from 'react';
import {
  Box,
  useColorModeValue,
  Flex,
  useDisclosure,
  Icon,
  useToast,
} from '@chakra-ui/react';
import EmptyState from '../../components/EmptyState';
import { AiOutlineEye } from 'react-icons/ai';
import TableTemplate from '../../components/Table';
import { sectionTableHeader } from '../../data/section.header';
import { useNavigate } from 'react-router-dom';
import { useGetInstructorSections } from '../../services/query/sections';
import { useAuthPermission } from '../../hook/useAuthPermission';
import { useDeleteSection } from '../../services/query/sections';
import Prompt from '../../components/Prompt';
const Sections = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const toast = useToast();
  const confirmPrompt = useDisclosure();
  const [deletedItem, setDeletedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, refetch } = useGetInstructorSections(
    useAuthPermission()?.instructor_id,
    {
      onSuccess: (res) => {},
      onError: (err) => {
        console.log(err, 'error');
      },
    }
  );

  // delete section
  const { mutate: deleteSection, isLoading: isLoadingDelete } =
    useDeleteSection({
      onSuccess: (res) => {
        console.log(res, 'deleted');
        confirmPrompt.onClose();
        refetch();
        toast({
          title: 'Deleted',
          description: 'Section has been Deleted',
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
  const handleDelete = (id) => {
    deleteSection(id);
  };

  return (
    <Fragment>
      <Flex alignItems={'center'} justifyContent={'space-between'} my={5}>
        {/* <Button marginRight={'10px'} ><Link to={`/addsection`}>Add Section</Link></Button> */}

        <Box maxW={['100%', '50%']} my={'10px'}>
          {/* <InputGroup>
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
                </InputGroup> */}
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
          // {
          //   aria_label: 'Delete Section',
          //   icon: <Icon as={CgTrashEmpty} color={'red'} />,
          //   onPress: (item) => {

          //     setDeletedItem(item.section_id)

          //     confirmPrompt.onOpen();
          //   },
          // },
        ]}
        emptyState={<EmptyState message={'No added sections'} />}
      />

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
