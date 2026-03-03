# MailMitra - Cold Email Generator

## Project Overview
MailMitra is a cold email generator tool built for Indian freelancers and agencies. It generates personalized, human-sounding cold emails using AI.

## Tech Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **AI**: Google Gemini API

## Project Structure
- `/frontend` - Next.js application
- `/backend` - Express API server

## Development Commands

### Backend
```bash
cd backend
npm run dev    # Start development server
npm run build  # Build for production
```

### Frontend
```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
```

## Key Features
1. AI-powered email generation
2. India mode toggle for cultural context
3. Subject line, email body, and follow-up generation
4. Rate limiting (5 free emails/day)
5. Copy to clipboard functionality

## API Endpoints
- `POST /api/email/generate` - Generate cold email
- `GET /api/email/limit` - Check remaining daily limit

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `GEMINI_API_KEY` - Google Gemini API key
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL
