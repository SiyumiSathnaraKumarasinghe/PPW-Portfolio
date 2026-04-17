import React from 'react';

const Certificates = () => {
  const certs = [
    { title: 'Java Programming', issuer: 'Coursera', date: 'March 2025', desc: 'Covered core Java OOP principles, collections, exception handling, and file I/O.' },
    { title: 'Data Structures & Algorithms', issuer: 'Udemy', date: 'June 2025', desc: 'In-depth study of arrays, linked lists, trees, graphs, sorting, and dynamic programming.' },
    { title: 'Cloud Computing', issuer: 'edX', date: 'September 2025', desc: 'Fundamentals of cloud architecture, deployment models (IaaS, PaaS, SaaS), and core cloud services.' },
    { title: 'Web Development with React', issuer: 'freeCodeCamp', date: 'December 2025', desc: 'Hands-on React development including hooks, component architecture, and state management.' }
  ];

  return (
    <div className="animate-fade-in flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl gradient-text">Certifications</h1>
        <p className="text-xl text-muted mt-2">Continuous Professional Development</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {certs.map((cert, index) => (
          <div key={index} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl text-primary">{cert.title}</h2>
            </div>
            <div className="text-sm text-muted mb-4 font-semibold">{cert.issuer} • {cert.date}</div>
            
            <div className="glass flex items-center justify-center mb-4" style={{ height: '200px', borderRadius: '8px', borderStyle: 'dashed' }}>
              <p className="text-muted text-sm text-center px-4">
                [ CERTIFICATE IMAGE PLACEHOLDER ]<br/>Upload image here
              </p>
            </div>
            
            <p className="text-sm flex-grow">{cert.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
