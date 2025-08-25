"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// Import routes
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const waste_1 = __importDefault(require("./routes/waste"));
const hubs_1 = __importDefault(require("./routes/hubs"));
const collections_1 = __importDefault(require("./routes/collections"));
const analytics_1 = __importDefault(require("./routes/analytics"));
// Import middleware
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecowaste');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};
// Connect to database
connectDB();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});
// API Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/waste', waste_1.default);
app.use('/api/hubs', hubs_1.default);
app.use('/api/collections', collections_1.default);
app.use('/api/analytics', analytics_1.default);
// API documentation route
app.get('/api', (req, res) => {
    res.json({
        message: 'EcoWaste Manager API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            waste: '/api/waste',
            hubs: '/api/hubs',
            collections: '/api/collections',
            analytics: '/api/analytics'
        }
    });
});
// Error handling middleware
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 API available at: http://localhost:${PORT}/api`);
});
exports.default = app;
