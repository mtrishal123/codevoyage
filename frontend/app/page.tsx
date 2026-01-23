'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState('');
  const [targetStack, setTargetStack] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!repoUrl || !targetStack) {
      setError('Please fill in all fields');
      return;
    }

    if (!repoUrl.includes('github.com')) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    router.push(`/analyze?repo=${encodeURIComponent(repoUrl)}&target=${encodeURIComponent(targetStack)}`);
  };

  return (
    <div className="page">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-icon">
              <span>🚢</span>
            </div>
            <div className="logo-text">
              <h1>CodeVoyage</h1>
              <p>AI-Powered Migration Planning</p>
            </div>
          </div>
          <a href="https://github.com/mtrishal123/codevoyage" target="_blank" rel="noopener noreferrer" className="header-link">
            GitHub
          </a>
        </div>
      </header>

      <main className="main-content">
        <div className="hero">
          <h2 className="hero-title">Chart Your Migration Journey</h2>
          <p className="hero-subtitle">AI-powered analysis for tech stack migrations</p>
          <p className="hero-description">Powered by multi-agent AI system using Subconscious</p>
        </div>

        <div className="container">
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="repoUrl" className="form-label">
                  GitHub Repository URL
                </label>
                <input
                  type="text"
                  id="repoUrl"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="form-input"
                  disabled={loading}
                />
                <p className="form-hint">
                  Example: https://github.com/mtrishal123/food-ordering-app
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="targetStack" className="form-label">
                  Target Tech Stack
                </label>
                <input
                  type="text"
                  id="targetStack"
                  value={targetStack}
                  onChange={(e) => setTargetStack(e.target.value)}
                  placeholder="e.g., Next.js 15 with TypeScript and App Router"
                  className="form-input"
                  disabled={loading}
                />
                <p className="form-hint">
                  Popular: Next.js 15 with TypeScript and App Router
                </p>
              </div>

              {error && (
                <div className="error-alert">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? (
                  <>
                    <svg className="spinner" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>🚀 Start Analysis</span>
                )}
              </button>
            </form>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon feature-icon-blue">
                <span>🔍</span>
              </div>
              <h3 className="feature-title">Stack Analysis</h3>
              <p className="feature-text">Deep analysis of your current tech stack, dependencies, and architecture</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-purple">
                <span>📚</span>
              </div>
              <h3 className="feature-title">Migration Research</h3>
              <p className="feature-text">AI researches best practices, tools, and real-world case studies</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-green">
                <span>💰</span>
              </div>
              <h3 className="feature-title">Effort Estimation</h3>
              <p className="feature-text">Realistic timeline and cost estimates based on project complexity</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-orange">
                <span>📋</span>
              </div>
              <h3 className="feature-title">Migration Roadmap</h3>
              <p className="feature-text">Complete actionable plan with phases, risks, and success metrics</p>
            </div>
          </div>

          <div className="footer">
            <p>Built with Subconscious AI Platform - Multi-Agent Architecture</p>
            <p>Powered by 4 specialized AI agents working together</p>
          </div>
        </div>
      </main>
    </div>
  );
}