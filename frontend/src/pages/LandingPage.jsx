import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BrainCircuit, Target, Trophy, Shield, Sparkles, Users, Zap, ArrowRight, Bot } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const features = [
  { icon: BrainCircuit, title: 'Live AI Debate', desc: 'Real-time chat debates powered by advanced LLMs.', color: 'text-[#00f0ff]', glow: '#00f0ff' },
  { icon: Target, title: 'Logic Fallacy Detection', desc: 'Instant AI detection of ad hominem, strawman, and more.', color: 'text-[#ff003c]', glow: '#ff003c' },
  { icon: Users, title: 'AI Personas', desc: 'Debate philosophers, politicians, lawyers, and roast masters.', color: 'text-[#7000ff]', glow: '#7000ff' },
  { icon: Trophy, title: 'Live Scoring', desc: 'Track confidence, logic, clarity, and persuasion in real-time.', color: 'text-yellow-400', glow: '#facc15' },
  { icon: Sparkles, title: 'AI Audience Voting', desc: 'A virtual audience reacts dynamically to your arguments.', color: 'text-green-400', glow: '#4ade80' },
  { icon: Shield, title: 'Debate Replay Analysis', desc: 'Get post-debate breakdowns of your strongest and weakest points.', color: 'text-blue-400', glow: '#60a5fa' }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05050A] text-white overflow-hidden">
      <Navbar />
      
      {/* Cinematic Grid Background */}
      <div className="fixed inset-0 bg-grid-pattern animate-grid opacity-30 z-0 pointer-events-none"></div>
      
      {/* Spotlights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-primary/20 blur-[150px] rounded-[100%] pointer-events-none mix-blend-screen z-0 animate-pulse"></div>

      {/* Hero Section */}
      <main className="pt-48 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Floating Hologram Element */}
        <motion.div 
          className="absolute top-10 right-[10%] opacity-50 hidden lg:block"
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-32 h-32 border border-primary/30 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <Bot className="w-12 h-12 text-primary shadow-neon-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold mb-10 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] text-primary">
            <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00f0ff]"></span>
            DEBATEX AI ENGINE V2.0 ONLINE
          </div>
          <h1 className="text-6xl md:text-[110px] leading-[1.1] font-display font-black tracking-tighter mb-8 max-w-5xl">
            Intellectual Combat.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent text-glow">
              Engineered by AI.
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-400 mb-14 max-w-3xl leading-relaxed font-light z-10"
        >
          Enter the arena. Battle hyper-intelligent personas in real-time. Detect logical fallacies instantly. Forge unbreakable arguments.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 z-10"
        >
          <Link to="/register">
            <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center gap-3">
              Enter The Arena <ArrowRight size={20} />
            </button>
          </Link>
          <button className="px-10 py-5 bg-black/40 backdrop-blur-xl border border-white/10 text-white font-black uppercase tracking-widest rounded-full text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-3 group shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
            <Zap size={20} className="text-primary group-hover:animate-pulse" /> System Demo
          </button>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-6">Cognitive Architecture</h2>
          <p className="text-gray-400 text-xl font-light">The tools to deconstruct any argument.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-[#0C0C14]/60 backdrop-blur-2xl border border-white/5 hover:border-white/20 p-10 rounded-[2rem] relative overflow-hidden group shadow-2xl transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-40 h-40 blur-[60px] rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-50" style={{backgroundColor: `${feature.glow}1a`}}></div>
              
              <div className="w-16 h-16 rounded-2xl bg-[#151520] border border-white/5 flex items-center justify-center mb-8 shadow-inner relative z-10 group-hover:border-white/20 transition-colors">
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              
              <h3 className="text-2xl font-bold font-display mb-4 text-white relative z-10">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light text-lg relative z-10">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/5 mt-20 py-12 text-center text-gray-600 bg-black/80 backdrop-blur-md relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
           <BrainCircuit size={24} className="text-primary/50" />
           <span className="font-display font-bold text-xl text-white/50">DebateX AI</span>
        </div>
        <p className="text-sm uppercase tracking-widest font-mono">© 2026 DebateX AI Systems. All rights reserved.</p>
      </footer>
    </div>
  );
}
