import React, { useState } from 'react';
import { Activity, Eye, Zap, Target, BarChart, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface OrderFlowData {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  size: number;
  price: number;
  venue: string;
  timestamp: string;
  institutional: boolean;
  darkPool: boolean;
  confidence: number;
}

interface LiquidityData {
  symbol: string;
  bidSize: number;
  askSize: number;
  spread: number;
  depth: number;
  impact: number;
  optimalSize: number;
}

const mockOrderFlow: OrderFlowData[] = [
  {
    id: '1',
    symbol: 'NVDA',
    side: 'buy',
    size: 2500000,
    price: 875.20,
    venue: 'Dark Pool Alpha',
    timestamp: '14:23:45',
    institutional: true,
    darkPool: true,
    confidence: 94
  },
  {
    id: '2',
    symbol: 'TSLA',
    side: 'sell',
    size: 1800000,
    price: 248.50,
    venue: 'NASDAQ',
    timestamp: '14:22:12',
    institutional: true,
    darkPool: false,
    confidence: 87
  },
  {
    id: '3',
    symbol: 'AAPL',
    side: 'buy',
    size: 3200000,
    price: 189.25,
    venue: 'Dark Pool Beta',
    timestamp: '14:21:33',
    institutional: true,
    darkPool: true,
    confidence: 91
  }
];

const mockLiquidityData: LiquidityData[] = [
  {
    symbol: 'NVDA',
    bidSize: 1250000,
    askSize: 980000,
    spread: 0.05,
    depth: 8.5,
    impact: 0.12,
    optimalSize: 500000
  },
  {
    symbol: 'TSLA',
    bidSize: 2100000,
    askSize: 1890000,
    spread: 0.08,
    depth: 12.3,
    impact: 0.08,
    optimalSize: 750000
  },
  {
    symbol: 'AAPL',
    bidSize: 3400000,
    askSize: 3200000,
    spread: 0.02,
    depth: 15.7,
    impact: 0.03,
    optimalSize: 1200000
  }
];

const MarketMicrostructure: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'order_flow' | 'dark_pools' | 'liquidity' | 'timing'>('order_flow');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('NVDA');

  const formatSize = (size: number) => {
    if (size >= 1000000) return `$${(size / 1000000).toFixed(1)}M`;
    if (size >= 1000) return `$${(size / 1000).toFixed(0)}K`;
    return `$${size.toLocaleString()}`;
  };

  const getVenueColor = (venue: string, darkPool: boolean) => {
    if (darkPool) return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
    return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
  };

  const getSideColor = (side: string) => {
    return side === 'buy' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Market Microstructure</h2>
          <p className="text-cyan-300/80 mt-1">Advanced order flow and liquidity analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-green-400" />
          <span className="text-sm text-green-400">Real-time Data Feed</span>
        </div>
      </div>

      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        {[
          { id: 'order_flow', label: 'Order Flow', icon: TrendingUp },
          { id: 'dark_pools', label: 'Dark Pools', icon: Eye },
          { id: 'liquidity', label: 'Liquidity', icon: BarChart },
          { id: 'timing', label: 'Optimal Timing', icon: Clock }
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

      {activeTab === 'order_flow' && (
        <div className="space-y-4">
          <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Institutional Order Flow</h3>
            <div className="space-y-3">
              {mockOrderFlow.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-cyan-500/20 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{order.symbol.slice(0, 2)}</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-cyan-100">{order.symbol}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSideColor(order.side)}`}>
                          {order.side.toUpperCase()}
                        </span>
                        {order.institutional && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs border border-yellow-400/30">
                            INSTITUTIONAL
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-cyan-400/60">
                        {formatSize(order.size)} @ ${order.price} • {order.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs border ${getVenueColor(order.venue, order.darkPool)}`}>
                      {order.venue}
                    </div>
                    <div className="text-sm text-green-400 mt-1">{order.confidence}% confidence</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dark_pools' && (
        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Dark Pool Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-400/30">
              <div className="text-3xl font-bold text-purple-400 mb-2 font-orbitron">$47.2M</div>
              <div className="text-sm text-cyan-400/60">Dark Pool Volume (1h)</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
              <div className="text-3xl font-bold text-blue-400 mb-2 font-orbitron">23</div>
              <div className="text-sm text-cyan-400/60">Large Block Trades</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-400/30">
              <div className="text-3xl font-bold text-green-400 mb-2 font-orbitron">89%</div>
              <div className="text-sm text-cyan-400/60">Buy/Sell Ratio</div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-md font-medium text-cyan-400 mb-3">Top Dark Pool Venues</h4>
            <div className="space-y-2">
              {['Dark Pool Alpha', 'Crossfinder', 'Sigma X', 'LiquidNet'].map((venue, index) => (
                <div key={venue} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-cyan-100">{venue}</span>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-green-400">${(Math.random() * 50 + 10).toFixed(1)}M</div>
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${Math.random() * 80 + 20}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'liquidity' && (
        <div className="space-y-4">
          {mockLiquidityData.map((data) => (
            <div
              key={data.symbol}
              className="glass-effect rounded-xl border border-cyan-500/30 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-cyan-400">{data.symbol} Liquidity Analysis</h3>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-400">{data.depth}</div>
                  <div className="text-sm text-cyan-400/60">Depth Score</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold text-green-400">{formatSize(data.bidSize)}</div>
                  <div className="text-sm text-cyan-400/60">Bid Size</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold text-red-400">{formatSize(data.askSize)}</div>
                  <div className="text-sm text-cyan-400/60">Ask Size</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold text-yellow-400">${data.spread.toFixed(3)}</div>
                  <div className="text-sm text-cyan-400/60">Spread</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">{formatSize(data.optimalSize)}</div>
                  <div className="text-sm text-cyan-400/60">Optimal Size</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'timing' && (
        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Optimal Trade Timing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-cyan-400 mb-3">Best Trading Windows</h4>
              <div className="space-y-3">
                {[
                  { time: '9:30-10:00 AM', quality: 'Excellent', reason: 'High volume, tight spreads' },
                  { time: '2:00-3:00 PM', quality: 'Good', reason: 'Institutional activity peak' },
                  { time: '3:30-4:00 PM', quality: 'Fair', reason: 'Closing auction preparation' }
                ].map((window, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-cyan-100">{window.time}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        window.quality === 'Excellent' ? 'text-green-400 bg-green-500/20' :
                        window.quality === 'Good' ? 'text-yellow-400 bg-yellow-500/20' :
                        'text-orange-400 bg-orange-500/20'
                      }`}>
                        {window.quality}
                      </span>
                    </div>
                    <p className="text-sm text-cyan-400/60">{window.reason}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-cyan-400 mb-3">Market Impact Analysis</h4>
              <div className="space-y-3">
                {mockLiquidityData.map((data) => (
                  <div key={data.symbol} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-cyan-100">{data.symbol}</span>
                      <span className="text-sm text-green-400">{(data.impact * 100).toFixed(2)}% impact</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full" 
                        style={{ width: `${data.impact * 100 * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketMicrostructure;