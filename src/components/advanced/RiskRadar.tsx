import React, { useState } from 'react';
import { AlertTriangle, Shield, Zap, FileText, Calendar, TrendingDown } from 'lucide-react';

interface RiskAlert {
  id: string;
  type: 'regulatory' | 'political' | 'market' | 'sector';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string[];
  probability: number;
  timeframe: string;
  source: string;
  timestamp: string;
}

const mockRiskAlerts: RiskAlert[] = [
  {
    id: '1',
    type: 'regulatory',
    severity: 'high',
    title: 'New AI Regulation Proposal',
    description: 'Senate committee proposes strict AI development regulations that could impact major tech companies',
    impact: ['NVDA', 'GOOGL', 'MSFT', 'META'],
    probability: 75,
    timeframe: '3-6 months',
    source: 'Congressional Filing',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'political',
    severity: 'medium',
    title: 'Trade Policy Shift Signals',
    description: 'Multiple government officials reducing exposure to Chinese markets ahead of policy announcement',
    impact: ['BABA', 'JD', 'PDD', 'BIDU'],
    probability: 68,
    timeframe: '1-2 months',
    source: 'Insider Trading Analysis',
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    type: 'market',
    severity: 'critical',
    title: 'Banking Sector Stress Indicators',
    description: 'AI detects unusual derivative positioning suggesting potential banking sector volatility',
    impact: ['JPM', 'BAC', 'WFC', 'C'],
    probability: 82,
    timeframe: '2-4 weeks',
    source: 'AI Pattern Recognition',
    timestamp: '6 hours ago'
  },
  {
    id: '4',
    type: 'sector',
    severity: 'medium',
    title: 'Energy Transition Acceleration',
    description: 'Government officials increasing clean energy positions while reducing oil exposure',
    impact: ['XOM', 'CVX', 'COP', 'EOG'],
    probability: 71,
    timeframe: '6-12 months',
    source: 'Political Trading Tracker',
    timestamp: '1 day ago'
  }
];

const RiskRadar: React.FC = () => {
  const [selectedRisk, setSelectedRisk] = useState<RiskAlert | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-500 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-500 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'regulatory': return <FileText className="h-4 w-4" />;
      case 'political': return <Shield className="h-4 w-4" />;
      case 'market': return <TrendingDown className="h-4 w-4" />;
      case 'sector': return <Zap className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-red-400';
    if (probability >= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  const filteredAlerts = filterSeverity === 'all' 
    ? mockRiskAlerts 
    : mockRiskAlerts.filter(alert => alert.severity === filterSeverity);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Risk Radar</h2>
          <p className="text-gray-300 mt-1">AI-powered regulatory and political risk monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-400 animate-pulse" />
          <span className="text-sm text-red-400">Active Monitoring</span>
        </div>
      </div>

      {/* Risk Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-red-400">1</div>
          <div className="text-sm text-gray-300">Critical Risks</div>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-orange-400">1</div>
          <div className="text-sm text-gray-300">High Risks</div>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-yellow-400">2</div>
          <div className="text-sm text-gray-300">Medium Risks</div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-400">74%</div>
          <div className="text-sm text-gray-300">Avg Probability</div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-300">Filter by severity:</span>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Risk Alerts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Active Risk Alerts</h3>
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setSelectedRisk(alert)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:bg-white/5 ${
                selectedRisk?.id === alert.id ? 'bg-white/10' : 'bg-white/5'
              } ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(alert.type)}
                  <span className="font-medium text-white">{alert.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className={`text-sm font-medium ${getProbabilityColor(alert.probability)}`}>
                    {alert.probability}%
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{alert.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{alert.timestamp}</span>
                </div>
                <span>{alert.timeframe}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Risk Detail Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          {selectedRisk ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{selectedRisk.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm border ${getSeverityColor(selectedRisk.severity)}`}>
                  {selectedRisk.severity.toUpperCase()}
                </span>
              </div>
              
              <p className="text-gray-300">{selectedRisk.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-400">Probability</span>
                  <div className={`text-xl font-bold ${getProbabilityColor(selectedRisk.probability)}`}>
                    {selectedRisk.probability}%
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-400">Timeframe</span>
                  <div className="text-xl font-bold text-white">{selectedRisk.timeframe}</div>
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-400 block mb-2">Potentially Impacted Assets</span>
                <div className="flex flex-wrap gap-2">
                  {selectedRisk.impact.map((asset, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-red-500/20 text-red-400 rounded border border-red-400/30 text-sm"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Source: {selectedRisk.source}</span>
                  <span>{selectedRisk.timestamp}</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-colors">
                  Create Alert
                </button>
                <button className="flex-1 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg border border-purple-400/30 hover:bg-purple-500/30 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Select a risk alert to view detailed analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskRadar;