import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds showcase loading
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => onComplete(), 500); // Wait a bit before removing
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#05050A] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center relative z-10"
      >
        <div className="relative mb-8">
           <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full animate-[spin_4s_linear_infinite] scale-150"></div>
           <BrainCircuit className="w-20 h-20 text-primary shadow-neon-primary" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-widest text-white mb-2 uppercase text-glow">
          Debate<span className="text-primary">X</span>
        </h1>
        <p className="text-accent text-sm uppercase tracking-[0.3em] font-bold mb-12">Cognitive Engine Initializing</p>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)]">
           <motion.div 
             className="h-full bg-gradient-to-r from-primary to-accent shadow-[0_0_15px_#00f0ff]"
             style={{ width: `${progress}%` }}
           />
        </div>
        
        {/* Loading Metrics Text */}
        <div className="mt-6 flex flex-col items-center gap-1 text-[10px] text-gray-500 font-mono uppercase">
           <p>{progress < 30 ? 'Loading Neural Weights...' : progress < 60 ? 'Connecting to WebSocket...' : progress < 90 ? 'Calibrating Logic Models...' : 'Systems Online'}</p>
           <p>SYS.MEMORY: {(progress * 0.42).toFixed(1)} GB / 42.0 GB</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
