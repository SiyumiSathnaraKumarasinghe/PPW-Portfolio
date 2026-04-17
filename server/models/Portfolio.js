import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  intro: {
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    university: { type: String, default: '' },
    aboutMe: { type: String, default: '' },
    journey: { type: String, default: '' },
    gpa: { type: String, default: '' },
    alevel: { type: String, default: '' },
    olevel: { type: String, default: '' },
    experienceSummary: { type: String, default: '' },
    hobbies: { type: String, default: '' }
  },
  cv: {
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    location: { type: String, default: '' },
    summary: { type: String, default: '' },
    skills: { type: String, default: '' }, // We will store as comma-separated string for easy editing
    projects: [{
      title: String,
      tech: String,
      desc: String
    }],
    experience: [{
      title: String,
      date: String,
      company: String,
      details: String // Supports newlines
    }]
  },
  careerPlan: {
    vision: { type: String, default: '' },
    shortTerm: { type: String, default: '' }, // Newlines for points
    longTerm: { type: String, default: '' },
    targetRoles: { type: String, default: '' },
    swot: {
      strengths: { type: String, default: '' }, // Newlines for points
      weaknesses: { type: String, default: '' },
      opportunities: { type: String, default: '' },
      threats: { type: String, default: '' }
    }
  },
  certificates: [{
    title: String,
    issuer: String,
    date: String,
    desc: String,
    imageUrl: String // Placeholder or actual URL
  }]
}, { timestamps: true });

export default mongoose.model('Portfolio', portfolioSchema);
