import React from 'react';
import InsiderHeatmap from './dashboard/InsiderHeatmap';
import MarketOverview from './dashboard/MarketOverview';
import RecentAlerts from './dashboard/RecentAlerts';
import PerformanceMetrics from './dashboard/PerformanceMetrics';
import TrendingInsiders from './dashboard/TrendingInsiders';
import AIInsights from './dashboard/AIInsights';
import CrossPlatformOptimization from './CrossPlatformOptimization';
import CompetitiveAdvantages from './CompetitiveAdvantages';
import InteractiveInvestmentChart from './InteractiveInvestmentChart';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <InteractiveInvestmentChart />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400 font-orbitron">Investment Dashboard</h1>
          <p className="text-cyan-300/80 mt-1">Real-time insights from elite investors and market movements</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="text-sm text-green-400 font-orbitron">Live Data Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <InsiderHeatmap />
          <MarketOverview />
        </div>
        
        <div className="space-y-6">
          <RecentAlerts />
          <TrendingInsiders />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceMetrics />
        <AIInsights />
      </div>

      <CrossPlatformOptimization />
      
      <div className="mt-8">
        <CompetitiveAdvantages />
      </div>
    </div>
  );
};

export default Dashboard;