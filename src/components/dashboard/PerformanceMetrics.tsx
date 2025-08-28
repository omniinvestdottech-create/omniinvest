import React from 'react';
import { Target, Trophy, TrendingUp, PieChart } from 'lucide-react';

const PerformanceMetrics: React.FC = () => {
  const metrics = [
    {
      label: 'Portfolio Return',
      value: '+24.8%',
      change: '+2.3%',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      label: 'Success Rate',
      value: '78%',
      change: '+5%',
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      label: 'Followed Trades',
      value: '142',
      change: '+18',
      icon: PieChart,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      label: 'Rank',
      value: '#247',
      change: '↑23',
      icon: Trophy,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Performance Metrics</h2>
        <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="30d">30 Days</option>
          <option value="90d">90 Days</option>
          <option value="1y">1 Year</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-lg ${metric.bgColor} border border-white/10 hover:bg-opacity-30 transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-5 w-5 ${metric.color}`} />
                <span className={`text-xs ${metric.color} bg-white/10 px-2 py-1 rounded`}>
                  {metric.change}
                </span>
              </div>
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-300">
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">vs S&P 500</span>
          <span className="text-sm font-medium text-green-400">+18.2% outperformance</span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '74%' }}></div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Your Performance: 24.8%</span>
          <span>S&P 500: 6.6%</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Best Performing Copy</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-white">Elon Musk TSLA</span>
            <span className="text-sm text-green-400">+45.6%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;