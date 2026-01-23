'use client';

import { useSearchParams } from 'next/navigation';

export default function ResultsContent() {
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get('repo');
  const targetStack = searchParams.get('target');

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
              <p>Analysis Results</p>
            </div>
          </div>
          <a href="/" className="header-link">
            Back to Home
          </a>
        </div>
      </header>

      <main className="results-container">
        <div className="results-summary">
          <h2 className="results-title">
            Migration Analysis Complete
          </h2>
          
          <div className="results-info">
            <p className="results-meta"><strong>Repository:</strong> {repoUrl}</p>
            <p className="results-meta"><strong>Target Stack:</strong> {targetStack}</p>
          </div>

          <div className="results-placeholder">
            <p className="placeholder-text">
              Results will be displayed here once the backend integration is complete.
            </p>
            <p className="placeholder-note">
              Analysis takes approximately 15 minutes to complete
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
