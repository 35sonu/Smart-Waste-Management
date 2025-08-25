import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get user's scheduled collections
// @route   GET /api/collections
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Get scheduled collections - Coming soon' });
});

// @desc    Schedule new collection
// @route   POST /api/collections
// @access  Private
router.post('/', (req, res) => {
  res.json({ message: 'Schedule collection - Coming soon' });
});

export default router;
