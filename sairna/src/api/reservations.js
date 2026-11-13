import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL =
  "https://sairna.abdulrahman-hares.com/api/v1/website";

// IMPORTANT:
// Replace this with the exact POST endpoint from your Swagger.
const RESERVATION_ENDPOINT = "/REPLACE_WITH_POST_ENDPOINT";

// Create reservation
const createReservation = async (reservationData) => {
  const response = await axios.post(
    `${BASE_URL}${RESERVATION_ENDPOINT}`,
    reservationData
  );

  return response.data;
};