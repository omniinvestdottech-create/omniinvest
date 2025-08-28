import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Filter, Users, Calendar } from 'lucide-react';

interface HeatmapData {
  id: string;
  name: string;
  type: 'celebrity' | 'politician' | 'hedge_fund' | 'tech_ceo';
  action: 'buy' | 'sell';
  symbol: string;
  amount: number;
  change: number;
  time: string;
  confidence: number;
}

const mockHeatmapData: HeatmapData[] = [
  {
    id: '1',
    name: 'Elon Musk',
    type: 'tech_ceo',
    action: 'buy',
    symbol: 'TSLA',
    amount: 2500000,
    change: 15.6,
    time: '2 hours ago',
    confidence: 95
  },
  {
    id: '2',
    name: 'Nancy Pelosi',
    type: 'politician',
    action: 'buy',
    symbol: 'NVDA',
    amount: 1800000,
    change: 8.3,
    time: '4 hours ago',
    confidence: 87
  },
  {
    id: '3',
    name: 'Warren Buffett',
    type: 'hedge_fund',
    action: 'sell',
    symbol: 'AAPL',
    amount: -5200000,
    change: -3.2,
    time: '6 hours ago',
    confidence: 92
  },
  {
    id: '4',
    name: 'Kim Kardashian',
    type: 'celebrity',
    action: 'buy',
    symbol: 'META',
    amount: 750000,
    change: 12.1,
    time: '1 day ago',
    confidence: 76
  },
  {
    id: '5',
    name: 'Jeff Bezos',
    type: 'tech_ceo',
    action: 'buy',
    symbol: 'AMZN',
    amount: 3100000,
    change: 6.8,
    time: '1 day ago',
    confidence: 91
  },
];

const InsiderHeatmap: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('24h');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tech_ceo': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'politician': return 'bg-red-500/20 text-red-400 border-red-400/30';
      case 'hedge_fund': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'celebrity': return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const getActionColor = (action: string) => {
    return action === 'buy' ? 'text-green-400' : 'text-red-400';
  };

  const formatAmount = (amount: number) => {
    const absAmount = Math.abs(amount);
    if (absAmount >= 1000000) {
      return `$${(absAmount / 1000000).toFixed(1)}M`;
    }
    return `$${(absAmount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="glass-effect rounded-xl border border-cyan-500/30 p-6 scan-line relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-cyan-400 font-orbitron">Insider Moves Heatmap</h2>
          <p className="text-cyan-300/80 text-sm mt-1">Real-time tracking of elite investor activities</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-cyan-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="futuristic-input rounded-lg px-3 py-1 text-sm text-cyan-100 focus:outline-none font-orbitron"
            >
              <option value="1h">1 Hour</option>
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
            </select>
          </div>
          
          <button className="flex items-center space-x-2 px-3 py-1 futuristic-button rounded-lg text-sm text-cyan-400 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        {mockHeatmapData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 holographic rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-200 cursor-pointer group card-hover"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center neon-glow cyber-border">
                <span className="text-sm font-medium text-white font-orbitron">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-cyan-100 font-orbitron">{item.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(item.type)}`}>
                    {item.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-cyan-400/80 text-sm font-orbitron">{item.symbol}</span>
                  <span className="text-cyan-500/60">•</span>
                  <span className="text-cyan-400/60 text-sm">{item.time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  {item.action === 'buy' ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <span className={`font-medium font-orbitron ${getActionColor(item.action)}`}>
                    {item.action.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-cyan-400/60">
                  Confidence: {item.confidence}%
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-cyan-100 font-orbitron">
                  {formatAmount(item.amount)}
                </div>
                <div className={`text-sm ${item.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-cyan-400/80">
          <Users className="h-4 w-4" />
          <span>Tracking 2,847 elite investors</span>
        </div>
        <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-orbitron">
          View All Moves →
        </button>
      </div>
    </div>
  );
};

export default InsiderHeatmap;