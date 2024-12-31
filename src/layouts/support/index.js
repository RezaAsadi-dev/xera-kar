import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import toast from "react-hot-toast";
import { fetchApi } from "api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { handler, selectLoader } from "../../redux/loaderSlice";
import {
  FiLoader,
  FiUpload,
  FiSend,
  FiImage,
  FiArrowRight,
  FiX,
  FiDownload,
  FiUser,
  FiChevronRight,
} from "react-icons/fi";
import { RiOrganizationChart } from "react-icons/ri";
import accessPage from "helper/functios";
import Lotties from "layouts/noData/Lotties";

const Support = () => {
  const dispatch1 = useDispatch();
  const loader = useSelector(selectLoader);
  const navigate = useNavigate();
  const getTicketsUrl = "v1/api/admin/ticket/get_my_tickets";
  const getOneTicketUrl = "v1/api/admin/ticket/get_one_tickets";

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchChats = () => {
    fetchApi(getTicketsUrl, { page: currentPage }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        setData(res?.Data.data);
        setTotalPages(res?.max_page);
      } else {
        dispatch1(handler(false));
        toast.error("  Something went wrong!");
      }
    });
  };

  const filterFetch = () => {
    fetchApi(
      getTicketsUrl,
      {
        page: currentPage,
        search,
      },
      "post"
    ).then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        setData(res?.Data.data);
        setTotalPages(res?.max_page);
      } else {
        dispatch1(handler(false));
        toast.error("  Something went wrong! !");
      }
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const initialFetch = () => {
      dispatch1(handler(true));
      fetchChats();
    };
    initialFetch();
    const timer = setInterval(fetchChats, 5000);
    return () => clearInterval(timer);
  }, [currentPage]);

  useEffect(() => {
    filterFetch();
  }, [search]);

  useEffect(() => {
    if (selectedChat) {
      const chat = data.find((chat) => chat._id === selectedChat._id);
      setSelectedChat(chat);
    }
  }, [data]);

  useEffect(() => {
    if (accessPage("Support")) {
      navigate("/inaccessibility");
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="relative flex items-start w-full mt-6 h-[82svh] border-2 rounded-2xl overflow-hidden">
        {loader ? (
          <div className="w-96 border-l h-full flex flex-col space-y-3 bg-white">
            <FiLoader size={24} className="animate-spin m-auto" />
          </div>
        ) : (
          <div
            className={`flex flex-col sm:w-96 h-full max-h-[82svh] overflow-hidden bg-white border-l p-3 rounded-r-2xl transition-transform duration-300 ease-in-out w-full ${
              selectedChat && "sm:flex hidden"
            }`}
          >
            <div className="pb-3 border-b">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border py-2 px-3 rounded-md bg-gray-100 focus:bg-white outline-none h-10 transition-colors duration-300 ease-in-out"
                placeholder=" Search ticket..."
              />
            </div>
            <div className="flex flex-col space-y-1 h-full overflow-y-auto w-full pt-2">
              {data.length > 0 ? (
                data.map((chat) => (
                  <ChatCard
                    key={chat._id}
                    data={chat}
                    setSelect={setSelectedChat}
                    selected={selectedChat && selectedChat._id === chat._id}
                  />
                ))
              ) : (
                <div className="p-2 w-full text-center bg-gray-100 rounded-md">
                  <p className="text-sm">  No ticket has been created! </p>
                </div>
              )}
            </div>
            <SoftBox
              display="flex"
              flexDirection=""
              justifyContent="center"
              alignItems="center"
              p={3}
            >
              {data.length > 0 && totalPages !== 1 && (
                <Pagination
                  showControls
                  page={currentPage}
                  total={totalPages}
                  initialPage={1}
                  onChange={handlePageChange}
                />
              )}
            </SoftBox>
          </div>
        )}
        <div
          className={`flex flex-col items-center justify-center w-full h-full sm:relative absolute overflow-hidden transition-all duration-300 ease-in-out ${
            !selectedChat && "sm:flex hidden"
          }`}
        >
          {loader ? (
            <FiLoader size={24} className="animate-spin m-auto" />
          ) : selectedChat ? (
            <ChatPage chatData={selectedChat} setSelected={setSelectedChat} refetch={fetchChats} />
          ) : data.length > 0 ? (
            <p className="text-base">  Please choose a ticket... </p>
          ) : (
            <Lotties />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

// each chat on the rigth sidebar
const ChatCard = ({ data, setSelect, selected }) => {
  console.log(data);
  const { name, ticket, sender_type } = data;
  const lastTicket = ticket[ticket.length - 1];
  const yearAndTime = lastTicket.datetime.split(" ");
  const splitedTime = yearAndTime[1].split(".");
  const houreAndMinute = splitedTime[0].split(":");

  const senderIndicator = (sender_type) => {
    switch (sender_type) {
      case "user":
        return <FiUser size={20} />;
      case "professional":
        return <RiOrganizationChart size={20} />;
 
    }
  };

  return (
    <div
      className={`px-3 py-2 flex items-center justify-between rounded-md hover:bg-gray-100 cursor-pointer transition-colors ease-in-out duration-300 ${
        selected && "bg-gray-100"
      }`}
      onClick={() => setSelect(data)}
    >
      <div className="flex flex-col gap-3">
        <h4 className="text-base inline-flex items-center gap-2">
          <span className="p-2 bg-gray-100 rounded-full border-2">
            {senderIndicator(sender_type)}
          </span>
          {name}
        </h4>
        <div className="flex items-center gap-2">
          {lastTicket.type === "txt" && (
            <p className="text-xs whitespace-nowrap text-ellipsis overflow-hidden lg:max-w-36 sm:max-w-28 max-w-52">
              {lastTicket.data}
            </p>
          )}
          {lastTicket.type === "image" && (
            <p className="text-xs inline-flex gap-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-60">
              <FiImage size={14} /> Picture
            </p>
          )}
          <p className="text-xs whitespace-nowrap text-ellipsis overflow-hidden max-w-60">
            {houreAndMinute[0]}:{houreAndMinute[1]}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end h-full">
        <FiChevronRight size={20} className="flex flex-shrink-0 mt-2" />
        {sender_type === "user" && (
          <div className="mt-auto text-xs bg-slate-700 py-1.5 px-2 rounded-md text-white">
            User
          </div>
        )}
        {sender_type === "professional" && (
          <div className="mt-auto text-xs bg-orange-700 py-1.5 px-2 rounded-md text-white">
            Professional
          </div>
      
        )}
      </div>
    </div>
  );
};

// chats of the selected user
const ChatPage = ({ chatData, setSelected, refetch }) => {
  const sendChatUrl = "v1/api/admin/ticket/send_chat";

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [value, setValue] = useState("");
  const dialogRef = useRef(null);
  const divRef = useRef(null);

  const { _id, name, sender_type, ticket: tickets } = chatData;

  const senderIndicator = (sender_type) => {
    switch (sender_type) {
      case "user":
        return <FiUser size={20} />;
      case "professional":
        return <RiOrganizationChart size={20} />;
    
    }
  };

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  useEffect(() => {
    if (!selectedImage) return;
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
    dialogRef.current?.addEventListener("close", closeModal);

    return () => {
      dialogRef.current?.removeEventListener("close", closeModal);
    };
  }, [selectedImage]);

  const closeModal = () => {
    dialogRef.current?.close();
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  const send = (type, data) => {
    setLoading(true);
    fetchApi(sendChatUrl, { type, ticketId: _id, data }, "post").then((res) => {
      if (res?.status_code === 200) {
        refetch();
        setLoading(false);
        setValue("");
      } else {
        setLoading(false);
        toast.error("A problem occured during sending the message!");
      }
    });
  };

  const upload = async (data) => {
    setUploading(true);
    const url = await fetchApi("uploader", data, "post-imgUpload").then((res) => {
      if (res?.status_code === 200) {
        setUploading(false);
        return res?.link;
      } else {
        toast.error("A problem occured during the dowanload!");
        setUploading(false);
      }
    });

    return url;
  };

  const handleSend = (type, data) => {
    if (!value.trim() && type === "txt") {
      toast.error("Can't send empty message!");
      setLoading(false);
      return;
    }
    send(type, data);
  };

  const handleImageUpload = async (files) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    const url = await upload(formData);
    handleSend("image", url);
  };

  const handleKeyDown = (e) => {
    // if (e.key === "Enter") {
    //   handleSend("txt", value);
    // }
  };

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="flex items-center justify-start w-full bg-white p-5 rounded-tl-2xl shadow-sm">
        <button
          className="p-3 rounded-md bg-gray-100 ml-3 sm:hidden"
          onClick={() => setSelected(null)}
        >
          <FiArrowRight size={24} className="flex flex-shrink-0" />
        </button>
        <h4 className="text-xl inline-flex items-center gap-2">
          <span className="p-2 bg-gray-100 rounded-full border-2">
            {senderIndicator(sender_type)}
          </span>{" "}
          {name}
        </h4>
      </div>
      <dialog
        ref={dialogRef}
        className="relative backdrop:bg-black/65 bg-transparent w-full h-full min-h-[100vh] mx-auto"
        onClick={closeModal}
      >
        <div className="flex h-full w-full">
          <div className="relative m-auto border" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="image"
              className="w-fit aspect-auto object-cover max-w-[86vw] max-h-[90svh]"
            />
            <button
              className="absolute flex items-center gap-2 top-3 right-3 p-3 h-9 rounded-md text-white bg-gray-200 hover:bg-gray-300 transition-color duration-300 ease-in-out text-sm shadow-sm border"
              onClick={closeModal}
            >
              <FiX size={16} className="text-black" />
            </button>
            <Link
              to={selectedImage}
              target="_blank"
              className="absolute flex items-center gap-2 top-3 right-16 p-2 rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-color duration-300 ease-in-out text-sm"
            >
               dowanload picture <FiDownload size={16} className="flex flex-shrink-0" />
            </Link>
          </div>
        </div>
      </dialog>
      <div className="flex flex-col p-5 overflow-y-auto overflow-x-hidden h-full w-full">
        {tickets.map((ticket, index) => (
          <Ticket
            key={`${ticket.userid}${index}`}
            message={ticket}
            senderName={name}
            setSelectedImage={setSelectedImage}
          />
        ))}
        {uploading && (
          <p className="inline-flex text-base items-center gap-2">
            <span>
              <FiLoader size={20} className="animate-spin" />
            </span>{" "}
            Uploading...
          </p>
        )}
        <div className="h-1" ref={divRef}></div>
      </div>
      <div className="sticky flex bottom-0 w-full bg-white border-t p-2 gap-4 ">
        <div className="flex w-full gap-2">
          <textarea
            className="w-full py-3 px-4 !mt-0 max-h-12 resize-none !text-base placeholder:text-base outline-none transition-colors duration-300 ease-in-out bg-gray-50 focus:bg-white rounded-md border-0 disabled:bg-gray-50"
            placeholder="text..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            disabled={loading}
          />
        </div>
        <div className="w-0.5 bg-gray-200 h-full"></div>
        <input
          id="file_upload"
          type="file"
          hidden
          accept="image/jpg, image/png, image/jpeg, image/jpe, image/bmp"
          onChange={(e) => handleImageUpload(e.target.files)}
          disabled={uploading}
        />
        <label
          htmlFor="file_upload"
          className="flex items-center justify-center cursor-pointer py-2 px-3 bg-green-700 hover:bg-green-800 transition-color duration-300 ease-in-out h-12 rounded-md mb-0"
        >
          {!uploading && <FiUpload size={20} className="text-white flex flex-shrink-0" />}
          {uploading && (
            <FiLoader size={20} className="text-white flex flex-shrink-0 animate-spin" />
          )}
        </label>
          <button
            className="flex items-center justify-center cursor-pointer py-2 px-3 bg-blue-700 hover:bg-blue-800 transition-color duration-300 ease-in-out h-12 rounded-md"
            onClick={() => {
              handleSend("txt", value);
            }}
            disabled={loading}
          >
            {!loading && <FiSend size={20} className="text-white flex flex-shrink-0" />}
            {loading && (
              <FiLoader size={20} className="animate-spin text-white flex flex-shrink-0" />
            )}
          </button>
      </div>
    </div>
  );
};

// each ticke in the chat page of the selected chat with text and image type
const Ticket = ({ message, setSelectedImage, senderName }) => {
  const { data, datetime, type, sender_type } = message;
  const yearAndTime = datetime.split(" ");
  const splitedTime = yearAndTime[1].split(".");
  const houreAndMinute = splitedTime[0].split(":");
  return (
    <>
      {sender_type === "team" ? (
        <div className="flex flex-col items-start  ml-auto mb-6">
          <div className="flex flex-wrap w-full mb-2">
            {type === "txt" && (
              <p className="break-words w-fit text-white text-base px-4 py-3 bg-[#4cc1f8] shadow-sm rounded-l-xl rounded-tr-xl rounded-br-none">
                {data
                  .trim()
                  .split("\n")
                  .map((text, index) => (
                    <span className="block text-wrap max-w-[200px] md:max-w-[350px] lg:max-w-[500px]" key={index}>{text}</span>
                  ))}
              </p>
            )}
            {type === "image" && (
              <div className="relative">
                <button onClick={() => setSelectedImage(data)}>
                  <img
                    src={data}
                    alt="image"
                    className="w-full aspect-auto object-cover rounded-md max-h-60"
                  />
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-800">
            <span className="ml-2"> admin </span>| {houreAndMinute[0]}:{houreAndMinute[1]}
          </p>
        </div>
      ) : (
        <div className="flex flex-col w-fit items-start  mr-auto mb-6">
          <div className="flex flex-wrap w-full mb-2">
            {type === "txt" && (
              <p className="break-words w-fit mr-auto text-base px-4 py-3 bg-white shadow-sm rounded-r-xl rounded-tl-xl rounded-bl-none">
                {data
                  .trim()
                  .split("\n")
                  .map((text, index) => (
                    <span className="block text-wrap max-w-[200px] md:max-w-[350px] lg:max-w-[500px]" key={index}>{text}</span>
                  ))}
              </p>
            )}
            {type === "image" && (
              <div className="relative">
                <button onClick={() => setSelectedImage(data)}>
                  <img
                    src={data}
                    alt="image"
                    className="w-full aspect-auto object-cover rounded-md max-h-60"
                  />
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-800 mr-4">
            <span className="ml-2">{senderName}</span> | {houreAndMinute[0]}:{houreAndMinute[1]}
          </p>
        </div>
      )}
      
    </>
  );
  
};

export default Support;
