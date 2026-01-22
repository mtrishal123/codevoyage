export interface CurrentStackAnalysis {
  primaryLanguage: string;
  frameworks: string[];
  libraries: string[];
  buildTools: string[];
  packageManager: string;
  architecture: string;
  keyFiles: string[];
  complexity: 'low' | 'medium' | 'high';
  estimatedLinesOfCode: number;
  summary: string;
}

export interface MigrationResearch {
  targetStack: string;
  migrationPath: string;
  commonChallenges: string[];
  bestPractices: string[];
  toolsAndLibraries: string[];
  caseStudies: string[];
  summary: string;
}

export interface EffortEstimate {
  estimatedHours: number;
  estimatedWeeks: number;
  teamSize: number;
  phases: Array<{
    name: string;
    duration: string;
    effort: string;
  }>;
  complexity: 'low' | 'medium' | 'high';
  risks: string[];
  summary: string;
}

export interface MigrationPlan {
  executiveSummary: string;
  currentState: string;
  targetState: string;
  migrationStrategy: string;
  phases: Array<{
    phase: number;
    name: string;
    duration: string;
    tasks: string[];
    deliverables: string[];
  }>;
  risks: string[];
  recommendations: string[];
  estimatedCost: string;
  timeline: string;
}

export interface MigrationAnalysis {
  repoUrl: string;
  targetStack: string;
  currentStack: CurrentStackAnalysis;
  migrationResearch: MigrationResearch;
  effortEstimate: EffortEstimate;
  migrationPlan: MigrationPlan;
  runIds: {
    currentStack: string;
    migrationResearch: string;
    effortEstimate: string;
    migrationPlan: string;
  };
  generatedAt: string;
  totalTokensUsed: number;
  totalCost: number;
}