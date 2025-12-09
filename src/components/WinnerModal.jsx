import React from 'react';

const WinnerModal = ({ winner, onClaim }) => {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
       {/* Overlay */}
       <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
       
       <div className="relative w-full max-w-sm rounded-3xl p-6 md:p-8 text-center animate-bounce-in"
            style={{
              background: 'linear-gradient(145deg, #FFFDE7, #FFF8E1)',
              boxShadow: winner.type === 'ZONK' 
                ? '0 0 50px rgba(0,0,0,0.3)' 
                : '0 0 50px rgba(255,193,7,0.5), 0 0 100px rgba(255,152,0,0.3)',
              border: `4px solid ${winner.type === 'ZONK' ? '#424242' : '#FFD54F'}`
            }}>
          <div className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2">
             <div className="p-4 md:p-5 rounded-full shadow-xl"
                  style={{
                    background: winner.type === 'ZONK' 
                      ? 'linear-gradient(145deg, #424242, #212121)' 
                      : 'linear-gradient(145deg, #FFB300, #FF8F00)',
                    border: '4px solid #FFFDE7',
                    boxShadow: winner.type === 'ZONK'
                      ? '0 4px 20px rgba(0,0,0,0.4)'
                      : '0 4px 20px rgba(255,152,0,0.5)'
                  }}>
                {React.createElement(winner.icon, { size: 36, color: 'white' })}
             </div>
          </div>
          
          <div className="mt-6 md:mt-8">
            {winner.type === 'ZONK' ? (
                <div className="mb-4">
                    <h2 className="text-2xl md:text-3xl font-black text-[#212121] uppercase tracking-wider">YAHH.. ZONK!</h2>
                    <p className="text-gray-600 text-sm md:text-base mt-2">Jangan menyerah, coba lagi lain kali!</p>
                </div>
            ) : (
                <div className="mb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-[#FF6F00]">🎉 SELAMAT! 🎉</h2>
                    <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-2">Anda Mendapatkan</p>
                    <div className="text-2xl md:text-3xl font-black text-[#3E2723] mt-2 leading-tight">
                        {winner.label}
                    </div>
                </div>
            )}
            
            <button 
                onClick={onClaim}
                className="w-full text-white py-3 rounded-xl font-bold transition-all hover:scale-[1.02] cursor-pointer"
                style={{
                  background: winner.type === 'ZONK'
                    ? 'linear-gradient(135deg, #424242, #212121)'
                    : 'linear-gradient(135deg, #5D4037, #3E2723)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
            >
                {winner.type === 'ZONK' ? 'Tutup' : '✨ Ambil Hadiah'}
            </button>
          </div>
       </div>
    </div>
  );
};

export default WinnerModal;
