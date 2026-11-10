import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-xs font-bold text-muted mb-6">
      <Link to="/" className="hover:text-primary transition-colors">
        الرئيسية
      </Link> 

      <FaChevronLeft className="text-[10px]" />
      
      <span className="text-text">نتائج البحث</span>
    </div>
  );
}

export default Breadcrumb;