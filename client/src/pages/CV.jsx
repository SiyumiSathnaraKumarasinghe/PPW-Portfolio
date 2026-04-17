import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
};

const CV = ({ data }) => {
  if (!data) return <div className="text-center py-8">Loading Framework...</div>;

  const skillsArray = data.skills ? data.skills.split(',').map(s => s.trim()) : [];
  
  // Fake radar data generation based on string mapping for advanced look
  const radarData = [
    { subject: 'Frontend', A: skillsArray.some(s => ['React.js', 'Angular', 'Tailwind'].includes(s)) ? 90 : 60, fullMark: 100 },
    { subject: 'Backend', A: skillsArray.some(s => ['Node.js', 'Express.js', '.NET/ASP.NET'].includes(s)) ? 85 : 50, fullMark: 100 },
    { subject: 'Mobile', A: skillsArray.some(s => ['React Native', 'Flutter'].includes(s)) ? 80 : 40, fullMark: 100 },
    { subject: 'Database', A: skillsArray.some(s => ['SQL Server', 'MongoDB'].includes(s)) ? 85 : 50, fullMark: 100 },
    { subject: 'Cloud/DevOps', A: skillsArray.some(s => ['Azure DevOps', 'Firebase'].includes(s)) ? 75 : 40, fullMark: 100 },
    { subject: 'Languages', A: skillsArray.some(s => ['Java', 'Python'].includes(s)) ? 90 : 60, fullMark: 100 },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="flex flex-col gap-8"
    >
      <motion.div variants={itemVariants} className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">Profile Summary</h2>
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{data.summary}</p>
      </motion.div>

      <motion.div variants={itemVariants} className="glass-panel">
        <h2 className="text-2xl gradient-text mb-6">Technical Architecture</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {skillsArray.map((skill, idx) => (
                <motion.span 
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.4)' }}
                  key={idx} 
                  className="glass" 
                  style={{ padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem' }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
          <div style={{ height: '300px' }} className="hidden lg:block lg:flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Proficiency" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="glass-panel">
        <h2 className="text-2xl gradient-text mb-6">Work Experience</h2>
        <div className="flex flex-col gap-6">
          {data.experience && data.experience.map((exp, idx) => (
            <motion.div 
              whileHover={{ x: 5 }}
              key={idx} 
              style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1.5rem', position: 'relative' }}
            >
              <div style={{ position: 'absolute', left: '-7px', top: '5px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xl text-light">{exp.title}</h3>
                <span className="text-sm text-primary font-semibold bg-blue-900/40 px-3 py-1 rounded-full">{exp.date}</span>
              </div>
              <p className="text-sm mb-3 font-semibold text-muted">{exp.company}</p>
              <ul style={{ paddingLeft: '1rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                {exp.details && exp.details.split('\n').filter(d=>d).map((detail, i) => (
                  <li key={i} className="mb-2" style={{ listStyleType: 'circle' }}>{detail}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">Key Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {data.projects && data.projects.map((proj, idx) => (
            <motion.div 
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.2)' }}
              key={idx} 
              className="glass p-5 rounded-xl border border-[rgba(255,255,255,0.05)]"
            >
              <h3 className="text-lg text-accent mb-1">{proj.title}</h3>
              <p className="text-xs text-muted mb-3 font-mono bg-black/30 w-fit px-2 py-1 rounded">{proj.tech}</p>
              <p className="text-sm">{proj.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CV;
