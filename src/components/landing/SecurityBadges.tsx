import React from 'react';
import { Shield, Lock, Eye, CheckCircle, Globe, Award } from 'lucide-react';

const SecurityBadges: React.FC = () => {
  return (
    <div className="py-12 bg-gradient-to-r from-green-500/10 to-blue-500/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Bank-Level Security & Trust</h3>
          <p className="text-gray-300">Your data is protected with the same security standards used by major financial institutions</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="text-center p-4 bg-white/10 rounded-lg border border-green-400/30">
            <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-white">SSL Encrypted</div>
            <div className="text-xs text-gray-400">256-bit Security</div>
          </div>

          <div className="text-center p-4 bg-white/10 rounded-lg border border-blue-400/30">
            <Lock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-white">GDPR Compliant</div>
            <div className="text-xs text-gray-400">Privacy Protected</div>
          </div>

          <div className="text-center p-4 bg-white/10 rounded-lg border border-purple-400/30">
            <Eye className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-white">Zero Knowledge</div>
            <div className="text-xs text-gray-400">We Can't See Data</div>
          </div>

          <div className="text-center p-4 bg-white/10 rounded-lg border border-yellow-400/30">
            <CheckCircle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-white">SOC 2 Ready</div>
            <div className="text-xs text-gray-400">Enterprise Grade</div>
          </div>

          <div className="text-center p-4 bg-white/10 rounded-lg border border-cyan-400/30">
            <Globe className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-white">Global CDN</div>
            <div className="text-xs text-gray-400">Fast Worldwide</div>
          </div>

          <div className="text-center p-4 bg-white/10 rounded-lg border border-red-400/30">
            <Award className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-white">99.99% Uptime</div>
            <div className="text-xs text-gray-400">Always Available</div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-green-400 font-medium">Your data is safer with us than with most banks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;