import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ITEM_TYPES } from '../constants/itemTypes';

const ControlPanel = ({ itemsCount, isSpinning, onSpin, config }) => {
  return (
    <div className="flex flex-col items-center w-full">
      
      {/* Main Card Container */}
      <div className="w-full bg-[#ECE9D9]/95 backdrop-blur-xl rounded-3xl p-5 md:p-6 shadow-2xl border border-white/40"
           style={{
             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
           }}>
        
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-[#3E2723] tracking-tight uppercase">
            Status Roda
          </h2>
          <div className="h-2 w-2 rounded-full bg-[#606652] animate-pulse"></div>
        </div>

        {/* Status Content - Detail per Item */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Total */}
          <div className="flex justify-between items-center p-3 bg-[#E7E4D8] rounded-2xl border border-[#D7D3C1] shadow-inner">
            <span className="text-xs font-bold text-[#5D4037] uppercase tracking-wider">
              Sisa Item
            </span>
            <span className="h-8 px-3 flex items-center justify-center rounded-xl text-base font-black text-white bg-[#606652] shadow-lg">
              {itemsCount}
            </span>
          </div>

          {/* Detail per tipe item */}
          <div className="space-y-2">
            {Object.keys(ITEM_TYPES).map((type) => {
              const itemType = ITEM_TYPES[type];
              const count = config[type] || 0;
              const Icon = itemType.icon;
              
              return (
                <div key={type} className="flex items-center justify-between p-1.5 rounded-xl hover:bg-white/40 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: itemType.color }}
                    >
                      <Icon size={14} color="white" />
                    </div>
                    <span className="text-xs font-bold text-[#5D4037]">
                      {itemType.label}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                    count === 0 
                      ? 'bg-red-100 text-red-600 border border-red-200' 
                      : 'bg-white text-[#3E2723] border border-[#D7D3C1]'
                  }`}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Error Message */}
          {itemsCount === 0 && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100 animate-pulse">
              <AlertCircle size={20} className="shrink-0"/> 
              <span>Stok habis! Reset di pengaturan.</span>
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={onSpin}
          disabled={isSpinning || itemsCount === 0}
          className="w-full py-5 rounded-2xl text-xl font-black uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-xl hover:shadow-2xl relative overflow-hidden group"
          style={{
            background: isSpinning || itemsCount === 0 
              ? 'linear-gradient(135deg, #98A381 0%, #929C7B 50%, #8D9675 100%)'
              : 'linear-gradient(135deg, #606652 0%, #545948 50%, #484D3E 100%)',
            color: 'white',
            cursor: isSpinning || itemsCount === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSpinning ? 'Memutar...' : 'PUTAR SEKARANG'}
          </span>
          {!(isSpinning || itemsCount === 0) && (
             <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          )}
        </button>

      </div>
    </div>
  );
};

export default ControlPanel;