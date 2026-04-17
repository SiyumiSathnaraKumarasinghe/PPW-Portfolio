import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Intro = ({ data }) => {
  if (!data) return <div className="text-center py-8">Loading Framework...</div>;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8"
    >
      <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '3rem 2rem', background: 'linear-gradient(to right bottom, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.4))' }}>
        <h1 className="text-4xl gradient-text mb-4">Hello, I'm Siyumi.</h1>
        <p className="text-lg text-muted line-clamp-3" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
          {data.aboutMe}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">My Journey into Software Engineering</h2>
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{data.journey}</p>
      </motion.div>

      <motion.div variants={itemVariants} className="glass-panel">
        <h2 className="text-2xl gradient-text mb-6">Academic Profile</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <motion.div whileHover={{ scale: 1.02 }} className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <h3 className="text-lg text-primary mb-1">University</h3>
            <p className="text-sm font-semibold text-muted">{data.university}</p>
            <p className="text-sm mt-2">{data.gpa}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <h3 className="text-lg text-primary mb-1">A-Level</h3>
            <p className="text-sm mt-2">{data.alevel}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <h3 className="text-lg text-primary mb-1">O-Level</h3>
            <p className="text-sm mt-2">{data.olevel}</p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="glass-panel">
        <h2 className="text-2xl gradient-text mb-4">Experience & Passions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 className="text-xl mb-3 text-accent">Internship Highlight</h3>
            <p className="text-sm" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{data.experienceSummary}</p>
          </div>
          <div>
            <h3 className="text-xl mb-3 text-accent">Hobbies & Values</h3>
            <p className="text-sm" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{data.hobbies}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Intro;
