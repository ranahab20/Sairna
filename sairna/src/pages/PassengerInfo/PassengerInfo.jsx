import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import {
  LuUsers,
  LuUserRound,
  LuPhone,
  LuInfo,
  LuArrowLeft,
  LuArrowRight,
} from "react-icons/lu";

import CustomInput from "../../components/shared/CustomInput";
import Button from "../../components/shared/Button";

function PassengerInfo() {
  const navigate = useNavigate();

  const {
    tripId,
    selectedSeats,
    passengerCount,
    passengerDetails,
    setPassengerDetails,
  } = useOutletContext();

  const [errors, setErrors] = useState({});

  const emptyPassenger = {
    passengerName: "",
    passengerPhone: "",
  };

  // Create the required number of passenger forms
  const passengers = Array.from(
    { length: passengerCount },
    (_, index) => passengerDetails[index] || emptyPassenger,
  );

  // Update passenger information in shared BookingLayout state
  const handleChange = (index, field, value) => {
    setPassengerDetails((prev) => {
      const updated = Array.from(
        { length: passengerCount },
        (_, i) => prev[i] || { ...emptyPassenger },
      );

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });

    setErrors((prev) => ({
      ...prev,
      [`${index}-${field}`]: "",
    }));
  };

  // Previous step
  const handlePrevious = () => {
    navigate(
      `/bookingLayout/${tripId}/selectSeat?passengers=${passengerCount}`,
    );
  };

  // Validate passenger information
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (selectedSeats.length !== passengerCount) {
      newErrors.seats = "يرجى اختيار جميع المقاعد المطلوبة.";
    }

    passengers.forEach((passenger, index) => {
      if (!passenger.passengerName.trim()) {
        newErrors[`${index}-passengerName`] = "يرجى إدخال الاسم الكامل.";
      }

      // Syrian mobile format: 09 followed by 8 digits
      if (!/^09\d{8}$/.test(passenger.passengerPhone.trim())) {
        newErrors[`${index}-passengerPhone`] =
          "يرجى إدخال رقم موبايل صحيح، مثال: 0912345678.";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Move to confirmation page
    navigate(
      `/bookingLayout/${tripId}/confirmReservation?passengers=${passengerCount}`,
    );
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-3xl border border-border bg-surface p-6 shadow-sm lg:p-8"
    >
      {/* Heading */}
      <div className="mb-8 text-right">
        <div className="flex items-center gap-3">
          <LuUsers size={26} className="text-primary" />

          <h2 className="text-2xl font-bold text-text">مين مسافر معنا؟</h2>
        </div>

        <p className="mt-3 text-sm text-muted">
          دخل بيانات المسافرين حسب عدد المقاعد المختارة.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Passenger cards */}
        <div className="flex flex-col gap-5">
          {passengers.map((passenger, index) => (
            <div
              key={index}
              className="rounded-3xl border border-border bg-surface p-5 md:p-7"
            >
              {/* Passenger heading */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-soft-teal font-bold text-primary">
                    {index + 1}
                  </span>

                  <h3 className="font-bold text-text">المسافر {index + 1}</h3>
                </div>

                <span className="rounded-xl bg-surface-alt px-3 py-2 text-xs text-muted">
                  مقعد رقم {selectedSeats[index] ?? "—"}
                </span>
              </div>

              {/* Input fields */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <CustomInput
                  label="الاسم الكامل"
                  icon={<LuUserRound size={20} />}
                  type="text"
                  placeholder="مثال: أحمد خالد"
                  value={passenger.passengerName}
                  onChange={(e) =>
                    handleChange(index, "passengerName", e.target.value)
                  }
                  required
                  error={errors[`${index}-passengerName`]}
                  autoComplete="name"
                />

                <CustomInput
                  label="رقم الموبايل"
                  icon={<LuPhone size={20} />}
                  type="tel"
                  placeholder="09xxxxxxxx"
                  value={passenger.passengerPhone}
                  onChange={(e) =>
                    handleChange(index, "passengerPhone", e.target.value)
                  }
                  required
                  maxLength={10}
                  inputMode="numeric"
                  dir="ltr"
                  error={errors[`${index}-passengerPhone`]}
                  autoComplete="tel"
                />
              </div>
            </div>
          ))}
        </div>

        {errors.seats && (
          <p className="mt-4 text-sm font-bold text-red-500">{errors.seats}</p>
        )}

        {/* Information message */}
        <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-soft-teal p-4 text-sm text-primary">
          <p className="font-medium leading-6">
            هذه بيانات تجريبية فقط. لا تدخل معلوماتك الحساسة في نسخة التدريب.
          </p>

          <LuInfo size={22} className="shrink-0" />
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-7">
          <Button
            type="button"
            variant="outline"
            color="secondary"
            radius="rounded-2xl"
            onClick={handlePrevious}
            className="flex items-center gap-3 px-6 py-4 font-bold"
          >
            <LuArrowRight size={19} />
            السابق
          </Button>

          <Button
            type="submit"
            variant="primary"
            color="primary"
            radius="rounded-2xl"
            className="flex items-center gap-3 px-6 py-4 font-bold"
          >
            متابعة الحجز
            <LuArrowLeft size={19} />
          </Button>
        </div>
      </form>
    </section>
  );
}

export default PassengerInfo;
