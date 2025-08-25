"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'fallback-secret');
            // Get user from token
            req.user = await User_1.default.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'Not authorized, user not found'
                });
            }
            next();
        }
        catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({
                success: false,
                error: 'Not authorized, token failed'
            });
        }
    }
    else {
        return res.status(401).json({
            success: false,
            error: 'Not authorized, no token'
        });
    }
};
exports.protect = protect;
