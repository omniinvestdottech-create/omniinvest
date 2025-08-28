import React, { useState, useEffect } from 'react';
import { Brain, Zap, Target, Globe, TrendingUp, AlertCircle, Eye, Atom } from 'lucide-react';

interface QuantumPrediction {
  id: string;
  type: 'price_target' | 'market_crash' | 'sector_rotation' | 'volatility_spike';
  symbol?: string;
  title: string;
  description: string;
  confidence: number;
  quantumConfidence: number;
  timeframe: string;
  currentValue: number;
  predictedValue: number;
  uncertaintyRange: [number, number];
  dataSourceCount: number;
  neuralNetworkEnsemble: number;
  lastUpdate: string;
}

const mockQuantumPredictions: QuantumPrediction[] = [
  {
    id: '1',
    type: 'price_target',
    symbol: 'NVDA',
    title: 'NVDA Quantum Price Prediction',
    description: 'Multi-dimensional analysis across 47 data sources predicts significant upward movement',
    confidence: 94.7,
    quantumConfidence: 97.2,
    timeframe: '2-3 weeks',
    currentValue: 875.20,
    predictedValue: 1050.00,
    uncertaintyRange: [980, 1120],
    dataSourceCount: 47,
    neuralNetworkEnsemble: 12,
    lastUpdate: '3 minutes ago'
  },
  {
    id: '2',
    type: 'market_crash',
    title: 'Market Correction Probability',
    description: 'Quantum ensemble detects high probability correction based on insider behavior patterns',
    confidence: 78.3,
    quantumConfidence: 82.1,
    timeframe: '10-14 days',
    currentValue: 4850,
    predictedValue: 4200,
    uncertaintyRange: [4000, 4400],
    dataSourceCount: 89,
    neuralNetworkEnsemble: 15,
    lastUpdate: '1 minute ago'
  },
  {
    id: '3',
    type: 'sector_rotation',
    title: 'Tech to Energy Rotation',
    description: 'Quantum analysis predicts massive sector rotation based on government official trading patterns',
    confidence: 89.4,
    quantumConfidence: 91.8,
    timeframe: '3-4 weeks',
    currentValue: 15.2,
    predictedValue: 24.7,
    uncertaintyRange: [22, 28],
    dataSourceCount: 34,
    neuralNetworkEnsemble: 8,
    lastUpdate: '7 minutes ago'
  }
];

const QuantumAI: React.FC = () => {
  const [selectedPrediction, setSelectedPrediction] = useState<QuantumPrediction>(mockQuantumPredictions[0]);
  const [quantumProcessing, setQuantumProcessing] = useState(false);

  const runQuantumAnalysis = () => {
    setQuantumProcessing(true);
    setTimeout(() => setQuantumProcessing(false), 3000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'price_target': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'market_crash': return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'sector_rotation': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'volatility_spike': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      default: return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-yellow-400';
    if (confidence >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const calculatePotentialGain = (current: number, predicted: number) => {
    return ((predicted - current) / current * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Quantum AI Engine</h2>
          <p className="text-cyan-300/80 mt-1">Multi-dimensional market intelligence with quantum-enhanced predictions</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Atom className="h-5 w-5 text-purple-400 animate-spin" />
            <span className="text-sm text-purple-400">Quantum Processing Active</span>
          </div>
          <button
            onClick={runQuantumAnalysis}
            disabled={quantumProcessing}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {quantumProcessing ? 'Processing...' : 'Run Quantum Analysis'}
          </button>
        </div>
      </div>

      {/* Quantum Performance Metrics */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Quantum Engine Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2 font-orbitron">97.3%</div>
            <div className="text-sm text-cyan-400/60">Quantum Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2 font-orbitron">127</div>
            <div className="text-sm text-cyan-400/60">Data Sources</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2 font-orbitron">35</div>
            <div className="text-sm text-cyan-400/60">Neural Networks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2 font-orbitron">2.3s</div>
            <div className="text-sm text-cyan-400/60">Processing Time</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Predictions List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">Quantum Predictions</h3>
          {mockQuantumPredictions.map((prediction) => (
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
                <div>
                  <h4 className="font-medium text-cyan-100">{prediction.title}</h4>
                  <p className="text-xs text-cyan-400/60">{prediction.timeframe}</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getConfidenceColor(prediction.quantumConfidence)}`}>
                    {prediction.quantumConfidence}%
                  </div>
                  <div className="text-xs text-cyan-400/60">Quantum</div>
                </div>
              </div>
              
              <p className="text-sm text-cyan-300/80 mb-3">{prediction.description}</p>
              
              <div className="flex items-center justify-between text-xs text-cyan-400/60">
                <span>{prediction.dataSourceCount} sources</span>
                <span>{prediction.lastUpdate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Prediction Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 font-orbitron">
                  {selectedPrediction.title}
                </h3>
                <p className="text-cyan-300/80">{selectedPrediction.description}</p>
              </div>
              
              <div className="text-right">
                <div className={`text-3xl font-bold ${getConfidenceColor(selectedPrediction.quantumConfidence)}`}>
                  {selectedPrediction.quantumConfidence}%
                </div>
                <div className="text-sm text-cyan-400/60">Quantum Confidence</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-cyan-400 font-orbitron">
                  ${selectedPrediction.currentValue.toFixed(2)}
                </div>
                <div className="text-sm text-cyan-400/60">Current</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-green-400 font-orbitron">
                  ${selectedPrediction.predictedValue.toFixed(2)}
                </div>
                <div className="text-sm text-cyan-400/60">Predicted</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400 font-orbitron">
                  +{calculatePotentialGain(selectedPrediction.currentValue, selectedPrediction.predictedValue)}%
                </div>
                <div className="text-sm text-cyan-400/60">Potential</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-cyan-400 mb-3 font-orbitron">Uncertainty Range</h4>
              <div className="relative">
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full relative"
                    style={{ width: '75%' }}
                  >
                    <div className="absolute right-0 top-0 w-2 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-cyan-400/60 mt-2">
                  <span>${selectedPrediction.uncertaintyRange[0]}</span>
                  <span>Current: ${selectedPrediction.currentValue}</span>
                  <span>${selectedPrediction.uncertaintyRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-lg font-bold text-blue-400 font-orbitron">
                  {selectedPrediction.dataSourceCount}
                </div>
                <div className="text-sm text-cyan-400/60">Data Sources</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-lg font-bold text-purple-400 font-orbitron">
                  {selectedPrediction.neuralNetworkEnsemble}
                </div>
                <div className="text-sm text-cyan-400/60">Neural Networks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumAI;