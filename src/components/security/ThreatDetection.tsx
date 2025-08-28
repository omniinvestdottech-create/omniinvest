import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Eye, Zap, Target, Globe, Activity, Brain } from 'lucide-react';

interface ThreatAlert {
  id: string;
  type: 'brute_force' | 'ddos' | 'malware' | 'phishing' | 'data_breach' | 'insider_threat';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  source: string;
  timestamp: string;
  status: 'active' | 'mitigated' | 'investigating';
  affectedSystems: string[];
  mitigation: string[];
}

interface SecurityScan {
  id: string;
  type: 'vulnerability' | 'penetration' | 'compliance' | 'code_audit';
  name: string;
  lastRun: string;
  nextRun: string;
  status: 'passed' | 'failed' | 'running';
  score: number;
  findings: number;
}

const mockThreatAlerts: ThreatAlert[] = [
  {
    id: '1',
    type: 'brute_force',
    severity: 'high',
    title: 'Brute Force Attack Detected',
    description: 'Multiple failed login attempts from suspicious IP addresses blocked automatically',
    source: 'AI Threat Detection',
    timestamp: '15 minutes ago',
    status: 'mitigated',
    affectedSystems: ['Authentication System'],
    mitigation: ['IP blocking', 'Rate limiting', 'CAPTCHA enabled']
  },
  {
    id: '2',
    type: 'ddos',
    severity: 'medium',
    title: 'DDoS Attempt Neutralized',
    description: 'Coordinated attack from 47 IP addresses automatically mitigated by AI defense system',
    source: 'Network Monitoring',
    timestamp: '2 hours ago',
    status: 'mitigated',
    affectedSystems: ['API Gateway', 'Load Balancer'],
    mitigation: ['Traffic filtering', 'CDN protection', 'Auto-scaling']
  },
  {
    id: '3',
    type: 'phishing',
    severity: 'low',
    title: 'Phishing Attempt Blocked',
    description: 'Suspicious email campaign targeting users detected and blocked',
    source: 'Email Security',
    timestamp: '4 hours ago',
    status: 'mitigated',
    affectedSystems: ['Email System'],
    mitigation: ['Domain blocking', 'User notification', 'Email filtering']
  }
];

const mockSecurityScans: SecurityScan[] = [
  {
    id: '1',
    type: 'vulnerability',
    name: 'Automated Vulnerability Scan',
    lastRun: '2 hours ago',
    nextRun: '4 hours',
    status: 'passed',
    score: 98,
    findings: 0
  },
  {
    id: '2',
    type: 'penetration',
    name: 'Penetration Testing',
    lastRun: '1 day ago',
    nextRun: '6 days',
    status: 'passed',
    score: 95,
    findings: 2
  },
  {
    id: '3',
    type: 'compliance',
    name: 'GDPR Compliance Check',
    lastRun: '12 hours ago',
    nextRun: '12 hours',
    status: 'passed',
    score: 100,
    findings: 0
  }
];

const ThreatDetection: React.FC = () => {
  const [realTimeThreats, setRealTimeThreats] = useState(0);
  const [blockedAttacks, setBlockedAttacks] = useState(1247);
  const [aiConfidence, setAiConfidence] = useState(97.3);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-500 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-500 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-500/20';
      case 'mitigated': return 'text-green-400 bg-green-500/20';
      case 'investigating': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getScanStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'running': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'brute_force': return <Target className="h-4 w-4" />;
      case 'ddos': return <Zap className="h-4 w-4" />;
      case 'malware': return <AlertTriangle className="h-4 w-4" />;
      case 'phishing': return <Eye className="h-4 w-4" />;
      case 'data_breach': return <Shield className="h-4 w-4" />;
      case 'insider_threat': return <Globe className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">AI Threat Detection</h2>
          <p className="text-cyan-300/80 mt-1">Real-time threat monitoring and automated response</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-400 animate-pulse" />
          <span className="text-sm text-purple-400">AI Defense Active</span>
        </div>
      </div>

      {/* Threat Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-effect rounded-xl border border-green-500/30 p-6 text-center">
          <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-green-400 mb-1 font-orbitron">{realTimeThreats}</div>
          <div className="text-sm text-cyan-400/60">Active Threats</div>
        </div>
        
        <div className="glass-effect rounded-xl border border-blue-500/30 p-6 text-center">
          <Target className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-blue-400 mb-1 font-orbitron">{blockedAttacks.toLocaleString()}</div>
          <div className="text-sm text-cyan-400/60">Attacks Blocked</div>
        </div>
        
        <div className="glass-effect rounded-xl border border-purple-500/30 p-6 text-center">
          <Brain className="h-8 w-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-purple-400 mb-1 font-orbitron">{aiConfidence}%</div>
          <div className="text-sm text-cyan-400/60">AI Confidence</div>
        </div>
        
        <div className="glass-effect rounded-xl border border-yellow-500/30 p-6 text-center">
          <Activity className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-yellow-400 mb-1 font-orbitron">0.3ms</div>
          <div className="text-sm text-cyan-400/60">Response Time</div>
        </div>
      </div>

      {/* Recent Threats */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Recent Threat Activity</h3>
        <div className="space-y-4">
          {mockThreatAlerts.map((threat) => (
            <div key={threat.id} className="p-4 bg-white/5 rounded-lg border border-cyan-500/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg border ${getSeverityColor(threat.severity)}`}>
                    {getThreatIcon(threat.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-cyan-100">{threat.title}</h4>
                    <p className="text-sm text-cyan-400/60">{threat.source}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(threat.severity)}`}>
                    {threat.severity.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(threat.status)}`}>
                    {threat.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-cyan-300/80 mb-3">{threat.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium text-cyan-400 block mb-2">Affected Systems:</span>
                  <div className="flex flex-wrap gap-1">
                    {threat.affectedSystems.map((system) => (
                      <span key={system} className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-400/30">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-cyan-400 block mb-2">Mitigation Actions:</span>
                  <div className="flex flex-wrap gap-1">
                    {threat.mitigation.map((action) => (
                      <span key={action} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs border border-green-400/30">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-cyan-400/60 mt-3">{threat.timestamp}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Scans */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Automated Security Scans</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {mockSecurityScans.map((scan) => (
            <div key={scan.id} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-cyan-100">{scan.name}</h4>
                <span className={`text-lg font-bold ${getScanStatusColor(scan.status)}`}>
                  {scan.score}%
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cyan-400/60">Last Run:</span>
                  <span className="text-cyan-100">{scan.lastRun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-400/60">Next Run:</span>
                  <span className="text-cyan-100">{scan.nextRun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-400/60">Findings:</span>
                  <span className={scan.findings === 0 ? 'text-green-400' : 'text-red-400'}>
                    {scan.findings}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreatDetection;