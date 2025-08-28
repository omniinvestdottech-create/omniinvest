import React, { useState } from 'react';
import { Users, Lock, Key, Shield, Eye, Clock, Globe, Smartphone } from 'lucide-react';

interface UserSession {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActivity: string;
  status: 'active' | 'expired' | 'suspicious';
  browser: string;
  isCurrent: boolean;
}

interface AccessPermission {
  id: string;
  resource: string;
  level: 'read' | 'write' | 'admin' | 'owner';
  granted: string;
  expires: string;
  source: string;
}

const mockUserSessions: UserSession[] = [
  {
    id: '1',
    device: 'MacBook Pro',
    location: 'New York, US',
    ipAddress: '192.168.1.***',
    lastActivity: '2 minutes ago',
    status: 'active',
    browser: 'Chrome 120.0.0.0',
    isCurrent: true
  },
  {
    id: '2',
    device: 'iPhone 15 Pro',
    location: 'New York, US',
    ipAddress: '192.168.1.***',
    lastActivity: '1 hour ago',
    status: 'active',
    browser: 'Safari 17.2',
    isCurrent: false
  },
  {
    id: '3',
    device: 'Unknown Device',
    location: 'Moscow, RU',
    ipAddress: '45.123.***.*',
    lastActivity: '2 days ago',
    status: 'suspicious',
    browser: 'Unknown',
    isCurrent: false
  }
];

const mockPermissions: AccessPermission[] = [
  {
    id: '1',
    resource: 'Portfolio Data',
    level: 'owner',
    granted: '2024-01-01',
    expires: 'Never',
    source: 'Account Creation'
  },
  {
    id: '2',
    resource: 'AI Analytics',
    level: 'read',
    granted: '2024-01-01',
    expires: '2024-12-31',
    source: 'Subscription'
  },
  {
    id: '3',
    resource: 'API Access',
    level: 'write',
    granted: '2024-01-15',
    expires: '2024-02-15',
    source: 'Trial Period'
  }
];

const AccessControl: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'sessions' | 'permissions' | 'audit'>('sessions');

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'expired': return 'text-gray-400 bg-gray-500/20';
      case 'suspicious': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPermissionColor = (level: string) => {
    switch (level) {
      case 'owner': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
      case 'admin': return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'write': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'read': return 'text-green-400 bg-green-500/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const terminateSession = (sessionId: string) => {
    console.log(`Terminating session ${sessionId}`);
    // In real app, this would revoke the session
  };

  const revokePermission = (permissionId: string) => {
    console.log(`Revoking permission ${permissionId}`);
    // In real app, this would revoke the permission
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Access Control</h2>
          <p className="text-cyan-300/80 mt-1">Manage sessions, permissions, and access logs</p>
        </div>
        <div className="flex items-center space-x-2">
          <Lock className="h-5 w-5 text-green-400" />
          <span className="text-sm text-green-400">Zero Trust Active</span>
        </div>
      </div>

      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setSelectedTab('sessions')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'sessions'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Smartphone className="h-4 w-4" />
          <span>Active Sessions</span>
        </button>
        
        <button
          onClick={() => setSelectedTab('permissions')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'permissions'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Key className="h-4 w-4" />
          <span>Permissions</span>
        </button>
        
        <button
          onClick={() => setSelectedTab('audit')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'audit'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Eye className="h-4 w-4" />
          <span>Audit Log</span>
        </button>
      </div>

      {selectedTab === 'sessions' && (
        <div className="space-y-4">
          {mockUserSessions.map((session) => (
            <div
              key={session.id}
              className="glass-effect rounded-xl border border-cyan-500/30 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-cyan-100">{session.device}</h3>
                      {session.isCurrent && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-400/30">
                          CURRENT
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs ${getSessionStatusColor(session.status)}`}>
                        {session.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-cyan-400/60 space-y-1">
                      <div>Location: {session.location}</div>
                      <div>IP: {session.ipAddress}</div>
                      <div>Browser: {session.browser}</div>
                      <div>Last Activity: {session.lastActivity}</div>
                    </div>
                  </div>
                </div>
                
                {!session.isCurrent && (
                  <button
                    onClick={() => terminateSession(session.id)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded border border-red-400/30 hover:bg-red-500/30 transition-colors text-sm"
                  >
                    Terminate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'permissions' && (
        <div className="space-y-4">
          {mockPermissions.map((permission) => (
            <div
              key={permission.id}
              className="glass-effect rounded-xl border border-cyan-500/30 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Key className="h-6 w-6 text-white" />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-cyan-100">{permission.resource}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getPermissionColor(permission.level)}`}>
                        {permission.level.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-cyan-400/60 space-y-1">
                      <div>Granted: {permission.granted}</div>
                      <div>Expires: {permission.expires}</div>
                      <div>Source: {permission.source}</div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => revokePermission(permission.id)}
                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded border border-red-400/30 hover:bg-red-500/30 transition-colors text-sm"
                >
                  Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'audit' && (
        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Security Audit Trail</h3>
          <div className="space-y-3">
            {[
              { action: 'Login successful', time: '2 minutes ago', risk: 'low' },
              { action: 'Portfolio accessed', time: '5 minutes ago', risk: 'low' },
              { action: 'API key generated', time: '1 hour ago', risk: 'medium' },
              { action: 'Failed login attempt blocked', time: '2 hours ago', risk: 'high' },
              { action: 'Password changed', time: '1 day ago', risk: 'low' }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <span className="text-cyan-100">{event.action}</span>
                  <div className="text-xs text-cyan-400/60">{event.time}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(event.risk)}`}>
                  {event.risk.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessControl;