import React from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Icon,
  Heading
} from '@chakra-ui/react';

// import PropTypes from 'prop-types';
import { IoTrash, IoCheckmarkSharp } from 'react-icons/io5';
import {RiAlertFill} from 'react-icons/ri'
function Prompt({ isOpen, onClose, title, buttons, type, children }) {
  const isSuccessPrompt = type === 'success';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size={'md'}
      //   variant="prompt"
    >
      <ModalOverlay />
      <ModalContent pt={8} pb={8}>
        <ModalHeader
          fontSize={'md'}
          color="primary.800"
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box>
            <Box display={'flex'} justifyContent='center'>
            <RiAlertFill
               size={60}
               color={'orange'}
              />
            </Box>
            <Heading color={"orange"} fontWeight={'bold'}>Warning</Heading>
          </Box>
            
          {/* <Box
            bg={isSuccessPrompt ? 'success.10' : 'danger.10'}
            w="8rem"
            height={'8rem'}
            p={4}
            color="white"
            borderRadius={'50%'}
            alignItems={'center'}
            justifyContent={'center'}
            // overflow={'hidden'}
            display={'flex'}
          >
            <Box
              bg={isSuccessPrompt ? 'success.300' : 'danger.500'}
              width={'4rem'}
              height={'4rem'}
              borderRadius={'50%'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Icon
                as={IoTrash}
                w={6}
                h={6}
              />
              <RiAlertFill
               size={24}
              />
            </Box>
          </Box> */}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody
          alignItems={'center'}
          justifyContent={'center'}
          alignContent={'center'}
          display={'flex'}
          flexDirection={'column'}
        >
          <Text
            fontWeight={'bold'}
            fontSize="xl"
            // noOfLines={2}
            maxWidth={'100%'}
            textAlign={'center'}
            variant={'titleText'}
            maxW={'70%'}
            alignSelf={'center'}
          >
            {title}
          </Text>
          {children && <Box as="div">{children}</Box>}
          {buttons && (
            <Stack
              spacing={[1, 5]}
              direction={['column', 'row']}
              justifyContent={'center'}
              mt={5}
            >
              {buttons.map((button, index) => (
                <Button
                  variant={button.type}
                  onClick={button.onPress}
                  key={index}
                  isLoading={button?.isLoading}
                  bg={button.type=='danger'?'#FF6347':'lightgrey'}
                  color={button.type=='danger'?'white':'black'}
                  {...button?.styles}
                >
                  {button.label}
                </Button>
              ))}
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

// Prompt.propTypes = {
//   isOpen: PropTypes.bool,
//   onclose: PropTypes.func,
//   children: PropTypes.any,

//   // Controls
//   title: PropTypes.string,
//   buttons: PropTypes.arrayOf(PropTypes.object),
//   type: PropTypes.oneOf(['success', 'error']),
// };

export default Prompt;
