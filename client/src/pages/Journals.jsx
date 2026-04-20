import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    axios.get(`${API_URL}/api/journals`)
      .then(res => {
        setJournals(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8 pb-12">
      <style>{`
        .horizontal-scroll-container {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 2rem;
          padding-bottom: 2rem;
          /* Hide scrollbar for Chrome, Safari and Opera */
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .horizontal-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .journal-card-wrapper {
          min-width: 350px;
          max-width: 400px;
          flex-shrink: 0;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
        }
        .journal-node {
          width: 50px; height: 50px;
          border-radius: 50%;
          background: var(--bg-dark);
          border: 3px solid var(--primary);
          display: flex; align-items: center; justify-content: center;
          font-weight: bold; font-size: 1.1rem; color: white;
          z-index: 10;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
          margin-bottom: -25px;
          margin-left: 20px;
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="glass-panel text-left w-full md:w-auto mb-4 md:mb-0">
          <h1 className="text-4xl gradient-text">Reflective Journal</h1>
          <p className="text-xl text-muted mt-2">The PPW Roadmap</p>
        </div>
        
        {/* Navigation Arrows */}
        {!loading && journals.length > 0 && (
          <div className="flex gap-4">
            <button onClick={() => scroll('left')} className="p-3 rounded-full glass hover:bg-white/10 transition-colors">
              <ChevronLeft size={24} className="text-primary" />
            </button>
            <button onClick={() => scroll('right')} className="p-3 rounded-full glass hover:bg-white/10 transition-colors">
              <ChevronRight size={24} className="text-primary" />
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8">Syncing roadmap...</div>
      ) : journals.length === 0 ? (
        <div className="glass-panel text-center text-muted">No journal entries found.</div>
      ) : (
        <div className="relative w-full overflow-hidden mt-8">
          {/* Subtle horizontal connective line */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20 top-[24px] z-0"></div>

          <div ref={scrollRef} className="horizontal-scroll-container relative z-10 pt-2 px-2">
            {journals.map((journal, index) => {
              return (
                <motion.div 
                  key={journal._id} 
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="journal-card-wrapper"
                >
                  {/* Visual Node */}
                  <motion.div 
                    whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(59,130,246,0.8)' }}
                    className="journal-node"
                  >
                    W{journal.week}
                  </motion.div>

                  {/* Card Container */}
                  <div className="glass-panel w-full flex-grow pt-10" style={{ position: 'relative' }}>
                    <div className="flex flex-col mb-4">
                      <h2 className="text-xl text-primary font-semibold mb-2">{journal.topic}</h2>
                      <span className="text-xs text-muted font-mono bg-blue-900/30 px-3 py-1 rounded inline-block w-fit">{journal.date}</span>
                    </div>
                    <div className="pr-2" style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: '1.7', maxHeight: '400px', overflowY: 'auto' }}>
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
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Journals;
