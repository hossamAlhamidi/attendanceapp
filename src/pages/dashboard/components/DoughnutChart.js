import React, { Fragment } from 'react';
import { SimpleGrid , Box ,Card,Flex,CardBody,CardHeader,Heading,Text,Select,Input} from '@chakra-ui/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
        display: false,
        // text: 'Most Sections that has absent students',
      
      },
    },
  }
export const data = {
  // labels: ['22354', '22344', '12554', '32545', '11456', '22546'],
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu',],
  datasets: [
    {
      // label: '# of Votes',
      data: [12, 19, 3, 5, 2],
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

const DoughnutChart = () => {
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
              <Input type={'date'} w={'50px'} />
              </Box>
              <Box>
                <Text>To</Text>
              <Input type={'date'} w={'50px'} />
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