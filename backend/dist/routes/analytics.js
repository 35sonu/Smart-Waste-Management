"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All routes are protected
router.use(auth_1.protect);
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
exports.default = router;
