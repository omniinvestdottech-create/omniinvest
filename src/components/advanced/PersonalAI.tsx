import React, { useState } from 'react';
import { MessageCircle, Mic, Brain, User, Target, TrendingUp, Lightbulb, Settings } from 'lucide-react';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  actionable?: boolean;
  confidence?: number;
}

interface PersonalProfile {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentGoals: string[];
  timeHorizon: string;
  preferredSectors: string[];
  learningStyle: 'visual' | 'analytical' | 'social';
  tradingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

const mockConversation: AIMessage[] = [
  {
    id: '1',
    type: 'ai',
    content: 'Good morning! I\'ve analyzed your portfolio overnight and noticed TSLA has gained 12% since Elon\'s latest insider purchase. Based on your moderate risk profile, I recommend taking partial profits. Would you like me to explain my reasoning?',
    timestamp: '9:23 AM',
    actionable: true,
    confidence: 87
  },
  {
    id: '2',
    type: 'user',
    content: 'Yes, tell me more about the TSLA situation',
    timestamp: '9:24 AM'
  },
  {
    id: '3',
    type: 'ai',
    content: 'Perfect! Here\'s my analysis: 1) Elon purchased $2.5M worth 3 days ago, 2) Similar patterns historically led to 15-20% gains, 3) You\'re now up 12%, which is 80% of the typical gain, 4) Your risk tolerance suggests securing profits at this level. I recommend selling 30-40% of your position to lock in gains while maintaining upside exposure.',
    timestamp: '9:24 AM',
    actionable: true,
    confidence: 91
  }
];

const PersonalAI: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>(mockConversation);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiPersonality, setAiPersonality] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');

  const userProfile: PersonalProfile = {
    riskTolerance: 'moderate',
    investmentGoals: ['Long-term growth', 'Income generation', 'Capital preservation'],
    timeHorizon: '10+ years',
    preferredSectors: ['Technology', 'Healthcare', 'Clean Energy'],
    learningStyle: 'analytical',
    tradingFrequency: 'weekly'
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionable: Math.random() > 0.5,
        confidence: Math.floor(Math.random() * 20) + 80
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      'Based on your portfolio analysis, I\'ve identified 3 optimization opportunities that align with your moderate risk tolerance...',
      'Interesting question! Let me analyze the latest insider data and cross-reference it with your investment goals...',
      'I\'ve been monitoring that stock for you. Here\'s what the quantum analysis reveals about its potential...',
      'Great timing on that question! I just processed new insider filings that directly impact your holdings...'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, this would integrate with Web Speech API
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Personal AI Advisor</h2>
          <p className="text-cyan-300/80 mt-1">Your personalized investment intelligence assistant</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-400" />
          <span className="text-sm text-purple-400">Learning Your Preferences</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* AI Personality Settings */}
        <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">AI Personality</h3>
          
          <div className="space-y-3">
            {['conservative', 'balanced', 'aggressive'].map((personality) => (
              <button
                key={personality}
                onClick={() => setAiPersonality(personality as any)}
                className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                  aiPersonality === personality
                    ? 'border-cyan-400/50 bg-cyan-500/10'
                    : 'border-cyan-500/30 hover:border-cyan-400/50'
                }`}
              >
                <div className="text-left">
                  <div className="font-medium text-cyan-100 capitalize">{personality}</div>
                  <div className="text-xs text-cyan-400/60">
                    {personality === 'conservative' && 'Risk-averse, safety-focused advice'}
                    {personality === 'balanced' && 'Balanced risk-reward recommendations'}
                    {personality === 'aggressive' && 'High-growth, opportunity-focused'}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-cyan-500/30">
            <h4 className="text-sm font-medium text-cyan-400 mb-3">Your Profile</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-cyan-400/60">Risk Tolerance:</span>
                <span className="text-cyan-100">{userProfile.riskTolerance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyan-400/60">Time Horizon:</span>
                <span className="text-cyan-100">{userProfile.timeHorizon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyan-400/60">Trading Style:</span>
                <span className="text-cyan-100">{userProfile.tradingFrequency}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3 glass-effect rounded-xl border border-cyan-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">AI Conversation</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-sm text-green-400">AI Online</span>
            </div>
          </div>

          <div className="h-96 overflow-y-auto space-y-4 mb-4 scrollbar-hide">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500/20 text-blue-100 border border-blue-400/30'
                    : 'bg-purple-500/20 text-purple-100 border border-purple-400/30'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-60">{message.timestamp}</span>
                    {message.confidence && (
                      <span className="text-xs text-green-400">{message.confidence}% confident</span>
                    )}
                  </div>
                  {message.actionable && (
                    <button className="mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs border border-green-400/30 hover:bg-green-500/30 transition-colors">
                      Take Action
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything about your investments..."
                className="w-full futuristic-input rounded-lg px-4 py-3 pr-12 text-cyan-100 focus:outline-none"
              />
              <button
                onClick={toggleVoiceInput}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${
                  isListening ? 'text-red-400' : 'text-cyan-400'
                } hover:text-cyan-300 transition-colors`}
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={sendMessage}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* AI Insights Dashboard */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Personalized Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-400/30">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-green-400" />
              <span className="font-medium text-green-400">Portfolio Optimization</span>
            </div>
            <p className="text-sm text-green-300/80">
              Your tech allocation is 15% above optimal. Consider rebalancing into healthcare for better diversification.
            </p>
          </div>
          
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-blue-400">Learning Opportunity</span>
            </div>
            <p className="text-sm text-blue-300/80">
              Based on your questions, I recommend the "Options Strategies" course to enhance your knowledge.
            </p>
          </div>
          
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-yellow-400" />
              <span className="font-medium text-yellow-400">Market Opportunity</span>
            </div>
            <p className="text-sm text-yellow-300/80">
              Clean energy insider activity suggests a 20% sector rally incoming. Consider increasing exposure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAI;