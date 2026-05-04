import { Subconscious } from 'subconscious';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Subconscious({
  apiKey: process.env.SUBCONSCIOUS_API_KEY!,
});

export async function estimateEffort(
  currentStackAnalysis: string,
  migrationResearch: string,
  repoUrl: string
): Promise<{
  runId: string;
  estimate: string;
  usage: any;
}> {
  // ULTRA-SIMPLE PROMPT
  const instructions = `Based on this tech stack analysis and migration research, estimate the effort required.

CURRENT STACK:
${currentStackAnalysis.substring(0, 1500)}

MIGRATION INFO:
${migrationResearch.substring(0, 1500)}

Write an effort estimate with:
1. Complexity rating (LOW/MEDIUM/HIGH) and why
2. Timeline for small team (1-2 devs), medium team (3-5 devs), large team (6+ devs)
3. Cost estimate (developer hours × $150/hr average)
4. Main risks that could delay the project

Be specific with numbers. Keep it practical.`;

  const tools: any[] = [];

  try {
    const run = await client.run({
      engine: 'tim-gpt',
      input: { instructions, tools },
      options: { awaitCompletion: true },
    });


    if (run.status !== 'succeeded') {
      throw new Error(`Agent 3 failed: ${run.status}`);
    }

    if (!run.result) {
      throw new Error(`No result returned`);
    }

    let estimate: string;
    const answer = run.result.answer;
    
    if (typeof answer === 'string') {
      try {
        const parsed = JSON.parse(answer);
        estimate = parsed.final_answer || answer;
      } catch {
        estimate = answer;
      }
    } else if (typeof answer === 'object' && answer !== null) {
      estimate = (answer as any).final_answer || JSON.stringify(answer, null, 2);
    } else {
      estimate = String(answer);
    }

    console.log('✅ [Agent 3] Effort estimation completed');
    console.log(`   Tokens: ${(run.usage as any)?.inputTokens + (run.usage as any)?.outputTokens || 0}`);
    console.log(`   Duration: ${Math.round(((run.usage as any)?.durationMs || 0) / 1000)}s`);

    return {
      runId: run.runId,
      estimate,
      usage: run.usage,
    };
  } catch (error) {
    console.error('❌ [Agent 3] Error:', error);
    throw error;
  }
}
