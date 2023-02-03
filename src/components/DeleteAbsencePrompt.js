import React,{useRef} from 'react';
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
  Heading,
  Textarea,
  Input,
  useToast,
  Flex
} from '@chakra-ui/react';
import { isEmpty } from './ModalTemplate';
// import PropTypes from 'prop-types';
import { IoTrash, IoCheckmarkSharp } from 'react-icons/io5';
import {RiAlertFill} from 'react-icons/ri'
function DeleteAbsencePrompt({ isOpen, onClose, title, buttons, type, children,isUpload,image,setImage,setReason,reason}) {
    const inputFile = useRef(null);
        const toast = useToast()
    const handleFileSelect = (e) => {
        e.preventDefault();
    
        if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
          return;
        }
        let temp = ''
        // Validate the file being uploaded
        const supportedIndicatorFileExtensions = ['pdf','png','jpg','jpeg'];
        const fileName = inputFile.current?.files?.[0].name;
        const fileExtention =
          fileName?.substring(fileName?.lastIndexOf('.') + 1) || '';
    
        if (!supportedIndicatorFileExtensions.includes(fileExtention)) {
          toast({
            title: 'Unsupported file type',
            description: 'Please upload a valid photo or pdf file',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
          return;
        }

        setImage(e.target.files[0])
        
    }

    const onButtonClick = () => {
        inputFile.current.click();
      
      };
      console.log(image,"img")
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size={'md'}
      //   variant="DeleteAbsencePrompt"
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
            {/* <Heading color={"orange"} fontWeight={'bold'}>Warning</Heading> */}
          </Box>
            
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
            fontSize="s"
            // noOfLines={2}
            maxWidth={'100%'}
            textAlign={'center'}
            variant={'titleText'}
            maxW={'70%'}
            alignSelf={'center'}
            mb={5}
          >
            {title}
          </Text>
          {isUpload&&<Box w={'100%'} textAlign={'center'}>
            <Box >
            <Textarea w={'100%'}  placeholder='Reasons...' mb={5} value={reason} onChange={(e)=>setReason(e.target.value)} />
            <input ref={inputFile} name='upload' type={'file'} mt={5} onChange={(e)=>handleFileSelect(e) } style={{display:'none'}}/>
            <Button mx={'auto'} onClick={onButtonClick}>Upload file</Button>
            {!isEmpty(image?.name)&&<Text>{image?.name}</Text>}
            </Box>
            </Box>}
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

// DeleteAbsencePrompt.propTypes = {
//   isOpen: PropTypes.bool,
//   onclose: PropTypes.func,
//   children: PropTypes.any,

//   // Controls
//   title: PropTypes.string,
//   buttons: PropTypes.arrayOf(PropTypes.object),
//   type: PropTypes.oneOf(['success', 'error']),
// };

export default DeleteAbsencePrompt;
