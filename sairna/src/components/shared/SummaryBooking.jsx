import { LuTicket, LuShieldCheck } from "react-icons/lu";

const SummaryBooking = ({ trip, passengerCount = "", selectedSeats = [] }) => {
  if (!trip) return null;

  const formatPrice = (price) =>
    `${new Intl.NumberFormat("en-US").format(Number(price) || 0)} ل.س`;

  const formatTime = (date) => {
    if (!date) return "--:--";

    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Damascus",
    }).format(new Date(date));
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Intl.DateTimeFormat("ar-SY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Damascus",
    }).format(new Date(date));
  };

  const totalPrice = Number(trip.price || 0) * passengerCount;

  return (
    <aside
      dir="rtl"
      className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
        <LuTicket size={23} className="text-[#00a99d]" />

        <h2 className="text-xl font-bold text-[#102f46]">ملخص الحجز</h2>
      </div>

      {/* Company */}
      <div className="my-6 flex items-center gap-3">
        {trip.company?.logoUrl ? (
          <img
            src={trip.company.logoUrl}
            alt={trip.company.name}
            className="h-14 w-14 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5f7f3] text-2xl font-bold text-[#00a99d]">
            {trip.company?.name?.charAt(0) || "ش"}
          </div>
        )}

        <div>
          <h3 className="font-bold text-[#102f46]">
            {trip.company?.name || "شركة النقل"}
          </h3>

          <p className="mt-1 text-xs text-slate-500">رحلة مباشرة</p>
        </div>
      </div>

      {/* Route */}
      <div className="rounded-2xl bg-[#f1f6f7] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">الانطلاق</p>

            <h3 className="mt-2 font-bold text-[#102f46]">
              {trip.origin?.name}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {formatTime(trip.departureAt)}
            </p>
          </div>

          <div className="text-xl text-[#00a99d]">←</div>

          <div className="text-left">
            <p className="text-xs text-slate-500">الوصول</p>

            <h3 className="mt-2 font-bold text-[#102f46]">
              {trip.destination?.name}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {formatTime(trip.arrivalAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Trip details */}
      <div className="my-6 space-y-5 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-slate-500">تاريخ الرحلة</span>

          <span className="text-left font-bold text-[#102f46]">
            {formatDate(trip.departureAt)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">المسافرين</span>

          <span className="font-bold text-[#102f46]">{passengerCount}</span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-slate-500">المقاعد</span>

          <span className="font-bold text-[#102f46]">
            {selectedSeats.length > 0
              ? selectedSeats.join("، ")
              : "لم تُحدد بعد"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">السعر للمسافر</span>

          <span className="font-bold text-[#102f46]">
            {formatPrice(trip.price)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-dashed border-slate-200 pt-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-bold text-[#102f46]">السعر الإجمالي</span>

          <span className="text-xl font-bold text-[#00a99d]">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      {/* Security note */}
      <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#f1f6f7] p-3 text-xs text-slate-500">
        <LuShieldCheck className="shrink-0 text-[#00a99d]" />
        لا يوجد دفع حقيقي ضمن المشروع التعليمي.
      </div>
    </aside>
  );
};

export default SummaryBooking;
