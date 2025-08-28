import React, { useState, useEffect } from 'react';
import { Palette, Monitor, Sun, Moon, Flag, Sparkles, Zap, Eye, EyeOff } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  effects: {
    glow: boolean;
    animations: boolean;
    particles: boolean;
    gradients: boolean;
  };
  preview: string;
}

const themes: Theme[] = [
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Futuristic cyberpunk with glowing effects',
    colors: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      accent: '#ffff00',
      background: '#000000',
      surface: 'rgba(0, 255, 255, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)'
    },
    effects: {
      glow: true,
      animations: true,
      particles: true,
      gradients: true
    },
    preview: 'from-cyan-500 to-purple-500'
  },
  {
    id: 'monochrome-pro',
    name: 'Monochrome Pro',
    description: 'Clean black, white, and gray professional look',
    colors: {
      primary: '#ffffff',
      secondary: '#888888',
      accent: '#cccccc',
      background: '#000000',
      surface: 'rgba(255, 255, 255, 0.05)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.6)'
    },
    effects: {
      glow: false,
      animations: false,
      particles: false,
      gradients: false
    },
    preview: 'from-gray-900 to-gray-700'
  },
  {
    id: 'rainbow-fantasy',
    name: 'Rainbow Fantasy',
    description: 'Vibrant rainbow colors with magical effects',
    colors: {
      primary: '#ff0080',
      secondary: '#8000ff',
      accent: '#00ff80',
      background: '#1a0033',
      surface: 'rgba(255, 0, 128, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)'
    },
    effects: {
      glow: true,
      animations: true,
      particles: true,
      gradients: true
    },
    preview: 'from-pink-500 via-purple-500 to-green-500'
  },
  {
    id: 'american-patriot',
    name: 'American Patriot',
    description: 'Red, white, and blue patriotic theme',
    colors: {
      primary: '#ff0000',
      secondary: '#0000ff',
      accent: '#ffffff',
      background: '#001122',
      surface: 'rgba(255, 0, 0, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)'
    },
    effects: {
      glow: true,
      animations: true,
      particles: false,
      gradients: true
    },
    preview: 'from-red-500 via-white to-blue-500'
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Natural green tones for calm analysis',
    colors: {
      primary: '#00ff80',
      secondary: '#40ff40',
      accent: '#80ff80',
      background: '#001100',
      surface: 'rgba(0, 255, 128, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)'
    },
    effects: {
      glow: true,
      animations: true,
      particles: false,
      gradients: true
    },
    preview: 'from-green-600 to-green-400'
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Warm orange and yellow sunset vibes',
    colors: {
      primary: '#ff8000',
      secondary: '#ffff00',
      accent: '#ff4000',
      background: '#220800',
      surface: 'rgba(255, 128, 0, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)'
    },
    effects: {
      glow: true,
      animations: true,
      particles: true,
      gradients: true
    },
    preview: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Deep ocean blues for focused trading',
    colors: {
      primary: '#0080ff',
      secondary: '#0040ff',
      accent: '#80c0ff',
      background: '#000822',
      surface: 'rgba(0, 128, 255, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)'
    },
    effects: {
      glow: true,
      animations: true,
      particles: false,
      gradients: true
    },
    preview: 'from-blue-600 to-blue-400'
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Luxurious purple for premium experience',
    colors: {
      primary: '#8000ff',
      secondary: '#ff00ff',
      accent: '#c080ff',
      background: '#110022',
      surface: 'rgba(128, 0, 255, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)'
    },
    effects: {
      glow: true,
      animations: true,
      particles: true,
      gradients: true
    },
    preview: 'from-purple-600 to-purple-400'
  },
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    description: 'Clean light mode for daytime use',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#0ea5e9',
      background: '#ffffff',
      surface: 'rgba(37, 99, 235, 0.05)',
      text: '#1e293b',
      textSecondary: 'rgba(30, 41, 59, 0.7)'
    },
    effects: {
      glow: false,
      animations: true,
      particles: false,
      gradients: false
    },
    preview: 'from-blue-500 to-slate-400'
  },
  {
    id: 'gold-luxury',
    name: 'Gold Luxury',
    description: 'Premium gold theme for elite members',
    colors: {
      primary: '#ffd700',
      secondary: '#ffb000',
      accent: '#fff200',
      background: '#1a1000',
      surface: 'rgba(255, 215, 0, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)'
    },
    effects: {
      glow: true,
      animations: true,
      particles: true,
      gradients: true
    },
    preview: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'matrix-green',
    name: 'Matrix Green',
    description: 'Classic Matrix-style green on black',
    colors: {
      primary: '#00ff00',
      secondary: '#40ff40',
      accent: '#80ff80',
      background: '#000000',
      surface: 'rgba(0, 255, 0, 0.05)',
      text: '#00ff00',
      textSecondary: 'rgba(0, 255, 0, 0.7)'
    },
    effects: {
      glow: true,
      animations: true,
      particles: false,
      gradients: false
    },
    preview: 'from-green-500 to-green-600'
  },
  {
    id: 'blood-red',
    name: 'Blood Red',
    description: 'Intense red theme for aggressive trading',
    colors: {
      primary: '#ff0000',
      secondary: '#ff4040',
      accent: '#ff8080',
      background: '#220000',
      surface: 'rgba(255, 0, 0, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)'
    },
    effects: {
      glow: true,
      animations: true,
      particles: false,
      gradients: true
    },
    preview: 'from-red-600 to-red-400'
  }
];

const ThemeManager: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useLocalStorage('selected-theme', 'cyber-neon');
  const [customEffects, setCustomEffects] = useLocalStorage('custom-effects', {
    glow: true,
    animations: true,
    particles: true,
    gradients: true
  });

  const currentTheme = themes.find(theme => theme.id === selectedTheme) || themes[0];

  useEffect(() => {
    applyTheme(currentTheme);
  }, [selectedTheme, customEffects]);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
    
    // Apply effect preferences
    root.classList.toggle('no-glow', !customEffects.glow);
    root.classList.toggle('no-animations', !customEffects.animations);
    root.classList.toggle('no-particles', !customEffects.particles);
    root.classList.toggle('no-gradients', !customEffects.gradients);
    
    // Apply theme class
    root.className = root.className.replace(/theme-\w+/g, '');
    root.classList.add(`theme-${theme.id}`);
  };

  const toggleEffect = (effect: keyof typeof customEffects) => {
    setCustomEffects(prev => ({
      ...prev,
      [effect]: !prev[effect]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Theme Customization</h2>
          <p className="text-gray-300 mt-1">Personalize your OmniInvest experience</p>
        </div>
        <div className="flex items-center space-x-2">
          <Palette className="h-5 w-5 text-blue-400" />
          <span className="text-sm text-blue-400">Premium Customization</span>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Choose Your Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                selectedTheme === theme.id
                  ? 'border-blue-400/50 bg-blue-500/10 scale-105'
                  : 'border-white/20 bg-white/5 hover:border-blue-400/30 hover:bg-white/10'
              }`}
            >
              <div className={`w-full h-16 rounded-lg bg-gradient-to-r ${theme.preview} mb-3`}></div>
              <h4 className="font-medium text-white mb-1">{theme.name}</h4>
              <p className="text-sm text-gray-300">{theme.description}</p>
              {selectedTheme === theme.id && (
                <div className="mt-2 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                  ACTIVE
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Effects Controls */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Visual Effects</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-white">Glow Effects</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={customEffects.glow}
                onChange={() => toggleEffect('glow')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="text-white">Animations</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={customEffects.animations}
                onChange={() => toggleEffect('animations')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-green-400" />
              <span className="text-white">Particles</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={customEffects.particles}
                onChange={() => toggleEffect('particles')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Monitor className="h-4 w-4 text-blue-400" />
              <span className="text-white">Gradients</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={customEffects.gradients}
                onChange={() => toggleEffect('gradients')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Theme Preview */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
        <div className="p-6 rounded-lg" style={{ 
          background: currentTheme.colors.surface,
          border: `1px solid ${currentTheme.colors.primary}40`
        }}>
          <div className="flex items-center space-x-4 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: currentTheme.colors.primary }}
            >
              <span className="font-bold" style={{ color: currentTheme.colors.background }}>
                TSLA
              </span>
            </div>
            <div>
              <h4 className="font-semibold" style={{ color: currentTheme.colors.text }}>
                Tesla Inc.
              </h4>
              <p style={{ color: currentTheme.colors.textSecondary }}>
                Sample investment card with your theme
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-xl font-bold" style={{ color: currentTheme.colors.primary }}>
                $248.50
              </div>
              <div className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                Current Price
              </div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-xl font-bold" style={{ color: currentTheme.colors.secondary }}>
                +5.2%
              </div>
              <div className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                24h Change
              </div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-xl font-bold" style={{ color: currentTheme.colors.accent }}>
                94%
              </div>
              <div className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                AI Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeManager;