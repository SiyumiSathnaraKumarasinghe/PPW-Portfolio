import React from 'react';

const Intro = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl gradient-text">Siyumi Sathnarakumarasinghe</h1>
        <p className="text-xl text-muted mt-2">BSc (Hons) IT Specialised in Software Engineering</p>
        <p className="text-muted">SLIIT (Student ID: IT22221414)</p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">About Me</h2>
          <p>
            I am a final-year undergraduate reading for a Bachelor of Science in Information Technology Specialised in Software Engineering at the Sri Lanka Institute of Information Technology (SLIIT). I grew up in Anuradhapura, Sri Lanka, a city steeped in history, and that early environment taught me to appreciate both heritage and innovation. Today, I carry that sense of curiosity into every line of code I write.
          </p>
        </section>

        <section className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">My Journey into Software Engineering</h2>
          <p>
            I chose Software Engineering because I have always been fascinated by the way software transforms abstract ideas into real, tangible solutions that touch people's daily lives. The creativity involved in designing systems, the logic of breaking down complex problems, and the satisfaction of seeing a working product come together — these are what keep me motivated.
          </p>
        </section>

        <section className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">Academic Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="glass" style={{ padding: '1rem', borderRadius: '8px' }}>
              <h3 className="text-lg text-primary">SLIIT</h3>
              <p>BSc (Hons) IT – Software Engineering</p>
              <p className="text-muted text-sm">Expected 2027 | GPA 3.2/4.0</p>
            </div>
            <div className="glass" style={{ padding: '1rem', borderRadius: '8px' }}>
              <h3 className="text-lg text-primary">G.C.E. Advanced Level</h3>
              <p>Biology: B | Physics: C | Chemistry: C</p>
            </div>
            <div className="glass" style={{ padding: '1rem', borderRadius: '8px' }}>
              <h3 className="text-lg text-primary">G.C.E. Ordinary Level</h3>
              <p>9 A's, 1 B</p>
            </div>
          </div>
        </section>

        <section className="glass-panel">
          <h2 className="text-2xl gradient-text mb-4">Experience & Passions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <h3 className="text-xl mb-2">Internship</h3>
              <p className="text-sm">9-month internship at MIT Global Solutions Pvt Ltd (Hayleys Advantis Group), developing the Safety Alert App and Admin Panel. Delivered Organisation View, User Management, and over 20 SQL Stored Procedures reducing reporting time significantly.</p>
            </div>
            <div>
              <h3 className="text-xl mb-2">Hobbies & Values</h3>
              <p className="text-sm">Photography, science-fiction literature, and exploring tech. I value continuous learning, clean code, and integrity. Active member of SLIIT Coding Club and Tech Fest Project Manager.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Intro;
