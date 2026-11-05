import React from 'react';

function Stats() {
  const statsData = [
    { id: 1, number: "14", label: "محافظة سورية" },
    { id: 2, number: "4", label: "شركات نقل تجريبية" },
    { id: 3, number: "+30", label: "خيار رحلة باليوم" },
    { id: 4, number: "24/7", label: "سهولة الوصول للموقع" }
  ];

  return (
    <div className="bg-surface border-y border-border mt-16 w-full">
      
      <div className="container mx-auto px-4">
        
        
        <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-around gap-y-8 py-10">
          
          {statsData.map((stat, index) => (
            <React.Fragment key={stat.id}>
              
              <div className="flex flex-col items-center justify-center text-center gap-1">
                <strong className="text-2xl md:text-[27px] font-black text-text leading-tight">
                  {stat.number}
                </strong>
                <span className="text-[11px] font-bold text-muted">
                  {stat.label}
                </span>
              </div>

            
              {index < statsData.length - 1 && (
                <span className="hidden md:block w-px h-10 bg-border-main"></span>
              )}

            </React.Fragment>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Stats;