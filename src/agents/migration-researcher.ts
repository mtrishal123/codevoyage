import { Subconscious } from 'subconscious';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Subconscious({
  apiKey: process.env.SUBCONSCIOUS_API_KEY!,
});

export async function researchMigration(
  currentStack: string,
  targetStack: string
): Promise<{
  runId: string;
  research: string;
  usage: any;
}> {
  console.log('🔬 [Agent 2] Researching migration path...');

  const instructions = `Search for information about migrating from ${currentStack} to ${targetStack}.

Find and summarize:
1. Official migration guides
2. Common challenges developers face
3. Recommended migration approach
4. Available tools and resources
5. Typical timeline for this migration

Write a practical guide based on your findings.`;

  const tools: any[] = [
    { type: 'platform', id: 'exa_search', options: {} },      // Fast semantic search
    { type: 'platform', id: 'exa_crawl', options: {} },       // Extract webpage content
  ];

  try {
    const run = await client.run({
      engine: 'tim-gpt',
      input: { instructions, tools },
      options: { awaitCompletion: true },
    });

    console.log(`   Status: ${run.status}`);

    if (run.status !== 'succeeded') {
      console.error('   Full run:', JSON.stringify(run, null, 2));
      throw new Error(`Agent 2 failed: ${run.status}`);
    }

    if (!run.result) {
      throw new Error(`No result returned`);
    }

    let research: string;
    const answer = run.result.answer;
    
    if (typeof answer === 'string') {
      try {
        const parsed = JSON.parse(answer);
        research = parsed.final_answer || answer;
      } catch {
        research = answer;
      }
    } else if (typeof answer === 'object' && answer !== null) {
      research = (answer as any).final_answer || JSON.stringify(answer, null, 2);
    } else {
      research = String(answer);
    }

    console.log('✅ [Agent 2] Completed');
    console.log(`   Tokens: ${(run.usage as any)?.inputTokens + (run.usage as any)?.outputTokens || 0}`);
    console.log(`   Duration: ${Math.round(((run.usage as any)?.durationMs || 0) / 1000)}s`);

    return {
      runId: run.runId,
      research,
      usage: run.usage,
    };
  } catch (error) {
    console.error('❌ [Agent 2] Error:', error);
    throw error;
  }
}