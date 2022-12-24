import { Box, Table, TableContainer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isEmpty } from "../ModalTemplate";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const TableTemplate = ({
  data,
  columns,
  actions,
  isLoading,
  emptyState,
  actionsLabel,
}) => {

  // useEffect(() => {
  //   setFilteredData(data);
  // }, [data]);
  return (
    <Box>
      <TableContainer>
        {!isLoading && isEmpty(data) ? (
          <>{emptyState}</>
        ) : (
          <Table variant="simple">
            <TableHead
              {...{
                data,
                columns,
                actions,
                actionsLabel,
              }}
            />
            <TableBody
              {...{
                isLoading,
                columns,
                actions,
                data
              }}
            />
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default TableTemplate;
