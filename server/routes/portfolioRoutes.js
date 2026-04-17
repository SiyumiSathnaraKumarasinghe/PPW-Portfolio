import express from 'express';
import Portfolio from '../models/Portfolio.js';

const router = express.Router();

// Get the master portfolio settings (Public)
router.get('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      // If none exists, create an empty one
      portfolio = new Portfolio();
      await portfolio.save();
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the master portfolio settings (Protected via UI logic)
router.put('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio(req.body);
    } else {
      // Update fields
      portfolio.intro = req.body.intro || portfolio.intro;
      portfolio.cv = req.body.cv || portfolio.cv;
      portfolio.careerPlan = req.body.careerPlan || portfolio.careerPlan;
      portfolio.certificates = req.body.certificates || portfolio.certificates;
    }
    const updatedPortfolio = await portfolio.save();
    res.json(updatedPortfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
