import { TableCell, TableRow } from "@nextui-org/react";
// import { fetchApi } from "api";
import PaginationComponent from "examples/pagination/pagination";
import TableC from "examples/Tables/Table";
import { useEffect, useState } from "react";
// import { handler } from "../../../../redux/loaderSlice";
import { IoEye } from "react-icons/io5";
// import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Check, CheckCheck } from "lucide-react";

const PrivateMessages = ({ onReadClick, Notifications, loading, pages, setPages }) => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPages({ ...pages, private: page });
  }, [page, location]);

  return (
    <div className="pt-6">
      <TableC
        tHeads={["Row", "Title", "Text ", "Date", "Receiver", "Read status"]}
        isLoading={loading}
      >
        {Notifications?.data?.length &&
          Notifications?.data?.map((notif, index) => (
            <TableRow key={index}>
              <TableCell>{(page - 1) * 12 + index + 1}</TableCell>
              <TableCell>{notif.title}</TableCell>
              <TableCell>{notif.txt}</TableCell>
              <TableCell>
                <div className="flex">
                  {notif.time.from} {notif.time.to && `to`}{" "}
                  {notif.time.to && (
                    <sapn className="flex flex-row-reverse w-fit mr-1">{notif.time.to}</sapn>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Link
                  to={`/users/usersDetails/${notif.userid}`}
                  color="primary"
                  style={{ fontSize: "20px" }}
                >
                  {" "}
                  <IoEye />
                </Link>
              </TableCell>
              <TableCell>
                {notif.readed ? (
                  <CheckCheck size={16} className="text-green-700" />
                ) : (
                  <Check size={16} className="text-green-700" />
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableC>
      <PaginationComponent totalPages={Notifications.max_page} onPageChange={setPage} />
    </div>
  );
};

export default PrivateMessages;
