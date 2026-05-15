import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Target, Clock, Brain, Activity, Settings2, Sparkles } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

export default function CreateRoom() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topic: '',
    category: 'Technology',
    difficulty: 'Intermediate',
    persona: 'Socrates AI',
    time: '5'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/arena');
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col bg-[#05050A]">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 relative z-10 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-3xl relative"
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] rounded-full -z-10 mix-blend-screen pointer-events-none"></div>
          
          <div className="text-center mb-10">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0C0C14] border border-white/10 shadow-2xl mb-6">
                <Settings2 className="w-8 h-8 text-primary" />
             </div>
             <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4 tracking-tight">Configure Arena</h2>
             <p className="text-gray-400 text-lg">Define the parameters of your intellectual battle.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#0C0C14]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            <div className="space-y-8">
              {/* Topic */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">
                  <Target size={14} /> Debate Premise
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-black/60 transition-all text-lg font-medium shadow-inner"
                  placeholder="e.g. Is artificial general intelligence an existential threat?"
                  value={formData.topic}
                  onChange={e => setFormData({...formData, topic: e.target.value})}
                />
              </div>

              {/* Grid configs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">
                    <Activity size={14} /> Category
                  </label>
                  <div className="relative">
                    <select 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-white focus:outline-none focus:border-primary/50 focus:bg-black/60 transition-all appearance-none cursor-pointer"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      {['Technology', 'Philosophy', 'Politics', 'Science', 'Ethics'].map(c => <option key={c} value={c} className="bg-[#0C0C14]">{c}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-500">▼</div>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">
                    <Brain size={14} /> Difficulty
                  </label>
                  <div className="relative">
                    <select 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-white focus:outline-none focus:border-primary/50 focus:bg-black/60 transition-all appearance-none cursor-pointer"
                      value={formData.difficulty}
                      onChange={e => setFormData({...formData, difficulty: e.target.value})}
                    >
                      {['Beginner', 'Intermediate', 'Expert'].map(c => <option key={c} value={c} className="bg-[#0C0C14]">{c}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-500">▼</div>
                  </div>
                </div>
              </div>

              {/* AI Persona Selection */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">
                  <Sparkles size={14} /> Opponent Persona
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Socrates AI', 'Elon-style AI', 'Roast King AI', 'Lawyer AI', 'Politician AI', 'Guru AI'].map(p => (
                    <div 
                      key={p}
                      onClick={() => setFormData({...formData, persona: p})}
                      className={`p-4 rounded-2xl cursor-pointer text-center transition-all text-sm font-bold flex flex-col items-center justify-center gap-2 min-h-[100px]
                        ${formData.persona === p 
                          ? 'bg-primary/10 border-2 border-primary text-white shadow-[0_0_20px_rgba(0,240,255,0.2)] scale-[1.02]' 
                          : 'bg-black/40 border-2 border-transparent text-gray-500 hover:border-white/10 hover:bg-black/60 hover:text-gray-300'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.persona === p ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-500'}`}>
                         <Brain size={18} />
                      </div>
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button type="submit" className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] text-lg flex justify-center items-center gap-3 group">
                  Initialize Sequence <Sparkles className="text-primary group-hover:animate-spin" size={20}/>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
