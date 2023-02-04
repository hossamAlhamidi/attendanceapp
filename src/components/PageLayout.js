import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  useToast,
} from '@chakra-ui/react';
import Sidebar from './Sidebar';
// import Footer from "./Footer";
// import Header from "./Header";
// import Logo from "../assets/Logo.png";

import { MdMenu } from 'react-icons/md';
// import { useLogOut } from '../utils/helpers';


import Navbar from './Navbar';





export const AuthPageLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSideNav, setShowSideNav] = useState(true);
 

  const toast = useToast();

  useEffect(() => {
    function resize() {
      if (window.innerWidth < 1065) {
        setShowSideNav(false);
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setShowSideNav(true);
      }
    }
    resize();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

//   const logOut = useLogOut();



  return (
    <Box
      display={'flex'}
      flexDirection="column"
      w="100%"
      minHeight="100vh"
      position="relative"
    >
      <>
        {/* <Navbar></Navbar> */}
        <Box
          width={
            showSideNav
              ? 'calc(100% - 270px)'
              : isMobile
              ? 'calc(100% - 0px)'
              : 'calc(100% - 65px)'
          }
          transition="0.3s all ease-in-out"
          // bg={useColorModeValue('#fff', '#1E1F23')}
          bg={useColorModeValue('lightMode.bodyBg', 'darkMode.bodyBg')}
          h="64px"
          // position={'sticky'}
          top={0}
          left={270}
          // borderBottom="1px solid #EDF1F7"
          // borderBottomWidth="1px"
          // borderBottomColor={useColorModeValue('lightMode.gray', '#EDF1F720')}
          // boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
          display={isMobile ? 'flex' : 'flex'}
          alignItems={isMobile ? 'center' : 'center'}
          // zIndex='2'
        >
          {isMobile && !showSideNav && (
            <MdMenu
              onClick={() => setShowSideNav((prev) => !prev)}
              cursor={'pointer'}
              fontSize={'30px'}
              style={{ marginInlineStart: '10px' }}
            />
          )}

         
        </Box>
      </>

      <Flex>
        <Sidebar {...{ isMobile, showSideNav, setShowSideNav }} />
        <Box
          // ml={!showSideNav ? '65px' : !isMobile ? '270px' : ''}
          ml={!showSideNav && !isMobile ? '65px' : !isMobile ? '270px' : ''}
          // width="100%"
          width={
            showSideNav && !isMobile
              ? 'calc(100%)'
              : isMobile
              ? 'calc(100% - 0px)'
              : 'calc(100% - 65px)'
          }
          transition="0.3s all ease-in-out"
          overflowX="hidden"
          p={'20px 27px'}
        >
          {children }
        </Box>
      </Flex>
      <Box mt={'auto'}>{/* <Footer /> */}</Box>
      {/* <Button
        onClick={logOut}
        bgColor='red.600'
        color='#fff'
        position='fixed'
        top={{ base: '4px', lg: '12px' }}
        right='16px'
        zIndex='3'
      >
        {' '}
        LogOut
      </Button> */}
    </Box>
  );
};

export const NonAuthPageLayout = ({ children }) => {
  return (
    <Box
      display={'flex'}
      flexDirection="column"
      w="100%"
      height={['80vh', '100vh']}
    >
      {children}
      <Box mt={'auto'}>{/* <Footer /> */}</Box>
    </Box>
  );
};
