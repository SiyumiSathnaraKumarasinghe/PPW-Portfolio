import React from 'react';

const CareerPlan = () => {
  return (
    <div className="animate-fade-in flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl gradient-text">Career Development Plan</h1>
        <p className="text-xl text-muted mt-2">Charting My Professional Growth</p>
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">My Vision</h2>
        <p>
          My long-term ambition is to become a Senior Software Engineer specialising in backend systems and AI/ML applications, contributing to technology that makes a meaningful difference — whether within a high-impact startup or a global technology organisation such as Google. I want to be known for building reliable, scalable systems and for leading engineering teams with clarity and empathy.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">Short-Term Goals (6-12 Months)</h2>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li>
              <span className="font-semibold text-primary">Strong GPA:</span> Focus on final year research project; target distinction in PPW.
            </li>
            <li>
              <span className="font-semibold text-primary">Graduate Role:</span> Apply to 10+ companies using STAR interview prep.
            </li>
            <li>
              <span className="font-semibold text-primary">Cloud Skills:</span> Complete AWS Cloud Practitioner cert; practise Kubernetes.
            </li>
            <li>
              <span className="font-semibold text-primary">Open-Source:</span> Make meaningful contributions to 2-3 GitHub projects.
            </li>
          </ul>
        </div>

        <div className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">Long-Term Goals (3-5 Years)</h2>
          <p className="mb-4">
            Hold a Senior Software Engineer or Tech Lead position, contributing to large-scale system architecture in AI/ML or fintech. Mentor junior engineers and build products reaching millions.
          </p>
          <div className="glass p-4 rounded-lg">
            <h3 className="text-primary mb-2">Target Roles</h3>
            <p className="text-sm">Backend / Full-Stack Engineer in AI, FinTech, or SaaS. Preferred environment: Hybrid or remote-first.</p>
          </div>
        </div>
      </div>

      <div className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">SWOT Analysis</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="glass p-4" style={{ borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
            <h3 className="text-lg mb-2">Strengths</h3>
            <ul className="text-sm" style={{ paddingLeft: '1rem' }}>
              <li>Full-stack experience (React, Node, .NET)</li>
              <li>Internship at Hayleys Advantis</li>
              <li>Strong GPA (3.2/4.0)</li>
              <li>Hackathon achievements</li>
            </ul>
          </div>
          <div className="glass p-4" style={{ borderRadius: '8px', borderLeft: '4px solid var(--danger)' }}>
            <h3 className="text-lg mb-2">Weaknesses</h3>
            <ul className="text-sm" style={{ paddingLeft: '1rem' }}>
              <li>Limited cloud infrastructure depth</li>
              <li>Public speaking confidence</li>
            </ul>
          </div>
          <div className="glass p-4" style={{ borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
            <h3 className="text-lg mb-2">Opportunities</h3>
            <ul className="text-sm" style={{ paddingLeft: '1rem' }}>
              <li>Growing demand for AI-integrated software</li>
              <li>SLIIT industry connections</li>
              <li>Open-source contribution pathways</li>
            </ul>
          </div>
          <div className="glass p-4" style={{ borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
            <h3 className="text-lg mb-2">Threats</h3>
            <ul className="text-sm" style={{ paddingLeft: '1rem' }}>
              <li>Highly competitive graduate market</li>
              <li>Rapid technology changes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPlan;
