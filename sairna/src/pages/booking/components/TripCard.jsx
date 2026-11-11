import { useNavigate } from 'react-router-dom';
import { FaBus, FaSnowflake, FaWifi, FaUsb, FaArrowLeft, FaChair } from 'react-icons/fa';

function TripCard({ trip,passengerCount=1 }) {
  
  const navigate = useNavigate();

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('ar-SY', { 
      hour: '2-digit', minute: '2-digit', hour12: false 
    });
  };

  const calculateDuration = (start, end) => {
    const durationMs = new Date(end) - new Date(start);
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} س ${minutes} د`;
  };

  const formatPrice = (price) => price.toLocaleString('en-US') + ' ل.س';

  return (
    <article className="bg-surface border border-border rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
      
    
      <div className="flex justify-between items-center pb-3 border-b border-border border-dashed">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-soft-teal text-primary font-bold flex items-center justify-center rounded-xl text-lg md:text-xl">
            {trip.company.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-text text-base md:text-lg">{trip.company.name}</h3>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold text-muted border border-border px-2 md:px-3 py-1 md:py-1.5 rounded-full">
          <FaBus size={12} /> حافلة سياحية
        </div>
      </div>

    
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        
        <div className="flex justify-between items-center w-full md:w-auto flex-1">
          <div className="flex flex-col items-start">
            <span className="text-xl md:text-2xl font-black text-text">{formatTime(trip.departureAt)}</span>
            <span className="text-xs md:text-sm font-bold text-muted mt-1">{trip.origin.name}</span>
          </div>

          <div className="flex flex-col items-center flex-1 px-4 max-w-[150px]">
            <span className="text-[10px] font-bold text-muted mb-1">{calculateDuration(trip.departureAt, trip.arrivalAt)}</span>
            <div className="w-full flex items-center gap-2 text-primary">
              <div className="h-[1px] bg-border border-t border-dashed flex-1"></div>
              <FaBus size={14} />
              <div className="h-[1px] bg-border border-t border-dashed flex-1"></div>
            </div>
            <span className="text-[10px] font-bold text-primary mt-1">مباشرة</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xl md:text-2xl font-black text-text">{formatTime(trip.arrivalAt)}</span>
            <span className="text-xs md:text-sm font-bold text-muted mt-1">{trip.destination.name}</span>
          </div>
        </div>

        
        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 md:border-r border-border pt-4 md:pt-0 md:pr-6 w-full md:w-auto">
          <div className="flex flex-col items-end">
            <span className="text-[10px] md:text-[11px] text-muted">السعر للشخص</span>
            <span className="text-lg md:text-xl font-black text-text">{formatPrice(trip.price)}</span>
            <span className="text-[10px] md:text-[11px] font-bold text-primary flex items-center gap-1 mt-1">
              <FaChair /> {trip.availableSeats} مقعد متاح
            </span>
          </div>

          <button 
            onClick={() => navigate(`/selectSeat/${trip.id}`)}
            className="bg-primary hover:bg-primary-deep text-white px-4 md:px-5 py-2 md:py-3 rounded-xl font-bold flex items-center gap-2 transition-colors whitespace-nowrap text-sm md:text-base"
          >
            اختيار المقاعد <FaArrowLeft />
          </button>
        </div>

      </div>

      
      <div className="flex justify-between items-center text-[10px] md:text-[11px] font-bold text-muted mt-2 pt-3 border-t border-dashed  border-border">
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