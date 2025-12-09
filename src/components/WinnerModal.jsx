import React from 'react';

const WinnerModal = ({ winner, onClaim }) => {
  if (!winner) return null;

  const isZonk = winner.type === 'ZONK';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
       {/* Overlay */}
       <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
       
       {/* Modal Card */}
       <div className="relative w-full max-w-sm bg-[#FEFCF5] rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-bounce-in flex flex-col my-8">
          
          {/* Header Section with Icon */}
          <div className={`relative h-40 flex items-center justify-center ${
              isZonk ? 'bg-[#424242]' : 'bg-[#606652]'
            }`}>
             {/* Decorative Circles */}
             <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
             
             {/* Icon Container */}
             <div className={`relative z-10 p-4 rounded-full border-4 ${
                 isZonk ? 'bg-[#212121] border-[#616161]' : 'bg-[#98A381] border-[#8F9779]'
               } shadow-lg`}>
                {React.createElement(winner.icon, { size: 48, color: 'white' })}
             </div>
          </div>

          {/* Body Section */}
          <div className="px-8 py-8 text-center">
            {isZonk ? (
                <div className="mb-6">
                    <h2 className="text-3xl font-black text-[#424242] mb-2">ZONK!</h2>
                    <p className="text-[#757575]">Kurang beruntung nih, coba lagi ya!</p>
                </div>
            ) : (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#556B2F] tracking-widest uppercase mb-1">Selamat!</h2>
                    <div className="h-1 w-12 bg-[#8F9779] mx-auto mb-4 rounded-full"></div>
                    <p className="text-sm text-[#98A381] mb-2">Kamu mendapatkan:</p>
                    <div className="text-3xl font-black text-[#6f785b] leading-tight">
                        {winner.label}
                    </div>
                </div>
            )}
            
            <button 
                onClick={onClaim}
                className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 cursor-pointer ${
                  isZonk 
                    ? 'bg-[#424242] hover:bg-[#616161]' 
                    : 'bg-[#606652] hover:bg-[#434739]'
                }`}
            >
                {isZonk ? 'Tutup' : 'Ambil Hadiah'}
            </button>
          </div>
       </div>
    </div>
  );
};

export default WinnerModal;
