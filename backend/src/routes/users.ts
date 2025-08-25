import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Get all users - Coming soon' });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', (req, res) => {
  res.json({ message: 'Get user by ID - Coming soon' });
});

export default router;
