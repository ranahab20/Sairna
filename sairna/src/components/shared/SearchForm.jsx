import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // ضيفنا useSearchParams
import { FaMapMarkerAlt, FaExchangeAlt, FaCalendarAlt, FaUsers, FaSearch } from 'react-icons/fa';
import Button from '../shared/Button'; 
import { useGetCities } from '../../api/cities'; 

function SearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // عشان نقرأ من الرابط

  const { data: cities, isLoading } = useGetCities();

  const [searchData, setSearchData] = useState({
    from: '', 
    to: '',
    date: '',
    passengers: '1'
  });

  useEffect(() => {
    // 1. بنشوف إذا في وجهة جاية بالرابط (لما يضغط على كرت)
    const destFromUrl = searchParams.get('to');
    
    // 2. بنجيب البيانات المحفوظة
    const saved = localStorage.getItem('sairnaSearchData');
    const selectedDest = localStorage.getItem('selectedDestination');

    if (saved) {
      let data = JSON.parse(saved);
      
      // إذا في وجهة بالرابط، هي اللي بتغلب
      if (destFromUrl) {
        data.to = destFromUrl;
        localStorage.setItem('sairnaSearchData', JSON.stringify(data));
        localStorage.removeItem('selectedDestination');
      } 
      // إذا ما في بالرابط، بنشوف الـ LocalStorage
      else if (selectedDest) {
        data.to = selectedDest;
        localStorage.removeItem('selectedDestination'); 
        localStorage.setItem('sairnaSearchData', JSON.stringify(data));
      }
      
      setSearchData(data);
    } 
    // إذا ما في ولا شي محفوظ، بنحط أول مدينتين من الـ API
    else if (cities && cities.length > 0) {
      const initialData = {
        from: destFromUrl ? cities[0].id : cities[0].id, // ممكن نعدلها بعدين
        to: destFromUrl || (cities[1] ? cities[1].id : cities[0].id),
        date: '',
        passengers: '1'
      };
      setSearchData(initialData);
      localStorage.setItem('sairnaSearchData', JSON.stringify(initialData));
    }
  }, [cities, searchParams]); // ضيفنا searchParams عشان يشتغل لما الرابط يتغير

  const updateDataAndSave = (newData) => {
    setSearchData(newData);
    localStorage.setItem('sairnaSearchData', JSON.stringify(newData));
  };

  const handleSwap = () => {
    updateDataAndSave({ ...searchData, from: searchData.to, to: searchData.from });
  };

  const handleChange = (e) => {
    updateDataAndSave({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchData);
    // بننقل لصفحة الحجز بنفس الطريقة
    navigate(`/booking?${params.toString()}`); 
  };

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.12fr_34px_1.12fr_1fr_0.74fr_1.14fr] gap-3 items-end w-full">
      
      {/* حقل من وين */}
      <label className="relative flex items-center gap-2 h-[60px] pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 start-3 text-[10px] text-muted font-bold">من وين؟</span>
        <FaMapMarkerAlt className="text-primary mt-3" />
        <select name="from" value={searchData.from} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer">
          {isLoading ? (
            <option>جاري التحميل...</option>
          ) : (
            cities?.map((city) => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))
          )}
        </select>
      </label>

      {/* زر التبديل */}
      <button type="button" onClick={handleSwap} className="hidden lg:grid place-items-center w-[34px] h-[38px] mb-[11px] rounded-[10px] bg-soft-teal text-primary-deep hover:rotate-180 transition-transform duration-300">
        <FaExchangeAlt />
      </button>

      {/* حقل لوين */}
      <label className="relative flex items-center gap-2 h-[60px] pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 start-3 text-[10px] text-muted font-bold">لوين؟</span>
        <FaMapMarkerAlt className="text-primary mt-3" />
        <select name="to" value={searchData.to} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer">
          {isLoading ? (
            <option>جاري التحميل...</option>
          ) : (
            cities?.map((city) => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))
          )}
        </select>
      </label>

      {/* حقل التاريخ */}
      <label className="relative flex items-center gap-2 h-[60px] pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 start-3 text-[10px] text-muted font-bold">تاريخ الرحلة</span>
        <FaCalendarAlt className="text-primary mt-3" />
        <input type="date" name="date" value={searchData.date} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer" />
      </label>

      {/* حقل المسافرين */}
      <label className="relative flex items-center gap-2 h-[60px] pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 start-3 text-[10px] text-muted font-bold">المسافرين</span>
        <FaUsers className="text-primary mt-3" />
        <select name="passengers" value={searchData.passengers} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer">
          <option value="1">1 مسافر</option>
          <option value="2">2 مسافرين</option>
          <option value="3">3 مسافرين</option>
          <option value="4">4 مسافرين</option>
        </select>
      </label>

      {/* زر البحث */}
      <Button 
        type="submit" 
        variant="primary" 
        color="primary"
        radius="rounded-[11px]"
        className="w-full h-[60px] !p-0 flex items-center justify-center gap-2 text-[12px] font-bold shadow-[0_9px_20px_rgba(8,165,151,0.19)] hover:-translate-y-1"
      >
        <FaSearch /> ابحث عن رحلات
      </Button>

    </form>
  );
}

export default SearchForm;