import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../components/shared/SectionHeading';
import Button from '../../../components/shared/Button';
import { FaArrowLeft } from 'react-icons/fa';
import imgDamascus from '../../../assets/image.jpg';
import imgAleppo from '../../../assets/aleppo.jpg';
import imgLattakia from '../../../assets/latakia.jpg';
import imgHoms from '../../../assets/homs.jpg';

function Explore() {
  const navigate = useNavigate();

  const destinationsData = [
    { id: 'دمشق', name: 'دمشق', desc: 'مدينة الياسمين', image: imgDamascus },
    { id: 'حلب', name: 'حلب', desc: 'عاصمة الشهباء', image: imgAleppo },
    { id: 'اللاذقية', name: 'اللاذقية', desc: 'نسمة من البحر', image: imgLattakia },
    { id: 'حمص', name: 'حمص', desc: 'قلب سوريا', image: imgHoms }
  ];

  
  const handleCardClick = (cityName) => {
    localStorage.setItem('selectedDestination', cityName);
    navigate('/booking');
  };

  return (
    <section className="py-16 container mx-auto px-4">
      
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <SectionHeading 
          title="على وين حابب"
          highlight="تسافر؟"
          subtitle="وجهات مختلفة، ونفس الشعور الحلو لما تكون بالطريق."
          eyebrow="اكتشف سوريا"
          align="right"
        />
        
        <Button 
          variant="outline" 
          color="primary" 
          onClick={() => navigate('/booking')}
          className="flex items-center gap-2 font-bold text-sm border-none! bg-transparent! px-0 hover:text-primary-deep transition-colors"
        >
          استكشف الرحلات <FaArrowLeft />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinationsData.map((dest) => (
          <div 
            key={dest.id}
            onClick={() => handleCardClick(dest.name)}
            className="relative h-88 rounded-[20px] overflow-hidden cursor-pointer group shadow-md hover:-translate-y-2 transition-all duration-300"
          >
           
            <img 
              src={dest.image} 
              alt={dest.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

            
            <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                <p className="text-xs opacity-80">{dest.desc}</p>
              </div>
              
            
              <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white bg-white/10 group-hover:bg-primary group-hover:border-primary group-hover:-translate-x-1 transition-all duration-300">
                <FaArrowLeft />
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}

export default Explore;