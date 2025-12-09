import React from 'react';
import { Settings } from 'lucide-react';
import loocoLogo from '/ARUNIKA_LOGO.png';

const Header = ({ onOpenConfig }) => {
  return (
    <header className="px-6 md:px-8 py-2 flex justify-between items-center z-10 backdrop-blur-sm bg-[#ECE9D9]/95 border-b border-white/10">
      <div className=" p-2 rounded-xl">
        <img src={loocoLogo} alt="LooCo Logo" className="h-14 md:h-18 object-contain" />
      </div>
      <button 
        onClick={onOpenConfig}
        className="p-3 bg-[#ECE9D9] rounded-xl shadow-lg hover:bg-[#E7E4D8] transition-all duration-200 hover:scale-105 cursor-pointer group border border-[#99815D]/20"
      >
        <Settings size={24} className="text-[#8C7654] group-hover:rotate-90 transition-transform duration-500"/>
      </button>
    </header>
  );
};

export default Header;
