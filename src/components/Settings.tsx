import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Bell, User, Palette, Lock, Database, Eye, Key } from 'lucide-react';
import ThemeManager from './customization/ThemeManager';
import WidgetManager from './customization/WidgetManager';
import InsiderTrackingManager from './customization/InsiderTrackingManager';
import ProfileCustomization from './customization/ProfileCustomization';
import ChatSystem from './social/ChatSystem';
import SecurityDashboard from './security/SecurityDashboard';
import EncryptionManager from './security/EncryptionManager';
import ThreatDetection from './security/ThreatDetection';
import AccessControl from './security/AccessControl';
import DataProtection from './security/DataProtection';
import BiometricAuth from './security/BiometricAuth';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customization' | 'security' | 'social'>('customization');
  const [activeCustomizationTab, setActiveCustomizationTab] = useState<'themes' | 'widgets' | 'tracking' | 'profile'>('themes');
  const [activeSecurityTab, setActiveSecurityTab] = useState<'dashboard' | 'encryption' | 'threats' | 'access' | 'data' | 'biometric'>('dashboard');
  const [activeSocialTab, setActiveSocialTab] = useState<'chat' | 'forums' | 'trading'>('chat');
  const [notifications, setNotifications] = useState({
    insiderTrades: true,
    priceAlerts: true,
    weeklyReports: false,
    marketNews: true
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    marketing: false
  });

  const renderCustomizationContent = () => {
    switch (activeCustomizationTab) {
      case 'themes':
        return <ThemeManager />;
      case 'widgets':
        return <WidgetManager />;
      case 'tracking':
        return <InsiderTrackingManager />;
      case 'profile':
        return <ProfileCustomization />;
      default:
        return <ThemeManager />;
    }
  };

  const renderSecurityContent = () => {
    switch (activeSecurityTab) {
      case 'dashboard':
        return <SecurityDashboard />;
      case 'encryption':
        return <EncryptionManager />;
      case 'threats':
        return <ThreatDetection />;
      case 'access':
        return <AccessControl />;
      case 'data':
        return <DataProtection />;
      case 'biometric':
        return <BiometricAuth />;
      default:
        return <SecurityDashboard />;
    }
  };

  const renderSocialContent = () => {
    switch (activeSocialTab) {
      case 'chat':
        return <ChatSystem />;
      case 'forums':
        return <div className="text-center py-12"><p className="text-gray-400">Forum settings coming soon...</p></div>;
      case 'trading':
        return <div className="text-center py-12"><p className="text-gray-400">Social trading settings coming soon...</p></div>;
      default:
        return <ChatSystem />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-300 mt-1">Customize your OmniInvest experience</p>
        </div>
        <div className="flex items-center space-x-2">
          <SettingsIcon className="h-5 w-5 text-blue-400" />
          <span className="text-sm text-blue-400">Your Preferences</span>
        </div>
      </div>

      {/* Main Settings Tabs */}
      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('customization')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'customization'
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Palette className="h-4 w-4" />
          <span>Customization</span>
        </button>
        
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'security'
              ? 'bg-green-500/20 text-green-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Shield className="h-4 w-4" />
          <span>Security</span>
        </button>
        
        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'social'
              ? 'bg-purple-500/20 text-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Social & Chat</span>
        </button>
      </div>

      {/* Customization Center */}
      {activeTab === 'customization' && (
        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Palette className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-cyan-400 font-orbitron">Customization Center</h2>
          </div>
          
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-6">
            {[
              { id: 'themes', label: 'Themes & Colors', icon: Palette },
              { id: 'widgets', label: 'Dashboard Widgets', icon: SettingsIcon },
              { id: 'tracking', label: 'Insider Tracking', icon: Eye },
              { id: 'profile', label: 'Profile & Social', icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCustomizationTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCustomizationTab === tab.id
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          
          {renderCustomizationContent()}
        </div>
      )}

      {/* Security Center */}
      {activeTab === 'security' && (
        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-5 w-5 text-green-400" />
          <h2 className="text-xl font-semibold text-cyan-400 font-orbitron">Security Center</h2>
        </div>
        
        <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-6">
          {[
            { id: 'dashboard', label: 'Overview', icon: Shield },
            { id: 'encryption', label: 'Encryption', icon: Lock },
            { id: 'threats', label: 'Threats', icon: Eye },
            { id: 'access', label: 'Access', icon: Key },
            { id: 'data', label: 'Data', icon: Database },
            { id: 'biometric', label: 'Biometric', icon: Fingerprint }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSecurityTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSecurityTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        {renderSecurityContent()}
      </div>
      )}

      {/* Social & Communication */}
      {activeTab === 'social' && (
        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-5 w-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-cyan-400 font-orbitron">Social & Communication</h2>
          </div>
          
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-6">
            {[
              { id: 'chat', label: 'Chat & AI Assistant', icon: User },
              { id: 'forums', label: 'Forum Settings', icon: SettingsIcon },
              { id: 'trading', label: 'Social Trading', icon: Eye }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSocialTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSocialTab === tab.id
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          
          {renderSocialContent()}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Investment Experience</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (3-5 years)</option>
                <option value="advanced">Advanced (5+ years)</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Risk Tolerance</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="h-5 w-5 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Insider Trade Alerts</span>
                <p className="text-sm text-gray-400">Get notified when tracked insiders make trades</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.insiderTrades}
                  onChange={(e) => setNotifications({...notifications, insiderTrades: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Price Alerts</span>
                <p className="text-sm text-gray-400">Notifications for significant price movements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.priceAlerts}
                  onChange={(e) => setNotifications({...notifications, priceAlerts: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Weekly Reports</span>
                <p className="text-sm text-gray-400">Weekly summary of market activities</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.weeklyReports}
                  onChange={(e) => setNotifications({...notifications, weeklyReports: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Market News</span>
                <p className="text-sm text-gray-400">Important market news and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.marketNews}
                  onChange={(e) => setNotifications({...notifications, marketNews: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-5 w-5 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-blue-400" />
                <span className="text-white">Change Password</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-white">Two-Factor Authentication</span>
              </div>
              <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">ENABLED</div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-purple-400" />
                <span className="text-white">Login Sessions</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Lock className="h-5 w-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Privacy</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Data Sharing</span>
                <p className="text-sm text-gray-400">Share anonymized data for research</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacy.dataSharing}
                  onChange={(e) => setPrivacy({...privacy, dataSharing: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Analytics Tracking</span>
                <p className="text-sm text-gray-400">Help improve the app with usage analytics</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacy.analytics}
                  onChange={(e) => setPrivacy({...privacy, analytics: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Marketing Communications</span>
                <p className="text-sm text-gray-400">Receive promotional emails and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacy.marketing}
                  onChange={(e) => setPrivacy({...privacy, marketing: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Account Actions</h3>
            <p className="text-gray-400 text-sm">Manage your account data and settings</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-colors">
              Export Data
            </button>
            <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg border border-red-400/30 hover:bg-red-500/30 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;