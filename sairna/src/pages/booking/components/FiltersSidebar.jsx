import { FaFilter, FaShieldAlt } from 'react-icons/fa';
import { useGetCompanies } from '../../../api/companies';

function FiltersSidebar({ 
  selectedCompany, 
  setSelectedCompany, 
  selectedTime, 
  setSelectedTime, 
  trips 
}) {
  const { data: allCompanies, isLoading } = useGetCompanies();

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

  if (isLoading) return <div className="text-center py-4 text-sm">جاري التحميل...</div>;

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      
      <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
        <h3 className="font-bold flex items-center gap-2">
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

      <div className="mb-6">
        <h4 className="font-bold text-sm mb-3">شركة النقل</h4>
        <div className="flex flex-col gap-3">
          
          {/* كل الشركات */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="radio" 
              name="company" 
              value="all"
              checked={selectedCompany?.toString() === 'all'}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="appearance-none w-4 h-4 rounded-full border-2 border-border cursor-pointer checked:bg-primary checked:border-primary transition-all"
            />
            <span className="text-sm flex-1 text-text">كل الشركات</span>
            <span className="text-xs text-muted bg-surface-alt px-2 py-0.5 rounded-md">{trips?.length || 0}</span>
          </label>

          {/* باقي الشركات - هنا السر في toString() */}
          {allCompanies?.map((company) => (
            <label key={company.id} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="company" 
                value={company.id}
                checked={selectedCompany?.toString() === company.id?.toString()}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="appearance-none w-4 h-4 rounded-full border-2 border-border cursor-pointer checked:bg-primary checked:border-primary transition-all"
              />
              <span className="text-sm flex-1 text-text">{company.name}</span>
              <span className="text-xs text-muted bg-surface-alt px-2 py-0.5 rounded-md">
                {companyCounts[company.id] || 0}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-sm mb-3">وقت الانطلاق</h4>
        <div className="flex flex-col gap-3">
          {timeOptions.map((time) => (
            <label key={time.id} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="time" 
                value={time.id}
                checked={selectedTime === time.id}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="appearance-none w-4 h-4 rounded-full border-2 border-border cursor-pointer checked:bg-primary checked:border-primary transition-all"
              />
              <span className="text-sm text-text">{time.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="bg-soft-teal/50 border border-soft-teal rounded-lg p-3 flex items-start gap-2">
        <FaShieldAlt className="text-primary mt-0.5 shrink-0" />
        <div>
          <h5 className="text-xs font-bold text-primary-deep">الحجز بشكل واضح</h5>
          <p className="text-[10px] text-muted mt-1">كل تفاصيل الرحلة قدامك قبل التأكيد.</p>
        </div>
      </div>

    </div>
  );
}

export default FiltersSidebar;