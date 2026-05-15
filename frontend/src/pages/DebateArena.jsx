import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, BrainCircuit, Target, ShieldAlert, Activity, Sparkles, AlertTriangle, Zap, Cpu, Network, RefreshCw } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { LineChart, Line, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { debateAPI } from '../services/api';

export default function DebateArena() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Initiating neural link... I am Socrates AI. Let us examine your fundamental premise on the ethics of Artificial General Intelligence. Present your argument.', analysis: null }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiThinkingText, setAiThinkingText] = useState('Parsing argument...');
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [apiError, setApiError] = useState(null);
  const endOfMessagesRef = useRef(null);

  const persona = 'Socrates AI';
  const topic = 'Is Artificial Intelligence a Threat to Humanity?';

  const [aiAnalysis, setAiAnalysis] = useState({
    logicScore: 85,
    emotionScore: 10,
    persuasionScore: 72,
    fallacies: [],
    strongestPoint: "Awaiting your first argument...",
    weakestPoint: "Awaiting your first argument...",
    rebuttalSuggestion: "",
    history: [{ round: 0, logic: 85, emotion: 10 }],
    radarData: [
      { subject: 'Logic', A: 85, fullMark: 100 },
      { subject: 'Pathos', A: 40, fullMark: 100 },
      { subject: 'Ethos', A: 75, fullMark: 100 },
      { subject: 'Clarity', A: 90, fullMark: 100 },
      { subject: 'Evidence', A: 60, fullMark: 100 },
    ]
  });

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, displayedText]);

  useEffect(() => {
    if (isTyping) {
      const texts = ['Analyzing semantic structure...', 'Detecting logical fallacies...', 'Querying Gemini neural weights...', 'Synthesizing counter-argument...'];
      let i = 0;
      const interval = setInterval(() => { setAiThinkingText(texts[i % texts.length]); i++; }, 800);
      return () => clearInterval(interval);
    }
  }, [isTyping]);

  // Streaming text effect
  const streamText = (fullText, onComplete) => {
    setIsStreaming(true);
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      if (i >= fullText.length) {
        setDisplayedText(fullText);
        setIsStreaming(false);
        clearInterval(interval);
        if (onComplete) onComplete();
      } else {
        setDisplayedText(fullText.substring(0, i));
      }
    }, 15);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    const newMsg = { id: Date.now(), sender: 'user', text: userText, analysis: null };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);
    setApiError(null);

    try {
      const res = await debateAPI.sendMessage(userText, persona, topic);
      const data = res.data;

      setIsTyping(false);

      // Start streaming the AI response text
      const aiMsgId = Date.now() + 1;
      setMessages(prev => [...prev, {
        id: aiMsgId,
        sender: 'ai',
        text: '', // will be filled by streaming
        analysis: {
          logicScore: data.logicScore,
          emotionScore: data.emotionScore,
          fallacies: data.fallacies || [],
          strongestPoint: data.strongestPoint,
          weakestPoint: data.weakestPoint,
        }
      }]);

      streamText(data.aiResponse, () => {
        // Once streaming completes, update the message with full text
        setMessages(prev => prev.map(m =>
          m.id === aiMsgId ? { ...m, text: data.aiResponse } : m
        ));
      });

      // Update analysis panel
      setAiAnalysis(prev => ({
        ...prev,
        logicScore: data.logicScore,
        emotionScore: data.emotionScore,
        persuasionScore: data.persuasionScore,
        fallacies: data.fallacies || [],
        strongestPoint: data.strongestPoint,
        weakestPoint: data.weakestPoint,
        rebuttalSuggestion: data.rebuttalSuggestion || '',
        history: [...prev.history, { round: prev.history.length, logic: data.logicScore, emotion: data.emotionScore }],
        radarData: [
          { subject: 'Logic', A: data.logicScore, fullMark: 100 },
          { subject: 'Pathos', A: data.emotionScore, fullMark: 100 },
          { subject: 'Ethos', A: Math.min(100, data.persuasionScore + 5), fullMark: 100 },
          { subject: 'Clarity', A: Math.min(100, data.logicScore + 5), fullMark: 100 },
          { subject: 'Evidence', A: Math.max(40, data.logicScore - 15), fullMark: 100 },
        ]
      }));

    } catch (err) {
      setIsTyping(false);
      console.error('Gemini API error:', err);
      setApiError('AI engine temporarily unavailable.');

      // Graceful fallback
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: "An interesting premise. However, you may be oversimplifying a multi-dimensional issue. Consider that intelligence, whether artificial or natural, operates within the framework of its design constraints. The real question isn't whether AI is a threat, but whether we can engineer alignment fast enough.",
        analysis: { logicScore: 75, emotionScore: 12, fallacies: [], strongestPoint: 'Clear position statement.', weakestPoint: 'Needs more empirical grounding.' }
      }]);
    }
  };

  return (
    <div className="min-h-screen pt-[72px] flex flex-col mx-auto px-4 gap-4 relative overflow-hidden bg-[#05050A]">
      <div className="fixed inset-0 bg-grid-pattern animate-grid opacity-[0.15] z-0 pointer-events-none"></div>
      <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[150px] opacity-40 mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[150px] opacity-40 mix-blend-screen pointer-events-none"></div>
      <Navbar />

      {/* Top Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-4 flex justify-between items-center bg-[#0C0C14]/90 border-b border-white/10 backdrop-blur-3xl z-10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] mt-2 mx-4 rounded-3xl">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-blue-500 to-accent p-[2px] shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
               <Zap className="text-white w-6 h-6 relative z-10" />
            </div>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black font-display text-white tracking-tight">{topic}</h2>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mt-1.5 uppercase tracking-widest">
              <span className="flex items-center gap-1.5 text-accent"><BrainCircuit size={14}/> {persona}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span className="text-green-400 flex items-center gap-1.5"><Sparkles size={14}/> Gemini AI Powered</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-6 text-center bg-black/60 px-6 py-3 rounded-2xl border border-white/5 shadow-inner">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Round</p>
            <p className="text-2xl font-black text-white font-display leading-none">{aiAnalysis.history.length}<span className="text-gray-600 text-lg">/∞</span></p>
          </div>
        </div>
      </motion.div>

      {/* Error Banner */}
      <AnimatePresence>
        {apiError && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mx-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl text-yellow-400 text-sm font-medium flex items-center justify-between z-10">
            <span>{apiError} Using fallback mode.</span>
            <button onClick={() => setApiError(null)} className="text-yellow-400 hover:text-white"><RefreshCw size={16}/></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 gap-6 overflow-hidden h-[calc(100vh-170px)] px-4 pb-4 z-10">
        {/* LEFT: Chat */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-[3] flex flex-col gap-5">
          <div className="flex-1 glass-panel p-8 flex flex-col overflow-y-auto bg-[#0C0C14]/70 border border-white/5 rounded-3xl shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] relative">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`flex w-full mb-8 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`} key={msg.id}>
                  <div className={`max-w-[85%] relative group ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                    {msg.sender === 'ai' && (
                      <div className="absolute -left-14 top-0 w-10 h-10 rounded-2xl border border-accent/50 bg-black overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(112,0,255,0.4)]">
                        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Socrates&colors=7000ff" alt="AI" className="w-full h-full object-cover opacity-90 mix-blend-screen" />
                      </div>
                    )}
                    <div className={`p-5 text-[15px] leading-relaxed shadow-2xl backdrop-blur-xl border relative overflow-hidden ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-br from-primary/15 to-blue-900/10 border-primary/30 text-white rounded-[2rem] rounded-tr-sm' 
                        : 'bg-gradient-to-br from-[#1A1A24]/90 to-[#0A0A10]/90 border-accent/30 text-gray-200 rounded-[2rem] rounded-tl-sm'
                    }`}>
                      <span className="relative z-10">
                        {/* Show streaming text for the latest AI message if currently streaming */}
                        {msg.sender === 'ai' && msg.text === '' && isStreaming
                          ? <>{displayedText}<span className="animate-pulse">▌</span></>
                          : msg.text}
                      </span>
                    </div>

                    {msg.analysis && (
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-full left-0 mt-3 bg-black/95 border border-white/10 p-5 rounded-2xl text-xs w-[350px] z-50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                         <div className="flex justify-between mb-3 pb-3 border-b border-white/10">
                           <span className="text-green-400 font-bold flex items-center gap-1.5 text-sm uppercase tracking-widest"><Target size={14}/> Logic: {msg.analysis.logicScore}</span>
                           <span className="text-red-400 font-bold text-sm uppercase tracking-widest">Fallacies: {msg.analysis.fallacies.length}</span>
                         </div>
                         <div className="space-y-2">
                           <p className="text-gray-300 text-sm leading-relaxed"><span className="text-white font-bold block mb-1">Strongest:</span> {msg.analysis.strongestPoint}</p>
                           <p className="text-gray-400 text-sm leading-relaxed"><span className="text-white font-bold block mb-1">Weakest:</span> {msg.analysis.weakestPoint}</p>
                         </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Thinking State */}
            <AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="flex w-full mb-8 justify-start items-end gap-4">
                   <div className="w-10 h-10 rounded-2xl border border-accent/50 bg-black overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(112,0,255,0.6)] relative">
                      <div className="absolute inset-0 bg-accent/30 animate-pulse mix-blend-screen"></div>
                      <Network className="text-accent w-6 h-6 animate-[spin_4s_linear_infinite]" />
                   </div>
                  <div className="px-6 py-4 glass-panel rounded-3xl rounded-tl-sm flex flex-col gap-2 bg-[#1A1A24]/70 border-accent/20">
                    <span className="text-xs font-mono text-accent uppercase tracking-widest font-bold">{aiThinkingText}</span>
                    <div className="flex gap-1.5 h-4 items-end">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-1.5 bg-accent rounded-full wave-bar" style={{animationDelay: `${i * 0.1}s`}}></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endOfMessagesRef} />
          </div>

          {/* Input Box */}
          <div className="glass-panel p-4 flex items-end gap-4 bg-[#0C0C14]/90 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] rounded-3xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-3xl pointer-events-none"></div>
            <button className="p-4 rounded-2xl hover:bg-white/5 transition-colors text-gray-500 hover:text-white group relative z-10">
              <Mic size={24} className="group-hover:scale-110 transition-transform" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Construct your argument..."
              disabled={isTyping || isStreaming}
              className="flex-1 bg-black/60 border border-white/10 rounded-2xl p-5 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-black/80 transition-all resize-none h-[88px] text-[15px] leading-relaxed shadow-inner relative z-10 disabled:opacity-50"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || isStreaming || !input.trim()}
              className="p-5 bg-gradient-to-r from-primary to-blue-500 text-black rounded-2xl hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-[1.03] active:scale-[0.97] relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={24} />
            </button>
          </div>
        </motion.div>

        {/* RIGHT: AI Analysis Panel */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex-[2] flex flex-col gap-5 max-w-[500px] hidden lg:flex">
          {/* Avatar */}
          <div className="glass-panel p-8 flex flex-col items-center justify-center border border-accent/20 bg-gradient-to-b from-accent/10 to-[#0C0C14] relative overflow-hidden rounded-3xl shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80 shadow-[0_0_20px_#7000ff]"></div>
            <div className="w-28 h-28 rounded-full border-2 border-accent/60 p-1.5 shadow-[0_0_40px_rgba(112,0,255,0.4)] mb-4 relative z-10 bg-black/80 backdrop-blur-md">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#05050A] flex items-center justify-center relative">
                 <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Socrates&colors=7000ff" alt="AI Avatar" className="w-full h-full object-cover opacity-90 mix-blend-screen scale-110" />
                 {isTyping && <div className="absolute inset-0 bg-accent/30 animate-pulse mix-blend-overlay"></div>}
                 <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-accent/50 to-transparent h-2 animate-scan"></div>
              </div>
            </div>
            <h3 className="text-2xl font-black font-display text-white tracking-tight">{persona}</h3>
            <div className="flex items-center gap-2 mt-2">
              <Cpu className="text-accent w-4 h-4" />
              <p className="text-xs text-accent font-mono uppercase tracking-widest font-bold">Gemini Neural Engine</p>
            </div>
          </div>

          {/* Analysis Dashboard */}
          <div className="flex-1 glass-panel p-6 overflow-y-auto flex flex-col gap-6 bg-[#0C0C14]/90 border border-white/5 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
            {/* Charts */}
            <div className="flex gap-4 h-44 w-full border-b border-white/5 pb-6">
               <div className="flex-1 relative">
                 <h4 className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1 flex items-center gap-2 absolute -top-2 left-0 z-10"><Target size={12} className="text-accent"/> Radar</h4>
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={aiAnalysis.radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{fill: '#9ca3af', fontSize: 9}} />
                      <Radar name="User" dataKey="A" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.3} />
                    </RadarChart>
                 </ResponsiveContainer>
               </div>
               <div className="flex-1 relative">
                 <h4 className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1 flex items-center gap-2 absolute -top-2 left-0 z-10"><Activity size={12} className="text-primary"/> Trend</h4>
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={aiAnalysis.history}>
                     <Line type="monotone" dataKey="logic" stroke="#00f0ff" strokeWidth={3} dot={false} />
                     <Line type="monotone" dataKey="emotion" stroke="#ff003c" strokeWidth={3} dot={false} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
            </div>

            {/* Metric Bars */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'LOGIC', value: aiAnalysis.logicScore, color: 'bg-primary', shadow: 'shadow-[0_0_15px_#00f0ff]', text: 'text-primary' },
                { label: 'PERSUADE', value: aiAnalysis.persuasionScore, color: 'bg-accent', shadow: 'shadow-[0_0_15px_#7000ff]', text: 'text-accent' },
                { label: 'EMOTION', value: aiAnalysis.emotionScore, color: 'bg-secondary', shadow: 'shadow-[0_0_15px_#ff003c]', text: 'text-secondary' },
              ].map(m => (
                <div key={m.label} className="bg-black/60 border border-white/5 rounded-2xl p-4 shadow-inner">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] text-gray-400 font-mono font-bold tracking-wider">{m.label}</span>
                    <span className={`text-xl ${m.text} font-black font-display leading-none`}>{m.value}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${m.value}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} className={`${m.color} h-full ${m.shadow}`}></motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fallacies */}
            <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-4 relative overflow-hidden">
              <h4 className="text-xs font-black text-red-400 flex items-center gap-2 mb-3 uppercase tracking-widest"><ShieldAlert size={14} /> Fallacies</h4>
              <div className="space-y-2 relative z-10">
                {aiAnalysis.fallacies.length > 0 ? (
                  aiAnalysis.fallacies.map((f, i) => (
                    <div key={i} className="text-sm text-red-200 bg-red-950/60 border border-red-500/30 px-3 py-2 rounded-xl flex items-center gap-2 font-medium">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></div> {f}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-green-400 bg-green-950/30 border border-green-500/30 px-3 py-2 rounded-xl flex items-center gap-2 font-medium">
                    <Sparkles size={14}/> No fallacies detected.
                  </div>
                )}
              </div>
            </div>

            {/* Strongest / Weakest */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-[#0C1510] to-transparent border-l-4 border-green-500 p-4 rounded-r-2xl border-y border-r border-white/5">
                <h4 className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1 flex items-center gap-2"><Target size={12}/> Strongest</h4>
                <p className="text-gray-300 leading-relaxed text-sm">{aiAnalysis.strongestPoint}</p>
              </div>
              <div className="bg-gradient-to-r from-[#150A0A] to-transparent border-l-4 border-orange-500 p-4 rounded-r-2xl border-y border-r border-white/5">
                <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1 flex items-center gap-2"><AlertTriangle size={12}/> Weakest</h4>
                <p className="text-gray-300 leading-relaxed text-sm">{aiAnalysis.weakestPoint}</p>
              </div>
              {aiAnalysis.rebuttalSuggestion && (
                <div className="bg-gradient-to-r from-[#0C0C15] to-transparent border-l-4 border-blue-500 p-4 rounded-r-2xl border-y border-r border-white/5">
                  <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 flex items-center gap-2"><Sparkles size={12}/> Rebuttal Tip</h4>
                  <p className="text-gray-300 leading-relaxed text-sm">{aiAnalysis.rebuttalSuggestion}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
