import React from 'react';
import { FaStar } from 'react-icons/fa';
import SearchForm from '../../../components/shared/SearchForm';

function SearchBox() {
  return (
    <div className="container mx-auto px-4 relative z-20 -mt-10"> 
      
      
      <div className="bg-surface rounded-[21px] shadow-[0_21px_58px_rgba(11,71,72,0.1)] border border-border p-6">
        
        
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_0_5px_var(--color-soft-teal)]"></span>
            <strong className="text-text text-[15px]">وين رحلتك الجاية؟</strong>
            <span className="text-[11px] text-muted hidden md:inline">اختار وجهتك وباقي التفاصيل علينا</span>
          </div>
          <div className="flex items-center gap-1 text-primary-deep font-bold text-[10px]">
            <FaStar /> الحجز بـ 3 خطوات
          </div>
        </div>

        
        <SearchForm />
        
      </div>
    </div>
  );
}

export default SearchBox;