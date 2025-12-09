import React from 'react';
import { Settings } from 'lucide-react';
import loocoLogo from '/LooCo.png';

const Header = ({ onOpenConfig }) => {
  return (
    <header className="px-4 md:px-6 py-2 text-[#EFEBE9] shadow-lg flex justify-between items-center z-10"
            style={{
              background: 'linear-gradient(135deg, #5D4037 0%, #4E342E 50%, #3E2723 100%)',
              boxShadow: '0 4px 20px rgba(62, 39, 35, 0.4)'
            }}>
      <img src={loocoLogo} alt="LooCo Logo" className="h-14 md:h-18 object-contain" />
      <button 
        onClick={onOpenConfig}
        className="p-2 hover:bg-[#3E2723] rounded-full transition-all duration-200 hover:scale-110 cursor-pointer"
      >
        <Settings size={22} />
      </button>
    </header>
  );
};

export default Header;
