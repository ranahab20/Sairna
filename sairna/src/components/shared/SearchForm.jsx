import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaExchangeAlt, FaCalendarAlt, FaUsers, FaSearch } from 'react-icons/fa';
import Button from './Button'; 
function SearchForm() {
  const navigate = useNavigate();

  
  const [searchData, setSearchData] = useState({
    from: 'حلب',
    to: 'دمشق',
    date: '',
    passengers: '1'
  })
  
  
  useEffect(() => {
    const saved = localStorage.getItem('sairnaSearchData');
    const selectedDest = localStorage.getItem('selectedDestination');

    if (saved) {
      let data = JSON.parse(saved);
      // إذا في مدينة مختارة من الكروت، بنحطها
      if (selectedDest) {
        data.to = selectedDest;
    
      }
      setSearchData(data);
    }
  }, []);

  const cities = ['دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس', 'إدلب', 'دير الزور', 'الرقة', 'الحسكة', 'درعا', 'السويداء', 'القنيطرة', 'ريف دمشق'];

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
    navigate(`/booking?${params.toString()}`); 
    localStorage.removeItem('selectedDestination');
  };

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.12fr_34px_1.12fr_1fr_0.74fr_1.14fr] gap-3 items-end w-full">
      
    
      <label className="relative flex items-center gap-2 h-15 pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 start-3 text-[10px] text-muted font-bold">من وين؟</span>
        <FaMapMarkerAlt className="text-primary mt-3" />
        <select name="from" value={searchData.from} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer">
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </label>

      
      <button type="button" onClick={handleSwap} className="hidden lg:grid place-items-center w-[34px] h-[38px] mb-[11px] rounded-[10px] bg-soft-teal text-primary-deep hover:rotate-180 transition-transform duration-300">
        <FaExchangeAlt />
      </button>

    
      <label className="relative flex items-center gap-2 h-15 pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 start-3 text-[10px] text-muted font-bold">لوين؟</span>
        <FaMapMarkerAlt className="text-primary mt-3" />
        <select name="to" value={searchData.to} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer">
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </label>

    
      <label className="relative flex items-center gap-2 h-15 pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 start-3 text-[10px] text-muted font-bold">تاريخ الرحلة</span>
        <FaCalendarAlt className="text-primary mt-3" />
        <input type="date" name="date" value={searchData.date} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer" />
      </label>

    
      <label className="relative flex items-center gap-2 h-15 pt-3 pb-1 px-3 border border-border bg-surface rounded-[11px] focus-within:border-primary transition-all">
        <span className="absolute top-2 start-3 text-[10px] text-muted font-bold">المسافرين</span>
        <FaUsers className="text-primary mt-3" />
        <select name="passengers" value={searchData.passengers} onChange={handleChange} className="w-full h-8 mt-3 bg-transparent text-[11px] font-black outline-none cursor-pointer">
          <option value="1">1 مسافر</option>
          <option value="2">2 مسافرين</option>
          <option value="3">3 مسافرين</option>
          <option value="4">4 مسافرين</option>
        </select>
      </label>

      
      <Button 
        type="submit" 
        variant="primary" 
        color="primary"
        radius="rounded-[11px]"
        className="w-full h-[60px] !p-0 flex items-center justify-center gap-2 text-[12px] font-bold shadow-md hover:-translate-y-1"
      >
        <FaSearch /> ابحث عن رحلات
      </Button>

    </form>
  );
}

export default SearchForm;