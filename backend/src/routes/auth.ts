import express from 'express';
import {
  register,
  sendOTP,
  verifyOTP,
  login,
  getMe,
  updateProfile
} from '../controllers/auth';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;
