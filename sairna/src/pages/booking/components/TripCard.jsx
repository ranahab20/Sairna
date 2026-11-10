import { useNavigate } from 'react-router-dom';
import { FaBus, FaStar, FaSnowflake, FaWifi, FaUsb, FaArrowLeft, FaChair } from 'react-icons/fa';

function TripCard({ trip }) {
  const navigate = useNavigate();

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('ar-SY', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const calculateDuration = (start, end) => {
    const durationMs = new Date(end) - new Date(start);
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} س ${minutes} د`;
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-US') + ' ل.س';
  };

  const handleSelectSeats = () => {
    navigate(`/selectSeat/${trip.id}`); 
  };

  return (
    <article className="bg-surface border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pb-6 border-b border-border border-dashed">
        
      
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-soft-teal text-primary font-bold flex items-center justify-center rounded-xl text-xl">
            {trip.company.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-text text-lg">{trip.company.name}</h3>
            {/* <span className="flex items-center gap-1 text-[11px] text-muted font-bold mt-1">
              <FaStar className="text-yellow-400" /> 4.9 · الأعلى تقييماً
            </span> */}
          </div>
        </div>

        
        <div className="flex justify-between items-center w-full">
          
          <div className="flex flex-col items-start">
            <span className="text-2xl font-black text-text">{formatTime(trip.departureAt)}</span>
            <span className="text-sm font-bold text-muted mt-1">{trip.origin.name}</span>
          </div>

          
          <div className="flex flex-col items-center flex-1 px-4">
            <span className="text-[10px] font-bold text-muted mb-1">{calculateDuration(trip.departureAt, trip.arrivalAt)}</span>
            <div className="w-full flex items-center gap-2 text-primary">
              <div className="h-[1px] bg-border border-t border-dashed flex-1"></div>
              <FaBus size={14} />
              <div className="h-[1px] bg-border border-t border-dashed flex-1"></div>
            </div>
            <span className="text-[10px] font-bold text-primary mt-1">مباشرة</span>
          </div>

          
          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-text">{formatTime(trip.arrivalAt)}</span>
            <span className="text-sm font-bold text-muted mt-1">{trip.destination.name}</span>
          </div>
        </div>

        
        <div className="flex items-center justify-end gap-5 border-r-0 md:border-r md:border-border pr-0 md:pr-6">
          <div className="flex flex-col items-end">
            <span className="text-[11px] text-muted">السعر للشخص</span>
            <span className="text-xl font-black text-text">{formatPrice(trip.price)}</span>
            <span className="text-[11px] font-bold text-primary flex items-center gap-1 mt-1">
              <FaChair /> {trip.availableSeats} مقعد متاح
            </span>
          </div>

          <button 
            onClick={handleSelectSeats}
            className="bg-primary hover:bg-primary-deep text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            اختيار المقاعد <FaArrowLeft />
          </button>
        </div>

      </div>

    
      <div className="mt-4 flex justify-between items-center text-[10px] font-bold text-muted">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-surface-alt px-2 py-1 rounded-md"><FaSnowflake /> مكيّف</span>
          <span className="flex items-center gap-1 bg-surface-alt px-2 py-1 rounded-md"><FaWifi /> Wi-Fi</span>
          <span className="flex items-center gap-1 bg-surface-alt px-2 py-1 rounded-md"><FaUsb /> شحن USB</span>
        </div>
        <span>~366 كم</span>
      </div>

    </article>
  );
}

export default TripCard;