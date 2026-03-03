import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { config } from '../config';

// Initialize AI clients
const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const openai = new OpenAI({ apiKey: config.openaiApiKey });

export interface EmailInput {
  prospectName: string;
  companyName: string;
  companyContext?: string;
  yourName: string;
  yourService: string;
  yourCompany?: string;
  yourRole?: string;
  industry?: string;
  purpose?: string;
  tone?: 'professional' | 'friendly' | 'formal';
  additionalContext?: string;
  indiaMode?: boolean;
  indianMode?: boolean; // Legacy support
}

export interface GeneratedEmail {
  subject: string;
  body: string;
  followUp: string;
}

const buildPrompt = (input: EmailInput): string => {
  const isIndianMode = input.indiaMode || input.indianMode;
  const tone = input.tone || 'professional';
  
  const toneInstructions: Record<string, string> = {
    professional: 'Use a confident and clear tone. Be direct but polite.',
    friendly: 'Use a warm and conversational tone. Be approachable and casual while remaining professional.',
    formal: 'Use a respectful and structured tone. Be polished and formal in language.',
  };

  const purposeInstructions: Record<string, string> = {
    Introduction: 'This is a first-time introduction email. Focus on making a good first impression.',
    'Follow-up': 'This is a follow-up to previous outreach. Be brief and reference the initial contact.',
    Partnership: 'Focus on mutual benefits and potential collaboration opportunities.',
    'Service Offer': 'Highlight the value you can provide to their business.',
    Collaboration: 'Emphasize how working together could benefit both parties.',
  };

  const indianModeInstructions = isIndianMode
    ? `
For Indian business culture:
- Use polite, respectful tone appropriate for Indian business relationships.
- Avoid pushy sales language - Indian business culture appreciates subtlety and warmth.
- Be warm but professional - relationships matter in Indian business.
- Use softer call-to-action that works better in Indian context.
- Show genuine interest in their work, not just selling.
`
    : '';

  return `You are a professional B2B cold email copywriter specializing in Indian freelancers, agencies, and consultants.

Your task is to write short, human-sounding, personalized cold emails.

TONE: ${toneInstructions[tone]}

${input.purpose ? `PURPOSE: ${purposeInstructions[input.purpose] || ''}` : ''}

STRICT RULES:
- Keep email under 120 words.
- Make it conversational and natural.
- Avoid robotic AI language.
- Do NOT use buzzwords like "synergy", "leverage", "cutting-edge", "game-changing", "revolutionary".
- Avoid being overly aggressive or salesy.
- Do not exaggerate claims.
- Use soft call-to-action (like "Would love to chat" or "Happy to share more").
- Do not use emojis.
- Avoid long paragraphs (max 3 short paragraphs).
- Make it sound like one human writing to another.
- No subject line capitalization spam style.
- Do NOT mention that you are an AI.
- Do NOT start with "I hope this email finds you well".
${indianModeInstructions}

PROSPECT DETAILS:
- Prospect Name: ${input.prospectName}
- Company Name: ${input.companyName}
${input.industry ? `- Industry: ${input.industry}` : ''}
${input.companyContext ? `- Company Context: ${input.companyContext}` : ''}
${input.additionalContext ? `- Additional Context: ${input.additionalContext}` : ''}

SENDER DETAILS:
- Your Name: ${input.yourName}
${input.yourRole ? `- Your Role: ${input.yourRole}` : ''}
- Your Service: ${input.yourService}
${input.yourCompany ? `- Your Company: ${input.yourCompany}` : ''}

Return output in EXACTLY this format (no markdown, no extra text):

Subject: <subject line - keep it short and natural, under 8 words, relevant to the purpose>

Email:
<email body - under 120 words, 2-3 short paragraphs>

Follow-up:
<short follow-up message under 60 words, to be sent 3-4 days later>`;
};

const parseResponse = (response: string): GeneratedEmail => {
  const subjectMatch = response.match(/Subject:\s*(.+?)(?=\n\nEmail:|$)/s);
  const emailMatch = response.match(/Email:\s*(.+?)(?=\n\nFollow-up:|$)/s);
  const followUpMatch = response.match(/Follow-up:\s*(.+?)$/s);

  return {
    subject: subjectMatch?.[1]?.trim() || 'Quick question',
    body: emailMatch?.[1]?.trim() || '',
    followUp: followUpMatch?.[1]?.trim() || '',
  };
};

// Generate using Gemini API with timeout
const generateWithGemini = async (prompt: string, timeoutMs: number = 10000): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Gemini API timeout')), timeoutMs);
  });
  
  const result = await Promise.race([
    model.generateContent(prompt),
    timeoutPromise
  ]);
  
  return result.response.text();
};

// Generate using OpenAI API (faster and more reliable)
const generateWithOpenAI = async (prompt: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
    temperature: 0.7,
  });
  return completion.choices[0]?.message?.content || '';
};

export const generateEmail = async (input: EmailInput): Promise<GeneratedEmail> => {
  console.log('📨 Generating email with input:', input);
  const prompt = buildPrompt(input);
  let response: string;

  // Try OpenAI first (faster), fallback to Gemini if OpenAI fails
  if (config.openaiApiKey) {
    try {
      console.log('🔄 Trying OpenAI API...');
      response = await generateWithOpenAI(prompt);
      console.log('✅ Generated with OpenAI');
    } catch (openaiError: any) {
      console.log('⚠️ OpenAI failed:', openaiError?.message, '- Falling back to Gemini...');
      try {
        response = await generateWithGemini(prompt, 15000);
        console.log('✅ Generated with Gemini');
      } catch (geminiError: any) {
        console.error('❌ Gemini also failed:', geminiError?.message);
        throw new Error('Both AI services are unavailable. Please try again later.');
      }
    }
  } else {
    // Only Gemini available
    try {
      console.log('🔄 Trying Gemini API...');
      response = await generateWithGemini(prompt, 15000);
      console.log('✅ Generated with Gemini');
    } catch (geminiError: any) {
      console.error('❌ Gemini failed:', geminiError?.message);
      throw new Error('AI service is unavailable. Please try again later.');
    }
  }

  return parseResponse(response);
};
