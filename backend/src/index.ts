import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { connectDB } from './config/database';
import emailRoutes from './routes/emailRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

// Security middleware - must be first
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  config.frontendUrl,
].filter(Boolean);

// Add production URLs if available
if (process.env.VERCEL_URL) {
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
}
if (process.env.PRODUCTION_URL) {
  allowedOrigins.push(process.env.PRODUCTION_URL);
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || config.nodeEnv === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body parser with size limits to prevent DoS
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Trust proxy for rate limiting behind reverse proxy (Vercel, etc)
app.set('trust proxy', 1);

// Routes
app.use('/api/email', emailRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MailMitra API is running' });
});

// Start server
const startServer = async () => {
  await connectDB(); // Will gracefully handle connection failure
  
  app.listen(config.port, () => {
    console.log(`🚀 MailMitra API running on port ${config.port}`);
    console.log(`📧 Environment: ${config.nodeEnv}`);
  });
};

startServer();
