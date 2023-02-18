import React, { Fragment, useState, useMemo } from 'react';
import {
  Box,
  Card,
  Flex,
  CardHeader,
  Heading,
  Text,
  Input,
} from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGetNumberAbsences } from '../../../services/query/dashboard';
import { isEmpty } from '../../../components/ModalTemplate';
import moment from 'moment/moment';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const AreaChart = () => {
  // const [numOfRecord, setNumOfRecord] = useState(5);
  const last_week = moment().subtract(7, 'days').format('YYYY-MM-DD');
  const [from, setFrom] = useState(last_week);
  const [to, setTo] = useState('');

  useMemo(() => {
    if (isEmpty(from)) {
      setTo('');
    }
  }, [from]);
  const options = {
    scales: {
      x: {
        display: false,
      },
    },

    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        position: 'bottom',
        display: true,
        text: from == last_week ? 'Last Week' : `from ${from} to ${to}`,
      },
    },
  };
  const {
    data: numberOfAbsences,
    isLoading,
    refetch,
  } = useGetNumberAbsences(
    { from: from, to: to },
    {
      onSuccess: (res) => {
        console.log(res, 'success');
      },
    }
  );
  // const {data:mostSections,isLoading,refetch} = useGetMostSections(numOfRecord,{
  //   onSuccess:(res)=>{

  //   }
  // })

  const mostSectionsData = useMemo(() => {
    if (numberOfAbsences) {
      const derivedSections = {
        labels: [],
        data: [],
      };
      numberOfAbsences?.forEach((item) => {
        derivedSections.labels.push(item.absence_date);
        derivedSections.data.push(item.number);
      });
      return derivedSections;
    }
    return {
      labels: [],
      data: [],
    };
  }, [numberOfAbsences]);

  const labels = mostSectionsData?.labels?.map((label) => label);
  // const labels = []
  //  for(let i =0 ; i<150;i++){labels[i]=i }

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        // label: 'Section',
        data: mostSectionsData?.data?.map((data) => data),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.4,
        datalabels: {
          display: false,
        },
      },
    ],
  };

  return (
    <Fragment>
      <Card alignSelf={'center'}>
        <CardHeader
          mt={-5}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Heading as={'h6'} size={'xs'}>
            Number of Absences
          </Heading>
          <Flex

          // justifyContent={'space-between'}
          // p={3}
          >
            <Box mr={1}>
              <Text>From</Text>
              <Input
                type={'date'}
                w={'50px'}
                name={'from'}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                // value={from ? from.toISOString().substr(0, 10) : ""}
                // onChange={handleStartDateChange}
                // max={to ? to.toISOString().substr(0, 10) : null}
              />
            </Box>
            <Box>
              <Text>To</Text>
              <Input
                type={'date'}
                w={'50px'}
                name={'to'}
                value={to}
                min={moment(from).format('YYYY-MM-DD')}
                max={moment(from).add(30, 'days').format('YYYY-MM-DD')}
                isDisabled={isEmpty(from)}
                onChange={(e) => setTo(e.target.value)}
                // value={to ? to.toISOString().substr(0, 10) : ""}
                // onChange={handleEndDateChange}
                // min={from ? from.toISOString().substr(0, 10) : null}
              />
            </Box>
          </Flex>
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
    </Fragment>
  );
};

export default AreaChart;
