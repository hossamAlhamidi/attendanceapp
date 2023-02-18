import React, { Fragment, useState } from 'react';
import {
  Box,
  Text,
  Input,
  Card,
  CardBody,
  SimpleGrid,
  Button,
  Flex,
  useToast,
  Spinner,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  useGetInstructor,
  useUpdateInstructor,
} from '../../services/query/instructors';
import * as Yup from 'yup';
const editInstructorValidation = Yup.object().shape({
  instructor_name: Yup.string()
    .matches(/^[^\d]+$/, 'Name cannot contain numbers')
    .min(3)
    .required('Required'),
  instructor_id: Yup.string().min(3).max(12).required('Required'),
  email: Yup.string().email().required('Required'),
  phone_number: Yup.string().length(10),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])[\w\d]+$/,
      'Password must have at least one letter and can only contain letters, numbers, and underscores'
    )
    .min(8, 'Password must be at least 8 characters long'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Password confirmation does not match'
  ),
});
const InstructorProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const toast = useToast();

  const initialValues = {
    instructor_id: '',
    instructor_name: '',
    email: '',
    phone_number: '',
    old_password: '',
    password: '',
    password_confirmation: '',
  };
  const [instructorInfo, setInstructorInfo] = useState(initialValues);

  const {
    data: instructorInformation,
    isLoading: isLoadinginstructorInformation,
    refetch,
  } = useGetInstructor({
    onSuccess: (res) => {
      console.log(res, 'res');
      setInstructorInfo({
        instructor_id: res?.instructor_id,
        instructor_name: res?.instructor_name,
        email: res?.email,
        phone_number: res?.phone_number || '',
      });
    },
    onError: (err) => {
      Navigate(-1);
      console.log(err);
    },
    cacheTime: 0,
  });

  const { mutate: updateInstructor } = useUpdateInstructor({
    onSuccess: (res) => {
      console.log(res, 'success');
      toast({
        title: 'Updated',
        description: res?.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: 'Not Updated',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const formik = useFormik({
    initialValues: instructorInfo,
    validationSchema: editInstructorValidation,
    isInitialValid: true,
    onSubmit: (values) => {
      console.log(values, 'submit');
      updateInstructor({
        instructor_id: values.instructor_id,
        instructor_name: values.instructor_name,
        email: values.email,
        phone_number: values.phone_number,
        old_password: values.old_password,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });
      refetch();
      //   setinstructorInfo(values)
    },
    enableReinitialize: true,
  });

  const { values, handleChange, handleBlur } = formik;
  return (
    <Fragment>
      {!isLoadinginstructorInformation ? (
        <Card my={5}>
          <CardBody>
            <Flex justifyContent={'flex-end'}>
              <Button onClick={() => setIsEdit(!isEdit)} mb={10}>
                {isEdit ? <HiLockClosed /> : <HiLockOpen />}
              </Button>
            </Flex>
            <SimpleGrid columns={[1, 2]} spacing={10}>
              <FormControl>
                <FormLabel color={'f3f3f3'} fontSize={'sm'} mb={3}>
                  instructor ID
                </FormLabel>
                <Input
                  placeholder='instructor ID'
                  name='instructor_id'
                  id='instructor_id'
                  value={values?.instructor_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  borderColor={
                    formik.errors.instructor_id &&
                    formik.touched.instructor_id &&
                    'tomato'
                  }
                  isDisabled={true}
                />
                {formik.touched.instructor_id &&
                  formik.errors.instructor_id && (
                    <Text color={'tomato'}>{formik.errors.instructor_id}</Text>
                  )}
              </FormControl>

              <FormControl>
                <FormLabel color={'f3f3f3'} fontSize={'sm'} mb={3}>
                  Name
                </FormLabel>
                <Input
                  placeholder='Name'
                  name='instructor_name'
                  id='instructor_name'
                  value={values?.instructor_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isDisabled={!isEdit}
                  borderColor={
                    formik.errors.instructor_name &&
                    formik.touched.instructor_name &&
                    'tomato'
                  }
                />
                {formik.touched.instructor_name &&
                  formik.errors.instructor_name && (
                    <Text color={'tomato'}>
                      {formik.errors.instructor_name}
                    </Text>
                  )}
              </FormControl>

              <FormControl>
                <FormLabel color={'f3f3f3'} fontSize={'sm'} mb={3}>
                  Email
                </FormLabel>
                <Input
                  placeholder='Email'
                  name='email'
                  id='email'
                  value={values?.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isDisabled={!isEdit}
                  borderColor={
                    formik.errors.email && formik.touched.email && 'tomato'
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <Text color={'tomato'}>{formik.errors.email}</Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel color={'f3f3f3'} fontSize={'sm'} mb={3}>
                  Phone Number
                </FormLabel>
                <Input
                  placeholder='05********'
                  name='phone_number'
                  id='phone_number'
                  value={values?.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isDisabled={!isEdit}
                  borderColor={
                    formik.errors.phone_number &&
                    formik.touched.phone_number &&
                    'tomato'
                  }
                />
                {formik.touched.phone_number && formik.errors.phone_number && (
                  <Text color={'tomato'}>{formik.errors.phone_number}</Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel color={'f3f3f3'} fontSize={'sm'} mb={3}>
                  Old Password
                </FormLabel>
                <Input
                  type={'password'}
                  placeholder='**********'
                  name='old_password'
                  id='old_password'
                  value={values?.old_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isDisabled={!isEdit}
                />
              </FormControl>

              <FormControl>
                <FormLabel color={'f3f3f3'} fontSize={'sm'} mb={3}>
                  New Password
                </FormLabel>
                <Input
                  type={'password'}
                  placeholder='**********'
                  name='password'
                  id='password'
                  value={values?.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isDisabled={!isEdit}
                  borderColor={
                    formik.errors.password &&
                    formik.touched.password &&
                    'tomato'
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <Text color={'tomato'}>{formik.errors.password}</Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel color={'f3f3f3'} fontSize={'sm'} mb={3}>
                  Password Confirmation
                </FormLabel>
                <Input
                  type={'password'}
                  placeholder='**********'
                  name='password_confirmation'
                  id='password_confirmation'
                  value={values?.password_confirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isDisabled={!isEdit}
                  borderColor={
                    formik.errors.password_confirmation &&
                    formik.touched.password_confirmation &&
                    'tomato'
                  }
                />
                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation && (
                    <Text color={'tomato'}>
                      {formik.errors.password_confirmation}
                    </Text>
                  )}
              </FormControl>
            </SimpleGrid>

            <Button
              onClick={() => formik.handleSubmit()}
              mt={8}
              isDisabled={!isEdit || !formik.isValid}
            >
              Save
            </Button>
          </CardBody>
        </Card>
      ) : (
        <Box display={'flex'} justifyContent='center' mt={5}>
          <Spinner />
        </Box>
      )}
    </Fragment>
  );
};

export default InstructorProfile;
