import React, { Fragment,useState,useMemo } from 'react';
import { SimpleGrid , Box ,Card,Flex,CardBody,CardHeader,Heading,Text,Select,Input} from '@chakra-ui/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useGetNumberAbsences } from '../../../services/query/dashboard';
ChartJS.register(ArcElement,ChartDataLabels, Tooltip, Legend);
const options={
    responsive: true,
    maintainAspectRatio:false,
    plugins: {
      legend: {
        position: 'left',
        display: false,
      },
      title: {
        position:'bottom',
        display: true,
         text: 'Last Week',
      
      },
    },
  }
 
const DoughnutChart = () => {
  const [numOfRecord,setNumOfRecord] = useState(5);
  const [from,setFrom] = useState('')
  const [to,setTo] = useState('')
  const {data:numberOfAbsences,isLoading,refetch} = useGetNumberAbsences(
    {number:numOfRecord,from:from,to:to},
    {
    onSuccess:(res)=>{
      console.log(res,"success")
    }
  })

  const numOfAbsencesData = useMemo(() => {
    if (numberOfAbsences) {
      const derivedSections = {
        labels: [],
        data: [],
      };
      numberOfAbsences?.forEach((item) => {
        derivedSections.labels.push(item.day);
        derivedSections.data.push(item.number);
      });
      return derivedSections;
    }
    return {
      labels: [],
      data: [],

    };
  }, [numberOfAbsences]);

  const data = {
    // labels: ['22354', '22344', '12554', '32545', '11456', '22546'],
    labels: numOfAbsencesData?.labels?.map((label)=>label.substring(0,3)),
    datasets: [
      {
        // label: '# of Votes',
        data: numOfAbsencesData?.data?.map((data)=>data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 10, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 10, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          
        ],
       
          borderWidth: 0,
          hoverOffset: 40,
          cutout: 80,
          hoverBorderJoinStyle: 'round',
          radius: '75%',
          datalabels: {
              
            color: 'white',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size:12,
                },
                textAlign:'center'
              },
             
            },
            formatter: (val,context) => {
              // console.log(context,"val")
              return [val,context.chart.data.labels[context.dataIndex]];
              }
          },
      },
    ],
  };
 
  return (
    <Fragment>
       <Card 
        // minH={'50vh'}
        
        >
        <CardHeader display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Heading as={'h6'} size={'xs'} >Number of Absences</Heading>
            <Flex 
           
            // justifyContent={'space-between'}
              // p={3}
              >
              <Box mr={1}>
                <Text>From</Text>
              <Input type={'date'} w={'50px'} name={'from'} value={from} onChange={(e)=>setFrom(e.target.value)} />
              </Box>
              <Box>
                <Text>To</Text>
              <Input type={'date'} w={'50px'} name={'to'} value={to}  onChange={(e)=>setTo(e.target.value)} />
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
        <Doughnut data={data} options={options} height={'200px'}/>
        
        </Box>
       
        </Card>
        
    </Fragment>
  )
}

export default DoughnutChart