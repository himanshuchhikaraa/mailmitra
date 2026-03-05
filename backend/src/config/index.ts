import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mailmitra',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // Google OAuth
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/google/callback',
  
  // JWT for session
  jwtSecret: process.env.JWT_SECRET || 'mailmitra-secret-key-change-in-production',
};
