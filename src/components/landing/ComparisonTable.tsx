import React from 'react';
import { CheckCircle, X, Crown, Star } from 'lucide-react';

interface ComparisonItem {
  feature: string;
  omniinvest: boolean | string;
  bloomberg: boolean | string;
  seekingalpha: boolean | string;
  robinhood: boolean | string;
}

const comparisonData: ComparisonItem[] = [
  {
    feature: 'Real-time insider tracking',
    omniinvest: true,
    bloomberg: false,
    seekingalpha: false,
    robinhood: false
  },
  {
    feature: 'AI-powered predictions',
    omniinvest: '94.7% accuracy',
    bloomberg: false,
    seekingalpha: 'Basic',
    robinhood: false
  },
  {
    feature: 'Mobile-first design',
    omniinvest: true,
    bloomberg: false,
    seekingalpha: 'Basic',
    robinhood: true
  },
  {
    feature: 'Portfolio simulator',
    omniinvest: 'Advanced',
    bloomberg: 'Basic',
    seekingalpha: false,
    robinhood: false
  },
  {
    feature: 'Social trading features',
    omniinvest: true,
    bloomberg: false,
    seekingalpha: false,
    robinhood: 'Basic'
  },
  {
    feature: 'Alternative asset tracking',
    omniinvest: true,
    bloomberg: 'Limited',
    seekingalpha: false,
    robinhood: false
  },
  {
    feature: 'Educational content',
    omniinvest: 'Expert-led',
    bloomberg: 'Limited',
    seekingalpha: 'Basic',
    robinhood: 'Minimal'
  },
  {
    feature: 'Annual cost',
    omniinvest: '$299 (Lifetime)',
    bloomberg: '$24,000',
    seekingalpha: '$239',
    robinhood: 'Free (Limited)'
  }
];

const ComparisonTable: React.FC = () => {
  const renderCell = (value: boolean | string, isOmniInvest: boolean = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className={`h-5 w-5 mx-auto ${isOmniInvest ? 'text-green-400' : 'text-gray-400'}`} />
      ) : (
        <X className="h-5 w-5 text-red-400 mx-auto" />
      );
    }
    
    return (
      <span className={`text-sm font-medium ${
        isOmniInvest ? 'text-cyan-400' : 
        value.includes('$') ? 'text-red-400' : 'text-gray-300'
      }`}>
        {value}
      </span>
    );
  };

  return (
    <div className="py-20 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Why OmniInvest <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Dominates</span> the Competition
          </h2>
          <p className="text-xl text-gray-300">
            See how we stack up against the industry leaders
          </p>
        </div>

        <div className="bg-white/10 rounded-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-6 text-gray-300 font-semibold">Features</th>
                  <th className="text-center p-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                    <div className="flex items-center justify-center space-x-2">
                      <Crown className="h-5 w-5 text-cyan-400" />
                      <span className="text-cyan-400 font-bold">OmniInvest</span>
                    </div>
                  </th>
                  <th className="text-center p-6 text-gray-300 font-semibold">Bloomberg Terminal</th>
                  <th className="text-center p-6 text-gray-300 font-semibold">Seeking Alpha</th>
                  <th className="text-center p-6 text-gray-300 font-semibold">Robinhood</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-6 text-white font-medium">{item.feature}</td>
                    <td className="p-6 text-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                      {renderCell(item.omniinvest, true)}
                    </td>
                    <td className="p-6 text-center">{renderCell(item.bloomberg)}</td>
                    <td className="p-6 text-center">{renderCell(item.seekingalpha)}</td>
                    <td className="p-6 text-center">{renderCell(item.robinhood)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-500/20 border border-green-400/30 rounded-full mb-6">
            <Star className="h-5 w-5 text-green-400" />
            <span className="text-green-400 font-medium">OmniInvest wins in 8 out of 8 categories</span>
          </div>
          
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Get the Superior Platform Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;