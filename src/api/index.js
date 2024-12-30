import axios from "axios";
import toast from "react-hot-toast";

// export const mainAddress = "http://pl4ten:8000";
export const mainAddress = "https://sinaback.liara.run";
// export const mainAddress = `http://pc-2:3000`;
const pathName = window.location.pathname;

export const fetchApi = async (url, body, type) => {
  try {
    const tokens = localStorage.getItem("tokenSina");
    if (pathName === "/login") {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "admin-API-Token": tokens,
        },
      };

      let response;

      switch (type) {
        case "post":
          response = await axios.post(`${mainAddress}/${url}`, body, config);
          break;
        case "put":
          response = await axios.put(`${mainAddress}/${url}`, body, config);
          break;
        case "post-imgUpload":
          config.headers["Content-Type"] = "multipart/form-data";
          response = await axios.post(`${mainAddress}/${url}`, body, config);
          break;
        default:
          response = await axios.get(`${mainAddress}/${url}`, config);
      }

      if (response.status === 500) {
        toast.error(" Error on server! ");
      }

      return response.data;
    } else if (tokens) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "admin-API-Token": tokens,
        },
      };

      let response;

      switch (type) {
        case "post":
          response = await axios.post(`${mainAddress}/${url}`, body, config);
          break;
        case "put":
          response = await axios.put(`${mainAddress}/${url}`, body, config);
          break;
        case "post-imgUpload":
          config.headers["Content-Type"] = "multipart/form-data";
          response = await axios.post(`${mainAddress}/${url}`, body, config);
          break;
        default:
          response = await axios.get(`${mainAddress}/${url}`, config);
      }

      if (response.status === 500) {
        toast.error(" Error on server! ");
      }

      return response.data;
    }
  } catch (error) {
    console.error("API Error:", error);
    return error;
  }
};

export const sliceNumber = (number) => {
  const makeNumber = Number(number);
  return makeNumber.toLocaleString();
};

export const getxlxs = (type, query) => {
  const xlxsurl = "v1/api/admin/dashboard/get_xlxs";
  fetchApi(xlxsurl, { collaction: type, query }, "post").then((res) => {
    if (res.status_code === 200) {
      window.open(res.link);
    } else {
      toast.error("Something went wrong!");
    }
  });
};
