import { useQuery } from '@tanstack/react-query';
import { getMyBookings } from '../api/bookings';

export const useGetMyBookings = () => {
  return useQuery({
    queryKey: ['myBookings'],
    queryFn: getMyBookings,
  });
};