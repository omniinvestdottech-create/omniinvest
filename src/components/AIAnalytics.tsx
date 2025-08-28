import React, { useState } from 'react';
import { Brain, Zap, Target, FileText, TrendingUp, AlertCircle } from 'lucide-react';

const AIAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'alerts' | 'predictions'>('reports');

  const renderReports = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Market Sentiment Analysis</h3>
          <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-400/30">
            Bullish
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Overall Market Sentiment</span>
            <span className="text-green-400 font-medium">72% Bullish</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Insider Sentiment</span>
            <span className="text-blue-400 font-medium">68% Positive</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Social Media Buzz</span>
            <span className="text-yellow-400 font-medium">High Activity</span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/10">
            <button className="w-full py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg text-sm text-green-400 hover:from-green-500/30 hover:to-blue-500/30 transition-all duration-200">
              Generate Full Report
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Risk Assessment</h3>
          <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm border border-yellow-400/30">
            Moderate
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Portfolio Volatility</span>
            <span className="text-yellow-400 font-medium">Moderate</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Correlation Risk</span>
            <span className="text-red-400 font-medium">High</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Liquidity Risk</span>
            <span className="text-green-400 font-medium">Low</span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/10">
            <button className="w-full py-2 bg-gradient-to-r from-yellow-500/20 to-red-500/20 border border-yellow-400/30 rounded-lg text-sm text-yellow-400 hover:from-yellow-500/30 hover:to-red-500/30 transition-all duration-200">
              View Risk Details
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">AI-Generated Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Tech Sector Rotation',
              description: 'Multiple insiders reducing tech exposure. Consider diversification.',
              confidence: 85,
              type: 'warning'
            },
            {
              title: 'Green Energy Trend',
              description: 'Celebrity investors increasing clean energy positions by 340%.',
              confidence: 92,
              type: 'opportunity'
            },
            {
              title: 'NVDA Momentum',
              description: 'Strong buying pressure from 3 top-tier insiders detected.',
              confidence: 78,
              type: 'bullish'
            }
          ].map((insight, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  insight.type === 'warning' ? 'bg-red-500/20 text-red-400' :
                  insight.type === 'opportunity' ? 'bg-green-500/20 text-green-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {insight.type.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">{insight.confidence}% confident</span>
              </div>
              <h4 className="font-medium text-white mb-1">{insight.title}</h4>
              <p className="text-sm text-gray-300">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-4">
      {[
        {
          title: 'High-Volume Trading Alert',
          description: 'TSLA experiencing 450% above average volume with multiple insider purchases',
          time: '5 minutes ago',
          priority: 'high',
          actionable: true
        },
        {
          title: 'Sentiment Shift Detection',
          description: 'AI detected rapid sentiment improvement for META across multiple data sources',
          time: '12 minutes ago',
          priority: 'medium',
          actionable: true
        },
        {
          title: 'Regulatory Risk Warning',
          description: 'New tech regulation proposals may impact sector performance',
          time: '1 hour ago',
          priority: 'medium',
          actionable: false
        }
      ].map((alert, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className={`h-5 w-5 ${
                  alert.priority === 'high' ? 'text-red-400' : 'text-yellow-400'
                }`} />
                <h3 className="font-semibold text-white">{alert.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  alert.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {alert.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-300 mb-2">{alert.description}</p>
              <span className="text-sm text-gray-400">{alert.time}</span>
            </div>
            
            {alert.actionable && (
              <button className="ml-4 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-colors">
                Take Action
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPredictions = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Price Predictions</h3>
        
        <div className="space-y-4">
          {[
            { symbol: 'TSLA', current: 248.50, predicted: 285.00, confidence: 72, timeframe: '30 days' },
            { symbol: 'NVDA', current: 875.20, predicted: 950.00, confidence: 68, timeframe: '30 days' },
            { symbol: 'META', current: 512.75, predicted: 580.00, confidence: 75, timeframe: '30 days' }
          ].map((pred, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{pred.symbol}</span>
                <span className="text-sm text-gray-400">{pred.confidence}% confidence</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-300">Current: ${pred.current}</span>
                <span className="text-sm text-green-400">Target: ${pred.predicted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{pred.timeframe}</span>
                <span className="text-xs text-green-400">
                  +{((pred.predicted - pred.current) / pred.current * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Market Trends</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-500/20 rounded-lg border border-green-400/30">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="font-medium text-green-400">Emerging Trend</span>
            </div>
            <h4 className="text-white mb-1">AI Infrastructure Boom</h4>
            <p className="text-sm text-gray-300">
              Multiple insiders increasing positions in AI infrastructure companies
            </p>
          </div>

          <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-blue-400">Sector Focus</span>
            </div>
            <h4 className="text-white mb-1">Healthcare Innovation</h4>
            <p className="text-sm text-gray-300">
              Growing interest in biotech and medical technology stocks
            </p>
          </div>

          <div className="p-4 bg-purple-500/20 rounded-lg border border-purple-400/30">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="font-medium text-purple-400">Quick Wins</span>
            </div>
            <h4 className="text-white mb-1">Event-Driven Opportunities</h4>
            <p className="text-sm text-gray-300">
              Earnings season providing short-term trading opportunities
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Analytics</h1>
          <p className="text-gray-300 mt-1">Advanced AI-powered market analysis and predictions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-400 animate-pulse" />
          <span className="text-sm text-purple-400">AI Engine Active</span>
        </div>
      </div>

      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'reports'
              ? 'bg-purple-500/20 text-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>AI Reports</span>
        </button>
        
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'alerts'
              ? 'bg-purple-500/20 text-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          <span>Smart Alerts</span>
        </button>
        
        <button
          onClick={() => setActiveTab('predictions')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'predictions'
              ? 'bg-purple-500/20 text-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>Predictions</span>
        </button>
      </div>

      {activeTab === 'reports' && renderReports()}
      {activeTab === 'alerts' && renderAlerts()}
      {activeTab === 'predictions' && renderPredictions()}
    </div>
  );
};

export default AIAnalytics;