import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Briefcase, BookOpen, GraduationCap, FileText, User, ShieldAlert } from 'lucide-react';
import Intro from './pages/Intro';
import CV from './pages/CV';
import CareerPlan from './pages/CareerPlan';
import Certificates from './pages/Certificates';
import Journals from './pages/Journals';
import Admin from './pages/Admin';

const Navigation = () => {
  const location = useLocation();
  const navLinks = [
    { name: 'About Me', path: '/', icon: <User size={18} /> },
    { name: 'Journals', path: '/journals', icon: <BookOpen size={18} /> },
    { name: 'Career Plan', path: '/career', icon: <Briefcase size={18} /> },
    { name: 'CV', path: '/cv', icon: <FileText size={18} /> },
    { name: 'Certificates', path: '/certificates', icon: <GraduationCap size={18} /> }
  ];

  return (
    <nav className="glass sticky top-0 z-50 mb-8" style={{ padding: '1rem', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--border)' }}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-xl font-bold gradient-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          SK.PORTFOLIO
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-light)',
                fontWeight: location.pathname === link.path ? '600' : '400',
                borderBottom: location.pathname === link.path ? '2px solid var(--primary)' : 'none',
                paddingBottom: '0.25rem'
              }}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <Link to="/admin" title="Admin" style={{ color: 'var(--text-muted)' }}>
            <ShieldAlert size={18} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Navigation />
      <main className="container" style={{ paddingBottom: '4rem' }}>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/career" element={<CareerPlan />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
