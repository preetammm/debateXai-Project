import React from 'react';
import { Activity, BarChart2, PieChart, TrendingUp, Target, Brain, Shield } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

export default function Analytics() {
  const historyData = [
    { name: 'Debate 1', logic: 65, emotion: 20 },
    { name: 'Debate 2', logic: 70, emotion: 25 },
    { name: 'Debate 3', logic: 68, emotion: 15 },
    { name: 'Debate 4', logic: 75, emotion: 30 },
    { name: 'Debate 5', logic: 82, emotion: 22 },
    { name: 'Debate 6', logic: 80, emotion: 18 },
    { name: 'Debate 7', logic: 85, emotion: 12 },
    { name: 'Debate 8', logic: 90, emotion: 8 },
    { name: 'Debate 9', logic: 88, emotion: 10 },
    { name: 'Debate 10', logic: 92, emotion: 5 },
  ];

  const radarData = [
    { subject: 'Logic', A: 85, fullMark: 100 },
    { subject: 'Pathos', A: 40, fullMark: 100 },
    { subject: 'Ethos', A: 75, fullMark: 100 },
    { subject: 'Clarity', A: 90, fullMark: 100 },
    { subject: 'Evidence', A: 60, fullMark: 100 },
    { subject: 'Consistency', A: 88, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen pt-24 bg-[#05050A] overflow-x-hidden">
      <Navbar />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 bg-grid-pattern animate-grid opacity-10 z-0 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        <div className="flex items-center justify-between mb-16">
           <div>
             <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-4 tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">Neural Analytics</h1>
             <p className="text-gray-400 text-xl font-light">Deep dive into your cognitive evolution and rhetorical metrics.</p>
           </div>
           <div className="hidden md:flex gap-4">
             <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]">Export PDF Report</button>
             <button className="px-6 py-3 rounded-2xl bg-primary text-black text-sm font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)]">Share Analysis</button>
           </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
           {[
             { label: 'Avg Logic Score', value: '82.4', icon: Brain, color: 'text-primary', glow: 'shadow-[0_0_30px_rgba(0,240,255,0.15)]', glowColor: '#00f0ff' },
             { label: 'Avg Emotion Control', value: '91%', icon: Target, color: 'text-secondary', glow: 'shadow-[0_0_30px_rgba(255,0,60,0.15)]', glowColor: '#ff003c' },
             { label: 'Persuasion Index', value: '78.5', icon: TrendingUp, color: 'text-accent', glow: 'shadow-[0_0_30px_rgba(112,0,255,0.15)]', glowColor: '#7000ff' },
             { label: 'Total Fallacies', value: '14', icon: Shield, color: 'text-orange-400', glow: 'shadow-[0_0_30px_rgba(251,146,60,0.15)]', glowColor: '#fb923c' }
           ].map((kpi, i) => (
             <div key={i} className={`bg-[#0C0C14]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 ${kpi.glow} relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 blur-2xl rounded-full group-hover:scale-150 transition-transform" style={{backgroundColor: `${kpi.glowColor}1a`}}></div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className={`p-3 rounded-xl bg-[#151520] border border-white/5 ${kpi.color} shadow-inner`}>
                     <kpi.icon size={24} />
                  </div>
                  <span className="text-xs font-black text-gray-500 uppercase tracking-widest">{kpi.label}</span>
                </div>
                <h3 className="text-5xl font-display font-black text-white relative z-10">{kpi.value}</h3>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-[#0C0C14]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="text-2xl font-bold font-display mb-8 text-white flex items-center gap-3">
              <BarChart2 className="text-primary w-8 h-8" /> Cognitive Trajectory Over Time
            </h3>
            <div className="h-[400px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={historyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorLogic" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4}/>
                       <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorEmotion" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#ff003c" stopOpacity={0.2}/>
                       <stop offset="95%" stopColor="#ff003c" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <YAxis tick={{fill: '#4b5563', fontSize: 12}} axisLine={false} tickLine={false} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#05050A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
                     itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                   />
                   <Area type="monotone" dataKey="logic" stroke="#00f0ff" strokeWidth={4} fillOpacity={1} fill="url(#colorLogic)" />
                   <Area type="monotone" dataKey="emotion" stroke="#ff003c" strokeWidth={2} fillOpacity={1} fill="url(#colorEmotion)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            
            {/* Radar Profile */}
            <div className="bg-[#0C0C14]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex-1 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/10 blur-[60px] rounded-full pointer-events-none"></div>
              <h3 className="text-xl font-bold font-display mb-2 text-white flex items-center gap-2 relative z-10">
                <Target className="text-accent w-6 h-6" /> Rhetorical Profile
              </h3>
              <div className="h-[250px] w-full relative z-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 'bold'}} />
                      <Radar name="User" dataKey="A" stroke="#7000ff" strokeWidth={3} fill="#7000ff" fillOpacity={0.4} />
                    </RadarChart>
                 </ResponsiveContainer>
              </div>
            </div>

            {/* Fallacy Breakdown */}
            <div className="bg-[#0C0C14]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <h3 className="text-xl font-bold font-display mb-6 text-white flex items-center gap-2">
                <PieChart className="text-secondary w-6 h-6" /> Fallacy Distribution
              </h3>
              <div className="space-y-5">
                {[
                  { name: 'Ad Hominem', val: 45, color: 'bg-red-500', text: 'text-red-500' },
                  { name: 'Strawman', val: 30, color: 'bg-yellow-500', text: 'text-yellow-500' },
                  { name: 'Red Herring', val: 15, color: 'bg-blue-500', text: 'text-blue-500' },
                  { name: 'False Dilemma', val: 10, color: 'bg-green-500', text: 'text-green-500' }
                ].map(f => (
                  <div key={f.name}>
                    <div className="flex justify-between text-sm mb-2 font-bold uppercase tracking-wider">
                      <span className="text-gray-400">{f.name}</span>
                      <span className={`${f.text} font-mono`}>{f.val}%</span>
                    </div>
                    <div className="w-full bg-black/60 border border-white/5 rounded-full h-2 overflow-hidden shadow-inner">
                      <div className={`${f.color} h-full rounded-full`} style={{width: `${f.val}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
