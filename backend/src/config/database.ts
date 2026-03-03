import mongoose from 'mongoose';
import { config } from './index';

let isConnected = false;

export const connectDB = async (): Promise<boolean> => {
  try {
    await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 3000, // 3 second timeout
      connectTimeoutMS: 3000,
    });
    console.log('✅ MongoDB connected successfully');
    isConnected = true;
    return true;
  } catch (error) {
    console.warn('⚠️ MongoDB connection failed. Running with in-memory rate limiting.');
    console.warn('   To enable persistence, start MongoDB or use MongoDB Atlas.');
    isConnected = false;
    return false;
  }
};

export const isDatabaseConnected = (): boolean => isConnected;
