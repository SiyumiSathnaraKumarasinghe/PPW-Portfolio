import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, LogIn, Plus, Edit2, Trash2, X, Save } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('journals');

  // Journals State
  const [journals, setJournals] = useState([]);
  const [isEditingJournal, setIsEditingJournal] = useState(false);
  const [currentJournal, setCurrentJournal] = useState({ week: '', topic: '', date: '', content: '' });

  // Portfolio State (CMS)
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [jRes, pRes] = await Promise.all([
        axios.get('http://localhost:5000/api/journals'),
        axios.get('http://localhost:5000/api/portfolio')
      ]);
      setJournals(jRes.data);
      setPortfolio(pRes.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching data. Is backend/MongoDB running?');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { password });
      if (res.data.success) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      setLoginError('Invalid password or backend not running');
    }
  };

  const saveJournal = async (e) => {
    e.preventDefault();
    try {
      if (currentJournal._id) {
        await axios.put(`http://localhost:5000/api/journals/${currentJournal._id}`, currentJournal);
      } else {
        await axios.post('http://localhost:5000/api/journals', currentJournal);
      }
      setIsEditingJournal(false);
      fetchData();
    } catch (err) {
      alert('Error saving journal');
    }
  };

  const deleteJournal = async (id) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      try {
        await axios.delete(`http://localhost:5000/api/journals/${id}`);
        fetchData();
      } catch (err) {
        alert('Error deleting journal');
      }
    }
  };

  const savePortfolio = async (e) => {
    if (e) e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/portfolio', portfolio);
      fetchData();
      alert('Portfolio settings saved successfully!');
    } catch (err) {
      alert('Error saving portfolio data');
    }
  };

  const handlePortfolioChange = (section, field, value) => {
    setPortfolio(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSwotChange = (field, value) => {
    setPortfolio(prev => ({
      ...prev,
      careerPlan: {
        ...prev.careerPlan,
        swot: { ...prev.careerPlan.swot, [field]: value }
      }
    }));
  };

  const handleArrayChange = (section, arrayField, index, objField, value) => {
    if (arrayField) {
      const updatedArray = [...portfolio[section][arrayField]];
      updatedArray[index][objField] = value;
      handlePortfolioChange(section, arrayField, updatedArray);
    } else {
      const updatedArray = [...portfolio[section]];
      updatedArray[index][objField] = value;
      setPortfolio(prev => ({ ...prev, [section]: updatedArray }));
    }
  };

  const addArrayItem = (section, arrayField, defaultObj) => {
    if (arrayField) {
      const updatedArray = [...(portfolio[section][arrayField] || []), defaultObj];
      handlePortfolioChange(section, arrayField, updatedArray);
    } else {
      const updatedArray = [...(portfolio[section] || []), defaultObj];
      setPortfolio(prev => ({ ...prev, [section]: updatedArray }));
    }
  };

  const removeArrayItem = (section, arrayField, index) => {
    if (arrayField) {
      const updatedArray = portfolio[section][arrayField].filter((_, i) => i !== index);
      handlePortfolioChange(section, arrayField, updatedArray);
    } else {
      const updatedArray = portfolio[section].filter((_, i) => i !== index);
      setPortfolio(prev => ({ ...prev, [section]: updatedArray }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-full mt-20 animate-fade-in">
        <form onSubmit={handleLogin} className="glass-panel w-full max-w-md text-center">
          <ShieldAlert size={48} className="mx-auto text-primary mb-4" />
          <h2 className="text-2xl gradient-text mb-6">CMS Admin Access</h2>
          <div className="input-group">
            <input type="password" placeholder="Enter password" className="input-field text-center" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {loginError && <p className="text-danger text-sm mb-4">{loginError}</p>}
          <button type="submit" className="btn btn-primary w-full justify-center">
            <LogIn size={18} /> Login
          </button>
        </form>
      </div>
    );
  }

  const tabs = ['journals', 'intro', 'cv', 'careerPlan', 'certificates'];

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl gradient-text">CMS Dashboard</h1>
        {activeTab !== 'journals' && (
          <button onClick={savePortfolio} className="btn btn-success" style={{ background: 'var(--success)' }}>
            <Save size={18} /> Save Changes
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {tab === 'careerPlan' ? 'Career Plan' : tab}
          </button>
        ))}
      </div>

      {/* --- JOURNALS TAB --- */}
      {activeTab === 'journals' && (
        <div className="animate-fade-in flex flex-col gap-6 mt-4">
          <div className="flex justify-end">
            <button onClick={() => { setCurrentJournal({ week: '', topic: '', date: '', content: '' }); setIsEditingJournal(true); }} className="btn btn-primary">
              <Plus size={18} /> New Entry
            </button>
          </div>

          {isEditingJournal ? (
            <form onSubmit={saveJournal} className="glass-panel animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-primary">{currentJournal._id ? 'Edit Entry' : 'Create Entry'}</h2>
                <button type="button" onClick={() => setIsEditingJournal(false)} className="text-muted hover:text-danger"><X size={24} /></button>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="input-group flex-1">
                  <label className="input-label">Week (Number)</label>
                  <input type="number" required className="input-field" value={currentJournal.week} onChange={e => setCurrentJournal({...currentJournal, week: e.target.value})} />
                </div>
                <div className="input-group flex-1">
                  <label className="input-label">Date</label>
                  <input type="text" required className="input-field" value={currentJournal.date} onChange={e => setCurrentJournal({...currentJournal, date: e.target.value})} />
                </div>
              </div>
              <div className="input-group mb-4">
                <label className="input-label">Topic</label>
                <input type="text" required className="input-field" value={currentJournal.topic} onChange={e => setCurrentJournal({...currentJournal, topic: e.target.value})} />
              </div>
              <div className="input-group mb-6">
                <label className="input-label">Content</label>
                <textarea required className="input-field" rows="8" value={currentJournal.content} onChange={e => setCurrentJournal({...currentJournal, content: e.target.value})}></textarea>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary px-8">Save Journal</button>
              </div>
            </form>
          ) : null}

          <div className="glass-panel">
            {journals.length === 0 ? <p className="text-center text-muted">No journal entries found.</p> : (
              <table className="w-full text-left" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th className="pb-3 text-muted">Week</th>
                    <th className="pb-3 text-muted">Topic</th>
                    <th className="pb-3 text-muted text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {journals.map(j => (
                    <tr key={j._id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="py-3 font-semibold">{j.week}</td>
                      <td className="py-3">{j.topic}</td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => { setCurrentJournal(j); setIsEditingJournal(true); }} className="btn btn-outline" style={{ padding: '0.4rem' }}><Edit2 size={16} /></button>
                          <button onClick={() => deleteJournal(j._id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* --- INTRO TAB --- */}
      {activeTab === 'intro' && portfolio && (
        <div className="glass-panel animate-fade-in flex flex-col gap-4">
          <h2 className="text-xl text-primary mb-2">Introduction Details</h2>
          <div className="flex gap-4">
            <div className="input-group flex-1"><label className="input-label">Name</label><input type="text" className="input-field" value={portfolio.intro.name} onChange={e => handlePortfolioChange('intro', 'name', e.target.value)} /></div>
            <div className="input-group flex-1"><label className="input-label">Title</label><input type="text" className="input-field" value={portfolio.intro.title} onChange={e => handlePortfolioChange('intro', 'title', e.target.value)} /></div>
          </div>
          <div className="input-group"><label className="input-label">University String</label><input type="text" className="input-field" value={portfolio.intro.university} onChange={e => handlePortfolioChange('intro', 'university', e.target.value)} /></div>
          <div className="input-group"><label className="input-label">About Me (Paragraph)</label><textarea rows="5" className="input-field" value={portfolio.intro.aboutMe} onChange={e => handlePortfolioChange('intro', 'aboutMe', e.target.value)}></textarea></div>
          <div className="input-group"><label className="input-label">My Journey (Paragraph)</label><textarea rows="5" className="input-field" value={portfolio.intro.journey} onChange={e => handlePortfolioChange('intro', 'journey', e.target.value)}></textarea></div>
          <div className="flex gap-4">
            <div className="input-group flex-1"><label className="input-label">GPA Details</label><input type="text" className="input-field" value={portfolio.intro.gpa} onChange={e => handlePortfolioChange('intro', 'gpa', e.target.value)} /></div>
            <div className="input-group flex-1"><label className="input-label">A-Level Details</label><input type="text" className="input-field" value={portfolio.intro.alevel} onChange={e => handlePortfolioChange('intro', 'alevel', e.target.value)} /></div>
            <div className="input-group flex-1"><label className="input-label">O-Level Details</label><input type="text" className="input-field" value={portfolio.intro.olevel} onChange={e => handlePortfolioChange('intro', 'olevel', e.target.value)} /></div>
          </div>
          <div className="input-group"><label className="input-label">Experience Highlight (Paragraph)</label><textarea rows="3" className="input-field" value={portfolio.intro.experienceSummary} onChange={e => handlePortfolioChange('intro', 'experienceSummary', e.target.value)}></textarea></div>
          <div className="input-group"><label className="input-label">Hobbies (Paragraph)</label><textarea rows="3" className="input-field" value={portfolio.intro.hobbies} onChange={e => handlePortfolioChange('intro', 'hobbies', e.target.value)}></textarea></div>
        </div>
      )}

      {/* --- CV TAB --- */}
      {activeTab === 'cv' && portfolio && (
        <div className="animate-fade-in flex flex-col gap-6">
          <div className="glass-panel">
            <h2 className="text-xl text-primary mb-4">Basic CV Info</h2>
            <div className="flex gap-4">
              <div className="input-group flex-1"><label className="input-label">Email</label><input type="text" className="input-field" value={portfolio.cv.email} onChange={e => handlePortfolioChange('cv', 'email', e.target.value)} /></div>
              <div className="input-group flex-1"><label className="input-label">Phone</label><input type="text" className="input-field" value={portfolio.cv.phone} onChange={e => handlePortfolioChange('cv', 'phone', e.target.value)} /></div>
            </div>
            <div className="flex gap-4">
              <div className="input-group flex-1"><label className="input-label">LinkedIn</label><input type="text" className="input-field" value={portfolio.cv.linkedin} onChange={e => handlePortfolioChange('cv', 'linkedin', e.target.value)} /></div>
              <div className="input-group flex-1"><label className="input-label">GitHub</label><input type="text" className="input-field" value={portfolio.cv.github} onChange={e => handlePortfolioChange('cv', 'github', e.target.value)} /></div>
            </div>
            <div className="input-group"><label className="input-label">Location</label><input type="text" className="input-field" value={portfolio.cv.location} onChange={e => handlePortfolioChange('cv', 'location', e.target.value)} /></div>
            <div className="input-group"><label className="input-label">Profile Summary</label><textarea rows="4" className="input-field" value={portfolio.cv.summary} onChange={e => handlePortfolioChange('cv', 'summary', e.target.value)}></textarea></div>
            <div className="input-group"><label className="input-label">Skills (Comma-separated)</label><input type="text" className="input-field" value={portfolio.cv.skills} onChange={e => handlePortfolioChange('cv', 'skills', e.target.value)} /></div>
          </div>

          <div className="glass-panel">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-primary">Experience</h2>
              <button onClick={() => addArrayItem('cv', 'experience', { title: '', date: '', company: '', details: '' })} className="btn btn-outline" style={{ padding: '0.2rem 0.5rem' }}><Plus size={16} /> Add</button>
            </div>
            {portfolio.cv.experience.map((exp, idx) => (
              <div key={idx} className="glass p-4 mb-4 rounded-lg relative">
                <button onClick={() => removeArrayItem('cv', 'experience', idx)} className="absolute top-2 right-2 text-muted hover:text-danger"><Trash2 size={16} /></button>
                <div className="flex gap-4">
                  <div className="input-group flex-1"><label className="input-label text-sm">Title</label><input type="text" className="input-field" value={exp.title} onChange={e => handleArrayChange('cv', 'experience', idx, 'title', e.target.value)} /></div>
                  <div className="input-group flex-1"><label className="input-label text-sm">Date</label><input type="text" className="input-field" value={exp.date} onChange={e => handleArrayChange('cv', 'experience', idx, 'date', e.target.value)} /></div>
                </div>
                <div className="input-group"><label className="input-label text-sm">Company</label><input type="text" className="input-field" value={exp.company} onChange={e => handleArrayChange('cv', 'experience', idx, 'company', e.target.value)} /></div>
                <div className="input-group"><label className="input-label text-sm">Details (Newlines for bullets)</label><textarea rows="3" className="input-field" value={exp.details} onChange={e => handleArrayChange('cv', 'experience', idx, 'details', e.target.value)}></textarea></div>
              </div>
            ))}
          </div>

          <div className="glass-panel">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-primary">Projects</h2>
              <button onClick={() => addArrayItem('cv', 'projects', { title: '', tech: '', desc: '' })} className="btn btn-outline" style={{ padding: '0.2rem 0.5rem' }}><Plus size={16} /> Add</button>
            </div>
            {portfolio.cv.projects.map((proj, idx) => (
              <div key={idx} className="glass p-4 mb-4 rounded-lg relative">
                <button onClick={() => removeArrayItem('cv', 'projects', idx)} className="absolute top-2 right-2 text-muted hover:text-danger"><Trash2 size={16} /></button>
                <div className="flex gap-4">
                  <div className="input-group flex-1"><label className="input-label text-sm">Title</label><input type="text" className="input-field" value={proj.title} onChange={e => handleArrayChange('cv', 'projects', idx, 'title', e.target.value)} /></div>
                  <div className="input-group flex-1"><label className="input-label text-sm">Tech Stack</label><input type="text" className="input-field" value={proj.tech} onChange={e => handleArrayChange('cv', 'projects', idx, 'tech', e.target.value)} /></div>
                </div>
                <div className="input-group"><label className="input-label text-sm">Description</label><textarea rows="2" className="input-field" value={proj.desc} onChange={e => handleArrayChange('cv', 'projects', idx, 'desc', e.target.value)}></textarea></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- CAREER PLAN TAB --- */}
      {activeTab === 'careerPlan' && portfolio && (
        <div className="glass-panel animate-fade-in flex flex-col gap-4">
          <h2 className="text-xl text-primary mb-4">Career Objectives & SWOT</h2>
          <div className="input-group"><label className="input-label">Vision (Paragraph)</label><textarea rows="4" className="input-field" value={portfolio.careerPlan.vision} onChange={e => handlePortfolioChange('careerPlan', 'vision', e.target.value)}></textarea></div>
          <div className="input-group"><label className="input-label">Short-Term Goals (Newlines for list bullets)</label><textarea rows="5" className="input-field" value={portfolio.careerPlan.shortTerm} onChange={e => handlePortfolioChange('careerPlan', 'shortTerm', e.target.value)}></textarea></div>
          <div className="input-group"><label className="input-label">Long-Term Goals</label><textarea rows="3" className="input-field" value={portfolio.careerPlan.longTerm} onChange={e => handlePortfolioChange('careerPlan', 'longTerm', e.target.value)}></textarea></div>
          <div className="input-group"><label className="input-label">Target Roles</label><textarea rows="2" className="input-field" value={portfolio.careerPlan.targetRoles} onChange={e => handlePortfolioChange('careerPlan', 'targetRoles', e.target.value)}></textarea></div>
          
          <h3 className="text-lg mt-4 text-accent">SWOT Analysis (Newlines for bullets)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group"><label className="input-label">Strengths</label><textarea rows="4" className="input-field" value={portfolio.careerPlan.swot.strengths} onChange={e => handleSwotChange('strengths', e.target.value)}></textarea></div>
            <div className="input-group"><label className="input-label">Weaknesses</label><textarea rows="4" className="input-field" value={portfolio.careerPlan.swot.weaknesses} onChange={e => handleSwotChange('weaknesses', e.target.value)}></textarea></div>
            <div className="input-group"><label className="input-label">Opportunities</label><textarea rows="4" className="input-field" value={portfolio.careerPlan.swot.opportunities} onChange={e => handleSwotChange('opportunities', e.target.value)}></textarea></div>
            <div className="input-group"><label className="input-label">Threats</label><textarea rows="4" className="input-field" value={portfolio.careerPlan.swot.threats} onChange={e => handleSwotChange('threats', e.target.value)}></textarea></div>
          </div>
        </div>
      )}

      {/* --- CERTIFICATES TAB --- */}
      {activeTab === 'certificates' && portfolio && (
        <div className="glass-panel animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-primary">Certifications</h2>
            <button onClick={() => addArrayItem('certificates', '', { title: '', issuer: '', date: '', desc: '', imageUrl: '' })} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}><Plus size={16} /> Add Certificate</button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
            {portfolio.certificates.map((cert, idx) => (
              <div key={idx} className="glass p-5 rounded-lg relative flex flex-col gap-3">
                <button onClick={() => removeArrayItem('certificates', null, idx)} className="absolute top-2 right-2 text-muted hover:text-danger" style={{ zIndex: 10 }}><Trash2 size={16} /></button>
                <div className="flex gap-4">
                  <div className="input-group flex-1 !mb-0"><label className="input-label text-sm">Title</label><input type="text" className="input-field" value={cert.title} onChange={e => handleArrayChange('certificates', '', idx, 'title', e.target.value)} /></div>
                  <div className="input-group flex-1 !mb-0"><label className="input-label text-sm">Date</label><input type="text" className="input-field" value={cert.date} onChange={e => handleArrayChange('certificates', '', idx, 'date', e.target.value)} /></div>
                </div>
                <div className="input-group !mb-0"><label className="input-label text-sm">Issuer (e.g., Coursera)</label><input type="text" className="input-field" value={cert.issuer} onChange={e => handleArrayChange('certificates', '', idx, 'issuer', e.target.value)} /></div>
                <div className="input-group !mb-0"><label className="input-label text-sm">Description</label><textarea rows="2" className="input-field" value={cert.desc} onChange={e => handleArrayChange('certificates', '', idx, 'desc', e.target.value)}></textarea></div>
                <div className="input-group !mb-0"><label className="input-label text-sm">Image URL (Optional)</label><input type="text" placeholder="https://..." className="input-field" value={cert.imageUrl} onChange={e => handleArrayChange('certificates', '', idx, 'imageUrl', e.target.value)} /></div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
