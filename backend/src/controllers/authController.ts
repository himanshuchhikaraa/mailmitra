import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import {
  getAuthUrl,
  getTokensFromCode,
  getUserInfo,
  sendEmail,
  refreshAccessToken,
} from '../services/gmailService';

// Store for user sessions (in production, use Redis or database)
interface UserSession {
  email: string;
  name: string;
  picture?: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

const userSessions = new Map<string, UserSession>();

// Generate JWT token
const generateToken = (email: string): string => {
  return jwt.sign({ email }, config.jwtSecret, { expiresIn: '7d' });
};

// Verify JWT token
export const verifyToken = (token: string): { email: string } | null => {
  try {
    return jwt.verify(token, config.jwtSecret) as { email: string };
  } catch {
    return null;
  }
};

// Get auth URL for Gmail OAuth
export const getGmailAuthUrl = (req: Request, res: Response): void => {
  try {
    const authUrl = getAuthUrl();
    res.json({ success: true, authUrl });
  } catch (error: any) {
    console.error('Auth URL error:', error?.message);
    res.status(500).json({ success: false, error: 'Failed to generate auth URL' });
  }
};

// Handle OAuth callback
export const handleGmailCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      res.redirect(`${config.frontendUrl}/generate?error=no_code`);
      return;
    }

    // Exchange code for tokens
    const tokens = await getTokensFromCode(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      res.redirect(`${config.frontendUrl}/generate?error=no_tokens`);
      return;
    }

    // Get user info
    const userInfo = await getUserInfo(tokens.access_token);

    if (!userInfo.email) {
      res.redirect(`${config.frontendUrl}/generate?error=no_email`);
      return;
    }

    // Store session
    const session: UserSession = {
      email: userInfo.email,
      name: userInfo.name || '',
      picture: userInfo.picture || undefined,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + (tokens.expiry_date || 3600000),
    };

    userSessions.set(userInfo.email, session);

    // Generate JWT
    const jwtToken = generateToken(userInfo.email);

    // Redirect to frontend with token
    res.redirect(`${config.frontendUrl}/generate?gmail_connected=true&token=${jwtToken}`);
  } catch (error: any) {
    console.error('OAuth callback error:', error?.message);
    res.redirect(`${config.frontendUrl}/generate?error=oauth_failed`);
  }
};

// Get current user session
export const getSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      res.json({ success: true, connected: false });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      res.json({ success: true, connected: false });
      return;
    }

    const session = userSessions.get(decoded.email);
    if (!session) {
      res.json({ success: true, connected: false });
      return;
    }

    // Check if token expired and refresh if needed
    if (Date.now() > session.expiresAt - 60000) {
      try {
        const newCredentials = await refreshAccessToken(session.refreshToken);
        session.accessToken = newCredentials.access_token!;
        session.expiresAt = Date.now() + (newCredentials.expiry_date || 3600000);
        userSessions.set(decoded.email, session);
      } catch {
        userSessions.delete(decoded.email);
        res.json({ success: true, connected: false });
        return;
      }
    }

    res.json({
      success: true,
      connected: true,
      user: {
        email: session.email,
        name: session.name,
        picture: session.picture,
      },
    });
  } catch (error: any) {
    console.error('Get session error:', error?.message);
    res.status(500).json({ success: false, error: 'Failed to get session' });
  }
};

// Disconnect Gmail
export const disconnectGmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        userSessions.delete(decoded.email);
      }
    }

    res.json({ success: true, message: 'Disconnected successfully' });
  } catch (error: any) {
    console.error('Disconnect error:', error?.message);
    res.status(500).json({ success: false, error: 'Failed to disconnect' });
  }
};

// Send email via Gmail
export const sendGmailEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({ success: false, error: 'Invalid token' });
      return;
    }

    const session = userSessions.get(decoded.email);
    if (!session) {
      res.status(401).json({ success: false, error: 'Session expired. Please reconnect Gmail.' });
      return;
    }

    const { to, subject, body } = req.body;

    // Validate input
    if (!to || !subject || !body) {
      res.status(400).json({ success: false, error: 'Missing required fields: to, subject, body' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      res.status(400).json({ success: false, error: 'Invalid email address' });
      return;
    }

    // Refresh token if needed
    if (Date.now() > session.expiresAt - 60000) {
      try {
        const newCredentials = await refreshAccessToken(session.refreshToken);
        session.accessToken = newCredentials.access_token!;
        session.expiresAt = Date.now() + (newCredentials.expiry_date || 3600000);
        userSessions.set(decoded.email, session);
      } catch {
        userSessions.delete(decoded.email);
        res.status(401).json({ success: false, error: 'Session expired. Please reconnect Gmail.' });
        return;
      }
    }

    // Send email
    const result = await sendEmail(
      session.accessToken,
      session.refreshToken,
      to,
      subject,
      body
    );

    if (result.success) {
      res.json({
        success: true,
        message: 'Email sent successfully!',
        messageId: result.messageId,
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to send email',
      });
    }
  } catch (error: any) {
    console.error('Send email error:', error?.message);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
};
