import React, { useState } from 'react';
import { Grid, Eye, EyeOff, Move, Settings, Plus, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Widget {
  id: string;
  name: string;
  description: string;
  component: string;
  category: 'analytics' | 'tracking' | 'social' | 'ai' | 'portfolio';
  size: 'small' | 'medium' | 'large';
  requiredTier: 'insider-glimpse' | 'market-navigator' | 'wealth-architect' | 'omniscient-elite';
  enabled: boolean;
  position: { x: number; y: number };
}

const availableWidgets: Widget[] = [
  {
    id: 'insider-heatmap',
    name: 'Insider Trading Heatmap',
    description: 'Real-time visualization of elite investor activities',
    component: 'InsiderHeatmap',
    category: 'tracking',
    size: 'large',
    requiredTier: 'market-navigator',
    enabled: true,
    position: { x: 0, y: 0 }
  },
  {
    id: 'market-overview',
    name: 'Market Overview',
    description: 'Stocks with high insider activity',
    component: 'MarketOverview',
    category: 'analytics',
    size: 'large',
    requiredTier: 'insider-glimpse',
    enabled: true,
    position: { x: 0, y: 1 }
  },
  {
    id: 'ai-insights',
    name: 'AI Insights',
    description: 'AI-generated market analysis and recommendations',
    component: 'AIInsights',
    category: 'ai',
    size: 'medium',
    requiredTier: 'market-navigator',
    enabled: true,
    position: { x: 1, y: 0 }
  },
  {
    id: 'performance-metrics',
    name: 'Performance Metrics',
    description: 'Your portfolio performance and statistics',
    component: 'PerformanceMetrics',
    category: 'portfolio',
    size: 'medium',
    requiredTier: 'insider-glimpse',
    enabled: true,
    position: { x: 1, y: 1 }
  },
  {
    id: 'trending-insiders',
    name: 'Trending Insiders',
    description: 'Top performing investors to follow',
    component: 'TrendingInsiders',
    category: 'social',
    size: 'medium',
    requiredTier: 'market-navigator',
    enabled: true,
    position: { x: 2, y: 0 }
  },
  {
    id: 'recent-alerts',
    name: 'Recent Alerts',
    description: 'Latest market alerts and notifications',
    component: 'RecentAlerts',
    category: 'analytics',
    size: 'medium',
    requiredTier: 'insider-glimpse',
    enabled: true,
    position: { x: 2, y: 1 }
  },
  {
    id: 'quantum-analysis',
    name: 'Quantum Analysis',
    description: 'Advanced quantum-enhanced market predictions',
    component: 'QuantumAnalysis',
    category: 'ai',
    size: 'large',
    requiredTier: 'omniscient-elite',
    enabled: false,
    position: { x: 0, y: 2 }
  },
  {
    id: 'global-intelligence',
    name: 'Global Intelligence',
    description: 'Worldwide insider tracking and geopolitical analysis',
    component: 'GlobalIntelligence',
    category: 'tracking',
    size: 'large',
    requiredTier: 'wealth-architect',
    enabled: false,
    position: { x: 1, y: 2 }
  },
  {
    id: 'social-feed',
    name: 'Social Trading Feed',
    description: 'Live feed from traders you follow',
    component: 'SocialFeed',
    category: 'social',
    size: 'medium',
    requiredTier: 'market-navigator',
    enabled: false,
    position: { x: 2, y: 2 }
  },
  {
    id: 'risk-radar',
    name: 'Risk Radar',
    description: 'Political and regulatory risk monitoring',
    component: 'RiskRadar',
    category: 'analytics',
    size: 'medium',
    requiredTier: 'wealth-architect',
    enabled: false,
    position: { x: 0, y: 3 }
  }
];

const WidgetManager: React.FC = () => {
  const [widgets, setWidgets] = useLocalStorage('dashboard-widgets', availableWidgets);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleWidget = (widgetId: string) => {
    setWidgets(prev => 
      prev.map(widget => 
        widget.id === widgetId 
          ? { ...widget, enabled: !widget.enabled }
          : widget
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'analytics': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'tracking': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'social': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
      case 'ai': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'portfolio': return 'text-red-400 bg-red-500/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'omniscient-elite': return 'text-yellow-400 bg-yellow-500/20';
      case 'wealth-architect': return 'text-purple-400 bg-purple-500/20';
      case 'market-navigator': return 'text-blue-400 bg-blue-500/20';
      case 'insider-glimpse': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredWidgets = selectedCategory === 'all' 
    ? widgets 
    : widgets.filter(widget => widget.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Widgets</h2>
          <p className="text-gray-300 mt-1">Customize what you see on your dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditMode
                ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                : 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
            }`}
          >
            {isEditMode ? <Eye className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
            <span>{isEditMode ? 'Exit Edit' : 'Edit Layout'}</span>
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
            All Widgets
          </button>
          {['analytics', 'tracking', 'social', 'ai', 'portfolio'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize ${
                selectedCategory === category
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Widget Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWidgets.map((widget) => (
          <div
            key={widget.id}
            className={`bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 transition-all duration-200 ${
              widget.enabled ? 'opacity-100' : 'opacity-60'
            } ${isEditMode ? 'cursor-move' : ''}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg border ${getCategoryColor(widget.category)}`}>
                  <Grid className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{widget.name}</h3>
                  <p className="text-gray-400 text-sm">{widget.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {isEditMode && (
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Move className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => toggleWidget(widget.id)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  {widget.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(widget.category)}`}>
                {widget.category.toUpperCase()}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${getTierColor(widget.requiredTier)}`}>
                {widget.requiredTier.replace('-', ' ').toUpperCase()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Size: {widget.size}</span>
              <div className="flex space-x-1">
                <div className={`w-3 h-3 rounded ${widget.enabled ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <span className="text-xs text-gray-400">
                  {widget.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Widget */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Custom Widgets</h3>
            <p className="text-gray-400 text-sm">Create your own dashboard widgets</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
            <Plus className="h-4 w-4" />
            <span>Create Widget</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetManager;