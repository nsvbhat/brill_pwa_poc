'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showManualInstall, setShowManualInstall] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('📱 PWAInstall component mounted');

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('✅ App is already installed (standalone mode)');
      setIsInstalled(true);
      setIsLoading(false);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('🎉 beforeinstallprompt event FIRED!');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
      setIsLoading(false);
      setShowManualInstall(false);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    console.log('✓ beforeinstallprompt listener attached');

    // Show manual install instructions after 4 seconds if beforeinstallprompt hasn't fired
    const timer = setTimeout(() => {
      console.log('⏱️ 10 seconds elapsed without beforeinstallprompt event');
      if (!deferredPrompt && !isInstalled) {
        console.log('📋 Showing manual install instructions');
        setShowManualInstall(true);
      }
      setIsLoading(false);
    }, 10000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      clearTimeout(timer);
    };
  }, [deferredPrompt, isInstalled]);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      console.error('❌ Deferred prompt is null');
      return;
    }

    try {
      console.log('👆 User clicked install button');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log('📊 Install outcome:', outcome);
      if (outcome === 'accepted') {
        console.log('✅ User accepted installation');
        setIsInstalled(true);
        setShowPrompt(false);
      } else {
        console.log('❌ User dismissed installation');
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('❌ Installation error:', error);
    }
  };

  if (isInstalled) {
    console.log('🏠 App is installed, hiding install banners');
    return null;
  }

  return (
    <>
      {/* Browser Install Prompt (Blue Banner) */}
      {showPrompt && deferredPrompt && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-3 sm:p-4 shadow-lg z-50 animate-slideUp">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <p className="font-semibold text-sm sm:text-base">🎉 Install Ambetter Health App</p>
              <p className="text-xs sm:text-sm opacity-90">Get quick access to health services on your device</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={handleInstall}
                className="bg-white text-blue-600 px-3 sm:px-4 py-2 rounded font-semibold hover:bg-gray-100 text-xs sm:text-sm whitespace-nowrap transition-colors"
              >
                Install
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 text-xs sm:text-sm whitespace-nowrap transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Install Instructions (Amber Banner) */}
      {showManualInstall && !deferredPrompt && (
        <div className="fixed bottom-0 left-0 right-0 bg-amber-500 text-white p-3 sm:p-4 shadow-lg z-50 animate-slideUp">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base mb-2">📱 Install App</p>
                <div className="text-xs sm:text-sm opacity-95 space-y-1.5">
                  <p>
                    <strong>🍎 iPhone:</strong> <span className="block sm:inline">Tap Share → Add to Home Screen</span>
                  </p>
                  <p>
                    <strong>🤖 Android:</strong> <span className="block sm:inline">Tap Menu (⋮) → Install app</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowManualInstall(false)}
                className="flex-shrink-0 text-lg leading-none hover:opacity-75 transition-opacity"
                aria-label="Close install prompt"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Debug Info (only on development) */}
      {process.env.NODE_ENV === 'development' && isLoading && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-gray-800 text-white p-3 rounded text-xs font-mono z-40 max-h-32 overflow-auto">
          <p>🔄 Loading PWA install status...</p>
        </div>
      )}
    </>
  );
}
