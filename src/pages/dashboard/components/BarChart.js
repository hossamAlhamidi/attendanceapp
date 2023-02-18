import React, { Fragment, useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Card, CardHeader, Heading, Select } from '@chakra-ui/react';
// import faker from 'faker';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useGetMostCourses } from '../../../services/query/dashboard';
ChartJS.register(
  CategoryScale,
  LinearScale,
  ChartDataLabels,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
    x: {
      // display: false,
      grid: {
        display: false,
      },
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
      text: 'Most registered courses',
    },
  },
};

const BarChart = () => {
  const [numOfRecord, setNumOfRecord] = useState(5);
  const {
    data: mostCourses,
    isLoading,
    refetch,
  } = useGetMostCourses(numOfRecord, {
    onSuccess: (res) => {
      console.log(res, 'success');
    },
  });

  const mostCoursesData = useMemo(() => {
    if (mostCourses) {
      const derivedSections = {
        labels: [],
        data: [],
      };
      mostCourses?.forEach((item) => {
        derivedSections.labels.push(item.course_id);
        derivedSections.data.push(item.number);
      });
      return derivedSections;
    }
    return {
      labels: [],
      data: [],
    };
  }, [mostCourses]);

  const labels = mostCoursesData?.labels?.map((label) => label);

  // const labels = ['SWE 466', 'SWE434', 'CSC 215', 'SWE 485', 'SWE 381'];

  const data = {
    labels,
    datasets: [
      {
        // label: 'Dataset 1',
        data: mostCoursesData?.data?.map((data) => data),
        // data: [20,30,40,45,15],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        datalabels: {
          display: true,
          color: 'white',
          labels: {
            title: {
              font: {
                weight: 'bold',
                size: 16,
              },
            },
          },
          // formatter: (val) => {
          //     return Number.isFinite(parseInt(val))&&val!=80? val + '%':val==80?null:null;
          //   }
        },
      },

      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };
  return (
    <Fragment>
      <Card
        // minH={'50vh'}
        alignSelf={'center'}
      >
        <CardHeader
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Heading as={'h6'} size={'xs'}>
            Most registered courses
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
          <Bar options={options} data={data} height={'200px'} />
        </Box>
      </Card>
    </Fragment>
  );
};

export default BarChart;
