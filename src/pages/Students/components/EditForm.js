import React, { Fragment, useEffect, useState ,useMemo,useRef} from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  Input,
  Card,
  CardBody,
  SimpleGrid,
  Button,
  Flex,
  useToast,
  Stack,
  Icon,
  useDisclosure,
  Spinner,
  FormLabel,
  FormControl
} from '@chakra-ui/react';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
const EditForm = ({formik,isLoadingStudentInformation,isEdit,setIsEdit}) => {
    const {values,handleBlur,handleChange} = formik
  return (
    <Fragment>
          {!isLoadingStudentInformation? <Card my={5}>
              <CardBody>
                <Flex justifyContent={'flex-end'}>
                  <Button onClick={() => setIsEdit(!isEdit)} mb={10}>
                    {isEdit ? <HiLockClosed /> : <HiLockOpen />}
                  </Button>
                </Flex>
               <SimpleGrid columns={[1, 2]} spacing={10}>
                <FormControl>
                  <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Student ID</FormLabel>
                <Input
                    placeholder='Student ID'
                    name='student_id'
                    id='student_id'
                    value={values?.student_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={true}
                  />
                </FormControl>
                 
                 <FormControl>
                 <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Name</FormLabel>
                 <Input
                    placeholder='Name'
                    name='student_name'
                    id='student_name'
                    value={values?.student_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                    borderColor={formik.errors.student_name&&formik.touched.student_name && 'tomato' }
                  />
                    {formik.touched.student_name && formik.errors.student_name && (
              <Text color={'tomato'} >{formik.errors.student_name}</Text>
            )}
                 </FormControl>
                 
                 <FormControl>
                 <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Email</FormLabel>
                 <Input
                    placeholder='Email'
                    name='email'
                    id='email'
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                    borderColor={formik.errors.email&&formik.touched.email && 'tomato' }
                  />
                    {formik.touched.email && formik.errors.email && (
              <Text color={'tomato'} >{formik.errors.email}</Text>
            )}
                 </FormControl>
                 
                 <FormControl>
                 <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Phone Number</FormLabel>
                 <Input
                    placeholder='05********'
                    name='phone_number'
                    id='phone_number'
                    value={values?.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                    borderColor={formik.errors.phone_number&&formik.touched.phone_number && 'tomato' }
                  />
                    {formik.touched.phone_number && formik.errors.phone_number && (
              <Text color={'tomato'} >{formik.errors.phone_number}</Text>
            )}
                 </FormControl>

                 <FormControl>
                 <FormLabel color={'f3f3f3'} fontSize={"sm"} mb={3}>Mac Address</FormLabel>
                 <Input
                    placeholder='38:89:5D:8C:A3:F8'
                    name='mac_address'
                    id='mac_address'
                    value={values?.mac_address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={!isEdit}
                    borderColor={formik.errors.mac_address&&formik.touched.mac_address && 'tomato' }
                  />
                    {formik.touched.mac_address && formik.errors.mac_address && (
              <Text color={'tomato'} >{formik.errors.mac_address}</Text>
            )}
                 </FormControl>
                 
                </SimpleGrid>
                
                <Button
                  onClick={() => formik.handleSubmit()}
                  mt={8}
                  isDisabled={!isEdit||!formik.isValid}
                >
                  Save
                </Button>
              </CardBody>
            </Card>: 
             <Box display={'flex'} justifyContent='center' mt={5}>
              <Spinner />
              </Box>
            }
    </Fragment>
  )
}

export default EditForm
