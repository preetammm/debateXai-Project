import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#05050A]/80 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="p-2 bg-primary/10 rounded-xl border border-primary/20 group-hover:border-primary/50 transition-colors"
            >
              <BrainCircuit className="w-7 h-7 text-primary shadow-neon-primary" />
            </motion.div>
            <span className="font-display font-black text-2xl tracking-tight text-white">
              Debate<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">X</span> AI
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
            {[
              { path: '/dashboard', label: 'Dashboard' },
              { path: '/arena', label: 'Arena' },
              { path: '/leaderboard', label: 'Leaderboard' },
              { path: '/analytics', label: 'Analytics' }
            ].map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${isActive(link.path) ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm font-bold">
              Sign In
            </Link>
            <Link to="/register">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all"
              >
                Start
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
