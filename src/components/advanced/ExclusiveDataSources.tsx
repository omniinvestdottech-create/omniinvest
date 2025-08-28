import React, { useState } from 'react';
import { Plane, Satellite, FileText, Building, Radar, Globe, Zap, Eye } from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: 'jet_tracking' | 'satellite' | 'patent' | 'executive_calendar';
  icon: React.ComponentType<any>;
  description: string;
  lastUpdate: string;
  dataPoints: number;
  insights: string[];
  status: 'active' | 'processing' | 'offline';
}

interface Insight {
  id: string;
  title: string;
  source: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  description: string;
  timestamp: string;
  relatedStocks: string[];
}

const dataSources: DataSource[] = [
  {
    id: '1',
    name: 'Private Jet Tracking',
    type: 'jet_tracking',
    icon: Plane,
    description: 'Track executive movements to predict M&A activity and major announcements',
    lastUpdate: '3 minutes ago',
    dataPoints: 1247,
    insights: [
      'Tesla executives flew to Austin 3x this week',
      'Meta leadership meeting in Menlo Park detected',
      'Apple CEO private jet to China - potential supply chain news'
    ],
    status: 'active'
  },
  {
    id: '2',
    name: 'Satellite Intelligence',
    type: 'satellite',
    icon: Satellite,
    description: 'Analyze retail foot traffic, construction, and economic activity from space',
    lastUpdate: '15 minutes ago',
    dataPoints: 892,
    insights: [
      'Tesla Gigafactory construction accelerated 40%',
      'Walmart parking lots 15% fuller than last quarter',
      'Amazon warehouse construction up 200% in Texas'
    ],
    status: 'active'
  },
  {
    id: '3',
    name: 'Patent Filing Analysis',
    type: 'patent',
    icon: FileText,
    description: 'Predict tech innovations by analyzing patent applications and filings',
    lastUpdate: '1 hour ago',
    dataPoints: 2156,
    insights: [
      'Apple filed 47 AR/VR patents this month',
      'Google quantum computing patents increased 300%',
      'Tesla battery technology patents suggest new model'
    ],
    status: 'processing'
  },
  {
    id: '4',
    name: 'Executive Calendar Intelligence',
    type: 'executive_calendar',
    icon: Building,
    description: 'Scrape public calendars and events to predict major announcements',
    lastUpdate: '30 minutes ago',
    dataPoints: 634,
    insights: [
      'NVDA CEO scheduled for 3 investor meetings this week',
      'Microsoft leadership retreat planned for next month',
      'Amazon board meeting moved up by 2 weeks'
    ],
    status: 'active'
  }
];

const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Tesla Gigafactory Expansion Detected',
    source: 'Satellite Intelligence',
    confidence: 92,
    impact: 'high',
    description: 'Satellite imagery shows 40% increase in construction activity at Tesla Gigafactory Texas. Historical data suggests this precedes production announcements by 2-3 weeks.',
    timestamp: '15 minutes ago',
    relatedStocks: ['TSLA']
  },
  {
    id: '2',
    title: 'Apple Executive Jet Activity Surge',
    source: 'Private Jet Tracking',
    confidence: 87,
    impact: 'high',
    description: 'Apple executives made 5 trips to Asian suppliers this week, 300% above normal. Pattern matches pre-iPhone launch logistics coordination.',
    timestamp: '2 hours ago',
    relatedStocks: ['AAPL', 'TSMC']
  },
  {
    id: '3',
    title: 'Meta AR Patent Filing Acceleration',
    source: 'Patent Analysis',
    confidence: 94,
    impact: 'medium',
    description: 'Meta filed 23 augmented reality patents in past 2 weeks, focusing on lightweight displays and neural interfaces. Suggests major AR announcement coming.',
    timestamp: '4 hours ago',
    relatedStocks: ['META']
  }
];

const ExclusiveDataSources: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<DataSource>(dataSources[0]);
  const [activeTab, setActiveTab] = useState<'sources' | 'insights'>('insights');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'processing': return 'text-yellow-400 bg-yellow-500/20';
      case 'offline': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Exclusive Data Sources</h2>
          <p className="text-cyan-300/80 mt-1">Intelligence no other platform has access to</p>
        </div>
        <div className="flex items-center space-x-2">
          <Radar className="h-5 w-5 text-green-400 animate-pulse" />
          <span className="text-sm text-green-400">4 Sources Active</span>
        </div>
      </div>

      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'insights'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Eye className="h-4 w-4" />
          <span>Live Insights</span>
        </button>
        
        <button
          onClick={() => setActiveTab('sources')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'sources'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Globe className="h-4 w-4" />
          <span>Data Sources</span>
        </button>
      </div>

      {activeTab === 'insights' && (
        <div className="space-y-4">
          {mockInsights.map((insight) => (
            <div
              key={insight.id}
              className="glass-effect rounded-xl border border-cyan-500/30 p-6 hover:border-cyan-400/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">
                      {insight.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getImpactColor(insight.impact)}`}>
                      {insight.impact.toUpperCase()} IMPACT
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-cyan-400/60 mb-3">
                    <span>Source: {insight.source}</span>
                    <span>•</span>
                    <span>{insight.timestamp}</span>
                    <span>•</span>
                    <span className="text-green-400">{insight.confidence}% confidence</span>
                  </div>
                </div>
              </div>
              
              <p className="text-cyan-300/90 mb-4">{insight.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {insight.relatedStocks.map((stock) => (
                    <span
                      key={stock}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-400/30"
                    >
                      {stock}
                    </span>
                  ))}
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
                  Create Alert
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'sources' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dataSources.map((source) => {
            const Icon = source.icon;
            return (
              <div
                key={source.id}
                className="glass-effect rounded-xl border border-cyan-500/30 p-6 hover:border-cyan-400/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">
                        {source.name}
                      </h3>
                      <p className="text-cyan-300/80 text-sm">{source.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(source.status)}`}>
                    {source.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <h4 className="text-sm font-medium text-cyan-400">Recent Insights:</h4>
                  {source.insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2"></div>
                      <p className="text-sm text-cyan-300/80">{insight}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-cyan-500/30">
                  <div className="text-sm text-cyan-400/60">
                    {source.dataPoints} data points • Updated {source.lastUpdate}
                  </div>
                  <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-400/30 hover:bg-cyan-500/30 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Data Source Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2 font-orbitron">97.3%</div>
            <div className="text-sm text-cyan-400/60">Prediction Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2 font-orbitron">5,929</div>
            <div className="text-sm text-cyan-400/60">Total Data Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2 font-orbitron">847</div>
            <div className="text-sm text-cyan-400/60">Insights Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2 font-orbitron">2.3min</div>
            <div className="text-sm text-cyan-400/60">Avg Processing Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveDataSources;