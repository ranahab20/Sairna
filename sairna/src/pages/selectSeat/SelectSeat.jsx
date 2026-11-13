import { useOutletContext } from "react-router-dom";

import { LuArmchair } from "react-icons/lu";

import { useSeats } from "../../api/seats";

import SeatMap from "./components/SeatMap";
import SeatSelectionInfo from "./components/SeatSelectionInfo";

function SelectSeat() {
  // Get shared data from BookingLayout
  const { tripId,tripData, selectedSeats, setSelectedSeats, passengerCount } =
    useOutletContext();

  // Fetch seat availability
  const { data: seatsData, isPending, isError, error } = useSeats(tripId);

  if (isPending) {
    return <p>جاري تحميل المقاعد...</p>;
  }

  if (isError) {
    return <p>حدث خطأ أثناء تحميل المقاعد: {error.message}</p>;
  }

  if (!seatsData) {
    return <p>لم يتم العثور على بيانات المقاعد.</p>;
  }

  // Handle selecting and unselecting seats
  function handleSeatClick(seatNumber) {
    setSelectedSeats((prev) => {
      // Remove seat if already selected
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      }

      // Do not select more seats than passengers
      if (prev.length >= passengerCount) {
        return prev;
      }

      return [...prev, seatNumber];
    });
  }
  

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      {/* Section heading */}
      <div dir="rtl" className="mb-8">
        <div className="flex items-center gap-3">
          <LuArmchair size={24} className="text-[#00a99d]" />

          <h2 className="text-2xl font-bold text-[#102f46]">
            اختيار مكانك المفضل
          </h2>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          اختر {passengerCount} مقعد من المخطط، المقاعد الرمادية محجوزة مسبقاً.
        </p>
      </div>

      {/* Selection info + seat map */}
      <div
        dir="ltr"
        className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_420px]"
      >
        {/* Middle: Selected seat information */}
        <SeatSelectionInfo
          selectedSeats={selectedSeats}
          passengerCount={passengerCount}
          trip={tripData}
        />

        {/* Right: Bus seat map */}
        <SeatMap
          tripData={seatsData}
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
        />
      </div>
    </section>
  );
}

export default SelectSeat;
