import { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Text,
  VStack,
  Box,
  CheckboxGroup,
  Stack,
  Checkbox,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
export const isEmpty = (item) => {
    if (typeof item === 'undefined') {
      return true;
    }
    if (typeof item === 'string' || Array.isArray(item)) {
      // if the item is a string or array
      return item.length === 0; // returns true if the string length is 0 or array is empty
    }
    if (item === null) {
      return true;
    }
    if (typeof item === 'object') {
      return Object.keys(item).length === 0;
    }
  
    return false;
  };



function ModalTemplate({
  isOpen,
  // onOpen,
  onClose,
  children,
  title,
  // onPressAdd,
  buttons,
  onCloseComplete,
  rightButtons,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size={'xl'}
      onCloseComplete={onCloseComplete}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize={'md'}
          color={useColorModeValue('lightMode.headerText', 'darkMode.white')}
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          {/* Inputs Section */}
          <Fragment>{children}</Fragment>
        </ModalBody>

        {!isEmpty(buttons) && (
          <ModalFooter
            alignItems="flex-start"
            alignContent={'flex-start'}
            justifyContent={rightButtons ? 'right' : 'left'}
          >
            {buttons.map((button, index) => (
              <Button
                variant={button.type}
                key={index}
                paddingX={50}
                onClick={button.onPress}
                mr={index < buttons.length - 1 ? 3 : 0}
                isLoading={button?.isLoading}
                isDisabled={button?.isDisable}
              >
                {button.label}
              </Button>
            ))}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

ModalTemplate.propTypes = {
  isOpen: PropTypes.bool,
  // onclose: PropTypes.func,
  children: PropTypes.any,

  // Controls
  title: PropTypes.string,
  onPressAdd: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.object),
  onCloseComplete: PropTypes.func,
};

export default ModalTemplate;
