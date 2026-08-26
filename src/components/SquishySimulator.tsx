import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, RefreshCw, Hand, Heart, Zap, Award } from 'lucide-react';
import { Product } from '../types';

interface SquishySimulatorProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SquishySimulator: React.FC<SquishySimulatorProps> = ({ products, onSelectProduct }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isSquishing, setIsSquishing] = useState(false);
  const [squishProgress, setSquishProgress] = useState(0); // 0 (normal) to 1 (max squish)
  const [riseProgress, setRiseProgress] = useState(1); // 0 (flattened) to 1 (fully rebounded)
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [squishCount, setSquishCount] = useState(0);
  const [stressRelievedScore, setStressRelievedScore] = useState(140);
  
  const activeProduct = products[selectedIdx] || products[0];
  const audioCtxRef = useRef<AudioContext | null>(null);
  const squishIntervalRef = useRef<any>(null);
  const riseIntervalRef = useRef<any>(null);

  // Sound generator using Web Audio API for safe, zero-dependency pop/squish sound
  const playSquishSound = (type: 'squish' | 'rebound') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'squish') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.32);
      }
    } catch (e) {
      // Audio context may be blocked by browser policy until gesture
    }
  };

  const handleMouseDown = () => {
    setIsSquishing(true);
    clearInterval(riseIntervalRef.current);
    playSquishSound('squish');
    
    // Incrementally compress
    squishIntervalRef.current = setInterval(() => {
      setSquishProgress((prev) => {
        const next = Math.min(prev + 0.12, 1);
        setRiseProgress(1 - next);
        return next;
      });
    }, 40);
  };

  const handleMouseUp = () => {
    if (!isSquishing) return;
    setIsSquishing(false);
    clearInterval(squishIntervalRef.current);
    playSquishSound('rebound');
    
    setSquishCount((c) => c + 1);
    setStressRelievedScore((s) => s + 15);

    // Calculate slow rise duration based on product property
    const durationMs = (activeProduct.slowRiseDuration || 5) * 1000;
    const stepInterval = 50;
    const stepCount = durationMs / stepInterval;
    const stepIncrement = 1 / stepCount;

    riseIntervalRef.current = setInterval(() => {
      setRiseProgress((prev) => {
        const next = prev + stepIncrement;
        if (next >= 1) {
          clearInterval(riseIntervalRef.current);
          setSquishProgress(0);
          return 1;
        }
        setSquishProgress(1 - next);
        return next;
      });
    }, stepInterval);
  };

  useEffect(() => {
    return () => {
      clearInterval(squishIntervalRef.current);
      clearInterval(riseIntervalRef.current);
    };
  }, []);

  // Visual compression transformation
  // X expands, Y flattens when squished
  const scaleY = 1 - squishProgress * 0.65;
  const scaleX = 1 + squishProgress * 0.45;
  const rotateDeg = isSquishing ? (Math.random() - 0.5) * 4 : 0;

  return (
    <section className="py-16 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Hand className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Sensory Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
            Virtual Squishy Stress-Relief Simulator
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Click, press, and hold down to squeeze the squishy completely flat. Release to experience each model's calibrated slow-rise memory rebound!
          </p>
        </div>

        {/* Squishy Selectors Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {products.slice(0, 5).map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => {
                setSelectedIdx(idx);
                setSquishProgress(0);
                setRiseProgress(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              <span>{idx === 0 ? '🧊' : idx === 1 ? '🧈' : idx === 2 ? '🧀' : idx === 3 ? '🥟' : '🐳'}</span>
              <span>{prod.name.split(' ')[0]} {prod.name.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          {/* Left Stats & Metric Panels */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Sensory Model</span>
                <span className="text-xs font-bold text-rose-400">{activeProduct.firmness}</span>
              </div>
              <h3 className="font-bold text-lg text-white font-serif">{activeProduct.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{activeProduct.tagline}</p>
              
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Slow Rise Rebound</span>
                  <span className="font-bold text-amber-400 text-sm">{activeProduct.slowRiseDuration}s Tested</span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Scent Profile</span>
                  <span className="font-bold text-emerald-400 text-sm truncate block">{activeProduct.scent}</span>
                </div>
              </div>
            </div>

            {/* Live Compression & Decompression Meters */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Compression Pressure:</span>
                <span className="font-bold text-rose-400">{Math.round(squishProgress * 100)}%</span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-75"
                  style={{ width: `${squishProgress * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-semibold text-slate-300">Shape Rebound Recovery:</span>
                <span className="font-bold text-purple-400">{Math.round(riseProgress * 100)}%</span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-75"
                  style={{ width: `${riseProgress * 100}%` }}
                />
              </div>
            </div>

            {/* Quick Purchase Trigger */}
            <button
              onClick={() => onSelectProduct(activeProduct)}
              className="w-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Order Real Model — ₱{activeProduct.price}</span>
            </button>
          </div>

          {/* Center Squishy Interactive Stage */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] relative select-none">
            
            {/* Audio Toggle & Counter Controls */}
            <div className="absolute top-0 right-0 flex items-center gap-2 z-10">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Toggle Squishy Sound FX"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                <span className="hidden sm:inline">{soundEnabled ? 'Sound On' : 'Muted'}</span>
              </button>

              <div className="bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-300">
                ⚡ {squishCount} Squeezes
              </div>
            </div>

            {/* Interactive Squishy Entity */}
            <div
              id="interactive-squishy-stage"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              className="relative cursor-grab active:cursor-grabbing p-6 transition-transform duration-75 flex items-center justify-center"
              style={{
                transform: `scale(${scaleX}, ${scaleY}) rotate(${rotateDeg}deg)`,
                filter: isSquishing ? 'brightness(1.1) drop-shadow(0 20px 25px rgba(244,63,94,0.35))' : 'drop-shadow(0 15px 20px rgba(0,0,0,0.5))',
              }}
            >
              {/* Product Visual Container */}
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-slate-700/80 bg-slate-800 shadow-2xl relative group">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover pointer-events-none select-none"
                />

                {/* Tactile Texture Sheen Layer */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                  style={{
                    backgroundColor: isSquishing ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    boxShadow: isSquishing ? 'inset 0 0 40px rgba(244,63,94,0.4)' : 'none'
                  }}
                />

                {/* Floating Squish Prompt Hint */}
                {!isSquishing && squishProgress === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <Hand className="w-10 h-10 text-white animate-bounce mb-1" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest bg-rose-600 px-3 py-1 rounded-full shadow-lg">
                      Press &amp; Hold to Squish
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Instruction Footer Bar */}
            <div className="mt-4 text-center text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                {isSquishing
                  ? 'Squeezing... Keep holding for maximum flat compression!'
                  : squishProgress > 0
                  ? `Slow-rising... taking ${activeProduct.slowRiseDuration}s to return to form.`
                  : 'Press and hold down your mouse or finger to squish!'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
