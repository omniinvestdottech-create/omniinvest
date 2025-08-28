import React, { useState, useEffect } from 'react';
import { Activity, Zap, Eye, HardDrive, Cpu, Wifi } from 'lucide-react';
import { monitorMemoryUsage, getPerformanceMetrics } from '../utils/performance';

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [memoryUsage, setMemoryUsage] = useState<any>(null);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>('online');

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(getPerformanceMetrics());
      setMemoryUsage(monitorMemoryUsage());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);

    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!metrics) return null;

  const getPerformanceColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'text-green-400';
    if (value <= thresholds[1]) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed bottom-4 right-4 glass-effect rounded-lg border border-cyan-500/30 p-3 text-xs z-50">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Activity className="h-3 w-3 text-cyan-400" />
          <span className={getPerformanceColor(metrics.firstContentfulPaint, [1500, 2500])}>
            FCP: {metrics.firstContentfulPaint}ms
          </span>
        </div>
        
        {memoryUsage && (
          <div className="flex items-center space-x-1">
            <HardDrive className="h-3 w-3 text-cyan-400" />
            <span className={getPerformanceColor(memoryUsage.used, [50, 100])}>
              RAM: {memoryUsage.used}MB
            </span>
          </div>
        )}
        
        <div className="flex items-center space-x-1">
          <Wifi className={`h-3 w-3 ${networkStatus === 'online' ? 'text-green-400' : 'text-red-400'}`} />
          <span className={networkStatus === 'online' ? 'text-green-400' : 'text-red-400'}>
            {networkStatus.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;