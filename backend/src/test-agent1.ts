import { analyzeCurrentStack } from './agents/current-stack-analyzer.js';

async function test() {
  console.log('🧪 Testing Agent 1: Current Stack Analyzer\n');
  console.log('Repository: https://github.com/mtrishal123/food-ordering-app\n');

  try {
    const result = await analyzeCurrentStack(
      'https://github.com/mtrishal123/food-ordering-app'
    );

    console.log('\n' + '='.repeat(80));
    console.log('📊 CURRENT STACK ANALYSIS');
    console.log('='.repeat(80) + '\n');
    console.log(result.analysis);
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