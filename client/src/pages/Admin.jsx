import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, LogIn, Plus, Edit2, Trash2, X } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [journals, setJournals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJournal, setCurrentJournal] = useState({ week: '', topic: '', date: '', content: '' });
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchJournals();
    }
  }, [isAuthenticated]);

  const fetchJournals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/journals');
      setJournals(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching journals. Is backend/MongoDB running?');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentJournal._id) {
        // Edit
        await axios.put(`http://localhost:5000/api/journals/${currentJournal._id}`, currentJournal);
      } else {
        // Create
        await axios.post('http://localhost:5000/api/journals', currentJournal);
      }
      setIsEditing(false);
      fetchJournals();
    } catch (err) {
      alert('Error saving journal');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`http://localhost:5000/api/journals/${id}`);
        fetchJournals();
      } catch (err) {
        alert('Error deleting journal');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-full mt-20 animate-fade-in">
        <form onSubmit={handleLogin} className="glass-panel w-full max-w-md text-center">
          <ShieldAlert size={48} className="mx-auto text-primary mb-4" />
          <h2 className="text-2xl gradient-text mb-6">Admin Access</h2>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Enter password" 
              className="input-field text-center" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {loginError && <p className="text-danger text-sm mb-4">{loginError}</p>}
          
          <button type="submit" className="btn btn-primary w-full justify-center">
            <LogIn size={18} /> Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl gradient-text">Journal Administration</h1>
        <button 
          onClick={() => {
            setCurrentJournal({ week: '', topic: '', date: '', content: '' });
            setIsEditing(true);
          }} 
          className="btn btn-primary"
        >
          <Plus size={18} /> New Entry
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="glass-panel mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-primary">{currentJournal._id ? 'Edit Entry' : 'Create Entry'}</h2>
            <button type="button" onClick={() => setIsEditing(false)} className="text-muted hover:text-danger"><X size={24} /></button>
          </div>
          
          <div className="flex gap-4 mb-4">
            <div className="input-group flex-1">
              <label className="input-label">Week (Number)</label>
              <input type="number" required className="input-field" value={currentJournal.week} onChange={e => setCurrentJournal({...currentJournal, week: e.target.value})} />
            </div>
            <div className="input-group flex-1">
              <label className="input-label">Date (e.g., February 2026)</label>
              <input type="text" required className="input-field" value={currentJournal.date} onChange={e => setCurrentJournal({...currentJournal, date: e.target.value})} />
            </div>
          </div>
          
          <div className="input-group mb-4">
            <label className="input-label">Topic</label>
            <input type="text" required className="input-field" value={currentJournal.topic} onChange={e => setCurrentJournal({...currentJournal, topic: e.target.value})} />
          </div>

          <div className="input-group mb-6">
            <label className="input-label">Content (Supports newlines)</label>
            <textarea required className="input-field" rows="10" value={currentJournal.content} onChange={e => setCurrentJournal({...currentJournal, content: e.target.value})}></textarea>
          </div>
          
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary px-8">Save</button>
          </div>
        </form>
      ) : null}

      <div className="glass-panel">
        {journals.length === 0 ? (
          <p className="text-center text-muted">No journal entries found.</p>
        ) : (
          <table className="w-full text-left" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="pb-3 text-muted">Week</th>
                <th className="pb-3 text-muted">Topic</th>
                <th className="pb-3 text-muted">Date</th>
                <th className="pb-3 text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {journals.map(j => (
                <tr key={j._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="py-3 font-semibold">{j.week}</td>
                  <td className="py-3">{j.topic}</td>
                  <td className="py-3 text-sm">{j.date}</td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setCurrentJournal(j); setIsEditing(true); }} className="btn btn-outline" style={{ padding: '0.4rem' }}><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(j._id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin;
