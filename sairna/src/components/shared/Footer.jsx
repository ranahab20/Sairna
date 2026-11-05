import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa';
import logo from '../../assets/download.svg'; 

function Footer() {
  const footerLinks = [
    {
      title: 'استكشف',
      links: [
        { name: 'الرئيسية', path: '/' },
        { name: 'احجز رحلتك', path: '/booking' },
        { name: 'شركات النقل', path: '/company' },
        { name: 'تتبّع رحلتك', path: '/follow' },
      ],
    },
    {
      title: 'حسابك',
      links: [
        { name: 'تسجيل الدخول', path: '/login' },
        { name: 'إنشاء حساب', path: '/register' },
        { name: 'حجوزاتي', path: '/myTravels' },
        { name: 'الملف الشخصي', path: '/account' },
      ],
    },
    {
      title: 'نحن هون لمساعدتك',
      links: [
        { name: 'عن سيرنا', path: '/about' },
        { name: 'مركز المساعدة', path: '/support' },
        { name: 'hello@sairna.example', path: 'mailto:hello@sairna.example' },
      ],
    },
  ];

  return (
    <footer className="bg-dark-deep  pt-14">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          
          <div className="flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="سيرنا" className="w-12 h-12" />
              <div className="flex flex-col">
                <strong className="text-white text-3xl font-black">سيرنا<span className="text-primary">.</span></strong>
                <small className="text-[#9ac4cd] text-[9px] font-bold mt-1">رحلتك بتبلّش من هون</small>
              </div>
            </Link>
            <p className="text-[12px] leading-relaxed text-[#9cb4c0] max-w-[290px]">
              طريقة أجمل وأسهل للسفر بين المحافظات السورية. ابحث، اختار، واحجز بكل راحة.
            </p>
            
            <div className="flex gap-2 mt-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-[10px] border border-[#335362] text-[#cce9e9] hover:bg-white/5 transition">
                <FaGlobe />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-[10px] border border-[#335362] text-[#cce9e9] hover:bg-white/5 transition">
                <FaEnvelope />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-[10px] border border-[#335362] text-[#cce9e9] hover:bg-white/5 transition">
                <FaPhoneAlt />
              </button>
            </div>
          </div>

          {footerLinks.map((col, index) => (
            <div key={index} className="flex flex-col items-start gap-3">
              <h4 className="text-white text-[13px] font-bold mb-2">{col.title}</h4>
              {col.links.map((link, i) => (
                link.path.startsWith('mailto') ? (
                  <a key={i} href={link.path} className="text-[11px] text-[#a3c0ca] hover:text-primary transition-colors flex items-center gap-2" dir="ltr">
                    <FaEnvelope className="text-[10px]" /> {link.name}
                  </a>
                ) : (
                  <Link key={i} to={link.path} className="text-[11px] text-[#a3c0ca] hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          ))}

        </div>

        {/* شريط الحقوق السفلي (الخيار الأول) */}
        <div className="border-t border-[#254451] py-5 text-[#8eabb7] text-[10px] leading-relaxed text-center">
          <p>
            مصادر الصور (Wikimedia Commons): 
            <a href="https://commons.wikimedia.org/wiki/File:Syria,_Damascus,_The_Umayyad_Mosque.jpg" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline mx-1">
              دمشق / الهيرو — Vyacheslav Argenberg (CC BY 4.0)
            </a> · 
            <a href="https://commons.wikimedia.org/wiki/File:Citadel_of_Aleppo,_Gates,_Aleppo,_Syria.jpg" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline mx-1">
              حلب — Vyacheslav Argenberg (CC BY 4.0)
            </a> · 
            <a href="https://commons.wikimedia.org/wiki/File:Beach_Latakia_1.jpg" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline mx-1">
              اللاذقية — Ahmad Ahmad (CC BY-SA 3.0)
            </a> · 
            <a href="https://commons.wikimedia.org/wiki/File:Homs_Khalid_Ibn_al-Walid_Mosque_3074.jpg" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline mx-1">
              حمص — Dosseman (CC BY-SA 4.0)
            </a>.
          </p>
          <p className="mt-2 text-[9px] opacity-80">
            تُحمّل الصور عند الاتصال بالإنترنت؛ تُعرض الروابط البديلة عند فشل المصدر الأول.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;