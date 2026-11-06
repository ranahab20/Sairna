import SectionHeading from '../../components/shared/SectionHeading';
import { FaPlus } from 'react-icons/fa';

function Support() {
  // مصفوفة الأسئلة والأجوبة
  const faqData = [
    {
      q: "كيف بحجز رحلة؟",
      a: "حدد المحافظة اللي رح تطلع منها والمحافظة اللي بدك توصل إلها، بعدين اختار التاريخ والشركة والموعد والمقعد، وأكّد الحجز."
    },
    {
      q: "في دفع إلكتروني حقيقي؟",
      a: "لا. الموقع نموذج تدريبي، وخيارات الدفع معروضة لأغراض التصميم فقط."
    },
    {
      q: "الخريطة بتعرض مكان الباص الحقيقي؟",
      a: "لا. الخريطة بتعرض مسار تقديري ومحاكاة لحركة الباص. التتبع المباشر يحتاج GPS وAPI من شركة النقل."
    },
    {
      q: "وين بلاقي حجوزاتي؟",
      a: "من قائمة «حجوزاتي» في الشريط العلوي. الحجوزات محفوظة محلياً بنفس المتصفح لأغراض التدريب."
    },
    {
      q: "هل في حسابات حقيقية؟",
      a: "التسجيل والدخول محاكاة لتجربة الواجهة، وليسا نظام مصادقة حقيقياً."
    }
  ];

  return (
    <main className="min-h-screen bg-bg-main py-16">
      <div className="container mx-auto px-4 max-w-3xl"> {/* max-w-4xl عشان ما تمدد الصفحة زيادة */}
        
        
        <div className="mb-12 text-center">
          <SectionHeading 
            eyebrow="نحن معك"
            title="شو حابب"
            highlight="تعرف؟"
            subtitle="أسئلة بتساعدك تستخدم نموذج سيرنا بسهولة."
            align="center" 
          />
        </div>

        
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <details 
              key={index} 
              className="group bg-surface border border-border rounded-xl p-2 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-text text-md hover:text-primary transition-colors">
                {item.q}
                <span className="text-muted group-open:rotate-45 transition-transform duration-300">
                  <FaPlus size={14} />
                </span>
              </summary>
              <div className="px-4 pb-4 text-muted text-sm leading-relaxed border-t border-border-main mt-2 pt-4">
                {item.a}
              </div>
            </details>
          ))}
        </div>

      </div>
    </main>
  );
}

export default Support;