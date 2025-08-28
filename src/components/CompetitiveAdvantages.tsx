import React from 'react';
import { 
  Zap, 
  Shield, 
  Brain, 
  Users, 
  TrendingUp, 
  Eye, 
  Target, 
  Award,
  Lightbulb,
  Globe,
  Lock,
  Star,
  Gem
} from 'lucide-react';

interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'unique' | 'superior' | 'exclusive';
  competitors: string[];
}

const competitiveAdvantages: Advantage[] = [
  {
    id: '1',
    title: 'Real-Time Insider Trading Heatmap',
    description: 'Live visualization of celebrity, politician, and billionaire trades with AI confidence scoring - no other platform offers this level of real-time insider intelligence.',
    icon: Eye,
    category: 'unique',
    competitors: ['Robinhood', 'E*TRADE', 'TD Ameritrade', 'Fidelity']
  },
  {
    id: '2',
    title: 'AI-Powered "What If I Followed?" Simulator',
    description: 'Backtest portfolio performance by following specific investors with historical accuracy - exclusive technology not available anywhere else.',
    icon: Brain,
    category: 'unique',
    competitors: ['Personal Capital', 'Mint', 'YNAB', 'Quicken']
  },
  {
    id: '3',
    title: 'Multi-Source Sentiment Analysis',
    description: 'Combines news, social media, SEC filings, and insider moves for comprehensive market sentiment - far more advanced than basic news feeds.',
    icon: TrendingUp,
    category: 'superior',
    competitors: ['Bloomberg Terminal', 'Yahoo Finance', 'MarketWatch']
  },
  {
    id: '4',
    title: 'Custom Smart Feeds & Event Triggers',
    description: 'Create complex, multi-factor alerts that trigger on specific combinations of events - no competitor offers this level of customization.',
    icon: Zap,
    category: 'unique',
    competitors: ['Seeking Alpha', 'Benzinga', 'The Motley Fool']
  },
  {
    id: '5',
    title: 'Detailed Influencer Scorecards',
    description: 'Deep-dive performance analytics for every tracked investor with risk profiles and success rates - unmatched depth of analysis.',
    icon: Award,
    category: 'exclusive',
    competitors: ['Morningstar', 'Zacks', 'S&P Capital IQ']
  },
  {
    id: '6',
    title: 'Political & Regulatory Risk Radar',
    description: 'AI-driven early warning system for regulatory changes and political risks - exclusive intelligence not found in traditional platforms.',
    icon: Shield,
    category: 'unique',
    competitors: ['Thomson Reuters', 'FactSet', 'Refinitiv']
  },
  {
    id: '7',
    title: 'Crowd Wisdom Investment Portfolios',
    description: 'Community-driven strategies with voting mechanisms and collective intelligence - revolutionary approach to social investing.',
    icon: Users,
    category: 'unique',
    competitors: ['eToro', 'Public', 'Stocktwits']
  },
  {
    id: '8',
    title: 'Alternative Asset Tracking',
    description: 'Track real estate, art, collectibles, and crypto alongside traditional securities - holistic wealth management beyond stocks.',
    icon: Gem,
    category: 'superior',
    competitors: ['Mint', 'Personal Capital', 'Tiller']
  },
  {
    id: '9',
    title: 'Transparent AI Decision Journal',
    description: 'Plain-language explanations for every AI recommendation with confidence levels and reasoning - unprecedented AI transparency.',
    icon: Lightbulb,
    category: 'unique',
    competitors: ['Wealthfront', 'Betterment', 'Acorns']
  },
  {
    id: '10',
    title: 'Cross-Platform Excellence',
    description: 'Seamless experience across Mac, Windows, iOS, Android, and all browsers with platform-specific optimizations.',
    icon: Globe,
    category: 'superior',
    competitors: ['Most financial apps', 'Trading platforms']
  },
  {
    id: '11',
    title: 'Bank-Level Security',
    description: 'End-to-end encryption, multi-factor authentication, and zero-trust architecture - security that exceeds banking standards.',
    icon: Lock,
    category: 'superior',
    competitors: ['All financial platforms']
  },
  {
    id: '12',
    title: 'Educational Excellence',
    description: 'Comprehensive learning hub with courses from former SEC analysts and Wall Street professionals - unmatched educational value.',
    icon: Star,
    category: 'exclusive',
    competitors: ['Khan Academy', 'Coursera', 'Udemy']
  }
];

const CompetitiveAdvantages: React.FC = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'unique': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'superior': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'exclusive': return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'unique': return 'UNIQUE TO OMNIINVEST';
      case 'superior': return 'SUPERIOR TO COMPETITORS';
      case 'exclusive': return 'EXCLUSIVE TECHNOLOGY';
      default: return 'COMPETITIVE ADVANTAGE';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Why OmniInvest Leads the Market</h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          OmniInvest offers features and capabilities that no other financial platform can match. 
          We don't just compete - we revolutionize the entire industry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {competitiveAdvantages.map((advantage) => {
          const Icon = advantage.icon;
          return (
            <div
              key={advantage.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 card-hover"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${getCategoryColor(advantage.category)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{advantage.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(advantage.category)}`}>
                      {getCategoryLabel(advantage.category)}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {advantage.description}
                  </p>
                  
                  <div>
                    <span className="text-xs font-medium text-gray-400 block mb-2">
                      Competitors lacking this feature:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {advantage.competitors.map((competitor, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-400/30"
                        >
                          {competitor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-xl p-8 text-center">
        <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-4">The Clear Market Leader</h3>
        <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
          While competitors offer basic portfolio tracking, OmniInvest delivers a complete financial intelligence ecosystem 
          with features that don't exist anywhere else in the market.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">12+</div>
            <div className="text-sm text-gray-300">Unique Features</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
            <div className="text-sm text-gray-300">Competitors Surpassed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-sm text-gray-300">Market Innovation</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveAdvantages;