import React, { useState } from 'react';
import { BarChart, PieChart, TrendingUp, Eye, Layers, Maximize, Grid, Zap } from 'lucide-react';

interface VisualizationData {
  id: string;
  type: '3d_portfolio' | 'correlation_matrix' | 'risk_heatmap' | 'flow_diagram';
  title: string;
  description: string;
  interactivity: 'basic' | 'advanced' | 'immersive';
  dataPoints: number;
  updateFrequency: string;
}

const visualizations: VisualizationData[] = [
  {
    id: '1',
    type: '3d_portfolio',
    title: '3D Portfolio Universe',
    description: 'Interactive 3D visualization showing your holdings as interconnected spheres with size representing allocation and color showing performance',
    interactivity: 'immersive',
    dataPoints: 1247,
    updateFrequency: 'Real-time'
  },
  {
    id: '2',
    type: 'correlation_matrix',
    title: 'Dynamic Correlation Web',
    description: 'Live correlation matrix showing how your holdings move together, with thickness of connections showing correlation strength',
    interactivity: 'advanced',
    dataPoints: 892,
    updateFrequency: 'Every 5 minutes'
  },
  {
    id: '3',
    type: 'risk_heatmap',
    title: 'Multi-Dimensional Risk Map',
    description: 'Heat map visualization showing portfolio risk across multiple dimensions: volatility, correlation, liquidity, and concentration',
    interactivity: 'advanced',
    dataPoints: 2156,
    updateFrequency: 'Every minute'
  },
  {
    id: '4',
    type: 'flow_diagram',
    title: 'Money Flow Visualization',
    description: 'Sankey diagram showing how money flows between sectors, with insider activity overlays and prediction arrows',
    interactivity: 'immersive',
    dataPoints: 3421,
    updateFrequency: 'Real-time'
  }
];

const AdvancedVisualization: React.FC = () => {
  const [selectedViz, setSelectedViz] = useState<VisualizationData>(visualizations[0]);
  const [viewMode, setViewMode] = useState<'2d' | '3d' | 'ar'>('3d');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '3d_portfolio': return <Layers className="h-5 w-5" />;
      case 'correlation_matrix': return <Grid className="h-5 w-5" />;
      case 'risk_heatmap': return <BarChart className="h-5 w-5" />;
      case 'flow_diagram': return <TrendingUp className="h-5 w-5" />;
      default: return <Eye className="h-5 w-5" />;
    }
  };

  const getInteractivityColor = (level: string) => {
    switch (level) {
      case 'immersive': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
      case 'advanced': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'basic': return 'text-green-400 bg-green-500/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Advanced Visualization Suite</h2>
          <p className="text-cyan-300/80 mt-1">Immersive 3D and AR visualizations for complex market data</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            {['2d', '3d', 'ar'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Visualization Selector */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-400 font-orbitron">Visualizations</h3>
          {visualizations.map((viz) => (
            <button
              key={viz.id}
              onClick={() => setSelectedViz(viz)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedViz.id === viz.id
                  ? 'glass-effect border-cyan-400/50'
                  : 'glass-effect border-cyan-500/30 hover:border-cyan-400/50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  {getTypeIcon(viz.type)}
                </div>
                <div>
                  <h4 className="font-medium text-cyan-100">{viz.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getInteractivityColor(viz.interactivity)}`}>
                    {viz.interactivity.toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="text-sm text-cyan-300/80">{viz.description}</p>
            </button>
          ))}
        </div>

        {/* Main Visualization Area */}
        <div className="lg:col-span-3 glass-effect rounded-xl border border-cyan-500/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-cyan-400 font-orbitron">{selectedViz.title}</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-cyan-400/60">
                {selectedViz.dataPoints.toLocaleString()} data points
              </span>
              <button className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors">
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Simulated 3D Visualization Area */}
          <div className="relative h-96 bg-gradient-to-br from-black/50 to-cyan-900/20 rounded-lg border border-cyan-500/30 overflow-hidden">
            {/* Simulated 3D Portfolio Visualization */}
            {selectedViz.type === '3d_portfolio' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Central node */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center animate-pulse">
                    <span className="text-white font-bold">YOU</span>
                  </div>
                  
                  {/* Orbiting holdings */}
                  {['TSLA', 'NVDA', 'AAPL', 'META', 'GOOGL'].map((symbol, index) => (
                    <div
                      key={symbol}
                      className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold animate-float"
                      style={{
                        top: `${50 + 40 * Math.sin((index * 72) * Math.PI / 180)}%`,
                        left: `${50 + 40 * Math.cos((index * 72) * Math.PI / 180)}%`,
                        transform: 'translate(-50%, -50%)',
                        animationDelay: `${index * 0.5}s`
                      }}
                    >
                      {symbol}
                    </div>
                  ))}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <line
                        key={index}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + 40 * Math.cos((index * 72) * Math.PI / 180)}%`}
                        y2={`${50 + 40 * Math.sin((index * 72) * Math.PI / 180)}%`}
                        stroke="rgba(0, 255, 255, 0.3)"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    ))}
                  </svg>
                </div>
              </div>
            )}

            {/* Simulated Correlation Matrix */}
            {selectedViz.type === 'correlation_matrix' && (
              <div className="absolute inset-0 p-8">
                <div className="grid grid-cols-5 gap-2 h-full">
                  {Array.from({ length: 25 }, (_, i) => (
                    <div
                      key={i}
                      className={`rounded ${
                        Math.random() > 0.7 ? 'bg-red-500/40' :
                        Math.random() > 0.4 ? 'bg-yellow-500/40' :
                        'bg-green-500/40'
                      } flex items-center justify-center text-xs text-white font-bold hover:scale-110 transition-transform cursor-pointer`}
                    >
                      {(Math.random() * 2 - 1).toFixed(2)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Simulated Risk Heatmap */}
            {selectedViz.type === 'risk_heatmap' && (
              <div className="absolute inset-0 p-4">
                <div className="grid grid-cols-8 gap-1 h-full">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div
                      key={i}
                      className={`rounded ${
                        Math.random() > 0.8 ? 'bg-red-500/60' :
                        Math.random() > 0.6 ? 'bg-orange-500/60' :
                        Math.random() > 0.4 ? 'bg-yellow-500/60' :
                        'bg-green-500/60'
                      } hover:scale-110 transition-transform cursor-pointer`}
                      title={`Risk Level: ${Math.floor(Math.random() * 100)}%`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Simulated Flow Diagram */}
            {selectedViz.type === 'flow_diagram' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Flow paths */}
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(0, 255, 255, 0.8)" />
                        <stop offset="100%" stopColor="rgba(255, 0, 255, 0.8)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 50 200 Q 200 100 350 200"
                      stroke="url(#flowGradient)"
                      strokeWidth="8"
                      fill="none"
                      className="animate-pulse"
                    />
                    <path
                      d="M 50 250 Q 200 350 350 250"
                      stroke="url(#flowGradient)"
                      strokeWidth="6"
                      fill="none"
                      className="animate-pulse"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </svg>
                  
                  {/* Flow nodes */}
                  <div className="absolute top-1/4 left-8 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    TECH
                  </div>
                  <div className="absolute top-1/4 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    ENERGY
                  </div>
                  <div className="absolute bottom-1/4 left-8 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    HEALTH
                  </div>
                  <div className="absolute bottom-1/4 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold">
                    FINANCE
                  </div>
                </div>
              </div>
            )}

            {/* Overlay controls */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="p-2 bg-black/50 text-cyan-400 rounded-lg hover:bg-black/70 transition-colors">
                <Eye className="h-4 w-4" />
              </button>
              <button className="p-2 bg-black/50 text-cyan-400 rounded-lg hover:bg-black/70 transition-colors">
                <Zap className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-cyan-400/60">
              Updates: {selectedViz.updateFrequency} • {selectedViz.dataPoints.toLocaleString()} data points
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-400/30 hover:bg-blue-500/30 transition-colors text-sm">
                Export
              </button>
              <button className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-400/30 hover:bg-purple-500/30 transition-colors text-sm">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization Controls */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Visualization Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-md font-medium text-cyan-400 mb-3">Display Options</h4>
            <div className="space-y-2">
              {['Show correlations', 'Highlight risks', 'Animate flows', 'Show predictions'].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded text-cyan-500" />
                  <span className="text-sm text-cyan-300">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-cyan-400 mb-3">Time Range</h4>
            <select className="w-full futuristic-input rounded-lg px-3 py-2 text-cyan-100 focus:outline-none">
              <option value="1d">1 Day</option>
              <option value="1w">1 Week</option>
              <option value="1m">1 Month</option>
              <option value="3m">3 Months</option>
              <option value="1y">1 Year</option>
            </select>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-cyan-400 mb-3">Data Layers</h4>
            <div className="space-y-2">
              {['Insider activity', 'News sentiment', 'Options flow', 'Technical indicators'].map((layer) => (
                <label key={layer} className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded text-cyan-500" />
                  <span className="text-sm text-cyan-300">{layer}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedVisualization;