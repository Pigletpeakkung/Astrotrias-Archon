/**
 * ===============================================
 * ASTROTRIAS ARCHON - SERVICE WORKER
 * Progressive Web App Implementation
 * ===============================================
 */

const CACHE_NAME = 'astrotrias-archon-v1.2.0';
const STATIC_CACHE = 'astrotrias-static-v1.2.0';
const DYNAMIC_CACHE = 'astrotrias-dynamic-v1.2.0';
const IMAGE_CACHE = 'astrotrias-images-v1.2.0';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/custom.css',
    '/assets/js/quantum.js',
    '/assets/js/custom-interactions.js',
    '/assets/fonts/inter-v12-latin-regular.woff2',
    '/assets/fonts/inter-v12-latin-600.woff2',
    '/assets/fonts/inter-v12-latin-700.woff2',
    '/assets/fonts/playfair-display-v30-latin-regular.woff2',
    '/assets/fonts/playfair-display-v30-latin-600.woff2',
    '/assets/fonts/jetbrains-mono-v13-latin-regular.woff2',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Routes that should always be fetched from network first
const NETWORK_FIRST_ROUTES = [
    '/api/',
    '/contact',
    '/submit-form'
];

// Routes that can be served from cache first
const CACHE_FIRST_ROUTES = [
    '/assets/',
    '/images/',
    '/icons/'
];

/**
 * Service Worker Installation
 */
self.addEventListener('install', (event) => {
    console.log('🚀 Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('📦 Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            }),
            
            // Skip waiting to activate immediately
            self.skipWaiting()
        ])
    );
});

/**
 * Service Worker Activation
 */
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker: Activating...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            cleanupOldCaches(),
            
            // Claim all clients immediately
            self.clients.claim()
        ])
    );
});

/**
 * Fetch Event Handler
 */
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    // Handle different types of requests
    if (isImageRequest(request)) {
        event.respondWith(handleImageRequest(request));
    } else if (isStaticAsset(request)) {
        event.respondWith(handleStaticAsset(request));
    } else if (isNetworkFirstRoute(request)) {
        event.respondWith(handleNetworkFirst(request));
    } else if (isCacheFirstRoute(request)) {
        event.respondWith(handleCacheFirst(request));
    } else {
        event.respondWith(handleStaleWhileRevalidate(request));
    }
});

/**
 * Background Sync for form submissions
 */
self.addEventListener('sync', (event) => {
    console.log('🔄 Service Worker: Background sync triggered');
    
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForm());
    }
});

/**
 * Push Notification Handler
 */
self.addEventListener('push', (event) => {
    console.log('📱 Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/assets/icons/action-explore.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/icons/action-close.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Astrotrias Archon', options)
    );
});

/**
 * Notification Click Handler
 */
self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

/**
 * Message Handler for communication with main thread
 */
self.addEventListener('message', (event) => {
    console.log('💬 Service Worker: Message received', event.data);
    
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'SKIP_WAITING':
                self.skipWaiting();
                break;
                
            case 'GET_VERSION':
                event.ports[0].postMessage({ version: CACHE_NAME });
                break;
                
            case 'CACHE_URLS':
                event.waitUntil(cacheUrls(event.data.urls));
                break;
                
            case 'CLEAR_CACHE':
                event.waitUntil(clearAllCaches());
                break;
        }
    }
});

/**
 * Cleanup old caches
 */
async function cleanupOldCaches() {
    const cacheNames = await caches.keys();
    const validCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
    
    return Promise.all(
        cacheNames
            .filter(cacheName => !validCaches.includes(cacheName))
            .map(cacheName => {
                console.log('🗑️ Service Worker: Deleting old cache', cacheName);
                return caches.delete(cacheName);
            })
    );
}

/**
 * Handle image requests with cache-first strategy
 */
async function handleImageRequest(request) {
    try {
        const cache = await caches.open(IMAGE_CACHE);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            // Return cached image and update in background
            fetchAndCache(request, cache);
            return cachedResponse;
        }
        
        // Fetch and cache new image
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
        
    } catch (error) {
        console.error('❌ Service Worker: Image request failed', error);
        return new Response('Image not available', { status: 404 });
    }
}

/**
 * Handle static assets with cache-first strategy
 */
async function handleStaticAsset(request) {
    try {
        const cache = await caches.open(STATIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
        
    } catch (error) {
        console.error('❌ Service Worker: Static asset request failed', error);
        return new Response('Asset not available', { status: 404 });
    }
}

/**
 * Handle network-first requests
 */
async function handleNetworkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.log('🌐 Service Worker: Network failed, trying cache', error);
        
        const cache = await caches.open(DYNAMIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return new Response('Content not available offline', { 
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

/**
 * Handle cache-first requests
 */
async function handleCacheFirst(request) {
    try {
        const cache = await caches.open(STATIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
        
    } catch (error) {
        console.error('❌ Service Worker: Cache-first request failed', error);
        return new Response('Resource not available', { status: 404 });
    }
}

/**
 * Handle stale-while-revalidate strategy
 */
async function handleStaleWhileRevalidate(request) {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        // Fetch fresh version in background
        const fetchPromise = fetch(request).then(networkResponse => {
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        });
        
        // Return cached version immediately if available
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Otherwise wait for network
        return await fetchPromise;
        
    } catch (error) {
        console.error('❌ Service Worker: Stale-while-revalidate failed', error);
        return new Response('Content not available', { status: 404 });
    }
}

/**
 * Fetch and cache helper function
 */
async function fetchAndCache(request, cache) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
    } catch (error) {
        console.log('🔄 Service Worker: Background fetch failed', error);
    }
}

/**
 * Sync contact form submissions
 */
async function syncContactForm() {
    try {
        // Get pending form submissions from IndexedDB
        const pendingSubmissions = await getPendingSubmissions();
        
        for (const submission of pendingSubmissions) {
            try {
                const response = await fetch('/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submission.data)
                });
                
                if (response.ok) {
                    await removePendingSubmission(submission.id);
                    console.log('✅ Service Worker: Form submission synced');
                }
            } catch (error) {
                console.error('❌ Service Worker: Form sync failed', error);
            }
        }
    } catch (error) {
        console.error('❌ Service Worker: Sync process failed', error);
    }
}

/**
 * Cache specific URLs
 */
async function cacheUrls(urls) {
    const cache = await caches.open(DYNAMIC_CACHE);
    return Promise.all(
        urls.map(url => {
            return fetch(url).then(response => {
                if (response.ok) {
                    return cache.put(url, response);
                }
            }).catch(error => {
                console.error('❌ Service Worker: Failed to cache URL', url, error);
            });
        })
    );
}

/**
 * Clear all caches
 */
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
}

/**
 * Helper functions for request classification
 */
function isImageRequest(request) {
    return request.destination === 'image' || 
           /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(request.url);
}

function isStaticAsset(request) {
    return CACHE_FIRST_ROUTES.some(route => request.url.includes(route)) ||
           /\.(css|js|woff|woff2|ttf|eot)$/i.test(request.url);
}

function isNetworkFirstRoute(request) {
    return NETWORK_FIRST_ROUTES.some(route => request.url.includes(route));
}

function isCacheFirstRoute(request) {
    return CACHE_FIRST_ROUTES.some(route => request.url.includes(route));
}

/**
 * IndexedDB helpers for offline form submissions
 */
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('AstrotriasDB', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('submissions')) {
                const store = db.createObjectStore('submissions', { keyPath: 'id', autoIncrement: true });
                store.createIndex('timestamp', 'timestamp', { unique: false });
            }
        };
    });
}

async function getPendingSubmissions() {
    try {
        const db = await openDB();
        const transaction = db.transaction(['submissions'], 'readonly');
        const store = transaction.objectStore('submissions');
        
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    } catch (error) {
        console.error('❌ Service Worker: Failed to get pending submissions', error);
        return [];
    }
}

async function removePendingSubmission(id) {
    try {
        const db = await openDB();
        const transaction = db.transaction(['submissions'], 'readwrite');
        const store = transaction.objectStore('submissions');
        
        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    } catch (error) {
        console.error('❌ Service Worker: Failed to remove submission', error);
    }
}

console.log('🌌 Astrotrias Archon Service Worker Loaded');
