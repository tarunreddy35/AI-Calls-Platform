# 🚀 Quick Start Guide

## 1. Get a Gemini API Key (Optional but Recommended)

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

## 2. Configure the Backend

```bash
cd service
```

Edit the `.env` file and add your API key:
```
GEMINI_API_KEY=your_key_here
```

## 3. The servers should already be running!

If not, start them in two terminals:

**Terminal 1 (Backend):**
```bash
cd service
npm run dev
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

## 4. Open the App

Visit: http://localhost:5173

## 🎯 What You Can Do

### Without API Key:
- ✅ Browse all 400+ calls
- ✅ View detailed call metadata
- ✅ Search and filter calls
- ✅ View statistics
- ⚠️ Basic AI analysis (fallback mode)

### With API Key:
- ✅ Everything above PLUS
- ✅ Advanced AI-powered analysis
- ✅ Intelligent call summaries
- ✅ Sentiment detection
- ✅ Action items extraction
- ✅ Customer intent analysis

## 📱 Using the Dashboard

1. **Browse Calls**: Scroll through the call cards
2. **Search**: Use the search bar to find specific calls
3. **Filter**: Toggle between All/Inbound/Outbound
4. **View Details**: Click any call card to see full metadata
5. **Analyze**: Click "Analyze with AI" button for insights

## 🔍 Example Workflow

1. Click on a call card (e.g., "Washington MD")
2. Review the call details (agent, duration, timing)
3. Click the "Analyze with AI" button (floating button bottom-right)
4. View the AI-generated insights
5. Close the modals and explore more calls

## ⚙️ API Endpoints

You can also interact with the API directly:

- `GET http://localhost:3000/api/calls` - List all calls
- `GET http://localhost:3000/api/calls/stats` - Get statistics
- `GET http://localhost:3000/api/calls/:id` - Get call details
- `POST http://localhost:3000/api/calls/:id/analyze` - Analyze a call

## 🐛 Troubleshooting

**Frontend not loading?**
- Make sure Vite server is running on port 5173
- Check browser console for errors

**API not responding?**
- Ensure backend is running on port 3000
- Check service terminal for errors

**AI not working?**
- Verify GEMINI_API_KEY is set in `service/.env`
- Check that you have quota remaining on your API key
- App will still work with basic analysis if AI fails

## 📊 Understanding the Data

Each call has:
- **Recording ID**: Unique identifier
- **Subject**: Call topic/location
- **Direction**: Inbound or outbound
- **Agent**: Who handled the call
- **Duration**: How long it lasted
- **Queue**: Which queue processed it
- **Timing**: When it occurred

## 🎨 Customization

The app is fully customizable:
- Edit `src/App.tsx` for UI changes
- Modify `service/src/aiService.ts` for different AI prompts
- Update styles in `src/index.css`
- Add new API endpoints in `service/src/index.ts`

---

**Enjoy exploring the Call Analysis Dashboard! 🎉**
