import React from 'react';
import WheelSlice from './WheelSlice';

const SpinWheel = ({ items, rotation }) => {
  return (
    <div className="relative w-full max-w-[350px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[700px] aspect-square flex items-center justify-center">
      {/* Pointer/Jarum - di atas mengarah ke bawah */}
      <div className="absolute top-[-20px] md:top-[-25px] left-1/2 -translate-x-1/2 z-20">
         <svg 
           width="50" 
           height="60" 
           viewBox="0 0 50 60" 
           style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}
         >
            {/* Bentuk jarum yang mengarah ke bawah */}
            <polygon points="25,55 5,10 45,10" fill="#606652" />
            <polygon points="25,48 12,15 38,15" fill="#98A381" />
            {/* Lingkaran di atas */}
            <circle cx="25" cy="10" r="10" fill="#606652" />
            <circle cx="25" cy="10" r="6" fill="#98A381" />
         </svg>
      </div>

      {/* Roda Luar (Border) dengan gradient */}
      <div className="w-full h-full rounded-full p-2 md:p-2 shadow-2xl"
           style={{ 
             background: 'linear-gradient(145deg, #A1937C, #99815D)',
             boxShadow: '0 15px 50px rgba(62, 39, 35, 0.6), inset 0 2px 4px rgba(255,255,255,0.1)'
           }}>
        {/* Container Putar */}
        <div 
          className="w-full h-full relative rounded-full overflow-hidden"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 5000ms cubic-bezier(0.25, 0.1, 0.25, 1)'
          }}
        >
          {items.length > 0 ? (
            <svg viewBox="-1.02 -1.02 2.04 2.04" className="w-full h-full" style={{ background: '#99815D' }}>
              {/* Background circle untuk menghilangkan transparansi */}
              <circle cx="0" cy="0" r="1.02" fill="#99815D" />
              {items.map((item, index) => (
                <WheelSlice 
                  key={item.id} 
                  index={index} 
                  total={items.length} 
                  {...item}
                />
              ))}
            </svg>
          ) : (
            <div className="w-full h-full rounded-full bg-[#99815D] flex items-center justify-center text-white">
              <span className="font-bold text-lg">HABIS!</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Center Hub dengan design lebih bagus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full z-10 flex items-center justify-center"
           style={{
             background: 'linear-gradient(145deg, #ECE9D9, #ECE9D9)',
             border: '4px solid #8C7654'
           }}>
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full"
             style={{
               background: 'linear-gradient(145deg, #99815D, #8C7654)',
               boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)'
             }}></div>
      </div>
    </div>
  );
};

export default SpinWheel;
