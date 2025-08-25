import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get all recycling hubs
// @route   GET /api/hubs
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Get all recycling hubs - Coming soon' });
});

// @desc    Get hub by ID
// @route   GET /api/hubs/:id
// @access  Private
router.get('/:id', (req, res) => {
  res.json({ message: 'Get hub by ID - Coming soon' });
});

export default router;
