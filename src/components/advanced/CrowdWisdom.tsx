import React, { useState } from 'react';
import { Users, ThumbsUp, ThumbsDown, MessageCircle, TrendingUp, Star, Plus } from 'lucide-react';

interface CrowdPortfolio {
  id: string;
  name: string;
  description: string;
  creator: string;
  members: number;
  performance: number;
  votes: {
    up: number;
    down: number;
  };
  holdings: {
    symbol: string;
    allocation: number;
    votes: number;
  }[];
  discussions: number;
  created: string;
}

const mockCrowdPortfolios: CrowdPortfolio[] = [
  {
    id: '1',
    name: 'AI Revolution Portfolio',
    description: 'Community-driven portfolio focusing on artificial intelligence and machine learning companies',
    creator: 'TechInvestor2024',
    members: 1247,
    performance: 34.8,
    votes: { up: 892, down: 45 },
    holdings: [
      { symbol: 'NVDA', allocation: 25, votes: 234 },
      { symbol: 'GOOGL', allocation: 20, votes: 198 },
      { symbol: 'MSFT', allocation: 18, votes: 187 },
      { symbol: 'AMD', allocation: 15, votes: 156 },
      { symbol: 'TSLA', allocation: 12, votes: 134 },
      { symbol: 'META', allocation: 10, votes: 98 }
    ],
    discussions: 156,
    created: '3 months ago'
  },
  {
    id: '2',
    name: 'Green Energy Future',
    description: 'Sustainable investing focused on renewable energy and clean technology',
    creator: 'EcoInvestor',
    members: 892,
    performance: 28.2,
    votes: { up: 654, down: 23 },
    holdings: [
      { symbol: 'ENPH', allocation: 22, votes: 189 },
      { symbol: 'SEDG', allocation: 18, votes: 167 },
      { symbol: 'NEE', allocation: 16, votes: 145 },
      { symbol: 'ICLN', allocation: 15, votes: 134 },
      { symbol: 'PLUG', allocation: 14, votes: 123 },
      { symbol: 'FSLR', allocation: 15, votes: 112 }
    ],
    discussions: 89,
    created: '2 months ago'
  }
];

const CrowdWisdom: React.FC = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<CrowdPortfolio>(mockCrowdPortfolios[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const formatMembers = (members: number) => {
    if (members >= 1000) {
      return `${(members / 1000).toFixed(1)}K`;
    }
    return members.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Crowd Wisdom Portfolios</h2>
          <p className="text-gray-300 mt-1">Community-driven investment strategies and collective intelligence</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Create Portfolio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Popular Portfolios</h3>
          {mockCrowdPortfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              onClick={() => setSelectedPortfolio(portfolio)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                selectedPortfolio.id === portfolio.id
                  ? 'bg-blue-500/20 border-blue-400/30'
                  : 'bg-white/10 border-white/20 hover:bg-white/15'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white">{portfolio.name}</h4>
                  <p className="text-sm text-gray-400">by {portfolio.creator}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">+{portfolio.performance}%</div>
                  <div className="text-xs text-gray-400">YTD</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-300 mb-3">{portfolio.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">{formatMembers(portfolio.members)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">{portfolio.discussions}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">{portfolio.votes.up}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsDown className="h-4 w-4 text-red-400" />
                    <span className="text-red-400">{portfolio.votes.down}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedPortfolio.name}</h3>
                <p className="text-gray-400">Created by {selectedPortfolio.creator} • {selectedPortfolio.created}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-lg border border-green-400/30 hover:bg-green-500/30 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{selectedPortfolio.votes.up}</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg border border-red-400/30 hover:bg-red-500/30 transition-colors">
                  <ThumbsDown className="h-4 w-4" />
                  <span>{selectedPortfolio.votes.down}</span>
                </button>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4">{selectedPortfolio.description}</p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-xl font-bold text-blue-400">{formatMembers(selectedPortfolio.members)}</div>
                <div className="text-sm text-gray-400">Members</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-xl font-bold text-green-400">+{selectedPortfolio.performance}%</div>
                <div className="text-sm text-gray-400">Performance</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-xl font-bold text-purple-400">{selectedPortfolio.discussions}</div>
                <div className="text-sm text-gray-400">Discussions</div>
              </div>
            </div>
          </div>

          {/* Holdings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Portfolio Holdings</h4>
            <div className="space-y-3">
              {selectedPortfolio.holdings.map((holding, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{holding.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white">{holding.symbol}</div>
                      <div className="text-sm text-gray-400">{holding.allocation}% allocation</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">{holding.votes}</span>
                    </div>
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-400/30 hover:bg-blue-500/30 transition-colors text-sm">
                      Vote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white">Join the Discussion</h4>
                <p className="text-gray-400 text-sm">Contribute to the community's investment decisions</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-400/30 hover:bg-green-500/30 transition-colors">
                  Join Portfolio
                </button>
                <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-colors">
                  Start Discussion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Portfolio Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl border border-white/20 p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Create Crowd Portfolio</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio Name</label>
                <input
                  type="text"
                  placeholder="e.g., Next-Gen Healthcare"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  placeholder="Describe your investment thesis..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 h-20 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Initial Holdings</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Symbol (e.g., AAPL)"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="number"
                    placeholder="% Allocation"
                    className="w-24 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg border border-gray-400/30 hover:bg-gray-500/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
              >
                Create Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrowdWisdom;