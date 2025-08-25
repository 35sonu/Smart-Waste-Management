import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { AuthRequest } from '../middleware/auth';

// In-memory OTP storage (in production, use Redis or database)
const otpStorage = new Map<string, { otp: string; expires: Date; verified: boolean }>();

// Generate random 4-digit OTP
const generateOTP = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Send JWT token response
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRE || '30') * 24 * 60 * 60 * 1000)
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        avatar: user.avatar,
        ecoPoints: user.ecoPoints,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified
      }
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, city } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email or phone already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      city,
      isPhoneVerified: false, // Will be verified via OTP
      isEmailVerified: false
    });

    // Send success response (without token until phone is verified)
    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your phone number.',
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
};

// @desc    Send OTP to phone
// @route   POST /api/auth/send-otp
// @access  Public
export const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      });
    }

    // Validate Indian phone number format
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid Indian mobile number'
      });
    }

    const otp = generateOTP();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store OTP (in production, use Redis or database)
    otpStorage.set(phone, { otp, expires, verified: false });

    // In a real application, send SMS via service like Twilio
    console.log(`OTP for ${phone}: ${otp}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      // For demo purposes, include OTP in response (remove in production)
      ...(process.env.NODE_ENV === 'development' && { otp })
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while sending OTP'
    });
  }
};

// @desc    Verify OTP and login
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Phone number and OTP are required'
      });
    }

    // Get stored OTP
    const storedOTPData = otpStorage.get(phone);

    if (!storedOTPData) {
      return res.status(400).json({
        success: false,
        error: 'No OTP found for this phone number. Please request a new OTP.'
      });
    }

    // Check if OTP expired
    if (new Date() > storedOTPData.expires) {
      otpStorage.delete(phone);
      return res.status(400).json({
        success: false,
        error: 'OTP has expired. Please request a new OTP.'
      });
    }

    // Verify OTP
    if (storedOTPData.otp !== otp) {
      return res.status(400).json({
        success: false,
        error: 'Invalid OTP'
      });
    }

    // Find user by phone
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Mark phone as verified
    user.isPhoneVerified = true;
    user.lastLogin = new Date();
    await user.save();

    // Clear OTP from storage
    otpStorage.delete(phone);

    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during OTP verification'
    });
  }
};

// @desc    Login user (alternative to OTP)
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone, otp } = req.body;

    // For now, use OTP login method
    return verifyOTP(req, res, next);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        avatar: user.avatar,
        ecoPoints: user.ecoPoints,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching user profile'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, email, city, avatar } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Update allowed fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (city) user.city = city;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        avatar: user.avatar,
        ecoPoints: user.ecoPoints,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating profile'
    });
  }
};
