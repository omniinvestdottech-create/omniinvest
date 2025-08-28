import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Brain, 
  Zap, 
  Target, 
  Star,
  Crown,
  Lock,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Settings
} from 'lucide-react';

interface ChartDataPoint {
  timestamp: number;
  price: number;
  volume: number;
  insiderActivity: number;
  aiConfidence: number;
  prediction?: number;
  sentiment: number;
}

interface Investment {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  position: number;
  value: number;
  insiderActivity: 'high' | 'medium' | 'low';
  aiRating: number;
  prediction: {
    target: number;
    timeframe: string;
    confidence: number;
  };
  chartData: ChartDataPoint[];
}

interface MembershipLevel {
  tier: 'insider-glimpse' | 'market-navigator' | 'wealth-architect' | 'omniscient-elite';
  features: {
    realTimeData: boolean;
    aiPredictions: boolean;
    insiderIntelligence: boolean;
    quantumAnalysis: boolean;
    exclusiveInsights: boolean;
  };
}

const mockInvestments: Investment[] = [
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    currentPrice: 248.50,
    change: 12.30,
    changePercent: 5.2,
    position: 50,
    value: 12425,
    insiderActivity: 'high',
    aiRating: 94,
    prediction: {
      target: 285.00,
      timeframe: '30 days',
      confidence: 87
    },
    chartData: Array.from({ length: 100 }, (_, i) => ({
      timestamp: Date.now() - (100 - i) * 60000,
      price: 240 + Math.sin(i * 0.1) * 20 + Math.random() * 10,
      volume: Math.random() * 1000000,
      insiderActivity: Math.random() * 100,
      aiConfidence: 80 + Math.random() * 20,
      sentiment: 50 + Math.sin(i * 0.05) * 30 + Math.random() * 20,
      prediction: i > 80 ? 240 + Math.sin(i * 0.1) * 20 + 15 : undefined
    }))
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    currentPrice: 875.20,
    change: -8.45,
    changePercent: -0.95,
    position: 25,
    value: 21880,
    insiderActivity: 'high',
    aiRating: 91,
    prediction: {
      target: 950.00,
      timeframe: '45 days',
      confidence: 92
    },
    chartData: Array.from({ length: 100 }, (_, i) => ({
      timestamp: Date.now() - (100 - i) * 60000,
      price: 850 + Math.cos(i * 0.08) * 40 + Math.random() * 15,
      volume: Math.random() * 2000000,
      insiderActivity: Math.random() * 100,
      aiConfidence: 85 + Math.random() * 15,
      sentiment: 60 + Math.cos(i * 0.06) * 25 + Math.random() * 15,
      prediction: i > 75 ? 850 + Math.cos(i * 0.08) * 40 + 25 : undefined
    }))
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 189.25,
    change: -2.15,
    changePercent: -1.1,
    position: 100,
    value: 18925,
    insiderActivity: 'medium',
    aiRating: 78,
    prediction: {
      target: 205.00,
      timeframe: '60 days',
      confidence: 74
    },
    chartData: Array.from({ length: 100 }, (_, i) => ({
      timestamp: Date.now() - (100 - i) * 60000,
      price: 185 + Math.sin(i * 0.12) * 15 + Math.random() * 8,
      volume: Math.random() * 800000,
      insiderActivity: Math.random() * 100,
      aiConfidence: 70 + Math.random() * 20,
      sentiment: 45 + Math.sin(i * 0.08) * 20 + Math.random() * 15,
      prediction: i > 85 ? 185 + Math.sin(i * 0.12) * 15 + 10 : undefined
    }))
  }
];

const InteractiveInvestmentChart: React.FC = () => {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment>(mockInvestments[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeRange, setTimeRange] = useState<'1H' | '1D' | '1W' | '1M' | '1Y'>('1D');
  const [chartMode, setChartMode] = useState<'price' | 'volume' | 'insider' | 'ai' | 'prediction'>('price');
  const [membershipLevel] = useState<MembershipLevel>({
    tier: 'wealth-architect',
    features: {
      realTimeData: true,
      aiPredictions: true,
      insiderIntelligence: true,
      quantumAnalysis: true,
      exclusiveInsights: true
    }
  });
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const [animationFrame, setAnimationFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setAnimationFrame(prev => prev + 1);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    drawChart();
  }, [selectedInvestment, chartMode, animationFrame, hoveredPoint]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Set up gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = (width / 10) * i;
      const y = (height / 10) * i;
      
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const data = selectedInvestment.chartData;
    if (data.length === 0) return;

    // Calculate data ranges
    const getValue = (point: ChartDataPoint) => {
      switch (chartMode) {
        case 'price': return point.price;
        case 'volume': return point.volume / 1000000; // Scale volume
        case 'insider': return point.insiderActivity;
        case 'ai': return point.aiConfidence;
        case 'prediction': return point.prediction || point.price;
        default: return point.price;
      }
    };

    const values = data.map(getValue);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue;

    // Draw main chart line
    ctx.strokeStyle = chartMode === 'prediction' ? '#ff00ff' : '#00ffff';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((point, index) => {
      const x = (width / (data.length - 1)) * index;
      const value = getValue(point);
      const y = height - ((value - minValue) / valueRange) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw area fill
    const areaGradient = ctx.createLinearGradient(0, 0, 0, height);
    areaGradient.addColorStop(0, chartMode === 'prediction' ? 'rgba(255, 0, 255, 0.3)' : 'rgba(0, 255, 255, 0.3)');
    areaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = areaGradient;

    ctx.beginPath();
    data.forEach((point, index) => {
      const x = (width / (data.length - 1)) * index;
      const value = getValue(point);
      const y = height - ((value - minValue) / valueRange) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Draw insider activity indicators (if enabled)
    if (membershipLevel.features.insiderIntelligence && chartMode !== 'insider') {
      data.forEach((point, index) => {
        if (point.insiderActivity > 70) {
          const x = (width / (data.length - 1)) * index;
          const value = getValue(point);
          const y = height - ((value - minValue) / valueRange) * height;

          // Pulsing insider activity indicator
          const pulseSize = 8 + Math.sin(animationFrame * 0.1 + index) * 3;
          
          ctx.fillStyle = `rgba(255, 0, 0, ${0.6 + Math.sin(animationFrame * 0.1) * 0.3})`;
          ctx.beginPath();
          ctx.arc(x, y - 15, pulseSize, 0, Math.PI * 2);
          ctx.fill();

          // Insider activity label
          ctx.fillStyle = '#ff0000';
          ctx.font = '10px Orbitron';
          ctx.textAlign = 'center';
          ctx.fillText('🔥', x, y - 25);
        }
      });
    }

    // Draw AI prediction overlay (if enabled)
    if (membershipLevel.features.aiPredictions && chartMode === 'prediction') {
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      const predictionData = data.filter(point => point.prediction);
      if (predictionData.length > 0) {
        ctx.beginPath();
        predictionData.forEach((point, index) => {
          const dataIndex = data.indexOf(point);
          const x = (width / (data.length - 1)) * dataIndex;
          const y = height - ((point.prediction! - minValue) / valueRange) * height;

          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
      }
      
      ctx.setLineDash([]);
    }

    // Draw hover indicator
    if (hoveredPoint) {
      const dataIndex = data.indexOf(hoveredPoint);
      const x = (width / (data.length - 1)) * dataIndex;
      const value = getValue(hoveredPoint);
      const y = height - ((value - minValue) / valueRange) * height;

      // Vertical line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      // Hover point
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw animated particles for premium members
    if (membershipLevel.tier === 'omniscient-elite') {
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(animationFrame * 0.01 + i) * width/4) + width/2;
        const y = (Math.cos(animationFrame * 0.015 + i) * height/4) + height/2;
        const alpha = 0.3 + Math.sin(animationFrame * 0.02 + i) * 0.2;
        
        ctx.fillStyle = `rgba(255, 255, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const dataIndex = Math.round((x / canvas.width) * (selectedInvestment.chartData.length - 1));
    
    if (dataIndex >= 0 && dataIndex < selectedInvestment.chartData.length) {
      setHoveredPoint(selectedInvestment.chartData[dataIndex]);
    }
  };

  const handleCanvasMouseLeave = () => {
    setHoveredPoint(null);
  };

  const getMembershipFeatureAccess = (feature: keyof MembershipLevel['features']) => {
    return membershipLevel.features[feature];
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'omniscient-elite': return 'from-yellow-400 to-orange-500';
      case 'wealth-architect': return 'from-purple-500 to-pink-500';
      case 'market-navigator': return 'from-blue-500 to-cyan-500';
      case 'insider-glimpse': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatPercent = (percent: number) => `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(0)}K`;
    return volume.toString();
  };

  return (
    <div className="glass-effect rounded-xl border border-cyan-500/30 p-6 mb-6 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-magenta-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header with controls */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center animate-pulse-glow">
              <span className="text-lg font-bold text-white font-orbitron">
                {selectedInvestment.symbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-cyan-400 font-orbitron">
                {selectedInvestment.symbol}
              </h2>
              <p className="text-cyan-300/80 text-sm">{selectedInvestment.name}</p>
            </div>
          </div>

          {/* Membership tier indicator */}
          <div className={`px-3 py-1 rounded-full text-sm border bg-gradient-to-r ${getTierColor(membershipLevel.tier)} text-white font-medium`}>
            <Crown className="h-4 w-4 inline mr-1" />
            {membershipLevel.tier.replace('-', ' ').toUpperCase()}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Time range selector */}
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            {(['1H', '1D', '1W', '1M', '1Y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Chart controls */}
          <div className="flex space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors">
              <Maximize className="h-4 w-4" />
            </button>
            <button className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Investment selector */}
      <div className="flex space-x-3 mb-6 overflow-x-auto scrollbar-hide">
        {mockInvestments.map((investment) => (
          <button
            key={investment.symbol}
            onClick={() => setSelectedInvestment(investment)}
            className={`flex-shrink-0 p-3 rounded-lg border transition-all duration-200 ${
              selectedInvestment.symbol === investment.symbol
                ? 'glass-effect border-cyan-400/50 scale-105'
                : 'bg-white/5 border-white/20 hover:border-cyan-400/50'
            }`}
          >
            <div className="text-center">
              <div className="font-bold text-cyan-100 font-orbitron">{investment.symbol}</div>
              <div className={`text-sm font-medium ${investment.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercent(investment.changePercent)}
              </div>
              <div className="text-xs text-cyan-400/60">{formatPrice(investment.currentPrice)}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Chart mode selector */}
      <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-6">
        {[
          { id: 'price', label: 'Price', icon: TrendingUp, locked: false },
          { id: 'volume', label: 'Volume', icon: Eye, locked: false },
          { id: 'insider', label: 'Insider Activity', icon: Target, locked: !getMembershipFeatureAccess('insiderIntelligence') },
          { id: 'ai', label: 'AI Confidence', icon: Brain, locked: !getMembershipFeatureAccess('aiPredictions') },
          { id: 'prediction', label: 'Predictions', icon: Zap, locked: !getMembershipFeatureAccess('quantumAnalysis') }
        ].map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => !mode.locked && setChartMode(mode.id as any)}
              disabled={mode.locked}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                chartMode === mode.id
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : mode.locked
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{mode.label}</span>
              {mode.locked && <Lock className="h-3 w-3" />}
            </button>
          );
        })}
      </div>

      {/* Main chart area */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          className="w-full h-64 rounded-lg cursor-crosshair"
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={handleCanvasMouseLeave}
          style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,50,100,0.1) 100%)' }}
        />

        {/* Hover tooltip */}
        {hoveredPoint && (
          <div className="absolute top-4 left-4 glass-effect rounded-lg border border-cyan-500/30 p-3 pointer-events-none">
            <div className="text-sm space-y-1">
              <div className="text-cyan-400 font-medium">
                {new Date(hoveredPoint.timestamp).toLocaleTimeString()}
              </div>
              <div className="text-white">
                Price: {formatPrice(hoveredPoint.price)}
              </div>
              <div className="text-cyan-300/80">
                Volume: {formatVolume(hoveredPoint.volume)}
              </div>
              {getMembershipFeatureAccess('insiderIntelligence') && (
                <div className="text-red-400">
                  Insider Activity: {hoveredPoint.insiderActivity.toFixed(0)}%
                </div>
              )}
              {getMembershipFeatureAccess('aiPredictions') && (
                <div className="text-purple-400">
                  AI Confidence: {hoveredPoint.aiConfidence.toFixed(0)}%
                </div>
              )}
              <div className="text-blue-400">
                Sentiment: {hoveredPoint.sentiment.toFixed(0)}%
              </div>
            </div>
          </div>
        )}

        {/* AI Insights overlay for premium members */}
        {getMembershipFeatureAccess('exclusiveInsights') && (
          <div className="absolute top-4 right-4 space-y-2">
            <div className="glass-effect rounded-lg border border-purple-500/30 p-3 animate-pulse-glow">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">AI Insight</span>
              </div>
              <p className="text-xs text-purple-300/90">
                Strong buy signal detected. 3 insiders purchased in last 48h.
              </p>
            </div>
            
            {membershipLevel.tier === 'omniscient-elite' && (
              <div className="glass-effect rounded-lg border border-yellow-500/30 p-3 animate-pulse-glow">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Quantum Analysis</span>
                </div>
                <p className="text-xs text-yellow-300/90">
                  Quantum model predicts 23% gain in 2-3 weeks with 94% confidence.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Locked features overlay for lower tiers */}
        {!getMembershipFeatureAccess('aiPredictions') && chartMode === 'ai' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <Lock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Premium Feature</h3>
              <p className="text-yellow-300/80 mb-4">AI predictions require Market Navigator tier or higher</p>
              <button className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Investment details panel */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-6">
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-2xl font-bold text-cyan-400 font-orbitron">
            {formatPrice(selectedInvestment.currentPrice)}
          </div>
          <div className="text-sm text-cyan-400/60">Current Price</div>
        </div>
        
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className={`text-2xl font-bold font-orbitron ${selectedInvestment.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatPercent(selectedInvestment.changePercent)}
          </div>
          <div className="text-sm text-cyan-400/60">24h Change</div>
        </div>
        
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-2xl font-bold text-blue-400 font-orbitron">
            ${selectedInvestment.value.toLocaleString()}
          </div>
          <div className="text-sm text-cyan-400/60">Position Value</div>
        </div>
        
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className={`text-2xl font-bold font-orbitron ${
            selectedInvestment.insiderActivity === 'high' ? 'text-red-400' :
            selectedInvestment.insiderActivity === 'medium' ? 'text-yellow-400' :
            'text-green-400'
          }`}>
            {selectedInvestment.insiderActivity.toUpperCase()}
          </div>
          <div className="text-sm text-cyan-400/60">Insider Activity</div>
        </div>
        
        {getMembershipFeatureAccess('aiPredictions') && (
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-purple-400 font-orbitron">
              {selectedInvestment.aiRating}%
            </div>
            <div className="text-sm text-cyan-400/60">AI Rating</div>
          </div>
        )}
        
        {getMembershipFeatureAccess('quantumAnalysis') && (
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400 font-orbitron">
              {formatPrice(selectedInvestment.prediction.target)}
            </div>
            <div className="text-sm text-cyan-400/60">AI Target</div>
          </div>
        )}
      </div>

      {/* AI Predictions panel for premium members */}
      {getMembershipFeatureAccess('aiPredictions') && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="glass-effect rounded-lg border border-green-500/30 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="font-medium text-green-400">Price Prediction</span>
            </div>
            <div className="text-lg font-bold text-green-400 font-orbitron">
              {formatPrice(selectedInvestment.prediction.target)}
            </div>
            <div className="text-sm text-green-300/80">
              {selectedInvestment.prediction.timeframe} • {selectedInvestment.prediction.confidence}% confidence
            </div>
          </div>

          <div className="glass-effect rounded-lg border border-blue-500/30 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-blue-400">AI Analysis</span>
            </div>
            <div className="text-lg font-bold text-blue-400 font-orbitron">
              {selectedInvestment.aiRating}% BULLISH
            </div>
            <div className="text-sm text-blue-300/80">
              Based on 47 data sources
            </div>
          </div>

          <div className="glass-effect rounded-lg border border-purple-500/30 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="h-4 w-4 text-purple-400" />
              <span className="font-medium text-purple-400">Insider Signal</span>
            </div>
            <div className="text-lg font-bold text-purple-400 font-orbitron">
              STRONG BUY
            </div>
            <div className="text-sm text-purple-300/80">
              3 major purchases detected
            </div>
          </div>
        </div>
      )}

      {/* Quantum analysis for elite members */}
      {membershipLevel.tier === 'omniscient-elite' && (
        <div className="mt-6 glass-effect rounded-lg border border-yellow-500/30 p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="font-medium text-yellow-400 font-orbitron">Quantum Intelligence Analysis</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-400 font-orbitron">97.3%</div>
              <div className="text-sm text-yellow-300/80">Quantum Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-cyan-400 font-orbitron">127</div>
              <div className="text-sm text-yellow-300/80">Data Dimensions</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-magenta-400 font-orbitron">2.3s</div>
              <div className="text-sm text-yellow-300/80">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-400 font-orbitron">+23%</div>
              <div className="text-sm text-yellow-300/80">Predicted Gain</div>
            </div>
          </div>
        </div>
      )}

      {/* Live data indicator */}
      <div className="absolute top-6 right-6 flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <span className="text-xs text-green-400 font-orbitron">LIVE DATA</span>
      </div>
    </div>
  );
};

export default InteractiveInvestmentChart;