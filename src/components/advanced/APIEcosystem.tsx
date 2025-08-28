import React, { useState } from 'react';
import { Code, Zap, Globe, Key, Download, Upload, Settings, Shield } from 'lucide-react';

interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
  rateLimit: string;
  authentication: 'API_KEY' | 'OAUTH' | 'JWT';
  tier: 'free' | 'pro' | 'enterprise';
  examples: string[];
}

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'paused' | 'error';
  lastTriggered: string;
  totalCalls: number;
}

const mockAPIEndpoints: APIEndpoint[] = [
  {
    id: '1',
    name: 'Insider Trades',
    method: 'GET',
    endpoint: '/api/v1/insider-trades',
    description: 'Get real-time insider trading data with confidence scores',
    rateLimit: '1000/hour',
    authentication: 'API_KEY',
    tier: 'pro',
    examples: [
      'GET /api/v1/insider-trades?symbol=TSLA',
      'GET /api/v1/insider-trades?insider=elon-musk',
      'GET /api/v1/insider-trades?confidence=80'
    ]
  },
  {
    id: '2',
    name: 'AI Predictions',
    method: 'GET',
    endpoint: '/api/v1/predictions',
    description: 'Access AI-generated market predictions and price targets',
    rateLimit: '500/hour',
    authentication: 'JWT',
    tier: 'enterprise',
    examples: [
      'GET /api/v1/predictions?type=price_target',
      'GET /api/v1/predictions?symbol=NVDA&timeframe=30d',
      'GET /api/v1/predictions?confidence=90'
    ]
  },
  {
    id: '3',
    name: 'Portfolio Analytics',
    method: 'POST',
    endpoint: '/api/v1/portfolio/analyze',
    description: 'Submit portfolio for advanced risk and correlation analysis',
    rateLimit: '100/hour',
    authentication: 'OAUTH',
    tier: 'pro',
    examples: [
      'POST /api/v1/portfolio/analyze',
      'POST /api/v1/portfolio/optimize',
      'POST /api/v1/portfolio/stress-test'
    ]
  }
];

const mockWebhooks: WebhookConfig[] = [
  {
    id: '1',
    name: 'Insider Trade Alerts',
    url: 'https://myapp.com/webhooks/insider-trades',
    events: ['insider.trade.new', 'insider.trade.large'],
    status: 'active',
    lastTriggered: '2 minutes ago',
    totalCalls: 1247
  },
  {
    id: '2',
    name: 'AI Prediction Updates',
    url: 'https://myapp.com/webhooks/predictions',
    events: ['prediction.new', 'prediction.confidence_change'],
    status: 'active',
    lastTriggered: '15 minutes ago',
    totalCalls: 892
  }
];

const APIEcosystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'webhooks' | 'sdk' | 'playground'>('endpoints');
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint>(mockAPIEndpoints[0]);
  const [apiKey, setApiKey] = useState('sk_live_...');

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'POST': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'PUT': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'DELETE': return 'text-red-400 bg-red-500/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
      case 'pro': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'free': return 'text-green-400 bg-green-500/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      case 'error': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">API Ecosystem</h2>
          <p className="text-cyan-300/80 mt-1">Build custom tools with our comprehensive API suite</p>
        </div>
        <div className="flex items-center space-x-2">
          <Code className="h-5 w-5 text-green-400" />
          <span className="text-sm text-green-400">Developer Tools Active</span>
        </div>
      </div>

      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        {[
          { id: 'endpoints', label: 'API Endpoints', icon: Globe },
          { id: 'webhooks', label: 'Webhooks', icon: Zap },
          { id: 'sdk', label: 'SDKs', icon: Download },
          { id: 'playground', label: 'API Playground', icon: Code }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'endpoints' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">Available Endpoints</h3>
            {mockAPIEndpoints.map((endpoint) => (
              <button
                key={endpoint.id}
                onClick={() => setSelectedEndpoint(endpoint)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selectedEndpoint.id === endpoint.id
                    ? 'glass-effect border-cyan-400/50'
                    : 'glass-effect border-cyan-500/30 hover:border-cyan-400/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-cyan-100">{endpoint.name}</span>
                  <span className={`px-2 py-1 rounded text-xs border ${getMethodColor(endpoint.method)}`}>
                    {endpoint.method}
                  </span>
                </div>
                <div className="text-sm text-cyan-300/80 mb-2">{endpoint.description}</div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getTierColor(endpoint.tier)}`}>
                    {endpoint.tier.toUpperCase()}
                  </span>
                  <span className="text-xs text-cyan-400/60">{endpoint.rateLimit}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 glass-effect rounded-xl border border-cyan-500/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-cyan-400 font-orbitron">{selectedEndpoint.name}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded border ${getMethodColor(selectedEndpoint.method)}`}>
                  {selectedEndpoint.method}
                </span>
                <span className={`px-3 py-1 rounded-full border ${getTierColor(selectedEndpoint.tier)}`}>
                  {selectedEndpoint.tier.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 mb-4">
              <code className="text-cyan-400 font-mono">
                {selectedEndpoint.method} {selectedEndpoint.endpoint}
              </code>
            </div>

            <p className="text-cyan-300/80 mb-4">{selectedEndpoint.description}</p>

            <div className="space-y-3">
              <h4 className="text-md font-medium text-cyan-400">Example Requests:</h4>
              {selectedEndpoint.examples.map((example, index) => (
                <div key={index} className="bg-black/30 rounded-lg p-3">
                  <code className="text-green-400 font-mono text-sm">{example}</code>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-cyan-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-cyan-400/60">Rate Limit: {selectedEndpoint.rateLimit}</span>
                  <span className="text-cyan-500/60"> • </span>
                  <span className="text-sm text-cyan-400/60">Auth: {selectedEndpoint.authentication}</span>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                  Try in Playground
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'webhooks' && (
        <div className="space-y-4">
          {mockWebhooks.map((webhook) => (
            <div
              key={webhook.id}
              className="glass-effect rounded-xl border border-cyan-500/30 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-cyan-400">{webhook.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(webhook.status)}`}>
                      {webhook.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-cyan-300/80 mb-2">{webhook.url}</div>
                  <div className="flex flex-wrap gap-2">
                    {webhook.events.map((event) => (
                      <span
                        key={event}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-400/30"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">{webhook.totalCalls}</div>
                  <div className="text-sm text-cyan-400/60">Total Calls</div>
                  <div className="text-xs text-cyan-400/60 mt-1">Last: {webhook.lastTriggered}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'sdk' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'JavaScript SDK', language: 'javascript', downloads: '12.4K', version: '2.1.0' },
            { name: 'Python SDK', language: 'python', downloads: '8.9K', version: '1.8.2' },
            { name: 'Go SDK', language: 'go', downloads: '3.2K', version: '1.2.1' }
          ].map((sdk) => (
            <div key={sdk.name} className="glass-effect rounded-xl border border-cyan-500/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-cyan-400">{sdk.name}</h3>
                <span className="text-sm text-green-400">v{sdk.version}</span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-cyan-300/80">Downloads:</span>
                  <span className="text-cyan-100">{sdk.downloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/80">Language:</span>
                  <span className="text-cyan-100 capitalize">{sdk.language}</span>
                </div>
              </div>
              
              <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                Download SDK
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'playground' && (
        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">API Playground</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-cyan-400 mb-3">Request</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-cyan-300 mb-1">Endpoint</label>
                  <select className="w-full futuristic-input rounded-lg px-3 py-2 text-cyan-100">
                    {mockAPIEndpoints.map((endpoint) => (
                      <option key={endpoint.id} value={endpoint.endpoint}>
                        {endpoint.method} {endpoint.endpoint}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-cyan-300 mb-1">Parameters</label>
                  <textarea
                    className="w-full futuristic-input rounded-lg px-3 py-2 text-cyan-100 h-24 resize-none font-mono"
                    placeholder='{\n  "symbol": "TSLA",\n  "limit": 10\n}'
                  />
                </div>
                
                <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                  Send Request
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-cyan-400 mb-3">Response</h4>
              <div className="bg-black/30 rounded-lg p-4 h-64 overflow-y-auto">
                <pre className="text-green-400 font-mono text-sm">
{`{
  "status": "success",
  "data": [
    {
      "insider": "Elon Musk",
      "symbol": "TSLA",
      "action": "buy",
      "amount": 2500000,
      "confidence": 95,
      "timestamp": "2024-01-15T14:23:45Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Key Management */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">API Key Management</h3>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
            Generate New Key
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <Key className="h-5 w-5 text-yellow-400" />
          <div className="flex-1 bg-black/30 rounded-lg px-4 py-2 font-mono text-cyan-400">
            {apiKey}••••••••••••••••••••••••••••••••
          </div>
          <button className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded border border-blue-400/30 hover:bg-blue-500/30 transition-colors">
            Copy
          </button>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-400">2,847</div>
            <div className="text-sm text-cyan-400/60">API Calls Today</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">89.7%</div>
            <div className="text-sm text-cyan-400/60">Success Rate</div>
          </div>
          <div className="text-lg font-bold text-yellow-400">156ms</div>
          <div className="text-sm text-cyan-400/60">Avg Response</div>
        </div>
      </div>
    </div>
  );
};

export default APIEcosystem;