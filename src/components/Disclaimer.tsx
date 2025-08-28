import React from 'react';
import { AlertTriangle, Shield, BookOpen, Scale } from 'lucide-react';

interface DisclaimerProps {
  onAccept: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onAccept }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">OmniInvest</h1>
          <p className="text-xl text-blue-200">Elite Investment Intelligence Platform</p>
        </div>

        <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-amber-400 mb-3">Important Legal Disclaimer</h2>
              <div className="text-amber-100 space-y-3 text-sm leading-relaxed">
                <p>
                  <strong>FOR EDUCATIONAL PURPOSES ONLY:</strong> All content, data, analysis, and tools provided by OmniInvest 
                  are intended solely for educational and informational purposes. This platform does not constitute financial 
                  advice, investment recommendations, or solicitation to buy or sell securities.
                </p>
                <p>
                  <strong>NO FINANCIAL RESPONSIBILITY:</strong> OmniInvest and its affiliates are not responsible for any 
                  investment decisions, financial losses, or consequences resulting from the use of this platform. All investment 
                  decisions are made at your own risk and discretion.
                </p>
                <p>
                  <strong>CONSULT PROFESSIONALS:</strong> Always consult with qualified financial advisors, tax professionals, 
                  and legal counsel before making any investment decisions. Past performance does not guarantee future results.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Educational Content</h3>
            <p className="text-gray-300 text-sm">
              Learn about investment strategies, market analysis, and financial literacy through our comprehensive educational resources.
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Data Security</h3>
            <p className="text-gray-300 text-sm">
              Your privacy and data security are our top priorities. All information is encrypted and protected using industry-leading security measures.
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <Scale className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Legal Compliance</h3>
            <p className="text-gray-300 text-sm">
              All data tracking and analysis comply with applicable securities laws and regulations. We track only publicly available disclosure information.
            </p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 border border-white/20 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Key Points to Remember:</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
              <span>All investment decisions are your own responsibility</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
              <span>Past performance does not indicate future results</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
              <span>Always conduct your own research and due diligence</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
              <span>Consider your risk tolerance and investment objectives</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
              <span>Diversification and professional advice are recommended</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <input 
              type="checkbox" 
              id="acknowledge" 
              className="rounded text-blue-500 focus:ring-blue-400" 
              required 
            />
            <label htmlFor="acknowledge" className="text-sm text-gray-300">
              I acknowledge that I have read, understood, and agree to the terms stated above
            </label>
          </div>
          
          <button
            onClick={onAccept}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
          >
            Continue to OmniInvest
          </button>
          
          <p className="text-xs text-gray-400 mt-4">
            By continuing, you confirm your understanding of the educational nature of this platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;