'use client';

import { useEffect } from 'react';

interface ExtendedServiceWorkerRegistration extends ServiceWorkerRegistration {
  sync?: {
    register: (tag: string) => Promise<void>;
  };
  periodicSync?: {
    register: (tag: string, options: { minInterval: number }) => Promise<void>;
  };
}

export default function PWAInit() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg: ExtendedServiceWorkerRegistration) => {
          console.log('✅ SW registered');
          
          // CRITICAL: Check for updates immediately on app load
          // This ensures browser detects new SW right away, even if cached
          reg.update().then(() => {
            console.log('🔄 Initial update check complete');
          }).catch((err: any) => {
            console.log('⚠️ Initial update check failed:', err);
          });
          
          // Then check for updates every 10 seconds
          setInterval(() => {
            console.log('🔄 Checking for SW update...');
            reg.update();
          }, 10000);
          
          // Register periodic sync for background updates (every 12 hours)
          if ('periodicSync' in reg && 'PeriodicSyncManager' in window) {
            // Check if permission was properly granted
            navigator.permissions.query({
              name: 'periodic-background-sync' as any
            }).then((syncPermission: any) => {
              if (syncPermission.state === 'granted') {
                (reg.periodicSync as any).register('update-check', {
                  minInterval: 12 * 60 * 60 * 1000 // 12 hours
                }).then(() => {
                  console.log('✅ Periodic sync registered');
                }).catch((err: any) => {
                  console.log('⚠️ Periodic sync registration failed:', err);
                });
              }
            }).catch((err: any) => {
              console.log('⚠️ Periodic sync permission query failed:', err);
            });
          }
          
          // Register background sync for data syncing when connectivity is restored
          if ('sync' in reg && 'SyncManager' in window) {
            // Trigger sync immediately and on reconnection
            const registerSync = () => {
              (reg.sync as any).register('sync-health-data').then(() => {
                console.log('✅ Background sync registered');
              }).catch((err: any) => {
                console.log('⚠️ Background sync registration failed:', err);
              });
            };
            
            // Register on app load
            registerSync();
            
            // Re-register when coming back online
            window.addEventListener('online', registerSync);
          }
          
          // Request push notification permission and register
          if ('Notification' in window && 'pushManager' in reg) {
            Notification.requestPermission().then((permission) => {
              if (permission === 'granted') {
                reg.pushManager.subscribe({
                  userVisibleOnly: true
                }).then((subscription) => {
                  console.log('✅ Push notifications enabled');
                }).catch((err) => {
                  console.log('⚠️ Push subscription failed:', err);
                });
              } else {
                console.log('⚠️ Push notification permission denied');
              }
            });
          }
          
          // Check for updates every 5 seconds (aggressive update check for APK)
          const updateInterval = setInterval(() => {
            console.log('🔄 Checking for SW update...');
            reg.update().catch((err) => {
              console.error('❌ Update check failed:', err);
            });
          }, 5000);
          
          // Listen for updates - reload immediately when new version ready
          reg.addEventListener('updatefound', () => {
            console.log('📦 Update found!');
            const newSW = reg.installing;
            
            newSW?.addEventListener('statechange', () => {
              if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker is ready
                console.log('🎉 New SW ready - auto-reloading page');
                
                // Clear all caches to ensure fresh content
                caches.keys().then((cacheNames) => {
                  Promise.all(cacheNames.map(name => caches.delete(name)));
                });
                
                // Force reload to get new content immediately
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }
            });
          });
        })
        .catch((err) => console.error('❌ SW error:', err));
    }
  }, []);

  return null;
}