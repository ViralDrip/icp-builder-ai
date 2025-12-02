import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json({ limit: '10mb' }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Gemini AI proxy endpoint
app.post('/api/gemini', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'API key not configured'
      });
    }

    const { message, sessionState } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'Message is required'
      });
    }

    // Initialize Gemini client
    const genAI = new GoogleGenAI({ apiKey });

    // Send message to Gemini
    // Note: The actual implementation will depend on how the client sends the request
    // This is a simplified version
    res.json({
      success: true,
      message: 'Proxy endpoint ready'
    });

  } catch (error: any) {
    console.error('Gemini API Error:', error);

    // Classify error types
    if (error.status === 401 || error.status === 403) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid API key'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please wait a moment.'
      });
    }

    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return res.status(503).json({
        error: 'Network error',
        message: 'Unable to connect to AI service'
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, '../dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API proxy available at http://localhost:${PORT}/api/gemini`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`📦 Serving static files from dist/`);
  }
});

export default app;
