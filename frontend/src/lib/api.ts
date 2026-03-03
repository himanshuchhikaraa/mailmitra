const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface EmailInput {
  prospectName: string;
  companyName: string;
  companyContext?: string;
  yourName: string;
  yourService: string;
  yourCompany?: string;
  indianMode: boolean;
}

export interface GeneratedEmail {
  subject: string;
  body: string;
  followUp: string;
}

export interface GenerateEmailResponse {
  success: boolean;
  data?: GeneratedEmail;
  remaining?: number;
  error?: string;
  message?: string;
  resetTime?: string;
}

export interface LimitResponse {
  success: boolean;
  data?: {
    allowed: boolean;
    remaining: number;
    resetTime: string;
    dailyLimit: number;
  };
  error?: string;
}

export async function generateEmail(input: EmailInput): Promise<GenerateEmailResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/email/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'Network error',
      message: 'Failed to connect to server. Please try again.',
    };
  }
}

export async function checkLimit(): Promise<LimitResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/email/limit`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'Network error',
    };
  }
}
