import React, { useEffect, useState } from 'react';
import { Monitor, Smartphone, Tablet, Globe, Shield, Zap } from 'lucide-react';

interface PlatformInfo {
  os: string;
  browser: string;
  device: string;
  isSupported: boolean;
  optimizations: string[];
}

const CrossPlatformOptimization: React.FC = () => {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo | null>(null);

  useEffect(() => {
    const detectPlatform = (): PlatformInfo => {
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      
      // Detect OS
      let os = 'Unknown';
      if (userAgent.includes('Mac')) os = 'macOS';
      else if (userAgent.includes('Win')) os = 'Windows';
      else if (userAgent.includes('Linux')) os = 'Linux';
      else if (userAgent.includes('Android')) os = 'Android';
      else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

      // Detect Browser
      let browser = 'Unknown';
      if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome';
      else if (userAgent.includes('Firefox')) browser = 'Firefox';
      else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
      else if (userAgent.includes('Edg')) browser = 'Edge';
      else if (userAgent.includes('Opera')) browser = 'Opera';

      // Detect Device Type
      let device = 'Desktop';
      if (userAgent.includes('Mobile')) device = 'Mobile';
      else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) device = 'Tablet';

      // Platform-specific optimizations
      const optimizations: string[] = [];
      
      if (os === 'macOS') {
        optimizations.push('Retina display optimization', 'Safari-specific CSS', 'Touch Bar support');
      }
      if (os === 'Windows') {
        optimizations.push('High DPI scaling', 'Edge compatibility', 'Windows notifications');
      }
      if (os === 'iOS') {
        optimizations.push('iOS Safari optimizations', 'Touch gestures', 'PWA support');
      }
      if (os === 'Android') {
        optimizations.push('Chrome mobile features', 'Android notifications', 'Responsive design');
      }
      if (browser === 'Chrome') {
        optimizations.push('V8 engine optimizations', 'WebGL acceleration', 'Service workers');
      }

      return {
        os,
        browser,
        device,
        isSupported: true, // OmniInvest supports all modern platforms
        optimizations
      };
    };

    setPlatformInfo(detectPlatform());
  }, []);

  if (!platformInfo) return null;

  const getPlatformIcon = () => {
    switch (platformInfo.device) {
      case 'Mobile': return <Smartphone className="h-6 w-6" />;
      case 'Tablet': return <Tablet className="h-6 w-6" />;
      default: return <Monitor className="h-6 w-6" />;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-green-500/20 rounded-lg">
          {getPlatformIcon()}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Platform Optimization</h3>
          <p className="text-sm text-gray-300">Optimized for your {platformInfo.os} {platformInfo.device}</p>
        </div>
        <div className="ml-auto">
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-400/30">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Fully Supported</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <Globe className="h-5 w-5 text-blue-400 mx-auto mb-2" />
          <div className="text-sm font-medium text-white">{platformInfo.browser}</div>
          <div className="text-xs text-gray-400">Browser</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <Monitor className="h-5 w-5 text-purple-400 mx-auto mb-2" />
          <div className="text-sm font-medium text-white">{platformInfo.os}</div>
          <div className="text-xs text-gray-400">Operating System</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <Zap className="h-5 w-5 text-yellow-400 mx-auto mb-2" />
          <div className="text-sm font-medium text-white">{platformInfo.device}</div>
          <div className="text-xs text-gray-400">Device Type</div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-white mb-2">Active Optimizations:</h4>
        <div className="flex flex-wrap gap-2">
          {platformInfo.optimizations.map((optimization, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-400/30"
            >
              {optimization}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrossPlatformOptimization;