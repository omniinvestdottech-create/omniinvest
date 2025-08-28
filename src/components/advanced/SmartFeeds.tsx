import React, { useState } from 'react';
import { Rss, Plus, Filter, Bell, Zap, Target } from 'lucide-react';

interface SmartFeed {
  id: string;
  name: string;
  description: string;
  triggers: string[];
  active: boolean;
  alertCount: number;
  lastTriggered: string;
}

const mockSmartFeeds: SmartFeed[] = [
  {
    id: '1',
    name: 'Green Energy Surge',
    description: 'Alert when 3+ billionaires buy clean energy stocks within a week',
    triggers: ['Elon Musk', 'Bill Gates', 'Warren Buffett'],
    active: true,
    alertCount: 12,
    lastTriggered: '2 hours ago'
  },
  {
    id: '2',
    name: 'Political Trading Patterns',
    description: 'Monitor unusual trading activity from government officials',
    triggers: ['Nancy Pelosi', 'Dan Crenshaw', 'Josh Gottheimer'],
    active: true,
    alertCount: 8,
    lastTriggered: '4 hours ago'
  },
  {
    id: '3',
    name: 'Tech Sector Rotation',
    description: 'Track when tech CEOs reduce their positions significantly',
    triggers: ['Tech CEOs', 'FAANG stocks', 'Semiconductor sector'],
    active: false,
    alertCount: 3,
    lastTriggered: '1 day ago'
  }
];

const SmartFeeds: React.FC = () => {
  const [feeds, setFeeds] = useState(mockSmartFeeds);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleFeed = (id: string) => {
    setFeeds(feeds.map(feed => 
      feed.id === id ? { ...feed, active: !feed.active } : feed
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Smart Feeds</h2>
          <p className="text-gray-300 mt-1">Custom alerts based on your investment criteria</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Create Feed</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {feeds.map((feed) => (
          <div
            key={feed.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  feed.active ? 'bg-green-500/20 border border-green-400/30' : 'bg-gray-500/20 border border-gray-400/30'
                }`}>
                  <Rss className={`h-6 w-6 ${feed.active ? 'text-green-400' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{feed.name}</h3>
                  <p className="text-gray-400 text-sm">{feed.description}</p>
                </div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={feed.active}
                  onChange={() => toggleFeed(feed.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {feed.triggers.map((trigger, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-400/30"
                  >
                    {trigger}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Bell className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{feed.alertCount} alerts</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{feed.lastTriggered}</span>
                  </div>
                </div>
                
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Configure
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl border border-white/20 p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Create Smart Feed</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Feed Name</label>
                <input
                  type="text"
                  placeholder="e.g., AI Stock Surge"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  placeholder="Describe what triggers this feed..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 h-20 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Triggers</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add trigger..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                Create Feed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartFeeds;