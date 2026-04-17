import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SwotCard = ({ title, items, colorVar }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="glass p-6 rounded-xl relative overflow-hidden cursor-pointer"
      style={{ borderTop: `4px solid var(${colorVar})`, minHeight: '180px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, boxShadow: `0 10px 30px rgba(0,0,0,0.3)` }}
      layout
    >
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ background: `linear-gradient(135deg, transparent, var(${colorVar}))` }}
      />
      <h3 className="text-2xl mb-4" style={{ color: `var(${colorVar})` }}>{title}</h3>
      
      <AnimatePresence>
        {isHovered ? (
          <motion.ul 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm" style={{ paddingLeft: '1rem' }}
          >
            {items && items.split('\n').filter(s=>s).map((s, idx) => <li key={idx} className="mb-2 text-muted">{s}</li>)}
          </motion.ul>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-muted"
          >
            <p>Hover to reveal {items ? items.split('\n').filter(s=>s).length : 0} points...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CareerPlan = ({ data }) => {
  if (!data) return <div className="text-center py-8">Loading Framework...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8"
    >
      <motion.div className="glass-panel text-center" style={{ padding: '4rem 2rem', background: 'url(/cert-placeholder.png) center/cover', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(7, 11, 20, 0.85)', backdropFilter: 'blur(5px)' }}></div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 className="text-4xl gradient-text mb-4">My Vision</h1>
          <p className="text-lg text-muted max-w-3xl mx-auto" style={{ lineHeight: '1.8' }}>"{data.vision}"</p>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-panel">
          <h2 className="text-2xl gradient-text mb-6">Short-Term Horizon</h2>
          <ul style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {data.shortTerm && data.shortTerm.split('\n').filter(i=>i).map((item, i) => (
              <motion.li key={i} whileHover={{ x: 5 }} className="text-muted" style={{ listStyleType: 'square', color: 'var(--text-light)' }}>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-panel">
          <h2 className="text-2xl gradient-text mb-6">Long-Term Trajectory</h2>
          <p className="mb-6 text-muted" style={{ lineHeight: '1.8' }}>{data.longTerm}</p>
          <div className="glass p-5 rounded-xl border border-primary/30">
            <h3 className="text-primary mb-2 flex items-center gap-2">🎯 Target Sector</h3>
            <p className="text-sm font-semibold">{data.targetRoles}</p>
          </div>
        </motion.div>
      </div>

      <div>
        <h2 className="text-3xl gradient-text mb-6 mt-4 text-center">SWOT Analysis Matrix</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <SwotCard title="Strengths" items={data.swot?.strengths} colorVar="--success" />
          <SwotCard title="Weaknesses" items={data.swot?.weaknesses} colorVar="--danger" />
          <SwotCard title="Opportunities" items={data.swot?.opportunities} colorVar="--primary" />
          <SwotCard title="Threats" items={data.swot?.threats} colorVar="--accent" />
        </div>
      </div>
    </motion.div>
  );
};

export default CareerPlan;
