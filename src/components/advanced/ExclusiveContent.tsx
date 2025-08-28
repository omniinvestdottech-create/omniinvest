import React, { useState } from 'react';
import { Video, Users, Calendar, Star, Play, Lock, Crown, Award } from 'lucide-react';

interface ExclusiveContent {
  id: string;
  type: 'video_call' | 'research_report' | 'discord_channel' | 'conference';
  title: string;
  description: string;
  host: string;
  date: string;
  duration?: string;
  participants?: number;
  maxParticipants?: number;
  price: number;
  tier: string;
  status: 'upcoming' | 'live' | 'completed' | 'recording_available';
  thumbnail: string;
}

const mockContent: ExclusiveContent[] = [
  {
    id: '1',
    type: 'video_call',
    title: 'Live Q&A with Elon Musk',
    description: 'Exclusive 1-hour video call discussing Tesla\'s future, SpaceX missions, and investment strategies',
    host: 'Elon Musk',
    date: '2024-01-15 14:00',
    duration: '60 minutes',
    participants: 47,
    maxParticipants: 50,
    price: 2500,
    tier: 'Omniscient Elite',
    status: 'upcoming',
    thumbnail: 'EM'
  },
  {
    id: '2',
    type: 'research_report',
    title: 'AI Revolution: The Next Decade',
    description: 'Comprehensive 50-page research report by former Goldman Sachs AI analyst covering the next wave of AI investments',
    host: 'Dr. Sarah Chen',
    date: '2024-01-10',
    price: 500,
    tier: 'Wealth Architect',
    status: 'completed',
    thumbnail: 'SC'
  },
  {
    id: '3',
    type: 'discord_channel',
    title: 'Millionaire Investors Circle',
    description: 'Private Discord channel with verified millionaire investors sharing real-time trades and strategies',
    host: 'OmniInvest Team',
    date: 'Ongoing',
    participants: 234,
    maxParticipants: 500,
    price: 0,
    tier: 'Wealth Architect',
    status: 'live',
    thumbnail: 'MI'
  },
  {
    id: '4',
    type: 'conference',
    title: 'OmniInvest Elite Summit 2024',
    description: 'Annual conference featuring keynotes from Warren Buffett, Ray Dalio, and other legendary investors',
    host: 'Multiple Speakers',
    date: '2024-03-15',
    duration: '2 days',
    participants: 156,
    maxParticipants: 200,
    price: 5000,
    tier: 'Omniscient Elite',
    status: 'upcoming',
    thumbnail: 'ES'
  }
];

const ExclusiveContent: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<ExclusiveContent>(mockContent[0]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'live' | 'completed'>('upcoming');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video_call': return <Video className="h-5 w-5" />;
      case 'research_report': return <Star className="h-5 w-5" />;
      case 'discord_channel': return <Users className="h-5 w-5" />;
      case 'conference': return <Award className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video_call': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'research_report': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'discord_channel': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
      case 'conference': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-400 bg-blue-500/20';
      case 'live': return 'text-green-400 bg-green-500/20 animate-pulse';
      case 'completed': return 'text-gray-400 bg-gray-500/20';
      case 'recording_available': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Omniscient Elite': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'Wealth Architect': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
      case 'Market Navigator': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'Ongoing') return 'Ongoing';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredContent = mockContent.filter(content => {
    if (activeTab === 'upcoming') return content.status === 'upcoming';
    if (activeTab === 'live') return content.status === 'live';
    if (activeTab === 'completed') return content.status === 'completed' || content.status === 'recording_available';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Exclusive Content & Access</h2>
          <p className="text-cyan-300/80 mt-1">Premium content and direct access to investment legends</p>
        </div>
        <div className="flex items-center space-x-2">
          <Crown className="h-5 w-5 text-yellow-400" />
          <span className="text-sm text-yellow-400">Elite Members Only</span>
        </div>
      </div>

      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'upcoming'
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>Upcoming</span>
        </button>
        
        <button
          onClick={() => setActiveTab('live')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'live'
              ? 'bg-green-500/20 text-green-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Play className="h-4 w-4" />
          <span>Live Now</span>
        </button>
        
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'completed'
              ? 'bg-purple-500/20 text-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Video className="h-4 w-4" />
          <span>Recordings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">
            {activeTab === 'upcoming' && 'Upcoming Events'}
            {activeTab === 'live' && 'Live Now'}
            {activeTab === 'completed' && 'Available Recordings'}
          </h3>
          {filteredContent.map((content) => (
            <div
              key={content.id}
              onClick={() => setSelectedContent(content)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                selectedContent.id === content.id
                  ? 'glass-effect border-cyan-400/50'
                  : 'glass-effect border-cyan-500/30 hover:border-cyan-400/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{content.thumbnail}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-cyan-100">{content.title}</h4>
                    <p className="text-xs text-cyan-400/60">{content.host}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(content.type)}`}>
                    {content.type.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(content.status)}`}>
                    {content.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-cyan-300/80 mb-3 line-clamp-2">{content.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400/60">{formatDate(content.date)}</span>
                {content.price > 0 ? (
                  <span className="text-green-400 font-medium">${content.price}</span>
                ) : (
                  <span className="text-blue-400">Included</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Content Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-3 rounded-lg border ${getTypeColor(selectedContent.type)}`}>
                    {getTypeIcon(selectedContent.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 font-orbitron">
                      {selectedContent.title}
                    </h3>
                    <p className="text-cyan-300/80">Hosted by {selectedContent.host}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm border ${getTierColor(selectedContent.tier)}`}>
                  {selectedContent.tier}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedContent.status)}`}>
                  {selectedContent.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-cyan-300/90 mb-6">{selectedContent.description}</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-lg font-bold text-cyan-400 font-orbitron">
                  {formatDate(selectedContent.date)}
                </div>
                <div className="text-sm text-cyan-400/60">Date & Time</div>
              </div>
              {selectedContent.duration && (
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold text-blue-400 font-orbitron">
                    {selectedContent.duration}
                  </div>
                  <div className="text-sm text-cyan-400/60">Duration</div>
                </div>
              )}
              {selectedContent.participants && (
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-lg font-bold text-purple-400 font-orbitron">
                    {selectedContent.participants}/{selectedContent.maxParticipants || '∞'}
                  </div>
                  <div className="text-sm text-cyan-400/60">Participants</div>
                </div>
              )}
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-lg font-bold text-green-400 font-orbitron">
                  {selectedContent.price > 0 ? `$${selectedContent.price}` : 'Included'}
                </div>
                <div className="text-sm text-cyan-400/60">Price</div>
              </div>
            </div>

            {selectedContent.status === 'upcoming' && (
              <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-400 mb-2">What to Expect:</h4>
                <ul className="text-sm text-blue-300/80 space-y-1">
                  <li>• Direct access to industry legends</li>
                  <li>• Real-time Q&A opportunities</li>
                  <li>• Exclusive insights not available elsewhere</li>
                  <li>• Recording available for 30 days after event</li>
                </ul>
              </div>
            )}

            {selectedContent.status === 'live' && (
              <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4 mb-6 animate-pulse">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <h4 className="font-semibold text-green-400">LIVE NOW</h4>
                </div>
                <p className="text-sm text-green-300/80">
                  This event is currently live. Join now to participate in real-time discussions.
                </p>
              </div>
            )}

            <div className="flex space-x-4">
              {selectedContent.status === 'upcoming' && (
                <>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                    Reserve Spot
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                    Add to Calendar
                  </button>
                </>
              )}
              
              {selectedContent.status === 'live' && (
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 animate-pulse">
                  Join Live Event
                </button>
              )}
              
              {(selectedContent.status === 'completed' || selectedContent.status === 'recording_available') && (
                <>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                    Watch Recording
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                    Download
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Upgrade Notice for Lower Tiers */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="h-6 w-6 text-yellow-400" />
              <h4 className="text-lg font-semibold text-yellow-400">Exclusive Access Required</h4>
            </div>
            <p className="text-yellow-300/80 mb-4">
              This premium content is available to {selectedContent.tier} members and above. 
              Upgrade your membership to gain access to exclusive events, research reports, and direct access to investment legends.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Upgrade to {selectedContent.tier}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveContent;