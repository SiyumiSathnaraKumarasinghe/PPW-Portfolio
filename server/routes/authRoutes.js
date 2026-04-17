import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === 'siyumi123') {
    res.json({ success: true, message: 'Authenticated successfully' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

export default router;
