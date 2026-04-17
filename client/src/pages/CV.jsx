import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CV = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/portfolio')
      .then(res => {
        setData(res.data.cv);
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
        <h1 className="text-4xl gradient-text">Curriculum Vitae</h1>
        <p className="text-muted mt-2">{data.email} | {data.phone}</p>
        <p className="text-muted">{data.linkedin} | {data.github}</p>
        <p className="text-muted">{data.location}</p>
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">Profile Summary</h2>
        <p style={{ whiteSpace: 'pre-wrap' }}>{data.summary}</p>
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">Work Experience</h2>
        {data.experience && data.experience.map((exp, idx) => (
          <div className="mb-6" key={idx}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl text-primary">{exp.title}</h3>
              <span className="text-sm text-muted">{exp.date}</span>
            </div>
            <p className="text-sm mb-2 font-semibold">{exp.company}</p>
            <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
              {exp.details.split('\n').map((detail, i) => detail && <li key={i} className="mb-1">{detail}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">Technical Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {data.skills && data.skills.split(',').map(skill => skill.trim()).map((skill, idx) => (
            <span key={idx} className="glass" style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">Key Projects</h2>
        <div className="flex flex-col gap-4">
          {data.projects && data.projects.map((proj, idx) => (
            <div key={idx}>
              <h3 className="text-lg text-primary">{proj.title}</h3>
              <p className="text-sm text-muted mb-1">{proj.tech}</p>
              <p className="text-sm">{proj.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CV;
