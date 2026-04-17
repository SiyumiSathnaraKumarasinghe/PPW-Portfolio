import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Intro = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/portfolio')
      .then(res => {
        setData(res.data.intro);
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
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl gradient-text">{data.name}</h1>
        <p className="text-xl text-muted mt-2">{data.title}</p>
        <p className="text-muted">{data.university}</p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">About Me</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{data.aboutMe}</p>
        </section>

        <section className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">My Journey into Software Engineering</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{data.journey}</p>
        </section>

        <section className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">Academic Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="glass" style={{ padding: '1rem', borderRadius: '8px' }}>
              <h3 className="text-lg text-primary">University</h3>
              <p className="text-sm">{data.gpa}</p>
            </div>
            <div className="glass" style={{ padding: '1rem', borderRadius: '8px' }}>
              <h3 className="text-lg text-primary">A-Level</h3>
              <p className="text-sm">{data.alevel}</p>
            </div>
            <div className="glass" style={{ padding: '1rem', borderRadius: '8px' }}>
              <h3 className="text-lg text-primary">O-Level</h3>
              <p className="text-sm">{data.olevel}</p>
            </div>
          </div>
        </section>

        <section className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">Experience & Passions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <h3 className="text-xl mb-2">Internship Highlight</h3>
              <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{data.experienceSummary}</p>
            </div>
            <div>
              <h3 className="text-xl mb-2">Hobbies & Values</h3>
              <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{data.hobbies}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Intro;
