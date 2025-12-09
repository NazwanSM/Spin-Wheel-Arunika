import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ITEM_TYPES } from '../constants/itemTypes';

const ControlPanel = ({ itemsCount, isSpinning, onSpin, config }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-xs md:max-w-sm">
      
      {/* Main Card Container */}
      <div className="w-full bg-[#FDFBE7] rounded-[2rem] p-6 shadow-xl border border-stone-100"
           style={{
             boxShadow: '0 20px 40px rgba(62, 39, 35, 0.1), 0 5px 15px rgba(0,0,0,0.05)'
           }}>
        
        {/* Header Section */}
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-[#3E2723] mb-3">
            Status Roda
          </h2>
          {/* Horizontal Line */}
          <div className="w-full h-px bg-[#8D6E63] opacity-50"></div>
        </div>

        {/* Status Content - Detail per Item */}
        <div className="flex flex-col gap-2 mb-5">
          {/* Total */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-base font-bold text-[#4E342E]">
              Total Sisa Item:
            </span>
            <span className="w-9 h-9 flex items-center justify-center rounded-full text-base font-bold text-white bg-[#3E2723]">
              {itemsCount}
            </span>
          </div>

          {/* Detail per tipe item */}
          <div className=" rounded-xl p-3 space-y-2">
            {Object.keys(ITEM_TYPES).map((type) => {
              const itemType = ITEM_TYPES[type];
              const count = config[type] || 0;
              const Icon = itemType.icon;
              
              return (
                <div key={type} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: itemType.color }}
                    >
                      <Icon size={14} color="white" />
                    </div>
                    <span className="text-sm font-medium text-[#5D4037]">
                      {itemType.label}
                    </span>
                  </div>
                  <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${
                    count === 0 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-[#EFEBE9] text-[#3E2723]'
                  }`}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Error Message */}
          {itemsCount === 0 && (
            <div className="text-[#D32F2F] flex items-start gap-2 text-sm mt-2 font-medium">
              <AlertCircle size={18} className="mt-0.5 flex-shrink-0"/> 
              <span>Item habis. Silakan reset di pengaturan.</span>
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={onSpin}
          disabled={isSpinning || itemsCount === 0}
          className="w-full py-4 rounded-xl text-lg md:text-xl font-bold uppercase tracking-wider transition-all duration-200 transform active:scale-[0.98] shadow-md"
          style={{
            background: isSpinning || itemsCount === 0 
              ? '#8D6E63' // Warna abu-abu kebiruan seperti di gambar saat disabled
              : 'linear-gradient(135deg, #5D4037 0%, #4E342E 50%, #3E2723 100%)', // Orange saat aktif
            color: 'white',
            cursor: isSpinning || itemsCount === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          {isSpinning ? 'Sedang Memutar...' : 'PUTAR SEKARANG'}
        </button>

      </div>
      
      {/* Optional: Footer text if you still want it outside */}
      {/* <p className="text-xs text-[#5D4037]/60 italic text-center mt-4 px-2">
        *Tekan tombol putar untuk mengundi.
      </p> */}
    </div>
  );
};

export default ControlPanel;