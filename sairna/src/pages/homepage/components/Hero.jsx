import SectionHeading from "../../../components/shared/SectionHeading";
import damascus from "../../../assets/image.jpg";
import { GrLocation } from "react-icons/gr";
import { CiCircleCheck } from "react-icons/ci";
import { GoShieldCheck } from "react-icons/go";

function Hero() {
  return (
    <>
      <section className="bg-bg px-[25px] md:px-40 min-h-screen pt-[80px] pb-[71px]">
        <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-[30px] ">
          <div>
            <SectionHeading
              titleTag="h1"
              size="lg"
              eyebrow="أهلاً فيك بسيرنا"
              title="المحطة الجاية؟"
              highlight="على كيفك."
              subtitle="ن حلب لدمشق، ومن الساحل للجزيرة. لاقي الرحلة اللي بتناسبك، اختار مقعدك، وخلّي الطريق علينا."
            />
            <div className="flex flex-wrap my-[50px] justify-start">
              <span className="flex gap-[6px] font-bold">
                <CiCircleCheck color="#0aa99b" size={18} />
                حجز سهل
              </span>
              <span className="flex mr-[15px] gap-[6px]  font-bold">
                <CiCircleCheck color="#0aa99b" size={18} />
                خيارات متنوعة
              </span>
              <span className="flex mr-[15px] gap-[6px]  font-bold">
                <CiCircleCheck color="#0aa99b" size={18} />
                متابعة رحلتك
              </span>
            </div>
            <div className=" hidden md:flex items-center gap-4 justify-start">
              {/* Colored Letters */}
              <div className="flex -space-x-3 ">
                <span className="w-10 h-10 border-[2.5px] border-white rounded-full bg-[#f8d7b0] text-[#5e3a36] font-bold flex items-center justify-center text-sm shadow-sm">
                  م
                </span>

                <span className="w-10 h-10 border-[2.5px] border-white rounded-full bg-[#c5dedd] text-[#5e3a36] font-bold flex items-center justify-center text-sm shadow-sm">
                  س
                </span>

                <span className="w-10 h-10 border-[2.5px] border-white rounded-full bg-[#e8c3d3] text-[#5e3a36] font-bold flex items-center justify-center text-sm shadow-sm">
                  ع
                </span>

                <span className="w-10 h-10 border-[2.5px] border-white rounded-full bg-[#bfd8f3] text-[#5e3a36] font-bold flex items-center justify-center text-sm shadow-sm">
                  ر
                </span>
              </div>

              {/* Rating, Stars & Arabic Phrase */}
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#1a2e3b] text-base">
                    4.9/5
                  </span>

                  <div className="flex text-[#fbbd08] text-sm">
                    {"★".repeat(5)}
                  </div>
                </div>

                <span className="text-gray-500 text-sm font-semibold">
                  تجربة سفر بتستاهل تجرّبها
                </span>
              </div>
            </div>
          </div>
          <div className="min-h-[320px] bg-[#d4e4e5] relative rounded-[30px] md:-rotate-2 h-[398px] mt-[30px] ">
            <img
              src={damascus}
              className="object-cover w-full h-[399px] rounded-[30px]"
            />
            <span className="absolute bottom-[2px] left-3.5 bg-[#0c2b35]/72 rounded-[10px] py-[5px] px-[11px] text-amber-50">
              صورة حقيقية من دمشق
            </span>
            <div className="bg-white [transform:translate3d(0,var(--float-distance),0)_rotate(1.5deg)] rounded-[10px] absolute top-[25px] left-[-26px] py-[10px] px-[15px] flex">
              <div>
                <b>14 محافظة</b>
                <p>وجهات بتجمعنا</p>
              </div>
              <GrLocation color="#0aa99b" size={24} />
            </div>
            <div className="bg-white transform rotate-[1.5deg]  rounded-[10px] absolute bottom-[25px] right-[-26px] py-[10px] px-[15px] flex">
              <div>
                <b>سافر براحة</b>
                <p>من أول حجز لآخر محطة</p>
              </div>
              <GoShieldCheck color="#0aa99b" size={24} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
