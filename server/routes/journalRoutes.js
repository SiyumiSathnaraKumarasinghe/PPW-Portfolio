import express from 'express';
import Journal from '../models/Journal.js';

const router = express.Router();

// Get all journals, sorted by week
router.get('/', async (req, res) => {
  try {
    const journals = await Journal.find().sort({ week: 1 });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new journal
router.post('/', async (req, res) => {
  const journal = new Journal(req.body);
  try {
    const newJournal = await journal.save();
    res.status(201).json(newJournal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update journal
router.put('/:id', async (req, res) => {
  try {
    const journal = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.json(journal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete journal
router.delete('/:id', async (req, res) => {
  try {
    const journal = await Journal.findByIdAndDelete(req.params.id);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.json({ message: 'Journal entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
