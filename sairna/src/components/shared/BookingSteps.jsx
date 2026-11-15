import { Link, useLocation } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import { MdArrowForward } from "react-icons/md";

function BookingSteps() {
  const location = useLocation();

  const steps = [
    { title: "اختيار المقاعد", path: "selectSeat" },
    { title: "بيانات المسافرين", path: "passengerinfo" },
    { title: "المراجعة والتأكيد", path: "confirm" },
  ];

  const currentPath = location.pathname.split("/").filter(Boolean).pop();

  const currentIndex = steps.findIndex((step) => step.path === currentPath);

  return (
    <>
      <div className="flex justify-between items-end pb-[50px]">
        <SectionHeading
          titleTag="h1"
          size="md"
          eyebrow="باقي شوي وتوصل"
          title="كمّل حجز "
          highlight="رحلتك."
        />

        <Link
          to="/booking"
          className="items-center text-muted font-bold hover:text-primary flex gap-3"
        >
          <MdArrowForward size={20} color="#718493" />
          تغيير الرحلة
        </Link>
      </div>

      <div className="flex justify-center gap-6">
        {steps.map((step, index) => {
          const completed = currentIndex !== -1 && index <= currentIndex;

          return (
            <div key={step.path} className="flex items-center gap-2">
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  completed
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
