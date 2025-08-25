import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Not authorized, user not found'
        });
      }

      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({
        success: false,
        error: 'Not authorized, token failed'
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no token'
    });
  }
};
