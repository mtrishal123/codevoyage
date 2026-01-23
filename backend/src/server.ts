import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { orchestrateMigrationAnalysis } from './agents/orchestrator.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - filter out undefined values
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:3001'
].filter((origin): origin is string => typeof origin === 'string');

app.use(cors({
  origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
  credentials: true
}));

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'CodeVoyage API' });
});

// Main analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { repoUrl, targetStack } = req.body;

    if (!repoUrl || !targetStack) {
      return res.status(400).json({
        error: 'Missing required fields: repoUrl and targetStack',
      });
    }

    console.log(`\n🚀 New analysis request:`);
    console.log(`   Repo: ${repoUrl}`);
    console.log(`   Target: ${targetStack}\n`);

    const result = await orchestrateMigrationAnalysis(repoUrl, targetStack);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 CodeVoyage API running on port ${PORT}`);
});