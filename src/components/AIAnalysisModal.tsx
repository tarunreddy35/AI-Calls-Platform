import { X, Brain, Sparkles, TrendingUp, CheckCircle, MessageSquare } from 'lucide-react';
import { AIAnalysis } from '../types';

interface AIAnalysisModalProps {
  analysis: AIAnalysis;
  callSubject: string;
  onClose: () => void;
  loading?: boolean;
}

export function AIAnalysisModal({ analysis, callSubject, onClose, loading }: AIAnalysisModalProps) {
  const getSentimentColor = (sentiment: string) => {
    const lower = sentiment.toLowerCase();
    if (lower.includes('positive')) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
    if (lower.includes('negative')) return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
    return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">AI Analysis</h2>
              <p className="text-purple-100 text-sm">{callSubject}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Analyzing call with AI...</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Summary */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Summary</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            {/* Sentiment */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-3">
                <TrendingUp className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sentiment</h3>
              </div>
              <div className={`inline-block px-4 py-2 rounded-full font-medium ${getSentimentColor(analysis.sentiment)}`}>
                {analysis.sentiment}
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Points</h3>
              </div>
              <ul className="space-y-2">
                {analysis.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 dark:text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Intent */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <MessageSquare className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Intent</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {analysis.customerIntent}
              </p>
            </div>

            {/* Action Items */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Action Items</h3>
              </div>
              <ul className="space-y-2">
                {analysis.actionItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
