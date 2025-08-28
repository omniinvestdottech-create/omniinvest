import React from 'react';
import { Star, TrendingUp, Users, Award, Eye, Brain } from 'lucide-react';

const SocialProof: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '47,892',
      label: 'Active Investors',
      color: 'text-blue-400'
    },
    {
      icon: Eye,
      value: '2,847',
      label: 'Elite Insiders Tracked',
      color: 'text-green-400'
    },
    {
      icon: Brain,
      value: '94.7%',
      label: 'AI Prediction Accuracy',
      color: 'text-purple-400'
    },
    {
      icon: TrendingUp,
      value: '+127%',
      label: 'Average User Gains',
      color: 'text-yellow-400'
    }
  ];

  const mediaLogos = [
    'TechCrunch',
    'VentureBeat', 
    'Yahoo Finance',
    'MarketWatch',
    'Benzinga',
    'The Motley Fool'
  ];

  const userAvatars = [
    'JD', 'SM', 'KL', 'RT', 'MN', 'AB', 'CD', 'EF', 'GH', 'IJ'
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-slate-900/50 to-blue-900/50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 border border-white/20`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2 font-orbitron`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* User Avatars */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex -space-x-2">
              {userAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white flex items-center justify-center"
                >
                  <span className="text-sm font-bold text-white">{avatar}</span>
                </div>
              ))}
            </div>
            <div className="ml-4 text-left">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-white font-semibold ml-2">4.9/5</span>
              </div>
              <div className="text-sm text-gray-400">From 12,847+ verified users</div>
            </div>
          </div>
          <p className="text-gray-300">
            Join thousands of investors who are already making smarter decisions with OmniInvest
          </p>
        </div>

        {/* Media Mentions */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-400 mb-6">As Featured In:</h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {mediaLogos.map((logo, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-white/10 rounded-lg border border-white/20 text-gray-300 font-semibold"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/10 rounded-xl border border-green-400/30">
            <Award className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Bank-Level Security</h4>
            <p className="text-gray-300 text-sm">256-bit encryption and zero-knowledge architecture</p>
          </div>
          
          <div className="text-center p-6 bg-white/10 rounded-xl border border-blue-400/30">
            <Star className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">30-Day Guarantee</h4>
            <p className="text-gray-300 text-sm">Full refund if you're not completely satisfied</p>
          </div>
          
          <div className="text-center p-6 bg-white/10 rounded-xl border border-purple-400/30">
            <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">24/7 Support</h4>
            <p className="text-gray-300 text-sm">Expert help whenever you need it</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;