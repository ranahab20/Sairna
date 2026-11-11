import { useGetCompanies } from '../../../api/companies';
import { FaBus, FaStar } from 'react-icons/fa';

function CompanyPicker({ selectedCompany, onSelectCompany }) {
  const { data: companies, isLoading } = useGetCompanies();

  const companyStyles = {
    1: { char: 'ش', color: 'text-[#109d9c]', bg: 'bg-[#e7f9f6]' }, // الشام
    2: { char: 'ف', color: 'text-[#e69a46]', bg: 'bg-[#fff3df]' }, // الفرات
    3: { char: 'ن', color: 'text-[#5085e6]', bg: 'bg-[#e9efff]' }, // النورس
    4: { char: 'ا', color: 'text-[#9969ce]', bg: 'bg-[#f1eafe]' }, // الاتحاد
  };

  if (isLoading) return <div className="text-center py-4">جاري تحميل الشركات...</div>;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 flex items-center justify-center bg-soft-teal text-primary font-bold rounded-lg">01</span>
        <div>
          <h3 className="font-bold text-text">اختار شركة النقل</h3>
          <p className="text-xs text-muted">حدد الشركة اللي بتفضّلها، ومنعرضلك مواعيدها المتاحة.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        
        {/* زر "كل الشركات" */}
        <button
          onClick={() => onSelectCompany('all')}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
            selectedCompany?.toString() === 'all' // تم التعديل هون
              ? 'border-primary bg-soft-teal/30' 
              : 'border-border bg-surface hover:border-primary/50'
          }`}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white mb-2">
            <FaBus size={20} />
          </div>
          <span className="font-bold text-sm">كل الشركات</span>
          <span className="text-[10px] text-muted">قارن الخيارات</span>
        </button>

        {/* باقي الشركات */}
        {companies?.map((company, index) => {
          const style = companyStyles[company.id] || { char: company.name[0], color: 'text-primary', bg: 'bg-soft-teal' };
          
          return (
            <button
              key={company.id}
              onClick={() => onSelectCompany(company.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                selectedCompany?.toString() === company.id?.toString() // تم التعديل هون
                  ? 'border-primary bg-soft-teal/30' 
                  : 'border-border bg-surface hover:border-primary/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg mb-2 ${style.bg} ${style.color}`}>
                {style.char}
              </div>
              <span className="font-bold text-sm text-center mb-1 leading-tight">{company.name}</span>
              
              <span className="flex items-center gap-1 text-[10px] text-muted font-bold">
                <FaStar className="text-yellow-500" /> {(4.9 - index * 0.1).toFixed(1)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CompanyPicker;