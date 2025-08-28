import React, { useState } from 'react';
import { Mail, Gift, Star, CheckCircle, ArrowRight } from 'lucide-react';

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
  className?: string;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ onSubmit, className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubmit(email);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail('');
    }
  };

  if (isSubmitted) {
    return (
      <div className={`p-6 bg-green-500/20 border border-green-400/30 rounded-xl text-center ${className}`}>
        <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-400 mb-2">You're In!</h3>
        <p className="text-green-300">Check your email for exclusive insider trading secrets and early access details.</p>
      </div>
    );
  }

  return (
    <div className={`p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl ${className}`}>
      <div className="text-center mb-6">
        <Gift className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Get Free Insider Trading Secrets</h3>
        <p className="text-gray-300">
          Join 50,000+ investors getting exclusive insights into elite trading patterns
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-3 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <span>Get Free Insider Secrets</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-3 text-sm text-gray-300">
          <Star className="h-4 w-4 text-yellow-400" />
          <span>Instant access to "Politicians Who Beat Wall Street" report</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-300">
          <Star className="h-4 w-4 text-yellow-400" />
          <span>Weekly insider trading alerts and market predictions</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-300">
          <Star className="h-4 w-4 text-yellow-400" />
          <span>Exclusive early access to OmniInvest platform</span>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-400">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default EmailCapture;