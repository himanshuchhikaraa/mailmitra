import { UsageLog } from '../models/UsageLog';
import { isDatabaseConnected } from '../config/database';

const DAILY_LIMIT = 50; // Increased for testing

// In-memory rate limiting (fallback when MongoDB is not available)
const inMemoryUsage: Map<string, { count: number; date: string }> = new Map();

export const getStartOfDay = (): Date => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const getTodayString = (): string => {
  return getStartOfDay().toISOString().split('T')[0];
};

export const checkRateLimit = async (ipAddress: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetTime: Date;
}> => {
  const today = getStartOfDay();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let emailsUsed = 0;

  if (isDatabaseConnected()) {
    // Use MongoDB
    const usage = await UsageLog.findOne({
      ipAddress,
      date: today,
    });
    emailsUsed = usage?.emailsGenerated || 0;
  } else {
    // Use in-memory storage
    const todayStr = getTodayString();
    const usage = inMemoryUsage.get(ipAddress);
    if (usage && usage.date === todayStr) {
      emailsUsed = usage.count;
    }
  }

  const remaining = Math.max(0, DAILY_LIMIT - emailsUsed);

  return {
    allowed: emailsUsed < DAILY_LIMIT,
    remaining,
    resetTime: tomorrow,
  };
};

export const incrementUsage = async (ipAddress: string, userAgent: string): Promise<void> => {
  const today = getStartOfDay();

  if (isDatabaseConnected()) {
    // Use MongoDB
    await UsageLog.findOneAndUpdate(
      { ipAddress, date: today },
      {
        $inc: { emailsGenerated: 1 },
        $set: { userAgent },
      },
      { upsert: true }
    );
  } else {
    // Use in-memory storage
    const todayStr = getTodayString();
    const usage = inMemoryUsage.get(ipAddress);
    
    if (usage && usage.date === todayStr) {
      usage.count += 1;
    } else {
      inMemoryUsage.set(ipAddress, { count: 1, date: todayStr });
    }
  }
};
