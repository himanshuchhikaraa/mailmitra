import Redis from 'ioredis';
import { config } from '../config';

// Session interface
export interface UserSession {
  email: string;
  name: string;
  picture?: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// Redis client - will gracefully handle connection failures
let redis: Redis | null = null;
let redisAvailable = false;

// In-memory fallback for development without Redis
const memoryStore = new Map<string, UserSession>();

// Session expiry time (7 days in seconds)
const SESSION_TTL = 7 * 24 * 60 * 60;

// Initialize Redis connection
export const initRedis = async (): Promise<void> => {
  const redisUrl = config.redisUrl || process.env.REDIS_URL;
  
  if (!redisUrl) {
    console.log('⚠️  REDIS_URL not set - using in-memory session storage (sessions will be lost on restart)');
    return;
  }

  try {
    // Parse Redis URL to check if it's TLS (rediss://) for production
    const isTLS = redisUrl.startsWith('rediss://');
    const isProduction = config.nodeEnv === 'production';
    
    // Configure Redis options for different environments
    const redisOptions: any = {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: true,
      // Reconnect strategy for production reliability
      retryStrategy: (times: number) => {
        if (times > 10) {
          console.error('❌ Redis max retries reached, giving up');
          return null;
        }
        return Math.min(times * 100, 3000);
      },
    };
    
    // Enable TLS for production Redis (Upstash, Railway, etc.)
    if (isTLS) {
      redisOptions.tls = {
        rejectUnauthorized: false, // Required for some cloud Redis providers
      };
    }

    redis = new Redis(redisUrl, redisOptions);

    // Handle connection events
    redis.on('connect', () => {
      console.log(`✅ Redis connected successfully ${isProduction ? '(production)' : '(local)'}`);
      redisAvailable = true;
    });

    redis.on('error', (err) => {
      console.error('❌ Redis connection error:', err.message);
      redisAvailable = false;
    });

    redis.on('close', () => {
      console.log('⚠️  Redis connection closed');
      redisAvailable = false;
    });

    redis.on('reconnecting', () => {
      console.log('🔄 Redis reconnecting...');
    });

    await redis.connect();
  } catch (error: any) {
    console.error('❌ Failed to connect to Redis:', error.message);
    console.log('⚠️  Falling back to in-memory session storage');
    redis = null;
    redisAvailable = false;
  }
};

// Get session key
const getSessionKey = (email: string): string => `session:${email.toLowerCase()}`;

// Save session
export const saveSession = async (email: string, session: UserSession): Promise<void> => {
  const key = getSessionKey(email);
  
  if (redisAvailable && redis) {
    try {
      await redis.setex(key, SESSION_TTL, JSON.stringify(session));
      return;
    } catch (error: any) {
      console.error('Redis save error:', error.message);
    }
  }
  
  // Fallback to memory
  memoryStore.set(email.toLowerCase(), session);
};

// Get session
export const getSession = async (email: string): Promise<UserSession | null> => {
  const key = getSessionKey(email);
  
  if (redisAvailable && redis) {
    try {
      const data = await redis.get(key);
      if (data) {
        return JSON.parse(data) as UserSession;
      }
      return null;
    } catch (error: any) {
      console.error('Redis get error:', error.message);
    }
  }
  
  // Fallback to memory
  return memoryStore.get(email.toLowerCase()) || null;
};

// Update session
export const updateSession = async (email: string, updates: Partial<UserSession>): Promise<void> => {
  const existing = await getSession(email);
  if (existing) {
    const updated = { ...existing, ...updates };
    await saveSession(email, updated);
  }
};

// Delete session
export const deleteSession = async (email: string): Promise<void> => {
  const key = getSessionKey(email);
  
  if (redisAvailable && redis) {
    try {
      await redis.del(key);
    } catch (error: any) {
      console.error('Redis delete error:', error.message);
    }
  }
  
  // Also delete from memory (in case of fallback)
  memoryStore.delete(email.toLowerCase());
};

// Check if Redis is available
export const isRedisAvailable = (): boolean => redisAvailable;

// Graceful shutdown
export const closeRedis = async (): Promise<void> => {
  if (redis) {
    await redis.quit();
    redis = null;
    redisAvailable = false;
  }
};
