import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API;

export const appendToGuestHistory = (payload) => {
  // TODO - append to local storage.
  // get current history
  let oldHistory = JSON.parse(localStorage.getItem("history")) || [];
  // append new record
  oldHistory.push(payload);
  // update local storage
  localStorage.setItem("history", JSON.stringify(oldHistory));
};
export const getGuestHistory = () => {
  // TODO - append to local storage.
  // get current history
  return JSON.parse(localStorage.getItem("history")) || [];
};

export const updateNewHistoryToDatabase = async (data) => {
  const res = await axios.put(
    "/user/auth",
    { data },
    {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    }
  );
  if (res.data.data.success) {
    console.log("append to db successfully");
    return true;
  }
  console.log("append to db failed");
  return false;
};

export const validateToken = async () => {
  return await axios.get("/user/auth", {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
};

export const removeOneRecord = async (data) => {
  // data is {timestamp}
  return await axios.patch("user/auth", data, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
};

export const removeAllRecord = async () => {
  return await axios.delete("user/auth", {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
};

export { axios };
