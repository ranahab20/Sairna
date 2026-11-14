import { Link, useLocation } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import { MdArrowForward } from "react-icons/md";

function BookingSteps() {
  const location = useLocation();
  const steps = [
    { title: "اختيار المقاعد", path: "/booking/seats" },
    { title: "بيانات المسافرين", path: "/booking/passengers" },
    { title: "المراجعة والتأكيد", path: "/booking/review" },
  ];

  const currentIndex = steps.findIndex(
    (step) => step.path === location.pathname,
  );
  return (
    <>
      <div className="flex justify-between items-end pb-[50px]">
        <div>
          <SectionHeading
            titleTag="h1"
            size="md"
            eyebrow="باقي شوي وتوصل"
            title="كمّل حجز "
            highlight="رحلتك."
          />
        </div>
        <div className="">
          <Link
            to="/Booking"
            className="items-center text-muted font-bold hover:text-primary flex gap-3"
          >
            <MdArrowForward size={20} color="#718493"  />
            تغيير الرحلة
          </Link>
        </div>
      </div>
      <div className="flex justify-center gap-6">
        {steps.map((step, index) => {
          const completed = index < currentIndex;
          const active = index === currentIndex;

          return (
            <div key={step.path} className="flex items-center gap-2">
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center
                ${
                  active || completed
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {index + 1}
              </span>

              <span>{step.title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BookingSteps;
