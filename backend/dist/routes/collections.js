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
// @desc    Get user's scheduled collections
// @route   GET /api/collections
// @access  Private
router.get('/', (req, res) => {
    res.json({ message: 'Get scheduled collections - Coming soon' });
});
// @desc    Schedule new collection
// @route   POST /api/collections
// @access  Private
router.post('/', (req, res) => {
    res.json({ message: 'Schedule collection - Coming soon' });
});
exports.default = router;
