import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Classify waste item
// @route   POST /api/waste/classify
// @access  Private
router.post('/classify', (req, res) => {
  res.json({ message: 'Waste classification - Coming soon' });
});

// @desc    Get waste classification history
// @route   GET /api/waste/history
// @access  Private
router.get('/history', (req, res) => {
  res.json({ message: 'Get waste history - Coming soon' });
});

export default router;
