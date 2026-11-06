function StepCard({ icon, title, paragraph, number, className }) {
  return (
    <>
      <div
        className={`border border-[#fff] rounded-3xl relative transition duration-300 p-[30px] bg-white group shadow-md hover:-translate-y-2 transition-all duration-300`}
      >
        <div className={`w-[60px] h-[60px] mb-5 rounded-2xl ${className}`}>
          {icon}
        </div>
        <span className="absolute top-3.5 left-6 text-[50px] font-[900] text-surface-alt">
          {number}
        </span>
        <h3 className="mb-2 text-[18px] font-extrabold">{title}</h3>
        <p className="text-[#718493] text-[12px]">{paragraph}</p>
      </div>
    </>
  );
}

export default StepCard;
