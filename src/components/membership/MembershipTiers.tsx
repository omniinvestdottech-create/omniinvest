import React, { useState } from 'react';
import { 
  Shield, 
  Star, 
  Crown, 
  Zap, 
  Check, 
  X, 
  CreditCard,
  Users,
  Brain,
  Eye,
  TrendingUp,
  Award,
  Gem,
  Rocket
} from 'lucide-react';

interface TierFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  price: number;
  billingPeriod: 'month' | 'year';
  icon: React.ComponentType<any>;
  color: string;
  popular?: boolean;
  features: TierFeature[];
  forumAccess: string[];
  limits: {
    trackedInsiders: number;
    portfolioSimulations: number;
    aiInsights: number;
    smartFeeds: number;
    historicalData: string;
  };
}

const membershipTiers: MembershipTier[] = [
  {
    id: 'insider-glimpse',
    name: 'Insider Glimpse',
    tagline: 'Get a taste of elite intelligence',
    price: 0,
    billingPeriod: 'month',
    icon: Eye,
    color: 'from-gray-500 to-gray-600',
    features: [
      { name: 'Basic Insider Tracking', included: true, description: '10 most recent trades' },
      { name: 'Limited Market Overview', included: true, description: 'Top 5 stocks only' },
      { name: 'Basic Educational Content', included: true, description: '3 free courses' },
      { name: 'Community Forum Access', included: true, description: 'Read-only access' },
      { name: 'AI Insights', included: false },
      { name: 'Portfolio Simulator', included: false },
      { name: 'Smart Feeds', included: false },
      { name: 'Advanced Analytics', included: false },
      { name: 'Real-time Alerts', included: false },
      { name: 'Historical Data', included: false }
    ],
    forumAccess: ['General Discussion (Read-only)', 'Beginner Questions (Read-only)'],
    limits: {
      trackedInsiders: 10,
      portfolioSimulations: 0,
      aiInsights: 3,
      smartFeeds: 0,
      historicalData: '7 days'
    }
  },
  {
    id: 'market-navigator',
    name: 'Market Navigator',
    tagline: 'Navigate markets like a pro',
    price: 29,
    billingPeriod: 'month',
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600',
    popular: true,
    features: [
      { name: 'Full Insider Tracking', included: true, description: 'Track 100+ elite investors' },
      { name: 'Complete Market Overview', included: true, description: 'All major markets' },
      { name: 'Portfolio Simulator', included: true, description: '5 simulations per month' },
      { name: 'AI Market Insights', included: true, description: '20 insights per month' },
      { name: 'Basic Smart Feeds', included: true, description: '3 custom feeds' },
      { name: 'Educational Hub Access', included: true, description: 'All courses included' },
      { name: 'Community Forum', included: true, description: 'Full participation' },
      { name: 'Email Alerts', included: true, description: 'Daily market summaries' },
      { name: 'Advanced Analytics', included: false },
      { name: 'Priority Support', included: false }
    ],
    forumAccess: [
      'General Discussion', 
      'Market Analysis', 
      'Strategy Sharing', 
      'Educational Q&A',
      'Beginner to Intermediate'
    ],
    limits: {
      trackedInsiders: 100,
      portfolioSimulations: 5,
      aiInsights: 20,
      smartFeeds: 3,
      historicalData: '90 days'
    }
  },
  {
    id: 'wealth-architect',
    name: 'Wealth Architect',
    tagline: 'Build wealth with insider intelligence',
    price: 99,
    billingPeriod: 'month',
    icon: Crown,
    color: 'from-purple-500 to-purple-600',
    features: [
      { name: 'Elite Insider Network', included: true, description: '500+ tracked investors' },
      { name: 'Advanced Portfolio Simulator', included: true, description: 'Unlimited simulations' },
      { name: 'AI-Powered Analytics', included: true, description: 'Unlimited insights' },
      { name: 'Advanced Smart Feeds', included: true, description: '15 custom feeds' },
      { name: 'Risk Radar System', included: true, description: 'Political & regulatory alerts' },
      { name: 'Alternative Assets Tracking', included: true, description: 'Real estate, art, crypto' },
      { name: 'Influencer Scorecards', included: true, description: 'Detailed performance analysis' },
      { name: 'Real-time Push Notifications', included: true },
      { name: 'Priority Customer Support', included: true },
      { name: 'Exclusive Webinars', included: true, description: 'Monthly expert sessions' }
    ],
    forumAccess: [
      'All Navigator Forums',
      'Advanced Strategies',
      'Professional Networks',
      'Alternative Investments',
      'Risk Management',
      'Exclusive Member Events'
    ],
    limits: {
      trackedInsiders: 500,
      portfolioSimulations: -1, // Unlimited
      aiInsights: -1, // Unlimited
      smartFeeds: 15,
      historicalData: '2 years'
    }
  },
  {
    id: 'omniscient-elite',
    name: 'Omniscient Elite',
    tagline: 'Transcend markets with omniscient power',
    price: 299,
    billingPeriod: 'month',
    icon: Rocket,
    color: 'from-yellow-400 to-orange-500',
    features: [
      { name: 'Omniscient Insider Universe', included: true, description: '2000+ global elite tracked' },
      { name: 'Quantum Portfolio Simulator', included: true, description: 'AI-enhanced backtesting' },
      { name: 'Omniscient AI Oracle', included: true, description: 'Predictive market intelligence' },
      { name: 'Unlimited Smart Feeds', included: true, description: 'Custom AI-generated feeds' },
      { name: 'Crowd Wisdom Portfolios', included: true, description: 'Community investment strategies' },
      { name: 'AI Decision Journal', included: true, description: 'Transparent AI reasoning' },
      { name: 'White-Glove Concierge', included: true, description: 'Personal investment advisor' },
      { name: 'Exclusive Alpha Insights', included: true, description: 'Pre-market intelligence' },
      { name: 'Direct Expert Access', included: true, description: '1-on-1 consultations' },
      { name: 'Custom API Access', included: true, description: 'Build your own tools' }
    ],
    forumAccess: [
      'All Previous Forums',
      'Elite Inner Circle',
      'Institutional Strategies',
      'Global Market Intelligence',
      'Exclusive Alpha Opportunities',
      'Private Mastermind Groups',
      'Direct Expert Access'
    ],
    limits: {
      trackedInsiders: -1, // Unlimited
      portfolioSimulations: -1, // Unlimited
      aiInsights: -1, // Unlimited
      smartFeeds: -1, // Unlimited
      historicalData: 'Complete historical data'
    }
  }
];

const MembershipTiers: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('market-navigator');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const getDiscountedPrice = (price: number) => {
    return billingCycle === 'yearly' ? Math.round(price * 0.75) : price;
  };

  const getYearlySavings = (price: number) => {
    const monthlyTotal = price * 12;
    const yearlyTotal = getDiscountedPrice(price) * 12;
    return monthlyTotal - yearlyTotal;
  };

  const handleUpgrade = (tierId: string) => {
    // Integration with payment gateway would go here
    console.log(`Upgrading to ${tierId}`);
    // Redirect to payment processor (Stripe, PayPal, etc.)
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-cyan-400 font-orbitron mb-4">
          Choose Your Intelligence Level
        </h1>
        <p className="text-xl text-cyan-300/80 mb-8">
          Unlock the power of elite investment intelligence with our tiered membership system
        </p>
        
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-cyan-400' : 'text-cyan-400/60'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative w-16 h-8 rounded-full transition-colors ${
              billingCycle === 'yearly' ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
              billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
            }`} />
          </button>
          <span className={`text-sm ${billingCycle === 'yearly' ? 'text-cyan-400' : 'text-cyan-400/60'}`}>
            Yearly
          </span>
          {billingCycle === 'yearly' && (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs border border-green-400/30">
              Save 25%
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {membershipTiers.map((tier) => {
          const Icon = tier.icon;
          const isSelected = selectedTier === tier.id;
          const discountedPrice = getDiscountedPrice(tier.price);
          
          return (
            <div
              key={tier.id}
              className={`relative glass-effect rounded-xl border p-6 transition-all duration-300 cursor-pointer ${
                tier.popular 
                  ? 'border-cyan-400/50 ring-2 ring-cyan-400/30' 
                  : 'border-cyan-500/30 hover:border-cyan-400/50'
              } ${isSelected ? 'scale-105 shadow-2xl' : 'hover:scale-102'}`}
              onClick={() => setSelectedTier(tier.id)}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-cyan-400 font-orbitron mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-cyan-300/80 mb-4">
                  {tier.tagline}
                </p>
                
                <div className="mb-4">
                  {tier.price === 0 ? (
                    <span className="text-3xl font-bold text-green-400 font-orbitron">FREE</span>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold text-cyan-400 font-orbitron">
                        ${billingCycle === 'yearly' ? discountedPrice : tier.price}
                      </span>
                      <span className="text-cyan-400/60 text-sm">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                      {billingCycle === 'yearly' && tier.price > 0 && (
                        <div className="space-y-1 mt-2">
                          <div className="text-xs text-gray-400 line-through">
                            Was ${tier.price * 12}/year
                          </div>
                          <div className="text-sm text-green-400 font-medium">
                            Save ${getYearlySavings(tier.price)} annually!
                          </div>
                        </div>
                      )}
                      {billingCycle === 'monthly' && tier.price > 0 && (
                        <div className="text-xs text-cyan-400/60 mt-1">
                          Or ${getDiscountedPrice(tier.price)}/year (save 25%)
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <span className={`text-sm ${feature.included ? 'text-cyan-100' : 'text-cyan-400/40'}`}>
                        {feature.name}
                      </span>
                      {feature.description && (
                        <div className="text-xs text-cyan-400/60 mt-1">
                          {feature.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleUpgrade(tier.id)}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                  tier.price === 0
                    ? 'bg-green-500/20 text-green-400 border border-green-400/30 hover:bg-green-500/30'
                    : `bg-gradient-to-r ${tier.color} text-white hover:shadow-lg hover:scale-105`
                }`}
              >
                {tier.price === 0 
                  ? 'Start Free' 
                  : billingCycle === 'yearly' 
                    ? `Get ${tier.name} - Save 25%`
                    : 'Upgrade Now'
                }
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-xl p-8">
        <div className="text-center mb-6">
          <Shield className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-cyan-400 font-orbitron mb-2">
            30-Day Money-Back Guarantee
          </h3>
          <p className="text-cyan-300/80">
            Try any paid tier risk-free. If you're not completely satisfied, get a full refund within 30 days.
          </p>
          
          {billingCycle === 'yearly' && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
              <h4 className="text-lg font-semibold text-green-400 mb-2">🎉 Annual Billing Benefits</h4>
              <ul className="text-sm text-green-300/80 space-y-1">
                <li>• Save 25% compared to monthly billing</li>
                <li>• Lock in current pricing for a full year</li>
                <li>• Priority customer support</li>
                <li>• Early access to new features</li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <CreditCard className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h4 className="font-semibold text-cyan-400 mb-1">Secure Payments</h4>
            <p className="text-sm text-cyan-300/80">256-bit SSL encryption</p>
          </div>
          <div>
            <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h4 className="font-semibold text-cyan-400 mb-1">24/7 Support</h4>
            <p className="text-sm text-cyan-300/80">Expert help when you need it</p>
          </div>
          <div>
            <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <h4 className="font-semibold text-cyan-400 mb-1">Instant Access</h4>
            <p className="text-sm text-cyan-300/80">Upgrade takes effect immediately</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipTiers;