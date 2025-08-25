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
// @desc    Classify waste item
// @route   POST /api/waste/classify
// @access  Private
router.post('/classify', (req, res) => {
    res.json({ message: 'Waste classification - Coming soon' });
});
// @desc    Get waste classification history
// @route   GET /api/waste/history
// @access  Private
router.get('/history', (req, res) => {
    res.json({ message: 'Get waste history - Coming soon' });
});
exports.default = router;
