import React from 'react';
import { Menu, Shield, Bell, Search, ChevronLeft } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, sidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-cyan-500/30 relative">
      {/* Futuristic header glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-magenta-500/5"></div>
      
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-cyan-400 hover:text-cyan-300 futuristic-button transition-all duration-200 group"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
            )}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className={`transition-opacity duration-200 ${sidebarOpen ? 'lg:opacity-100' : 'lg:opacity-0 lg:w-0 lg:overflow-hidden'}`}>
              <h1 className="text-xl font-bold text-cyan-400 font-orbitron">OmniInvest</h1>
              <p className="text-xs text-cyan-300 -mt-1 font-orbitron">Elite Intelligence</p>
            </div>
          </div>
          
          <button
            onClick={() => window.location.href = '#landing'}
            className="ml-4 px-3 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
          >
            Sales Page
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-400" />
            <input
              type="text"
              placeholder="Search investors, stocks, or insights..."
              className="w-full pl-10 pr-4 py-2 futuristic-input rounded-lg text-cyan-100 placeholder-cyan-400/60 focus:outline-none font-orbitron"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="relative p-2 rounded-lg text-cyan-400 hover:text-cyan-300 futuristic-button transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-magenta-500 rounded-full"></span>
          </button>
          
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center cyber-border">
            <span className="text-sm font-medium text-white font-orbitron">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;