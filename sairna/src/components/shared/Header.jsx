import { LuCircleDot } from "react-icons/lu";
import { IoIosAddCircle, IoIosStarOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
import logo from "../../assets/download.svg";
import { useState } from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
function Header() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;

      document.documentElement.classList.toggle("dark", newTheme);

      return newTheme;
    });
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
        className="grid grid-cols-[auto_1fr_auto] items-center px-[30px] py-[20px] bg-white shadow-sm"
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
        <nav className="flex gap-[15px] justify-center items-center">
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
            {isDark ? <FaRegSun  /> : <FaRegMoon />}
          </Button>
          <a href="#"><strong>دخول</strong></a>
          <Button
            type="button"
            variant="primary"
            color="secondary"
            radius="rounded-xl"
            onClick={() => console.log("Login clicked")}
          >
            تسجيل الدخول
          </Button>
        </div>
      </header>
    </>
  );
}

export default Header;
