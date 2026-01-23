import { Subconscious } from 'subconscious';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Subconscious({
  apiKey: process.env.SUBCONSCIOUS_API_KEY!,
});

export async function createMigrationPlan(
  currentStackAnalysis: string,
  migrationResearch: string,
  effortEstimate: string,
  repoUrl: string,
  targetStack: string
): Promise<{
  runId: string;
  plan: string;
  usage: any;
}> {
  console.log('📋 [Agent 4] Creating migration plan...');

  // ULTRA-SIMPLE PROMPT
  const instructions = `Create a migration plan for ${repoUrl} to move to ${targetStack}.

CURRENT STACK:
${currentStackAnalysis.substring(0, 1000)}

MIGRATION GUIDE:
${migrationResearch.substring(0, 1000)}

EFFORT ESTIMATE:
${effortEstimate.substring(0, 1000)}

Write a detailed migration roadmap with:

1. **Executive Summary** - 3 sentences: what we're doing, why, and timeline
2. **Migration Phases** - Break into 4-5 phases with tasks for each
3. **Risk Mitigation** - Top 3 risks and how to handle them
4. **Success Metrics** - How we'll know it worked
5. **Team Structure** - Who we need and their roles

Be specific and actionable. Make it a plan a team can execute immediately.`;

  const tools: any[] = [];

  try {
    const run = await client.run({
      engine: 'tim-gpt',
      input: { instructions, tools },
      options: { awaitCompletion: true },
    });

    console.log(`   Status: ${run.status}`);

    if (run.status !== 'succeeded') {
      console.error('   Full run:', JSON.stringify(run, null, 2));
      throw new Error(`Agent 4 failed: ${run.status}`);
    }

    if (!run.result) {
      throw new Error(`No result returned`);
    }

    let plan: string;
    const answer = run.result.answer;
    
    if (typeof answer === 'string') {
      try {
        const parsed = JSON.parse(answer);
        plan = parsed.final_answer || answer;
      } catch {
        plan = answer;
      }
    } else if (typeof answer === 'object' && answer !== null) {
      plan = (answer as any).final_answer || JSON.stringify(answer, null, 2);
    } else {
      plan = String(answer);
    }

    console.log('✅ [Agent 4] Migration plan created');
    console.log(`   Tokens: ${(run.usage as any)?.inputTokens + (run.usage as any)?.outputTokens || 0}`);
    console.log(`   Duration: ${Math.round(((run.usage as any)?.durationMs || 0) / 1000)}s`);

    return {
      runId: run.runId,
      plan,
      usage: run.usage,
    };
  } catch (error) {
    console.error('❌ [Agent 4] Error:', error);
    throw error;
  }
}