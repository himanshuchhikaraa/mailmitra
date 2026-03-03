# MailMitra - Cold Email Generator

Generate personalized, human-sounding cold emails in seconds — built for Indian freelancers and agencies.

![MailMitra](https://via.placeholder.com/800x400?text=MailMitra+Screenshot)

## 🚀 Features

- **AI-Powered Email Generation**: Generate personalized cold emails with subject lines and follow-ups
- **India Mode**: Culturally appropriate tone for Indian business context
- **Human-Sounding**: No robotic AI language, under 120 words always
- **Rate Limited**: 5 free emails per day (no sign-up required)
- **Copy to Clipboard**: Easy one-click copy for subject, body, and follow-up

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Backend
- **Node.js + Express** - REST API
- **MongoDB** - Database for usage tracking
- **Google Gemini AI** - Email generation

## 📁 Project Structure

```
mailMitra/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   └── lib/             # API utilities
│   └── package.json
│
├── backend/                  # Express backend
│   ├── src/
│   │   ├── config/          # Database & env config
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── index.ts         # Entry point
│   └── package.json
│
└── README.md
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key

### 1. Clone and Install

```bash
cd mailMitra

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mailmitra
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it to `backend/.env`

### 4. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Open in Browser

Visit [http://localhost:3000](http://localhost:3000)

## 📝 API Endpoints

### Generate Email
```
POST /api/email/generate
```

**Request Body:**
```json
{
  "prospectName": "Rahul Sharma",
  "companyName": "TechStart Solutions",
  "companyContext": "They run a SaaS product for HR management",
  "yourName": "Priya Patel",
  "yourService": "SEO and content marketing",
  "yourCompany": "GrowthBox Digital",
  "indianMode": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "subject": "Quick question about TechStart's content",
    "body": "Hi Rahul,\n\nI noticed TechStart's blog hasn't been updated in a while...",
    "followUp": "Hi Rahul,\n\nJust following up on my previous email..."
  },
  "remaining": 4
}
```

### Check Rate Limit
```
GET /api/email/limit
```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev    # Development with hot reload
npm run build  # Build for production
npm start      # Run production build
```

### Frontend Development
```bash
cd frontend
npm run dev    # Development server
npm run build  # Production build
npm start      # Serve production build
```

## 🚀 Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Set the root directory to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = Your backend URL (e.g., `https://your-backend.vercel.app`)
5. Deploy!

### Backend (Vercel/Railway/Render)

**Option 1: Vercel (Recommended)**
1. Create a new Vercel project for backend
2. Set the root directory to `backend`
3. Add environment variables in Vercel dashboard:
   - `PORT` = 5000
   - `NODE_ENV` = production
   - `MONGODB_URI` = Your MongoDB Atlas URI
   - `GEMINI_API_KEY` = Your Gemini API key
   - `OPENAI_API_KEY` = Your OpenAI API key
   - `FRONTEND_URL` = Your frontend Vercel URL
   - `PRODUCTION_URL` = Your frontend Vercel URL

**Option 2: Railway/Render**
1. Push to GitHub
2. Connect to Railway or Render
3. Set environment variables
4. Deploy

### MongoDB Atlas (Production Database)
1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create database user
3. Whitelist IPs (or allow all: 0.0.0.0/0)
4. Get connection string and add to `MONGODB_URI`

## 🔒 Security Features

- **Helmet.js** - HTTP security headers
- **CORS** - Restricted to allowed origins
- **Input Sanitization** - XSS protection
- **Rate Limiting** - 5 emails/day per IP
- **Request Size Limits** - DoS protection
- **Environment Variables** - No secrets in code

## 📄 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ in India 🇮🇳
