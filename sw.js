/**
 * ===============================================
 * ASTROTRIAS ARCHON - QUANTUM SERVICE WORKER
 * Multidimensional PWA Implementation
 * ===============================================
 */

const CACHE_VERSION = 'cosmic-v2.1.0';
const STATIC_CACHE = `astrotrias-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `astrotrias-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `astrotrias-images-${CACHE_VERSION}`;

// Cosmic Manifest Constants
const COSMIC_THEME = '#6366f1';
const FALLBACK_IMAGE = '/assets/images/quantum-fallback.webp';
const OFFLINE_PAGE = '/offline.html';

// Quantum Network Strategies
const NETWORK_STRATEGIES = {
  IMMEDIATE: ['/api/', '/contact', '/submit-form'],
  CACHE_FIRST: [
    '/assets/',
    '/images/',
    '/icons/',
    '/fonts/',
    'https://cdn.jsdelivr.net/',
    'https://cdnjs.cloudflare.com/'
  ],
  STALE_REVALIDATE: [
    '/projects/',
    '/dimensions/',
    '/skills/'
  ]
};

// Cosmic Static Assets
const QUANTUM_ASSETS = [
  '/',
  '/index.html',
  OFFLINE_PAGE,
  '/manifest.json',
  '/assets/css/quantum.css',
  '/assets/js/cosmic-interactions.js',
  '/assets/fonts/quantum-display.woff2',
  FALLBACK_IMAGE
];

// Cosmic Event Types
const COSMIC_EVENTS = {
  INSTALL: 'cosmic-install',
  ACTIVATE: 'cosmic-activation',
  SYNC: 'quantum-sync',
  MESSAGE: 'multidimensional-message'
};

/**
 * Quantum Service Worker Installation
 */
self.addEventListener('install', (event) => {
  console.log('🌠 Quantum Service Worker: Initiating Cosmic Installation...');
  
  event.waitUntil(
    (async () => {
      try {
        const staticCache = await caches.open(STATIC_CACHE);
        await staticCache.addAll(QUANTUM_ASSETS);
        console.log('⚡ Cosmic Cache: Core assets stored');
        
        // Skip waiting to activate immediately across dimensions
        self.skipWaiting();
        console.log('🌀 Quantum State: Immediate activation requested');
      } catch (error) {
        console.error('❌ Cosmic Installation Failed:', error);
      }
    })()
  );
});

/**
 * Quantum Service Worker Activation
 */
self.addEventListener('activate', (event) => {
  console.log('✨ Quantum Service Worker: Cosmic Activation Sequence...');
  
  event.waitUntil(
    (async () => {
      try {
        // Purge old caches from parallel dimensions
        await clearObsoleteCaches();
        
        // Establish quantum entanglement with all clients
        await self.clients.claim();
        console.log('🌌 Quantum Link: All clients connected');
        
        // Broadcast activation event
        broadcastToClients({ type: COSMIC_EVENTS.ACTIVATE, payload: CACHE_VERSION });
      } catch (error) {
        console.error('❌ Cosmic Activation Failed:', error);
      }
    })()
  );
});

/**
 * Quantum Fetch Handler - Multidimensional Request Processing
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET quantum fluctuations
  if (request.method !== 'GET') return;
  
  // Handle different cosmic request types
  if (isImageRequest(request)) {
    event.respondWith(quantumImageFetch(request));
  } else if (shouldUseNetworkFirst(request)) {
    event.respondWith(quantumNetworkFirst(request));
  } else if (shouldUseCacheFirst(request)) {
    event.respondWith(quantumCacheFirst(request));
  } else {
    event.respondWith(quantumStaleWhileRevalidate(request));
  }
});

/**
 * Quantum Sync - Background Data Synchronization
 */
self.addEventListener('sync', (event) => {
  console.log('🔄 Quantum Sync: Initiating dimensional synchronization...');
  
  switch (event.tag) {
    case 'contact-sync':
      event.waitUntil(syncContactForms());
      break;
    case 'data-sync':
      event.waitUntil(syncProjectData());
      break;
    default:
      console.log(`🌀 Unknown sync tag: ${event.tag}`);
  }
});

/**
 * Quantum Push - Cosmic Notifications
 */
self.addEventListener('push', (event) => {
  console.log('📡 Quantum Push: Receiving cosmic transmission...');
  
  const payload = event.data?.json() || {
    title: 'Cosmic Update',
    body: 'New multidimensional update available!',
    icon: '/assets/icons/quantum-notification.png'
  };
  
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: payload.icon,
      badge: '/assets/icons/quantum-badge.png',
      vibrate: [200, 100, 200],
      data: { url: payload.url || '/' }
    })
  );
});

/**
 * Quantum Notification Interaction
 */
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Quantum Interaction: Notification activated');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  } else if (event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

/**
 * Quantum Message Handler - Cross-Dimensional Communication
 */
self.addEventListener('message', (event) => {
  console.log('📨 Quantum Message: Interdimensional communication received');
  
  switch (event.data?.type) {
    case 'UPDATE_REQUEST':
      self.skipWaiting();
      break;
    case 'CACHE_QUERY':
      handleCacheQuery(event);
      break;
    case 'PRE_CACHE':
      preCacheResources(event.data.urls);
      break;
  }
});

// =====================
// QUANTUM CORE FUNCTIONS
// =====================

/**
 * Quantum Image Fetch - With Cosmic Fallback
 */
async function quantumImageFetch(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Initiate background refresh
      fetch(request)
        .then(networkResponse => {
          if (networkResponse.ok) {
            cache.put(request, networkResponse);
          }
        })
        .catch(() => { /* Silent failure */ });
      
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
    
  } catch (error) {
    console.log('🌌 Serving cosmic fallback image');
    return caches.match(FALLBACK_IMAGE);
  }
}

/**
 * Quantum Network First - With Cosmic Fallback
 */
async function quantumNetworkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Update quantum cache in background
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('🌌 Network failed, consulting quantum cache...');
    return serveFromCache(request) || serveOfflineFallback();
  }
}

/**
 * Quantum Cache First - With Cosmic Validation
 */
async function quantumCacheFirst(request) {
  const cachedResponse = await serveFromCache(request);
  if (cachedResponse) return cachedResponse;
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return isHTMLRequest(request) 
      ? serveOfflineFallback()
      : new Response('Cosmic resource unavailable', { status: 503 });
  }
}

/**
 * Quantum Stale While Revalidate - Multidimensional Caching
 */
async function quantumStaleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Initiate quantum update in background
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => null); // Silent failure
  
  return cachedResponse || await fetchPromise || serveOfflineFallback();
}

// =====================
// QUANTUM UTILITIES
// =====================

async function clearObsoleteCaches() {
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  const cacheKeys = await caches.keys();
  
  return Promise.all(
    cacheKeys
      .filter(key => !currentCaches.includes(key))
      .map(key => {
        console.log(`♻️ Purging obsolete cache: ${key}`);
        return caches.delete(key);
      })
  );
}

async function serveFromCache(request) {
  const cache = await caches.open(STATIC_CACHE);
  return await cache.match(request);
}

async function serveOfflineFallback() {
  const cache = await caches.open(STATIC_CACHE);
  return await cache.match(OFFLINE_PAGE) || 
    new Response('Cosmic connection lost', { status: 503 });
}

async function syncContactForms() {
  // Implementation would connect to IndexedDB
  // and sync pending form submissions
  console.log('📡 Syncing contact forms across dimensions...');
}

async function preCacheResources(urls) {
  const cache = await caches.open(DYNAMIC_CACHE);
  await cache.addAll(urls);
}

function broadcastToClients(message) {
  self.clients.matchAll()
    .then(clients => {
      clients.forEach(client => {
        client.postMessage(message);
      });
    });
}

// =====================
// QUANTUM DETECTORS
// =====================

function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(request.url);
}

function isHTMLRequest(request) {
  return request.headers.get('Accept').includes('text/html');
}

function shouldUseNetworkFirst(request) {
  return NETWORK_STRATEGIES.IMMEDIATE.some(route => 
    request.url.includes(route));
}

function shouldUseCacheFirst(request) {
  return NETWORK_STRATEGIES.CACHE_FIRST.some(route => 
    request.url.includes(route));
}

console.log('🌠 Quantum Service Worker: Ready for multidimensional service');
