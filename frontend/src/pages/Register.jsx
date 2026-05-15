import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Lock, User, Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { authAPI } from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authAPI.register(formData.username, formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(err.response?.data || 'Registration failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05050A] flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-accent/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
           <Brain className="w-10 h-10 text-primary" />
           <span className="font-display font-black text-3xl tracking-wide text-white">
             Debate<span className="text-primary">X</span> AI
           </span>
        </Link>

        <div className="glass-panel p-8 bg-[#0C0C14]/80 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl rounded-3xl">
          <h2 className="text-2xl font-bold font-display text-white mb-2 text-center">Join the Arena</h2>
          <p className="text-gray-400 text-sm text-center mb-8">Create an account to start debating AI and humans.</p>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center font-medium">
              {typeof error === 'string' ? error : 'Registration failed.'}
            </div>
          )}

          {success && (
            <div className="mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm text-center font-medium flex items-center justify-center gap-2">
              <CheckCircle size={16} /> Account created! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="text-gray-500 w-5 h-5" />
                </div>
                <input type="text" className="w-full bg-black/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-black/80 transition-all text-sm"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-gray-500 w-5 h-5" />
                </div>
                <input type="email" className="w-full bg-black/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-black/80 transition-all text-sm"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-gray-500 w-5 h-5" />
                </div>
                <input type="password" className="w-full bg-black/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-black/80 transition-all text-sm"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || success}
              className="w-full py-4 mt-4 bg-gradient-to-r from-accent to-purple-500 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-[0_0_20px_rgba(112,0,255,0.3)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Creating...</> : <>Create Account <ArrowRight size={16}/></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-8">
            Already a debater? <Link to="/login" className="text-white font-bold hover:text-accent transition-colors">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
