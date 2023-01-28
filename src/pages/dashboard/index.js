import React, { Fragment } from 'react'
import { SimpleGrid , Box ,Card,Flex,CardBody,CardHeader,Heading,Text} from '@chakra-ui/react'
import BarChart from './components/BarChart'
import DoughnutChart from './components/DoughnutChart'
import LineChart from './components/LineChart'
import AreaChart from './components/AreaChart'
import Sections from '../sections'
const Dashboard = () => {
  return (
    <Fragment>
      <SimpleGrid columns={[1,1,2]} spacing={10} >
       <BarChart/>
       <DoughnutChart/>

       <LineChart/>

       <AreaChart/>
      </SimpleGrid>
    
      <Box my={10}>
      <Sections/>
      </Box>
    </Fragment>
  )
}

export default Dashboard