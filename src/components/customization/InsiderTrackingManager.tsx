import React, { useState } from 'react';
import { Search, Star, Plus, Trash2, Eye, Crown, Building, Users } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface TrackedInsider {
  id: string;
  name: string;
  title: string;
  company: string;
  category: 'tech_ceo' | 'politician' | 'celebrity' | 'hedge_fund' | 'billionaire';
  avatar: string;
  verified: boolean;
  following: boolean;
  performance: number;
  recentTrades: number;
  successRate: number;
  influence: 'high' | 'medium' | 'low';
}

const insiderDatabase: TrackedInsider[] = [
  // Tech CEOs
  { id: '1', name: 'Elon Musk', title: 'CEO', company: 'Tesla & SpaceX', category: 'tech_ceo', avatar: 'EM', verified: true, following: false, performance: 34.8, recentTrades: 12, successRate: 73, influence: 'high' },
  { id: '2', name: 'Tim Cook', title: 'CEO', company: 'Apple', category: 'tech_ceo', avatar: 'TC', verified: true, following: false, performance: 18.2, recentTrades: 8, successRate: 81, influence: 'high' },
  { id: '3', name: 'Satya Nadella', title: 'CEO', company: 'Microsoft', category: 'tech_ceo', avatar: 'SN', verified: true, following: false, performance: 22.1, recentTrades: 15, successRate: 79, influence: 'high' },
  { id: '4', name: 'Jensen Huang', title: 'CEO', company: 'NVIDIA', category: 'tech_ceo', avatar: 'JH', verified: true, following: false, performance: 45.6, recentTrades: 6, successRate: 89, influence: 'high' },
  { id: '5', name: 'Mark Zuckerberg', title: 'CEO', company: 'Meta', category: 'tech_ceo', avatar: 'MZ', verified: true, following: false, performance: 12.4, recentTrades: 11, successRate: 67, influence: 'high' },
  
  // Politicians
  { id: '6', name: 'Nancy Pelosi', title: 'Former House Speaker', company: 'US Congress', category: 'politician', avatar: 'NP', verified: true, following: false, performance: 28.2, recentTrades: 8, successRate: 81, influence: 'high' },
  { id: '7', name: 'Dan Crenshaw', title: 'Representative', company: 'US Congress', category: 'politician', avatar: 'DC', verified: true, following: false, performance: 19.7, recentTrades: 5, successRate: 74, influence: 'medium' },
  { id: '8', name: 'Josh Gottheimer', title: 'Representative', company: 'US Congress', category: 'politician', avatar: 'JG', verified: true, following: false, performance: 15.3, recentTrades: 7, successRate: 68, influence: 'medium' },
  
  // Celebrities
  { id: '9', name: 'Kim Kardashian', title: 'Entrepreneur', company: 'SKIMS', category: 'celebrity', avatar: 'KK', verified: true, following: false, performance: 23.1, recentTrades: 4, successRate: 65, influence: 'medium' },
  { id: '10', name: 'Mark Cuban', title: 'Entrepreneur', company: 'Dallas Mavericks', category: 'celebrity', avatar: 'MC', verified: true, following: false, performance: 19.7, recentTrades: 6, successRate: 78, influence: 'high' },
  { id: '11', name: 'Oprah Winfrey', title: 'Media Mogul', company: 'OWN Network', category: 'celebrity', avatar: 'OW', verified: true, following: false, performance: 16.8, recentTrades: 3, successRate: 72, influence: 'medium' },
  { id: '12', name: 'Jay-Z', title: 'Entrepreneur', company: 'Roc Nation', category: 'celebrity', avatar: 'JZ', verified: true, following: false, performance: 31.4, recentTrades: 9, successRate: 76, influence: 'medium' },
  
  // Hedge Fund Managers
  { id: '13', name: 'Warren Buffett', title: 'CEO', company: 'Berkshire Hathaway', category: 'hedge_fund', avatar: 'WB', verified: true, following: false, performance: 22.1, recentTrades: 156, successRate: 84, influence: 'high' },
  { id: '14', name: 'Ray Dalio', title: 'Founder', company: 'Bridgewater Associates', category: 'hedge_fund', avatar: 'RD', verified: true, following: false, performance: 18.9, recentTrades: 23, successRate: 82, influence: 'high' },
  { id: '15', name: 'Cathie Wood', title: 'CEO', company: 'ARK Invest', category: 'hedge_fund', avatar: 'CW', verified: true, following: false, performance: -12.5, recentTrades: 15, successRate: 65, influence: 'high' },
  { id: '16', name: 'Bill Ackman', title: 'CEO', company: 'Pershing Square', category: 'hedge_fund', avatar: 'BA', verified: true, following: false, performance: 25.7, recentTrades: 18, successRate: 77, influence: 'high' },
  
  // Billionaires
  { id: '17', name: 'Jeff Bezos', title: 'Executive Chairman', company: 'Amazon', category: 'billionaire', avatar: 'JB', verified: true, following: false, performance: 14.2, recentTrades: 4, successRate: 85, influence: 'high' },
  { id: '18', name: 'Bill Gates', title: 'Co-Founder', company: 'Microsoft', category: 'billionaire', avatar: 'BG', verified: true, following: false, performance: 19.8, recentTrades: 7, successRate: 88, influence: 'high' },
  { id: '19', name: 'Michael Bloomberg', title: 'Founder', company: 'Bloomberg LP', category: 'billionaire', avatar: 'MB', verified: true, following: false, performance: 21.3, recentTrades: 12, successRate: 83, influence: 'high' },
  { id: '20', name: 'Carl Icahn', title: 'Chairman', company: 'Icahn Enterprises', category: 'billionaire', avatar: 'CI', verified: true, following: false, performance: 17.6, recentTrades: 9, successRate: 79, influence: 'high' }
];

const InsiderTrackingManager: React.FC = () => {
  const [trackedInsiders, setTrackedInsiders] = useLocalStorage('tracked-insiders', insiderDatabase.slice(0, 6));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleFollowing = (insiderId: string) => {
    setTrackedInsiders(prev => 
      prev.map(insider => 
        insider.id === insiderId 
          ? { ...insider, following: !insider.following }
          : insider
      )
    );
  };

  const addInsider = (insider: TrackedInsider) => {
    if (!trackedInsiders.find(tracked => tracked.id === insider.id)) {
      setTrackedInsiders(prev => [...prev, { ...insider, following: true }]);
    }
    setShowAddModal(false);
  };

  const removeInsider = (insiderId: string) => {
    setTrackedInsiders(prev => prev.filter(insider => insider.id !== insiderId));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tech_ceo': return <Building className="h-4 w-4" />;
      case 'politician': return <Crown className="h-4 w-4" />;
      case 'celebrity': return <Star className="h-4 w-4" />;
      case 'hedge_fund': return <Users className="h-4 w-4" />;
      case 'billionaire': return <Eye className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tech_ceo': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'politician': return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'celebrity': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
      case 'hedge_fund': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'billionaire': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const filteredDatabase = insiderDatabase.filter(insider => {
    const matchesSearch = insider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insider.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || insider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Insider Tracking</h2>
          <p className="text-gray-300 mt-1">Choose which elite investors to track</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Insider</span>
        </button>
      </div>

      {/* Currently Tracked */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Currently Tracking ({trackedInsiders.length})</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {trackedInsiders.map((insider) => (
            <div key={insider.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{insider.avatar}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{insider.name}</span>
                    {insider.verified && <Star className="h-3 w-3 text-yellow-400" />}
                  </div>
                  <div className="text-sm text-gray-400">{insider.title}, {insider.company}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${insider.performance > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {insider.performance > 0 ? '+' : ''}{insider.performance}%
                </span>
                <button
                  onClick={() => removeInsider(insider.id)}
                  className="p-1 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Insider Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl border border-white/20 p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Add Insider to Track</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All Categories</option>
                <option value="tech_ceo">Tech CEOs</option>
                <option value="politician">Politicians</option>
                <option value="celebrity">Celebrities</option>
                <option value="hedge_fund">Hedge Fund Managers</option>
                <option value="billionaire">Billionaires</option>
              </select>
            </div>

            {/* Insider Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {filteredDatabase.map((insider) => (
                <div key={insider.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{insider.avatar}</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{insider.name}</span>
                          {insider.verified && <Star className="h-3 w-3 text-yellow-400" />}
                          <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(insider.category)}`}>
                            {getCategoryIcon(insider.category)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">{insider.title}</div>
                        <div className="text-xs text-gray-500">{insider.company}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-bold ${insider.performance > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {insider.performance > 0 ? '+' : ''}{insider.performance}%
                      </div>
                      <div className="text-sm text-gray-400">{insider.successRate}% success</div>
                      <button
                        onClick={() => addInsider(insider)}
                        disabled={trackedInsiders.some(tracked => tracked.id === insider.id)}
                        className="mt-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-400/30 hover:bg-blue-500/30 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {trackedInsiders.some(tracked => tracked.id === insider.id) ? 'Already Tracking' : 'Track'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsiderTrackingManager;