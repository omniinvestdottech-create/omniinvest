import React, { useState } from 'react';
import { Brain, User, TrendingUp, AlertCircle, Target, Zap, Eye, Heart } from 'lucide-react';

interface PsychProfile {
  id: string;
  name: string;
  type: 'insider' | 'user';
  traits: {
    riskTolerance: number;
    emotionalStability: number;
    contrarian: number;
    momentum: number;
    patience: number;
  };
  tradingPatterns: {
    panicSelling: number;
    fomo: number;
    profitTaking: number;
    averaging: number;
  };
  stressIndicators: {
    volatilityResponse: 'calm' | 'moderate' | 'reactive';
    lossAversion: number;
    overconfidence: number;
  };
  predictions: string[];
}

const mockProfiles: PsychProfile[] = [
  {
    id: '1',
    name: 'Elon Musk',
    type: 'insider',
    traits: {
      riskTolerance: 95,
      emotionalStability: 60,
      contrarian: 85,
      momentum: 90,
      patience: 40
    },
    tradingPatterns: {
      panicSelling: 15,
      fomo: 70,
      profitTaking: 45,
      averaging: 80
    },
    stressIndicators: {
      volatilityResponse: 'reactive',
      lossAversion: 30,
      overconfidence: 85
    },
    predictions: [
      'Likely to buy more on any TSLA dip >10%',
      'Will increase crypto exposure if BTC drops below $40k',
      'May sell other holdings to fund SpaceX if needed'
    ]
  },
  {
    id: '2',
    name: 'Warren Buffett',
    type: 'insider',
    traits: {
      riskTolerance: 70,
      emotionalStability: 95,
      contrarian: 90,
      momentum: 20,
      patience: 98
    },
    tradingPatterns: {
      panicSelling: 5,
      fomo: 10,
      profitTaking: 85,
      averaging: 95
    },
    stressIndicators: {
      volatilityResponse: 'calm',
      lossAversion: 60,
      overconfidence: 25
    },
    predictions: [
      'Will continue buying on market weakness',
      'Unlikely to chase momentum stocks',
      'May increase cash position if market overheats'
    ]
  }
];

const BehavioralAnalytics: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<PsychProfile>(mockProfiles[0]);
  const [analysisType, setAnalysisType] = useState<'traits' | 'patterns' | 'stress' | 'predictions'>('traits');

  const getTraitColor = (value: number) => {
    if (value >= 80) return 'text-red-400 bg-red-500/20';
    if (value >= 60) return 'text-yellow-400 bg-yellow-500/20';
    if (value >= 40) return 'text-blue-400 bg-blue-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  const getStressColor = (response: string) => {
    switch (response) {
      case 'calm': return 'text-green-400 bg-green-500/20';
      case 'moderate': return 'text-yellow-400 bg-yellow-500/20';
      case 'reactive': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Behavioral Analytics</h2>
          <p className="text-cyan-300/80 mt-1">Psychological profiling and behavioral prediction engine</p>
        </div>
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-pink-400" />
          <span className="text-sm text-pink-400">Emotion AI Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Selector */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">Profiles</h3>
          {mockProfiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setSelectedProfile(profile)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedProfile.id === profile.id
                  ? 'glass-effect border-cyan-400/50'
                  : 'glass-effect border-cyan-500/30 hover:border-cyan-400/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-cyan-100">{profile.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    profile.type === 'insider' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {profile.type.toUpperCase()}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Analysis Dashboard */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            {[
              { id: 'traits', label: 'Personality Traits', icon: User },
              { id: 'patterns', label: 'Trading Patterns', icon: TrendingUp },
              { id: 'stress', label: 'Stress Response', icon: AlertCircle },
              { id: 'predictions', label: 'Behavioral Predictions', icon: Target }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAnalysisType(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    analysisType === tab.id
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

          <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
            <h3 className="text-xl font-bold text-cyan-400 font-orbitron mb-6">
              {selectedProfile.name} - Psychological Profile
            </h3>

            {analysisType === 'traits' && (
              <div className="space-y-4">
                {Object.entries(selectedProfile.traits).map(([trait, value]) => (
                  <div key={trait} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300 capitalize">{trait.replace(/([A-Z])/g, ' $1')}</span>
                      <span className={`font-bold ${getTraitColor(value).split(' ')[0]}`}>{value}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getTraitColor(value).includes('red') ? 'bg-red-500' : 
                          getTraitColor(value).includes('yellow') ? 'bg-yellow-500' :
                          getTraitColor(value).includes('blue') ? 'bg-blue-500' : 'bg-green-500'}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {analysisType === 'patterns' && (
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(selectedProfile.tradingPatterns).map(([pattern, value]) => (
                  <div key={pattern} className="text-center p-4 bg-white/5 rounded-lg">
                    <div className={`text-2xl font-bold mb-2 ${getTraitColor(value).split(' ')[0]}`}>
                      {value}%
                    </div>
                    <div className="text-sm text-cyan-400/60 capitalize">
                      {pattern.replace(/([A-Z])/g, ' $1')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {analysisType === 'stress' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className={`px-3 py-1 rounded-full text-sm ${getStressColor(selectedProfile.stressIndicators.volatilityResponse)}`}>
                      {selectedProfile.stressIndicators.volatilityResponse.toUpperCase()}
                    </div>
                    <div className="text-sm text-cyan-400/60 mt-2">Volatility Response</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-yellow-400">
                      {selectedProfile.stressIndicators.lossAversion}%
                    </div>
                    <div className="text-sm text-cyan-400/60">Loss Aversion</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-red-400">
                      {selectedProfile.stressIndicators.overconfidence}%
                    </div>
                    <div className="text-sm text-cyan-400/60">Overconfidence</div>
                  </div>
                </div>
              </div>
            )}

            {analysisType === 'predictions' && (
              <div className="space-y-4">
                {selectedProfile.predictions.map((prediction, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-cyan-500/20">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-cyan-300/90">{prediction}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehavioralAnalytics;