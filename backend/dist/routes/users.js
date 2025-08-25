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
exports.default = router;
