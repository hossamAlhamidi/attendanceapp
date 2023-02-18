import React, { Fragment, useState, useMemo } from 'react';
import { Box, Card, CardHeader, Heading, Select } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGetMostInstructors } from '../../../services/query/dashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    y: {
      //   grid: {
      //     display: false
      // },
      ticks: {
        min: 0,
        max: 15,
        stepSize: 1,
      },
    },
    x: {
      // grid: {
      //     display: false
      // }
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

const LineChart = () => {
  const [numOfRecord, setNumOfRecord] = useState(5);
  const {
    data: mostInstructors,
    isLoading,
    refetch,
  } = useGetMostInstructors(numOfRecord, {
    onSuccess: (res) => {},
  });
  const mostInstructorsData = useMemo(() => {
    if (mostInstructors) {
      const derivedInstructors = {
        labels: [],
        data: [],
      };
      mostInstructors?.forEach((item) => {
        derivedInstructors.labels.push(item.instructor_name);
        derivedInstructors.data.push(item.number);
      });
      return derivedInstructors;
    }
    return {
      labels: [],
      data: [],
    };
  }, [mostInstructors]);

  const labels = mostInstructorsData?.labels?.map((label) => label);

  const data = {
    labels,
    datasets: [
      {
        // label: 'Dataset 1',
        data: mostInstructorsData?.data?.map((data) => data),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        datalabels: {
          display: false,
        },
      },
    ],
  };

  return (
    <Fragment>
      {
        <Card alignSelf={'center'}>
          <CardHeader
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Heading as={'h6'} size={'xs'}>
              Most Instructors Teaching courses
            </Heading>
            <Select
              w='70px'
              defaultValue={5}
              onChange={(e) => {
                setNumOfRecord(parseInt(e.target.value));
              }}
            >
              <option value={5}>5 </option>
              <option value={10}>10 </option>
              <option value={15}>15 </option>
              <option value={20}>20 </option>
            </Select>
          </CardHeader>
          <Box
            style={{
              width: '100%',
              height: '100%',
            }}
            as={'div'}
            margin={'auto'}
          >
            <Line options={options} data={data} height={'200px'} />
          </Box>
        </Card>
      }
      {/* {  <Line options={options} data={data} />} */}
    </Fragment>
  );
};

export default LineChart;
