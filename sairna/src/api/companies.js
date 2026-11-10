import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://sairna.abdulrahman-hares.com/api/v1/website';


export const getCompanies = async () => {
  const response = await axios.get(`${BASE_URL}/companies`);
  return response.data;
};


export const useGetCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  });
};