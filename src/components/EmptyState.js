import React from "react";
import { Flex, Text ,Box,Icon,useColorModeValue} from "@chakra-ui/react";
import { TbLayoutGridAdd, TbPencil } from 'react-icons/tb';

const EmptyState = ({ message }) => {
  const emptyStateColorMessage = useColorModeValue(
    'labelTextColor',
    'darkMode.secondary.gray'
  )
  return (
    <Box
    as="div"
    display={'flex'}
    alignItems={'center'}
    justifyContent={'center'}
    flexDirection={'column'}
    py={8}
  >
    {/* <Icon
      as={TbLayoutGridAdd}
      h={8}
      w={8}
      color={'darkMode.secondary.gray'}
    /> */}
    <Text
      mt={5}
      fontSize={'sm'}
      color={emptyStateColorMessage}
    >
      {message}
    </Text>
  </Box>
  );
};

export default EmptyState;
