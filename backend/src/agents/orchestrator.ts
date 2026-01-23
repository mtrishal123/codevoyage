import * as fs from 'fs';
import * as path from 'path';
import { analyzeCurrentStack } from './current-stack-analyzer.js';
import { researchMigration } from './migration-researcher.js';
import { estimateEffort } from './effort-estimator.js';
import { createMigrationPlan } from './migration-planner.js';

export interface MigrationAnalysisResult {
  repoUrl: string;
  targetStack: string;
  currentStackAnalysis: string;
  migrationResearch: string;
  effortEstimate: string;
  migrationPlan: string;
  runIds: {
    agent1: string;
    agent2: string;
    agent3: string;
    agent4: string;
  };
  totalTokens: number;
  totalCost: number;
  totalDuration: number;
  generatedAt: string;
}

export async function orchestrateMigrationAnalysis(
  repoUrl: string,
  targetStack: string
): Promise<MigrationAnalysisResult> {
  console.log('\n🚀 TechStackAdvisor - Multi-Agent Migration Analysis\n');
  console.log('='.repeat(80));
  console.log(`📍 Repository: ${repoUrl}`);
  console.log(`🎯 Target Stack: ${targetStack}`);
  console.log('='.repeat(80) + '\n');

  const startTime = Date.now();
  let totalTokens = 0;
  let totalCost = 0;

  try {
    // Agent 1: Analyze Current Stack
    console.log('🔹 Step 1/4: Analyzing current tech stack...\n');
    const agent1Result = await analyzeCurrentStack(repoUrl);
    totalTokens += (agent1Result.usage as any)?.inputTokens + (agent1Result.usage as any)?.outputTokens || 0;
    totalCost += ((agent1Result.usage as any)?.inputTokens * 2 + (agent1Result.usage as any)?.outputTokens * 8) / 1000000;

    // Agent 2: Research Migration Path
    console.log('\n🔹 Step 2/4: Researching migration strategies...\n');
    const currentStackSummary = `React 19.2.1 with Create React App, Context API, JavaScript`;
    const agent2Result = await researchMigration(currentStackSummary, targetStack);
    totalTokens += (agent2Result.usage as any)?.inputTokens + (agent2Result.usage as any)?.outputTokens || 0;
    totalCost += ((agent2Result.usage as any)?.inputTokens * 2 + (agent2Result.usage as any)?.outputTokens * 8) / 1000000;

    // Agent 3: Estimate Effort
    console.log('\n🔹 Step 3/4: Estimating migration effort...\n');
    const agent3Result = await estimateEffort(
      agent1Result.analysis,
      agent2Result.research,
      repoUrl
    );
    totalTokens += (agent3Result.usage as any)?.inputTokens + (agent3Result.usage as any)?.outputTokens || 0;
    totalCost += ((agent3Result.usage as any)?.inputTokens * 2 + (agent3Result.usage as any)?.outputTokens * 8) / 1000000;

    // Agent 4: Create Migration Plan
    console.log('\n🔹 Step 4/4: Creating comprehensive migration plan...\n');
    const agent4Result = await createMigrationPlan(
      agent1Result.analysis,
      agent2Result.research,
      agent3Result.estimate,
      repoUrl,
      targetStack
    );
    totalTokens += (agent4Result.usage as any)?.inputTokens + (agent4Result.usage as any)?.outputTokens || 0;
    totalCost += ((agent4Result.usage as any)?.inputTokens * 2 + (agent4Result.usage as any)?.outputTokens * 8) / 1000000;

    const totalDuration = Date.now() - startTime;

    console.log('\n' + '='.repeat(80));
    console.log('✅ All Agents Completed Successfully!');
    console.log('='.repeat(80));
    console.log(`⏱️  Total Duration: ${Math.round(totalDuration / 1000)}s`);
    console.log(`🎫 Total Tokens: ${totalTokens.toLocaleString()}`);
    console.log(`💰 Total Cost: $${totalCost.toFixed(4)}`);
    console.log('='.repeat(80) + '\n');

    const result: MigrationAnalysisResult = {
      repoUrl,
      targetStack,
      currentStackAnalysis: agent1Result.analysis,
      migrationResearch: agent2Result.research,
      effortEstimate: agent3Result.estimate,
      migrationPlan: agent4Result.plan,
      runIds: {
        agent1: agent1Result.runId,
        agent2: agent2Result.runId,
        agent3: agent3Result.runId,
        agent4: agent4Result.runId,
      },
      totalTokens,
      totalCost,
      totalDuration,
      generatedAt: new Date().toISOString(),
    };

    // Save to file
    saveResults(result);

    return result;
  } catch (error) {
    console.error('\n❌ Orchestration failed:', error);
    throw error;
  }
}

function saveResults(result: MigrationAnalysisResult): void {
  const outputDir = path.join(process.cwd(), 'outputs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save individual reports
  const timestamp = Date.now();
  const repoName = result.repoUrl.split('/').slice(-2).join('_');

  // 1. Current Stack Analysis
  fs.writeFileSync(
    path.join(outputDir, `${repoName}_current_stack_${timestamp}.md`),
    `# Current Stack Analysis\n\n${result.currentStackAnalysis}`,
    'utf-8'
  );

  // 2. Migration Research
  fs.writeFileSync(
    path.join(outputDir, `${repoName}_migration_research_${timestamp}.md`),
    `# Migration Research\n\n${result.migrationResearch}`,
    'utf-8'
  );

  // 3. Effort Estimate
  fs.writeFileSync(
    path.join(outputDir, `${repoName}_effort_estimate_${timestamp}.md`),
    `# Effort Estimate\n\n${result.effortEstimate}`,
    'utf-8'
  );

  // 4. Migration Plan
  fs.writeFileSync(
    path.join(outputDir, `${repoName}_migration_plan_${timestamp}.md`),
    `# Migration Plan\n\n${result.migrationPlan}`,
    'utf-8'
  );

  // 5. Complete Report
  const completeReport = `# TechStackAdvisor - Complete Migration Analysis

**Repository**: ${result.repoUrl}
**Target Stack**: ${result.targetStack}
**Generated**: ${result.generatedAt}

---

## Summary

- **Total Duration**: ${Math.round(result.totalDuration / 1000)}s (${Math.round(result.totalDuration / 60000)} minutes)
- **Total Tokens**: ${result.totalTokens.toLocaleString()}
- **Total Cost**: $${result.totalCost.toFixed(4)}

**Agent Run IDs:**
- Agent 1 (Current Stack): ${result.runIds.agent1}
- Agent 2 (Migration Research): ${result.runIds.agent2}
- Agent 3 (Effort Estimate): ${result.runIds.agent3}
- Agent 4 (Migration Plan): ${result.runIds.agent4}

---

# 1. Current Stack Analysis

${result.currentStackAnalysis}

---

# 2. Migration Research

${result.migrationResearch}

---

# 3. Effort Estimate

${result.effortEstimate}

---

# 4. Complete Migration Plan

${result.migrationPlan}

---

*Generated by TechStackAdvisor - Multi-Agent Migration Analysis System*
*Powered by Subconscious Platform*
`;

  fs.writeFileSync(
    path.join(outputDir, `${repoName}_COMPLETE_REPORT_${timestamp}.md`),
    completeReport,
    'utf-8'
  );

  console.log(`📁 Reports saved to: ${outputDir}`);
  console.log(`   - Current Stack Analysis`);
  console.log(`   - Migration Research`);
  console.log(`   - Effort Estimate`);
  console.log(`   - Migration Plan`);
  console.log(`   - COMPLETE REPORT (all-in-one)\n`);
}