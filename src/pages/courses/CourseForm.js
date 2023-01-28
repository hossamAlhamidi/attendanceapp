import React, { Fragment } from 'react';
import {
  Box,
  Input,
  useColorModeValue,
  InputGroup,
  Button,
  Stack,
  InputLeftElement,
  Card,
  CardHeader,
  Select,
  CardFooter,
  Heading,
  CardBody,
  Text,
  Flex,
  SimpleGrid,
  useDisclosure,
  Label,
  useToast,
  Checkbox,
  CheckboxGroup,
  Icon,
} from '@chakra-ui/react';
const CourseForm = ({ formik, isLoading, onClose, isEditing }) => {
  return (
    <Fragment>
      <Box mx={'5px'}>
        <Text mb='8px'>Course Id </Text>
        <Input
          id='course_id'
          name='course_id'
          onChange={formik.handleChange}
          value={formik.values.course_id}
          placeholder='@example 466'
          size='md'
          mb={'10px'}
          isDisabled={isEditing}
        />
        <Text mb='8px'>Course Name </Text>
        <Input
          id='course_name'
          name='course_name'
          onChange={formik.handleChange}
          value={formik.values.course_name}
          placeholder='@example Project Software Management '
          size='md'
          mb={'10px'}
        />
        {!isEditing&&
        <Box>
        <Text mb='8px'>abbreviation </Text>
        <Input
          id='abbreviation'
          name='abbreviation'
          onChange={formik.handleChange}
          value={formik.values.abbreviation}
          placeholder='@example i.e SWE'
          size='md'
          mb={'10px'}
        />
        </Box>
}
        <Text mb='8px'>Course Hours </Text>
        <Input
          id='course_hours'
          name='course_hours'
          type={'number'}
          max={6}
          min={1}
          onChange={formik.handleChange}
          value={formik.values.course_hours}
          placeholder='@example 3'
          size='md'
          mb={'10px'}
        />

        {/* <CheckboxGroup colorScheme='green' defaultValue={['has_tutorial']}> */}
        <Stack my={4} spacing={[1, 5]} direction='row'>
          <Checkbox
            defaultChecked
            name='has_tutorial'
            id='has_tutorial'
            value={formik.values.has_tutorial}
            onChange={formik.handleChange}
            isDisabled={isEditing}
          >
            has tutorial
          </Checkbox>
          <Checkbox
            name='has_lab'
            id='has_lab'
            value={formik.values.has_lab}
            onChange={formik.handleChange}
            isDisabled={isEditing}
          >
            has lab
          </Checkbox>
        </Stack>
        {/* </CheckboxGroup> */}
      </Box>
      <Flex alignItems={'center'}>
        <Button
          isLoading={isLoading}
          type='submit'
          m={'10px'}
          colorScheme={'blue'}
        >
          Submit
        </Button>
        <Button
          type='button'
          m={'10px'}
          onClick={() => {
            onClose();
            formik.resetForm();
          }}
        >
          Cancel
        </Button>
      </Flex>
    </Fragment>
  );
};

export default CourseForm;
