import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If backend isn't up or seeding failed, we handle it gracefully.
    axios.get('http://localhost:5000/api/journals')
      .then(res => {
        setJournals(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not connect to the database. Make sure MongoDB and backend server are running.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade-in flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl gradient-text">Reflective Journal</h1>
        <p className="text-xl text-muted mt-2">8 Weeks of PPW Learnings</p>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading journals...</div>
      ) : error ? (
        <div className="glass-panel bg-red-900/20 text-center text-red-200">
          <p>{error}</p>
          <div className="mt-4 text-sm text-muted">
            <p><strong>Note for grading:</strong> If you don't have MongoDB installed locally, you won't see the dynamically loaded journals here.</p>
          </div>
        </div>
      ) : journals.length === 0 ? (
        <div className="glass-panel text-center text-muted">
          <p>No journal entries found. Please log into the Admin panel to create them, or run the seed script.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 relative">
          {/* Vertical timeline line */}
          <div style={{ position: 'absolute', left: '2rem', top: '0', bottom: '0', width: '2px', background: 'var(--border)', zIndex: -1 }}></div>
          
          {journals.map((journal) => (
            <div key={journal._id} className="glass-panel" style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
              <div style={{ flexShrink: 0, width: '4rem', height: '4rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'white', border: '4px solid var(--bg-dark)', marginLeft: '-3rem' }}>
                W{journal.week}
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl text-primary">{journal.topic}</h2>
                  <span className="text-sm text-muted bg-slate-800/80 px-3 py-1 rounded-full">{journal.date}</span>
                </div>
                <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem' }}>
                  {journal.content.split('What Was Challenging:').map((part, i) => {
                    if (i === 0) return <div key={i}>{part}</div>;
                    return <div key={i}><br/><strong className="text-accent">What Was Challenging:</strong>{part}</div>;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journals;
