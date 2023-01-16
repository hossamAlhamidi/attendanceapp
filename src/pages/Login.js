import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
  useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import * as Yup from 'yup'
import { useFormik,Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../services/query/login";
import { Navigate } from "react-router-dom";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const toast = useToast();
const navigate = useNavigate()
  const initialValues = {
    instructor_id: '',
    password: '',
  };
  const validationSchema = Yup.object({
    instructor_id: Yup.string().required(),
    password: Yup.string().required(),
  });
  
  const { mutate, isLoading } = useLogin({
    onSuccess: (res) => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(res));
        toast({
          title: 'Successful',
          description: 'Login Successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        setTimeout(() => {
          navigate('dashboard');
          // window.location.href='/dashboard'
        }, 50);
      }
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
  const formik = useFormik({
    initialValues: initialValues ,
    onSubmit: (values) => {
      mutate({
        instructor_id:values.instructor_id,
        password:values.password
      })
     
      
      // setInitialValues(initValues)
    },
    validationSchema:validationSchema
  });
  
  const {values,errors,touched,handleChange,handleBlur,handleSubmit} = formik
  // const handleSubmit = (values) => {
  //   let data = {
  //     email: values.username,
  //     password: values.password,
  //   };
  //   mutate(data);
  //   // mutate(values);
  // };
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      minHeight="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Avatar bg="teal.500" />
        <Heading 
        color="teal.400"
        >Welcome</Heading> */}
        <Box  minW={{ base: "90%", md: "468px" }}>
        <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text"
                   placeholder="Instructor Id" 
                   name="instructor_id"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   value={values.instructor_id}
                   borderColor={
                    errors.instructor_id
                      && 'tomato'                    
                  }
                  
                   />
                </InputGroup>
                <Text color={'tomato'} fontSize="12px">
                        {errors.instructor_id && touched.instructor_id && errors.instructor_id}
                      </Text>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    borderColor={
                      errors.instructor_id
                        && 'tomato'                    
                    }
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  {/* <Link>forgot password?</Link> */}
                </FormHelperText>
                <Text color={'tomato'} fontSize="12px">
                        {errors.password && touched.password && errors.password}
                      </Text>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                // onClick={handleSubmit}
                // variant="solid"
                // colorScheme="teal"
                width="full"
                isLoading={isLoading}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      {/* <Box>
        New to us?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box> */}
    </Flex>
  );
};

export default Login;
