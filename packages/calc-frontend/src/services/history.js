import Cookies from 'js-cookie';
import { axios } from './axios';

const baseURL = '/history';

export const getUserHistory = async () => axios.get(baseURL, {
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

export const addUserHistory = async (historyData) => axios.post(baseURL, { historyData }, {
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

export const removeOneDataFromUserHistory = async (createdAt) => axios.patch(baseURL, { createdAt }, {
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

export const addOneDataToUserHistory = async (data) => {
  const res = await axios.put(
    baseURL,
    // data is a JSON, no need to wrap!
    data,
    {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    },
  );
  if (res.status == 200) {
    console.log('append to db successfully');
    return true;
  }
  console.log('append to db failed');
  return false;
};

export const removeAllDataFromUserHistory = async () => axios.delete(baseURL, {
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});
