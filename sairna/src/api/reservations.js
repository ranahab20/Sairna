
import axios from "axios";
import { getToken } from "../utiles/token-storage";

const BASE_URL =
  "https://sairna.abdulrahman-hares.com/api/v1/website";

const RESERVATION_ENDPOINT = "/bookings";

const createReservation = async (reservationData) => {
  const token = getToken();

  if (!token) {
    throw new Error("يجب تسجيل الدخول أولاً.");
  }

  const response = await axios.post(
    `${BASE_URL}${RESERVATION_ENDPOINT}`,
    reservationData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export default createReservation;
