import React from 'react';
import { Star, TrendingUp, TrendingDown, Users } from 'lucide-react';

interface TrendingInsider {
  id: string;
  name: string;
  title: string;
  avatar: string;
  performance: number;
  followers: number;
  recentTrades: number;
  accuracy: number;
  trend: 'up' | 'down';
  category: 'tech' | 'politics' | 'entertainment' | 'finance';
}

const mockTrendingInsiders: TrendingInsider[] = [
  {
    id: '1',
    name: 'Elon Musk',
    title: 'CEO, Tesla & SpaceX',
    avatar: 'EM',
    performance: 34.8,
    followers: 125000,
    recentTrades: 12,
    accuracy: 73,
    trend: 'up',
    category: 'tech'
  },
  {
    id: '2',
    name: 'Nancy Pelosi',
    title: 'House Speaker (Former)',
    avatar: 'NP',
    performance: 28.2,
    followers: 89000,
    recentTrades: 8,
    accuracy: 81,
    trend: 'up',
    category: 'politics'
  },
  {
    id: '3',
    name: 'Cathie Wood',
    title: 'CEO, ARK Invest',
    avatar: 'CW',
    performance: -12.5,
    followers: 67000,
    recentTrades: 15,
    accuracy: 65,
    trend: 'down',
    category: 'finance'
  },
  {
    id: '4',
    name: 'Mark Cuban',
    title: 'Entrepreneur & Investor',
    avatar: 'MC',
    performance: 19.7,
    followers: 45000,
    recentTrades: 6,
    accuracy: 78,
    trend: 'up',
    category: 'entertainment'
  },
];

const TrendingInsiders: React.FC = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tech': return 'bg-blue-500/20 text-blue-400';
      case 'politics': return 'bg-red-500/20 text-red-400';
      case 'entertainment': return 'bg-purple-500/20 text-purple-400';
      case 'finance': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    }
    if (followers >= 1000) {
      return `${(followers / 1000).toFixed(0)}K`;
    }
    return followers.toString();
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Trending Insiders</h2>
        </div>
        
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          Follow All
        </button>
      </div>

      <div className="space-y-4">
        {mockTrendingInsiders.map((insider, index) => (
          <div
            key={insider.id}
            className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{insider.avatar}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-black">{index + 1}</span>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-white text-sm">{insider.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(insider.category)}`}>
                    {insider.category.toUpperCase()}
                  </span>
                </div>
                <div className="text-gray-400 text-xs">{insider.title}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  {insider.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-400" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${insider.performance > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {insider.performance > 0 ? '+' : ''}{insider.performance}%
                  </span>
                </div>
                <div className="text-xs text-gray-400">30d return</div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-white">{formatFollowers(insider.followers)}</span>
                </div>
                <div className="text-xs text-gray-400">{insider.accuracy}% accuracy</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-white">2,847</div>
            <div className="text-sm text-gray-400">Total Tracked</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">+12%</div>
            <div className="text-sm text-gray-400">Avg Performance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingInsiders;