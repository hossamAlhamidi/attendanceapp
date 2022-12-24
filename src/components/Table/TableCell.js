
import { isEmpty } from "../ModalTemplate";
// import { useDateFormat } from "../hooks";


function TableCell({ c, data, index, customCells }) {
//   const dateFormat = useDateFormat();

  if (c.accessor === "id" && c?.type !== "dataID") return index + 1;

//   if (c.type === "timeago")
//     if (data[c.accessor])
//       return dateFormat(new Date(data[c.accessor]), "timeago");
//     else return "-";

//   if (c.type === "custom")
//     return customCells && customCells[c.accessor]?.renderCell(data);

  if (!isEmpty(data[c.accessor])) return data[c.accessor];
  else return "-";
}

export default TableCell;
