import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CustomInput from "../../components/shared/CustomInput";
import Button from "../../components/shared/Button";
import { setToken, setUser } from "../../utiles/token-storage";
import { useRegister } from "../../hooks/use-auth";
import { FaUser, FaEnvelope, FaLock, FaShieldAlt, FaTicketAlt, FaStar } from "react-icons/fa";
import imgDamascus from "../../assets/image.jpg";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { mutate: register, isPending, isError, error } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    register(form, {
      onSuccess: (data) => {
        setToken(data.accessToken);
        setUser(data.user);
        navigate("/account"); 
      },
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-bg-main py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-surface rounded-3xl shadow-xl border border-border overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
       
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          
          <div className="text-center mb-8">
            <span className="inline-block bg-soft-teal text-primary font-bold text-xs px-3 py-1 rounded-full mb-4">
              ✦ انضم لعيلة سيرنا
            </span>
            <h1 className="text-3xl font-black text-text mb-2">خلّينا نبدأ المشوار سوا.</h1>
            <p className="text-sm text-muted">حساب بسيط، ورحلاتك كلها بين إيديك.</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            
            <CustomInput
              label="الاسم الكامل"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="اسمك الكامل"
              required
              icon={<FaUser />}
            />

            <CustomInput
              label="البريد الإلكتروني"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              dir="ltr"
              autoComplete="off"
              icon={<FaEnvelope />}
            />

            <CustomInput
              label="كلمة المرور"
              name="password"
              type="password" 
              value={form.password}
              onChange={handleChange}
              placeholder="6 أحرف على الأقل"
              required
              dir="ltr"
              autoComplete="new-password"
              icon={<FaLock />}
            />

            <label className="flex items-center gap-2 text-xs text-muted font-bold mt-2">
              <input type="checkbox" required className="accent-primary" /> 
              <span>أوافق على استخدام بيانات تجريبية في هذا النموذج التعليمي.</span>
            </label>

            {isError && (
              <p className="text-sm text-red-500 font-bold bg-red-50 p-2 rounded-md border border-red-200 text-center">
                {error.response?.data?.message === 'EMAIL_TAKEN' 
                  ? 'هذا البريد الإلكتروني مسجل مسبقاً.' 
                  : 'حدث خطأ، يرجى المحاولة لاحقاً.'}
              </p>
            )}

            <Button 
              type="submit" 
              variant="primary"
              color="primary"
              radius="rounded-xl"
              className="w-full mt-2 py-3"
              disabled={isPending}
            >
              {isPending ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            عندك حساب من قبل؟ <Link to="/login" className="text-primary font-bold hover:underline">سجّل دخولك</Link>
          </p>
        </div>

        {/* القسم الأيسر: الصورة والخلفية */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#123e51] to-[#1b7176] p-12 relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              <FaStar className="text-yellow-300" /> عالم جديد بانتظارك
            </span>
            <h2 className="text-4xl font-black text-white leading-tight mb-2">
              كل الطرق <br /> بتوصّل لذكريات.
            </h2>
            <p className="text-[#d7f0eb] text-sm">ومن أول محطة رح نكون معك.</p>
          </div>
          <div className="relative z-10 mt-10 transform -rotate-2">
            <img src={imgDamascus} alt="الجامع الأموي" className="w-full rounded-2xl shadow-2xl object-cover h-[300px]" />
          </div>
          <div className="relative z-10 flex items-center gap-6 mt-10 text-white text-xs font-bold">
            <span className="flex items-center gap-1"><FaShieldAlt className="text-xl" /> سهل وواضح</span>
            <span className="flex items-center gap-1"><FaTicketAlt className="text-xl" /> حجز بخطوات بسيطة</span>
          </div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border border-white/10 rounded-full"></div>
        </div>

      </div>
    </main>
  );
}

export default Register;