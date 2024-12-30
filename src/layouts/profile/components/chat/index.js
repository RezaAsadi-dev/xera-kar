import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
// import { avatar, save } from "../../assets/image/index";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineAttachFile, MdKeyboardVoice } from "react-icons/md";
import { LuFile } from "react-icons/lu";
import { BsFillSendFill } from "react-icons/bs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Card from "@mui/material/Card";
import imgteam from "assets/images/ivancik.jpg";
const Chat = () => {
  const navigate = useNavigate();
  let ref = useRef();
  let bottomRef = useRef();
  let dataREF = useRef();
  const [text, setText] = useState("");
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [img, setImg] = useState();
  const [imgLink, setImgLink] = useState();
  const [file, setFile] = useState([]);
  const [voice, setVoice] = useState([]);
  const [Loader, setLoader] = useState(true);
  const [jsoon, setJsoon] = useState();
  const [sendLoader, setSendLoader] = useState(false);
  const [imgModalHandler, setImgModalHandler] = useState(false);
  const [imgDataModal, setImgDataModal] = useState();
  let [searchParams] = useSearchParams();

  //   const urlSEND = "api/user/send_chat";
  //   const urlGET = `api/user/get_chat/${id}`;
  //   console.log(searchParams.get("type"));
  //   const endPoint =
  //     "https://backplatingram.iran.liara.run/api/user/chat/uploader";

  const closeDelModale = () => {
    setImgModalHandler(false);
  };
  //   const API = (data, type) => {
  //     let body = {
  //       receiver_id: id,
  //       data: data,
  //       type: type,
  //     };
  //     setSendLoader(true);
  //     fetchApi(urlSEND, localStorage.getItem("user_token"), body).then((res) => {
  //       if (res.status_code === 200) {
  //         fetchApi(urlGET, localStorage.getItem("user_token")).then((res) => {
  //           setData(res);
  //           setSendLoader(false);
  //         });
  //       }
  //     });
  //   };
  //   const uploadHanadler = (e, isFile = false) => {
  //     setSendLoader(true);
  //     setImg(URL.createObjectURL(e.target.files[0]));
  //     let formData = new FormData();
  //     formData.append("file", e.target.files[0]);
  //     axios.post(endPoint, formData).then((res) => {
  //       console.log(res);
  //       if (res.data.status_code === 200) {
  //         setSendLoader(false);
  //         if (isFile) {
  //           API(res.data.link, "file");
  //           setFile(res.data);
  //         } else {
  //           setImgLink(res.data.link);
  //           API(res.data.link, "img");
  //         }
  //         console.log(res);
  //       } else if (res.data.status_code === 402) {
  //         console.log(res.data.description_fa_user);
  //       }
  //     });
  //   };
  //   const uploadVoiceHandler = (file) => {
  //     setSendLoader(true);
  //     axios.post(voiceEndPoint, file).then((res) => {
  //       setSendLoader(false);

  //       API(res.data.link, "voice");
  //     });
  //   };
  //   useEffect(() => {
  //     fetchApi(urlGET, localStorage.getItem("user_token")).then((res) => {
  //       if (res.status_code === 200) {
  //         setData(res);
  //         setLoader(false);
  //         dataREF.current = res;
  //       }
  //     });
  //     const interval = setInterval(() => {
  //       fetchApi(urlGET, localStorage.getItem("user_token")).then((res) => {
  //         if (
  //           dataREF.current?.data[0]?.ticket[dataREF.current?.data[0]?.ticket.length - 1].datetime !==
  //           res.data[0]?.ticket[res.data[0]?.ticket.length - 1].datetime
  //         ) {
  //           setData(res);
  //           dataREF.current = res;
  //         }
  //       });
  //     }, 2000);

  //     return () => clearInterval(interval);
  //   }, []);

  const sendHandler = () => {
    if (text.length !== 0) {
      API(text, "txt");
      setText("");
    }
  };

  useEffect(() => {
    // if (data && !Loader) {
    document.getElementById("chats").scrollTo(0, document.getElementById("chats").scrollHeight);
    // }
  }, []);

  return (
    <Card sx={{ height: "64vh" , overflow:"auto"}}>
      <div className={style.chat}>
        <div className={style.chats} id="chats">
          <>
            <div key={1}>
              <div key={1}>
                {"4" === "img" ? (
                  <div className={style.me_image}>
                    <img
                      width={"160px"}
                      src="Asd"
                      alt=""
                      onClick={() => {
                        setImgModalHandler(true);
                        // setImgDataModal(MSG?.ticket);
                      }}
                    />
                  </div>
                ) : (
                  <div className={style.me_container}>
                    <p>
                      {
                       "Lorme Epsom is a fake text produced with incomprehensible simplicity from the printing industry and using graphic designers, printers and texts, but also newspapers and magazines in columns and rows as necessary"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div key={1} className={style.other}>
                {"im3" === "img" ? (
                  <div className={style.other_image}>
                    <img
                      width={"160px"}
                      src={"asd"}
                      onClick={() => {
                        setImgModalHandler(true);
                        // setImgDataModal(MSG?.ticket);
                      }}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className={style.other_container}>
                    <p>
                      {
                      "Lorme Epsom is a fake text produced with incomprehensible simplicity from the printing industry and using graphic designers, printers and texts, but also newspapers and magazines in columns and rows as necessary"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div key={1}>
              <div key={1}>
                {"img" === "img" ? (
                  <div className={style.me_image}>
                    <img
                      width={"160px"}
                      src={imgteam}
                      alt=""
                      onClick={() => {
                        setImgModalHandler(true);
                        // setImgDataModal(MSG?.ticket);
                      }}
                    />
                  </div>
                ) : (
                  <div className={style.me_container}>
                    <p>
                      {
                      "Lorme Epsom is a fake text produced with incomprehensible simplicity from the printing industry and using graphic designers, printers and texts, but also newspapers and magazines in columns and rows as necessary"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div key={1} className={style.other}>
                {"img" === "img" ? (
                  <div className={style.other_image}>
                    <img
                      width={"160px"}
                      src={imgteam}
                      onClick={() => {
                        setImgModalHandler(true);
                        // setImgDataModal(MSG?.ticket);
                      }}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className={style.other_container}>
                    <p>{"1"}</p>
                  </div>
                )}
              </div>
            </div>
            <div key={1}>
              <div key={1}>
                {"4" === "img" ? (
                  <div className={style.me_image}>
                    <img
                      width={"160px"}
                      src="Asd"
                      alt=""
                      onClick={() => {
                        setImgModalHandler(true);
                        // setImgDataModal(MSG?.ticket);
                      }}
                    />
                  </div>
                ) : (
                  <div className={style.me_container}>
                    <p>
                      {
                       "Lorme Epsom is a fake text produced with incomprehensible simplicity from the printing industry and using graphic designers, printers and texts, but also newspapers and magazines in columns and rows as necessary"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div key={1} className={style.other}>
                {"im3" === "img" ? (
                  <div className={style.other_image}>
                    <img
                      width={"160px"}
                      src={"asd"}
                      onClick={() => {
                        setImgModalHandler(true);
                        // setImgDataModal(MSG?.ticket);
                      }}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className={style.other_container}>
                    <p>
                      {
                       "Lorme Epsom is a fake text produced with incomprehensible simplicity from the printing industry and using graphic designers, printers and texts, but also newspapers and magazines in columns and rows as necessary"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div key={1}>
              <div key={1}>
                {"4" === "img" ? (
                  <div className={style.me_image}>
                    <img
                      width={"160px"}
                      src="Asd"
                      alt=""
                      onClick={() => {
                        setImgModalHandler(true);
                        // setImgDataModal(MSG?.ticket);
                      }}
                    />
                  </div>
                ) : (
                  <div className={style.me_container}>
                    <p>
                      {
                      "Lorme Epsom is a fake text produced with incomprehensible simplicity from the printing industry and using graphic designers, printers and texts, but also newspapers and magazines in columns and rows as necessary"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div key={1} className={style.other}>
                {"img" === "img" ? (
                  <div className={style.other_image}>
                    <img
                      width={"160px"}
                      src={imgteam}
                      onClick={() => {
                        setImgModalHandler(true);
                        // setImgDataModal(MSG?.ticket);
                      }}
                      alt="asdas"
                    />
                  </div>
                ) : (
                  <div className={style.other_container}>
                    <p>{"22222"}</p>
                  </div>
                )}
              </div>
            </div>
          </>

          <div ref={bottomRef} />
        </div>
      </div>
    </Card>
  );
};

export default Chat;
