import React, { useState } from 'react';
import { Eye, Brain, TrendingUp, Shield, Users, Zap, Target, Crown, Star, Play } from 'lucide-react';

interface Feature {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  benefits: string[];
  demoImage: string;
  color: string;
}

const features: Feature[] = [
  {
    id: 'insider-tracking',
    icon: Eye,
    title: 'Real-Time Insider Tracking',
    description: 'Track trades from 2,000+ politicians, celebrities, and billionaires the moment they\'re disclosed.',
    benefits: [
      'Live heatmap of insider activity',
      'AI confidence scoring for each trade',
      'Historical performance tracking',
      'Custom alerts for your watchlist'
    ],
    demoImage: 'Insider Heatmap Demo',
    color: 'from-green-500 to-blue-500'
  },
  {
    id: 'ai-predictions',
    icon: Brain,
    title: 'AI-Powered Market Predictions',
    description: 'Advanced machine learning models analyze 127 data sources to predict market movements with 94.7% accuracy.',
    benefits: [
      'Price targets with confidence levels',
      'Market crash early warnings',
      'Sector rotation predictions',
      'Earnings surprise forecasts'
    ],
    demoImage: 'AI Predictions Dashboard',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'portfolio-simulator',
    icon: TrendingUp,
    title: 'Portfolio Simulator',
    description: 'Backtest strategies by following specific investors and see how you would have performed.',
    benefits: [
      'Historical performance analysis',
      'Risk-adjusted returns calculation',
      'Multiple strategy comparison',
      'What-if scenario modeling'
    ],
    demoImage: 'Portfolio Simulator',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'smart-feeds',
    icon: Zap,
    title: 'Smart Feeds & Alerts',
    description: 'Custom event-driven alerts that trigger on complex combinations of market events.',
    benefits: [
      'Multi-factor event triggers',
      'Personalized alert criteria',
      'Real-time notifications',
      'Historical pattern matching'
    ],
    demoImage: 'Smart Feeds Interface',
    color: 'from-cyan-500 to-blue-500'
  }
];

const FeatureShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Features That Give You an <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Unfair Advantage</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access the same intelligence tools used by Wall Street professionals, but designed for modern investors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature Navigation */}
          <div className="space-y-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeFeature.id === feature.id;
              
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature)}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 scale-105'
                      : 'bg-white/10 border-white/20 hover:border-cyan-400/30 hover:bg-white/15'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300 mb-4">{feature.description}</p>
                      
                      {isActive && (
                        <div className="space-y-2">
                          {feature.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Star className="h-4 w-4 text-cyan-400" />
                              <span className="text-cyan-300 text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feature Demo */}
          <div className="relative">
            <div className="glass-effect rounded-xl border border-cyan-500/30 p-8 transform hover:scale-105 transition-transform duration-500">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">{activeFeature.title}</h3>
                <p className="text-gray-300">{activeFeature.description}</p>
              </div>
              
              {/* Demo Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-black/50 to-cyan-900/20 rounded-lg border border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <Play className="h-16 w-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
                  <h4 className="text-xl font-bold text-white mb-2">{activeFeature.demoImage}</h4>
                  <p className="text-gray-400">Interactive demo of {activeFeature.title.toLowerCase()}</p>
                </div>
                
                {/* Animated elements */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-green-400 font-orbitron">LIVE DATA</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                  Try This Feature
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;