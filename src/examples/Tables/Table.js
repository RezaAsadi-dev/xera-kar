import {
  Spinner,
  Table,
  TableBody,
  TableColumn,
  TableHeader,
} from "@nextui-org/react";
 
import  "./style.css";
 

const TableC = ({ tHeads,isLoading, children }) => {
  return (
    <Table className="rounded-lg" aria-label="Related table ">
      <TableHeader>
        {tHeads.map((item,index) => (
          <TableColumn key={index} className="text-start">{item}</TableColumn>
        ))}
      </TableHeader>
      <TableBody className="tableBody" style={{fontSize:"14px"}} emptyContent={isLoading ? <Spinner /> : " There is no data to view! "}>
        {children}
      </TableBody>
    </Table>
  );
};
export default TableC;
