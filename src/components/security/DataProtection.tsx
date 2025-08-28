import React, { useState } from 'react';
import { Database, Shield, Eye, Download, Trash2, FileText, Clock, Lock } from 'lucide-react';

interface DataCategory {
  id: string;
  name: string;
  type: 'personal' | 'financial' | 'behavioral' | 'technical';
  size: string;
  encrypted: boolean;
  backupStatus: 'current' | 'outdated' | 'failed';
  lastBackup: string;
  retention: string;
  access: number;
}

interface PrivacyControl {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  required: boolean;
  impact: string;
}

const mockDataCategories: DataCategory[] = [
  {
    id: '1',
    name: 'Personal Information',
    type: 'personal',
    size: '2.3 KB',
    encrypted: true,
    backupStatus: 'current',
    lastBackup: '1 hour ago',
    retention: '7 years',
    access: 3
  },
  {
    id: '2',
    name: 'Portfolio Data',
    type: 'financial',
    size: '45.7 KB',
    encrypted: true,
    backupStatus: 'current',
    lastBackup: '30 minutes ago',
    retention: '10 years',
    access: 12
  },
  {
    id: '3',
    name: 'Trading Behavior',
    type: 'behavioral',
    size: '128.4 KB',
    encrypted: true,
    backupStatus: 'current',
    lastBackup: '15 minutes ago',
    retention: '5 years',
    access: 8
  },
  {
    id: '4',
    name: 'Technical Logs',
    type: 'technical',
    size: '234.1 KB',
    encrypted: true,
    backupStatus: 'current',
    lastBackup: '5 minutes ago',
    retention: '2 years',
    access: 156
  }
];

const mockPrivacyControls: PrivacyControl[] = [
  {
    id: '1',
    name: 'Data Minimization',
    description: 'Only collect data necessary for service functionality',
    enabled: true,
    required: true,
    impact: 'Reduces data exposure risk'
  },
  {
    id: '2',
    name: 'Automatic Data Deletion',
    description: 'Automatically delete data after retention period',
    enabled: true,
    required: false,
    impact: 'Minimizes long-term data storage'
  },
  {
    id: '3',
    name: 'Anonymous Analytics',
    description: 'Use anonymized data for platform improvements',
    enabled: false,
    required: false,
    impact: 'Helps improve user experience'
  },
  {
    id: '4',
    name: 'Third-party Sharing Block',
    description: 'Block all data sharing with third parties',
    enabled: true,
    required: false,
    impact: 'Maximum privacy protection'
  }
];

const DataProtection: React.FC = () => {
  const [privacyControls, setPrivacyControls] = useState(mockPrivacyControls);
  const [selectedTab, setSelectedTab] = useState<'data' | 'privacy' | 'rights'>('data');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'personal': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'financial': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'behavioral': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
      case 'technical': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getBackupStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-400 bg-green-500/20';
      case 'outdated': return 'text-yellow-400 bg-yellow-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const togglePrivacyControl = (id: string) => {
    setPrivacyControls(controls => 
      controls.map(control => 
        control.id === id && !control.required 
          ? { ...control, enabled: !control.enabled }
          : control
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Data Protection</h2>
          <p className="text-cyan-300/80 mt-1">Complete control over your personal and financial data</p>
        </div>
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-green-400" />
          <span className="text-sm text-green-400">Zero-Knowledge Architecture</span>
        </div>
      </div>

      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setSelectedTab('data')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'data'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Database className="h-4 w-4" />
          <span>Your Data</span>
        </button>
        
        <button
          onClick={() => setSelectedTab('privacy')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'privacy'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Shield className="h-4 w-4" />
          <span>Privacy Controls</span>
        </button>
        
        <button
          onClick={() => setSelectedTab('rights')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'rights'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Your Rights</span>
        </button>
      </div>

      {selectedTab === 'data' && (
        <div className="space-y-4">
          {mockDataCategories.map((category) => (
            <div
              key={category.id}
              className="glass-effect rounded-xl border border-cyan-500/30 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg border ${getTypeColor(category.type)}`}>
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400">{category.name}</h3>
                    <p className="text-cyan-300/80 text-sm">Size: {category.size}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {category.encrypted && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-400/30">
                      <Lock className="h-3 w-3" />
                      <span className="text-xs">ENCRYPTED</span>
                    </div>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs ${getBackupStatusColor(category.backupStatus)}`}>
                    BACKUP {category.backupStatus.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-cyan-400/60">Last Backup:</span>
                  <div className="text-cyan-100">{category.lastBackup}</div>
                </div>
                <div>
                  <span className="text-cyan-400/60">Retention:</span>
                  <div className="text-cyan-100">{category.retention}</div>
                </div>
                <div>
                  <span className="text-cyan-400/60">Access Count:</span>
                  <div className="text-cyan-100">{category.access} times</div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-400/30 hover:bg-blue-500/30 transition-colors">
                    Export
                  </button>
                  <button className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-400/30 hover:bg-red-500/30 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'privacy' && (
        <div className="space-y-4">
          {privacyControls.map((control) => (
            <div
              key={control.id}
              className="glass-effect rounded-xl border border-cyan-500/30 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-cyan-100">{control.name}</h3>
                    {control.required && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs border border-red-400/30">
                        REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-cyan-300/80 mb-2">{control.description}</p>
                  <p className="text-xs text-cyan-400/60">Impact: {control.impact}</p>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={control.enabled}
                    onChange={() => togglePrivacyControl(control.id)}
                    disabled={control.required}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 peer-disabled:opacity-50"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'rights' && (
        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Your Data Rights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <button className="w-full flex items-center space-x-3 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30 hover:bg-blue-500/20 transition-colors">
                <Download className="h-5 w-5 text-blue-400" />
                <div className="text-left">
                  <div className="font-medium text-blue-400">Export Your Data</div>
                  <div className="text-sm text-cyan-300/80">Download all your data in JSON format</div>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-4 bg-green-500/10 rounded-lg border border-green-400/30 hover:bg-green-500/20 transition-colors">
                <Eye className="h-5 w-5 text-green-400" />
                <div className="text-left">
                  <div className="font-medium text-green-400">View Data Usage</div>
                  <div className="text-sm text-cyan-300/80">See how your data is being used</div>
                </div>
              </button>
            </div>
            
            <div className="space-y-4">
              <button className="w-full flex items-center space-x-3 p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30 hover:bg-yellow-500/20 transition-colors">
                <FileText className="h-5 w-5 text-yellow-400" />
                <div className="text-left">
                  <div className="font-medium text-yellow-400">Request Data Correction</div>
                  <div className="text-sm text-cyan-300/80">Update or correct your information</div>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-4 bg-red-500/10 rounded-lg border border-red-400/30 hover:bg-red-500/20 transition-colors">
                <Trash2 className="h-5 w-5 text-red-400" />
                <div className="text-left">
                  <div className="font-medium text-red-400">Delete All Data</div>
                  <div className="text-sm text-cyan-300/80">Permanently remove your account and data</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataProtection;