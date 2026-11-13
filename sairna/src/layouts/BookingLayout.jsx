import { useState } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";

import BookingSteps from "../components/shared/BookingSteps";
import SummaryBooking from "../components/shared/SummaryBooking";

import { useTrip } from "../api/useTrip";

function BookingLayout() {
  const { tripId: tripIdParam } = useParams();
  const tripId = Number(tripIdParam);

  // Shared booking state
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [searchParams] = useSearchParams();

  const passengersParam = Number(searchParams.get("passengers"));

  const passengerCount =
    Number.isInteger(passengersParam) && passengersParam > 0
      ? passengersParam
      : 1;

  // Fetch trip details
  const { data: tripData, isPending, isError, error } = useTrip(tripId);

  // Validate trip ID
  if (!tripIdParam || !Number.isInteger(tripId) || tripId <= 0) {
    return <p>رقم الرحلة غير صالح.</p>;
  }

  if (isPending) {
    return <p>جاري تحميل بيانات الرحلة...</p>;
  }

  if (isError) {
    return <p>حدث خطأ أثناء تحميل الرحلة: {error.message}</p>;
  }

  if (!tripData) {
    return <p>لم يتم العثور على بيانات الرحلة.</p>;
  }

  return (
    <div className="min-h-screen bg-[#f7fafb] px-4 py-10">
      <div className="mx-auto max-w-[1410px]">
        {/* Booking progress */}
        <div className="mb-8">
          <BookingSteps />
        </div>

        {/* Main layout */}
        <div
          dir="ltr"
          className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[370px_minmax(0,1fr)]"
        >
          {/* LEFT: Booking summary */}
          <SummaryBooking
            trip={tripData}
            selectedSeats={selectedSeats}
            passengerCount={passengerCount}
          />

          {/* RIGHT: Current booking step */}
          <main className="min-w-0">
            <Outlet
              context={{
                tripId,
                tripData,
                selectedSeats,
                setSelectedSeats,
                passengerCount,
                passengerDetails,
                setPassengerDetails,
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default BookingLayout;
