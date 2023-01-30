import React, { Fragment } from 'react';
import {
  SimpleGrid,
  Spinner,
  Box,
  Card,
  Flex,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react';
import { useGetTotalCount } from '../../../services/query/dashboard';
import CountCard from '../../../components/CountCard';
import fire from '../../../assets/img/fire.svg';
const Totals = () => {
  const { data, isLoading, refetch } = useGetTotalCount({});

  const cards = [
    {
      type: 'Students',
      total: data?.students_count,
      icon: '',
    },
    {
        type: 'Courses',
        total: data?.courses_count,
        icon: '',
      },
      {
        type: 'Sections',
        total: data?.sections_count,
        icon: '',
      },
      {
        type: 'Instructors',
        total: data?.instructors_count,
        icon: '',
      },
  ];
  return (
    <Fragment>
      {!isLoading ? (
        <SimpleGrid columns={[1, 1, 2, 4]} spacing='20px' mb={'1rem'}>
          {cards.map((card, i) => (
            <CountCard key={i} type={card.type} total={card.total} />
          ))}
        </SimpleGrid>
      ) : (
        <Box display={'flex'} justifyContent='center' my={5}>
          <Spinner />
        </Box>
      )}
    </Fragment>
  );
};

export default Totals;
