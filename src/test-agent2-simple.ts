import { Subconscious } from 'subconscious';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Subconscious({
  apiKey: process.env.SUBCONSCIOUS_API_KEY!,
});

async function testSimple() {
  console.log('🧪 Testing Agent 2 with tim-gpt AND tools...\n');

  try {
    const run = await client.run({
      engine: 'tim-gpt',
      input: {
        instructions: 'Search the web for: What are the best practices for migrating from Create React App to Next.js? Find official guides and case studies.',
        tools: [
          { type: 'platform', id: 'web_search', options: {} },
          { type: 'platform', id: 'webpage_understanding', options: {} },
        ],
      },
      options: { awaitCompletion: true },
    });

    console.log(`Status: ${run.status}`);
    console.log(`Run ID: ${run.runId}`);

    if (run.status === 'succeeded' && run.result) {
      console.log('\n✅ Result:');
      const answer = run.result.answer;
      if (typeof answer === 'string') {
        console.log(answer);
      } else if (typeof answer === 'object') {
        console.log((answer as any).final_answer || JSON.stringify(answer, null, 2));
      }
      console.log(`\nTokens: ${(run.usage as any)?.inputTokens + (run.usage as any)?.outputTokens || 0}`);
    } else {
      console.error('❌ Full response:', JSON.stringify(run, null, 2));
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testSimple();