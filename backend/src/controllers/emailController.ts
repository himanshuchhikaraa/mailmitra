import { Request, Response } from 'express';
import { generateEmail, EmailInput } from '../services/emailGenerator';
import { checkRateLimit, incrementUsage } from '../services/rateLimiter';

// Sanitize string input to prevent XSS
const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, 500) // Limit length
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

// Validate email input fields
const validateInput = (body: any): { valid: boolean; error?: string } => {
  const requiredFields = ['prospectName', 'companyName', 'yourName', 'yourService'];
  
  for (const field of requiredFields) {
    if (!body[field] || typeof body[field] !== 'string' || body[field].trim().length === 0) {
      return { valid: false, error: `${field} is required` };
    }
    if (body[field].length > 500) {
      return { valid: false, error: `${field} is too long (max 500 characters)` };
    }
  }
  
  // Validate tone if provided
  const validTones = ['professional', 'friendly', 'formal'];
  if (body.tone && !validTones.includes(body.tone)) {
    return { valid: false, error: 'Invalid tone selected' };
  }
  
  return { valid: true };
};

export const generateEmailController = async (req: Request, res: Response): Promise<void> => {
  try {
    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || '';

    // Check rate limit
    const { allowed, remaining, resetTime } = await checkRateLimit(ipAddress);

    if (!allowed) {
      res.status(429).json({
        success: false,
        error: 'Daily limit reached',
        message: 'You have used all 5 free emails for today. Come back tomorrow!',
        resetTime,
        remaining: 0,
      });
      return;
    }

    // Validate input
    const validation = validateInput(req.body);
    if (!validation.valid) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: validation.error,
      });
      return;
    }

    // Sanitize all inputs
    const input: EmailInput = {
      prospectName: sanitizeInput(req.body.prospectName),
      companyName: sanitizeInput(req.body.companyName),
      companyContext: sanitizeInput(req.body.companyContext || ''),
      yourName: sanitizeInput(req.body.yourName),
      yourService: sanitizeInput(req.body.yourService),
      yourCompany: sanitizeInput(req.body.yourCompany || ''),
      yourRole: sanitizeInput(req.body.yourRole || ''),
      industry: sanitizeInput(req.body.industry || ''),
      purpose: sanitizeInput(req.body.purpose || ''),
      tone: (req.body.tone as 'professional' | 'friendly' | 'formal') || 'professional',
      additionalContext: sanitizeInput(req.body.additionalContext || ''),
      indiaMode: Boolean(req.body.indiaMode ?? true),
      indianMode: Boolean(req.body.indianMode ?? true),
    };

    // Generate email
    const email = await generateEmail(input);

    // Increment usage after successful generation
    await incrementUsage(ipAddress, userAgent);

    res.json({
      success: true,
      data: email,
      remaining: remaining - 1,
    });
  } catch (error: any) {
    console.error('Email generation error:', error?.message || error);
    console.error('Full error:', JSON.stringify(error, null, 2));
    res.status(500).json({
      success: false,
      error: 'Generation failed',
      message: error?.message || 'Something went wrong. Please try again.',
    });
  }
};

export const checkLimitController = async (req: Request, res: Response): Promise<void> => {
  try {
    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
    const { allowed, remaining, resetTime } = await checkRateLimit(ipAddress);

    res.json({
      success: true,
      data: {
        allowed,
        remaining,
        resetTime,
        dailyLimit: 5,
      },
    });
  } catch (error) {
    console.error('Rate limit check error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check limit',
    });
  }
};
