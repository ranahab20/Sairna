import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../utiles/token-storage'; 
import Button from '../../components/shared/Button';
import { FaUser, FaTicketAlt, FaSignOutAlt, FaHandPaper } from 'react-icons/fa';
import {useGetMyBookings} from "../../hooks/use-bookings";

function Account() {
    const { data: bookings, isLoading} = useGetMyBookings(); 
  const navigate = useNavigate();
  const user = getUser(); 

  
  if (!user) {
    return (
      <main className="bg-bg-main  flex items-center justify-center py-30 px-4">
        <div className="bg-surface p-10 rounded-3xl shadow-lg  border-border text-center max-w-5xl w-full">
          <div className="w-20 h-20 bg-soft-teal text-primary rounded-full flex items-center justify-center mx-auto mb-2">
            <FaUser size={40} />
          </div>
          <h1 className="text-xl font-black text-text mb-5">أهلاً فيك!</h1>
          <p className="text-muted text-sm mb-4">سجّل دخول لحتى تشوف معلومات حسابك.</p>
          <Button 
            variant="primary" 
            color="primary" 
            radius="rounded-xl" 
            className=""
            onClick={() => navigate('/login')}
          >
            تسجيل الدخول
          </Button>
        </div>
      </main>
    );
  }

  
  const handleLogout = () => {
    logout(); 
    navigate('/'); 
    window.location.reload(); 
  };

  return (
    <main className="bg-bg-main min-h-screen pb-16 ">
      <div className="container mx-auto px-4 pt-12">
        
        {/* العنوان */}
        <div className="mb-10 text-right">
          <span className="inline-flex items-center gap-2 bg-soft-teal text-primary font-bold text-xs px-4 py-1.5 rounded-full mb-4">
            ✦ ملفك الشخصي
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-text flex items-center gap-3">
            أهلاً {user.name} <FaHandPaper className="text-primary rotate-12" />
          </h1>
          <p className="text-muted text-sm mt-2">هون كل التفاصيل المتعلقة بحسابك التجريبي.</p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col items-center text-center h-fit">
            <div className="w-24 h-24 bg-soft-teal text-primary rounded-3xl flex items-center justify-center text-4xl font-black mb-4">
              {user.name.charAt(0).toLowerCase()}
            </div>
            
            <h2 className="text-xl font-bold text-text mb-1">{user.name}</h2>
            <span className="text-muted text-sm mb-6" dir="ltr">{user.email}</span>

           

            <div className="w-full bg-surface-alt rounded-xl p-3 flex items-center justify-center gap-2 text-sm font-bold text-text mb-6">
               <FaTicketAlt className="text-primary" /> 
                {isLoading ? 'جاري التحميل...' : `${bookings?.length || 0} حجوزات محفوظة`}
            </div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 border border-border text-text py-3 rounded-xl font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
            >
              <FaSignOutAlt /> تسجيل الخروج
            </button>
          </div>
<div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-text mb-6">معلومات الحساب</h2>
            
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-muted text-sm">الاسم الكامل</span>
                <strong className="text-text">{user.name}</strong>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-muted text-sm">البريد الإلكتروني</span>
                <strong className="text-text" dir="ltr">{user.email}</strong>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-muted text-sm">نوع الحساب</span>
                <strong className="text-text">حساب تجريبي</strong>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button 
                variant="primary" 
                color="primary" 
                radius="rounded-xl" 
                className="px-6 py-2.5 flex items-center gap-2"
                onClick={() => navigate('/myTravels')}
              >
                انتقل لحجوزاتي
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Account;