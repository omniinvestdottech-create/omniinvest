import React, { useState } from 'react';
import { Globe, MapPin, TrendingUp, AlertTriangle, Flag, Building, Users, Eye } from 'lucide-react';

interface GlobalInsider {
  id: string;
  name: string;
  country: string;
  position: string;
  company: string;
  recentTrades: number;
  performance: number;
  influence: 'high' | 'medium' | 'low';
  sector: string;
  lastActivity: string;
}

interface GeopoliticalRisk {
  id: string;
  region: string;
  riskType: 'trade_war' | 'sanctions' | 'regulation' | 'political_instability';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedSectors: string[];
  probability: number;
  timeframe: string;
  marketImpact: number;
}

const mockGlobalInsiders: GlobalInsider[] = [
  {
    id: '1',
    name: 'Li Wei',
    country: 'China',
    position: 'CEO',
    company: 'BYD Auto',
    recentTrades: 8,
    performance: 45.2,
    influence: 'high',
    sector: 'Electric Vehicles',
    lastActivity: '2 hours ago'
  },
  {
    id: '2',
    name: 'Akio Toyoda',
    country: 'Japan',
    position: 'Chairman',
    company: 'Toyota Motor',
    recentTrades: 12,
    performance: 23.7,
    influence: 'high',
    sector: 'Automotive',
    lastActivity: '1 day ago'
  },
  {
    id: '3',
    name: 'Bernard Arnault',
    country: 'France',
    position: 'CEO',
    company: 'LVMH',
    recentTrades: 6,
    performance: 34.8,
    influence: 'high',
    sector: 'Luxury Goods',
    lastActivity: '3 hours ago'
  }
];

const mockGeopoliticalRisks: GeopoliticalRisk[] = [
  {
    id: '1',
    region: 'US-China',
    riskType: 'trade_war',
    severity: 'high',
    description: 'Escalating trade tensions following new semiconductor restrictions',
    affectedSectors: ['Technology', 'Semiconductors', 'Manufacturing'],
    probability: 78,
    timeframe: '2-4 weeks',
    marketImpact: -12.5
  },
  {
    id: '2',
    region: 'Europe',
    riskType: 'regulation',
    severity: 'medium',
    description: 'New AI regulation framework may impact tech companies',
    affectedSectors: ['Artificial Intelligence', 'Social Media', 'Cloud Computing'],
    probability: 65,
    timeframe: '3-6 months',
    marketImpact: -8.2
  }
];

const GlobalIntelligence: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'insiders' | 'risks' | 'correlations'>('insiders');

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-500 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-500 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'China': '🇨🇳',
      'Japan': '🇯🇵',
      'France': '🇫🇷',
      'Germany': '🇩🇪',
      'UK': '🇬🇧',
      'Canada': '🇨🇦'
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Global Intelligence Network</h2>
          <p className="text-cyan-300/80 mt-1">Worldwide insider tracking and geopolitical risk analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-blue-400" />
          <span className="text-sm text-blue-400">50+ Countries Monitored</span>
        </div>
      </div>

      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('insiders')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'insiders'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Global Insiders</span>
        </button>
        
        <button
          onClick={() => setActiveTab('risks')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'risks'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          <span>Geopolitical Risks</span>
        </button>
        
        <button
          onClick={() => setActiveTab('correlations')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'correlations'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Currency Correlations</span>
        </button>
      </div>

      {activeTab === 'insiders' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockGlobalInsiders.map((insider) => (
            <div
              key={insider.id}
              className="glass-effect rounded-xl border border-cyan-500/30 p-6 hover:border-cyan-400/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getCountryFlag(insider.country)}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400">{insider.name}</h3>
                    <p className="text-cyan-300/80 text-sm">{insider.position}, {insider.company}</p>
                    <p className="text-cyan-400/60 text-xs">{insider.country}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs border ${getInfluenceColor(insider.influence)}`}>
                  {insider.influence.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">+{insider.performance}%</div>
                  <div className="text-xs text-cyan-400/60">Performance</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">{insider.recentTrades}</div>
                  <div className="text-xs text-cyan-400/60">Recent Trades</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">{insider.sector}</div>
                  <div className="text-xs text-cyan-400/60">Sector</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-cyan-500/30">
                <span className="text-sm text-cyan-400/60">Last activity: {insider.lastActivity}</span>
                <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-400/30 hover:bg-blue-500/30 transition-colors text-sm">
                  Track
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'risks' && (
        <div className="space-y-4">
          {mockGeopoliticalRisks.map((risk) => (
            <div
              key={risk.id}
              className="glass-effect rounded-xl border border-cyan-500/30 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Flag className="h-5 w-5 text-red-400" />
                    <h3 className="text-lg font-semibold text-cyan-400">{risk.region}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(risk.severity)}`}>
                      {risk.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-cyan-300/80">{risk.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-400">{risk.probability}%</div>
                  <div className="text-sm text-cyan-400/60">Probability</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-400">{risk.timeframe}</div>
                  <div className="text-xs text-cyan-400/60">Timeframe</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-400">{risk.marketImpact}%</div>
                  <div className="text-xs text-cyan-400/60">Market Impact</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">{risk.affectedSectors.length}</div>
                  <div className="text-xs text-cyan-400/60">Affected Sectors</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {risk.affectedSectors.map((sector) => (
                  <span
                    key={sector}
                    className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-400/30"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'correlations' && (
        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Currency Correlation Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-cyan-400 mb-3">USD Impact on Holdings</h4>
              <div className="space-y-3">
                {[
                  { pair: 'USD/EUR', correlation: -0.73, impact: 'TSLA European sales' },
                  { pair: 'USD/JPY', correlation: 0.45, impact: 'AAPL supply chain costs' },
                  { pair: 'USD/CNY', correlation: -0.82, impact: 'NVDA China revenue' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="font-medium text-cyan-100">{item.pair}</div>
                      <div className="text-xs text-cyan-400/60">{item.impact}</div>
                    </div>
                    <div className={`font-bold ${item.correlation > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.correlation > 0 ? '+' : ''}{item.correlation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-cyan-400 mb-3">Global Market Sentiment</h4>
              <div className="space-y-3">
                {[
                  { region: 'Asia-Pacific', sentiment: 68, trend: 'up' },
                  { region: 'Europe', sentiment: 45, trend: 'down' },
                  { region: 'Americas', sentiment: 72, trend: 'up' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="font-medium text-cyan-100">{item.region}</div>
                    <div className="flex items-center space-x-2">
                      <div className={`font-bold ${item.sentiment > 60 ? 'text-green-400' : item.sentiment > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {item.sentiment}%
                      </div>
                      <TrendingUp className={`h-4 w-4 ${item.trend === 'up' ? 'text-green-400' : 'text-red-400 rotate-180'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalIntelligence;