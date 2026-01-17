'use client';

import { useEffect } from 'react';

export default function PWAInit() {
  useEffect(() => {
    // Register service worker with cache busting query parameter
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(`/service-worker.js?v=${Date.now()}`)
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration);
          console.log('Service Worker scope:', registration.scope);
          
          // Check for updates immediately and every 10 seconds
          const checkUpdates = async () => {
            try {
              await registration.update();
              console.log('🔍 Checked for service worker update');
            } catch (err) {
              console.error('Update check failed:', err);
            }
          };
          
          // Check immediately
          checkUpdates();
          
          // Then check every 10 seconds
          const updateInterval = setInterval(checkUpdates, 10000);
          
          // Listen for new service worker ready
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('📦 New service worker installing...');
            
            newWorker?.addEventListener('statechange', () => {
              console.log('🔔 Service worker state:', newWorker.state);
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker is ready, reload immediately
                console.log('✨ New version detected! Reloading now...');
                window.location.reload();
              }
            });
          });
          
          // Request notification permission for better engagement
          if ('Notification' in window && Notification.permission === 'default') {
            console.log('Requesting notification permission...');
            Notification.requestPermission().catch(() => {});
          }
          
          return () => clearInterval(updateInterval);
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
        });
    } else {
      console.warn('⚠️ Service Worker not supported in this browser');
    }
  }, []);

  return null;
}
