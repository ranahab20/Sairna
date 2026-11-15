
const PENDING_RESERVATION_KEY = "pendingReservation";

// Save the pending reservation
export function savePendingReservation(reservation) {
  localStorage.setItem(
    PENDING_RESERVATION_KEY,
    JSON.stringify(reservation)
  );
}

// Retrieve the pending reservation
export function getPendingReservation() {
  try {
    const reservation = localStorage.getItem(
      PENDING_RESERVATION_KEY
    );

    return reservation ? JSON.parse(reservation) : null;
  } catch (error) {
    console.error("Error reading pending reservation:", error);

    localStorage.removeItem(PENDING_RESERVATION_KEY);
    return null;
  }
}

// Remove the pending reservation
export function clearPendingReservation() {
  localStorage.removeItem(PENDING_RESERVATION_KEY);
}
