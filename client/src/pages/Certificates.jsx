import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Certificates = ({ data }) => {
  if (!data) return <div className="text-center py-8">Loading Framework...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8"
    >
      <div className="glass-panel text-center">
        <h1 className="text-4xl gradient-text">Certifications</h1>
        <p className="text-xl text-muted mt-2">Continuous Professional Development</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {data.map((cert, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -10, boxShadow: '0 15px 40px rgba(0,0,0,0.4)' }}
            className="glass-panel" 
            style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
          >
            <div className="text-sm text-primary mb-1 font-semibold tracking-wider">
              {cert.issuer.toUpperCase()}
            </div>
            <h2 className="text-xl text-light mb-4">{cert.title}</h2>
            
            <div className="glass flex items-center justify-center mb-6" style={{ height: '220px', borderRadius: '12px', overflow: 'hidden', borderStyle: cert.imageUrl ? 'solid' : 'none', background: 'rgba(0,0,0,0.2)' }}>
              {cert.imageUrl ? (
                <img src={cert.imageUrl} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <img src="/cert-placeholder.png" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
            
            <div className="flex justify-between items-end mt-auto">
              <p className="text-sm text-muted" style={{ maxWidth: '70%', lineHeight: '1.6' }}>{cert.desc}</p>
              <span className="text-xs font-mono bg-blue-900/30 text-primary px-3 py-1 rounded-full">{cert.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certificates;
