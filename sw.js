/**
 * Astrotrias Archon - Service Worker
 * PWA Caching Strategy for Cosmic Performance
 * Author: Thanatsitt Santisamranwilai (Astrotrias Archon)
 * Version: 1.0.0
 */

const CACHE_NAME = 'astrotrias-archon-v1.0.0';
const STATIC_CACHE = 'astrotrias-static-v1.0.0';
const DYNAMIC_CACHE = 'astrotrias-dynamic-v1.0.0';

// 🌟 Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/custom.css',
  // External CDN resources
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;900&display=swap',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js'
];

// 🎯 Dynamic resources to cache on demand
const DYNAMIC_ASSETS = [
  'https://fonts.gstatic.com/',
  'https://plausible.io/js/script.js'
];

// 🚀 Install Event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('🌌 Astrotrias Archon SW: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Failed to cache static assets:', error);
      })
  );
});

// 🔄 Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  console.log('🌟 Astrotrias Archon SW: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Cache cleanup completed');
        return self.clients.claim();
      })
  );
});

// 🌐 Fetch Event - Serve cached content with fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 🏠 Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html')
        .then((response) => {
          return response || fetch(request);
        })
        .catch(() => {
          return caches.match('/index.html');
        })
    );
    return;
  }

  // 🎨 Handle static assets
  if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request)
            .then((fetchResponse) => {
              const responseClone = fetchResponse.clone();
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
              return fetchResponse;
            });
        })
        .catch(() => {
          console.log('🔄 Serving from cache:', request.url);
          return caches.match(request);
        })
    );
    return;
  }

  // 🌊 Handle dynamic content
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            // Serve from cache, but update in background
            fetch(request)
              .then((fetchResponse) => {
                const responseClone = fetchResponse.clone();
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              })
              .catch(() => {
                console.log('🔄 Background update failed for:', request.url);
              });
            return response;
          }

          // Not in cache, fetch and cache
          return fetch(request)
            .then((fetchResponse) => {
              const responseClone = fetchResponse.clone();
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
              return fetchResponse;
            });
        })
        .catch(() => {
          // Network failed, try to serve from cache
          return caches.match(request);
        })
    );
  }
});

// 📱 Handle background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    console.log('🔄 Background sync: Contact form');
    event.waitUntil(
      // Handle offline form submissions
      syncContactForm()
    );
  }
});

// 🔔 Handle push notifications (future feature)
self.addEventListener('push', (event) => {
  console.log('🔔 Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New cosmic update available!',
    icon: '/assets/images/icon-192.png',
    badge: '/assets/images/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Dimensions',
        icon: '/assets/images/icon-192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/images/icon-192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Astrotrias Archon', options)
  );
});

// 🎯 Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('🎯 Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/#dimensions')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 🌐 Utility function for contact form sync
async function syncContactForm() {
  try {
    // Get stored form data from IndexedDB
    const formData = await getStoredFormData();
    
    if (formData) {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        // Clear stored data after successful submission
        await clearStoredFormData();
        console.log('✅ Contact form synced successfully');
      }
    }
  } catch (error) {
    console.error('❌ Contact form sync failed:', error);
  }
}

// 📊 Utility functions for IndexedDB (simplified)
async function getStoredFormData() {
  // Implementation for retrieving stored form data
  // This would integrate with IndexedDB for offline form storage
  return null;
}

async function clearStoredFormData() {
  // Implementation for clearing stored form data
  // This would clear IndexedDB after successful sync
}

// 🎨 Cache management utilities
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('🔄 Skipping waiting...');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    console.log('📦 Caching additional URLs...');
    event.waitUntil(
      caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          return cache.addAll(event.data.payload);
        })
    );
  }
});

// 🌟 Performance monitoring
self.addEventListener('fetch', (event) => {
  // Track performance metrics
  const startTime = performance.now();
  
  event.respondWith(
    handleRequest(event.request)
      .then((response) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Log performance metrics (could send to analytics)
        if (duration > 1000) {
          console.warn(`⚠️ Slow request: ${event.request.url} took ${duration}ms`);
        }
        
        return response;
      })
  );
});

// 🚀 Main request handler
async function handleRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('🌐 Request failed:', error);
    
    // Return cached version if available
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    
    throw error;
  }
}

console.log('🌌 Astrotrias Archon Service Worker loaded successfully!');
