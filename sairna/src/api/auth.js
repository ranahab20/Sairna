import axios from 'axios';

const BASE_URL = 'https://sairna.abdulrahman-hares.com/api/v1/website';


export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
  return response.data; 
  // هون بيرجع Object فيه: { accessToken, tokenType, user, ... }
};


export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData);
  return response.data;
};