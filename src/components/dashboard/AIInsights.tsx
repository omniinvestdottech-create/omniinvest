import React from 'react';
import { Brain, Zap, AlertCircle, Lightbulb } from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend' | 'educational';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
}

const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'High-Conviction Buy Signal',
    description: 'AI detected unusual buying patterns in NVDA from 3 top-tier insiders. Historical data shows 85% success rate for similar patterns.',
    confidence: 87,
    actionable: true
  },
  {
    id: '2',
    type: 'risk',
    title: 'Sector Rotation Warning',
    description: 'Multiple tech CEOs reducing positions. Consider diversifying into defensive sectors based on insider sentiment analysis.',
    confidence: 74,
    actionable: true
  },
  {
    id: '3',
    type: 'trend',
    title: 'Emerging Green Energy Play',
    description: 'Celebrity investors increasing clean energy exposure by 340% this quarter. Early trend identification opportunity.',
    confidence: 92,
    actionable: false
  },
  {
    id: '4',
    type: 'educational',
    title: 'Insider Trading Patterns',
    description: 'Learn why politicians\' trades often outperform the market and how to interpret disclosure timing.',
    confidence: 100,
    actionable: false
  }
];

const AIInsights: React.FC = () => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Lightbulb className="h-4 w-4" />;
      case 'risk': return <AlertCircle className="h-4 w-4" />;
      case 'trend': return <Zap className="h-4 w-4" />;
      case 'educational': return <Brain className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'risk': return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'trend': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'educational': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">AI Insights</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
          <span className="text-xs text-purple-400">AI Active</span>
        </div>
      </div>

      <div className="space-y-4">
        {mockInsights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg border ${getInsightColor(insight.type)}`}>
                  {getInsightIcon(insight.type)}
                </div>
                
                <div>
                  <h3 className="font-medium text-white text-sm">{insight.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getInsightColor(insight.type)} capitalize`}>
                    {insight.type}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                  {insight.confidence}%
                </span>
                {insight.actionable && (
                  <button className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded border border-blue-400/30 hover:bg-blue-500/30 transition-colors">
                    Act
                  </button>
                )}
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              {insight.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">AI Analysis Summary</span>
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-green-400">2 Opportunities</span>
            <span className="text-red-400">1 Risk</span>
            <span className="text-blue-400">1 Trend</span>
          </div>
        </div>
        
        <div className="mt-2">
          <button className="w-full py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-lg text-sm text-purple-400 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-200">
            Generate Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;