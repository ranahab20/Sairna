import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../components/shared/SectionHeading';
import Button from '../../../components/shared/Button';
import { FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';
import { useGetCities } from '../../../api/cities'; 

import imgDamascus from '../../../assets/image.jpg';
import imgAleppo from '../../../assets/aleppo.jpg';
import imgLattakia from '../../../assets/latakia.jpg';
import imgHoms from '../../../assets/homs.jpg';

function Explore() {
  const navigate = useNavigate();
  const { data: cities, isLoading } = useGetCities();

  
  const [error, setError] = useState('');

  const cityImages = {
    1: imgDamascus,
    2: imgAleppo,
    3: imgHoms,
    5: imgLattakia,
  };

  const displayedCities = cities?.filter(city => cityImages[city.id]).slice(0, 4);

  const handleCardClick = (cityId) => {
    const savedData = JSON.parse(localStorage.getItem('sairnaSearchData'));
    const currentFrom = savedData ? savedData.from : 1; 

  
    if (currentFrom.toString() === cityId.toString()) {
    
      setError("عذراً، نقطة الانطلاق والوجهة هما نفس المدينة. يرجى اختيار وجهة مختلفة.");
      
      
      setTimeout(() => setError(''), 4000); 
      return; 
    }

    localStorage.setItem('selectedDestination', cityId);
    navigate(`/booking?to=${cityId}`); 
  };

  if (isLoading) return <div className="text-center py-10">جاري تحميل الوجهات...</div>;

  return (
    <section className="py-16 container mx-auto px-4">
      
      
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all">
          <FaExclamationCircle className="text-xl" />
          <span className="font-bold text-sm">{error}</span>
        </div>
      )}

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
          className="flex items-center gap-2 font-bold text-sm border-none! bg-transparent! px-0! hover:text-primary-deep transition-colors"
        >
          استكشف الرحلات <FaArrowLeft />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedCities?.map((city) => (
          <div 
            key={city.id}
            onClick={() => handleCardClick(city.id)}
            className="relative h-87.5 rounded-[20px] overflow-hidden cursor-pointer group shadow-md hover:-translate-y-2 transition-all duration-300"
          >
            <img 
              src={cityImages[city.id]} 
              alt={city.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                <p className="text-xs opacity-80">اكتشف جمال المدينة</p> 
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