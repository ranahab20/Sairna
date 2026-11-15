import { FaBus, FaChair, FaWallet, FaTicketAlt, FaMapMarkerAlt } from 'react-icons/fa';

function TravelCard({ booking, onShowTicket }) {
  const { trip } = booking;
  
  // دالة تنسيق التاريخ (مثلاً: 2026-11-17T06:00:00.000Z -> 17 نوفمبر)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ar-SY', { day: 'numeric', month: 'long' });
  };

  // دالة تنسيق الوقت (مثلاً: 06:00)
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <article className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      
      {/* رأس الكرت: كود الحجز والحالة */}
      <div className="bg-surface-alt border-b border-border p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaTicketAlt className="text-primary" />
          <span className="text-sm font-bold text-text">رقم الحجز: <span dir="ltr">{booking.code}</span></span>
        </div>
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {booking.status === 'CONFIRMED' ? 'تم تأكيد الحجز' : 'ملغى'}
        </span>
      </div>

      {/* تفاصيل الرحلة */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* المسار */}
        <div className="flex items-center justify-between md:justify-start gap-4">
          <div className="text-center">
            <p className="text-xl font-black text-text">{formatTime(trip.departureAt)}</p>
            <p className="text-sm font-bold text-muted mt-1">{trip.origin.name}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-muted mb-1">{formatDate(trip.departureAt)}</span>
            <FaBus className="text-primary text-xl" />
            <span className="text-[10px] text-primary mt-1">مباشرة</span>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-text">{formatTime(trip.arrivalAt)}</p>
            <p className="text-sm font-bold text-muted mt-1">{trip.destination.name}</p>
          </div>
        </div>

        {/* معلومات إضافية (الشركة والمقعد) */}
        <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-r border-border pt-4 md:pt-0 md:pr-6">
          <div className="flex items-center gap-2 text-sm text-text">
            <div className="w-6 h-6 bg-soft-teal text-primary rounded-md flex items-center justify-center text-xs font-bold">
              {trip.company.name.charAt(0)}
            </div>
            <span className="font-bold">{trip.company.name}</span>
          </div>
          <span className="flex items-center gap-2 text-xs text-muted">
            <FaChair /> المقاعد: {booking.seats ? booking.seats.map(s => s.seatNumber).join('، ') : 'غير محدد'}
          </span>
        </div>

        {/* السعر والزر */}
        <div className="flex flex-col md:flex-row items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-border pt-4 md:pt-0">
          <span className="font-black text-lg text-text">
            {booking.totalPrice.toLocaleString()} <span className="text-xs text-muted font-normal">ل.س</span>
          </span>
          <button 
            onClick={() => onShowTicket(booking)}
            className="bg-surface-alt hover:bg-primary hover:text-white text-text border border-border px-4 py-2 rounded-xl font-bold text-sm transition-all"
          >
            عرض التذكرة
          </button>
        </div>

      </div>
    </article>
  );
}

export default TravelCard;