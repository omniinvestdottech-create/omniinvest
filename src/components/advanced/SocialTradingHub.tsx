import React, { useState } from 'react';
import { Users, TrendingUp, Star, Award, MessageCircle, Copy, Eye, Crown } from 'lucide-react';

interface Trader {
  id: string;
  name: string;
  avatar: string;
  tier: string;
  followers: number;
  winRate: number;
  totalReturn: number;
  monthlyReturn: number;
  trades: number;
  verified: boolean;
  specialty: string;
  riskLevel: 'low' | 'medium' | 'high';
  recentTrades: Trade[];
}

interface Trade {
  id: string;
  symbol: string;
  action: 'buy' | 'sell';
  price: number;
  quantity: number;
  timestamp: string;
  reasoning: string;
  performance?: number;
}

const mockTraders: Trader[] = [
  {
    id: '1',
    name: 'TechGuru2024',
    avatar: 'TG',
    tier: 'Diamond',
    followers: 12847,
    winRate: 87.3,
    totalReturn: 234.7,
    monthlyReturn: 18.4,
    trades: 156,
    verified: true,
    specialty: 'Tech Stocks',
    riskLevel: 'medium',
    recentTrades: [
      {
        id: '1',
        symbol: 'NVDA',
        action: 'buy',
        price: 875.20,
        quantity: 100,
        timestamp: '2 hours ago',
        reasoning: 'AI boom continues, insider accumulation detected',
        performance: 12.3
      }
    ]
  },
  {
    id: '2',
    name: 'ValueHunter',
    avatar: 'VH',
    tier: 'Platinum',
    followers: 8934,
    winRate: 92.1,
    totalReturn: 189.3,
    monthlyReturn: 14.2,
    trades: 89,
    verified: true,
    specialty: 'Value Investing',
    riskLevel: 'low',
    recentTrades: [
      {
        id: '2',
        symbol: 'BRK.B',
        action: 'buy',
        price: 445.30,
        quantity: 50,
        timestamp: '4 hours ago',
        reasoning: 'Undervalued relative to book value, Buffett buying more',
        performance: 8.7
      }
    ]
  },
  {
    id: '3',
    name: 'CryptoKing',
    avatar: 'CK',
    tier: 'Gold',
    followers: 15623,
    winRate: 78.9,
    totalReturn: 456.2,
    monthlyReturn: 28.7,
    trades: 234,
    verified: true,
    specialty: 'Crypto & DeFi',
    riskLevel: 'high',
    recentTrades: [
      {
        id: '3',
        symbol: 'COIN',
        action: 'buy',
        price: 234.50,
        quantity: 75,
        timestamp: '1 day ago',
        reasoning: 'Bitcoin ETF approval momentum building',
        performance: 15.2
      }
    ]
  }
];

const SocialTradingHub: React.FC = () => {
  const [selectedTrader, setSelectedTrader] = useState<Trader>(mockTraders[0]);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'following' | 'challenges'>('leaderboard');

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Diamond': return 'text-cyan-400 bg-cyan-500/20 border-cyan-400/30';
      case 'Platinum': return 'text-gray-300 bg-gray-500/20 border-gray-400/30';
      case 'Gold': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'Silver': return 'text-gray-400 bg-gray-600/20 border-gray-500/30';
      default: return 'text-bronze-400 bg-bronze-500/20 border-bronze-400/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) return `${(followers / 1000000).toFixed(1)}M`;
    if (followers >= 1000) return `${(followers / 1000).toFixed(1)}K`;
    return followers.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Social Trading Hub</h2>
          <p className="text-cyan-300/80 mt-1">Follow elite traders and copy their strategies</p>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-blue-400" />
          <span className="text-sm text-blue-400">47,892 Active Traders</span>
        </div>
      </div>

      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'leaderboard'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Award className="h-4 w-4" />
          <span>Leaderboard</span>
        </button>
        
        <button
          onClick={() => setActiveTab('following')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'following'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Eye className="h-4 w-4" />
          <span>Following</span>
        </button>
        
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'challenges'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Crown className="h-4 w-4" />
          <span>Challenges</span>
        </button>
      </div>

      {activeTab === 'leaderboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trader List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">Top Performers</h3>
            {mockTraders.map((trader, index) => (
              <div
                key={trader.id}
                onClick={() => setSelectedTrader(trader)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedTrader.id === trader.id
                    ? 'glass-effect border-cyan-400/50'
                    : 'glass-effect border-cyan-500/30 hover:border-cyan-400/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{trader.avatar}</span>
                    </div>
                    {trader.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white" />
                      </div>
                    )}
                    <div className="absolute -top-1 -left-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-cyan-100">{trader.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getTierColor(trader.tier)}`}>
                        {trader.tier}
                      </span>
                    </div>
                    <div className="text-sm text-cyan-400/60">{trader.specialty}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-green-400 font-medium">+{trader.monthlyReturn}%</div>
                    <div className="text-cyan-400/60">This Month</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-medium">{formatFollowers(trader.followers)}</div>
                    <div className="text-cyan-400/60">Followers</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trader Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">{selectedTrader.avatar}</span>
                    </div>
                    {selectedTrader.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-cyan-400 font-orbitron">
                        {selectedTrader.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm border ${getTierColor(selectedTrader.tier)}`}>
                        {selectedTrader.tier}
                      </span>
                    </div>
                    <div className="text-cyan-300/80">{selectedTrader.specialty}</div>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${getRiskColor(selectedTrader.riskLevel)}`}>
                      {selectedTrader.riskLevel.toUpperCase()} RISK
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                    Follow
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                    Copy Trades
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 font-orbitron">
                    {selectedTrader.winRate}%
                  </div>
                  <div className="text-sm text-cyan-400/60">Win Rate</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400 font-orbitron">
                    +{selectedTrader.totalReturn}%
                  </div>
                  <div className="text-sm text-cyan-400/60">Total Return</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400 font-orbitron">
                    {formatFollowers(selectedTrader.followers)}
                  </div>
                  <div className="text-sm text-cyan-400/60">Followers</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400 font-orbitron">
                    {selectedTrader.trades}
                  </div>
                  <div className="text-sm text-cyan-400/60">Total Trades</div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Recent Trades</h4>
                <div className="space-y-3">
                  {selectedTrader.recentTrades.map((trade) => (
                    <div key={trade.id} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            trade.action === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {trade.action.toUpperCase()}
                          </span>
                          <span className="font-medium text-cyan-100">{trade.symbol}</span>
                          <span className="text-cyan-400/60">{trade.quantity} shares @ ${trade.price}</span>
                        </div>
                        {trade.performance && (
                          <span className="text-green-400 font-medium">+{trade.performance}%</span>
                        )}
                      </div>
                      <p className="text-sm text-cyan-300/80">{trade.reasoning}</p>
                      <div className="text-xs text-cyan-400/60 mt-2">{trade.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'following' && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-cyan-400/60 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-cyan-400 mb-2">No Traders Followed Yet</h3>
          <p className="text-cyan-300/80 mb-6">Start following top performers to see their trades here</p>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Browse Traders
          </button>
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
            <div className="text-center mb-6">
              <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-cyan-400 font-orbitron mb-2">
                Monthly Trading Challenge
              </h3>
              <p className="text-cyan-300/80">
                Compete with other traders for the highest monthly returns
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-400/30">
                <div className="text-2xl font-bold text-yellow-400 mb-2 font-orbitron">1st Place</div>
                <div className="text-lg text-white mb-1">$10,000 Prize</div>
                <div className="text-sm text-yellow-300/80">+ Diamond Tier Upgrade</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-gray-400/20 to-gray-500/20 rounded-lg border border-gray-400/30">
                <div className="text-2xl font-bold text-gray-300 mb-2 font-orbitron">2nd Place</div>
                <div className="text-lg text-white mb-1">$5,000 Prize</div>
                <div className="text-sm text-gray-300/80">+ Platinum Tier Upgrade</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-lg border border-orange-400/30">
                <div className="text-2xl font-bold text-orange-400 mb-2 font-orbitron">3rd Place</div>
                <div className="text-lg text-white mb-1">$2,500 Prize</div>
                <div className="text-sm text-orange-300/80">+ Gold Tier Upgrade</div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                Join Challenge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialTradingHub;