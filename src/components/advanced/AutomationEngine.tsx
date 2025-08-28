import React, { useState } from 'react';
import { Bot, Zap, Settings, Play, Pause, TrendingUp, Shield, Target } from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  type: 'price_alert' | 'insider_follow' | 'rebalancing' | 'stop_loss' | 'tax_harvest';
  status: 'active' | 'paused' | 'disabled';
  description: string;
  conditions: string[];
  actions: string[];
  performance: {
    triggered: number;
    successful: number;
    savedAmount: number;
  };
  lastTriggered?: string;
}

const mockRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Insider Buy Alert & Auto-Purchase',
    type: 'insider_follow',
    status: 'active',
    description: 'Automatically buy when 3+ insiders purchase the same stock within 48 hours',
    conditions: [
      'Minimum 3 insider purchases',
      'Within 48 hour window',
      'Minimum $1M total purchase value',
      'Confidence score > 85%'
    ],
    actions: [
      'Send instant notification',
      'Auto-purchase $1,000 worth',
      'Set 10% stop-loss',
      'Add to watchlist'
    ],
    performance: {
      triggered: 23,
      successful: 19,
      savedAmount: 12450
    },
    lastTriggered: '2 hours ago'
  },
  {
    id: '2',
    name: 'Smart Portfolio Rebalancing',
    type: 'rebalancing',
    status: 'active',
    description: 'Automatically rebalance portfolio when allocations drift >5% from targets',
    conditions: [
      'Allocation drift > 5%',
      'Minimum 30 days since last rebalance',
      'Market volatility < 25%'
    ],
    actions: [
      'Calculate optimal trades',
      'Execute rebalancing trades',
      'Minimize tax impact',
      'Send summary report'
    ],
    performance: {
      triggered: 8,
      successful: 8,
      savedAmount: 3200
    },
    lastTriggered: '1 week ago'
  },
  {
    id: '3',
    name: 'Tax Loss Harvesting',
    type: 'tax_harvest',
    status: 'active',
    description: 'Automatically harvest tax losses while avoiding wash sale rules',
    conditions: [
      'Position down >10%',
      'No wash sale risk',
      'Tax benefit > $100'
    ],
    actions: [
      'Sell losing position',
      'Buy similar ETF/stock',
      'Wait 31 days',
      'Repurchase original if desired'
    ],
    performance: {
      triggered: 12,
      successful: 11,
      savedAmount: 8750
    },
    lastTriggered: '3 days ago'
  },
  {
    id: '4',
    name: 'Dynamic Stop-Loss Protection',
    type: 'stop_loss',
    status: 'active',
    description: 'Intelligent stop-losses that adjust based on volatility and insider sentiment',
    conditions: [
      'Position down >15%',
      'No recent insider buying',
      'Volatility normalized'
    ],
    actions: [
      'Execute stop-loss sale',
      'Preserve capital',
      'Send notification',
      'Suggest alternatives'
    ],
    performance: {
      triggered: 6,
      successful: 5,
      savedAmount: 15600
    },
    lastTriggered: '5 days ago'
  }
];

const AutomationEngine: React.FC = () => {
  const [selectedRule, setSelectedRule] = useState<AutomationRule>(mockRules[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'disabled': return 'text-red-400 bg-red-500/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'price_alert': return <Target className="h-5 w-5" />;
      case 'insider_follow': return <TrendingUp className="h-5 w-5" />;
      case 'rebalancing': return <Settings className="h-5 w-5" />;
      case 'stop_loss': return <Shield className="h-5 w-5" />;
      case 'tax_harvest': return <Zap className="h-5 w-5" />;
      default: return <Bot className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'price_alert': return 'text-blue-400 bg-blue-500/20';
      case 'insider_follow': return 'text-green-400 bg-green-500/20';
      case 'rebalancing': return 'text-purple-400 bg-purple-500/20';
      case 'stop_loss': return 'text-red-400 bg-red-500/20';
      case 'tax_harvest': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const toggleRuleStatus = (ruleId: string) => {
    // In a real app, this would update the rule status
    console.log(`Toggling rule ${ruleId}`);
  };

  const totalSaved = mockRules.reduce((sum, rule) => sum + rule.performance.savedAmount, 0);
  const totalTriggered = mockRules.reduce((sum, rule) => sum + rule.performance.triggered, 0);
  const totalSuccessful = mockRules.reduce((sum, rule) => sum + rule.performance.successful, 0);
  const successRate = totalTriggered > 0 ? (totalSuccessful / totalTriggered * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Automation Engine</h2>
          <p className="text-cyan-300/80 mt-1">AI-powered trading automation and portfolio management</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-green-400 animate-pulse" />
            <span className="text-sm text-green-400">4 Rules Active</span>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Create Rule
          </button>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Automation Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2 font-orbitron">
              ${totalSaved.toLocaleString()}
            </div>
            <div className="text-sm text-cyan-400/60">Total Saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2 font-orbitron">{totalTriggered}</div>
            <div className="text-sm text-cyan-400/60">Rules Triggered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2 font-orbitron">{successRate}%</div>
            <div className="text-sm text-cyan-400/60">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2 font-orbitron">4</div>
            <div className="text-sm text-cyan-400/60">Active Rules</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rules List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">Automation Rules</h3>
          {mockRules.map((rule) => (
            <div
              key={rule.id}
              onClick={() => setSelectedRule(rule)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                selectedRule.id === rule.id
                  ? 'glass-effect border-cyan-400/50'
                  : 'glass-effect border-cyan-500/30 hover:border-cyan-400/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(rule.type)}`}>
                    {getTypeIcon(rule.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-cyan-100">{rule.name}</h4>
                    <p className="text-xs text-cyan-400/60">{rule.type.replace('_', ' ').toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(rule.status)}`}>
                    {rule.status.toUpperCase()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRuleStatus(rule.id);
                    }}
                    className="p-1 rounded text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {rule.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-cyan-300/80 mb-3">{rule.description}</p>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-green-400 font-medium">${rule.performance.savedAmount.toLocaleString()}</div>
                  <div className="text-cyan-400/60">Saved</div>
                </div>
                <div>
                  <div className="text-blue-400 font-medium">{rule.performance.triggered}</div>
                  <div className="text-cyan-400/60">Triggered</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rule Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-3 rounded-lg ${getTypeColor(selectedRule.type)}`}>
                    {getTypeIcon(selectedRule.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 font-orbitron">
                      {selectedRule.name}
                    </h3>
                    <p className="text-cyan-300/80">{selectedRule.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedRule.status)}`}>
                  {selectedRule.status.toUpperCase()}
                </span>
                <button
                  onClick={() => toggleRuleStatus(selectedRule.id)}
                  className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                >
                  {selectedRule.status === 'active' ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-green-400 font-orbitron">
                  ${selectedRule.performance.savedAmount.toLocaleString()}
                </div>
                <div className="text-sm text-cyan-400/60">Total Saved</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-blue-400 font-orbitron">
                  {selectedRule.performance.triggered}
                </div>
                <div className="text-sm text-cyan-400/60">Times Triggered</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-purple-400 font-orbitron">
                  {selectedRule.performance.triggered > 0 
                    ? ((selectedRule.performance.successful / selectedRule.performance.triggered) * 100).toFixed(1)
                    : '0'
                  }%
                </div>
                <div className="text-sm text-cyan-400/60">Success Rate</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-3 font-orbitron">Conditions</h4>
                <div className="space-y-2">
                  {selectedRule.conditions.map((condition, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                      <p className="text-sm text-cyan-300/90">{condition}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-3 font-orbitron">Actions</h4>
                <div className="space-y-2">
                  {selectedRule.actions.map((action, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
                      <p className="text-sm text-cyan-300/90">{action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedRule.lastTriggered && (
              <div className="mt-6 pt-4 border-t border-cyan-500/30">
                <div className="text-sm text-cyan-400/80">
                  Last triggered: {selectedRule.lastTriggered}
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Edit Rule
            </button>
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Duplicate Rule
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Create Rule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl border border-cyan-500/30 p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4 font-orbitron">Create Automation Rule</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g., Auto-buy on insider activity"
                  className="w-full glass-effect border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Rule Type</label>
                <select className="w-full glass-effect border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                  <option value="insider_follow">Insider Following</option>
                  <option value="price_alert">Price Alert</option>
                  <option value="rebalancing">Portfolio Rebalancing</option>
                  <option value="stop_loss">Stop Loss</option>
                  <option value="tax_harvest">Tax Harvesting</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Description</label>
                <textarea
                  placeholder="Describe what this rule does..."
                  className="w-full glass-effect border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 h-20 resize-none"
                />
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
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                Create Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomationEngine;