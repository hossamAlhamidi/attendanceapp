import React, { Fragment, useState, useMemo } from 'react';
import {
  Box,
  Input,
  Button,
  Stack,
  Card,
  Text,
  Flex,
  SimpleGrid,
  Checkbox,
  HStack,
  useToast,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import { GET_SECTIONS } from '../../services/queryKeys';
import { useFormik, Field, FormikProvider } from 'formik';
import { useGetAllCourses } from '../../services/query/courses';
import { isEmpty } from '../../components/ModalTemplate';
import CustomSelect from '../../components/CustomeSelect';
import { useAddSection } from '../../services/query/sections';
import { useGetAllInstructor } from '../../services/query/instructors';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TOTAL_COUNT } from '../../services/queryKeys';
import { addSectionValidation } from './utils';
const AddSection = () => {
  const [is_instructor_id_validation, set_is_Instructor_id_validation] =
    useState('required');
  const [is_course_validation, set_is_course_validation] = useState('required');
  const customValidate = (values) => {
    let errors = {};

    try {
      addSectionValidation.validateSync(values, { abortEarly: false });
    } catch (error) {
      error.inner.forEach((err) => {
        if (err.path !== 'instructor_id') {
          errors[err.path] = err.message;
        }
      });
    }

    return errors;
  };
  const [isSameTime, setIsSameTime] = useState(true);
  const [isTutorial, setIsTutorial] = useState(false);
  const [isLab, setIsLab] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    data: coursesData,
    isLoading: isLoadingCourses,
    refetch: getAllCourses,
  } = useGetAllCourses({
    onSuccess: (res) => {
      // console.log(res, 'success');
    },
    onError: (err) => {
      console.log(err, 'error');
    },
  });

  const {
    data: instructors,
    isLoading: isLoadingInstructor,
    refetch: getAllInstructors,
  } = useGetAllInstructor({
    onSuccess: (res) => {
      // console.log(res, 'success');
    },
    onError: (err) => {
      console.log(err, 'error');
    },
  });

  const instructorOptions = useMemo(() => {
    if (instructors && !isEmpty(instructors)) {
      const derivedOptions = instructors.map((option) => {
        return {
          value: option.instructor_id,
          label: option.instructor_name,
        };
      });

      return [
        // {value:"",label:"Not chosen yet"},
        ...derivedOptions,
      ];
    }
    return [];
  }, [instructors]);

  const courseOptions = useMemo(() => {
    if (coursesData && !isEmpty(coursesData)) {
      const derivedOptions = coursesData.map((option) => {
        return {
          value: option.course_id,
          label: `${option.course_id}: ${option.course_name}`,
          has_lab: option.has_lab,
          has_tutorial: option.has_tutorial,
        };
      });

      return [...derivedOptions];
    }
    return [];
  }, [coursesData]);

  const {
    mutate: addSection,
    data,
    isLoading,
  } = useAddSection({
    onSuccess: (res) => {
      console.log(res, 'success');
      toast({
        title: 'success',
        description: 'Your section has been added',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      // queryClient.invalidateQueries([ADD_SECTION]);
      queryClient.refetchQueries({ queryKey: [GET_SECTIONS] });
      queryClient.refetchQueries({ queryKey: [TOTAL_COUNT] });
      navigate('/dashboard');
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const initValues = {
    section_id: '',
    course: '',
    course_name: '',
    instructor_id: '',
    instructor_name: '',
    classroom: '',
    same_time: true,
    // sun:false,
    // mon:false,
    // tue:false,
    // wed:false,
    // thu:false,
    days: [],
    from: '',
    to: '',
    sunday_from: '',
    sunday_to: '',
    monday_from: '',
    monday_to: '',
    tuesday_from: '',
    tuesday_to: '',
    wednesday_from: '',
    wednesday_to: '',
    thursday_from: '',
    thursday_to: '',
    tutorial_section_id: '',
    tutorial_instructor_id: '',
    tutorial_instructor_name: '',
    tutorial_classroom: '',
    tutorial_day: '',
    tutorial_from: '',
    tutorial_to: '',
    lab_section_id: '',
    lab_instructor_id: '',
    lab_instructor_name: '',
    lab_classroom: '',
    lab_day: '',
    lab_from: '',
    lab_to: '',
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: addSectionValidation,
    // validate:customValidate,
    isInitialValid: false,
    onSubmit: (values) => {
      console.log(values, 'values');
      let obj = {
        section_id: values.section_id,
        course_id: values.course,
        course_name: values.course_name,
        instructor_id: values.instructor_id,
        instructor_name: values.instructor_name,
        classroom: values.classroom,
        time: '',
      };
      if (isSameTime) {
        for (let i = 0; i < values.days.length - 1; i++) {
          obj.time += `"${values.days[i]}":"${values.from}-${values.to}",`;
        }
        obj.time += `"${values.days[values.days.length - 1]}":"${values.from}-${
          values.to
        }"`;
        obj.time = `{${obj.time}}`;

        // addSection(obj)
      } else {
        for (let i = 0; i < values.days.length - 1; i++) {
          obj.time += `"${values.days[i]}":"${
            values[`${values.days[i]}_from`]
          }-${values[`${values.days[i]}_to`]}",`;
        }
        obj.time += `"${values.days[values.days.length - 1]}":"${
          values[`${values.days[values.days.length - 1]}_from`]
        }-${values[`${values.days[values.days.length - 1]}_to`]}"`;
        obj.time = `{${obj.time}}`;

        // addSection(obj)
      }
      if (isTutorial) {
        obj.tutorial_section_id = formik.values.section_id
          ? formik.values.section_id + 1
          : '';
        obj.tutorial_instructor_id = values.tutorial_instructor_id;
        obj.tutorial_instructor_name = values.tutorial_instructor_name;
        obj.tutorial_classroom = values.tutorial_classroom;
        obj.tutorial_day = values.tutorial_day;
        obj.tutorial_time = `"${values.tutorial_day}":"${values.tutorial_from}-${values.tutorial_to}"`;
        obj.tutorial_time = `{${obj.tutorial_time}}`;
      }
      if (isLab) {
        obj.lab_section_id = formik.values.section_id
          ? formik.values.section_id + 2
          : '';
        obj.lab_instructor_id = values.lab_instructor_id;
        obj.lab_instructor_name = values.lab_instructor_name;
        obj.lab_classroom = values.lab_classroom;
        obj.lab_day = values.lab_day;
        obj.lab_time = `"${values.lab_day}":"${values.lab_from}-${values.lab_to}"`;
        obj.lab_time = `{${obj.lab_time}}`;
      }
      console.log(obj, 'obj');
      addSection(obj);

      // setInitialValues(initValues)
    },
  });
  return (
    <FormikProvider value={formik}>
      <Fragment>
        <Box mb={10}>
          <IoIosArrowBack
            size={24}
            cursor='pointer'
            onClick={() => navigate(-1)}
          />
        </Box>

        <SimpleGrid columns={[1, 2]} spacing={10}>
          <Box>
            <Text mb='8px'>Section ID </Text>
            <Input
              type={'number'}
              id='section_id'
              name='section_id'
              onChange={formik.handleChange}
              value={formik.values.section_id}
              onBlur={formik.handleBlur}
              placeholder='22356'
              size='md'
              mb={'10px'}
              borderColor={
                formik.errors.section_id &&
                formik.touched.section_id &&
                'tomato'
              }
            />
            {formik.touched.section_id && formik.errors.section_id && (
              <Text color={'tomato'}>{formik.errors.section_id}</Text>
            )}
          </Box>

          <Box>
            <Text mb='8px'>Selected Course</Text>
            <Field
              className='custom-select'
              name='course'
              id='course'
              options={courseOptions}
              component={CustomSelect}
              // setFieldTouched={setFieldTouched}
              placeholder='Select...'
              isMulti={false}
              // menuShouldScrollIntoView
              hideSelectedOptions
              setFieldTouched={formik.setFieldTouched}
              isSearchable
              setIsTutorial={setIsTutorial}
              setCourseError={set_is_course_validation}
              setIsLab={setIsLab}
              onBlur={() => {
                formik.setFieldTouched('course', true);
                formik.handleBlur('course');
              }}
            />
            {formik.touched.course && (
              <Text color={'tomato'}>{is_course_validation}</Text>
            )}
          </Box>

          <Box>
            <Text mb='8px'>Selected Instructor</Text>
            <Field
              className='custom-select'
              name='instructor_id'
              id='instructor_id'
              options={instructorOptions}
              component={CustomSelect}
              // setFieldTouched={setFieldTouched}
              placeholder='Select...'
              isMulti={false}
              // menuShouldScrollIntoView
              hideSelectedOptions
              isSearchable
              setFieldTouched={formik.setFieldTouched}
              setInstructorIdError={set_is_Instructor_id_validation}
              // validateField={'instructor_id'}
              onBlur={() => {
                formik.setFieldTouched('instructor_id', true, true);
                formik.handleBlur('instructor_id');
                console.log('lost blur');
              }}
              borderColor={
                formik.errors.instructor_id &&
                formik.touched.instructor_id &&
                'tomato'
              }
            />
            {formik.touched.instructor_id && (
              <Text color={'tomato'}>{is_instructor_id_validation}</Text>
            )}
          </Box>

          <Box>
            <Text mb='8px'>classroom </Text>
            <Input
              id='classroom'
              name='classroom'
              onChange={formik.handleChange}
              value={formik.values.classroom}
              placeholder='9'
              size='md'
              mb={'10px'}
              onBlur={formik.handleBlur}
              borderColor={
                formik.errors.classroom && formik.touched.classroom && 'tomato'
              }
            />
            {formik.touched.classroom && formik.errors.classroom && (
              <Text color={'tomato'}>{formik.errors.classroom}</Text>
            )}
          </Box>
        </SimpleGrid>
        {/* <Text>Time</Text> */}
        <Card py={10} px={5} my={10}>
          <Flex justifyContent={'space-between'}>
            <HStack justifyContent={'space-between'}>
              <Box textAlign={'center'}>
                <Text>Sun</Text>
                <Checkbox
                  name='days'
                  id='sun'
                  value={'sunday'}
                  onChange={formik.handleChange}
                  size='md'
                  colorScheme='green'
                />
              </Box>

              <Box textAlign={'center'}>
                <Text>Mon</Text>
                <Checkbox
                  size='md'
                  colorScheme='green'
                  name='days'
                  id='mon'
                  value={'monday'}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box textAlign={'center'}>
                <Text>Tue</Text>
                <Checkbox
                  name='days'
                  id='tue'
                  value={'tuesday'}
                  onChange={formik.handleChange}
                  size='md'
                  colorScheme='green'
                />
              </Box>
              <Box textAlign={'center'}>
                <Text>Wed</Text>
                <Checkbox
                  name='days'
                  id='wed'
                  value={'wednesday'}
                  onChange={formik.handleChange}
                  size='md'
                  colorScheme='green'
                />
              </Box>
              <Box textAlign={'center'}>
                <Text>Thu</Text>
                <Checkbox
                  name='days'
                  id='thu'
                  value={'thursday'}
                  onChange={formik.handleChange}
                  size='md'
                  colorScheme='green'
                />
              </Box>
            </HStack>

            <Box textAlign={'center'}>
              <Text>All same time?</Text>
              <Checkbox
                size='md'
                name='same_time'
                value={formik.values.same_time}
                colorScheme='green'
                onChange={() => {
                  setIsSameTime(!isSameTime);
                  // formik.handleChange()
                  formik.setFieldValue('same_time', !isSameTime);
                }}
                defaultChecked
              />
            </Box>
          </Flex>
          {isSameTime ? (
            <SimpleGrid columns={[1, 2]} spacing={10}>
              <Box>
                <Text mb='8px'>From </Text>
                <Input
                  type={'time'}
                  id='from'
                  name='from'
                  onChange={formik.handleChange}
                  value={formik.values.from}
                  // placeholder='@example Project Software Management '
                  size='md'
                  mb={'10px'}
                  isDisabled={isEmpty(formik.values.days)}
                  onBlur={formik.handleBlur}
                />
              </Box>

              <Box>
                {/* <Text>{JSON.stringify(formik.values.to)}</Text>
            <Text>{JSON.stringify(formik.errors)}</Text> */}
                <Text mb='8px'>To </Text>
                <Input
                  type={'time'}
                  id='to'
                  name='to'
                  onChange={formik.handleChange}
                  value={formik.values.to}
                  // placeholder='@example Project Software Management '
                  size='md'
                  mb={'10px'}
                  isDisabled={isEmpty(formik.values.from)}
                  onBlur={formik.handleBlur}
                  borderColor={
                    formik.errors.from && formik.touched.from && 'tomato'
                  }
                />
                {formik.errors.from && formik.touched.from && (
                  <Text color={'tomato'}>
                    {formik.errors.from || formik.errors.to}
                  </Text>
                )}
              </Box>
            </SimpleGrid>
          ) : (
            formik.values.days.map((day, i) => {
              return (
                <SimpleGrid columns={[1, 2]} spacing={10} key={i}>
                  <Box>
                    <Text mb='8px'>{day} from </Text>
                    <Input
                      type={'time'}
                      id='from'
                      name={`${day}_from`}
                      onChange={(e) => {
                        formik.handleChange(e);
                        // formik.values.days.includes(day)?formik.values[`${day}_from`] :null
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values[`${day}_from`]}
                      // placeholder='@example Project Software Management '
                      size='md'
                      mb={'10px'}
                      isDisabled={isEmpty(formik.values.days)}
                    />
                  </Box>

                  <Box>
                    <Text mb='8px'>{day} to </Text>
                    <Input
                      type={'time'}
                      id='to'
                      name={`${day}_to`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[`${day}_to`]}
                      // placeholder='@example Project Software Management '
                      size='md'
                      mb={'10px'}
                      isDisabled={isEmpty(formik.values[`${day}_from`])}
                    />
                    {formik.errors[`${day}_from`] &&
                      formik.touched[`${day}_from`] && (
                        <Text color={'tomato'}>
                          {formik.errors[`${day}_from`] ||
                            formik.values[`${day}_to`]}
                        </Text>
                      )}
                  </Box>
                </SimpleGrid>
              );
            })
          )}
        </Card>
        {isTutorial == 1 && (
          <Card py={10} px={5} my={10}>
            <Text mb={10} fontWeight={'bold'}>
              Tutorial
            </Text>
            <SimpleGrid columns={[1, 2]} spacing={10}>
              <Box>
                <Text mb='8px'>Section ID </Text>
                <Input
                  type={'number'}
                  id='tutorial_section_id'
                  name='tutorial_section_id'
                  onChange={formik.handleChange}
                  value={
                    formik.values.section_id ? formik.values.section_id + 1 : ''
                  }
                  placeholder='22356'
                  size='md'
                  mb={'10px'}
                  isDisabled
                />
              </Box>

              <Box>
                <Text mb='8px'>Selected Instructor</Text>
                <Field
                  className='custom-select'
                  name='tutorial_instructor_id'
                  id='tutorial_instructor_id'
                  options={instructorOptions}
                  component={CustomSelect}
                  // setFieldTouched={setFieldTouched}
                  placeholder='Select...'
                  isMulti={false}
                  // menuShouldScrollIntoView
                  hideSelectedOptions
                  isSearchable
                />
              </Box>

              <Box>
                <Text mb='8px'>classroom </Text>
                <Input
                  id='tutorial_classroom'
                  name='tutorial_classroom'
                  onChange={formik.handleChange}
                  value={formik.values.tutorial_classroom}
                  placeholder='9'
                  size='md'
                  mb={'10px'}
                />
              </Box>
            </SimpleGrid>
            <Card py={10} px={5} my={10}>
              <Box>
                <RadioGroup my={5} name={'tutorial_day'} id={'tutorial_day'}>
                  <Stack direction='row'>
                    <Box textAlign={'center'}>
                      <Text>Sun</Text>
                      <Radio
                        name={'tutorial_day'}
                        onChange={formik.handleChange}
                        value='sunday'
                      ></Radio>
                    </Box>
                    <Box textAlign={'center'}>
                      <Text>Mon</Text>
                      <Radio
                        name={'tutorial_day'}
                        onChange={formik.handleChange}
                        value='monday'
                      ></Radio>
                    </Box>
                    <Box textAlign={'center'}>
                      <Text>Tue</Text>
                      <Radio
                        name={'tutorial_day'}
                        onChange={formik.handleChange}
                        value='tuesday'
                      ></Radio>
                    </Box>
                    <Box textAlign={'center'}>
                      <Text>Wed</Text>
                      <Radio
                        name={'tutorial_day'}
                        onChange={formik.handleChange}
                        value='wednesday'
                      ></Radio>
                    </Box>
                    <Box textAlign={'center'}>
                      <Text>Thu</Text>
                      <Radio
                        name={'tutorial_day'}
                        onChange={formik.handleChange}
                        value='thursday'
                      ></Radio>
                    </Box>
                  </Stack>
                </RadioGroup>
              </Box>
              <SimpleGrid columns={[1, 2]} spacing={10}>
                <Box>
                  <Text mb='8px'>From </Text>
                  <Input
                    type={'time'}
                    id='tutorial_from'
                    name='tutorial_from'
                    onChange={formik.handleChange}
                    value={formik.values.tutorial_from}
                    onBlur={formik.handleBlur}
                    // placeholder='@example Project Software Management '
                    size='md'
                    mb={'10px'}
                    isDisabled={isEmpty(formik.values.tutorial_day)}
                  />
                </Box>

                <Box>
                  <Text mb='8px'>To </Text>
                  <Input
                    type={'time'}
                    id='tutorial_to'
                    name='tutorial_to'
                    onChange={formik.handleChange}
                    value={formik.values.tutorial_to}
                    // placeholder='@example Project Software Management '
                    size='md'
                    mb={'10px'}
                    onBlur={formik.handleBlur}
                    isDisabled={isEmpty(formik.values.tutorial_from)}
                    borderColor={
                      formik.errors.tutorial_from &&
                      formik.touched.tutorial_from &&
                      'tomato'
                    }
                  />
                  {formik.errors.tutorial_from &&
                    formik.touched.tutorial_from && (
                      <Text color={'tomato'}>
                        {formik.errors.tutorial_from ||
                          formik.errors.tutorial_to}
                      </Text>
                    )}
                  {formik.errors.tutorial_to && formik.touched.tutorial_to && (
                    <Text color={'tomato'}>
                      {formik.errors.tutorial_to || formik.errors.tutorial_to}
                    </Text>
                  )}
                </Box>
              </SimpleGrid>
            </Card>
          </Card>
        )}
        {isLab == 1 && (
          <Card py={10} px={5} my={10}>
            <Text mb={10} fontWeight={'bold'}>
              Lab
            </Text>
            <SimpleGrid columns={[1, 2]} spacing={10}>
              <Box>
                <Text mb='8px'>Section ID </Text>
                <Input
                  type={'number'}
                  id='lab_section_id'
                  name='lab_section_id'
                  onChange={formik.handleChange}
                  value={
                    formik.values.section_id ? formik.values.section_id + 2 : ''
                  }
                  placeholder='22356'
                  size='md'
                  mb={'10px'}
                  isDisabled
                />
              </Box>

              <Box>
                <Text mb='8px'>Selected Instructor</Text>
                <Field
                  className='custom-select'
                  name='lab_instructor_id'
                  id='lab_instructor_id'
                  options={instructorOptions}
                  component={CustomSelect}
                  // setFieldTouched={setFieldTouched}
                  placeholder='Select...'
                  isMulti={false}
                  // menuShouldScrollIntoView
                  hideSelectedOptions
                  isSearchable
                />
              </Box>

              <Box>
                <Text mb='8px'>classroom </Text>
                <Input
                  id='lab_classroom'
                  name='lab_classroom'
                  onChange={formik.handleChange}
                  value={formik.values.lab_classroom}
                  placeholder='9'
                  size='md'
                  mb={'10px'}
                />
              </Box>
            </SimpleGrid>

            <Card py={10} px={5} my={10}>
              <Box>
                <RadioGroup my={5} name={'lab_day'} id={'lab_day'}>
                  <Stack direction='row'>
                    <Box textAlign={'center'}>
                      <Text>Sun</Text>
                      <Radio
                        name={'lab_day'}
                        onChange={formik.handleChange}
                        value='sunday'
                      ></Radio>
                    </Box>
                    <Box textAlign={'center'}>
                      <Text>Mon</Text>
                      <Radio
                        name={'lab_day'}
                        onChange={formik.handleChange}
                        value='monday'
                      ></Radio>
                    </Box>
                    <Box textAlign={'center'}>
                      <Text>Tue</Text>
                      <Radio
                        name={'lab_day'}
                        onChange={formik.handleChange}
                        value='tuesday'
                      ></Radio>
                    </Box>
                    <Box textAlign={'center'}>
                      <Text>Wed</Text>
                      <Radio
                        name={'lab_day'}
                        onChange={formik.handleChange}
                        value='wednesday'
                      ></Radio>
                    </Box>
                    <Box textAlign={'center'}>
                      <Text>Thu</Text>
                      <Radio
                        name={'lab_day'}
                        onChange={formik.handleChange}
                        value='thursday'
                      ></Radio>
                    </Box>
                  </Stack>
                </RadioGroup>
              </Box>
              <SimpleGrid columns={[1, 2]} spacing={10}>
                <Box>
                  <Text mb='8px'>From </Text>
                  <Input
                    type={'time'}
                    id='lab_from'
                    name='lab_from'
                    onChange={formik.handleChange}
                    value={formik.values.lab_from}
                    // placeholder='@example Project Software Management '
                    size='md'
                    mb={'10px'}
                    onBlur={formik.handleBlur}
                    isDisabled={isEmpty(formik.values.lab_day)}
                  />
                </Box>

                <Box>
                  <Text mb='8px'>To </Text>
                  <Input
                    type={'time'}
                    id='lab_to'
                    name='lab_to'
                    onChange={formik.handleChange}
                    value={formik.values.lab_to}
                    // placeholder='@example Project Software Management '
                    size='md'
                    mb={'10px'}
                    onBlur={formik.handleBlur}
                    isDisabled={isEmpty(formik.values.lab_from)}
                    borderColor={
                      formik.errors.lab_from &&
                      formik.touched.lab_from &&
                      'tomato'
                    }
                  />
                  {formik.errors.lab_from && formik.touched.lab_from && (
                    <Text color={'tomato'}>
                      {formik.errors.lab_from || formik.errors.to}
                    </Text>
                  )}
                  {formik.errors.lab_to && formik.touched.lab_to && (
                    <Text color={'tomato'}>
                      {formik.errors.lab_to || formik.errors.to}
                    </Text>
                  )}
                </Box>
              </SimpleGrid>
            </Card>
          </Card>
        )}
        {/* <Text>{JSON.stringify(!formik.isValid&&!isEmpty(is_course_validation)||!isEmpty(is_instructor_id_validation))}</Text> */}
        <Button
          onClick={formik.handleSubmit}
          disabled={
            !formik.isValid ||
            !isEmpty(is_course_validation) ||
            !isEmpty(is_instructor_id_validation)
          }
        >
          Add Section
        </Button>
      </Fragment>
    </FormikProvider>
  );
};

export default AddSection;
