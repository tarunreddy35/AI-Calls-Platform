# 🔑 Setting Up Google Gemini API

## Why Gemini?

- **Free Tier**: 60 requests per minute free
- **Fast**: Low latency responses
- **Cost-Effective**: Very affordable if you exceed free tier
- **Quality**: Good balance of speed and analysis quality

## Step-by-Step Setup

### 1. Get Your API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"** button
4. Choose **"Create API key in new project"** (or select existing project)
5. Your API key will be displayed - **copy it immediately**

### 2. Add to Environment File

```bash
cd service
```

Edit `.env` file:
```env
GEMINI_API_KEY=AIzaSyC-Your-Actual-Key-Here
PORT=3000
```

### 3. Restart the Backend

Stop the backend server (Ctrl+C) and restart:
```bash
npm run dev
```

You should see:
```
🚀 Server is running on http://localhost:3000
📡 API endpoints available at http://localhost:3000/api
🤖 AI Service: Configured ✓
```

### 4. Test It

1. Go to http://localhost:5173
2. Click on any call card
3. Click "Analyze with AI" button
4. Wait a few seconds for the analysis

## ✅ Verification

The AI is working if you see:
- ✅ "AI Service: Configured ✓" in backend console
- ✅ No yellow "AI not configured" warning in the UI
- ✅ Detailed analysis with multiple sections when you analyze a call

## 🔒 Security Notes

- **Never commit** your `.env` file to git (it's in `.gitignore`)
- **Never share** your API key publicly
- **Keep it secret**: Treat it like a password
- **Rotate if exposed**: Generate a new key if compromised

## 💰 Pricing

**Free Tier:**
- 60 requests per minute
- 1,500 requests per day
- More than enough for development and testing

**Paid Tier** (if you exceed free limits):
- Extremely affordable (~$0.00025 per request)
- You'd need to analyze thousands of calls to hit $1

## 🆘 Troubleshooting

### "AI not configured" warning
- Check that GEMINI_API_KEY is set in `service/.env`
- Restart the backend server
- Verify the key is correct (no extra spaces)

### API errors
- Check your quota at: https://console.cloud.google.com/
- Verify API is enabled in your Google Cloud project
- Check console for specific error messages

### Still not working?
The app will work without AI! It will provide basic analysis based on metadata.

## 🔄 Alternative Providers

Want to use a different AI provider? Easy!

### OpenAI
```bash
npm install openai
```

### Anthropic Claude
```bash
npm install @anthropic-ai/sdk
```

Then modify `service/src/aiService.ts` to use your preferred provider.

## 📚 Additional Resources

- Gemini API Docs: https://ai.google.dev/docs
- API Console: https://console.cloud.google.com/
- Pricing: https://ai.google.dev/pricing

---

**You're all set! 🎉**
