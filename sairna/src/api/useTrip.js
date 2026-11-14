
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const BASE_URL =
  "https://sairna.abdulrahman-hares.com/api/v1/website";

// Get all trips (your existing search)
export const getTrips = async (params) => {
  const response = await axios.get(`${BASE_URL}/trips`, { params });
  return response.data;
};

export const useGetTrips = (params = {}) => {
  return useQuery({
    queryKey: ["trips", params],
    queryFn: () => getTrips(params),
    enabled: Boolean(
      params.originId &&
      params.destinationId &&
      params.date
    ),
  });
};

// Get one trip by ID
export const getTrip = async (tripId) => {
  const response = await axios.get(`${BASE_URL}/trips/${tripId}`);
  return response.data;
};

export const useTrip = (tripId) => {
  return useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getTrip(tripId),
    enabled: Number.isInteger(tripId) && tripId > 0,
  });
};
