// OmniInvest Service Worker
// Provides offline functionality and caching for cross-platform performance

const CACHE_NAME = 'omniinvest-v1.1.0';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap'
];

// Advanced caching strategies
const CACHE_STRATEGIES = {
  STATIC: 'static-v1',
  DYNAMIC: 'dynamic-v1',
  API: 'api-v1',
  IMAGES: 'images-v1'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_STRATEGIES.STATIC),
      caches.open(CACHE_STRATEGIES.DYNAMIC),
      caches.open(CACHE_STRATEGIES.API),
      caches.open(CACHE_STRATEGIES.IMAGES)
    ]).then(([staticCache]) => {
      return staticCache.addAll(STATIC_CACHE_URLS);
    })
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const url = new URL(event.request.url);
  
  // Handle different types of requests with optimized caching
  event.respondWith(
    handleRequest(event.request)
  );
});

// Advanced request handling with intelligent caching
async function handleRequest(request) {
  const url = new URL(request.url);
  
  // API requests - network first with short cache
  if (url.pathname.startsWith('/api/')) {
    return handleAPIRequest(request);
  }
  
  // Static assets - cache first
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|woff|woff2)$/)) {
    return handleStaticAsset(request);
  }
  
  // HTML pages - network first with cache fallback
  return handlePageRequest(request);
}

async function handleAPIRequest(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_STRATEGIES.API);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_STRATEGIES.STATIC);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Asset not available offline', { status: 503 });
  }
}

async function handlePageRequest(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_STRATEGIES.DYNAMIC);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || caches.match('/index.html');
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle offline actions when connection is restored
      handleBackgroundSync()
    );
  }
});

// Push notifications for market alerts
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'View Details',
          icon: '/icons/action-explore.png'
        },
        {
          action: 'close',
          title: 'Dismiss',
          icon: '/icons/action-close.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/?notification=' + event.notification.data.primaryKey)
    );
  }
});

// Background sync handler
async function handleBackgroundSync() {
  try {
    // Sync offline actions with server
    const offlineActions = await getOfflineActions();
    
    for (const action of offlineActions) {
      await syncAction(action);
    }
    
    await clearOfflineActions();
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Helper functions for offline functionality
async function getOfflineActions() {
  // Retrieve actions stored while offline
  return [];
}

async function syncAction(action) {
  // Sync individual action with server
  return fetch('/api/sync', {
    method: 'POST',
    body: JSON.stringify(action),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

async function clearOfflineActions() {
  // Clear synced actions from local storage
  return Promise.resolve();
}