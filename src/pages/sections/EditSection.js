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
  Spinner,
} from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import { GET_SECTIONS } from '../../services/queryKeys';
import { useFormik, Field, FormikProvider } from 'formik';
import { useGetAllCourses } from '../../services/query/courses';
import { isEmpty } from '../../components/ModalTemplate';
import CustomSelect from '../../components/CustomeSelect';
import { useGetAllInstructor } from '../../services/query/instructors';
import { useQueryClient } from 'react-query';
import { useGetSectionById } from '../../services/query/sections';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useUpdateSection } from '../../services/query/sections';
const EditSection = () => {
  const [isSameTime, setIsSameTime] = useState(true);
  const [isTutorial, setIsTutorial] = useState(false);
  const [isLab, setIsLab] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isChangeTime, setIsChangeTime] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { id } = params || '';
  const { section } = location.state || '';

  if (isEmpty(section)) {
    navigate('/dashboard');
  }

  const {
    data: sectionInfo,
    isLoading: isLoadingSection,
    refetch: getSection,
  } = useGetSectionById(id, {
    onSuccess: (res) => {
      // console.log(res, 'success');
      setSectionDetails({
        ...initValues,
        section_id: res?.section_id,
        course: res?.course_id,
        course_name: res?.course_name,
        instructor_name: res?.instructor_name,
        instructor_id: res?.instructor_id,
        selected_instructor: {
          label: res?.instructor_name,
          value: res?.instructor_id,
        },
        classroom: res?.classroom || '',
        type: res.type,
        time: res.time,
      });
    },
    onError: (err) => {
      console.log(err, 'error');
    },
    cacheTime: 0,
  });

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

  //   const {mutate:addSection,data,isLoading} = useAddSection({
  //     onSuccess:(res)=>{
  //       console.log(res,"success")
  //       toast({
  //         title: 'success',
  //         description: 'Your section has been added',
  //         status: 'success',
  //         duration: 5000,
  //         isClosable: true,
  //         position: 'top-right',
  //       });
  //       // queryClient.invalidateQueries([ADD_SECTION]);
  //       queryClient.refetchQueries({ queryKey: [GET_SECTIONS] })
  //       navigate("/sections")
  //     },
  //     onError:(err)=>{
  //       toast({
  //         title: 'Error',
  //         description: err?.response?.data?.message,
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true,
  //         position: 'top-right',
  //       });

  //     }
  //   })

  const { mutate: updateSection, isLoading: isLoadingUpdate } =
    useUpdateSection({
      onSuccess: (res) => {
        toast({
          title: 'success',
          description: 'section info is updated',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        queryClient.refetchQueries({ queryKey: [GET_SECTIONS] });
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
    selected_instructor: '',
    instructor_id: '',
    instructor_name: '',
    classroom: '',
    // same_time:true,
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
    // tutorial_section_id:"",
    // tutorial_instructor_id:"",
    // tutorial_instructor_name:"",
    // tutorial_classroom:"",
    tutorial_day: '',
    tutorial_from: '',
    tutorial_to: '',
    // lab_section_id:"",
    // lab_instructor_id:"",
    // lab_instructor_name:"",
    // lab_classroom:"",
    lab_day: '',
    lab_from: '',
    lab_to: '',
  };
  const [sectionDetails, setSectionDetails] = useState(initValues);

  const formik = useFormik({
    initialValues: sectionDetails,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      let obj = {
        section_id: values.section_id,
        course_id: values.course,
        course_name: values.course_name,
        instructor_id: values.instructor_id,
        instructor_name: values.instructor_name,
        classroom: values.classroom,
        time: !isChangeTime ? values.time : '',
      };
      if (isChangeTime) {
        if (isSameTime) {
          for (let i = 0; i < values.days?.length - 1; i++) {
            obj.time += `"${values.days[i]}":"${values.from}-${values.to}",`;
          }
          obj.time += `"${values.days[values.days.length - 1]}":"${
            values.from
          }-${values.to}"`;
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
        if (sectionDetails.type.toLowerCase() == 'tutorial') {
          // obj.tutorial_section_id = formik.values.section_id?formik.values.section_id+1:""
          // obj.tutorial_instructor_id = values.tutorial_instructor_id
          // obj.tutorial_instructor_name = values.tutorial_instructor_name
          // obj.tutorial_classroom = values.tutorial_classroom
          obj.tutorial_day = values.tutorial_day;
          obj.time = `"${values.tutorial_day}":"${values.tutorial_from}-${values.tutorial_to}"`;
          obj.time = `{${obj.time}}`;
        }
        if (sectionDetails.type.toLowerCase() == 'lab') {
          // obj.lab_section_id = formik.values.section_id?formik.values.section_id+2:""
          // obj.lab_instructor_id = values.lab_instructor_id
          // obj.lab_instructor_name = values.lab_instructor_name
          // obj.lab_classroom = values.lab_classroom
          obj.lab_day = values.lab_day;
          obj.time = `"${values.lab_day}":"${values.lab_from}-${values.lab_to}"`;
          obj.time = `{${obj.time}}`;
        }
      }
      console.log(obj, 'obj');
      updateSection(obj);

      // setInitialValues(initValues)
    },
  });
  // console.log((formik.values?.time),'time')
  return (
    <FormikProvider value={formik}>
      {!isLoadingSection ? (
        <Fragment>
          <Box mb={10}>
            <IoIosArrowBack
              size={24}
              cursor='pointer'
              onClick={() => navigate(-1)}
            />
          </Box>

          {sectionDetails?.type?.toLowerCase() == 'lecture' && (
            <SimpleGrid columns={[1, 2]} spacing={10}>
              <Box>
                <Text mb='8px'>Section ID </Text>
                <Input
                  type={'number'}
                  id='section_id'
                  name='section_id'
                  onChange={formik.handleChange}
                  value={formik.values.section_id}
                  placeholder='22356'
                  size='md'
                  mb={'10px'}
                  isDisabled
                />
              </Box>

              <Box>
                <Text mb='8px'>Selected Course</Text>
                <Input
                  id='course'
                  name='course'
                  onChange={formik.handleChange}
                  value={formik.values.course ? formik.values.course : ''}
                  placeholder='SWE 466'
                  size='md'
                  mb={'10px'}
                  isDisabled
                />
              </Box>

              {
                <Box>
                  <Flex justifyContent={'space-between'}>
                    <Text mb='8px'>Selected Instructor</Text>
                    <Checkbox onChange={() => setIsChange(!isChange)}>
                      Change Instructor?
                    </Checkbox>
                  </Flex>
                  {!isChange && (
                    <Box>
                      <Input
                        id='instructor_name'
                        name='instructor_name'
                        onChange={formik.handleChange}
                        value={formik.values.instructor_name}
                        placeholder='hossam'
                        size='md'
                        mb={'10px'}
                        isDisabled
                      />
                    </Box>
                  )}
                  {isChange && (
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
                    />
                  )}
                </Box>
              }
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
                />
              </Box>
            </SimpleGrid>
          )}
          {/* <Text>Time</Text> */}

          {/* <Text> {JSON.stringify(Object.entries(formik.values?.time||{}).filter((item)=>item[1]!='-'))}</Text> */}

          {sectionDetails?.type?.toLowerCase() == 'lecture' && (
            <>
              <Flex justifyContent={'space-between'}>
                <Text mb='8px' mt={10}>
                  Time{' '}
                </Text>
                <Checkbox onChange={() => setIsChangeTime(!isChangeTime)}>
                  Change Time?
                </Checkbox>
              </Flex>
              <Flex flexWrap={'wrap'}>
                {Object.entries(formik.values?.time || {}).filter(
                  (item) => item[1] == '-'
                )?.length != 5 ? (
                  Object.entries(formik.values?.time || {})
                    .filter((item) => item[1] != '-')
                    .map((item, i) => {
                      return (
                        <Flex key={i} my={2}>
                          <Text fontWeight={'bold'} mr={2}>
                            {item[0] + ': '}
                          </Text>
                          <Text>{item[1]}</Text>
                        </Flex>
                      );
                    })
                ) : (
                  <Text fontWeight={'bold'}>No time determined yet</Text>
                )}
              </Flex>

              {isChangeTime && (
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
                        colorScheme='green'
                        onChange={() => {
                          setIsSameTime(!isSameTime);
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
                        />
                      </Box>

                      <Box>
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
                        />
                      </Box>
                    </SimpleGrid>
                  ) : (
                    formik.values.days?.map((day, i) => {
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
                              value={formik.values[`${day}_from`]}
                              // placeholder='@example Project Software Management '
                              size='md'
                              mb={'10px'}
                            />
                          </Box>

                          <Box>
                            <Text mb='8px'>{day} to </Text>
                            <Input
                              type={'time'}
                              id='to'
                              name={`${day}_to`}
                              onChange={formik.handleChange}
                              value={formik.values[`${day}_to`]}
                              // placeholder='@example Project Software Management '
                              size='md'
                              mb={'10px'}
                            />
                          </Box>
                        </SimpleGrid>
                      );
                    })
                  )}
                </Card>
              )}
            </>
          )}
          {sectionDetails?.type?.toLowerCase() == 'tutorial' && (
            <>
              {
                <Card py={10} px={5} my={10}>
                  <Text mb={10} fontWeight={'bold'}>
                    Tutorial
                  </Text>
                  <SimpleGrid columns={[1, 2]} spacing={10}>
                    <Box>
                      <Text mb='8px'>Section ID </Text>
                      <Input
                        type={'number'}
                        id='section_id'
                        name='section_id'
                        onChange={formik.handleChange}
                        value={
                          formik.values.section_id
                            ? formik.values.section_id
                            : ''
                        }
                        placeholder='22356'
                        size='md'
                        mb={'10px'}
                        isDisabled
                      />
                    </Box>

                    <Box>
                      <Text mb='8px'>Selected Course</Text>
                      <Input
                        id='course_id'
                        name='course_id'
                        onChange={formik.handleChange}
                        value={formik.values.course_id}
                        placeholder='SWE 466'
                        size='md'
                        mb={'10px'}
                        isDisabled
                      />
                    </Box>

                    {
                      <Box>
                        <Flex justifyContent={'space-between'}>
                          <Text mb='8px'>Selected Instructor</Text>
                          <Checkbox onChange={() => setIsChange(!isChange)}>
                            Change Instructor?
                          </Checkbox>
                        </Flex>
                        {!isChange && (
                          <Box>
                            <Input
                              id='instructor_name'
                              name='instructor_name'
                              onChange={formik.handleChange}
                              value={formik.values.instructor_name}
                              placeholder='hossam'
                              size='md'
                              mb={'10px'}
                              isDisabled
                            />
                          </Box>
                        )}
                        {isChange && (
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
                          />
                        )}
                      </Box>
                    }

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
                      />
                    </Box>
                  </SimpleGrid>
                  <Flex justifyContent={'space-between'}>
                    <Text mb='8px' mt={10}>
                      Time{' '}
                    </Text>
                    <Checkbox onChange={() => setIsChangeTime(!isChangeTime)}>
                      Change Time?
                    </Checkbox>
                  </Flex>
                  <Flex flexWrap={'wrap'}>
                    {Object.entries(formik.values?.time || {}).filter(
                      (item) => item[1] == '-'
                    )?.length != 5 ? (
                      Object.entries(formik.values?.time || {})
                        .filter((item) => item[1] != '-')
                        .map((item, i) => {
                          return (
                            <Flex key={i} my={2}>
                              <Text fontWeight={'bold'} mr={2}>
                                {item[0] + ': '}
                              </Text>
                              <Text>{item[1]}</Text>
                            </Flex>
                          );
                        })
                    ) : (
                      <Text fontWeight={'bold'}>No time determined yet</Text>
                    )}
                  </Flex>
                  {isChangeTime && (
                    <Card py={10} px={5} my={10}>
                      <Box>
                        <RadioGroup
                          my={5}
                          name={'tutorial_day'}
                          id={'tutorial_day'}
                        >
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
                            // placeholder='@example Project Software Management '
                            size='md'
                            mb={'10px'}
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
                          />
                        </Box>
                      </SimpleGrid>
                    </Card>
                  )}
                </Card>
              }
            </>
          )}
          {sectionDetails?.type?.toLowerCase() == 'lab' && (
            <Card py={10} px={5} my={10}>
              <Text mb={10} fontWeight={'bold'}>
                Lab
              </Text>
              <SimpleGrid columns={[1, 2]} spacing={10}>
                <Box>
                  <Text mb='8px'>Section ID </Text>
                  <Input
                    type={'number'}
                    id='section_id'
                    name='section_id'
                    onChange={formik.handleChange}
                    value={
                      formik.values.section_id ? formik.values.section_id : ''
                    }
                    placeholder='22356'
                    size='md'
                    mb={'10px'}
                    isDisabled
                  />
                </Box>

                <Box>
                  <Text mb='8px'>Selected Course</Text>
                  <Input
                    id='course_id'
                    name='course_id'
                    onChange={formik.handleChange}
                    value={formik.values.course_id}
                    placeholder='SWE 466'
                    size='md'
                    mb={'10px'}
                    isDisabled
                  />
                </Box>

                {
                  <Box>
                    <Flex justifyContent={'space-between'}>
                      <Text mb='8px'>Selected Instructor</Text>
                      <Checkbox onChange={() => setIsChange(!isChange)}>
                        Change Instructor?
                      </Checkbox>
                    </Flex>
                    {!isChange && (
                      <Box>
                        <Input
                          id='instructor_name'
                          name='instructor_name'
                          onChange={formik.handleChange}
                          value={formik.values.instructor_name}
                          placeholder='hossam'
                          size='md'
                          mb={'10px'}
                          isDisabled
                        />
                      </Box>
                    )}
                    {isChange && (
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
                      />
                    )}
                  </Box>
                }

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
                  />
                </Box>
              </SimpleGrid>

              <Flex justifyContent={'space-between'}>
                <Text mb='8px' mt={10}>
                  Time{' '}
                </Text>
                <Checkbox onChange={() => setIsChangeTime(!isChangeTime)}>
                  Change Time?
                </Checkbox>
              </Flex>
              <Flex flexWrap={'wrap'}>
                {Object.entries(formik.values?.time || {}).filter(
                  (item) => item[1] == '-'
                )?.length != 5 ? (
                  Object.entries(formik.values?.time || {})
                    .filter((item) => item[1] != '-')
                    .map((item, i) => {
                      return (
                        <Flex key={i} my={2}>
                          <Text fontWeight={'bold'} mr={2}>
                            {item[0] + ': '}
                          </Text>
                          <Text>{item[1]}</Text>
                        </Flex>
                      );
                    })
                ) : (
                  <Text fontWeight={'bold'}>No time determined yet</Text>
                )}
              </Flex>
              {isChangeTime && (
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
                      />
                    </Box>
                  </SimpleGrid>
                </Card>
              )}
            </Card>
          )}
          <Button
            mt={5}
            isDisabled={isLoadingUpdate}
            onClick={formik.handleSubmit}
          >
            Edit Section
          </Button>
        </Fragment>
      ) : (
        <Box display={'flex'} justifyContent='center' mt={5}>
          <Spinner />
        </Box>
      )}
    </FormikProvider>
  );
};

export default EditSection;
