import React, { useState } from 'react';
import { Star, TrendingUp, TrendingDown, Target, PieChart, Calendar, Award } from 'lucide-react';

interface InfluencerScorecard {
  id: string;
  name: string;
  title: string;
  avatar: string;
  category: string;
  overallScore: number;
  performance: {
    ytd: number;
    oneYear: number;
    threeYear: number;
    allTime: number;
  };
  riskProfile: {
    volatility: 'low' | 'medium' | 'high';
    beta: number;
    maxDrawdown: number;
  };
  allocation: {
    stocks: number;
    crypto: number;
    bonds: number;
    alternatives: number;
  };
  convictionLevel: number;
  copycatSuccess: number;
  totalFollowers: number;
  recentTrades: number;
}

const mockScorecards: InfluencerScorecard[] = [
  {
    id: '1',
    name: 'Elon Musk',
    title: 'CEO, Tesla & SpaceX',
    avatar: 'EM',
    category: 'Tech Executive',
    overallScore: 87,
    performance: {
      ytd: 34.8,
      oneYear: 45.2,
      threeYear: 128.7,
      allTime: 245.3
    },
    riskProfile: {
      volatility: 'high',
      beta: 1.8,
      maxDrawdown: -35.2
    },
    allocation: {
      stocks: 85,
      crypto: 10,
      bonds: 0,
      alternatives: 5
    },
    convictionLevel: 92,
    copycatSuccess: 73,
    totalFollowers: 125000,
    recentTrades: 12
  },
  {
    id: '2',
    name: 'Nancy Pelosi',
    title: 'Former House Speaker',
    avatar: 'NP',
    category: 'Government Official',
    overallScore: 91,
    performance: {
      ytd: 28.2,
      oneYear: 31.5,
      threeYear: 89.4,
      allTime: 156.8
    },
    riskProfile: {
      volatility: 'medium',
      beta: 1.2,
      maxDrawdown: -18.7
    },
    allocation: {
      stocks: 70,
      crypto: 5,
      bonds: 15,
      alternatives: 10
    },
    convictionLevel: 88,
    copycatSuccess: 81,
    totalFollowers: 89000,
    recentTrades: 8
  }
];

const InfluencerScorecards: React.FC = () => {
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerScorecard>(mockScorecards[0]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Influencer Scorecards</h2>
          <p className="text-gray-300 mt-1">Deep-dive analysis of top investor performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-yellow-400" />
          <span className="text-sm text-yellow-400">Premium Analytics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Influencer Selection */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Select Influencer</h3>
          <div className="space-y-3">
            {mockScorecards.map((influencer) => (
              <button
                key={influencer.id}
                onClick={() => setSelectedInfluencer(influencer)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  selectedInfluencer.id === influencer.id
                    ? 'bg-blue-500/20 border border-blue-400/30'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{influencer.avatar}</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-white">{influencer.name}</div>
                  <div className="text-sm text-gray-400">{influencer.category}</div>
                </div>
                <div className={`ml-auto text-lg font-bold ${getScoreColor(influencer.overallScore)}`}>
                  {influencer.overallScore}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Scorecard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{selectedInfluencer.avatar}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedInfluencer.name}</h3>
                  <p className="text-gray-400">{selectedInfluencer.title}</p>
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-400/30 mt-2">
                    {selectedInfluencer.category}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-4xl font-bold ${getScoreColor(selectedInfluencer.overallScore)}`}>
                  {selectedInfluencer.overallScore}
                </div>
                <div className="text-sm text-gray-400">Overall Score</div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Performance History</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-xl font-bold text-green-400">+{selectedInfluencer.performance.ytd}%</div>
                <div className="text-sm text-gray-400">YTD</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-xl font-bold text-green-400">+{selectedInfluencer.performance.oneYear}%</div>
                <div className="text-sm text-gray-400">1 Year</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-xl font-bold text-green-400">+{selectedInfluencer.performance.threeYear}%</div>
                <div className="text-sm text-gray-400">3 Years</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-xl font-bold text-green-400">+{selectedInfluencer.performance.allTime}%</div>
                <div className="text-sm text-gray-400">All Time</div>
              </div>
            </div>
          </div>

          {/* Risk Profile & Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Risk Profile</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Volatility</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(selectedInfluencer.riskProfile.volatility)}`}>
                    {selectedInfluencer.riskProfile.volatility.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Beta</span>
                  <span className="text-white font-medium">{selectedInfluencer.riskProfile.beta}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Max Drawdown</span>
                  <span className="text-red-400 font-medium">{selectedInfluencer.riskProfile.maxDrawdown}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Asset Allocation</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Stocks</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${selectedInfluencer.allocation.stocks}%` }}></div>
                    </div>
                    <span className="text-white text-sm">{selectedInfluencer.allocation.stocks}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Crypto</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${selectedInfluencer.allocation.crypto}%` }}></div>
                    </div>
                    <span className="text-white text-sm">{selectedInfluencer.allocation.crypto}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Bonds</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${selectedInfluencer.allocation.bonds}%` }}></div>
                    </div>
                    <span className="text-white text-sm">{selectedInfluencer.allocation.bonds}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Alternatives</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${selectedInfluencer.allocation.alternatives}%` }}></div>
                    </div>
                    <span className="text-white text-sm">{selectedInfluencer.allocation.alternatives}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Additional Insights</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{selectedInfluencer.convictionLevel}%</div>
                <div className="text-sm text-gray-400">Conviction Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{selectedInfluencer.copycatSuccess}%</div>
                <div className="text-sm text-gray-400">Copycat Success</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{(selectedInfluencer.totalFollowers / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{selectedInfluencer.recentTrades}</div>
                <div className="text-sm text-gray-400">Recent Trades</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerScorecards;