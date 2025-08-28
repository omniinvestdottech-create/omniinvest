import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Key, Fingerprint, Smartphone } from 'lucide-react';

interface SecurityMetric {
  id: string;
  name: string;
  status: 'secure' | 'warning' | 'critical';
  description: string;
  lastCheck: string;
  details: string[];
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'failed_attempt' | 'data_access' | 'suspicious_activity';
  description: string;
  timestamp: string;
  location: string;
  ipAddress: string;
  userAgent: string;
  risk: 'low' | 'medium' | 'high';
}

const mockSecurityMetrics: SecurityMetric[] = [
  {
    id: '1',
    name: 'Data Encryption',
    status: 'secure',
    description: 'All data encrypted with AES-256',
    lastCheck: '2 minutes ago',
    details: [
      'End-to-end encryption active',
      'Zero-knowledge architecture',
      'Encrypted at rest and in transit',
      'Key rotation every 24 hours'
    ]
  },
  {
    id: '2',
    name: 'Authentication Security',
    status: 'secure',
    description: 'Multi-factor authentication enabled',
    lastCheck: '5 minutes ago',
    details: [
      'TOTP 2FA active',
      'Biometric authentication',
      'Session timeout: 30 minutes',
      'Device fingerprinting enabled'
    ]
  },
  {
    id: '3',
    name: 'Network Security',
    status: 'secure',
    description: 'Advanced firewall and DDoS protection',
    lastCheck: '1 minute ago',
    details: [
      'WAF protection active',
      'Rate limiting enabled',
      'IP reputation filtering',
      'SSL/TLS 1.3 enforced'
    ]
  },
  {
    id: '4',
    name: 'Data Privacy',
    status: 'secure',
    description: 'GDPR and CCPA compliant',
    lastCheck: '10 minutes ago',
    details: [
      'Data minimization active',
      'User consent management',
      'Right to deletion enabled',
      'Privacy by design'
    ]
  }
];

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: '1',
    type: 'login',
    description: 'Successful login from new device',
    timestamp: '2 minutes ago',
    location: 'New York, US',
    ipAddress: '192.168.1.***',
    userAgent: 'Chrome 120.0.0.0',
    risk: 'low'
  },
  {
    id: '2',
    type: 'failed_attempt',
    description: 'Failed login attempt blocked',
    timestamp: '1 hour ago',
    location: 'Unknown',
    ipAddress: '45.123.***.*',
    userAgent: 'Automated Bot',
    risk: 'high'
  },
  {
    id: '3',
    type: 'data_access',
    description: 'Portfolio data accessed',
    timestamp: '3 hours ago',
    location: 'New York, US',
    ipAddress: '192.168.1.***',
    userAgent: 'Chrome 120.0.0.0',
    risk: 'low'
  }
];

const SecurityDashboard: React.FC = () => {
  const [securityScore, setSecurityScore] = useState(98);
  const [activeThreats, setActiveThreats] = useState(0);
  const [encryptionStatus, setEncryptionStatus] = useState('active');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return <CheckCircle className="h-4 w-4" />;
      case 'failed_attempt': return <AlertTriangle className="h-4 w-4" />;
      case 'data_access': return <Eye className="h-4 w-4" />;
      case 'suspicious_activity': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400 font-orbitron">Security Center</h1>
          <p className="text-cyan-300/80 mt-1">Bank-level security protecting your financial data</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400 font-orbitron">{securityScore}%</div>
            <div className="text-sm text-cyan-400/60">Security Score</div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-400" />
            <span className="text-sm text-green-400">Maximum Protection</span>
          </div>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-effect rounded-xl border border-green-500/30 p-6 text-center">
          <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-green-400 mb-1 font-orbitron">{securityScore}%</div>
          <div className="text-sm text-cyan-400/60">Security Score</div>
        </div>
        
        <div className="glass-effect rounded-xl border border-blue-500/30 p-6 text-center">
          <Lock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-blue-400 mb-1 font-orbitron">AES-256</div>
          <div className="text-sm text-cyan-400/60">Encryption Level</div>
        </div>
        
        <div className="glass-effect rounded-xl border border-purple-500/30 p-6 text-center">
          <AlertTriangle className="h-8 w-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-purple-400 mb-1 font-orbitron">{activeThreats}</div>
          <div className="text-sm text-cyan-400/60">Active Threats</div>
        </div>
        
        <div className="glass-effect rounded-xl border border-yellow-500/30 p-6 text-center">
          <Eye className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-yellow-400 mb-1 font-orbitron">24/7</div>
          <div className="text-sm text-cyan-400/60">Monitoring</div>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Security Status</h3>
          <div className="space-y-4">
            {mockSecurityMetrics.map((metric) => (
              <div key={metric.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-cyan-100">{metric.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(metric.status)}`}>
                    {metric.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-cyan-300/80 mb-2">{metric.description}</p>
                <div className="text-xs text-cyan-400/60">Last check: {metric.lastCheck}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Recent Security Events</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {mockSecurityEvents.map((event) => (
              <div key={event.id} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getEventIcon(event.type)}
                    <span className="font-medium text-cyan-100 text-sm">{event.description}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(event.risk)}`}>
                    {event.risk.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-cyan-400/60 space-y-1">
                  <div>Location: {event.location}</div>
                  <div>IP: {event.ipAddress}</div>
                  <div>Time: {event.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Controls */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Security Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-cyan-400">Authentication</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-400/30">
                <div className="flex items-center space-x-2">
                  <Fingerprint className="h-4 w-4 text-green-400" />
                  <span className="text-cyan-100">Biometric Auth</span>
                </div>
                <span className="text-green-400 text-sm">ENABLED</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-400/30">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-green-400" />
                  <span className="text-cyan-100">2FA</span>
                </div>
                <span className="text-green-400 text-sm">ACTIVE</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-cyan-400">Data Protection</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-400/30">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-green-400" />
                  <span className="text-cyan-100">End-to-End Encryption</span>
                </div>
                <span className="text-green-400 text-sm">ACTIVE</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-400/30">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4 text-green-400" />
                  <span className="text-cyan-100">Zero-Knowledge</span>
                </div>
                <span className="text-green-400 text-sm">ENABLED</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-cyan-400">Monitoring</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-400/30">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-green-400" />
                  <span className="text-cyan-100">24/7 Monitoring</span>
                </div>
                <span className="text-green-400 text-sm">ACTIVE</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-400/30">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-green-400" />
                  <span className="text-cyan-100">Threat Detection</span>
                </div>
                <span className="text-green-400 text-sm">ENABLED</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;