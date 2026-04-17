import React from 'react';

const CV = () => {
  return (
    <div className="animate-fade-in flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl gradient-text">Curriculum Vitae</h1>
        <p className="text-muted mt-2">sathnarakumarasinghe@gmail.com | +94 71 528 6586</p>
        <p className="text-muted">github.com/SiyumiSathnaraKumarasinghe | Anuradhapura, Sri Lanka</p>
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">Profile Summary</h2>
        <p>Final-year BSc IT Software Engineering student at SLIIT with a GPA of 3.2/4.0 and 9 months of industry internship experience at Hayleys Advantis. Proficient across the full technology stack — React, Angular, Node.js, .NET, Python, and SQL Server. Passionate about backend engineering, clean architecture, and AI/ML applications.</p>
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">Work Experience</h2>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl text-primary">Software Engineering Intern</h3>
            <span className="text-sm text-muted">Feb 2025 – Nov 2025</span>
          </div>
          <p className="text-sm mb-2 font-semibold">MIT Global Solutions Pvt Ltd (Hayleys Advantis Group)</p>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
            <li className="mb-1">Developed Safety Alert App (React Native) and Admin Panel (Angular 16) for OHS management.</li>
            <li className="mb-1">Authored and optimised 20+ SQL Stored Procedures in Microsoft SQL Server.</li>
            <li className="mb-1">Implemented Role-Based Access Control (RBAC) spanning hierarchical clusters.</li>
            <li className="mb-1">Delivered PDF (LaTeX) and CSV exports, saving significant report generation time.</li>
          </ul>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl text-primary">Freelance Mobile Developer</h3>
            <span className="text-sm text-muted">2024 (Part-time)</span>
          </div>
          <p className="text-sm mb-2 font-semibold">Local Restaurant Client</p>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
            <li>Designed and built a cross-platform mobile app (Flutter + Firebase) for order management.</li>
          </ul>
        </div>
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">Technical Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {['React.js', 'Angular', 'React Native', 'Flutter', 'Node.js', 'Express.js', 'Java', '.NET/ASP.NET', 'Python', 'Spring Boot', 'SQL Server', 'MongoDB', 'Firebase', 'Azure DevOps'].map(skill => (
            <span key={skill} className="glass" style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">Key Projects</h2>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg text-primary">Safety Alert App & Admin Panel</h3>
            <p className="text-sm text-muted mb-1">React Native · Angular 16 · .NET 4.6 · SQL Server</p>
            <p className="text-sm">Full-stack OHS safety reporting system delivered during internship. Automated reporting exports.</p>
          </div>
          <div>
            <h3 className="text-lg text-primary">Job Portal Web App</h3>
            <p className="text-sm text-muted mb-1">React · Node.js · Express · MongoDB</p>
            <p className="text-sm">Lead Developer — designed architecture, built RESTful backend API, integrated payment gateway.</p>
          </div>
          <div>
            <h3 className="text-lg text-primary">Automated Resume Screening Tool</h3>
            <p className="text-sm text-muted mb-1">Python · TensorFlow · NLP</p>
            <p className="text-sm">Backend Developer — built AI-based screening system filtering résumés using NLP models.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
