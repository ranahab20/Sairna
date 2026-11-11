import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://sairna.abdulrahman-hares.com/api/v1/website';

export const getCities = async () => {
  const response = await axios.get(`${BASE_URL}/cities`);
  return response.data;
};

export const useGetCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: getCities,
  });
};