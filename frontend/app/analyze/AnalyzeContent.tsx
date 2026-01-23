'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AnalysisResult {
  repoUrl: string;
  targetStack: string;
  currentStackAnalysis: string;
  migrationResearch: string;
  effortEstimate: string;
  migrationPlan: string;
  totalTokens: number;
  totalCost: number;
  totalDuration: number;
}

export default function AnalyzeContent() {
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get('repo') || '';
  const targetStack = searchParams.get('target') || '';
  
  const [status, setStatus] = useState<'analyzing' | 'complete' | 'error'>('analyzing');
  const [progress, setProgress] = useState(0);
  const [currentAgent, setCurrentAgent] = useState(1);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!repoUrl || !targetStack) {
      setError('Missing repository URL or target stack');
      setStatus('error');
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 1;
      });
    }, 10000);

    const agentInterval = setInterval(() => {
      setCurrentAgent((prev) => {
        if (prev >= 4) return 4;
        return prev + 1;
      });
    }, 240000);

    fetch('http://localhost:3001/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl, targetStack }),
    })
      .then((res) => res.json())
      .then((data) => {
        clearInterval(progressInterval);
        clearInterval(agentInterval);
        
        if (data.success) {
          setResult(data.data);
          setProgress(100);
          setStatus('complete');
        } else {
          setError(data.error || 'Analysis failed');
          setStatus('error');
        }
      })
      .catch((err) => {
        clearInterval(progressInterval);
        clearInterval(agentInterval);
        setError(err.message);
        setStatus('error');
      });

    return () => {
      clearInterval(progressInterval);
      clearInterval(agentInterval);
    };
  }, [repoUrl, targetStack]);

  const agents = [
    { name: 'Stack Analyzer', icon: '🔍', description: 'Analyzing current tech stack...' },
    { name: 'Migration Researcher', icon: '📚', description: 'Researching migration best practices...' },
    { name: 'Effort Estimator', icon: '💰', description: 'Estimating time and cost...' },
    { name: 'Migration Planner', icon: '📋', description: 'Creating migration roadmap...' },
  ];

  if (status === 'error') {
    return (
      <div className="error-container">
        <div className="error-card">
          <div className="error-icon">
            <span>❌</span>
          </div>
          <h2 className="error-title">Analysis Failed</h2>
          <p className="error-message">{error}</p>
          <Link href="/" className="btn-secondary">
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'complete' && result) {
    return (
      <div className="results-page">
        <header className="header">
          <div className="header-content">
            <div className="logo-container">
              <div className="logo-icon">
                <span>🚢</span>
              </div>
              <div className="logo-text">
                <h1>CodeVoyage</h1>
                <p>Analysis Complete</p>
              </div>
            </div>
            <Link href="/" className="header-link">
              New Analysis
            </Link>
          </div>
        </header>

        <main className="results-container">
          <div className="results-summary">
            <div className="results-header">
              <div>
                <h2 className="results-title">Analysis Complete ✅</h2>
                <p className="results-meta">Repository: {result.repoUrl}</p>
                <p className="results-meta">Target: {result.targetStack}</p>
              </div>
              <div className="results-duration">
                <span className="duration-label">Total Duration</span>
                <div className="duration-value">
                  {Math.round(result.totalDuration / 60000)} min
                </div>
              </div>
            </div>

            <div className="results-stats">
              <div className="stat-item">
                <span className="stat-label">Tokens Used</span>
                <div className="stat-value">{result.totalTokens.toLocaleString()}</div>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Cost</span>
                <div className="stat-value">${result.totalCost.toFixed(4)}</div>
              </div>
              <div className="stat-item">
                <span className="stat-label">Agents Used</span>
                <div className="stat-value">4</div>
              </div>
            </div>
          </div>

          <ResultsTabs result={result} />
        </main>
      </div>
    );
  }

  return (
    <div className="analysis-page">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-icon">
              <span>🚢</span>
            </div>
            <div className="logo-text">
              <h1>CodeVoyage</h1>
              <p>Analyzing Repository...</p>
            </div>
          </div>
        </div>
      </header>

      <main className="analysis-container">
        <div className="analysis-card">
          <div className="agent-icon-large">
            <span>{agents[currentAgent - 1]?.icon}</span>
          </div>
          <h2 className="agent-title">
            Agent {currentAgent} of 4
          </h2>
          <p className="agent-description">{agents[currentAgent - 1]?.description}</p>

          <div className="progress-container">
            <div className="progress-header">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="agent-status-list">
            {agents.map((agent, idx) => {
              const agentClass = idx + 1 < currentAgent ? 'completed' : idx + 1 === currentAgent ? 'active' : 'pending';
              return (
                <div key={idx} className={`agent-status-item ${agentClass}`}>
                  <span className="agent-icon">{agent.icon}</span>
                  <div className="agent-info">
                    <span className="agent-name">{agent.name}</span>
                    <span className="agent-desc">{agent.description}</span>
                  </div>
                  {idx + 1 < currentAgent && <span className="checkmark">✓</span>}
                  {idx + 1 === currentAgent && (
                    <svg className="spinner-small" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>

          <p className="progress-note">
            This analysis typically takes 15-20 minutes. Please keep this tab open.
          </p>
        </div>
      </main>
    </div>
  );
}

function ResultsTabs({ result }: { result: AnalysisResult }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Current Stack', content: result.currentStackAnalysis, icon: '🔍' },
    { name: 'Migration Research', content: result.migrationResearch, icon: '📚' },
    { name: 'Effort Estimate', content: result.effortEstimate, icon: '💰' },
    { name: 'Migration Plan', content: result.migrationPlan, icon: '📋' },
  ];

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`tab-button ${activeTab === idx ? 'active' : ''}`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="tab-content">
        <pre className="tab-content-text">
          {tabs[activeTab].content}
        </pre>

        <div className="tab-actions">
          <button
            onClick={() => {
              const blob = new Blob([tabs[activeTab].content], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${tabs[activeTab].name.toLowerCase().replace(/ /g, '_')}.md`;
              a.click();
            }}
            className="download-button"
          >
            Download {tabs[activeTab].name}
          </button>
        </div>
      </div>
    </div>
  );
}
