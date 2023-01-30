import React, { Fragment,useState,useMemo } from 'react';
import { SimpleGrid , Box ,Card,Flex,CardBody,CardHeader,Heading,Text,Select} from '@chakra-ui/react'
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
import { useGetMostSections } from '../../../services/query/dashboard';

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

export const options = {
  y: {
    ticks: {
        // min: 0,
        // max: 15,
        
    }
},
  responsive: true,
  plugins: {
    legend: {
      display:false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};



const AreaChart = () => {

  const [numOfRecord,setNumOfRecord] = useState(5);
  const {data:mostSections,isLoading,refetch} = useGetMostSections(numOfRecord,{
    onSuccess:(res)=>{
      
    }
  })

  const mostSectionsData = useMemo(() => {
    if (mostSections) {
      const derivedSections = {
        labels: [],
        data: [],
      };
      mostSections?.forEach((item) => {
        derivedSections.labels.push(item.section_id);
        derivedSections.data.push(item.number);
      });
      return derivedSections;
    }
    return {
      labels: [],
      data: [],

    };
  }, [mostSections]);

  const labels = mostSectionsData?.labels?.map((label)=>label)

 const data = {
  labels,
  datasets: [
    {
      fill: true,
      // label: 'Section',
      data: mostSectionsData?.data?.map((data)=>data),
      // data:[1,8,2,4,5],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.4,
      datalabels: {
        display:false,
      }
    },
  ],
};

  return (
   <Fragment>
     <Card  alignSelf={'center'} >
          <CardHeader display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Heading as={'h6'} size={'xs'} textAlign={'center'}>Most Sections that has absent students</Heading>
            <Select
            w="70px"
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
   
   </Fragment>
  )
}

export default AreaChart