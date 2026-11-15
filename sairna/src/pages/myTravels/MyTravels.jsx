import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyBookings } from '../../api/my-bookings';
import { getUser } from '../../utiles/token-storage';
import SectionHeading from '../../components/shared/SectionHeading';
import Button from '../../components/shared/Button';
import TravelCard from './components/TravelCard';
import TicketModal from './components/TicketModel';
import { FaPlus } from 'react-icons/fa';

function MyTravels() {
  const navigate = useNavigate();
  const { data: bookings, isLoading, isError } = useGetMyBookings();
  const user = getUser();

  // حالة للتحكم بفتح وإغلاق نافذة التذكرة
  const [selectedBooking, setSelectedBooking] = useState(null);

  // إذا المستخدم مش مسجل دخول
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">يرجى تسجيل الدخول أولاً</h2>
        <Button onClick={() => navigate('/login')} variant="primary" color="primary">
          تسجيل الدخول
        </Button>
      </div>
    );
  }

  if (isLoading) return <div className="text-center py-20 text-muted">جاري تحميل حجوزاتك...</div>;
  if (isError) return <div className="text-center py-20 text-red-500">حدث خطأ في جلب الحجوزات</div>;

  return (
    <main className="bg-bg-main min-h-screen pb-16">
      <div className="container mx-auto px-4 pt-12">
        
        {/* العنوان */}
        <div className="mb-10">
          <SectionHeading 
            eyebrow="كل رحلاتك بمكان واحد"
            title="تذاكرك"
            highlight="دايماً معك."
            subtitle="راقب حجوزاتك، وارجع لتفاصيل الرحلة وقت ما تحتاج."
            align="right"
          />
        </div>

        {/* شريط علوي (عدد الرحلات + زر حجز جديد) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-bold text-text mb-1">رحلاتي القادمة</h2>
            <p className="text-sm text-muted">
              {bookings?.length > 0 ? `لديك ${bookings.length} حجوزات محفوظة` : 'ما في حجوزات محفوظة حالياً'}
            </p>
          </div>
          <Button 
            onClick={() => navigate('/booking')} 
            variant="primary" 
            color="primary"
            className="flex items-center gap-2"
          >
            <FaPlus /> حجز جديد
          </Button>
        </div>

        {/* قائمة الحجوزات */}
        {bookings?.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl bg-surface/50">
            <h3 className="text-xl font-bold text-text mb-2">ما في حجوزات حالياً</h3>
            <p className="text-muted mb-6">ابدأ رحلتك الأولى واحجز مقعدك هلق.</p>
            <Button onClick={() => navigate('/booking')} variant="primary" color="primary">
              تصفح الرحلات
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {bookings.map((booking) => (
              <TravelCard 
                key={booking.id} 
                booking={booking} 
                onShowTicket={setSelectedBooking} 
              />
            ))}
          </div>
        )}

      </div>

      {/* نافذة التذكرة (بتظهر بس لما نختار حجز) */}
      {selectedBooking && (
        <TicketModal 
          booking={selectedBooking} 
          onClose={() => setSelectedBooking(null)} 
        />
      )}
    </main>
  );
}

export default MyTravels;