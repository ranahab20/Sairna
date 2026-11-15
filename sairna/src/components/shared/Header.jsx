import { LuCircleDot, LuMenu, LuX } from "react-icons/lu";
import {
  IoIosArrowBack,
  IoIosStarOutline,
} from "react-icons/io";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/download.svg";
import { useState, useEffect } from "react";
import { FaRegMoon, FaRegSun, FaUser } from "react-icons/fa";
import Button from "./Button";
import { getUser, logout } from "../../utiles/token-storage";

function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isToggled, setToggle] = useState(false);
  const [user, setUser] = useState(getUser());
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(getUser());
    setToggle(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      document.documentElement.classList.toggle("dark", newTheme);
      return newTheme;
    });
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); 
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {/* الشريط العلوي */}
      <div className="flex justify-center items-center gap-[9px] min-h-[32px] text-[10px] bg-dark-deep text-[#d4f2ec] px-2 py-1">
        <span><LuCircleDot color="#58d7bb" /></span>
        <span className="text-center">رحلات بين المدن السورية، بخطوات بسيطة وواضحة</span>
        <span><IoIosStarOutline color="#ffce87" /></span>
      </div>

      <header className="relative bg-surface shadow-sm border-b border-border transition-colors w-full">
        {/* الكونتينر */}
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-center h-[73px]" dir="rtl">
          
          {/* RIGHT: Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-2xl flex items-center justify-center shadow-md shrink-0">
              <img src={logo} alt="سيرنا" className="w-full h-full object-contain" />
            </Link>

            {/* النص المباشر بدل SectionHeading */}
            <Link to="/" className="flex flex-col justify-center no-underline">
              <span className="text-2xl font-black text-text leading-none">
                سيرنا<span className="text-primary">.</span>
              </span>
              <span className="text-[9px] font-bold text-muted mt-1 leading-none">
                رحلتك بتبلش من هون
              </span>
            </Link>
          </div>

          {/* MIDDLE: Navigation */}
          <nav className="hidden md:flex gap-4 lg:gap-6 justify-center items-center">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-text border-b-2 border-b-primary font-bold text-[13px] pb-1" : "text-muted font-bold text-[13px] hover:text-text transition-colors pb-1"}>
              الرئيسية
            </NavLink>
            <NavLink to="/booking" className={({ isActive }) => isActive ? "text-text border-b-2 border-b-primary font-bold text-[13px] pb-1" : "text-muted font-bold text-[13px] hover:text-text transition-colors pb-1"}>
              احجز رحلة
            </NavLink>
            <NavLink to="/company" className={({ isActive }) => isActive ? "text-text border-b-2 border-b-primary font-bold text-[13px] pb-1" : "text-muted font-bold text-[13px] hover:text-text transition-colors pb-1"}>
              شركات النقل
            </NavLink>
            <NavLink to="/myTravels" className={({ isActive }) => isActive ? "text-text border-b-2 border-b-primary font-bold text-[13px] pb-1" : "text-muted font-bold text-[13px] hover:text-text transition-colors pb-1"}>
              حجوزاتي
            </NavLink>
            <NavLink to="/follow" className={({ isActive }) => isActive ? "text-text border-b-2 border-b-primary font-bold text-[13px] pb-1" : "text-muted font-bold text-[13px] hover:text-text transition-colors pb-1"}>
              تتبع الرحلة
            </NavLink>
          </nav>

          {/* LEFT: Buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              type="button"
              variant="outline"
              color="secondary"
              radius="rounded-[17px]"
              className="w-9 h-9 md:w-10 md:h-10 !p-0 flex items-center justify-center"
              onClick={toggleTheme}
            >
              {isDark ? <FaRegSun /> : <FaRegMoon />}
            </Button>

            {user ? (
              <Link to="/account" className="hidden md:flex items-center gap-2 hover:bg-surface-alt p-1.5 pr-3 rounded-full transition-colors border border-border">
                <span className="w-7 h-7 bg-soft-teal text-primary rounded-full flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0).toLowerCase()}
                </span>
                <span className="text-[13px] font-bold text-text max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden md:flex">
                  <strong className="text-[13px] hover:text-primary transition-colors text-text">دخول</strong>
                </Link>
                <Link to="/register" className="hidden md:flex">
                  <Button
                    type="button"
                    variant="primary" 
                    color="primary" 
                    radius="rounded-xl"
                    className="!text-[13px] !py-2 !px-4 hover:-translate-y-1"
                  >
                    إنشاء حساب
                  </Button>
                </Link>
              </>
            )}

            <Button
              type="button"
              variant="outline"
              color="secondary"
              radius="rounded-[17px]"
              onClick={handleToggle}
              className="md:hidden w-9 h-9 !p-0 flex items-center justify-center"
            >
              {isToggled ? <LuX size={20} /> : <LuMenu size={20} />}
            </Button>
          </div>
        </div>
        
        
        {isToggled && (
          <div className="absolute top-full right-0 left-0 z-50 bg-surface shadow-lg p-4 md:hidden border-b border-border">
            <nav className="flex flex-col">
              <NavLink to="/" className="flex items-center justify-between w-full border-b border-border font-bold py-3 text-sm text-text">
                الرئيسية <IoIosArrowBack size={18} />
              </NavLink>
              <NavLink to="/booking" className="flex items-center justify-between w-full border-b border-border font-bold py-3 text-sm text-text">
                احجز رحلة <IoIosArrowBack size={18} />
              </NavLink>
              <NavLink to="/company" className="flex items-center justify-between w-full border-b border-border font-bold py-3 text-sm text-text">
                شركات النقل <IoIosArrowBack size={18} />
              </NavLink>
              <NavLink to="/myTravels" className="flex items-center justify-between w-full border-b border-border font-bold py-3 text-sm text-text">
                حجوزاتي <IoIosArrowBack size={18} />
              </NavLink>
              <NavLink to="/follow" className="flex items-center justify-between w-full border-b border-border font-bold py-3 text-sm text-text">
                تتبع الرحلة <IoIosArrowBack size={18} />
              </NavLink>

              {user ? (
                <>
                  <NavLink to="/account" className="flex items-center justify-between w-full border-b border-border font-bold py-3 text-sm text-text">
                    الملف الشخصي <FaUser />
                  </NavLink>
                  <button onClick={handleLogout} className="flex items-center justify-between w-full font-bold py-3 text-sm text-red-500">
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="flex items-center justify-between w-full border-b border-border font-bold py-3 text-sm text-text">
                    تسجيل الدخول <IoIosArrowBack size={18} />
                  </NavLink>
                  <NavLink to="/register" className="flex items-center justify-between w-full font-bold py-3 text-sm text-text">
                    إنشاء حساب <IoIosArrowBack size={18} />
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;