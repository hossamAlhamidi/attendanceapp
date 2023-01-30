import {
    Box,
    Flex,
    useColorModeValue,
    Text,
    Center,
    Divider,
    Icon,
  } from '@chakra-ui/react';
  import React from 'react';
  
  import { BsFillArrowUpCircleFill } from 'react-icons/bs';
  
  import { FaSkull } from 'react-icons/fa';
  import { MdWaterDrop } from 'react-icons/md';
  
  import { RiFireFill, RiContrastDropFill, RiAlertFill,RiBookOpenFill } from 'react-icons/ri';
  import {TfiBag} from 'react-icons/tfi'
  import {SlUser} from 'react-icons/sl'
  import {CiViewTimeline} from 'react-icons/ci'
  
  const getAlertStyles = (type) => {
    let alertType = type.toLowerCase();
    switch (alertType) {
      case 'students':
        return {
          background: 'danger.10',
          textColor: 'danger.500',
          // icon: FaSkull,
          icon:TfiBag
        };
      case 'courses':
        return {
          background: 'warning.10',
          textColor: 'warning.600',
          icon: RiBookOpenFill,
        };
      case 'sections':
        return {
          background: 'success.10',
          textColor: 'success.300',
          // icon: RiContrastDropFill,
          icon:CiViewTimeline
        };
      case 'instructors':
        return {
          background: 'primaryBlue.10',
          textColor: 'primaryBlue.900',
          // icon: MdWaterDrop,
          icon:SlUser
        };
      default:
        return {
          background: 'primaryBlue.10',
          textColor: 'primaryBlue.900',
          icon: RiAlertFill,
        };
    }
  };
  
  const CountCard = ({ type, total, icon }) => {
    const alertStyles = getAlertStyles(type);
    return (
      <Flex
        minH={'10vh'}
        direction={'row'}
        alignItems={'center'}
        px={'1rem'}
        py={'1rem'}
        borderRadius={8}
        border={useColorModeValue('1px solid #EDF1F7', 'none')}
        bg={useColorModeValue('lightMode.background', 'darkMode.widgetBg')}
        w={'100%'}
      >
        {/* Alert Icon */}
        <Box
          bg={alertStyles.background}
          w={'60px'}
          h={'60px'}
          mr={3}
          borderRadius={'8'}
          alignItems={'center'}
          justifyContent={'center'}
          display={'flex'}
        >
          {type?.toLowerCase() === 'high' ? 
          (
            <>{icon}</>
          ) : (
            <Icon
              as={alertStyles.icon}
              h={8}
              w={8}
              color={alertStyles.textColor}
              alignSelf={'center'}
            />
          )}
        </Box>
  
        {/* Alert Meta */}
        <Box flex="1">
          <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={1}
          >
            <Text
              as="h3"
              color={useColorModeValue(
                'lightMode.darkText',
                'darkMode.secondary.gray'
              )}
              fontSize={'14px'}
              fontWeight={'medium'}
              letterSpacing={0.25}
            >
              Total
            </Text>
  
            {/* Alert Badge */}
            <Box
              bg={alertStyles.background}
              position={'relative'}
              pb={0.5}
              pt={0}
              px={4}
              borderRadius={'4'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Text
                as="span"
                color={alertStyles.textColor}
                fontWeight={'semibold'}
                fontSize={12}
              >
                {type}
              </Text>
            </Box>
          </Flex>
  
          <Flex direction={'row'} alignItems={'center'}>
            <Text
              as="p"
              color={useColorModeValue('lightMode.darkText', 'darkMode.white')}
              fontSize={'24px'}
              fontWeight={'bold'}
            >
              {total}
            </Text>
            {/* <Center height="25px" mx={'10px'} alignSelf={'center'}>
              <Divider orientation="vertical" />
            </Center> */}
  
            {/* <Flex direction={'row'} alignItems={'center'}>
              <Icon
                as={BsFillArrowUpCircleFill}
                h={4}
                w={4}
                color={'danger.500'}
                mr={2}
              />
              <Text
                as="p"
                color={useColorModeValue('lightMode.darkText', 'darkMode.white')}
                fontSize={'18px'}
                fontWeight={'bold'}
              >
                2
              </Text>
            </Flex> */}
          </Flex>
        </Box>
      </Flex>
    );
  };
  
  export default CountCard;
  