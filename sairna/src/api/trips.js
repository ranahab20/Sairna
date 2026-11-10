import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://sairna.abdulrahman-hares.com/api/v1/website';

export const getTrips = async (params) => {
  const response = await axios.get(`${BASE_URL}/trips`, { params });
  return response.data;
};

export const useGetTrips = (params) => {
  return useQuery({
    queryKey: ['trips', params], 
    queryFn: () => getTrips(params),
    // السطر الجديد: لا تجلب البيانات إلا إذا كانت القيم الأساسية موجودة
    enabled: !!params.originId && !!params.destinationId && !!params.date,
    // staleTime: 1000 * 60 * 5, 
  });
};