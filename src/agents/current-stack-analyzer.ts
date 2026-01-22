import { Subconscious } from 'subconscious';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Subconscious({
  apiKey: process.env.SUBCONSCIOUS_API_KEY!,
});

export async function analyzeCurrentStack(
  repoUrl: string
): Promise<{
  runId: string;
  analysis: string;
  usage: any;
}> {
  console.log('🔍 [Agent 1] Analyzing current tech stack...');

  const instructions = `You are a senior software architect performing a technical analysis for migration planning.

Analyze the GitHub repository: ${repoUrl}

Create a comprehensive technical analysis of the CURRENT tech stack with these sections:

## Current Tech Stack Analysis

### 1. Primary Language & Version
Identify the main programming language(s) and versions used.

### 2. Frontend Framework & Libraries
- Main framework (React, Vue, Angular, etc.)
- UI libraries and component frameworks
- State management solutions
- Routing libraries
- Key dependencies with versions

### 3. Build Tools & Configuration
- Build tool (Webpack, Vite, Create React App, etc.)
- Package manager (npm, yarn, pnpm)
- Configuration files present

### 4. Project Architecture
- File/folder structure
- Component organization
- Code patterns used (hooks, context, custom patterns)

### 5. Key Files & Entry Points
- Most important files (package.json, main entry points, config files)
- Dependencies count

### 6. Complexity Assessment
Rate as LOW, MEDIUM, or HIGH based on:
- Number of dependencies
- Code structure complexity
- Project size
Provide reasoning for your rating.

### 7. Estimated Project Size
- Approximate lines of code
- Number of components/modules
- Scale of the application

### 8. Summary
2-3 sentences summarizing the current stack and its characteristics.

Use your tools to:
- Search for the repository information
- Read the README and documentation
- Analyze package.json and configuration files
- Research the technologies identified

Be specific, technical, and thorough. Use actual versions and concrete details where available.`;

  const tools: any[] = [
    { type: 'platform', id: 'web_search', options: {} },
    { type: 'platform', id: 'webpage_understanding', options: {} },
    { type: 'platform', id: 'parallel_search', options: {} },
  ];

  try {
    const run = await client.run({
      engine: 'tim-gpt',
      input: { instructions, tools },
      options: { awaitCompletion: true },
    });

    if (run.status !== 'succeeded' || !run.result) {
      throw new Error(`Agent 1 failed: ${run.status}`);
    }

    // The answer might be a JSON string or an object
    let analysis: string;
    const answer = run.result.answer;
    
    if (typeof answer === 'string') {
      // Try to parse if it's JSON
      try {
        const parsed = JSON.parse(answer);
        analysis = parsed.final_answer || answer;
      } catch {
        analysis = answer;
      }
    } else if (typeof answer === 'object' && answer !== null) {
      analysis = (answer as any).final_answer || JSON.stringify(answer, null, 2);
    } else {
      analysis = String(answer);
    }

    console.log('✅ [Agent 1] Current stack analysis completed');
    console.log(`   Tokens: ${(run.usage as any)?.inputTokens + (run.usage as any)?.outputTokens || 0}`);
    console.log(`   Duration: ${Math.round(((run.usage as any)?.durationMs || 0) / 1000)}s`);

    return {
      runId: run.runId,
      analysis,
      usage: run.usage,
    };
  } catch (error) {
    console.error('❌ [Agent 1] Error:', error);
    throw error;
  }
}