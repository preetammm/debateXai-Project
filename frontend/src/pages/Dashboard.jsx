import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Activity, Trophy, History, Settings, Flame, BrainCircuit, Users, Zap, Shield, MessageSquare, TrendingUp } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

export default function Dashboard() {
  const [liveFeed, setLiveFeed] = useState([
    { id: 1, text: "SocratesReborn just won an Expert debate.", time: "2m ago" },
    { id: 2, text: "New trending topic: 'AI Consciousness'.", time: "5m ago" },
    { id: 3, text: "LogicMaster99 reached a 15-day streak!", time: "12m ago" },
  ]);

  useEffect(() => {
    // Simulate real-time feed updates
    const interval = setInterval(() => {
      const newItems = [
        "QuantumThinker detected 3 Ad Hominem fallacies.",
        "Elon-style AI defeated user in 'Mars Colonization' debate.",
        "Global logic score average increased by 0.5%.",
        "AlexDebater just joined the arena.",
        "DebateBot_killa reached Top 5 Global Rank."
      ];
      const randomItem = newItems[Math.floor(Math.random() * newItems.length)];
      setLiveFeed(prev => [{ id: Date.now(), text: randomItem, time: "Just now" }, ...prev].slice(0, 5));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-24 bg-[#05050A]">
      <Navbar />
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid-pattern animate-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8 relative z-10">
        
        {/* Left Sidebar */}
        <div className="w-64 flex flex-col gap-6 hidden md:flex">
          <div className="bg-[#0C0C14]/90 backdrop-blur-2xl border border-white/5 p-6 text-center rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/50 p-1 relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-colors animate-pulse"></div>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Profile" className="w-full h-full bg-black rounded-full relative z-10" />
            </div>
            <h3 className="font-bold font-display text-white text-xl tracking-tight">Alex Debater</h3>
            <p className="text-xs text-gray-400 mb-3 font-mono">Rank: #142 Global</p>
            <div className="text-sm text-orange-400 font-bold flex items-center justify-center gap-1 font-mono bg-orange-500/10 py-1.5 px-3 rounded-full border border-orange-500/20 shadow-[0_0_15px_rgba(251,146,60,0.2)]">
              <Flame size={16} className="animate-pulse" /> 5 Day Streak
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', active: true },
              { icon: PlusCircle, label: 'Create Debate', link: '/create-room' },
              { icon: Activity, label: 'Active Arena', link: '/arena' },
              { icon: Trophy, label: 'Leaderboard', link: '/leaderboard' },
              { icon: TrendingUp, label: 'Analytics', link: '/analytics' },
              { icon: Settings, label: 'System Setup', link: '#' }
            ].map((item, idx) => (
              <Link 
                key={idx} 
                to={item.link || '#'}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all font-medium group ${item.active ? 'bg-gradient-to-r from-primary/10 to-transparent text-primary border border-primary/20 shadow-[inset_2px_0_0_#00f0ff]' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
              >
                <item.icon size={20} className={item.active ? '' : 'group-hover:scale-110 transition-transform'} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Top Welcome & Quick Action */}
          <div className="flex justify-between items-end bg-gradient-to-r from-[#0C0C14]/90 to-transparent p-8 rounded-3xl border border-white/5 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[300px] h-full bg-primary/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen"></div>
             <div className="relative z-10">
               <h1 className="text-4xl font-display font-black text-white mb-2">Welcome back, Alex.</h1>
               <p className="text-gray-400">Your neural metrics are optimal. Ready for the next engagement?</p>
             </div>
             <Link to="/create-room" className="relative z-10">
               <button className="px-6 py-3 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2">
                 <Zap size={18}/> Quick Match
               </button>
             </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0C0C14]/90 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl relative overflow-hidden shadow-lg group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[40px] rounded-full group-hover:bg-primary/20 transition-colors"></div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><Trophy size={14}/> Win Rate</p>
              <h3 className="text-5xl font-display font-black text-white">68<span className="text-2xl text-gray-500">%</span></h3>
              <p className="text-green-400 text-sm mt-3 font-bold bg-green-500/10 inline-block px-2 py-1 rounded border border-green-500/20">+5% this week</p>
            </div>
            <div className="bg-[#0C0C14]/90 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl relative overflow-hidden shadow-lg group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 blur-[40px] rounded-full group-hover:bg-secondary/20 transition-colors"></div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><BrainCircuit size={14}/> Avg Logic</p>
              <h3 className="text-5xl font-display font-black text-white">82.4</h3>
              <p className="text-green-400 text-sm mt-3 font-bold bg-green-500/10 inline-block px-2 py-1 rounded border border-green-500/20">+1.2 pts</p>
            </div>
            <div className="bg-[#0C0C14]/90 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl relative overflow-hidden shadow-lg group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 blur-[40px] rounded-full group-hover:bg-accent/20 transition-colors"></div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><MessageSquare size={14}/> Engagements</p>
              <h3 className="text-5xl font-display font-black text-white">142</h3>
              <p className="text-gray-400 text-sm mt-3 font-bold bg-white/5 inline-block px-2 py-1 rounded border border-white/10">Top 15% globally</p>
            </div>
          </div>

          <div className="flex gap-8 flex-col lg:flex-row">
            {/* Active Arenas */}
            <div className="flex-[2] bg-[#0C0C14]/90 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold flex items-center gap-3 text-white">
                  <Activity className="text-primary animate-pulse" size={24} /> Trending Arenas
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { title: 'Ethics of AGI', persona: 'Socrates AI', diff: 'Expert', icon: BrainCircuit, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
                  { title: 'Space Colonization', persona: 'Elon-style AI', diff: 'Hard', icon: Zap, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
                  { title: 'Universal Basic Income', persona: 'Politician AI', diff: 'Medium', icon: Users, color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
                  { title: 'Crypto Regulation', persona: 'Lawyer AI', diff: 'Hard', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' }
                ].map((room, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/5 p-6 rounded-2xl hover:bg-black/60 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                       <room.icon size={100} />
                    </div>
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className={`p-2.5 rounded-xl ${room.bg} border ${room.border}`}>
                         <room.icon size={20} className={room.color} />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-1 bg-white/10 rounded uppercase text-gray-400">{room.diff}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1 text-white relative z-10 group-hover:text-primary transition-colors">{room.title}</h3>
                    <p className="text-sm text-gray-500 mb-5 relative z-10">vs {room.persona}</p>
                    <Link to="/arena" className="relative z-10">
                      <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all font-bold text-sm border border-transparent group-hover:border-white/20">
                        Enter
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Feed Column */}
            <div className="flex-1 bg-[#0C0C14]/90 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl shadow-xl flex flex-col">
               <h2 className="text-xl font-display font-bold flex items-center gap-2 text-white mb-6 border-b border-white/10 pb-4">
                  <Activity size={20} className="text-green-400" /> Live System Feed
               </h2>
               
               <div className="flex-1 flex flex-col gap-4 overflow-hidden relative">
                 <div className="absolute top-0 left-4 bottom-0 w-[1px] bg-white/10"></div>
                 <AnimatePresence>
                   {liveFeed.map((item, idx) => (
                     <motion.div 
                       key={item.id}
                       initial={{ opacity: 0, x: -20, height: 0 }}
                       animate={{ opacity: 1, x: 0, height: 'auto' }}
                       exit={{ opacity: 0 }}
                       className="relative pl-8"
                     >
                        <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-primary shadow-[0_0_10px_#00f0ff] z-10"></div>
                        <p className="text-sm text-gray-300 leading-snug">{item.text}</p>
                        <p className="text-[10px] text-gray-600 font-mono mt-1 uppercase">{item.time}</p>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
