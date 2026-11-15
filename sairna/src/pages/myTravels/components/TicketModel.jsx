import { useState } from 'react';
import { FaTimes, FaTicketAlt, FaBus, FaCopy, FaCheckCircle } from 'react-icons/fa';

function TicketModal({ booking, onClose }) {
  const [isCopied, setIsCopied] = useState(false);

  if (!booking) return null;

  const { trip } = booking;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ar-SY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(booking.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      
      {/* رسالة التوست (بتظهر بس لما ننسخ) */}
      <div className={`fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 transition-all duration-300 ${isCopied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <FaCheckCircle /> تم نسخ رقم الحجز بنجاح!
      </div>

      <div className="bg-surface rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="bg-gradient-to-l from-[#0b756e] to-[#0e4653] p-6 text-white relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 left-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <FaTimes />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <FaTicketAlt size={24} className="text-[#c7f6e8]" />
            <h2 className="text-xl font-bold">تذكرتك مع سيرنا</h2>
          </div>
          <p className="text-sm text-[#d4edeb]">SAIRNA</p>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-muted">رقم الحجز</span>
            <span className="font-black text-lg text-text" dir="ltr">{booking.code}</span>
          </div>

          <div className="flex justify-between items-center bg-surface-alt p-4 rounded-xl mb-6">
            <div className="text-center">
              <p className="text-xl font-black text-text">{trip.origin.name}</p>
            </div>
            <div className="flex flex-col items-center text-primary">
              <FaBus size={20} />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-text">{trip.destination.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-b border-border border-dashed py-4 mb-6">
            <div>
              <p className="text-xs text-muted mb-1">شركة النقل</p>
              <p className="font-bold text-sm text-text">{trip.company.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">التاريخ</p>
              <p className="font-bold text-sm text-text">{formatDate(trip.departureAt)}</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">الموعد</p>
              <p className="font-bold text-sm text-text">{formatTime(trip.departureAt)}</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">الإجمالي</p>
              <p className="font-bold text-sm text-primary">{booking.totalPrice.toLocaleString()} ل.س</p>
            </div>
          </div>

          <p className="text-center text-xs text-muted mb-6">
            تذكرة توضيحية — غير صالحة للسفر أو الدفع.
          </p>

          <button 
            onClick={copyToClipboard}
            className={`w-full flex items-center justify-center gap-2 border py-3 rounded-xl font-bold text-sm transition-all ${
              isCopied ? 'border-green-500 text-green-600 bg-green-50' : 'border-border hover:bg-surface-alt text-text'
            }`}
          >
            {isCopied ? <><FaCheckCircle /> تم النسخ</> : <><FaCopy /> نسخ رقم الحجز</>}
          </button>

        </div>
      </div>
    </div>
  );
}

export default TicketModal;