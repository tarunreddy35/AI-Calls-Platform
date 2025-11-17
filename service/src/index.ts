import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { CallService } from './callService.js';
import { AIService } from './aiService.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Initialize services
const callService = new CallService();
const aiService = new AIService(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'AI Calls Platform API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      calls: '/api/calls',
      stats: '/api/calls/stats',
      analyze: '/api/calls/:recordingId/analyze'
    }
  });
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ 
    message: 'Backend is running!',
    timestamp: new Date().toISOString(),
    status: 'healthy',
    aiConfigured: aiService.isConfigured()
  });
});

// Get all calls
app.get('/api/calls', async (_req: Request, res: Response) => {
  try {
    const calls = await callService.getAllCalls();
    res.json({ success: true, data: calls, count: calls.length });
  } catch (error) {
    console.error('Error fetching calls:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch calls' });
  }
});

// Get call statistics
app.get('/api/calls/stats', async (_req: Request, res: Response) => {
  try {
    const stats = await callService.getCallStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch statistics' });
  }
});

// Get specific call metadata
app.get('/api/calls/:recordingId', async (req: Request, res: Response) => {
  try {
    const { recordingId } = req.params;
    const metadata = await callService.getCallMetadata(recordingId);
    
    if (!metadata) {
      res.status(404).json({ success: false, error: 'Call not found' });
      return;
    }
    
    res.json({ success: true, data: metadata });
  } catch (error) {
    console.error('Error fetching call metadata:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch call metadata' });
  }
});

// Analyze call with AI
app.post('/api/calls/:recordingId/analyze', async (req: Request, res: Response) => {
  try {
    const { recordingId } = req.params;
    const metadata = await callService.getCallMetadata(recordingId);
    
    if (!metadata) {
      res.status(404).json({ success: false, error: 'Call not found' });
      return;
    }
    
    const analysis = await aiService.analyzeCall(metadata);
    res.json({ success: true, data: analysis });
  } catch (error) {
    console.error('Error analyzing call:', error);
    res.status(500).json({ success: false, error: 'Failed to analyze call' });
  }
});

// Batch analyze multiple calls
app.post('/api/calls/analyze/batch', async (req: Request, res: Response) => {
  try {
    const { recordingIds } = req.body;
    
    if (!Array.isArray(recordingIds) || recordingIds.length === 0) {
      res.status(400).json({ success: false, error: 'Invalid recordingIds array' });
      return;
    }
    
    const analyses = await Promise.all(
      recordingIds.slice(0, 10).map(async (id: string) => {
        const metadata = await callService.getCallMetadata(id);
        if (!metadata) return null;
        
        const analysis = await aiService.analyzeCall(metadata);
        return { recordingId: id, analysis };
      })
    );
    
    const validAnalyses = analyses.filter(a => a !== null);
    res.json({ success: true, data: validAnalyses, count: validAnalyses.length });
  } catch (error) {
    console.error('Error in batch analysis:', error);
    res.status(500).json({ success: false, error: 'Failed to analyze calls' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
  console.log(`📡 API endpoints available at http://0.0.0.0:${PORT}/api`);
  console.log(`🤖 AI Service: ${aiService.isConfigured() ? 'Configured ✓' : 'Not configured (set GEMINI_API_KEY in .env)'}`);
});
