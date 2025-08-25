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
exports.default = router;
