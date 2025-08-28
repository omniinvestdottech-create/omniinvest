import React, { useState } from 'react';
import { TrendingUp, PieChart, Copy, Target, BarChart, Calculator } from 'lucide-react';

interface Position {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
  copiedFrom?: string;
}

const mockPositions: Position[] = [
  {
    id: '1',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    shares: 50,
    avgPrice: 200.50,
    currentPrice: 248.50,
    totalValue: 12425,
    gainLoss: 2400,
    gainLossPercent: 23.9,
    copiedFrom: 'Elon Musk'
  },
  {
    id: '2',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    shares: 25,
    avgPrice: 780.00,
    currentPrice: 875.20,
    totalValue: 21880,
    gainLoss: 2380,
    gainLossPercent: 12.2,
    copiedFrom: 'Nancy Pelosi'
  },
  {
    id: '3',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 100,
    avgPrice: 195.25,
    currentPrice: 189.25,
    totalValue: 18925,
    gainLoss: -600,
    gainLossPercent: -3.1
  },
];

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'positions' | 'simulator' | 'analytics'>('positions');

  const totalValue = mockPositions.reduce((sum, pos) => sum + pos.totalValue, 0);
  const totalGainLoss = mockPositions.reduce((sum, pos) => sum + pos.gainLoss, 0);
  const totalGainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100;

  const renderPositions = () => (
    <div className="space-y-4">
      {mockPositions.map((position) => (
        <div
          key={position.id}
          className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 card-hover"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="font-bold text-white">{position.symbol.slice(0, 2)}</span>
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-white">{position.symbol}</h3>
                  {position.copiedFrom && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-blue-500/20 rounded-full border border-blue-400/30">
                      <Copy className="h-3 w-3 text-blue-400" />
                      <span className="text-xs text-blue-400">{position.copiedFrom}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{position.name}</p>
                <p className="text-gray-400 text-sm">{position.shares} shares @ ${position.avgPrice.toFixed(2)}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-white">
                ${position.totalValue.toLocaleString()}
              </div>
              <div className={`text-sm font-medium ${position.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {position.gainLoss >= 0 ? '+' : ''}${position.gainLoss.toLocaleString()} ({position.gainLossPercent.toFixed(1)}%)
              </div>
              <div className="text-sm text-gray-400">
                Current: ${position.currentPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSimulator = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">"What If I Followed?" Simulator</h3>
        <p className="text-gray-300">Simulate portfolio performance by following specific insiders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Select Insider to Follow</h4>
          <div className="space-y-3">
            {['Elon Musk', 'Nancy Pelosi', 'Warren Buffett', 'Mark Cuban'].map((name) => (
              <label key={name} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-400" />
                <span className="text-white">{name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-white mb-4">Simulation Results</h4>
          <div className="space-y-4">
            <div className="p-4 bg-green-500/20 rounded-lg border border-green-400/30">
              <div className="text-2xl font-bold text-green-400">+45.6%</div>
              <div className="text-sm text-gray-300">Following Elon Musk (1 year)</div>
            </div>
            
            <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <div className="text-2xl font-bold text-blue-400">+32.1%</div>
              <div className="text-sm text-gray-300">Portfolio Mix (1 year)</div>
            </div>
            
            <div className="p-4 bg-gray-500/20 rounded-lg border border-gray-400/30">
              <div className="text-2xl font-bold text-gray-400">+6.8%</div>
              <div className="text-sm text-gray-300">S&P 500 Benchmark</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Risk Analysis</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Portfolio Beta</span>
            <span className="text-white font-medium">1.24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Volatility (30d)</span>
            <span className="text-yellow-400 font-medium">High</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Sharpe Ratio</span>
            <span className="text-green-400 font-medium">1.85</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Max Drawdown</span>
            <span className="text-red-400 font-medium">-12.4%</span>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Sector Allocation</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Technology</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-white text-sm">65%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Consumer Discretionary</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="text-white text-sm">25%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Other</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
              <span className="text-white text-sm">10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-300 mt-1">Track your investments and simulate insider strategies</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</div>
          <div className={`text-lg font-medium ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString()} ({totalGainLossPercent.toFixed(1)}%)
          </div>
        </div>
      </div>

      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('positions')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'positions'
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <PieChart className="h-4 w-4" />
          <span>Positions</span>
        </button>
        
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'simulator'
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Calculator className="h-4 w-4" />
          <span>Simulator</span>
        </button>
        
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'analytics'
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <BarChart className="h-4 w-4" />
          <span>Analytics</span>
        </button>
      </div>

      {activeTab === 'positions' && renderPositions()}
      {activeTab === 'simulator' && renderSimulator()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
};

export default Portfolio;