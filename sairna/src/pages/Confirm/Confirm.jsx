import { useState } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";

import {
  LuCircleCheck,
  LuUserRound,
  LuWallet,
  LuCreditCard,
  LuShieldCheck,
} from "react-icons/lu";

import Button from "../../components/shared/Button";

import { useCreateReservation } from "../../hooks/use-resevations";

import {
  savePendingReservation,
  getPendingReservation,
  clearPendingReservation,
} from "../../utiles/pendingReservation";

import { getToken, logout } from "../../utiles/token-storage";

// Validate reservation information
function isValidReservation(payload, tripId, passengerCount) {
  if (
    !payload ||
    Number(payload.tripId) !== Number(tripId) ||
    !Array.isArray(payload.seats) ||
    payload.seats.length !== passengerCount
  ) {
    return false;
  }

  const seatNumbers = payload.seats.map((seat) => Number(seat.seatNumber));

  return (
    seatNumbers.every(
      (seatNumber) => Number.isInteger(seatNumber) && seatNumber > 0,
    ) &&
    new Set(seatNumbers).size === passengerCount &&
    payload.seats.every(
      (passenger) =>
        passenger.passengerName?.trim() &&
        /^09\d{8}$/.test(passenger.passengerPhone?.trim() || ""),
    )
  );
}

function Confirm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Restore saved draft after login
  const [savedDraft] = useState(() => getPendingReservation());

  // Shared information from BookingLayout
  const {
    tripId,
    tripData,
    selectedSeats = [],
    passengerCount = 1,
    passengerDetails = [],
  } = useOutletContext();

  const [paymentMethod, setPaymentMethod] = useState("office");

  // React Query mutation
  const {
    mutate: createReservation,
    isPending,
    isError,
    error,
  } = useCreateReservation();

  // Build reservation from current booking state
  const currentPayload = {
    tripId: Number(tripId),

    seats: Array.from({ length: passengerCount }, (_, index) => ({
      seatNumber: Number(selectedSeats[index]),
      passengerName: passengerDetails[index]?.passengerName?.trim() || "",
      passengerPhone: passengerDetails[index]?.passengerPhone?.trim() || "",
    })),
  };

  // Check current booking data
  const currentDataIsValid = isValidReservation(
    currentPayload,
    tripId,
    passengerCount,
  );

  // Check saved booking data
  const savedDataIsValid = isValidReservation(
    savedDraft,
    tripId,
    passengerCount,
  );

  // Use current data first, otherwise restore saved data
  const reservationPayload = currentDataIsValid
    ? currentPayload
    : savedDataIsValid
      ? savedDraft
      : currentPayload;

  const reservationSeats = reservationPayload.seats || [];

  const isReady = isValidReservation(
    reservationPayload,
    tripId,
    passengerCount,
  );

  // Previous page
  const handlePrevious = () => {
    navigate(
      `/bookingLayout/${tripId}/passengerInfo?passengers=${passengerCount}`,
    );
  };

  // Confirm reservation
  const handleConfirm = () => {
    if (!isReady || isPending) return;

    const token = getToken();

    // Save the current page URL to return after login
    const returnUrl = `${location.pathname}${location.search}`;

    // CASE 1: User is not logged in
    if (!token) {
      // Save booking information
      savePendingReservation(reservationPayload);

      // Redirect to login
      navigate("/login", {
        state: {
          from: returnUrl,
        },
      });

      return;
    }

    // CASE 2: User is logged in
    // Send POST request
    createReservation(reservationPayload, {
      onSuccess: (response) => {
        // Remove temporary booking information
        clearPendingReservation();

        // Go to ticket page only after successful response
        navigate("/ticket", {
          replace: true,
          state: {
            reservation: response,
            trip: tripData,
            selectedSeats: reservationSeats.map(
              (passenger) => passenger.seatNumber,
            ),
          },
        });
      },

      onError: (err) => {
        // Handle expired or invalid token
        if (err.response?.status === 401) {
          savePendingReservation(reservationPayload);

          logout();

          navigate("/login", {
            state: {
              from: returnUrl,
            },
          });
        }
      },
    });
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-3xl border border-border bg-surface p-6 shadow-sm lg:p-8"
    >
      {/* Heading */}
      <div className="mb-8 text-right">
        <div className="flex items-center gap-3">
          <LuCircleCheck size={27} className="text-primary" />

          <h2 className="text-2xl font-bold text-text">كل شي جاهز؟</h2>
        </div>

        <p className="mt-3 text-sm text-muted">
          راجع معلومات الرحلة قبل ما تثبت الحجز.
        </p>
      </div>

      {/* Passenger details */}
      <div className="rounded-3xl border border-border bg-surface p-5 md:p-7">
        <h3 className="mb-5 text-lg font-bold text-text">تفاصيل المسافرين</h3>

        <div className="border-t border-border" />

        <div className="flex flex-col divide-y divide-border">
          {reservationSeats.map((passenger, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 py-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-soft-teal text-primary">
                  <LuUserRound size={23} />
                </div>

                <div>
                  <h4 className="font-bold text-text">
                    {passenger.passengerName || "غير محدد"}
                  </h4>

                  <p dir="ltr" className="mt-1 text-right text-sm text-muted">
                    {passenger.passengerPhone || "غير محدد"}
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-sm font-bold text-primary">
                المقعد {passenger.seatNumber || "—"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <div className="mt-6 rounded-3xl border border-border bg-surface p-5 md:p-7">
        <h3 className="mb-5 text-lg font-bold text-text">طريقة تأكيد الحجز</h3>

        <div className="flex flex-col gap-3">
          {/* Office payment */}
          <label
            className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all ${
              paymentMethod === "office"
                ? "border-primary bg-soft-teal"
                : "border-border hover:border-primary/50"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="office"
              checked={paymentMethod === "office"}
              onChange={() => setPaymentMethod("office")}
              className="h-4 w-4 accent-primary"
            />

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-alt text-primary">
              <LuWallet size={24} />
            </div>

            <div>
              <h4 className="font-bold text-text">الدفع في مكتب الشركة</h4>

              <p className="mt-1 text-xs leading-5 text-muted">
                ادفع عند الحضور لمكتب الشركة قبل الرحلة — عرض تجريبي.
              </p>
            </div>
          </label>

          {/* Electronic payment */}
          <label
            className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all ${
              paymentMethod === "electronic"
                ? "border-primary bg-soft-teal"
                : "border-border hover:border-primary/50"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="electronic"
              checked={paymentMethod === "electronic"}
              onChange={() => setPaymentMethod("electronic")}
              className="h-4 w-4 accent-primary"
            />

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-alt text-primary">
              <LuCreditCard size={24} />
            </div>

            <div>
              <h4 className="font-bold text-text">دفع إلكتروني (تجريبي)</h4>

              <p className="mt-1 text-xs leading-5 text-muted">
                محاكاة لواجهة الدفع فقط، لن يتم تحصيل أي مبلغ.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Security information */}
      <div className="my-6 flex items-center gap-3 text-sm text-primary">
        <LuShieldCheck size={22} className="shrink-0" />

        <p className="leading-6">
          تأكد من صحة معلومات المسافرين قبل إتمام الحجز.
        </p>
      </div>

      {/* Invalid booking data */}
      {!isReady && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-700">
          بيانات الحجز غير مكتملة. يرجى العودة والتأكد من اختيار المقاعد وإدخال
          بيانات المسافرين.
        </div>
      )}

      {/* API error */}
      {isError && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          {error?.response?.data?.message ||
            error?.message ||
            "حدث خطأ أثناء تأكيد الحجز."}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between border-t border-border pt-7">
        <Button
          type="button"
          variant="outline"
          color="secondary"
          radius="rounded-2xl"
          onClick={handlePrevious}
          className="flex items-center gap-3 px-6 py-4 font-bold"
        >
          <span>→</span>
          السابق
        </Button>

        <Button
          type="button"
          variant="primary"
          color="primary"
          radius="rounded-2xl"
          onClick={handleConfirm}
          disabled={!isReady || isPending}
          className="flex items-center gap-3 px-6 py-4 font-bold"
        >
          {isPending ? "جاري تأكيد الحجز..." : "تأكيد الحجز"}

          <span>←</span>
        </Button>
      </div>
    </section>
  );
}

export default Confirm;
