import { analyzeCurrentStack } from './agents/current-stack-analyzer.js';

async function main() {
  console.log('🚀 TechStackAdvisor - Testing Current Stack Analyzer\n');

  const repoUrl = process.argv[2] || 'https://github.com/mtrishal123/food-ordering-app';

  try {
    const result = await analyzeCurrentStack(repoUrl);
    
    console.log('\n' + '='.repeat(80));
    console.log('📊 ANALYSIS RESULT');
    console.log('='.repeat(80) + '\n');
    console.log(result.analysis);
    console.log('\n' + '='.repeat(80));
    console.log('📈 Stats:');
    console.log(`   Run ID: ${result.runId}`);
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

main();