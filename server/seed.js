import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Journal from './models/Journal.js';
import Portfolio from './models/Portfolio.js';

dotenv.config();

const journals = [
  { week: 1, topic: 'Business Writing', date: 'February 2026', content: "What I Learned:\nThis week introduced me to the core principles of effective professional writing - conciseness, clarity, courtesy, and audience-awareness.\n\nHow It Applies to Me:\nI realised I had been using informal language in professional contexts without realising it.\n\nWhat Was Challenging:\nThe conciseness exercises were harder than expected.\n\nGoing Forward:\nBefore sending any professional email, I will ask myself: 'Can this be said more directly?'" },
  { week: 2, topic: 'Formal Email Writing', date: 'February 2026', content: "What I Learned:\nStructured professional emails (subject line, correct sign-off, polite closures).\n\nHow It Applies to Me:\nMy previous emails lacked clear subjects and proper salutations. This has immediate value for my daily workflow.\n\nWhat Was Challenging:\nChoosing the right tone, specifically when to use 'Dear Sir/Madam'.\n\nGoing Forward:\nI will create personal email templates for different professional scenarios." },
  { week: 3, topic: 'Memo Writing', date: 'March 2026', content: "What I Learned:\nA memo is an internal document - concise, structured, and functional, with a clean header.\n\nHow It Applies to Me:\nThis maps directly to internal Slack updates and sprint planning notes used during my internship.\n\nWhat Was Challenging:\nThe absence of a closing felt deeply unnatural to me.\n\nGoing Forward:\nI will apply this conciseness principle when writing internal project updates." },
  { week: 4, topic: 'Presentation Skills', date: 'March 2026', content: "What I Learned:\nStructuring presentations (10% beginning, 80% middle, 10% end) and signposting language.\n\nHow It Applies to Me:\nI realized I jump between slides lacking transitions during group project presentations.\n\nWhat Was Challenging:\nNon-verbal communication (eye contact, controlled posture).\n\nGoing Forward:\nI will deliberately use signposting phrases and practice body language." },
  { week: 5, topic: 'Formal Letters & Letters of Application', date: 'March 2026', content: "What I Learned:\nPrecise structure for application letters (opening, body paragraphs, call to action).\n\nHow It Applies to Me:\nExtremely practically urgent since I am applying for graduate roles.\n\nWhat Was Challenging:\nWriting about my own strengths without appearing arrogant - the key is using concrete evidence.\n\nGoing Forward:\nI will draft a tailored cover letter mapping against this structure." },
  { week: 6, topic: 'Interview Techniques (STAR Method)', date: 'April 2026', content: "What I Learned:\nThe STAR method (Situation, Task, Action, Result) for competency-based questions.\n\nHow It Applies to Me:\nTurns raw experience into compelling structured answers, perfect for my upcoming graduate software engineering roles.\n\nWhat Was Challenging:\nThe 'Result' step, specifically quantifying group accomplishments.\n\nGoing Forward:\nPractice STAR answers in front of a mirror to correct filler words." },
  { week: 7, topic: 'Telephone Skills', date: 'April 2026', content: "What I Learned:\nProfessional telephone conventions: answering, taking messages, handling difficult callers.\n\nHow It Applies to Me:\nIn my internship, I had to call vendors and OHS. I realize I sometimes spoke too quickly.\n\nWhat Was Challenging:\nActive listening without interrupting to formulate a response.\n\nGoing Forward:\nPracticing active listening in everyday conversations." },
  { week: 8, topic: 'Report Writing', date: 'April 2026', content: "What I Learned:\nThe structured format of professional reports: executive summary, headings, etc.\n\nHow It Applies to Me:\nDuring my internship I wrote SRS and User Guides. This objective-setting framework speeds up document structuring.\n\nWhat Was Challenging:\nDefining objectives before writing involves high discipline over my tendency to just type immediately.\n\nGoing Forward:\nI will use this eight-question framework to define goals for my final-year research project." }
];

const portfolioData = {
  intro: {
    name: 'Siyumi Sathnarakumarasinghe',
    title: 'BSc (Hons) IT Specialised in Software Engineering',
    university: 'SLIIT (Student ID: IT22221414)',
    aboutMe: 'I am a final-year undergraduate reading for a Bachelor of Science in Information Technology Specialised in Software Engineering at the Sri Lanka Institute of Information Technology (SLIIT). I grew up in Anuradhapura, Sri Lanka, a city steeped in history, and that early environment taught me to appreciate both heritage and innovation. Today, I carry that sense of curiosity into every line of code I write.',
    journey: 'I chose Software Engineering because I have always been fascinated by the way software transforms abstract ideas into real, tangible solutions that touch people\'s daily lives. The creativity involved in designing systems, the logic of breaking down complex problems, and the satisfaction of seeing a working product come together — these are what keep me motivated.',
    gpa: 'Expected 2027 | GPA 3.2/4.0',
    alevel: 'Biology: B | Physics: C | Chemistry: C',
    olevel: '9 A\'s, 1 B',
    experienceSummary: '9-month internship at MIT Global Solutions Pvt Ltd (Hayleys Advantis Group), developing the Safety Alert App and Admin Panel. Delivered Organisation View, User Management, and over 20 SQL Stored Procedures reducing reporting time significantly.',
    hobbies: 'Photography, science-fiction literature, and exploring tech. I value continuous learning, clean code, and integrity. Active member of SLIIT Coding Club and Tech Fest Project Manager.'
  },
  cv: {
    email: 'sathnarakumarasinghe@gmail.com',
    phone: '+94 71 528 6586',
    linkedin: 'linkedin.com/in/siyumi-kumarasinghe-a9a88a24b',
    github: 'github.com/SiyumiSathnaraKumarasinghe',
    location: 'Anuradhapura, Sri Lanka',
    summary: 'Final-year BSc IT Software Engineering student at SLIIT with a GPA of 3.2/4.0 and 9 months of industry internship experience at Hayleys Advantis. Proficient across the full technology stack — React, Angular, Node.js, .NET, Python, and SQL Server. Passionate about backend engineering, clean architecture, and AI/ML applications.',
    skills: 'React.js, Angular, React Native, Flutter, Node.js, Express.js, Java, .NET/ASP.NET, Python, Spring Boot, SQL Server, MongoDB, Firebase, Azure DevOps',
    projects: [
      { title: 'Safety Alert App & Admin Panel', tech: 'React Native · Angular 16 · .NET 4.6 · SQL Server', desc: 'Full-stack OHS safety reporting system delivered during internship. Automated reporting exports.' },
      { title: 'Job Portal Web App', tech: 'React · Node.js · Express · MongoDB', desc: 'Lead Developer — designed architecture, built RESTful backend API, integrated payment gateway.' },
      { title: 'Automated Resume Screening Tool', tech: 'Python · TensorFlow · NLP', desc: 'Backend Developer — built AI-based screening system filtering résumés using NLP models.' }
    ],
    experience: [
      { title: 'Software Engineering Intern', date: 'Feb 2025 – Nov 2025', company: 'MIT Global Solutions Pvt Ltd (Hayleys Advantis)', details: 'Developed Safety Alert App (React Native) and Admin Panel (Angular 16) for OHS management.\nAuthored and optimised 20+ SQL Stored Procedures in Microsoft SQL Server.\nImplemented Role-Based Access Control (RBAC) spanning hierarchical clusters.\nDelivered PDF (LaTeX) and CSV exports, saving significant report generation time.' },
      { title: 'Freelance Mobile Developer', date: '2024 (Part-time)', company: 'Local Restaurant Client', details: 'Designed and built a cross-platform mobile app (Flutter + Firebase) for order management.' }
    ]
  },
  careerPlan: {
    vision: 'My long-term ambition is to become a Senior Software Engineer specialising in backend systems and AI/ML applications, contributing to technology that makes a meaningful difference — whether within a high-impact startup or a global technology organisation such as Google. I want to be known for building reliable, scalable systems and for leading engineering teams with clarity and empathy.',
    shortTerm: 'Focus on final year research project; target distinction in PPW.\nApply to 10+ companies using STAR interview prep.\nComplete AWS Cloud Practitioner cert; practise Kubernetes.\nMake meaningful contributions to 2-3 GitHub projects.',
    longTerm: 'Hold a Senior Software Engineer or Tech Lead position, contributing to large-scale system architecture in AI/ML or fintech. Mentor junior engineers and build products reaching millions.',
    targetRoles: 'Backend / Full-Stack Engineer in AI, FinTech, or SaaS. Preferred environment: Hybrid or remote-first.',
    swot: {
      strengths: 'Full-stack experience (React, Node, .NET)\nInternship at Hayleys Advantis\nStrong GPA (3.2/4.0)\nHackathon achievements',
      weaknesses: 'Limited cloud infrastructure depth\nPublic speaking confidence',
      opportunities: 'Growing demand for AI-integrated software\nSLIIT industry connections\nOpen-source contribution pathways',
      threats: 'Highly competitive graduate market\nRapid technology changes'
    }
  },
  certificates: [
    { title: 'Java Programming', issuer: 'Coursera', date: 'March 2025', desc: 'Covered core Java OOP principles, collections, exception handling, and file I/O.', imageUrl: '' },
    { title: 'Data Structures & Algorithms', issuer: 'Udemy', date: 'June 2025', desc: 'In-depth study of arrays, linked lists, trees, graphs, sorting, and dynamic programming.', imageUrl: '' },
    { title: 'Cloud Computing', issuer: 'edX', date: 'September 2025', desc: 'Fundamentals of cloud architecture, deployment models (IaaS, PaaS, SaaS), and core cloud services.', imageUrl: '' },
    { title: 'Web Development with React', issuer: 'freeCodeCamp', date: 'December 2025', desc: 'Hands-on React development including hooks, component architecture, and state management.', imageUrl: '' }
  ]
};

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ppw-portfolio')
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    
    // Seed Journals
    await Journal.deleteMany({});
    await Journal.insertMany(journals);
    console.log('Journals seeded successfully!');

    // Seed Portfolio Configuration
    await Portfolio.deleteMany({});
    await Portfolio.create(portfolioData);
    console.log('Portfolio CMS Data seeded successfully!');

    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
