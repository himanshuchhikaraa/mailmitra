import { Router } from 'express';
import {
  getGmailAuthUrl,
  handleGmailCallback,
  getSession,
  disconnectGmail,
  sendGmailEmail,
} from '../controllers/authController';

const router = Router();

// Get Gmail OAuth URL
router.get('/google/url', getGmailAuthUrl);

// Handle OAuth callback
router.get('/google/callback', handleGmailCallback);

// Get current session
router.get('/session', getSession);

// Disconnect Gmail
router.post('/disconnect', disconnectGmail);

// Send email via Gmail
router.post('/send', sendGmailEmail);

export default router;
