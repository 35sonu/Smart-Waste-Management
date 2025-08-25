import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get user analytics dashboard
// @route   GET /api/analytics/dashboard
// @access  Private
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Get analytics dashboard - Coming soon' });
});

// @desc    Get waste reduction stats
// @route   GET /api/analytics/stats
// @access  Private
router.get('/stats', (req, res) => {
  res.json({ message: 'Get waste stats - Coming soon' });
});

export default router;
