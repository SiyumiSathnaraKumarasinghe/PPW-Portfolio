import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Briefcase, BookOpen, GraduationCap, FileText, User, ShieldAlert, Globe, Link2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import Intro from './pages/Intro';
import CV from './pages/CV';
import CareerPlan from './pages/CareerPlan';
import Certificates from './pages/Certificates';
import Journals from './pages/Journals';
import Admin from './pages/Admin';

const DesktopSidebar = ({ data }) => {
  const location = useLocation();
  const navLinks = [
    { name: 'About Me', path: '/', icon: <User size={18} /> },
    { name: 'Reflective Journal', path: '/journals', icon: <BookOpen size={18} /> },
    { name: 'Career Plan', path: '/career', icon: <Briefcase size={18} /> },
    { name: 'Curriculum Vitae', path: '/cv', icon: <FileText size={18} /> },
    { name: 'Certifications', path: '/certificates', icon: <GraduationCap size={18} /> },
    { name: 'Admin Dashboard', path: '/admin', icon: <ShieldAlert size={18} /> }
  ];

  return (
    <motion.aside 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="glass-panel sticky top-12"
      style={{ top: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <div className="text-center">
        <div style={{ width: '150px', height: '150px', margin: '0 auto 1rem auto', borderRadius: '24px', overflow: 'hidden', border: '2px solid var(--border)' }}>
          <img src="/profile.jpg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h2 className="text-2xl font-bold">{data?.intro?.name || 'Loading...'}</h2>
        <p className="text-primary text-sm mt-1">{data?.intro?.title}</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navLinks.map(link => (
          <Link 
            key={link.path}
            to={link.path}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: location.pathname === link.path ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: location.pathname === link.path ? 'var(--text-light)' : 'var(--text-muted)',
              border: location.pathname === link.path ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease',
              fontWeight: location.pathname === link.path ? '600' : '400'
            }}
            className="hover:text-light"
          >
            <span style={{ color: location.pathname === link.path ? 'var(--primary)' : 'inherit' }}>{link.icon}</span>
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <a href={`mailto:${data?.cv?.email}`} className="text-muted hover:text-primary transition-colors"><Mail size={20} /></a>
        {data?.cv?.linkedin && <a href={`https://${data.cv.linkedin}`} target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors"><Link2 size={20} /></a>}
        {data?.cv?.github && <a href={`https://${data.cv.github}`} target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors"><Globe size={20} /></a>}
      </div>
    </motion.aside>
  );
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    axios.get(`${API_URL}/api/portfolio`)
      .then(res => setPortfolioData(res.data))
      .catch(err => console.error("Could not fetch master DB", err));
  }, []);

  return (
    <div className="container layout-wrapper">
      <DesktopSidebar data={portfolioData} />
      <main>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Intro data={portfolioData?.intro} />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/career" element={<CareerPlan data={portfolioData?.careerPlan} />} />
            <Route path="/cv" element={<CV data={portfolioData?.cv} />} />
            <Route path="/certificates" element={<Certificates data={portfolioData?.certificates} />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </PageTransition>
      </main>
    </div>
  );
};

export default App;
