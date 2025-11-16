# Plaibook Interview Project - Call Analysis Dashboard

A full-stack TypeScript application with AI-powered call analysis capabilities. Features React + Vite frontend, Express backend, and Google Gemini AI integration.

## 🎯 Features

- **Call Management Dashboard**: Browse and search through 400+ call recordings
- **Detailed Call Metadata**: View comprehensive information about each call including agent, duration, queue, timing
- **AI-Powered Analysis**: Get intelligent insights using Google Gemini AI
  - Call summaries
  - Key points extraction
  - Sentiment analysis
  - Action items identification
  - Customer intent detection
- **Real-time Statistics**: View call metrics and analytics
- **Advanced Filtering**: Search and filter calls by direction, agent, subject
- **Modern UI**: Clean, responsive interface with dark mode support

## 📁 Project Structure

```
├── service/          # Node.js + Express backend
│   ├── src/
│   │   ├── index.ts       # Main server with API routes
│   │   ├── callService.ts # Call data management
│   │   ├── aiService.ts   # AI integration (Gemini)
│   │   └── types.ts       # TypeScript interfaces
│   ├── package.json
│   ├── tsconfig.json
│   └── .env              # Environment variables
├── src/              # React + Vite frontend
│   ├── components/
│   │   ├── CallCard.tsx
│   │   ├── CallDetailsModal.tsx
│   │   └── AIAnalysisModal.tsx
│   ├── App.tsx
│   ├── api.ts           # API client
│   ├── types.ts         # TypeScript interfaces
│   └── main.tsx
├── demo_calls/      # Directory with demo call data
│   ├── *.opus       # Audio recordings
│   └── *.opus_metadata.json  # Call metadata
└── README.md
```

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Runtime**: Node.js
- **AI**: Google Gemini 2.0 Flash

## 🚀 Prerequisites

- Node.js (v18 or newer)
- npm (comes with Node.js)
- Google Gemini API Key (optional but recommended)
  - Get one free at: https://makersuite.google.com/app/apikey
  - The application works without it but AI features will use fallback logic

## 📦 Installation

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd service
npm install
cd ..
```

### 2. Configure Environment Variables

```bash
cd service
cp .env.example .env
```

Edit `service/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

> **Note**: The app will work without an API key but will provide basic analysis instead of AI-powered insights.

## 🎮 Running the Application

You need **two terminals** to run both servers:

### Terminal 1: Backend Server

```bash
cd service
npm run dev
```

Server will start on **http://localhost:3000**

### Terminal 2: Frontend Server

```bash
# From project root
npm run dev
```

Frontend will start on **http://localhost:5173**

## 🌐 Usage

1. Open your browser to **http://localhost:5173**
2. Browse the dashboard showing all available calls
3. Use the search bar to filter by subject or agent name
4. Filter by call direction (All/Inbound/Outbound)
5. Click on any call card to view detailed information
6. Click "Analyze with AI" to get intelligent insights (requires API key)

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and AI configuration state.

### Get All Calls
```
GET /api/calls
```
Returns list of all calls with summary information.

### Get Call Statistics
```
GET /api/stats
```
Returns aggregated statistics about calls.

### Get Specific Call
```
GET /api/calls/:recordingId
```
Returns detailed metadata for a specific call.

### Analyze Call with AI
```
POST /api/calls/:recordingId/analyze
```
Returns AI-powered analysis of the call.

### Batch Analysis
```
POST /api/calls/analyze/batch
Body: { recordingIds: string[] }
```
Analyzes multiple calls (max 10) in one request.

## 📊 Demo Data

The `demo_calls/` directory contains:
- **400+ call recordings** in Opus format
- **Metadata files** with information about:
  - Call direction and type
  - Agent and queue information
  - Timing and duration
  - Contact information
  - Technical details

## 🎨 Features Breakdown

### Dashboard
- Real-time statistics (total calls, inbound/outbound counts)
- Grid view of recent calls
- Search functionality
- Direction filters

### Call Details
- Comprehensive metadata display
- Agent information
- Queue details
- Timing information
- Contact details

### AI Analysis (when configured)
- Call summary
- Key discussion points
- Sentiment analysis
- Action items
- Customer intent identification

## 🔧 Development

### Frontend Development
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Development
```bash
cd service
npm run dev      # Start with hot reload
npm run build    # Compile TypeScript
npm start        # Run compiled code
```

## 🎯 Architecture Decisions

### Why Gemini 2.0 Flash?
- Free tier available (60 requests/minute)
- Low latency for real-time analysis
- Cost-effective for development/testing
- Good balance of speed and quality

### Why Separate Frontend/Backend?
- Clear separation of concerns
- Easy to scale independently
- Different deployment strategies
- Better development workflow

### TypeScript Throughout
- Type safety across the stack
- Better IDE support
- Reduced runtime errors
- Easier refactoring

## 🚧 Future Enhancements

- Audio playback capability
- Call transcription
- Bulk operations (export, batch analyze)
- Advanced analytics and visualizations
- User authentication
- Call tagging and categorization
- Custom AI prompts
- Export analysis reports

## 📝 Notes

- The application is flexible and can be modified as needed
- AI features degrade gracefully without an API key
- All call data is read from the file system (no database required)
- Frontend proxies `/api` requests to the backend automatically

## 🤝 Contributing

This is an interview project, but suggestions are welcome!

## 📄 License

ISC

---

**Built with ❤️ for Plaibook**
