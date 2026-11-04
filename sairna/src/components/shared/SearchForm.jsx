import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaExchangeAlt, FaCalendarAlt, FaUsers, FaSearch } from 'react-icons/fa';

function SearchForm() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: 'حلب',
    to: 'دمشق',
    date: '',
    passengers: '1'
  });

  const cities = ['دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس', 'إدلب', 'دير الزور', 'الرقة', 'الحسكة', 'درعا', 'السويداء', 'القنيطرة', 'ريف دمشق'];

  const handleSwap = () => {
    setSearchData((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchData);
    navigate(`/results?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.12fr_34px_1.12fr_1fr_0.74fr_1.14fr] gap-3 items-end w-full">
      
      {/* حقل من وين */}
      <label className="relative flex items-center gap-2 h-15 pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 inset-s-3 text-[10px] text-muted font-bold">من وين؟</span>
        <FaMapMarkerAlt className="text-primary mt-3" />
        <select name="from" value={searchData.from} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer">
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </label>

      {/* زر التبديل */}
      <button type="button" onClick={handleSwap} className="hidden lg:grid place-items-center w-8.5 h-9.5 mb-3 rounded-[10px] bg-soft-teal text-primary-deep hover:rotate-180 transition-transform duration-300">
        <FaExchangeAlt />
      </button>

      {/* حقل لوين */}
      <label className="relative flex items-center gap-2 h-15 pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 inset-s-3 text-[10px] text-muted font-bold">لوين؟</span>
        <FaMapMarkerAlt className="text-primary mt-3" />
        <select name="to" value={searchData.to} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer">
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </label>

      {/* حقل التاريخ */}
      <label className="relative flex items-center gap-2 h-15 pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 inset-s-3 text-[10px] text-muted font-bold">تاريخ الرحلة</span>
        <FaCalendarAlt className="text-primary mt-3" />
        <input type="date" name="date" value={searchData.date} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer" />
      </label>

      {/* حقل المسافرين */}
      <label className="relative flex items-center gap-2 h-15 pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 inset-s-3 text-[10px] text-muted font-bold">المسافرين</span>
        <FaUsers className="text-primary mt-3" />
        <select name="passengers" value={searchData.passengers} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer">
          <option value="1">1 مسافر</option>
          <option value="2">2 مسافرين</option>
          <option value="3">3 مسافرين</option>
          <option value="4">4 مسافرين</option>
        </select>
      </label>
      {/* زر البحث */}
      <button type="submit" className="w-full h-15 flex items-center justify-center gap-2 bg-primary text-white text-[12px] font-bold rounded-[11px] hover:bg-primary-deep hover:-translate-y-1 transition-all shadow-[0_9px_20px_rgba(8,165,151,0.19)]">
        <FaSearch /> ابحث عن رحلات
      </button>
    </form>
  );
}

export default SearchForm;