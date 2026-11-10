import { LuCircleDot, LuMenu, LuX } from "react-icons/lu";
import {
  
  IoIosArrowBack,
  IoIosStarOutline,
} from "react-icons/io";
import { NavLink } from "react-router-dom";
import logo from "../../assets/download.svg";
import { useState } from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isToggled, setToggle] = useState(false);
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

  return (
    <>
      <div className="flex justify-center align-middle gap-[9px] min-h-[32px] font-[10px] bg-dark-deep text-[#d4f2ec] p-[5px] ">
        <span>
          <LuCircleDot color="#58d7bb" />
        </span>
        رحلات بين المدن السورية، بخطوات بسيطة وواضحة
        <span>
          <IoIosStarOutline color="#ffce87" />
        </span>
      </div>

      <header
        className="relative grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-center px-4 md:px-[50px]  bg-white shadow-sm border border-b-[#e4ecef]"
        dir="rtl"
      >
        {/* RIGHT: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#0aa99b] rounded-2xl flex items-center justify-center shadow-md">
            <img
              src={logo}
              alt="سيرنا"
              className="w-full h-full object-contain"
            />
          </div>

          <a href="/" className="no-underline">
            <SectionHeading
              titleTag="h1"
              size="md"
              title="سيرنا"
              highlight="."
              subtitle="رحلتك بتبلش من هون"
              className="gap-[0px]"
            />
          </a>
        </div>

        {/* MIDDLE: Navigation */}
        <nav className="hidden md:flex gap-[15px] justify-center items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-text border-b-2 border-b-primary font-bold"
                : "text-muted font-bold"
            }
          >
            الرئيسية
          </NavLink>

          <NavLink
            to="/booking"
            className={({ isActive }) =>
              isActive
                ? "text-text border-b-2 border-b-primary font-bold"
                : "text-muted font-bold"
            }
          >
            احجز رحلة
          </NavLink>

          <NavLink
            to="/company"
            className={({ isActive }) =>
              isActive
                ? "text-text border-b-2 border-b-primary font-bold"
                : "text-muted font-bold"
            }
          >
            شركات النقل
          </NavLink>

          <NavLink
            to="/myTravels"
            className={({ isActive }) =>
              isActive
                ? "text-text border-b-2 border-b-primary font-bold"
                : "text-muted font-bold"
            }
          >
            حجوزاتي
          </NavLink>

          <NavLink
            to="/follow"
            className={({ isActive }) =>
              isActive
                ? "text-text border-b-2 border-b-primary font-bold"
                : "text-muted font-bold"
            }
          >
            تتبع الرحلة
          </NavLink>
        </nav>

        {/* LEFT: Buttons */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            color="secondary"
            radius="rounded-[17px]"
            className="w-10 h-10 !p-0 flex items-center justify-center"
            onClick={toggleTheme}
          >
            {isDark ? <FaRegSun /> : <FaRegMoon />}
          </Button>
          <a href="#" className="hidden md:flex">
            <strong>دخول</strong>
          </a>
          <Button
            type="button"
            variant="primary"
            color="secondary"
            radius="rounded-xl"
            onClick={() => console.log("Login clicked")}
            className="hidden md:flex hover:-translate-y-1"
          >
            تسجيل الدخول
          </Button>
          {/* Mobile Menu Button */}
          <Button
            type="button"
            variant="outline"
            color="secondary"
            radius="rounded-[17px]"
            onClick={handleToggle}
            className="md:hidden w-10 h-10 !p-0 flex items-center justify-center"
          >
            {isToggled ? <LuX size={24} /> : <LuMenu size={24} />}
          </Button>
        </div>
        {/* Mobile Menu Panel */}
        {isToggled && (
          <div className="absolute top-full right-0 left-0 z-50 bg-white shadow-lg p-4 md:hidden">
            <nav className="flex flex-col">
              <NavLink
                to="/"
                onClick={handleToggle}
                className="flex items-center justify-between w-full border-b border-[#e4ecef] font-bold py-3 text-text"
              >
                الرئيسية
                <IoIosArrowBack size={18} />
              </NavLink>

              <NavLink
                to="/booking"
                onClick={handleToggle}
                className="flex items-center justify-between w-full border-b border-[#e4ecef] font-bold py-3 text-text"
              >
                احجز رحلة
                <IoIosArrowBack size={18} />
              </NavLink>

              <NavLink
                to="/company"
                onClick={handleToggle}
                className="flex items-center justify-between w-full border-b border-[#e4ecef] font-bold py-3 text-text"
              >
                شركات النقل
                <IoIosArrowBack size={18} />
              </NavLink>

              <NavLink
                to="/myTravels"
                onClick={handleToggle}
                className="flex items-center justify-between w-full border-b border-[#e4ecef] font-bold py-3 text-text"
              >
                حجوزاتي
                <IoIosArrowBack size={18} />
              </NavLink>

              <NavLink
                to="/follow"
                onClick={handleToggle}
                className="flex items-center justify-between w-full border-b border-[#e4ecef] font-bold py-3 text-text"
              >
                تتبع الرحلة
                <IoIosArrowBack size={18} />
              </NavLink>

              <NavLink
                to="/login"
                onClick={handleToggle}
                className="flex items-center justify-between w-full border-b border-[#e4ecef] font-bold py-3 text-text"
              >
                تسجيل الدخول
                <IoIosArrowBack size={18} />
              </NavLink>

              <NavLink
                to="/register"
                onClick={handleToggle}
                className="flex items-center justify-between w-full font-bold py-3 text-text"
              >
                إنشاء حساب
                <IoIosArrowBack size={18} />
              </NavLink>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
