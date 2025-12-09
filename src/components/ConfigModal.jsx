import React from 'react';
import { Settings, X, Plus, Minus } from 'lucide-react';
import { ITEM_TYPES, MAX_ITEMS } from '../constants/itemTypes';

const ConfigModal = ({ config, setConfig, onApply, onClose }) => {
  const totalItems = Object.values(config).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #FFFDE7, #F5F5DC)',
            border: '2px solid #8D6E63'
          }}>
        <div className="px-5 py-4 flex justify-between items-center text-white"
            style={{ background: 'linear-gradient(135deg, #5D4037, #3E2723)' }}>
          <h2 className="font-bold text-base md:text-lg flex items-center gap-2">
            <Settings size={18}/> Pengaturan Stok
          </h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X size={20}/>
          </button>
        </div>
        
        <div className="p-4 md:p-5 space-y-3 max-h-[55vh] overflow-y-auto">
          <div className="flex justify-between text-xs md:text-sm font-semibold text-[#5D4037] mb-3 px-1">
            <span>Tipe Barang</span>
            <span>Jumlah (Total: {totalItems}/{MAX_ITEMS})</span>
          </div>
          
          {Object.keys(ITEM_TYPES).map((type) => (
            <div key={type} 
              className="flex items-center justify-between p-3 rounded-xl transition-all hover:scale-[1.01]"
              style={{
              background: 'white',
              boxShadow: '0 2px 8px rgba(62,39,35,0.1)'
              }}>
              <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full shadow-inner" 
                       style={{ 
                         backgroundColor: ITEM_TYPES[type].color,
                         boxShadow: `0 2px 8px ${ITEM_TYPES[type].color}40`
                       }}>
                    {React.createElement(ITEM_TYPES[type].icon, { size: 14, color: 'white' })}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-[#3E2723]">{ITEM_TYPES[type].label}</span>
                    <span className="text-xs text-[#8D6E63]">Kode: {type}</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-2">
                  <button 
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                    style={{ background: 'linear-gradient(145deg, #E0E0E0, #BDBDBD)' }}
                    onClick={() => setConfig(prev => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }))}
                  >
                    <Minus size={12} color="#5D4037"/>
                  </button>
                  <span className="w-8 text-center font-bold text-[#3E2723]">{config[type]}</span>
                  <button 
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer disabled:opacity-50"
                    style={{ background: 'linear-gradient(145deg, #8D6E63, #6D4C41)' }}
                    onClick={() => {
                        if (totalItems < MAX_ITEMS && config[type] < ITEM_TYPES[type].maxCount) {
                            setConfig(prev => ({ ...prev, [type]: prev[type] + 1 }));
                        }
                    }}
                    disabled={totalItems >= MAX_ITEMS || config[type] >= ITEM_TYPES[type].maxCount}
                  >
                    <Plus size={12} color="white"/>
                  </button>
               </div>
            </div>
          ))}
        </div>

        <div className="p-4 flex gap-3" style={{ background: 'rgba(215, 204, 200, 0.3)' }}>
           <button 
            onClick={onApply}
            className="flex-1 text-white py-3 rounded-xl font-bold transition-all hover:scale-[1.02] cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #5D4037, #3E2723)',
              boxShadow: '0 4px 15px rgba(62, 39, 35, 0.3)'
            }}
           >
             Terapkan & Reset Roda
           </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
