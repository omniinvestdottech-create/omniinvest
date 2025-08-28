import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  Clock, 
  Pin, 
  Lock, 
  Crown, 
  Star, 
  TrendingUp,
  Brain,
  Shield,
  Gem,
  Award,
  Eye,
  Zap
} from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  membershipTier: string;
  replies: number;
  views: number;
  lastActivity: string;
  isPinned?: boolean;
  isLocked?: boolean;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  requiredTier: string;
  posts: ForumPost[];
  subcategories?: string[];
  memberCount: number;
  color: string;
}

const forumCategories: ForumCategory[] = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'Open discussions about investing, markets, and financial news',
    icon: MessageSquare,
    requiredTier: 'insider-glimpse',
    memberCount: 15420,
    color: 'text-gray-400',
    posts: [
      {
        id: '1',
        title: 'Welcome to OmniInvest Community!',
        author: 'OmniInvest Team',
        membershipTier: 'omniscient-elite',
        replies: 234,
        views: 5670,
        lastActivity: '2 hours ago',
        isPinned: true
      },
      {
        id: '2',
        title: 'Market outlook for Q4 2024',
        author: 'MarketGuru',
        membershipTier: 'wealth-architect',
        replies: 45,
        views: 890,
        lastActivity: '30 minutes ago'
      }
    ]
  },
  {
    id: 'beginner',
    name: 'Beginner Questions',
    description: 'Safe space for new investors to ask questions and learn',
    icon: Users,
    requiredTier: 'insider-glimpse',
    memberCount: 8930,
    color: 'text-green-400',
    posts: [
      {
        id: '3',
        title: 'How to read insider trading filings?',
        author: 'NewInvestor2024',
        membershipTier: 'market-navigator',
        replies: 12,
        views: 234,
        lastActivity: '1 hour ago'
      }
    ]
  },
  {
    id: 'market-analysis',
    name: 'Market Analysis & Insights',
    description: 'Deep dive into market trends, technical analysis, and predictions',
    icon: TrendingUp,
    requiredTier: 'market-navigator',
    memberCount: 6750,
    color: 'text-blue-400',
    posts: [
      {
        id: '4',
        title: 'NVDA technical analysis - bullish breakout incoming?',
        author: 'TechAnalyst',
        membershipTier: 'wealth-architect',
        replies: 67,
        views: 1340,
        lastActivity: '15 minutes ago'
      }
    ]
  },
  {
    id: 'strategy-sharing',
    name: 'Strategy Sharing',
    description: 'Share and discuss investment strategies and methodologies',
    icon: Brain,
    requiredTier: 'market-navigator',
    memberCount: 4560,
    color: 'text-purple-400',
    posts: [
      {
        id: '5',
        title: 'My 3-year insider following strategy results',
        author: 'StrategyMaster',
        membershipTier: 'wealth-architect',
        replies: 89,
        views: 2100,
        lastActivity: '45 minutes ago'
      }
    ]
  },
  {
    id: 'advanced-strategies',
    name: 'Advanced Strategies',
    description: 'Complex investment strategies for experienced investors',
    icon: Award,
    requiredTier: 'wealth-architect',
    memberCount: 2340,
    color: 'text-yellow-400',
    posts: [
      {
        id: '6',
        title: 'Options strategies based on insider sentiment',
        author: 'OptionsExpert',
        membershipTier: 'omniscient-elite',
        replies: 34,
        views: 780,
        lastActivity: '2 hours ago'
      }
    ]
  },
  {
    id: 'alternative-investments',
    name: 'Alternative Investments',
    description: 'Real estate, art, collectibles, and other alternative assets',
    icon: Gem,
    requiredTier: 'wealth-architect',
    memberCount: 1890,
    color: 'text-pink-400',
    posts: [
      {
        id: '7',
        title: 'Art market trends following celebrity purchases',
        author: 'ArtCollector',
        membershipTier: 'omniscient-elite',
        replies: 23,
        views: 456,
        lastActivity: '3 hours ago'
      }
    ]
  },
  {
    id: 'elite-inner-circle',
    name: 'Elite Inner Circle',
    description: 'Exclusive discussions for our most elite members',
    icon: Crown,
    requiredTier: 'omniscient-elite',
    memberCount: 567,
    color: 'text-orange-400',
    posts: [
      {
        id: '8',
        title: 'Private equity opportunities Q4 2024',
        author: 'EliteInvestor',
        membershipTier: 'omniscient-elite',
        replies: 15,
        views: 234,
        lastActivity: '1 hour ago',
        isLocked: true
      }
    ]
  },
  {
    id: 'institutional-strategies',
    name: 'Institutional Strategies',
    description: 'High-level institutional investment approaches and insights',
    icon: Shield,
    requiredTier: 'omniscient-elite',
    memberCount: 234,
    color: 'text-red-400',
    posts: [
      {
        id: '9',
        title: 'Hedge fund replication strategies',
        author: 'InstitutionalPro',
        membershipTier: 'omniscient-elite',
        replies: 8,
        views: 123,
        lastActivity: '4 hours ago'
      }
    ]
  }
];

const ForumCategories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [userTier, setUserTier] = useState<string>('market-navigator'); // This would come from user context

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'insider-glimpse': return <Eye className="h-3 w-3" />;
      case 'market-navigator': return <TrendingUp className="h-3 w-3" />;
      case 'wealth-architect': return <Crown className="h-3 w-3" />;
      case 'omniscient-elite': return <Zap className="h-3 w-3" />;
      default: return <Users className="h-3 w-3" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'insider-glimpse': return 'text-gray-400 bg-gray-500/20';
      case 'market-navigator': return 'text-blue-400 bg-blue-500/20';
      case 'wealth-architect': return 'text-purple-400 bg-purple-500/20';
      case 'omniscient-elite': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const canAccessCategory = (requiredTier: string) => {
    const tierLevels = {
      'insider-glimpse': 1,
      'market-navigator': 2,
      'wealth-architect': 3,
      'omniscient-elite': 4
    };
    return tierLevels[userTier as keyof typeof tierLevels] >= tierLevels[requiredTier as keyof typeof tierLevels];
  };

  const selectedCategoryData = forumCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400 font-orbitron">Community Forums</h1>
          <p className="text-cyan-300/80 mt-1">Connect with elite investors and share insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-cyan-400/80">Your tier:</span>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getTierColor(userTier)}`}>
            {getTierIcon(userTier)}
            <span className="capitalize">{userTier.replace('-', ' ')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories Sidebar */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-cyan-400 font-orbitron mb-4">Categories</h2>
          {forumCategories.map((category) => {
            const Icon = category.icon;
            const hasAccess = canAccessCategory(category.requiredTier);
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => hasAccess && setSelectedCategory(category.id)}
                disabled={!hasAccess}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  isSelected
                    ? 'glass-effect border-cyan-400/50 bg-cyan-500/10'
                    : hasAccess
                    ? 'glass-effect border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/5'
                    : 'bg-gray-500/10 border-gray-500/30 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-5 w-5 ${hasAccess ? category.color : 'text-gray-500'}`} />
                    <span className={`font-medium ${hasAccess ? 'text-cyan-100' : 'text-gray-500'}`}>
                      {category.name}
                    </span>
                  </div>
                  {!hasAccess && <Lock className="h-4 w-4 text-gray-500" />}
                </div>
                
                <p className={`text-sm mb-2 ${hasAccess ? 'text-cyan-300/80' : 'text-gray-500'}`}>
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getTierColor(category.requiredTier)}`}>
                    {getTierIcon(category.requiredTier)}
                    <span className="capitalize">{category.requiredTier.replace('-', ' ')} +</span>
                  </div>
                  <span className={`text-xs ${hasAccess ? 'text-cyan-400/60' : 'text-gray-500'}`}>
                    {category.memberCount.toLocaleString()} members
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Posts List */}
        <div className="lg:col-span-2">
          {selectedCategoryData && (
            <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-cyan-400 font-orbitron">
                    {selectedCategoryData.name}
                  </h2>
                  <p className="text-cyan-300/80 text-sm mt-1">
                    {selectedCategoryData.description}
                  </p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                  New Post
                </button>
              </div>

              <div className="space-y-3">
                {selectedCategoryData.posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {post.isPinned && <Pin className="h-4 w-4 text-yellow-400" />}
                          {post.isLocked && <Lock className="h-4 w-4 text-red-400" />}
                          <h3 className="font-medium text-cyan-100 hover:text-cyan-400 transition-colors">
                            {post.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-cyan-400/60">
                          <div className="flex items-center space-x-1">
                            <span>by</span>
                            <span className="text-cyan-400">{post.author}</span>
                            <div className={`flex items-center space-x-1 px-1 py-0.5 rounded text-xs ${getTierColor(post.membershipTier)}`}>
                              {getTierIcon(post.membershipTier)}
                            </div>
                          </div>
                          <span>•</span>
                          <span>{post.lastActivity}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-cyan-400/60">
                        <div className="text-center">
                          <div className="text-cyan-400 font-medium">{post.replies}</div>
                          <div className="text-xs">replies</div>
                        </div>
                        <div className="text-center">
                          <div className="text-cyan-400 font-medium">{post.views}</div>
                          <div className="text-xs">views</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!canAccessCategory(selectedCategoryData.requiredTier) && (
                <div className="mt-6 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-lg text-center">
                  <Lock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                    Upgrade Required
                  </h3>
                  <p className="text-yellow-300/80 mb-4">
                    This forum category requires {selectedCategoryData.requiredTier.replace('-', ' ')} membership or higher.
                  </p>
                  <button className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumCategories;