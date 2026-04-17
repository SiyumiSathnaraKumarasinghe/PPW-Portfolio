import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Journal from './models/Journal.js';

dotenv.config();

const journals = [
  {
    week: 1,
    topic: 'Business Writing',
    date: 'February 2026',
    content: "What I Learned:\nThis week introduced me to the core principles of effective professional writing - conciseness, clarity, courtesy, and audience-awareness.\n\nHow It Applies to Me:\nI realised I had been using informal language in professional contexts without realising it.\n\nWhat Was Challenging:\nThe conciseness exercises were harder than expected.\n\nGoing Forward:\nBefore sending any professional email, I will ask myself: 'Can this be said more directly?'"
  },
  {
    week: 2,
    topic: 'Formal Email Writing',
    date: 'February 2026',
    content: "What I Learned:\nStructured professional emails (subject line, correct sign-off, polite closures).\n\nHow It Applies to Me:\nMy previous emails lacked clear subjects and proper salutations. This has immediate value for my daily workflow.\n\nWhat Was Challenging:\nChoosing the right tone, specifically when to use 'Dear Sir/Madam'.\n\nGoing Forward:\nI will create personal email templates for different professional scenarios."
  },
  {
    week: 3,
    topic: 'Memo Writing',
    date: 'March 2026',
    content: "What I Learned:\nA memo is an internal document - concise, structured, and functional, with a clean header.\n\nHow It Applies to Me:\nThis maps directly to internal Slack updates and sprint planning notes used during my internship.\n\nWhat Was Challenging:\nThe absence of a closing felt deeply unnatural to me.\n\nGoing Forward:\nI will apply this conciseness principle when writing internal project updates."
  },
  {
    week: 4,
    topic: 'Presentation Skills',
    date: 'March 2026',
    content: "What I Learned:\nStructuring presentations (10% beginning, 80% middle, 10% end) and signposting language.\n\nHow It Applies to Me:\nI realized I jump between slides lacking transitions during group project presentations.\n\nWhat Was Challenging:\nNon-verbal communication (eye contact, controlled posture).\n\nGoing Forward:\nI will deliberately use signposting phrases and practice body language."
  },
  {
    week: 5,
    topic: 'Formal Letters & Letters of Application',
    date: 'March 2026',
    content: "What I Learned:\nPrecise structure for application letters (opening, body paragraphs, call to action).\n\nHow It Applies to Me:\nExtremely practically urgent since I am applying for graduate roles.\n\nWhat Was Challenging:\nWriting about my own strengths without appearing arrogant - the key is using concrete evidence.\n\nGoing Forward:\nI will draft a tailored cover letter mapping against this structure."
  },
  {
    week: 6,
    topic: 'Interview Techniques (STAR Method)',
    date: 'April 2026',
    content: "What I Learned:\nThe STAR method (Situation, Task, Action, Result) for competency-based questions.\n\nHow It Applies to Me:\nTurns raw experience into compelling structured answers, perfect for my upcoming graduate software engineering roles.\n\nWhat Was Challenging:\nThe 'Result' step, specifically quantifying group accomplishments.\n\nGoing Forward:\nPractice STAR answers in front of a mirror to correct filler words."
  },
  {
    week: 7,
    topic: 'Telephone Skills',
    date: 'April 2026',
    content: "What I Learned:\nProfessional telephone conventions: answering, taking messages, handling difficult callers.\n\nHow It Applies to Me:\nIn my internship, I had to call vendors and OHS. I realize I sometimes spoke too quickly.\n\nWhat Was Challenging:\nActive listening without interrupting to formulate a response.\n\nGoing Forward:\nPracticing active listening in everyday conversations."
  },
  {
    week: 8,
    topic: 'Report Writing',
    date: 'April 2026',
    content: "What I Learned:\nThe structured format of professional reports: executive summary, headings, etc.\n\nHow It Applies to Me:\nDuring my internship I wrote SRS and User Guides. This objective-setting framework speeds up document structuring.\n\nWhat Was Challenging:\nDefining objectives before writing involves high discipline over my tendency to just type immediately.\n\nGoing Forward:\nI will use this eight-question framework to define goals for my final-year research project."
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ppw-portfolio')
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    await Journal.deleteMany({});
    await Journal.insertMany(journals);
    console.log('Journals seeded successfully!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
