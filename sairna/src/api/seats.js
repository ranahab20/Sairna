import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = 'https://sairna.abdulrahman-hares.com/api/v1/website';

const getSeats = async (tripId) => {
  const response = await axios.get(`${BASE_URL}/trips/${tripId}/seats`)
  return response.data;
};

export function useSeats(tripId) {
  return useQuery({
    queryKey: ["seats", tripId],
    queryFn: () => getSeats(tripId),
    enabled: !!tripId,
  });
}