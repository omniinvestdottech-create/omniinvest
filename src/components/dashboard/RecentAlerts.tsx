import React from 'react';
import { Bell, Clock, AlertTriangle, TrendingUp, Eye } from 'lucide-react';

interface Alert {
  id: string;
  type: 'high_volume' | 'insider_buy' | 'insider_sell' | 'sentiment_change' | 'risk_warning';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  symbol?: string;
  confidence: number;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'insider_buy',
    title: 'Major Insider Purchase Detected',
    description: 'Elon Musk purchased $2.5M worth of TSLA shares',
    timestamp: '2 minutes ago',
    priority: 'high',
    symbol: 'TSLA',
    confidence: 95
  },
  {
    id: '2',
    type: 'sentiment_change',
    title: 'Bullish Sentiment Surge',
    description: 'AI detected 340% increase in positive sentiment for NVDA',
    timestamp: '15 minutes ago',
    priority: 'high',
    symbol: 'NVDA',
    confidence: 87
  },
  {
    id: '3',
    type: 'high_volume',
    title: 'Unusual Trading Volume',
    description: 'META trading volume 450% above average',
    timestamp: '32 minutes ago',
    priority: 'medium',
    symbol: 'META',
    confidence: 78
  },
  {
    id: '4',
    type: 'risk_warning',
    title: 'Risk Alert: Political Impact',
    description: 'New regulation may impact tech sector',
    timestamp: '1 hour ago',
    priority: 'medium',
    confidence: 82
  },
  {
    id: '5',
    type: 'insider_sell',
    title: 'Insider Sale Notice',
    description: 'Warren Buffett sold $5.2M in AAPL positions',
    timestamp: '2 hours ago',
    priority: 'medium',
    symbol: 'AAPL',
    confidence: 92
  },
];

const RecentAlerts: React.FC = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'insider_buy':
      case 'insider_sell':
        return <Eye className="h-4 w-4" />;
      case 'high_volume':
        return <TrendingUp className="h-4 w-4" />;
      case 'sentiment_change':
        return <TrendingUp className="h-4 w-4" />;
      case 'risk_warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertColor = (priority: string, type: string) => {
    if (priority === 'high') {
      return type === 'risk_warning' 
        ? 'border-l-red-500 bg-red-500/10' 
        : 'border-l-green-500 bg-green-500/10';
    }
    if (priority === 'medium') {
      return 'border-l-yellow-500 bg-yellow-500/10';
    }
    return 'border-l-blue-500 bg-blue-500/10';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Recent Alerts</h2>
        </div>
        
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
        {mockAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border-l-4 transition-all duration-200 cursor-pointer hover:bg-white/5 ${getAlertColor(alert.priority, alert.type)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {getAlertIcon(alert.type)}
                  <span className="font-medium text-white text-sm">
                    {alert.title}
                  </span>
                  {alert.symbol && (
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-blue-400 font-medium">
                      {alert.symbol}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-300 text-sm mb-2">
                  {alert.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                    
                    <div className={`text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                      {alert.priority.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    {alert.confidence}% confidence
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
        <span className="text-gray-400">24h Alert Summary</span>
        <div className="flex items-center space-x-4">
          <span className="text-red-400">3 High</span>
          <span className="text-yellow-400">8 Medium</span>
          <span className="text-blue-400">12 Low</span>
        </div>
      </div>
    </div>
  );
};

export default RecentAlerts;