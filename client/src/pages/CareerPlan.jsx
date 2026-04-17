import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CareerPlan = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/portfolio')
      .then(res => {
        setData(res.data.careerPlan);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching CMS data', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!data) return <div className="text-center py-8 text-danger">Failed to load content.</div>;

  return (
    <div className="animate-fade-in flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl gradient-text">Career Development Plan</h1>
        <p className="text-xl text-muted mt-2">Charting My Professional Growth</p>
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">My Vision</h2>
        <p style={{ whiteSpace: 'pre-wrap' }}>{data.vision}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">Short-Term Goals (6-12 Months)</h2>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {data.shortTerm && data.shortTerm.split('\n').map((item, i) => item && <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">Long-Term Goals (3-5 Years)</h2>
          <p className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>{data.longTerm}</p>
          <div className="glass p-4 rounded-lg">
            <h3 className="text-primary mb-2">Target Roles & Sector</h3>
            <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{data.targetRoles}</p>
          </div>
        </div>
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">SWOT Analysis</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="glass p-4" style={{ borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
            <h3 className="text-lg mb-2">Strengths</h3>
            <ul className="text-sm" style={{ paddingLeft: '1rem' }}>
              {data.swot?.strengths.split('\n').map((s, i) => s && <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="glass p-4" style={{ borderRadius: '8px', borderLeft: '4px solid var(--danger)' }}>
            <h3 className="text-lg mb-2">Weaknesses</h3>
            <ul className="text-sm" style={{ paddingLeft: '1rem' }}>
              {data.swot?.weaknesses.split('\n').map((s, i) => s && <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="glass p-4" style={{ borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
            <h3 className="text-lg mb-2">Opportunities</h3>
            <ul className="text-sm" style={{ paddingLeft: '1rem' }}>
              {data.swot?.opportunities.split('\n').map((s, i) => s && <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="glass p-4" style={{ borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
            <h3 className="text-lg mb-2">Threats</h3>
            <ul className="text-sm" style={{ paddingLeft: '1rem' }}>
              {data.swot?.threats.split('\n').map((s, i) => s && <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPlan;
