import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../components/shared/SectionHeading';
import Button from '../../components/shared/Button';
import { FaArrowLeft } from 'react-icons/fa';
import imgLatakia from '../../assets/latakia.jpg';

function About() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-bg-main py-16">
      
      <section className="container mx-auto px-4 mb-16">
        <SectionHeading 
          eyebrow="قصتنا"
          title="سيرنا. رحلة"
          highlight="أبسط لكل حدا."
          subtitle="فكرة موقع لحجز الرحلات البرية بين المحافظات السورية، انبنت كنموذج لتعليم تصميم وتطوير الويب."
          align="right"
          size="md" 
        />
      </section>


      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-start gap-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text leading-tight">
              فكرة صغيرة... <span className="text-primary">تجربة كبيرة.</span>
            </h2>
            
            <p className="text-muted text-sm md:text-base">
              بدنا تجربة واضحة للمستخدم من لحظة اختيار مدينة الانطلاق والوصول، وصولاً لمقارنة الشركات، اختيار المقاعد، تأكيد التذكرة، ومشاهدة مسار الرحلة على الخريطة.
            </p>
            
            <p className="text-muted text-sm md:text-base leading-relaxed">
              تم تطوير هذا النموذج باستخدام HTML وCSS وJavaScript دون إطار عمل، ليكون مناسباً للتدريب والتوسع لاحقاً وربطه بواجهة API حقيقية.
            </p>

            <Button 
              variant="primary" 
              color="primary" 
              onClick={() => navigate('/booking')} // أو أي مسار تاني بتحبيه
              className="mt-4 flex items-center gap-2 px-6 py-3"
            >
              جرّب رحلة <FaArrowLeft />
            </Button>
          </div>

          {/* العمود الأيسر: الصورة */}
          <div className="w-full h-100 md:h-125 rounded-3xl overflow-hidden shadow-lg">
            <img 
              src={imgLatakia} 
              alt="الساحل السوري في اللاذقية" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

    </main>
  );
}

export default About;