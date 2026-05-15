import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LandingPage from './pages/LandingPage';
import DebateArena from './pages/DebateArena';
import Dashboard from './pages/Dashboard';
import CreateRoom from './pages/CreateRoom';
import Leaderboard from './pages/Leaderboard';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import PageTransition from './components/layout/PageTransition';
import SplashScreen from './components/layout/SplashScreen';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/arena" element={<PageTransition><DebateArena /></PageTransition>} />
        <Route path="/create-room" element={<PageTransition><CreateRoom /></PageTransition>} />
        <Route path="/leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
        <Route path="/analytics" element={<PageTransition><Analytics /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-[#05050A] flex flex-col relative overflow-hidden">
        {/* Persistent Background Effects */}
        <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen"></div>
        <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-accent/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen"></div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          {!showSplash && <AnimatedRoutes />}
        </div>
      </div>
    </Router>
  );
}

export default App;
