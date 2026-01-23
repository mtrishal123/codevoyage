import { researchMigration } from './agents/migration-researcher.js';

async function test() {
  console.log('🧪 Testing Agent 2: Migration Researcher\n');

  const currentStack = 'React 19.2.1 with Create React App, Context API, JavaScript';
  const targetStack = 'Next.js 15 with TypeScript and App Router';

  console.log(`Current Stack: ${currentStack}`);
  console.log(`Target Stack: ${targetStack}\n`);

  try {
    const result = await researchMigration(currentStack, targetStack);

    console.log('\n' + '='.repeat(80));
    console.log('🔬 MIGRATION RESEARCH');
    console.log('='.repeat(80) + '\n');
    console.log(result.research);
    console.log('\n' + '='.repeat(80));
    console.log('📈 Stats:');
    console.log(`   Run ID: ${result.runId}`);
    console.log(`   Tokens: ${(result.usage as any)?.inputTokens + (result.usage as any)?.outputTokens || 0}`);
    console.log(`   Duration: ${Math.round(((result.usage as any)?.durationMs || 0) / 1000)}s`);
    console.log(`   Cost: $${((((result.usage as any)?.inputTokens || 0) * 2 + ((result.usage as any)?.outputTokens || 0) * 8) / 1000000).toFixed(4)}`);
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

test();