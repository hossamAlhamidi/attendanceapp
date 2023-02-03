
import { isEmpty } from "../ModalTemplate";
// import { useDateFormat } from "../hooks";
import { Image } from "@chakra-ui/react";
const timeFormat = (obj)=>{
  let time = ''
   for(let day in obj){
     if(obj[day]!='-'){
      time+= `${day}:${obj[day]}, `
      //  console.log(day,"day")
      //  console.log(obj[day],"time")
     }
   }
    if(time){
      return time
    }
    else
    return '-'
   
  // let days = Object.keys(obj);
  // return days.join(",")
}
function TableCell({ c, data, index, customCells }) {
//   const dateFormat = useDateFormat();

  if (c.accessor === "id" && c?.type !== "dataID") return index + 1;

  if (c.type === "time"){
  // console.log(data[c.accessor],"time")
    if (data[c.accessor])
      return timeFormat(data[c.accessor])
      // dateFormat(new Date(data[c.accessor]), "timeago");
    else return "-";
  }
  if (c.type === "file")
  return !isEmpty(data[c.accessor])?<a href={`${data[c.accessor]}`} target={'_blank'} rel={'noreferrer'} style={{color:'#7eadf4',fontWeight:'bold'}}>View File</a>:'-'

  if (!isEmpty(data[c.accessor])) return data[c.accessor];
  else return "-";
}

export default TableCell;
