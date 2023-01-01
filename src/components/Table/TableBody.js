import { Fragment } from "react";
import {
  Button,
  Checkbox,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tbody,
  Td,
  Tr,
  useColorModeValue,
  Spinner,
  Box,
  Flex,
  Stack,
  Skeleton
} from "@chakra-ui/react";
// import TableLoader from "../../../shared-components/TableLoader";
import { isEmpty } from "../ModalTemplate";

import TableCell from "./TableCell";

function TableBody({
  isLoading,
  columns,
  customCells,
  actions,
  data
  
}) {
  const textColor = useColorModeValue("lightMode.darkText", "darkMode.white");
  const optionIconColor = useColorModeValue(
    "lightMode.secondary.gray",
    "darkMode.secondary.gray"
  );
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

  const menuItemHoverBg = useColorModeValue("#00000020", "#FFFFFF30");
  const menuBG = useColorModeValue("lightMode.background", "darkMode.widgetBg");
  const headerStyleProps = useHeaderStyleProps();

  return (
    <Tbody mt={"18px"} w={"fit-content"} justifyContent={"space-between"}>
      {isLoading ? (
        <Flex mt={5} >
          <Spinner />
        </Flex>
        // <TableLoader
        //   col={canSelect ? columns.length + 2 : columns.length + 1}
        //   row={8}
        // />
      ) : (
        <>
          {data.map((data, index) => (
            <Tr>
              {columns.map((c) => (
                <Td
                  // fontSize={'sm'}
                  color={textColor}
                  textAlign={!isEmpty(c.textAlign) ? c.textAlign : "left"}
                  fontSize={12}
                  width={"fit-content"}
                  maxW={!isEmpty(c.columnWidth) ? c.columnWidth : "max-content"}
                  whiteSpace={"pre-wrap"}
                  // key={index}
                >
                  <TableCell
                    customCells={customCells}
                    c={c}
                    index={index}
                    data={data}
                  />
                </Td>
              ))}
              {!isEmpty(actions) && (
                <Td>
                  <Fragment>
                    {actions.map((action, index) => (
                      <>
                     { Object.keys(action).includes("isVisible") &&
                          action.isVisible(data) === true ? (
                          <>
                            <Button
                              mr={index < actions.length - 1 ? 2 : 0}
                              aria-label={action.aria_label}
                              onClick={() => action.onPress(data)}
                              _focus={{ boxShadow: "none" }}
                              // w="34px"
                              // h="34px"
                              variant={"outline"}
                              px={0}
                            >
                              {action.icon}
                            </Button>
                          </>
                        ) : !Object.keys(action).includes("isVisible") ? (
                          action && (
                            <Button
                              mr={index < actions.length - 1 ? 2 : 0}
                              aria-label={action.aria_label}
                              onClick={() => action.onPress(data)}
                              _focus={{ boxShadow: "none" }}
                              variant={"outline"}
                              px={0}
                            >
                              {action.icon}
                            </Button>
                          )
                        ) : null}
                      </>
                    ))}
                  </Fragment>
                </Td>
              )}
            </Tr>
          ))}
        </>
      )}
    </Tbody>
  );
}

export default TableBody;
