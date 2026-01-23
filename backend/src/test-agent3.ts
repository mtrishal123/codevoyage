import { analyzeCurrentStack } from './agents/current-stack-analyzer.js';
import { researchMigration } from './agents/migration-researcher.js';
import { estimateEffort } from './agents/effort-estimator.js';

async function test() {
  console.log('🧪 Testing Agent 3: Effort Estimator\n');

  try {
    // First run agents 1 and 2 to get their outputs
    console.log('Running prerequisite agents...\n');
    
    const agent1 = await analyzeCurrentStack('https://github.com/mtrishal123/food-ordering-app');
    const agent2 = await researchMigration(
      'React 19.2.1 with Create React App, Context API, JavaScript',
      'Next.js 15 with TypeScript and App Router'
    );

    console.log('\n🧪 Now testing Agent 3...\n');

    const result = await estimateEffort(
      agent1.analysis,
      agent2.research,
      'https://github.com/mtrishal123/food-ordering-app'
    );

    console.log('\n' + '='.repeat(80));
    console.log('📊 EFFORT ESTIMATE');
    console.log('='.repeat(80) + '\n');
    console.log(result.estimate);
    console.log('\n' + '='.repeat(80));
  } catch (error) {
    console.error('\n❌ Test failed:', error);
  }
}

test();