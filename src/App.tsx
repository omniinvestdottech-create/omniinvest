import React, { useState } from 'react';
import { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LazyWrapper from './components/LazyWrapper';
import ServiceWorkerManager from './components/ServiceWorkerManager';
import PerformanceMonitor from './components/PerformanceMonitor';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LandingPage from './components/landing/LandingPage';
import InsiderTracking from './components/InsiderTracking';
import Portfolio from './components/Portfolio';
import AIAnalytics from './components/AIAnalytics';
import Education from './components/Education';
import Settings from './components/Settings';
import Disclaimer from './components/Disclaimer';
import MembershipTiers from './components/membership/MembershipTiers';
import ForumCategories from './components/forums/ForumCategories';
import PaymentGateway from './components/payment/PaymentGateway';
import { setupCSP, SessionManager, AuditLogger } from './utils/security';
import { useLocalStorage } from './hooks/useLocalStorage';

// Lazy load advanced components for better performance
const SmartFeeds = React.lazy(() => import('./components/advanced/SmartFeeds'));
const InfluencerScorecards = React.lazy(() => import('./components/advanced/InfluencerScorecards'));
const RiskRadar = React.lazy(() => import('./components/advanced/RiskRadar'));
const CrowdWisdom = React.lazy(() => import('./components/advanced/CrowdWisdom'));
const AlternativeAssets = React.lazy(() => import('./components/advanced/AlternativeAssets'));
const AIDecisionJournal = React.lazy(() => import('./components/advanced/AIDecisionJournal'));
const PredictiveAnalytics = React.lazy(() => import('./components/advanced/PredictiveAnalytics'));
const ExclusiveDataSources = React.lazy(() => import('./components/advanced/ExclusiveDataSources'));
const SocialTradingHub = React.lazy(() => import('./components/advanced/SocialTradingHub'));
const AutomationEngine = React.lazy(() => import('./components/advanced/AutomationEngine'));
const ExclusiveContent = React.lazy(() => import('./components/advanced/ExclusiveContent'));
const QuantumAI = React.lazy(() => import('./components/advanced/QuantumAI'));
const PersonalAI = React.lazy(() => import('./components/advanced/PersonalAI'));
const GlobalIntelligence = React.lazy(() => import('./components/advanced/GlobalIntelligence'));
const AdvancedVisualization = React.lazy(() => import('./components/advanced/AdvancedVisualization'));
const BehavioralAnalytics = React.lazy(() => import('./components/advanced/BehavioralAnalytics'));
const MarketMicrostructure = React.lazy(() => import('./components/advanced/MarketMicrostructure'));
const APIEcosystem = React.lazy(() => import('./components/advanced/APIEcosystem'));

// Initialize security on app start
if (typeof window !== 'undefined') {
  setupCSP();
}

type ActiveTab = 'landing' | 'dashboard' | 'insider-tracking' | 'portfolio' | 'ai-analytics' | 'education' | 'settings' | 'smart-feeds' | 'scorecards' | 'risk-radar' | 'crowd-wisdom' | 'alternative-assets' | 'ai-journal' | 'predictive-analytics' | 'exclusive-data' | 'social-trading' | 'automation' | 'exclusive-content' | 'membership' | 'forums' | 'payment' | 'quantum-ai' | 'personal-ai' | 'global-intelligence' | 'advanced-viz' | 'behavioral-analytics' | 'market-microstructure' | 'api-ecosystem';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [disclaimerAccepted, setDisclaimerAccepted] = useLocalStorage('disclaimer-accepted', false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Security event logging
  const handleTabChange = (tab: ActiveTab) => {
    AuditLogger.log('navigation', { from: activeTab, to: tab });
    setActiveTab(tab);
  };

  if (!disclaimerAccepted) {
    return <Disclaimer onAccept={() => setDisclaimerAccepted(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'insider-tracking':
        return <InsiderTracking />;
      case 'portfolio':
        return <Portfolio />;
      case 'ai-analytics':
        return <AIAnalytics />;
      case 'education':
        return <Education />;
      case 'settings':
        return <Settings />;
      case 'smart-feeds':
        return <LazyWrapper><SmartFeeds /></LazyWrapper>;
      case 'scorecards':
        return <LazyWrapper><InfluencerScorecards /></LazyWrapper>;
      case 'risk-radar':
        return <LazyWrapper><RiskRadar /></LazyWrapper>;
      case 'crowd-wisdom':
        return <LazyWrapper><CrowdWisdom /></LazyWrapper>;
      case 'alternative-assets':
        return <LazyWrapper><AlternativeAssets /></LazyWrapper>;
      case 'ai-journal':
        return <LazyWrapper><AIDecisionJournal /></LazyWrapper>;
      case 'predictive-analytics':
        return <LazyWrapper><PredictiveAnalytics /></LazyWrapper>;
      case 'exclusive-data':
        return <LazyWrapper><ExclusiveDataSources /></LazyWrapper>;
      case 'social-trading':
        return <LazyWrapper><SocialTradingHub /></LazyWrapper>;
      case 'automation':
        return <LazyWrapper><AutomationEngine /></LazyWrapper>;
      case 'exclusive-content':
        return <LazyWrapper><ExclusiveContent /></LazyWrapper>;
      case 'membership':
        return <MembershipTiers />;
      case 'forums':
        return <ForumCategories />;
      case 'payment':
        return selectedTier ? (
          <PaymentGateway 
            selectedTier={selectedTier}
            billingCycle={billingCycle}
            onPaymentSuccess={() => setActiveTab('dashboard')}
            onCancel={() => setActiveTab('membership')}
          />
        ) : <MembershipTiers />;
      case 'quantum-ai':
        return <LazyWrapper><QuantumAI /></LazyWrapper>;
      case 'personal-ai':
        return <LazyWrapper><PersonalAI /></LazyWrapper>;
      case 'global-intelligence':
        return <LazyWrapper><GlobalIntelligence /></LazyWrapper>;
      case 'advanced-viz':
        return <LazyWrapper><AdvancedVisualization /></LazyWrapper>;
      case 'behavioral-analytics':
        return <LazyWrapper><BehavioralAnalytics /></LazyWrapper>;
      case 'market-microstructure':
        return <LazyWrapper><MarketMicrostructure /></LazyWrapper>;
      case 'api-ecosystem':
        return <LazyWrapper><APIEcosystem /></LazyWrapper>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Futuristic background effects */}
        <div className="fixed inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-magenta-500/10"></div>
          <div className="absolute inset-0 data-grid"></div>
        </div>
        
        {/* Animated background particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-magenta-400 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-30 animation-delay-3000"></div>
        </div>
        
        <Header 
          onTabChange={handleTabChange}
          sidebarOpen={sidebarOpen}
        />
        
        <div className="flex pt-16">
          <Sidebar 
            isOpen={sidebarOpen}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onClose={() => setSidebarOpen(false)}
          />
          
          <main className={`flex-1 transition-all duration-300 relative z-10 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
            <div className="p-4 lg:p-6">
              <Suspense fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                    <span className="text-cyan-400 font-orbitron">Loading...</span>
                  </div>
                </div>
              }>
                {renderContent()}
              </Suspense>
            </div>
          </main>
        </div>
        
        <ServiceWorkerManager />
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
      </div>
    </ErrorBoundary>
  );
}

export default App;