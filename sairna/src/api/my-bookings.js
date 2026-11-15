import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getToken } from '../utiles/token-storage';

const BASE_URL = 'https://sairna.abdulrahman-hares.com/api/v1/website';

export const getMyBookings = async () => {
  const token = getToken();
  const response = await axios.get(`${BASE_URL}/bookings/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useGetMyBookings = () => {
  return useQuery({
    queryKey: ['myBookings'],
    queryFn: getMyBookings,
  });
};