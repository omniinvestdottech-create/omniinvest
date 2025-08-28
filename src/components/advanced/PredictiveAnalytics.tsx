import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, Target, Zap, Eye, Calendar, Star } from 'lucide-react';

interface Prediction {
  id: string;
  type: 'stock_price' | 'market_crash' | 'sector_rotation' | 'earnings_surprise';
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  currentValue: number;
  predictedValue: number;
  reasoning: string[];
  dataPoints: number;
  lastUpdated: string;
}

const mockPredictions: Prediction[] = [
  {
    id: '1',
    type: 'stock_price',
    title: 'NVDA Price Target',
    description: 'AI predicts NVDA will reach $950 within 3 weeks based on insider accumulation patterns',
    confidence: 94,
    timeframe: '3 weeks',
    currentValue: 875.20,
    predictedValue: 950.00,
    reasoning: [
      '3 major insiders increased positions by 15% in past week',
      'Similar pattern preceded 23% gain in March 2024',
      'Options flow shows unusual call activity at $900 strike',
      'Satellite data shows increased data center construction'
    ],
    dataPoints: 847,
    lastUpdated: '2 minutes ago'
  },
  {
    id: '2',
    type: 'market_crash',
    title: 'Market Correction Warning',
    description: 'AI detects 73% probability of 8-12% market correction within 2 weeks',
    confidence: 73,
    timeframe: '2 weeks',
    currentValue: 4850,
    predictedValue: 4350,
    reasoning: [
      'Insider selling accelerated 340% across tech sector',
      'VIX patterns match pre-correction behavior from 2022',
      'Federal Reserve meeting minutes show hawkish sentiment',
      'Corporate jet traffic to Jackson Hole increased 200%'
    ],
    dataPoints: 1247,
    lastUpdated: '15 minutes ago'
  },
  {
    id: '3',
    type: 'sector_rotation',
    title: 'Energy Sector Rotation',
    description: 'Massive rotation from tech to energy predicted within 4 weeks',
    confidence: 87,
    timeframe: '4 weeks',
    currentValue: 15.2,
    predictedValue: 22.8,
    reasoning: [
      'Government officials increasing energy positions by 450%',
      'Private jet tracking shows energy CEO meetings in Houston',
      'Patent filings for clean energy tech up 200%',
      'Satellite imagery shows increased drilling activity'
    ],
    dataPoints: 623,
    lastUpdated: '1 hour ago'
  }
];

const PredictiveAnalytics: React.FC = () => {
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction>(mockPredictions[0]);
  const [timeframe, setTimeframe] = useState<string>('1week');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'stock_price': return <Target className="h-5 w-5" />;
      case 'market_crash': return <AlertTriangle className="h-5 w-5" />;
      case 'sector_rotation': return <TrendingUp className="h-5 w-5" />;
      case 'earnings_surprise': return <Star className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stock_price': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'market_crash': return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'sector_rotation': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'earnings_surprise': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      default: return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 75) return 'text-yellow-400';
    if (confidence >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const calculatePotentialGain = (current: number, predicted: number) => {
    return ((predicted - current) / current * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">AI Predictive Analytics</h2>
          <p className="text-cyan-300/80 mt-1">Advanced AI predictions with 90%+ accuracy rates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-400 animate-pulse" />
          <span className="text-sm text-purple-400">Quantum AI Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Predictions List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">Active Predictions</h3>
          {mockPredictions.map((prediction) => (
            <div
              key={prediction.id}
              onClick={() => setSelectedPrediction(prediction)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                selectedPrediction.id === prediction.id
                  ? 'glass-effect border-cyan-400/50'
                  : 'glass-effect border-cyan-500/30 hover:border-cyan-400/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg border ${getTypeColor(prediction.type)}`}>
                    {getTypeIcon(prediction.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-cyan-100">{prediction.title}</h4>
                    <p className="text-xs text-cyan-400/60">{prediction.timeframe}</p>
                  </div>
                </div>
                <div className={`text-lg font-bold ${getConfidenceColor(prediction.confidence)}`}>
                  {prediction.confidence}%
                </div>
              </div>
              
              <p className="text-sm text-cyan-300/80 mb-3">{prediction.description}</p>
              
              <div className="flex items-center justify-between text-xs text-cyan-400/60">
                <span>{prediction.dataPoints} data points</span>
                <span>{prediction.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Prediction Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-3 rounded-lg border ${getTypeColor(selectedPrediction.type)}`}>
                    {getTypeIcon(selectedPrediction.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 font-orbitron">
                      {selectedPrediction.title}
                    </h3>
                    <p className="text-cyan-300/80">{selectedPrediction.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-3xl font-bold ${getConfidenceColor(selectedPrediction.confidence)}`}>
                  {selectedPrediction.confidence}%
                </div>
                <div className="text-sm text-cyan-400/60">Confidence</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-cyan-400 font-orbitron">
                  ${selectedPrediction.currentValue.toFixed(2)}
                </div>
                <div className="text-sm text-cyan-400/60">Current Value</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-green-400 font-orbitron">
                  ${selectedPrediction.predictedValue.toFixed(2)}
                </div>
                <div className="text-sm text-cyan-400/60">Predicted Value</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400 font-orbitron">
                  +{calculatePotentialGain(selectedPrediction.currentValue, selectedPrediction.predictedValue)}%
                </div>
                <div className="text-sm text-cyan-400/60">Potential Gain</div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">AI Reasoning</h4>
              <div className="space-y-3">
                {selectedPrediction.reasoning.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-cyan-300/90 text-sm">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-cyan-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-cyan-400/80">
                  <Eye className="h-4 w-4" />
                  <span>{selectedPrediction.dataPoints} data points analyzed</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-cyan-400/80">
                  <Calendar className="h-4 w-4" />
                  <span>Updated {selectedPrediction.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Set Price Alert
            </button>
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Add to Watchlist
            </button>
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">AI Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2 font-orbitron">94.7%</div>
            <div className="text-sm text-cyan-400/60">Prediction Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2 font-orbitron">2,847</div>
            <div className="text-sm text-cyan-400/60">Successful Predictions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2 font-orbitron">+127%</div>
            <div className="text-sm text-cyan-400/60">Avg Predicted Gain</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2 font-orbitron">15min</div>
            <div className="text-sm text-cyan-400/60">Avg Prediction Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;