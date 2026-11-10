import { FaFilter, FaShieldAlt } from 'react-icons/fa';
import { useGetCompanies } from '../../../api/companies';

function FiltersSidebar({ 
  selectedCompany, 
  setSelectedCompany, 
  selectedTime, 
  setSelectedTime, 
  trips 
}) {
  const { data: allCompanies, isLoading: isLoadingCompanies } = useGetCompanies();

  // حساب عدد الرحلات لكل شركة
  const companyCounts = {};
  if (trips) {
    trips.forEach(trip => {
      companyCounts[trip.company.id] = (companyCounts[trip.company.id] || 0) + 1;
    });
  }

  const timeOptions = [
    { id: 'all', label: 'كل الأوقات' },
    { id: 'morning', label: 'صباحاً (قبل 12)' },
    { id: 'afternoon', label: 'ظهراً (12-17)' },
    { id: 'evening', label: 'مساءً (بعد 17)' },
  ];

  if (isLoadingCompanies) return <div className="text-center py-4 text-sm">جاري التحميل...</div>;

  return (
    <div className="bg-surface border border-border rounded-xl p-5 sticky top-24">
      
      {/* رأس الشريط الجانبي */}
      <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
        <h3 className="font-bold text-text flex items-center gap-2">
          <FaFilter className="text-primary" /> تصفية النتائج
        </h3>
        <button 
          onClick={() => {
            setSelectedCompany('all');
            setSelectedTime('all');
          }}
          className="text-primary text-xs font-bold hover:underline"
        >
          إعادة ضبط
        </button>
      </div>

      {/* فلترة الشركات */}
      <div className="mb-6">
        <h4 className="font-bold text-sm text-text mb-3">شركة النقل</h4>
        <div className="flex flex-col gap-3">
          
          {/* خيار كل الشركات */}
          <div className="flex items-center gap-3 group">
            <input 
              type="radio" 
              id="company-all"
              name="company" 
              value="all"
              checked={selectedCompany === 'all'}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="hidden"
            />
            <label htmlFor="company-all" className="flex items-center gap-3 cursor-pointer flex-1">
              <div 
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                style={{ 
                  borderColor: selectedCompany === 'all' ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: selectedCompany === 'all' ? 'var(--color-primary)' : 'transparent'
                }}
              >
                {selectedCompany === 'all' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
              </div>
              <span className="text-sm text-text flex-1 group-hover:text-primary transition-colors">كل الشركات</span>
            </label>
            <span className="text-xs text-muted bg-surface-alt px-2 py-0.5 rounded-md">{trips?.length || 0}</span>
          </div>

          {/* باقي الشركات */}
          {allCompanies?.map((company) => (
            <div key={company.id} className="flex items-center gap-3 group">
              <input 
                type="radio" 
                id={`company-${company.id}`}
                name="company" 
                value={company.id}
                checked={selectedCompany === company.id}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="hidden"
              />
              <label htmlFor={`company-${company.id}`} className="flex items-center gap-3 cursor-pointer flex-1">
                <div 
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                  style={{ 
                    borderColor: selectedCompany === company.id ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: selectedCompany === company.id ? 'var(--color-primary)' : 'transparent'
                  }}
                >
                  {selectedCompany === company.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </div>
                <span className="text-sm text-text flex-1 group-hover:text-primary transition-colors">{company.name}</span>
              </label>
              <span className="text-xs text-muted bg-surface-alt px-2 py-0.5 rounded-md">
                {companyCounts[company.id] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* فلترة وقت الانطلاق */}
      <div className="mb-6">
        <h4 className="font-bold text-sm text-text mb-3">وقت الانطلاق</h4>
        <div className="flex flex-col gap-3">
          {timeOptions.map((time) => (
            <div key={time.id} className="flex items-center gap-3 group">
              <input 
                type="radio" 
                id={`time-${time.id}`}
                name="time" 
                value={time.id}
                checked={selectedTime === time.id}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="hidden"
              />
              <label htmlFor={`time-${time.id}`} className="flex items-center gap-3 cursor-pointer flex-1">
                <div 
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                  style={{ 
                    borderColor: selectedTime === time.id ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: selectedTime === time.id ? 'var(--color-primary)' : 'transparent'
                  }}
                >
                  {selectedTime === time.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </div>
                <span className="text-sm text-text group-hover:text-primary transition-colors">{time.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* صندوق توضيحي */}
      <div className="bg-soft-teal/50 border border-soft-teal rounded-lg p-3 flex items-start gap-2">
        <FaShieldAlt className="text-primary mt-0.5 shrink-0" />
        <div>
          <h5 className="text-xs font-bold text-primary-deep">الحجز بشكل واضح</h5>
          <p className="text-[10px] text-muted mt-1 leading-relaxed">كل تفاصيل الرحلة قدامك قبل التأكيد.</p>
        </div>
      </div>

    </div>
  );
}

export default FiltersSidebar;