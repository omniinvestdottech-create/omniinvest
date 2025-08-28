import React, { useState } from 'react';
import { Home, Palette, Gem, Coins, TrendingUp, Plus, Eye } from 'lucide-react';

interface AlternativeAsset {
  id: string;
  type: 'real_estate' | 'art' | 'collectibles' | 'crypto' | 'commodities' | 'private_equity';
  name: string;
  description: string;
  value: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
  liquidity: 'high' | 'medium' | 'low';
  riskLevel: 'low' | 'medium' | 'high';
}

const mockAlternativeAssets: AlternativeAsset[] = [
  {
    id: '1',
    type: 'real_estate',
    name: 'Manhattan Luxury Condo',
    description: '2BR/2BA luxury condominium in Upper East Side',
    value: 2850000,
    change: 125000,
    changePercent: 4.6,
    lastUpdated: '1 month ago',
    liquidity: 'low',
    riskLevel: 'medium'
  },
  {
    id: '2',
    type: 'art',
    name: 'Contemporary Art Collection',
    description: 'Curated collection of emerging contemporary artists',
    value: 450000,
    change: 75000,
    changePercent: 20.0,
    lastUpdated: '2 weeks ago',
    liquidity: 'low',
    riskLevel: 'high'
  },
  {
    id: '3',
    type: 'collectibles',
    name: 'Vintage Watch Collection',
    description: 'Rare Rolex and Patek Philippe timepieces',
    value: 180000,
    change: -15000,
    changePercent: -7.7,
    lastUpdated: '1 week ago',
    liquidity: 'medium',
    riskLevel: 'medium'
  },
  {
    id: '4',
    type: 'crypto',
    name: 'Digital Asset Portfolio',
    description: 'Diversified cryptocurrency holdings',
    value: 95000,
    change: 12000,
    changePercent: 14.5,
    lastUpdated: 'Real-time',
    liquidity: 'high',
    riskLevel: 'high'
  },
  {
    id: '5',
    type: 'commodities',
    name: 'Precious Metals',
    description: 'Gold, silver, and platinum holdings',
    value: 75000,
    change: 3500,
    changePercent: 4.9,
    lastUpdated: '1 day ago',
    liquidity: 'high',
    riskLevel: 'low'
  },
  {
    id: '6',
    type: 'private_equity',
    name: 'Tech Startup Investments',
    description: 'Early-stage technology company investments',
    value: 250000,
    change: 50000,
    changePercent: 25.0,
    lastUpdated: '3 months ago',
    liquidity: 'low',
    riskLevel: 'high'
  }
];

const AlternativeAssets: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'real_estate': return <Home className="h-5 w-5" />;
      case 'art': return <Palette className="h-5 w-5" />;
      case 'collectibles': return <Gem className="h-5 w-5" />;
      case 'crypto': return <Coins className="h-5 w-5" />;
      case 'commodities': return <TrendingUp className="h-5 w-5" />;
      case 'private_equity': return <Eye className="h-5 w-5" />;
      default: return <Gem className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'real_estate': return 'text-green-400 bg-green-500/20';
      case 'art': return 'text-purple-400 bg-purple-500/20';
      case 'collectibles': return 'text-yellow-400 bg-yellow-500/20';
      case 'crypto': return 'text-orange-400 bg-orange-500/20';
      case 'commodities': return 'text-blue-400 bg-blue-500/20';
      case 'private_equity': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getLiquidityColor = (liquidity: string) => {
    switch (liquidity) {
      case 'high': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
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

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const formatTypeName = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredAssets = selectedCategory === 'all' 
    ? mockAlternativeAssets 
    : mockAlternativeAssets.filter(asset => asset.type === selectedCategory);

  const totalValue = mockAlternativeAssets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = mockAlternativeAssets.reduce((sum, asset) => sum + asset.change, 0);
  const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Alternative Assets</h2>
          <p className="text-gray-300 mt-1">Track your investments beyond traditional securities</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xl font-bold text-white">{formatValue(totalValue)}</div>
            <div className={`text-sm font-medium ${totalChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalChange >= 0 ? '+' : ''}{formatValue(totalChange)} ({totalChangePercent.toFixed(1)}%)
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                : 'bg-white/10 text-gray-400 hover:text-white'
            }`}
          >
            All Assets
          </button>
          {['real_estate', 'art', 'collectibles', 'crypto', 'commodities', 'private_equity'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {formatTypeName(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(asset.type)}`}>
                  {getTypeIcon(asset.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{asset.name}</h3>
                  <p className="text-gray-400 text-sm">{asset.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold text-white">{formatValue(asset.value)}</div>
                <div className={`text-sm font-medium ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {asset.change >= 0 ? '+' : ''}{formatValue(asset.change)} ({asset.changePercent.toFixed(1)}%)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <div className={`text-xs px-2 py-1 rounded-full ${getTypeColor(asset.type)}`}>
                  {formatTypeName(asset.type)}
                </div>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <div className={`text-xs px-2 py-1 rounded-full ${getLiquidityColor(asset.liquidity)}`}>
                  {asset.liquidity.toUpperCase()} LIQ
                </div>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <div className={`text-xs px-2 py-1 rounded-full ${getRiskColor(asset.riskLevel)}`}>
                  {asset.riskLevel.toUpperCase()} RISK
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-sm text-gray-400">Updated: {asset.lastUpdated}</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-400/30 hover:bg-blue-500/30 transition-colors text-sm">
                  View Details
                </button>
                <button className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-400/30 hover:bg-purple-500/30 transition-colors text-sm">
                  Update Value
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl border border-white/20 p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Add Alternative Asset</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Asset Type</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">Select asset type...</option>
                  <option value="real_estate">Real Estate</option>
                  <option value="art">Art & Collectibles</option>
                  <option value="collectibles">Luxury Items</option>
                  <option value="crypto">Cryptocurrency</option>
                  <option value="commodities">Commodities</option>
                  <option value="private_equity">Private Equity</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Asset Name</label>
                <input
                  type="text"
                  placeholder="e.g., Vintage Ferrari 250 GT"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Value</label>
                <input
                  type="number"
                  placeholder="Enter current market value"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  placeholder="Brief description of the asset..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 h-20 resize-none"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg border border-gray-400/30 hover:bg-gray-500/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
              >
                Add Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlternativeAssets;