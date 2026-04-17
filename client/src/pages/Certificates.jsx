import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Certificates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/portfolio')
      .then(res => {
        setData(res.data.certificates || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching CMS data', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="animate-fade-in flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl gradient-text">Certifications</h1>
        <p className="text-xl text-muted mt-2">Continuous Professional Development</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {data.map((cert, index) => (
          <div key={index} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl text-primary">{cert.title}</h2>
            </div>
            <div className="text-sm text-muted mb-4 font-semibold">{cert.issuer} • {cert.date}</div>
            
            <div className="glass flex items-center justify-center mb-4" style={{ height: '200px', borderRadius: '8px', overflow: 'hidden', borderStyle: cert.imageUrl ? 'solid' : 'dashed' }}>
              {cert.imageUrl ? (
                <img src={cert.imageUrl} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <p className="text-muted text-sm text-center px-4">
                  [ IMAGE PLACEHOLDER ]<br/>Upload image URL in Admin
                </p>
              )}
            </div>
            
            <p className="text-sm flex-grow">{cert.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
