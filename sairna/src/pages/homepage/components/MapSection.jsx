import { CiCircleCheck, CiLocationOn } from "react-icons/ci";
import Map from "../../../components/shared/Map";
import SectionHeading from "../../../components/shared/SectionHeading";
import Button from "../../../components/shared/Button";

function MapSection() {
  return (
    <>
      <section className="pt-[86px] pb-[50px] px-4 md:px-8 lg:px-12 bg-bg">
        <div className="px-[50px]  grid grid-cols-2 py-[36px] px-[29px] rounded-[28px]  overflow-hidden">
          <div className="flex flex-col gap-[10px] bg-surface rounded-3xl py-[50px] px-[50px]">
            <SectionHeading
              titleTag="h2"
              size="md"
              eyebrow="وين وصلت الرحلة؟"
              title="الطريق قدامك."
              highlight="لحظة بلحظة؟"
              subtitle="بصفحة التتبّع بتشوف خط سير الرحلة ومحطاتها وحالتها ضمن نموذج تفاعلي سهل وواضح."
              className="py-[20px] leading-10"
            ></SectionHeading>
            <div className="flex gap-[10px] text-[12px] mb-[11px]">
              <CiCircleCheck size={20} color="#0aa99b" />
              <p className="font-bold">عرض المسار على الخريطة</p>
            </div>
            <div className="flex gap-[10px] text-[12px] mb-[11px]">
              <CiCircleCheck size={20} color="#0aa99b" />{" "}
              <p className="font-bold">وقت وصول تقديري ومحطات الطريق</p>
            </div>
            <div>
              <Button
                type="button"
                variant="primary"
                color="primary"
                radius="rounded-xl"
                onClick={() => console.log("Login clicked")}
                className="hidden md:flex hover:-translate-y-1 px-[22px] py-[11px] text-[13px] font-bold"
              >
                جرب تتبع رحلة
              </Button>
            </div>

            <small>
              * الخريطة وحركة الحافلة في هذا النموذج توضيحية وليست GPS مباشر.
            </small>
          </div>
          <div className="order-2 lg:order-1 bg-[#edf5f4] p-5 rounded-[24px] rounded-r-none border border-[#e2eceb] flex flex-col gap-4">
            {/* Card Header */}
            <div className="flex items-center justify-between text-xs font-bold text-gray-700">
              <div className="flex items-center gap-1.5 bg-emerald-100/70 text-[#0aa99b] px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#0aa99b]" />
                <span>معاينة مسار رحلة</span>
              </div>
              <span className="text-gray-500 font-semibold">حلب – دمشق</span>
            </div>

            <Map/>
            <div className="w-full"></div>

            {/* Route Progress Bar Footer */}
            <div className="flex items-center justify-between text-xs font-bold text-gray-600 px-2 pt-1">
              <div className="flex items-center gap-1">
                <CiLocationOn size={18} className="text-[#0aa99b]" />
                <span>حلب</span>
              </div>

              {/* Custom Route Line with Dot */}
              <div className="flex-1 mx-4 relative flex items-center">
                <div className="w-full h-[2px] bg-[#0aa99b]/40 rounded-full" />
                <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0aa99b]" />
              </div>

              <div className="flex items-center gap-1">
                <CiLocationOn size={18} className="text-[#0aa99b]" />
                <span>دمشق</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MapSection;
