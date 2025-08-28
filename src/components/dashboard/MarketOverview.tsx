import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  insiderActivity: 'high' | 'medium' | 'low';
}

const mockMarketData: MarketData[] = [
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.50,
    change: 12.30,
    changePercent: 5.2,
    volume: '45.2M',
    insiderActivity: 'high'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 875.20,
    change: -8.45,
    changePercent: -0.95,
    volume: '62.1M',
    insiderActivity: 'high'
  },
  {
    symbol: 'META',
    name: 'Meta Platforms',
    price: 512.75,
    change: 18.90,
    changePercent: 3.8,
    volume: '28.7M',
    insiderActivity: 'medium'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.25,
    change: -2.15,
    changePercent: -1.1,
    volume: '54.3M',
    insiderActivity: 'medium'
  },
];

const MarketOverview: React.FC = () => {
  const getInsiderActivityColor = (activity: string) => {
    switch (activity) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Market Overview</h2>
          <p className="text-gray-300 text-sm mt-1">Stocks with high insider activity</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-blue-400" />
          <span className="text-sm text-blue-400">Live Market Data</span>
        </div>
      </div>

      <div className="space-y-3">
        {mockMarketData.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{stock.symbol.slice(0, 2)}</span>
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-white">{stock.symbol}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getInsiderActivityColor(stock.insiderActivity)}`}>
                    {stock.insiderActivity.toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">{stock.name}</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="font-semibold text-white">
                  ${stock.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">
                  Vol: {stock.volume}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {stock.change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <div className="text-right">
                  <div className={`font-medium ${stock.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}
                  </div>
                  <div className={`text-sm ${stock.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">+2.4%</div>
            <div className="text-sm text-gray-400">S&P 500</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">-0.8%</div>
            <div className="text-sm text-gray-400">NASDAQ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">+1.2%</div>
            <div className="text-sm text-gray-400">DOW</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;