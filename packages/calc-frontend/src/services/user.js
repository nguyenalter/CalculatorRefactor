import Cookies from 'js-cookie';
import { axios } from './axios';

export const createUserToken = (token) => Cookies.set('token', token, {
  expires: 1,
  path: '',
});

export const signUpNewUser = async (userData) => axios.post('/user/signup', userData);

export const signInAttempt = async (userData) => axios.post('/user/signin', userData);

// public route
export const calculateResult = async (expression) => axios.post('/calc', expression);
