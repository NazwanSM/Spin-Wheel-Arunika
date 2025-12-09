import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import SpinWheel from './components/SpinWheel';
import ControlPanel from './components/ControlPanel';
import ConfigModal from './components/ConfigModal';
import WinnerModal from './components/WinnerModal';
import { ITEM_TYPES } from './constants/itemTypes';

export default function App() {
  // State untuk jumlah item di pengaturan
  const [config, setConfig] = useState({
    A: 3,
    B: 5,
    C: 5,
    D: 7,
    ZONK: 10,
  });

  // State Aplikasi
  const [items, setItems] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);
  const [showConfig, setShowConfig] = useState(false);

  // Audio refs
  const spinSoundRef = useRef(null);
  
  // Initialize audio on mount
  useEffect(() => {
    // Create spinning sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    spinSoundRef.current = audioContext;
    
    return () => {
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, []);

  // Function to play tick sound
  const playTickSound = (audioContext, frequency = 800, duration = 0.05) => {
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  // Function to play spinning sound effect (continuous ticks)
  const playSpinSound = () => {
    if (!spinSoundRef.current) return;
    
    const audioContext = spinSoundRef.current;
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const spinDuration = 5000; // 5 detik sesuai animasi
    const startTime = Date.now();
    
    const playTicks = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= spinDuration) return;
      
      // Increase interval as spinning slows down
      const progress = elapsed / spinDuration;
      const interval = 40 + (progress * progress * 200); // Start fast (40ms), slow down exponentially
      const frequency = 500 + Math.random() * 300; // Random pitch variation
      
      playTickSound(audioContext, frequency, 0.04);
      
      setTimeout(playTicks, interval);
    };
    
    // Start immediately
    playTicks();
  };

  // Play win sound
  const playWinSound = () => {
    if (!spinSoundRef.current) return;
    
    const audioContext = spinSoundRef.current;
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    // Play a celebratory sound
    const frequencies = [523, 659, 784, 1047]; // C5, E5, G5, C6
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      }, index * 100);
    });
  };
  
  // Generate items berdasarkan config (ZONK boleh berdekatan, random shuffle)
  const generateItems = useCallback(() => {
    let newItems = [];
    Object.keys(config).forEach(type => {
      for (let i = 0; i < config[type]; i++) {
        newItems.push({
          id: Math.random().toString(36).substr(2, 9),
          type,
          ...ITEM_TYPES[type]
        });
      }
    });

    // Shuffle agar urutan acak (ZONK bisa berdekatan)
    newItems = newItems.sort(() => Math.random() - 0.5);
    setItems(newItems);
  }, [config]);

  // Generate awal saat load
  useEffect(() => {
    generateItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // --- Logic Spin ---
  const handleSpin = () => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    setWinner(null);

    // Play spinning sound
    playSpinSound();

    // 1. Tentukan pemenang secara acak SEBELUM animasi
    const winningIndex = Math.floor(Math.random() * items.length);
    const winningItem = items[winningIndex];

    // 2. Hitung sudut putaran
    // Jarum di atas = 270 derajat (atau -90 derajat)
    const sliceAngle = 360 / items.length;
    const centerOffset = sliceAngle / 2; 
    // Target: posisikan slice pemenang di bawah jarum (atas = 270 deg)
    const targetAngle = 270 - (winningIndex * sliceAngle) - centerOffset;

    // Kalkulasi presisi
    const currentVisualAngle = rotation % 360;
    const distanceToTarget = targetAngle - currentVisualAngle + (targetAngle < currentVisualAngle ? 360 : 0);
    const finalRotation = rotation + 360 * 6 + distanceToTarget; // 6 putaran penuh

    setRotation(finalRotation);

    // 3. Tunggu animasi selesai (5 detik)
    setTimeout(() => {
      setIsSpinning(false);
      setWinner({ ...winningItem, index: winningIndex });
      playWinSound();
    }, 5000);
  };

  // --- Hapus Item Setelah Klaim ---
  const handleClaim = () => {
    if (winner) {
      // Hapus item dari array
      const newItems = items.filter(item => item.id !== winner.id);
      setItems(newItems);
      
      // Update config count agar sinkron dengan UI input
      setConfig(prev => ({
        ...prev,
        [winner.type]: Math.max(0, prev[winner.type] - 1)
      }));

      setWinner(null);
    }
  };

  // Handle apply config
  const handleApplyConfig = () => {
    generateItems();
    setShowConfig(false);
  };

  return (
    <div className="min-h-screen font-sans text-[#3E2723] overflow-x-hidden flex flex-col relative"
         style={{ background: 'linear-gradient(180deg, #99815D 0%, #8C7654 50%, #7D664A 100%)' }}>
      
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#ECE9D9 1px, transparent 1px)', 
             backgroundSize: '30px 30px' 
           }}>
      </div>

      {/* --- Header --- */}
      <div className="relative z-20">
        <Header onOpenConfig={() => setShowConfig(true)} />
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center px-4 py-6 md:py-12 gap-8 md:gap-16 relative z-10">
        
        {/* --- Area Roda (Kiri/Tengah) --- */}
        <div className="relative flex-1 flex justify-center items-center w-full max-w-[700px] lg:max-w-none">
            {/* Glow Effect behind wheel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#ECE9D9]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="transform transition-transform duration-500 hover:scale-[1.02] relative z-10 w-full flex justify-center">
                <SpinWheel items={items} rotation={rotation} />
            </div>
        </div>

        {/* --- Kontrol & Info (Kanan/Bawah) --- */}
        <div className="w-full max-w-sm lg:w-[340px] shrink-0">
            <ControlPanel 
              itemsCount={items.length} 
              isSpinning={isSpinning} 
              onSpin={handleSpin}
              config={config}
            />
        </div>

      </main>

      {/* --- Modal Konfigurasi --- */}
      {showConfig && (
        <ConfigModal 
          config={config}
          setConfig={setConfig}
          onApply={handleApplyConfig}
          onClose={() => setShowConfig(false)}
        />
      )}

      {/* --- Modal Pemenang (Winner) --- */}
      <WinnerModal winner={winner} onClaim={handleClaim} />

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-bounce-in {
            animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
