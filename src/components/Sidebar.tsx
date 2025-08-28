import React from 'react';
import { 
  BarChart3, 
  Eye, 
  TrendingUp, 
  Brain, 
  GraduationCap, 
  Settings, 
  X,
  Shield,
  Users,
  AlertTriangle,
  Rss,
  Award,
  CreditCard,
  MessageSquare as ForumIcon,
  Radar,
  MessageSquare,
  Gem,
  FileText,
  Zap,
  Satellite,
  Bot,
  Video,
  Target
} from 'lucide-react';
import { 
  Globe,
  Activity,
  Code
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: any) => void;
  onClose: () => void;
}

const navigationItems = [
  { id: 'landing', label: 'Sales Landing', icon: BarChart3 },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'insider-tracking', label: 'Insider Tracking', icon: Eye },
  { id: 'portfolio', label: 'Portfolio', icon: TrendingUp },
  { id: 'ai-analytics', label: 'AI Analytics', icon: Brain },
  { id: 'education', label: 'Education Hub', icon: GraduationCap },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'membership', label: 'Membership', icon: CreditCard },
  { id: 'forums', label: 'Community Forums', icon: ForumIcon },
];

const advancedFeatures = [
  { id: 'smart-feeds', label: 'Smart Feeds', icon: Rss },
  { id: 'scorecards', label: 'Influencer Scorecards', icon: Award },
  { id: 'risk-radar', label: 'Risk Radar', icon: Radar },
  { id: 'crowd-wisdom', label: 'Crowd Wisdom', icon: MessageSquare },
  { id: 'alternative-assets', label: 'Alternative Assets', icon: Gem },
  { id: 'ai-journal', label: 'AI Decision Journal', icon: FileText },
];

const revolutionaryFeatures = [
  { id: 'predictive-analytics', label: 'Predictive Analytics', icon: Target },
  { id: 'exclusive-data', label: 'Exclusive Data Sources', icon: Satellite },
  { id: 'social-trading', label: 'Social Trading Hub', icon: Users },
  { id: 'automation', label: 'Automation Engine', icon: Bot },
  { id: 'exclusive-content', label: 'Exclusive Content', icon: Video },
  { id: 'quantum-ai', label: 'Quantum AI Engine', icon: Zap },
  { id: 'personal-ai', label: 'Personal AI Advisor', icon: Brain },
  { id: 'global-intelligence', label: 'Global Intelligence', icon: Globe },
  { id: 'advanced-viz', label: 'Advanced Visualization', icon: Eye },
  { id: 'behavioral-analytics', label: 'Behavioral Analytics', icon: Users },
  { id: 'market-microstructure', label: 'Market Microstructure', icon: Activity },
  { id: 'api-ecosystem', label: 'API Ecosystem', icon: Code },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, onTabChange, onClose }) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed top-16 left-0 h-full glass-effect border-r border-cyan-500/30 z-40 relative
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'w-64 translate-x-0' : 'w-0 lg:w-16 -translate-x-full lg:translate-x-0'}
        overflow-hidden
      `}>
        {/* Sidebar glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-magenta-500/5"></div>
        
        <div className={`p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg text-cyan-400 hover:text-cyan-300 futuristic-button transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-2 mt-8 lg:mt-0 min-w-[240px]">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'holographic text-cyan-300 cyber-border neon-glow' 
                      : 'text-cyan-400/80 hover:text-cyan-300 futuristic-button'
                    }
                  `}
                  title={!isOpen ? item.label : ''}
                >
                  <Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${!isOpen ? 'lg:mx-auto' : ''}`} />
                  <span className={`font-medium transition-all duration-200 ${isOpen ? 'opacity-100 translate-x-0' : 'lg:opacity-0 lg:translate-x-4 lg:absolute lg:pointer-events-none'}`}>
                    {item.label}
                  </span>
                  {!isOpen && (
                    <div className="sidebar-tooltip bg-black/90 border border-cyan-500/30">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
            
            <div className="pt-4 mt-4 border-t border-cyan-500/20">
              <h3 className={`text-sm font-medium text-cyan-400/60 mb-3 px-4 transition-all duration-200 font-orbitron ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:text-center lg:px-0'}`}>
                {isOpen ? 'Advanced Features' : '•••'}
              </h3>
              {advancedFeatures.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                      ${isActive 
                        ? 'holographic text-magenta-300 cyber-border neon-glow' 
                        : 'text-magenta-400/80 hover:text-magenta-300 futuristic-button'
                      }
                    `}
                    title={!isOpen ? item.label : ''}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${!isOpen ? 'lg:mx-auto' : ''}`} />
                    <span className={`font-medium text-sm transition-all duration-200 ${isOpen ? 'opacity-100 translate-x-0' : 'lg:opacity-0 lg:translate-x-4 lg:absolute lg:pointer-events-none'}`}>
                      {item.label}
                    </span>
                    {!isOpen && (
                      <div className="sidebar-tooltip bg-black/90 border border-magenta-500/30">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="pt-4 mt-4 border-t border-cyan-500/20">
              <h3 className={`text-sm font-medium text-cyan-400/60 mb-3 px-4 transition-all duration-200 font-orbitron ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:text-center lg:px-0'}`}>
                {isOpen ? 'Revolutionary Features' : '⚡'}
              </h3>
              {revolutionaryFeatures.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                      ${isActive 
                        ? 'holographic text-yellow-300 cyber-border neon-glow' 
                        : 'text-yellow-400/80 hover:text-yellow-300 futuristic-button'
                      }
                    `}
                    title={!isOpen ? item.label : ''}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${!isOpen ? 'lg:mx-auto' : ''}`} />
                    <span className={`font-medium text-sm transition-all duration-200 ${isOpen ? 'opacity-100 translate-x-0' : 'lg:opacity-0 lg:translate-x-4 lg:absolute lg:pointer-events-none'}`}>
                      {item.label}
                    </span>
                    {!isOpen && (
                      <div className="sidebar-tooltip bg-black/90 border border-yellow-500/30">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`mt-8 p-4 rounded-lg holographic border border-green-400/30 transition-all duration-300 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:scale-95'}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className={`font-medium text-green-400 transition-all duration-200 font-orbitron ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>
                Security Status
              </span>
            </div>
            <p className={`text-sm text-green-300/80 transition-all duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>
              All systems secure
            </p>
            <div className={`flex items-center space-x-2 mt-2 transition-all duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-xs text-green-400 font-orbitron">Active Protection</span>
            </div>
          </div>

          <div className={`mt-4 p-4 rounded-lg holographic border border-amber-400/30 transition-all duration-300 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:scale-95'}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-amber-400" />
              <span className={`font-medium text-amber-400 transition-all duration-200 font-orbitron ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>
                Community
              </span>
            </div>
            <p className={`text-sm text-amber-300/80 transition-all duration-200 ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>
              12,847 active investors
            </p>
            <p className={`text-xs text-amber-400 mt-1 transition-all duration-200 font-orbitron ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>
              +234 this week
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;