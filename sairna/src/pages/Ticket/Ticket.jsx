import { useLocation, useNavigate } from "react-router-dom";

import {
  LuCheck,
  LuSparkles,
  LuTicket,
  LuRoute,
  LuArmchair,
} from "react-icons/lu";

import Button from "../../components/shared/Button";

function Ticket() {
  const navigate = useNavigate();
  const location = useLocation();

  const { reservation, trip, selectedSeats = [] } = location.state || {};

  // Handle refresh or direct access
  if (!reservation) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#f7fafb] px-4"
      >
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-text">
            لم يتم العثور على بيانات التذكرة.
          </h2>

          <Button onClick={() => navigate("/myTravels")} className="mt-6">
            حجوزاتي
          </Button>
        </div>
      </main>
    );
  }

  // Support common response structures
  const bookingData = reservation.data || reservation.booking || reservation;

  const bookingNumber =
    bookingData.bookingNumber ||
    bookingData.bookingCode ||
    bookingData.code ||
    bookingData.reference ||
    (bookingData.id ? `#${bookingData.id}` : "—");

  const origin = trip?.origin?.name || bookingData.origin?.name || "—";

  const destination =
    trip?.destination?.name || bookingData.destination?.name || "—";

  const bookedSeats = Array.isArray(bookingData.seats)
    ? bookingData.seats.map((seat) =>
        typeof seat === "object" ? seat.seatNumber : seat,
      )
    : selectedSeats;

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[#f7fafb] px-4 py-12"
    >
      <div className="w-full max-w-[800px] rounded-[32px] border border-[#e1eaed] bg-white px-6 py-12 shadow-[0_15px_60px_rgba(16,47,70,0.07)] md:px-14 md:py-16">
        {/* Success icon */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[#dcf7eb]">
            <LuCheck size={54} strokeWidth={2.5} className="text-[#08aa7b]" />
          </div>

          {/* Badge */}
          <div className="mt-7 flex items-center gap-2 rounded-full bg-[#e5f7f3] px-5 py-2 text-sm font-bold text-primary">
            <LuSparkles size={17} />
            صار الحجز جاهز
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-black leading-relaxed text-[#102f46] md:text-4xl">
            يا سلام! <span className="text-primary">تم تأكيد حجزك.</span>
          </h1>

          <p className="mt-3 max-w-[520px] text-sm leading-7 text-muted">
            انضافت التذكرة إلى حجوزاتي. هلق، فيك تراجع رحلتك وتتابع الرحلة
            التجريبية.
          </p>
        </div>

        {/* Ticket details */}
        <div className="mt-9 grid grid-cols-3 items-center rounded-2xl border border-dashed border-[#b9dcd7] bg-[#f1f7f7] px-3 py-6 text-center md:px-6">
          {/* Seats */}
          <div className="border-l border-dashed border-[#b9dcd7] px-2">
            <p className="text-xs text-muted">المقاعد</p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-1 font-black text-text">
              <LuArmchair className="text-primary" size={17} />

              {bookedSeats.length > 0 ? bookedSeats.join("، ") : "—"}
            </div>
          </div>

          {/* Destination */}
          <div className="border-l border-dashed border-[#b9dcd7] px-2">
            <p className="text-xs text-muted">الوجهة</p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-1 font-black text-text">
              <span>{origin}</span>
              <span className="text-primary">←</span>
              <span>{destination}</span>
            </div>
          </div>

          {/* Booking reference */}
          <div className="px-2">
            <p className="text-xs text-muted">رقم الحجز</p>

            <p dir="ltr" className="mt-3 break-all font-black text-text">
              {bookingNumber}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            variant="primary"
            color="primary"
            radius="rounded-2xl"
            onClick={() => navigate("/myTravels")}
            className="flex min-h-[60px] items-center justify-center gap-3 px-7 font-bold"
          >
            <LuTicket size={20} />
            عرض تذكرتي
          </Button>

          <Button
            type="button"
            variant="outline"
            color="secondary"
            radius="rounded-2xl"
            onClick={() =>
              navigate(`/follow?tripId=${trip?.id || bookingData.tripId || ""}`)
            }
            className="flex min-h-[60px] items-center justify-center gap-3 px-7 font-bold"
          >
            <LuRoute size={20} />
            تتبّع الرحلة
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Ticket;
