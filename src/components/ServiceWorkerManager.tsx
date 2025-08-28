import React, { useEffect, useState } from 'react';
import { Download, RefreshCw, Wifi, WifiOff } from 'lucide-react';

const ServiceWorkerManager: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    // Service Worker registration and update detection
    if ('serviceWorker' in navigator && !window.location.hostname.includes('stackblitz') && !window.location.hostname.includes('webcontainer')) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('SW registration failed:', error);
        });
    }

    // PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    // Online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleUpdate = () => {
    if ('serviceWorker' in navigator && !window.location.hostname.includes('stackblitz') && !window.location.hostname.includes('webcontainer')) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  };

  const handleInstall = async () => {
    if (installPrompt) {
      const result = await installPrompt.prompt();
      if (result.outcome === 'accepted') {
        setInstallPrompt(null);
      }
    }
  };

  return (
    <>
      {/* Update Available Notification */}
      {updateAvailable && (
        <div className="fixed top-20 right-4 glass-effect rounded-lg border border-blue-500/30 p-4 z-50 max-w-sm">
          <div className="flex items-center space-x-3">
            <RefreshCw className="h-5 w-5 text-blue-400" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-400">Update Available</h4>
              <p className="text-sm text-gray-300">New features and improvements ready</p>
            </div>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-400/30 hover:bg-blue-500/30 transition-colors text-sm"
            >
              Update
            </button>
          </div>
        </div>
      )}

      {/* Install App Prompt */}
      {installPrompt && (
        <div className="fixed top-20 right-4 glass-effect rounded-lg border border-green-500/30 p-4 z-50 max-w-sm">
          <div className="flex items-center space-x-3">
            <Download className="h-5 w-5 text-green-400" />
            <div className="flex-1">
              <h4 className="font-medium text-green-400">Install OmniInvest</h4>
              <p className="text-sm text-gray-300">Get the native app experience</p>
            </div>
            <button
              onClick={handleInstall}
              className="px-3 py-1 bg-green-500/20 text-green-400 rounded border border-green-400/30 hover:bg-green-500/30 transition-colors text-sm"
            >
              Install
            </button>
          </div>
        </div>
      )}

      {/* Offline Indicator */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 glass-effect rounded-lg border border-red-500/30 p-3 z-50">
          <div className="flex items-center space-x-2">
            <WifiOff className="h-4 w-4 text-red-400" />
            <span className="text-sm text-red-400 font-orbitron">Offline Mode</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceWorkerManager;