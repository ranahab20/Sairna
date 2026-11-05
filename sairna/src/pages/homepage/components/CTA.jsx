import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../components/shared/SectionHeading';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-16">
      
    
      <div className="relative overflow-hidden bg-linear-to-l from-primary-deep to-dark rounded-3xl px-8 py-12 md:px-16 md:py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        
        <div className="absolute -top-36 left-1/4 w-60 h-60 border border-white/10 rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-90 right-1/3 w-md h-112 border border-white/10 rounded-full pointer-events-none"></div>

        
        <div className="relative z-10">
          <SectionHeading 
            isDark={true}
            eyebrow={
              <>
                <FaStar className="text-yellow-200" /> جاهز تغير جو؟
              </>
            }
            eyebrowClass="bg-white/10 text-emerald-100"
            title="الطريق الجاي بيناديك."
            subtitle="دوّر على رحلة، واحجز أول مقعد إلك."
            align="right"
            size="md"
          />
        </div>

        
        <div className="relative z-10 shrink-0">
          <button 
            onClick={() => navigate('/results')}
            className="flex items-center gap-2 bg-white text-dark px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 hover:-translate-y-1 transition-all"
          >
            يلا نلاقي رحلة <FaArrowLeft />
          </button>
        </div>

      </div>
    </section>
  );
}

export default CTA;