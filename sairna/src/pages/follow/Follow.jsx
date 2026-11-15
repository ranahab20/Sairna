import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import {
  LuBus,
  LuMapPin,
  LuClock,
  LuRoute,
  LuPause,
  LuPlay,
  LuArrowLeft,
  LuCheck,
  LuNavigation,
} from "react-icons/lu";

import Button from "../../components/shared/Button";
import Map from "../../components/shared/Map";
import SectionHeading from "../../components/shared/SectionHeading";
import { useTrip } from "../../api/useTrip";

function Follow() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const tripFromState = location.state?.trip;

  const tripId = Number(searchParams.get("tripId") || tripFromState?.id || 0);

  // Fetch trip if it is not available in navigation state
  const { data: fetchedTrip, isPending, isError, error } = useTrip(tripId);

  // Prefer trip passed from Ticket, otherwise use API data
  const trip = tripFromState || fetchedTrip;

  const [isMoving, setIsMoving] = useState(true);
  const [showEstimate, setShowEstimate] = useState(false);

  // No trip selected
  if (!trip && (!tripId || tripId <= 0)) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[80vh] items-center justify-center bg-[#f7fafb] px-4"
      >
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-soft-teal">
            <LuBus size={38} className="text-primary" />
          </div>

          <h2 className="mt-6 text-2xl font-extrabold text-text">
            لا توجد رحلة لمتابعتها
          </h2>

          <p className="mt-3 text-sm leading-7 text-muted">
            عندما تقوم بحجز رحلة، ستتمكن من متابعة مسارها ومعرفة تفاصيلها من
            هنا.
          </p>

          <Link to="/booking" className="mt-7 block">
            <Button className="w-full font-bold">احجز رحلتك الآن</Button>
          </Link>
        </div>
      </main>
    );
  }

  // Loading
  if (!trip && isPending) {
    return (
      <div
        dir="rtl"
        className="min-h-[70vh] flex items-center justify-center text-muted"
      >
        جاري تحميل بيانات الرحلة...
      </div>
    );
  }

  // Error or unavailable trip
  if (!trip && isError) {
    return (
      <div
        dir="rtl"
        className="min-h-[70vh] flex flex-col items-center justify-center gap-4"
      >
        <p className="text-red-500 font-bold">تعذر تحميل بيانات الرحلة.</p>

        <p className="text-sm text-muted">{error?.message}</p>

        <Link to="/booking">
          <Button>العودة إلى الرحلات</Button>
        </Link>
      </div>
    );
  }

  if (!trip) return null;

  // Format time
  const formatTime = (date) => {
    if (!date) return "--:--";

    return new Date(date).toLocaleTimeString("ar-SY", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Demo progress until live tracking API is available
  const progress = isMoving ? 26 : 26;

  const departure = new Date(trip.departureAt);
  const arrival = new Date(trip.arrivalAt);

  const totalMinutes = Math.max(0, Math.round((arrival - departure) / 60000));

  const remainingMinutes = Math.round(totalMinutes * (1 - progress / 100));

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins} دقيقة`;

    if (mins === 0) return `${hours} ساعة`;

    return `${hours} ساعة و ${mins} دقيقة`;
  };

  const departureTime = formatTime(trip.departureAt);
  const arrivalTime = formatTime(trip.arrivalAt);

  return (
    <main className="min-h-screen bg-[#f7fafb] px-4 py-10">
      <div className="mx-auto max-w-[1410px]">
        {/* Header */}
        <div
          dir="rtl"
          className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <SectionHeading
            titleTag="h1"
            size="md"
            eyebrow="✦ تابع الطريق"
            title="رحلتك قدام عيونك"
            subtitle="خط السير على الخريطة مع محطات وقت وصول توضيحي."
          />

          <Link to="/myTravels">
            <Button
              variant="outline"
              color="secondary"
              className="flex items-center gap-2 font-bold"
            >
              كل الحجوزات
              <LuArrowLeft size={18} />
            </Button>
          </Link>
        </div>

        {/* Main content */}
        <div
          dir="ltr"
          className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_400px]"
        >
          {/* Map */}
          <div className="min-h-[500px] lg:min-h-[675px]">
            <Map origin={trip.origin} destination={trip.destination} />
          </div>

          {/* Trip information */}
          <div
            dir="rtl"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            {/* Status */}
            <div className="mb-8 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />

                <span className="text-sm font-bold text-emerald-600">
                  الرحلة قيد العرض التجريبي
                </span>
              </div>

              <span className="text-[10px] font-bold text-muted">
                {trip.code}
              </span>
            </div>

            {/* Company */}
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-soft-teal">
                {trip.company?.logoUrl ? (
                  <img
                    src={trip.company.logoUrl}
                    alt={trip.company.name}
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <LuBus size={28} className="text-primary" />
                )}
              </div>

              <div>
                <h3 className="font-extrabold text-text">
                  {trip.company?.name || "شركة النقل"}
                </h3>

                <p className="mt-1 text-xs text-muted">
                  موعد الانطلاق {departureTime}
                </p>
              </div>
            </div>

            {/* Origin and destination */}
            <div className="mb-8 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-muted">من</span>

                <h2 className="mt-1 text-2xl font-extrabold text-text">
                  {trip.origin?.name}
                </h2>
              </div>

              <LuArrowLeft size={25} className="shrink-0 text-primary" />

              <div className="text-left">
                <span className="text-xs text-muted">إلى</span>

                <h2 className="mt-1 text-2xl font-extrabold text-text">
                  {trip.destination?.name}
                </h2>
              </div>
            </div>

            <div className="my-6 border-t border-dashed border-slate-200" />

            {/* Progress */}
            <div className="mb-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-extrabold text-primary">
                  {progress}%
                </span>

                <h3 className="text-sm font-bold text-text">تقدم الرحلة</h3>
              </div>

              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-[#55c9a8] to-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-7 space-y-0">
              {/* Departure */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-text">
                    {trip.origin?.name}
                  </h3>

                  <p className="mt-1 text-xs text-muted">محطة الانطلاق</p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                  <LuCheck size={17} />
                </div>

                <span className="w-14 text-xs text-muted">{departureTime}</span>
              </div>

              {/* On the road */}
              <div className="flex items-center gap-3 py-5">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-text">على الطريق</h3>

                  <p className="mt-1 text-xs text-muted">
                    الحافلة تتجه نحو الوجهة
                  </p>
                </div>

                <div className="relative flex w-8 justify-center">
                  <div className="absolute -top-8 h-16 border-r-2 border-dashed border-primary/30" />

                  <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    <LuBus size={17} />
                  </div>
                </div>

                <span className="w-14 text-xs font-bold text-primary">
                  الآن
                </span>
              </div>

              {/* Arrival */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-text">
                    {trip.destination?.name}
                  </h3>

                  <p className="mt-1 text-xs text-muted">محطة الوصول</p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <LuMapPin size={17} />
                </div>

                <span className="w-14 text-xs text-muted">{arrivalTime}</span>
              </div>
            </div>

            {/* Distance and estimated time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="mb-3 flex items-center gap-2 text-muted">
                  <LuRoute size={16} />

                  <span className="text-xs">المسافة الكلية</span>
                </div>

                <h3 className="text-lg font-extrabold text-text">
                  {trip.distanceKm != null
                    ? `~${trip.distanceKm} كم`
                    : "غير متاحة"}
                </h3>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="mb-3 flex items-center gap-2 text-muted">
                  <LuClock size={16} />

                  <span className="text-xs">المتبقي التقديري</span>
                </div>

                <h3 className="text-lg font-extrabold text-text">
                  {formatDuration(remainingMinutes)}
                </h3>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">المقاعد المتاحة</span>

                <span className="font-bold text-text">
                  {trip.availableSeats ?? "—"} مقعد
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setIsMoving(!isMoving)}
                  className="flex flex-1 items-center justify-center gap-2 text-sm font-bold"
                >
                  {isMoving ? (
                    <>
                      <LuPause size={16} />
                      إيقاف الحركة
                    </>
                  ) : (
                    <>
                      <LuPlay size={16} />
                      استئناف الحركة
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  color="secondary"
                  onClick={() => setShowEstimate(!showEstimate)}
                  className="whitespace-nowrap text-xs"
                >
                  المتبقي التقديري
                </Button>
              </div>

              {showEstimate && (
                <div className="rounded-xl bg-soft-teal p-4 text-sm text-text">
                  الوقت المتبقي حسب مدة الرحلة المجدولة:
                  <strong className="mt-2 block text-primary">
                    {formatDuration(remainingMinutes)}
                  </strong>
                  <p className="mt-2 text-xs text-muted">
                    هذا تقدير تجريبي وليس وقت وصول مباشر.
                  </p>
                </div>
              )}

              {!isMoving && (
                <p className="text-center text-xs text-amber-600">
                  تم إيقاف محاكاة حركة الرحلة.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Follow;
