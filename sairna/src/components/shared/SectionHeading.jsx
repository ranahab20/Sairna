function SectionHeading({ 
  titleTag: TitleTag = "h2",
  title, 
  highlight, 
  eyebrow, 
  subtitle, 
  align = "right", 
  size = "md", // أضفنا الحجم الافتراضي (md)
  eyebrowClass = "bg-soft-teal text-primary-deep", 
  isDark = false, 
  className = "" 
}) {

  // 1. مصفوفة الأحجام
  const sizeStyles = {
    lg: "text-5xl md:text-6xl lg:text-[75px] leading-[1.3]", // ضخم للـ Hero
    md: "text-3xl md:text-4xl leading-[1.4]",                // عادي للأقسام
    sm: "text-lg md:text-xl leading-[1.5]",                  // صغير للكروت
  };

  // 2. مصفوفة المحاذاة (معدلة عشان الـ RTL)
  const alignStyles = {
    right: "items-start text-right",
    center: "items-center text-center",
  };

  const titleColor = isDark ? "text-white" : "text-text";
  const subtitleColor = isDark ? "text-[#d4edeb]" : "text-muted";

  return (
    <div className={`flex flex-col gap-3 w-full ${alignStyles[align]} ${className}`}>
      
      {eyebrow && (
        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-black ${eyebrowClass}`}>
          {eyebrow}
        </span>
      )}

      {title && (
        <TitleTag className={`font-extrabold tracking-tight ${sizeStyles[size]} ${titleColor}`}>
          {title} {highlight && <span className="text-primary">{highlight}</span>}
        </TitleTag>
      )}

      {subtitle && (
        <p className={`text-sm md:text-base leading-relaxed max-w-xl w-full ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
      
    </div>
  );
}

export default SectionHeading;