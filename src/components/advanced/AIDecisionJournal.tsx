import React, { useState } from 'react';
import { Brain, FileText, Lightbulb, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface AIDecision {
  id: string;
  type: 'buy' | 'sell' | 'hold' | 'alert' | 'warning';
  title: string;
  recommendation: string;
  reasoning: string;
  dataSource: string[];
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  timeframe: string;
  expectedOutcome: string;
  actualOutcome?: string;
  status: 'pending' | 'executed' | 'ignored' | 'expired';
  timestamp: string;
  followUpDate?: string;
}

const mockAIDecisions: AIDecision[] = [
  {
    id: '1',
    type: 'buy',
    title: 'Strong Buy Signal: NVDA',
    recommendation: 'Consider increasing NVDA position by 15-20%',
    reasoning: 'AI detected unusual buying patterns from 3 top-tier insiders (Elon Musk, Jensen Huang, and a major hedge fund). Historical analysis shows 85% success rate for similar patterns. Additionally, sentiment analysis from 500+ news sources shows rapidly improving outlook for AI infrastructure spending.',
    dataSource: ['Insider Trading Filings', 'News Sentiment Analysis', 'Options Flow Data', 'Technical Indicators'],
    confidence: 87,
    riskLevel: 'medium',
    timeframe: '2-4 weeks',
    expectedOutcome: '+12-18% price appreciation based on historical patterns',
    actualOutcome: '+14.2% (Achieved)',
    status: 'executed',
    timestamp: '2 weeks ago',
    followUpDate: '1 week from now'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Risk Alert: Tech Sector Rotation',
    recommendation: 'Consider reducing tech exposure by 10-15%',
    reasoning: 'Multiple tech CEOs have been reducing their positions over the past 2 weeks. Pattern recognition algorithm identified this as similar to pre-correction behavior in March 2022. Federal Reserve meeting minutes also suggest potential policy changes that historically impact growth stocks negatively.',
    dataSource: ['Insider Trading Patterns', 'Fed Meeting Minutes', 'Sector Rotation Analysis', 'VIX Indicators'],
    confidence: 74,
    riskLevel: 'high',
    timeframe: '1-3 weeks',
    expectedOutcome: 'Potential 8-12% sector correction if pattern holds',
    status: 'pending',
    timestamp: '3 hours ago'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Opportunity: Green Energy Momentum',
    recommendation: 'Monitor clean energy ETFs for entry opportunity',
    reasoning: 'Celebrity investors (including Leonardo DiCaprio and Bill Gates) have increased clean energy exposure by 340% this quarter. Government officials are also showing increased activity in renewable energy stocks. New infrastructure bill provisions favor solar and wind investments.',
    dataSource: ['Celebrity Investment Tracking', 'Government Official Trades', 'Policy Analysis', 'Sector Momentum'],
    confidence: 92,
    riskLevel: 'low',
    timeframe: '4-8 weeks',
    expectedOutcome: 'Early trend identification opportunity with 20-30% upside potential',
    status: 'pending',
    timestamp: '1 day ago'
  },
  {
    id: '4',
    type: 'hold',
    title: 'Maintain Position: AAPL',
    recommendation: 'Hold current AAPL allocation, avoid adding',
    reasoning: 'Mixed signals from insider activity. Warren Buffett reduced position slightly, but other institutional investors are holding steady. Earnings expectations are realistic, and valuation appears fair. No strong catalysts identified in either direction.',
    dataSource: ['Insider Trading Analysis', 'Earnings Forecasts', 'Valuation Models', 'Institutional Flow'],
    confidence: 68,
    riskLevel: 'low',
    timeframe: '6-12 weeks',
    expectedOutcome: 'Sideways movement expected, 5-8% range',
    actualOutcome: '+2.1% (Within range)',
    status: 'executed',
    timestamp: '1 week ago'
  }
];

const AIDecisionJournal: React.FC = () => {
  const [selectedDecision, setSelectedDecision] = useState<AIDecision | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buy': return <TrendingUp className="h-4 w-4" />;
      case 'sell': return <TrendingUp className="h-4 w-4 rotate-180" />;
      case 'hold': return <Clock className="h-4 w-4" />;
      case 'alert': return <Lightbulb className="h-4 w-4" />;
      case 'warning': return <AlertCircle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'sell': return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'hold': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'alert': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'warning': return 'text-orange-400 bg-orange-500/20 border-orange-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'executed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'ignored': return <AlertCircle className="h-4 w-4 text-gray-400" />;
      case 'expired': return <AlertCircle className="h-4 w-4 text-red-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredDecisions = filterStatus === 'all' 
    ? mockAIDecisions 
    : mockAIDecisions.filter(decision => decision.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">AI Decision Journal</h2>
          <p className="text-gray-300 mt-1">Transparent AI reasoning and decision tracking</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-400 animate-pulse" />
          <span className="text-sm text-purple-400">AI Transparency Mode</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-300">Filter by status:</span>
          <div className="flex space-x-2">
            {['all', 'pending', 'executed', 'ignored', 'expired'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Decision List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-white">AI Decisions</h3>
          {filteredDecisions.map((decision) => (
            <div
              key={decision.id}
              onClick={() => setSelectedDecision(decision)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                selectedDecision?.id === decision.id
                  ? 'bg-blue-500/20 border-blue-400/30'
                  : 'bg-white/10 border-white/20 hover:bg-white/15'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-1 rounded border ${getTypeColor(decision.type)}`}>
                    {getTypeIcon(decision.type)}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(decision.type)}`}>
                    {decision.type.toUpperCase()}
                  </span>
                </div>
                {getStatusIcon(decision.status)}
              </div>
              
              <h4 className="font-medium text-white mb-2">{decision.title}</h4>
              <p className="text-sm text-gray-300 mb-3 line-clamp-2">{decision.recommendation}</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className={`font-medium ${getConfidenceColor(decision.confidence)}`}>
                  {decision.confidence}% confidence
                </span>
                <span className="text-gray-400">{decision.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Decision Details */}
        <div className="lg:col-span-2">
          {selectedDecision ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg border ${getTypeColor(selectedDecision.type)}`}>
                      {getTypeIcon(selectedDecision.type)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedDecision.title}</h3>
                      <p className="text-gray-400">{selectedDecision.timestamp}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm border ${getTypeColor(selectedDecision.type)}`}>
                    {selectedDecision.type.toUpperCase()}
                  </span>
                  {getStatusIcon(selectedDecision.status)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className={`text-xl font-bold ${getConfidenceColor(selectedDecision.confidence)}`}>
                    {selectedDecision.confidence}%
                  </div>
                  <div className="text-sm text-gray-400">Confidence</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className={`px-2 py-1 rounded text-sm ${getRiskColor(selectedDecision.riskLevel)}`}>
                    {selectedDecision.riskLevel.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-400">Risk Level</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold text-white">{selectedDecision.timeframe}</div>
                  <div className="text-sm text-gray-400">Timeframe</div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">AI Recommendation</h4>
                <p className="text-gray-300 bg-white/5 p-4 rounded-lg">{selectedDecision.recommendation}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">AI Reasoning</h4>
                <p className="text-gray-300 leading-relaxed">{selectedDecision.reasoning}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Data Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDecision.dataSource.map((source, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-400/30"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Expected Outcome</h4>
                  <p className="text-gray-300 bg-white/5 p-3 rounded-lg">{selectedDecision.expectedOutcome}</p>
                </div>
                
                {selectedDecision.actualOutcome && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Actual Outcome</h4>
                    <p className="text-green-400 bg-green-500/10 p-3 rounded-lg border border-green-400/30">
                      {selectedDecision.actualOutcome}
                    </p>
                  </div>
                )}
              </div>

              {selectedDecision.followUpDate && (
                <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium text-yellow-400">Follow-up Scheduled</span>
                  </div>
                  <p className="text-gray-300 mt-1">AI will reassess this decision on {selectedDecision.followUpDate}</p>
                </div>
              )}

              <div className="flex space-x-3 pt-4 border-t border-white/10">
                <button className="flex-1 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-400/30 hover:bg-green-500/30 transition-colors">
                  Mark as Executed
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg border border-gray-400/30 hover:bg-gray-500/30 transition-colors">
                  Ignore Recommendation
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-colors">
                  Request Update
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Select an AI decision to view detailed reasoning and analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDecisionJournal;