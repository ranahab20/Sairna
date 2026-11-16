import { FaTicketAlt, FaChair, FaWallet, FaCheckCircle, FaBus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function TravelCard({ booking, onShowTicket }) {
  const { trip } = booking;
  const navigate = useNavigate();

  // دالة تنسيق التاريخ (مثلاً: 2026-11-17T06:00:00.000Z -> الثلاثاء، 17 تشرين الثاني)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ar-SY', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  // دالة تنسيق الوقت (مثلاً: 06:00)
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' });
  };

  // وظيفة زر التتبع
  const handleTrackTrip = () => {
       navigate(`/follow?tripId=${trip.id}`);
  };

  return (
    <article className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
      
      {/* 1. الرأس (كود الحجز + الحالة) */}
      <div className="bg-surface-alt px-5 py-3 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-2 text-text font-bold text-sm">
          <FaTicketAlt className="text-primary" />
          <span>رقم الحجز: <span dir="ltr">{booking.code}</span></span>
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${booking.status === 'CONFIRMED' ? 'text-primary' : 'text-red-500'}`}>
          {booking.status === 'CONFIRMED' ? <><FaCheckCircle /> تم تأكيد الحجز</> : 'ملغى'}
        </div>
      </div>

      {/* 2. جسم الكرت (المسار والتفاصيل) */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 items-center">
        
        {/* الانطلاق */}
        <div className="flex flex-col items-start">
          <span className="text-[10px] text-muted mb-1">من</span>
          <h3 className="text-xl font-black text-text mb-1">{trip.origin.name}</h3>
          <span className="text-lg font-bold text-text" dir="ltr">{formatTime(trip.departureAt)}</span>
        </div>

        {/* خط المنتصف (الرحلة) */}
        <div className="flex flex-col items-center justify-center relative w-full px-4">
          <span className="text-[10px] text-muted mb-1">{formatDate(trip.departureAt)}</span>
          <div className="w-full flex items-center justify-center gap-2 text-primary mb-1">
            <div className="h-[1px] bg-border border-t border-dashed flex-1"></div>
            <FaBus size={16} />
            <div className="h-[1px] bg-border border-t border-dashed flex-1"></div>
          </div>
          <span className="text-[10px] text-primary font-bold">مباشرة</span>
        </div>

        {/* الوصول */}
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-muted mb-1">إلى</span>
          <h3 className="text-xl font-black text-text mb-1">{trip.destination.name}</h3>
          <span className="text-lg font-bold text-text" dir="ltr">{formatTime(trip.arrivalAt)}</span>
        </div>

        {/* الشركة والمقعد والسعر */}
        <div className="flex flex-col gap-3 border-t md:border-t-0 md:border-r border-border pt-4 md:pt-0 md:pr-6 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-soft-teal text-primary rounded-md flex items-center justify-center text-[10px] font-bold">
              {trip.company.name.charAt(0)}
            </div>
            <span className="text-sm font-bold text-text">{trip.company.name}</span>
          </div>
          <span className="flex items-center gap-2 text-xs text-muted font-bold">
            <FaChair /> المقعد: {booking.seats ? booking.seats.map(s => s.seatNumber).join('، ') : '1'}
          </span>
          <span className="flex items-center gap-2 text-sm font-black text-text mt-1">
            <FaWallet className="text-muted" /> {booking.totalPrice.toLocaleString()} <span className="text-[10px] font-normal text-muted">ل.س</span>
          </span>
        </div>

      </div>

      {/* 3. التذييل (الأزرار) */}
      {/* استخدمنا justify-start عشان الأزرار تروح لليمين بالـ RTL */}
      <div className="px-5 py-4 border-t border-border flex justify-start gap-3 bg-surface">
        <button 
          onClick={handleTrackTrip}
           disabled={booking.status !== 'CONFIRMED'}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-bold text-text hover:bg-surface-alt transition-colors"
        >
          تتبع الرحلة <FaBus />
        </button>
        <button 
          onClick={() => onShowTicket(booking)}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-bold text-text bg-surface-alt transition-colors"
        >
          عرض التذكرة <FaTicketAlt />
        </button>
      </div>

    </article>
  );
}

export default TravelCard;