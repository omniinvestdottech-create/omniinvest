import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  TrendingUp, 
  Brain, 
  Eye, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Play,
  Users,
  Zap,
  Crown,
  Lock,
  Globe,
  Award,
  Target,
  Rocket,
  DollarSign,
  Clock,
  AlertTriangle
} from 'lucide-react';
import SecurityBadges from './SecurityBadges';
import SocialProof from './SocialProof';
import FeatureShowcase from './FeatureShowcase';
import ComparisonTable from './ComparisonTable';
import CountdownTimer from './CountdownTimer';
import EmailCapture from './EmailCapture';

interface PricingTier {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  savings: number;
  features: string[];
  popular?: boolean;
  cta: string;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'lifetime-basic',
    name: 'Lifetime Market Navigator',
    originalPrice: 348,
    salePrice: 99,
    savings: 249,
    features: [
      'Track 100+ elite investors',
      'AI market insights',
      'Portfolio simulator',
      'Educational hub access',
      'Community forum access',
      'Email alerts',
      'Mobile app access',
      'Lifetime updates'
    ],
    cta: 'Get Lifetime Access',
    badge: 'BEST VALUE'
  },
  {
    id: 'lifetime-pro',
    name: 'Lifetime Wealth Architect',
    originalPrice: 1188,
    salePrice: 299,
    savings: 889,
    features: [
      'Everything in Market Navigator',
      'Track 500+ elite investors',
      'Advanced AI analytics',
      'Risk radar system',
      'Alternative assets tracking',
      'Influencer scorecards',
      'Real-time notifications',
      'Priority support',
      'Exclusive webinars',
      'API access'
    ],
    popular: true,
    cta: 'Get Pro Lifetime',
    badge: 'MOST POPULAR'
  },
  {
    id: 'lifetime-elite',
    name: 'Lifetime Omniscient Elite',
    originalPrice: 3588,
    salePrice: 999,
    savings: 2589,
    features: [
      'Everything in Wealth Architect',
      'Unlimited insider tracking',
      'Quantum AI analysis',
      'Crowd wisdom portfolios',
      'AI decision journal',
      'White-glove concierge',
      'Exclusive alpha insights',
      'Direct expert access',
      'Custom API access',
      'Revenue sharing opportunities'
    ],
    cta: 'Get Elite Access',
    badge: 'ULTIMATE'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    title: 'Portfolio Manager',
    avatar: 'SC',
    quote: 'OmniInvest helped me identify insider patterns that led to a 34% portfolio gain in just 3 months.',
    rating: 5
  },
  {
    name: 'Michael Rodriguez',
    title: 'Day Trader',
    avatar: 'MR',
    quote: 'The AI predictions are incredibly accurate. I\'ve never had access to this level of market intelligence.',
    rating: 5
  },
  {
    name: 'Jennifer Walsh',
    title: 'Financial Advisor',
    avatar: 'JW',
    quote: 'My clients love the transparency. We can finally see what the elite investors are really doing.',
    rating: 5
  }
];

const LandingPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  const [selectedTier, setSelectedTier] = useState<string>('lifetime-pro');
  const [email, setEmail] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real implementation, this would integrate with ConvertKit/Mailchimp
    alert(`Thank you! We'll notify ${email} when OmniInvest launches.`);
    setEmail('');
  };

  const handlePurchase = (tierId: string) => {
    // In real implementation, this would integrate with Stripe
    alert(`Redirecting to secure checkout for ${tierId}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"></div>
        <div className="absolute inset-0 data-grid opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            {/* Urgency Banner */}
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-red-500/20 border border-red-400/30 rounded-full mb-8 animate-pulse">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="text-red-400 font-medium">LIMITED TIME: Founder's Pricing Ends Soon!</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-orbitron">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Bloomberg Terminal</span> Killer
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Track insider trades from <span className="text-cyan-400 font-semibold">politicians, celebrities, and billionaires</span> in real-time. 
              Make investment decisions like the elite with AI-powered insights that were previously exclusive to Wall Street.
            </p>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">2,847</div>
                <div className="text-sm text-gray-400">Elite Investors Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">94.7%</div>
                <div className="text-sm text-gray-400">AI Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">$24,000</div>
                <div className="text-sm text-gray-400">Bloomberg Terminal Cost</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-6">
              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Play className="h-6 w-6" />
                <span>Watch 3-Minute Demo</span>
              </button>
              
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Rocket className="h-6 w-6" />
                <span>Get Lifetime Access</span>
              </button>
            </div>

            {/* Countdown Timer */}
            <CountdownTimer 
              endDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)} 
              className="mt-12 max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">The Problem: Financial Intelligence is Only for the Elite</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              While billionaires and politicians make millions from insider information, retail investors are left in the dark with outdated tools and delayed data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/10 rounded-xl border border-red-400/30">
              <DollarSign className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Bloomberg Terminal: $24,000/year</h3>
              <p className="text-gray-300">Only Wall Street elites can afford professional-grade financial intelligence tools.</p>
            </div>
            
            <div className="text-center p-8 bg-white/10 rounded-xl border border-red-400/30">
              <Clock className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Delayed Information</h3>
              <p className="text-gray-300">By the time retail investors get information, the smart money has already moved.</p>
            </div>
            
            <div className="text-center p-8 bg-white/10 rounded-xl border border-red-400/30">
              <Target className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Information Asymmetry</h3>
              <p className="text-gray-300">Insiders know what's coming while retail investors are left guessing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">The Solution: Elite Intelligence for Everyone</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              OmniInvest democratizes financial intelligence by tracking insider trades, analyzing market sentiment, and providing AI-powered insights at a fraction of the cost.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Real-Time Insider Tracking</h3>
                  <p className="text-gray-300">Track trades from 2,000+ politicians, celebrities, and billionaires the moment they're disclosed.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">AI-Powered Predictions</h3>
                  <p className="text-gray-300">Advanced AI analyzes patterns and predicts market movements with 94.7% accuracy.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">"What If I Followed?" Simulator</h3>
                  <p className="text-gray-300">Backtest strategies by following specific investors with historical accuracy.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Bank-Level Security</h3>
                  <p className="text-gray-300">Military-grade encryption and zero-knowledge architecture protect your data.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-effect rounded-xl border border-cyan-500/30 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-br from-black/50 to-cyan-900/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-cyan-400">Live Insider Activity</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-xs text-green-400">LIVE</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">EM</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Elon Musk</div>
                          <div className="text-xs text-gray-400">TSLA • 2 hours ago</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">BUY</div>
                        <div className="text-xs text-gray-400">$2.5M</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">NP</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Nancy Pelosi</div>
                          <div className="text-xs text-gray-400">NVDA • 4 hours ago</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">BUY</div>
                        <div className="text-xs text-gray-400">$1.8M</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Features No Other Platform Has</h2>
            <p className="text-xl text-gray-300">12+ revolutionary features that give you the same intelligence as Wall Street professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: 'Real-Time Insider Heatmap',
                description: 'Live visualization of elite investor activities with AI confidence scoring',
                color: 'from-green-500 to-blue-500'
              },
              {
                icon: Brain,
                title: 'AI-Powered Predictions',
                description: 'Advanced machine learning models predict market movements with 94.7% accuracy',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Users,
                title: 'Elite Insider Database',
                description: 'Track 2,000+ politicians, celebrities, billionaires, and hedge fund managers',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Zap,
                title: 'Smart Feeds & Alerts',
                description: 'Custom event-driven alerts that trigger on complex multi-factor events',
                color: 'from-cyan-500 to-blue-500'
              },
              {
                icon: Target,
                title: 'Portfolio Simulator',
                description: 'Backtest strategies by following specific investors with historical accuracy',
                color: 'from-red-500 to-pink-500'
              },
              {
                icon: Shield,
                title: 'Risk Radar System',
                description: 'AI-powered regulatory and political risk monitoring with early warnings',
                color: 'from-blue-500 to-purple-500'
              }
            ].map((feature, index) => (
              <div key={index} className="group p-6 bg-white/10 rounded-xl border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:animate-pulse`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <SocialProof />

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Security Badges */}
      <SecurityBadges />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Founder's Lifetime Pricing</h2>
            <p className="text-xl text-gray-300 mb-8">Get lifetime access at a fraction of the regular price. Limited time offer!</p>
            
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-500/20 border border-green-400/30 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-medium">30-Day Money-Back Guarantee</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative p-8 rounded-xl border transition-all duration-300 cursor-pointer ${
                  tier.popular
                    ? 'border-cyan-400/50 bg-gradient-to-b from-cyan-500/20 to-blue-500/20 scale-105 shadow-2xl'
                    : 'border-white/20 bg-white/10 hover:border-cyan-400/30 hover:scale-102'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold rounded-full">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{tier.name}</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-4xl font-bold text-cyan-400">${tier.salePrice}</span>
                      <span className="text-lg text-gray-400 line-through">${tier.originalPrice}</span>
                    </div>
                    <div className="text-green-400 font-semibold">Save ${tier.savings} (Lifetime Deal)</div>
                    <div className="text-sm text-gray-400">One-time payment • No monthly fees ever</div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handlePurchase(tier.id)}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-2xl transform hover:scale-105'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl'
                  }`}
                >
                  {tier.cta}
                </button>

                <div className="text-center mt-4">
                  <span className="text-xs text-gray-400">Secure payment via Stripe • Instant access</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-4">🔒 Secure payment processing • 💳 All major cards accepted • 🌍 Available worldwide</p>
            <p className="text-sm text-gray-400">Questions? Email us at hello@omniinvest.com</p>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 bg-gradient-to-r from-red-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Don't Miss Out on the Financial Revolution</h2>
          <p className="text-xl text-gray-300 mb-8">
            While you're reading this, elite investors are making moves that will shape tomorrow's markets. 
            Join the revolution and level the playing field.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">⏰</div>
              <h3 className="text-lg font-bold text-white mb-2">Limited Time</h3>
              <p className="text-gray-300">Founder's pricing ends in 3 days</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">First 1,000 Only</h3>
              <p className="text-gray-300">Exclusive lifetime pricing for early adopters</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">💰</div>
              <h3 className="text-lg font-bold text-white mb-2">Never Pay Again</h3>
              <p className="text-gray-300">One payment, lifetime access to all features</p>
            </div>
          </div>

          <EmailCapture 
            onSubmit={(email) => console.log('Email captured:', email)}
            className="max-w-md mx-auto mb-8"
          />

          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            Secure Your Lifetime Access Now
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Is this legal?",
                answer: "Absolutely! We only track publicly disclosed information that's required by law. All insider trading data comes from official SEC filings and government disclosures."
              },
              {
                question: "How accurate are the AI predictions?",
                answer: "Our AI models achieve 94.7% accuracy in market predictions by analyzing patterns from 127 different data sources including insider activity, news sentiment, and technical indicators."
              },
              {
                question: "What makes this better than Bloomberg Terminal?",
                answer: "We're 100x cheaper ($99 vs $24,000), mobile-first, AI-powered, and focus specifically on insider intelligence that Bloomberg doesn't provide."
              },
              {
                question: "Do you provide financial advice?",
                answer: "No, OmniInvest is for educational and informational purposes only. We provide data and insights, but all investment decisions are your responsibility."
              },
              {
                question: "What's included in lifetime access?",
                answer: "Lifetime access includes all current features plus all future updates, new features, mobile apps, and platform improvements at no additional cost."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white/10 rounded-xl border border-white/20">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Invest Like the Elite?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of investors who are already using OmniInvest to make smarter investment decisions.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-6 mb-8">
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
            >
              Get Lifetime Access Now
            </button>
            
            <div className="text-center">
              <div className="text-sm text-gray-400">Or join our waitlist:</div>
              <form onSubmit={handleEmailSubmit} className="flex space-x-3 mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-400/30 hover:bg-cyan-500/30 transition-colors"
                >
                  Join Waitlist
                </button>
              </form>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Worldwide Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl border border-white/20 p-6 max-w-4xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">OmniInvest Platform Demo</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
                <p className="text-white">Demo video would play here</p>
                <p className="text-gray-400 text-sm">Integration with Vimeo/YouTube player</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;