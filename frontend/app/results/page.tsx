import { Suspense } from 'react';
import ResultsContent from './ResultsContent';

export default function ResultsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultsContent />
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