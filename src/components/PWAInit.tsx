'use client';

import { useEffect } from 'react';

export default function PWAInit() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((reg) => {
          console.log('✅ SW registered');
          
          // Check for updates every 10 seconds
          setInterval(() => {
            console.log('🔄 Checking for SW update...');
            reg.update();
          }, 10000);
          
          // Listen for updates
          reg.addEventListener('updatefound', () => {
            console.log('📦 Update found!');
            const newSW = reg.installing;
            newSW?.addEventListener('statechange', () => {
              if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🎉 New SW ready - reloading page');
                window.location.reload();
              }
            });
          });
        })
        .catch((err) => console.error('❌ SW error:', err));
    }
  }, []);

  return null;
}

  return null;
}
