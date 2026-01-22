import { orchestrateMigrationAnalysis } from './agents/orchestrator.js';

async function test() {
  console.log('🧪 Testing Full Multi-Agent Orchestration\n');

  try {
    const result = await orchestrateMigrationAnalysis(
      'https://github.com/mtrishal123/food-ordering-app',
      'Next.js 15 with TypeScript and App Router'
    );

    console.log('✨ Orchestration complete! Check the outputs folder for all reports.\n');
  } catch (error) {
    console.error('\n❌ Orchestration failed:', error);
    process.exit(1);
  }
}

test();