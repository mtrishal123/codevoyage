import { Suspense } from 'react';
import AnalyzeContent from './AnalyzeContent';

export default function AnalyzePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnalyzeContent />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-4xl">🚢</span>
        </div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}