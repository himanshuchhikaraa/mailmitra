import { google } from 'googleapis';
import { config } from '../config';

const oauth2Client = new google.auth.OAuth2(
  config.googleClientId,
  config.googleClientSecret,
  config.googleRedirectUri
);

// Scopes required for sending emails
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

// Generate OAuth URL for user to authorize
export const getAuthUrl = (): string => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // Force to get refresh token
  });
};

// Exchange authorization code for tokens
export const getTokensFromCode = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

// Get user info from tokens
export const getUserInfo = async (accessToken: string) => {
  oauth2Client.setCredentials({ access_token: accessToken });
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  const { data } = await oauth2.userinfo.get();
  return {
    email: data.email,
    name: data.name,
    picture: data.picture,
  };
};

// Refresh access token if expired
export const refreshAccessToken = async (refreshToken: string) => {
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const { credentials } = await oauth2Client.refreshAccessToken();
  return credentials;
};

// Create email in base64 format
const createEmail = (
  to: string,
  from: string,
  subject: string,
  body: string
): string => {
  const emailLines = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    '',
    body,
  ];

  const email = emailLines.join('\r\n');
  // Base64 URL encode
  return Buffer.from(email)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// Send email via Gmail API
export const sendEmail = async (
  accessToken: string,
  refreshToken: string,
  to: string,
  subject: string,
  body: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Get sender's email
    const userInfo = await getUserInfo(accessToken);
    const from = userInfo.email!;

    // Create and send email
    const rawEmail = createEmail(to, from, subject, body);

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawEmail,
      },
    });

    return {
      success: true,
      messageId: response.data.id || undefined,
    };
  } catch (error: any) {
    console.error('Gmail send error:', error?.message);
    
    // Check if token expired
    if (error?.message?.includes('invalid_grant') || error?.message?.includes('Token has been expired')) {
      return {
        success: false,
        error: 'Session expired. Please reconnect your Gmail account.',
      };
    }

    return {
      success: false,
      error: error?.message || 'Failed to send email',
    };
  }
};
