import { analyzeCurrentStack } from './agents/current-stack-analyzer.js';
import { researchMigration } from './agents/migration-researcher.js';
import { estimateEffort } from './agents/effort-estimator.js';
import { createMigrationPlan } from './agents/migration-planner.js';

async function test() {
  console.log('🧪 Testing Agent 4: Migration Planner\n');

  try {
    // Run prerequisite agents
    console.log('Running prerequisite agents (1, 2, 3)...\n');
    
    const agent1 = await analyzeCurrentStack('https://github.com/mtrishal123/food-ordering-app');
    
    const agent2 = await researchMigration(
      'React 19.2.1 with Create React App, Context API, JavaScript',
      'Next.js 15 with TypeScript and App Router'
    );

    const agent3 = await estimateEffort(
      agent1.analysis,
      agent2.research,
      'https://github.com/mtrishal123/food-ordering-app'
    );

    console.log('\n🧪 Now testing Agent 4...\n');

    const result = await createMigrationPlan(
      agent1.analysis,
      agent2.research,
      agent3.estimate,
      'https://github.com/mtrishal123/food-ordering-app',
      'Next.js 15 with TypeScript and App Router'
    );

    console.log('\n' + '='.repeat(80));
    console.log('📋 MIGRATION PLAN');
    console.log('='.repeat(80) + '\n');
    console.log(result.plan);
    console.log('\n' + '='.repeat(80));
    console.log('📈 Stats:');
    console.log(`   Run ID: ${result.runId}`);
    console.log(`   Tokens: ${(result.usage as any)?.inputTokens + (result.usage as any)?.outputTokens || 0}`);
    console.log(`   Duration: ${Math.round(((result.usage as any)?.durationMs || 0) / 1000)}s`);
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

test();