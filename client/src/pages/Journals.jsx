import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/journals')
      .then(res => {
        setJournals(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8 pb-12">
      <div className="glass-panel text-center">
        <h1 className="text-4xl gradient-text">Reflective Journal</h1>
        <p className="text-xl text-muted mt-2">The PPW Roadmap</p>
      </div>

      {loading ? (
        <div className="text-center py-8">Syncing roadmap...</div>
      ) : journals.length === 0 ? (
        <div className="glass-panel text-center text-muted">No journal entries found.</div>
      ) : (
        <div className="relative mt-12 mx-auto" style={{ maxWidth: '900px', width: '100%' }}>
          {/* Winding Center Line */}
          <div className="hidden md:block" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '0', bottom: '0', width: '4px', background: 'linear-gradient(to bottom, var(--primary), var(--accent), var(--primary))', opacity: 0.3, zIndex: -1 }}></div>
          
          {journals.map((journal, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={journal._id} 
                initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  marginBottom: '4rem',
                  alignItems: 'center'
                }}
              >
                
                {/* Visual Node */}
                <motion.div 
                  whileHover={{ scale: 1.2, boxShadow: '0 0 30px rgba(59,130,246,0.8)' }}
                  className="md:absolute"
                  style={{ 
                    left: '50%', transform: 'translateX(-50%)', top: '20px', 
                    width: '60px', height: '60px', borderRadius: '50%', 
                    background: 'var(--bg-dark)', border: '4px solid var(--primary)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontWeight: 'bold', fontSize: '1.2rem', color: 'white', zIndex: 10,
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  W{journal.week}
                </motion.div>

                {/* Card Container depending on Even/Odd */}
                <div className="w-full" style={{ display: 'flex', justifyContent: isEven ? 'flex-start' : 'flex-end', paddingRight: isEven ? '55%' : '0', paddingLeft: isEven ? '0' : '55%', marginTop: '40px' }}>
                  <div className="glass-panel w-full" style={{ position: 'relative' }}>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl text-primary">{journal.topic}</h2>
                    </div>
                    <span className="text-xs text-muted mb-4 inline-block font-mono bg-blue-900/30 px-3 py-1 rounded">{journal.date}</span>
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: '1.8' }}>
                      {journal.content.split('What Was Challenging:').map((part, i) => {
                        if (i === 0) return <div key={i}>{part}</div>;
                        return (
                          <div key={i} className="mt-4 p-4 rounded-lg bg-black/20" style={{ borderLeft: '3px solid var(--accent)' }}>
                            <strong className="text-accent block mb-2">What Was Challenging:</strong>
                            {part}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Journals;
