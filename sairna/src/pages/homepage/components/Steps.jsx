import SectionHeading from "../../../components/shared/SectionHeading";
import StepCard from "../../../components/shared/StepCard";
import { CiSearch } from "react-icons/ci";
import { MdEventSeat } from "react-icons/md";
import { TbBus } from "react-icons/tb";

function Steps() {
  return (
    <>
      <div className="py-[86px] bg-surface-alt ">
        <div className="flex justify-center text-center">
          <SectionHeading
            titleTag="h3"
            size="md"
            eyebrow=" السفر صار أبسط"
            title="3 خطوات... "
            highlight="وتكون بالطريق"
            align="center"
            subtitle="ما في داعي للتعقيد. كل شي مرتب بواجهة وحدة."
          ></SectionHeading>
        </div>
        <div className="grid gap-[20px] relative grid-cols-3 px-[150px] py-[50px]">
          <StepCard
            icon={<CiSearch size={30} />}
            number="01"
            title="اختار وجهتك"
            paragraph="حدّد من وين لوين وتاريخ الرحلة المناسب إلك."
            className="text-primary bg-soft-teal grid place-items-center"
          />
          <StepCard
            icon={<TbBus size={30} />}
            number="02"
            title="لاقي رحلتك "
            paragraph="قارن الشركات والمواعيد والأسعار واختر الأفضل."
            className="text-[#e4a34c] bg-[#fff4e4] grid place-items-center"
          />
          <StepCard
            icon={<MdEventSeat size={30} />}
            number="03"
            title="احجز مقعدك"
            paragraph="اختار مقعدك وأكّد الحجز، وتذكرتك بتصير جاهزة."
            className="text-[#5988d1] bg-[#eaf1ff] grid place-items-center"
          />
        </div>
      </div>
    </>
  );
}

export default Steps;
