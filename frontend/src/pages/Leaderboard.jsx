import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Flame, Activity } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'SocratesReborn', score: 98.4, wins: 342, streak: 12 },
    { rank: 2, name: 'LogicMaster99', score: 95.2, wins: 289, streak: 8 },
    { rank: 3, name: 'AlexDebater', score: 91.1, wins: 245, streak: 5 },
    { rank: 4, name: 'QuantumThinker', score: 88.5, wins: 190, streak: 2 },
    { rank: 5, name: 'DebateBot_killa', score: 86.3, wins: 154, streak: 4 },
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#05050A]">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        
        {/* BG Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 mb-6 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
            <Trophy className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-4 tracking-tight">Global Rankings</h1>
          <p className="text-gray-400 text-xl font-light">The sharpest minds in the arena.</p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end gap-6 mb-16 h-[350px]">
          {/* Rank 2 */}
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-1/4 max-w-[200px] flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl border-2 border-gray-300/50 mb-6 overflow-hidden bg-[#0C0C14] shadow-lg"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaders[1].name}`} alt="avatar" className="w-full h-full" /></div>
            <div className="w-full h-40 bg-gradient-to-t from-[#0C0C14] to-gray-300/10 border border-gray-300/20 rounded-t-3xl flex flex-col items-center pt-6 shadow-[inset_0_2px_20px_rgba(209,213,219,0.05)]">
              <span className="font-display font-black text-2xl text-white">#2</span>
              <span className="font-bold text-gray-300 mt-2 truncate w-full text-center px-2">{leaders[1].name}</span>
              <span className="text-xs font-mono text-primary mt-1">{leaders[1].score} PTS</span>
            </div>
          </motion.div>
          {/* Rank 1 */}
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-1/3 max-w-[250px] flex flex-col items-center z-10">
            <Crown className="w-12 h-12 text-yellow-400 mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
            <div className="w-28 h-28 rounded-2xl border-4 border-yellow-400 mb-6 overflow-hidden bg-[#0C0C14] shadow-[0_0_30px_rgba(250,204,21,0.3)]"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaders[0].name}`} alt="avatar" className="w-full h-full" /></div>
            <div className="w-full h-52 bg-gradient-to-t from-[#0C0C14] to-yellow-500/10 border border-yellow-500/30 rounded-t-3xl flex flex-col items-center pt-8 shadow-[inset_0_2px_30px_rgba(250,204,21,0.1)]">
              <span className="font-display font-black text-4xl text-yellow-400 text-glow-secondary">#1</span>
              <span className="font-bold text-white text-lg mt-2 truncate w-full text-center px-2">{leaders[0].name}</span>
              <span className="text-sm font-mono text-primary mt-1 font-bold">{leaders[0].score} PTS</span>
            </div>
          </motion.div>
          {/* Rank 3 */}
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="w-1/4 max-w-[200px] flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl border-2 border-amber-700/50 mb-6 overflow-hidden bg-[#0C0C14] shadow-lg"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaders[2].name}`} alt="avatar" className="w-full h-full" /></div>
            <div className="w-full h-32 bg-gradient-to-t from-[#0C0C14] to-amber-700/10 border border-amber-700/20 rounded-t-3xl flex flex-col items-center pt-6 shadow-[inset_0_2px_20px_rgba(180,83,9,0.05)]">
              <span className="font-display font-black text-2xl text-white">#3</span>
              <span className="font-bold text-amber-600 mt-2 truncate w-full text-center px-2">{leaders[2].name}</span>
              <span className="text-xs font-mono text-primary mt-1">{leaders[2].score} PTS</span>
            </div>
          </motion.div>
        </div>

        {/* List */}
        <div className="bg-[#0C0C14]/80 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/40 text-gray-500 text-xs uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="p-6 font-bold">Rank</th>
                <th className="p-6 font-bold">Debater</th>
                <th className="p-6 font-bold">Logic Score</th>
                <th className="p-6 font-bold">Wins</th>
                <th className="p-6 font-bold text-right">Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((leader, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-6 font-display font-black text-gray-500 text-xl w-24">
                    {leader.rank <= 3 ? <span className="text-white">0{leader.rank}</span> : `0${leader.rank}`}
                  </td>
                  <td className="p-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black/50 border border-white/5 overflow-hidden group-hover:border-white/20 transition-colors">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leader.name}`} alt="avatar" className="w-full h-full" />
                    </div>
                    <span className="font-bold text-white text-lg">{leader.name}</span>
                  </td>
                  <td className="p-6 font-mono text-primary font-bold text-lg">{leader.score}</td>
                  <td className="p-6 text-gray-400 font-medium text-lg">{leader.wins}</td>
                  <td className="p-6 text-right">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold font-mono text-sm">
                      <Flame size={14} /> {leader.streak}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
