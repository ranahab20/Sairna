import { useNavigate } from 'react-router-dom';
import { FaStar, FaSnowflake, FaWifi, FaUsb, FaArrowLeft } from 'react-icons/fa';

function CompanyCard({ company }) {
  const navigate = useNavigate();

  const companyStyles = {
    1: { char: 'ش', color: 'text-[#109d9c]', bg: 'bg-[#e7f9f6]', desc: 'رحلات منتظمة بين المحافظات وتجربة سفر مريحة.', features: ['مكيف', 'Wi-Fi', 'شحن USB'] },
    2: { char: 'ف', color: 'text-[#e69a46]', bg: 'bg-[#fff3df]', desc: 'أسطول حديث ومواعيد متنوعة على مدار الأسبوع.', features: ['مكيف', 'مقاعد واسعة'] },
    3: { char: 'ن', color: 'text-[#5085e6]', bg: 'bg-[#e9efff]', desc: 'رحلات يومية وخيارات مناسبة لكل المسافرين.', features: ['مكيف', 'Wi-Fi'] },
    4: { char: 'ا', color: 'text-[#9969ce]', bg: 'bg-[#f1eafe]', desc: 'ربط المدن السورية بمواعيد مرنة وسهلة الحجز.', features: ['مكيف', 'شحن USB'] },
  };

  const style = companyStyles[company.id] || { 
    char: company.name.charAt(0), color: 'text-primary', bg: 'bg-soft-teal', desc: 'شركة نقل متميزة تقدم خدمات حجز مريحة.', features: ['مكيف'] 
  };

  const handleShowTrips = () => {
    // 1. بنجيب بيانات البحث المحفوظة (من وين، لوين، التاريخ)
    const savedData = JSON.parse(localStorage.getItem('sairnaSearchData'));
    
    // 2. إذا المستخدم عنده بيانات محفوظة، بناخدها. وإذا لأ، بنحط قيم افتراضية
    const from = savedData?.from || 1; // 1 = دمشق
    const to = savedData?.to || 2; // 2 = حلب
    const date = savedData?.date || new Date().toISOString().split('T')[0]; // تاريخ اليوم

    // 3. بننقل المستخدم لصفحة الحجز مع كل البيانات + رقم الشركة
    navigate(`/booking?from=${from}&to=${to}&date=${date}&companyId=${company.id}`);
  };

  const renderFeatureIcon = (feature) => {
    if (feature.includes('مكيف')) return <FaSnowflake size={12} />;
    if (feature.includes('Wi-Fi')) return <FaWifi size={12} />;
    if (feature.includes('USB')) return <FaUsb size={12} />;
    return null;
  };

  return (
    <article className="bg-surface border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      
      {/* 1. القسم العلوي: الحرف والتقييم */}
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black ${style.bg} ${style.color}`}>
          {style.char}
        </div>
        
        <div className="flex items-center gap-1 text-[10px] font-bold text-muted border border-border px-2 py-1 rounded-full">
          <FaStar className="text-yellow-400" /> 5 / 4.9
        </div>
      </div>

      {/* 2. اسم الشركة والوصف */}
      <div className="mb-20 flex-1">
        <h3 className="text-lg font-bold text-text mb-3">{company.name}</h3>
        <p className="text-xs text-muted leading-relaxed">{style.desc}</p>
      </div>

      {/* 3. المميزات */}
      <div className="flex flex-wrap gap-2 mb-2">
        {style.features.map((feature, idx) => (
          <span key={idx} className="flex items-center gap-1 bg-surface-alt px-2 py-1 rounded-md text-[10px] font-bold text-muted">
            {renderFeatureIcon(feature)} {feature}
          </span>
        ))}
      </div>

      {/* 4. الإحصائيات */}
      <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 mb-5">
        <div className="flex flex-col items-center border-l border-border">
          <strong className="text-base font-black text-text">+12</strong>
          <span className="text-[10px] font-bold text-muted">وجهة تجريبية</span>
        </div>
        <div className="flex flex-col items-center">
          <strong className="text-base font-black text-text">يومياً</strong>
          <span className="text-[10px] font-bold text-muted">مواعيد متاحة</span>
        </div>
      </div>

      {/* 5. زر عرض الرحلات */}
      <button 
        onClick={handleShowTrips}
        className="w-full flex items-center justify-center gap-2 bg-surface-alt hover:bg-primary hover:text-white text-text border border-border py-2.5 rounded-xl font-bold text-sm transition-all"
      >
        عرض رحلات الشركة <FaArrowLeft />
      </button>

    </article>
  );
}

export default CompanyCard;