import React, { useState, useEffect } from 'react';
import { Lock, Key, Shield, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

interface EncryptionKey {
  id: string;
  type: 'master' | 'data' | 'session' | 'api';
  algorithm: string;
  keySize: number;
  created: string;
  lastRotation: string;
  status: 'active' | 'rotating' | 'expired';
}

const mockEncryptionKeys: EncryptionKey[] = [
  {
    id: '1',
    type: 'master',
    algorithm: 'AES-256-GCM',
    keySize: 256,
    created: '2024-01-01',
    lastRotation: '2 hours ago',
    status: 'active'
  },
  {
    id: '2',
    type: 'data',
    algorithm: 'ChaCha20-Poly1305',
    keySize: 256,
    created: '2024-01-01',
    lastRotation: '4 hours ago',
    status: 'active'
  },
  {
    id: '3',
    type: 'session',
    algorithm: 'AES-256-CBC',
    keySize: 256,
    created: '2024-01-01',
    lastRotation: '30 minutes ago',
    status: 'active'
  }
];

const EncryptionManager: React.FC = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [encryptionLevel, setEncryptionLevel] = useState('maximum');

  const rotateKeys = async () => {
    setIsRotating(true);
    // Simulate key rotation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRotating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'rotating': return 'text-yellow-400 bg-yellow-500/20';
      case 'expired': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'master': return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'data': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'session': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'api': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Encryption Management</h2>
          <p className="text-cyan-300/80 mt-1">Military-grade encryption protecting all data</p>
        </div>
        <button
          onClick={rotateKeys}
          disabled={isRotating}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRotating ? 'animate-spin' : ''}`} />
          <span>{isRotating ? 'Rotating...' : 'Rotate Keys'}</span>
        </button>
      </div>

      {/* Encryption Status */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Encryption Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2 font-orbitron">256-bit</div>
            <div className="text-sm text-cyan-400/60">Encryption Strength</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2 font-orbitron">0</div>
            <div className="text-sm text-cyan-400/60">Breaches Ever</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2 font-orbitron">24h</div>
            <div className="text-sm text-cyan-400/60">Key Rotation</div>
          </div>
        </div>
      </div>

      {/* Encryption Keys */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Active Encryption Keys</h3>
        <div className="space-y-4">
          {mockEncryptionKeys.map((key) => (
            <div key={key.id} className="p-4 bg-white/5 rounded-lg border border-cyan-500/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg border ${getTypeColor(key.type)}`}>
                    <Key className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-cyan-100">{key.type.toUpperCase()} KEY</h4>
                    <p className="text-sm text-cyan-400/60">{key.algorithm}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(key.status)}`}>
                  {key.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-cyan-400/60">Key Size:</span>
                  <span className="text-cyan-100 ml-2">{key.keySize}-bit</span>
                </div>
                <div>
                  <span className="text-cyan-400/60">Created:</span>
                  <span className="text-cyan-100 ml-2">{key.created}</span>
                </div>
                <div>
                  <span className="text-cyan-400/60">Last Rotation:</span>
                  <span className="text-cyan-100 ml-2">{key.lastRotation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Encryption Settings */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Encryption Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-2">Encryption Level</label>
            <select
              value={encryptionLevel}
              onChange={(e) => setEncryptionLevel(e.target.value)}
              className="w-full futuristic-input rounded-lg px-3 py-2 text-cyan-100 focus:outline-none"
            >
              <option value="maximum">Maximum (AES-256 + ChaCha20)</option>
              <option value="high">High (AES-256)</option>
              <option value="standard">Standard (AES-128)</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded text-cyan-500" />
              <span className="text-cyan-300">Auto key rotation (24h)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded text-cyan-500" />
              <span className="text-cyan-300">Zero-knowledge architecture</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded text-cyan-500" />
              <span className="text-cyan-300">Perfect forward secrecy</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded text-cyan-500" />
              <span className="text-cyan-300">Hardware security module</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptionManager;