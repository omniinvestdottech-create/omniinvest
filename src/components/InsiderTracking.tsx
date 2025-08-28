import React, { useState } from 'react';
import { Search, Filter, Star, Eye, Calendar, TrendingUp } from 'lucide-react';

interface Insider {
  id: string;
  name: string;
  title: string;
  category: string;
  avatar: string;
  totalTrades: number;
  successRate: number;
  avgReturn: number;
  recentActivity: string;
  following: boolean;
  verified: boolean;
}

const mockInsiders: Insider[] = [
  {
    id: '1',
    name: 'Elon Musk',
    title: 'CEO, Tesla & SpaceX',
    category: 'Tech Executive',
    avatar: 'EM',
    totalTrades: 47,
    successRate: 73,
    avgReturn: 34.8,
    recentActivity: '2 hours ago',
    following: true,
    verified: true
  },
  {
    id: '2',
    name: 'Nancy Pelosi',
    title: 'Former House Speaker',
    category: 'Government Official',
    avatar: 'NP',
    totalTrades: 32,
    successRate: 81,
    avgReturn: 28.2,
    recentActivity: '4 hours ago',
    following: true,
    verified: true
  },
  {
    id: '3',
    name: 'Warren Buffett',
    title: 'CEO, Berkshire Hathaway',
    category: 'Investor',
    avatar: 'WB',
    totalTrades: 156,
    successRate: 84,
    avgReturn: 22.1,
    recentActivity: '1 day ago',
    following: false,
    verified: true
  },
  {
    id: '4',
    name: 'Mark Cuban',
    title: 'Entrepreneur & Investor',
    category: 'Celebrity',
    avatar: 'MC',
    totalTrades: 28,
    successRate: 67,
    avgReturn: 19.7,
    recentActivity: '2 days ago',
    following: false,
    verified: true
  },
];

const InsiderTracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('return');

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'tech executive': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'government official': return 'bg-red-500/20 text-red-400 border-red-400/30';
      case 'investor': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'celebrity': return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Insider Tracking</h1>
          <p className="text-gray-300 mt-1">Monitor and follow investment moves from elite insiders</p>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-blue-400" />
          <span className="text-sm text-blue-400">2,847 Tracked Insiders</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search insiders by name, company, or sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <div className="flex space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Categories</option>
              <option value="tech">Tech Executives</option>
              <option value="government">Government Officials</option>
              <option value="investor">Professional Investors</option>
              <option value="celebrity">Celebrities</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="return">Highest Return</option>
              <option value="success">Success Rate</option>
              <option value="activity">Recent Activity</option>
              <option value="trades">Total Trades</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Insider Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockInsiders.map((insider) => (
          <div
            key={insider.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{insider.avatar}</span>
                  </div>
                  {insider.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">{insider.name}</h3>
                  <p className="text-gray-400 text-sm">{insider.title}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs border mt-2 ${getCategoryColor(insider.category)}`}>
                    {insider.category}
                  </span>
                </div>
              </div>
              
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  insider.following
                    ? 'bg-green-500/20 text-green-400 border border-green-400/30 hover:bg-green-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-400/30 hover:bg-blue-500/30'
                }`}
              >
                {insider.following ? 'Following' : 'Follow'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{insider.totalTrades}</div>
                <div className="text-sm text-gray-400">Total Trades</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{insider.successRate}%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">+{insider.avgReturn}%</div>
                <div className="text-sm text-gray-400">Avg Return</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Last activity: {insider.recentActivity}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 bg-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/20 transition-colors">
                  <TrendingUp className="h-4 w-4" />
                </button>
                <button className="p-2 bg-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/20 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105">
          Load More Insiders
        </button>
      </div>
    </div>
  );
};

export default InsiderTracking;