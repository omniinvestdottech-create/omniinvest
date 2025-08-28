import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Bot, User, Crown, Star, Paperclip, Smile } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  sender: string;
  content: string;
  timestamp: string;
  avatar?: string;
  membershipTier?: string;
  attachments?: string[];
  reactions?: { emoji: string; count: number; users: string[] }[];
}

interface ChatRoom {
  id: string;
  name: string;
  type: 'public' | 'private' | 'ai_assistant';
  participants: number;
  lastMessage: string;
  unreadCount: number;
}

const mockChatRooms: ChatRoom[] = [
  {
    id: 'ai-assistant',
    name: 'AI Financial Assistant',
    type: 'ai_assistant',
    participants: 1,
    lastMessage: 'How can I help you with your investments today?',
    unreadCount: 0
  },
  {
    id: 'general',
    name: 'General Discussion',
    type: 'public',
    participants: 1247,
    lastMessage: 'TSLA looking bullish after Elon\'s latest purchase',
    unreadCount: 3
  },
  {
    id: 'elite-circle',
    name: 'Elite Investors Circle',
    type: 'private',
    participants: 89,
    lastMessage: 'Private equity opportunities in Q1',
    unreadCount: 1
  },
  {
    id: 'tech-stocks',
    name: 'Tech Stock Analysis',
    type: 'public',
    participants: 567,
    lastMessage: 'NVDA earnings predictions?',
    unreadCount: 0
  }
];

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'ai',
    sender: 'OmniInvest AI',
    content: 'Hello! I\'m your personal AI financial assistant. I can help you analyze investments, explain market trends, answer questions about insider trading, and provide personalized investment insights. What would you like to know?',
    timestamp: '10:30 AM',
    avatar: 'AI'
  },
  {
    id: '2',
    type: 'user',
    sender: 'You',
    content: 'What do you think about Tesla\'s recent performance?',
    timestamp: '10:32 AM'
  },
  {
    id: '3',
    type: 'ai',
    sender: 'OmniInvest AI',
    content: 'Great question! Tesla (TSLA) has shown strong momentum recently. Here\'s my analysis:\n\n📈 **Price Action**: Up 12.3% in the last week\n🔥 **Insider Activity**: Elon Musk purchased $2.5M worth 3 days ago\n🤖 **AI Confidence**: 94% bullish rating\n📊 **Technical**: Breaking above key resistance at $240\n\nBased on historical patterns when Elon makes similar purchases, we typically see 15-20% gains over 2-4 weeks. Current momentum suggests the trend may continue. Would you like me to set up a price alert for you?',
    timestamp: '10:32 AM',
    avatar: 'AI'
  }
];

const ChatSystem: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom>(mockChatRooms[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response for AI assistant
    if (selectedRoom.type === 'ai_assistant') {
      setIsTyping(true);
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          sender: 'OmniInvest AI',
          content: generateAIResponse(newMessage),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: 'AI'
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      'Based on my analysis of current market conditions and insider activity, here\'s what I recommend...',
      'That\'s an excellent question! Let me analyze the latest data for you...',
      'I\'ve been monitoring that stock closely. Here\'s what the AI models are showing...',
      'Great timing on that question! I just processed new insider filings that are relevant...',
      'Let me break down the technical and fundamental analysis for you...',
      'Based on historical patterns and current insider sentiment, here\'s my assessment...'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getTierIcon = (tier?: string) => {
    switch (tier) {
      case 'omniscient-elite': return <Crown className="h-3 w-3 text-yellow-400" />;
      case 'wealth-architect': return <Star className="h-3 w-3 text-purple-400" />;
      case 'market-navigator': return <User className="h-3 w-3 text-blue-400" />;
      default: return null;
    }
  };

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'ai_assistant': return 'text-purple-400 bg-purple-500/20';
      case 'private': return 'text-yellow-400 bg-yellow-500/20';
      case 'public': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Chat Rooms Sidebar */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Chat Rooms</h3>
        <div className="space-y-2">
          {mockChatRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                selectedRoom.id === room.id
                  ? 'bg-blue-500/20 border border-blue-400/30'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white text-sm">{room.name}</span>
                {room.unreadCount > 0 && (
                  <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs">
                    {room.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs ${getRoomTypeColor(room.type)}`}>
                  {room.type === 'ai_assistant' ? <Bot className="h-3 w-3" /> : 
                   room.type === 'private' ? <Crown className="h-3 w-3" /> : 
                   <User className="h-3 w-3" />}
                </span>
                <span className="text-xs text-gray-400">{room.participants} users</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 truncate">{room.lastMessage}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getRoomTypeColor(selectedRoom.type)}`}>
                {selectedRoom.type === 'ai_assistant' ? <Bot className="h-5 w-5" /> : 
                 selectedRoom.type === 'private' ? <Crown className="h-5 w-5" /> : 
                 <User className="h-5 w-5" />}
              </div>
              <div>
                <h3 className="font-semibold text-white">{selectedRoom.name}</h3>
                <p className="text-sm text-gray-400">{selectedRoom.participants} participants</p>
              </div>
            </div>
            
            {selectedRoom.type === 'ai_assistant' && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm text-green-400">AI Online</span>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${
                message.type === 'user' 
                  ? 'bg-blue-500/20 text-blue-100 border border-blue-400/30' 
                  : message.type === 'ai'
                  ? 'bg-purple-500/20 text-purple-100 border border-purple-400/30'
                  : 'bg-gray-500/20 text-gray-100 border border-gray-400/30'
              } rounded-lg p-4`}>
                <div className="flex items-center space-x-2 mb-2">
                  {message.avatar && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{message.avatar}</span>
                    </div>
                  )}
                  <span className="font-medium text-sm">{message.sender}</span>
                  {message.membershipTier && getTierIcon(message.membershipTier)}
                  <span className="text-xs opacity-60">{message.timestamp}</span>
                </div>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                
                {message.reactions && (
                  <div className="flex space-x-2 mt-2">
                    {message.reactions.map((reaction, index) => (
                      <button
                        key={index}
                        className="flex items-center space-x-1 px-2 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition-colors"
                      >
                        <span>{reaction.emoji}</span>
                        <span>{reaction.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-purple-500/20 text-purple-100 border border-purple-400/30 rounded-lg p-4 max-w-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-sm">OmniInvest AI</span>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Paperclip className="h-4 w-4" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={
                  selectedRoom.type === 'ai_assistant' 
                    ? 'Ask me anything about investments...'
                    : 'Type your message...'
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Smile className="h-4 w-4" />
            </button>
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          
          {selectedRoom.type === 'ai_assistant' && (
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                'Analyze my portfolio',
                'What are the best stocks to buy?',
                'Explain insider trading',
                'Market outlook for next week',
                'Risk assessment help'
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setNewMessage(suggestion)}
                  className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs border border-purple-400/30 hover:bg-purple-500/30 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;