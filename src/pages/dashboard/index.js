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
        <Card  minH={'50vh'} alignSelf={'center'} >
          <CardHeader>
            <Heading as={'h6'} size={'xs'} textAlign={'center'}>Most registered courses</Heading>
          </CardHeader>
        <Box
          style={{
            width: '100%',
            height: '100%',
          }}
          as={'div'}
          margin={'auto'}
      
        >
        <BarChart/>
        </Box>
        </Card>
        <Card  minH={'50vh'}>
        <CardHeader>
            <Heading as={'h6'} size={'xs'} textAlign={'center'}>Most Sections that has absent students</Heading>
          </CardHeader>
        <Box
          style={{
            width: '100%',
            height: '100%',
          }}
          as={'div'}
          margin={'auto'}
        >
        <DoughnutChart/>
        </Box>
        </Card>

        <Card   alignSelf={'center'} >
          <CardHeader>
            <Heading as={'h6'} size={'xs'} textAlign={'center'}>Most Instructors Teaching courses</Heading>
          </CardHeader>
        <Box
          style={{
            width: '100%',
            height: '100%',
          }}
          as={'div'}
          margin={'auto'}
      
        >
        <LineChart/>
        </Box>
        </Card>

        <Card  alignSelf={'center'} >
          <CardHeader>
            <Heading as={'h6'} size={'xs'} textAlign={'center'}>Number of Absence</Heading>
          </CardHeader>
        <Box
          style={{
            width: '100%',
            height: '100%',
          }}
          as={'div'}
          margin={'auto'}
      
        >
        <AreaChart/>
        </Box>
        </Card>
      </SimpleGrid>
    
      <Box my={10}>
      <Sections/>
      </Box>
    </Fragment>
  )
}

export default Dashboard