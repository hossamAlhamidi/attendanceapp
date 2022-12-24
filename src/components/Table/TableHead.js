import {
  Checkbox,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoChevronDown } from 'react-icons/io5';
import { isEmpty } from '../ModalTemplate';

function TableHead({
  // data,
  columns,
  actions,
  actionsLabel,
}) {
  const useHeaderStyleProps = () => ({
    fontWeight: 'medium',
    color: useColorModeValue(
      'lightMode.secondary.gray',
      'darkMode.secondary.gray'
    ),
    letterSpacing: 0,
    textTransform: 'capitalize',
    fontSize: 'smaller',
  });

  const headerStyleProps = useHeaderStyleProps();

  return (
    <Thead>
      <Tr>
        {columns.map((column) => (
          <Th
            {...headerStyleProps}
            textAlign={!isEmpty(column?.textAlign) ? column?.textAlign : 'left'}
          >
            {column.label}
          </Th>
        ))}
        {!isEmpty(actions) && (
          <Th {...headerStyleProps} w={'3vw'}>
            {actionsLabel || 'Actions'}
          </Th>
        )}
      </Tr>
    </Thead>
  );
}

export default TableHead;
