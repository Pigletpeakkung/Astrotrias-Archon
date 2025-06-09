// netlify/edge-functions/headers.js

/**
 * Astrotrias Archon Edge Function
 * Multidimensional Header Enhancement & Security
 * Thanatsitt Santisamranwilai - Creative Technologist
 * Version: 2.0.0
 */

export default async (request, context) => {
  try {
    const response = await context.next();
    
    // Skip processing for non-HTML responses and static assets
    const contentType = response.headers.get('content-type') || '';
    const url = new URL(request.url);
    
    // Skip edge function for static assets to avoid processing overhead
    if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/)) {
      return response;
    }

    // Get request information for dynamic headers
    const userAgent = request.headers.get('user-agent') || '';
    const timestamp = new Date().toISOString();
    const requestId = generateCosmicId();

    // === COSMIC BRANDING HEADERS ===
    response.headers.set('X-Cosmic-Power', 'Quantum-Enabled');
    response.headers.set('X-Astrotrias', 'Archon-Active');
    response.headers.set('X-Dimensional-State', 'Multi-Reality');
    response.headers.set('X-Consciousness-Level', 'Advanced-AI');
    response.headers.set('X-Creator', 'Thanatsitt-Santisamranwilai');
    response.headers.set('X-Cosmic-Timestamp', timestamp);
    response.headers.set('X-Quantum-Request-ID', requestId);

    // === ENHANCED SECURITY HEADERS ===
    // Content Security Policy for maximum security
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://plausible.io",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.gstatic.com",
      "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com https://cdnjs.cloudflare.com",
      "img-src 'self' data: https: blob:",
      "media-src 'self' https:",
      "connect-src 'self' https: wss:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ');

    response.headers.set('Content-Security-Policy', csp);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=(), usb=()');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

    // === INTELLIGENT CACHE CONTROL ===
    setCacheHeaders(response, url);

    // === COSMIC FEATURES ===
    const cosmicLevel = detectCosmicCompatibility(userAgent);
    response.headers.set('X-Cosmic-Compatibility', cosmicLevel);

    // Dimensional routing hints
    setDimensionalHeaders(response, url);

    // === PERFORMANCE OPTIMIZATION ===
    response.headers.set('Vary', 'Accept-Encoding, User-Agent');
    response.headers.set('X-Served-By', 'Astrotrias-Edge-Function');
    
    // Add geographic hint if available
    const country = context.geo?.country?.code;
    if (country) {
      response.headers.set('X-Cosmic-Origin', country);
      response.headers.set('X-Geo-Country', country);
    }

    // === ACCESSIBILITY & PWA HEADERS ===
    response.headers.set('X-A11y-Features', 'enhanced-navigation,screen-reader-optimized,keyboard-accessible');
    response.headers.set('X-PWA-Ready', 'true');
    response.headers.set('X-Offline-Capable', 'service-worker-enabled');

    // === API RATE LIMITING INFO ===
    response.headers.set('X-RateLimit-Limit', '1000');
    response.headers.set('X-RateLimit-Window', '3600');
    
    // === CORS FOR API ENDPOINTS ===
    if (url.pathname.startsWith('/api/')) {
      setCorsHeaders(response, url);
    }

    // === RESOURCE HINTS FOR PERFORMANCE ===
    if (contentType.includes('text/html')) {
      setResourceHints(response);
    }

    // === ENVIRONMENT & FEATURE FLAGS ===
    setEnvironmentHeaders(response, url);
    setFeatureFlags(response);

    // === COSMIC EASTER EGG ===
    response.headers.set('X-Cosmic-Message', 'Welcome-to-the-Astrotrias-Dimension-🚀✨');
    response.headers.set('X-Hidden-Feature', 'konami-code-activated');

    // Log cosmic activity for monitoring
    logCosmicActivity(requestId, url, cosmicLevel, timestamp, context);

    return response;

  } catch (error) {
    console.error('🚨 Cosmic Edge Function Error:', error);
    // Return the original response if edge function fails
    return await context.next();
  }
};

/**
 * Set intelligent cache headers based on content type and path
 */
function setCacheHeaders(response, url) {
  if (url.pathname === '/' || url.pathname === '/index.html') {
    // Main page - cache for 1 hour with revalidation
    response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  } else if (url.pathname.includes('/assets/') || url.pathname.match(/\.(css|js|woff|woff2)$/)) {
    // Static assets - cache for 1 year
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (url.pathname.match(/\.(png|jpg|jpeg|svg|ico|webp)$/)) {
    // Images - cache for 30 days
    response.headers.set('Cache-Control', 'public, max-age=2592000');
  } else {
    // Other pages - cache for 1 day
    response.headers.set('Cache-Control', 'public, max-age=86400');
  }
}

/**
 * Set dimensional routing headers based on current path
 */
function setDimensionalHeaders(response, url) {
  const path = url.pathname.toLowerCase();
  
  if (path.includes('dimensions') || path.includes('projects')) {
    response.headers.set('X-Current-Dimension', 'Projects-Reality');
  } else if (path.includes('timeline') || path.includes('about')) {
    response.headers.set('X-Current-Dimension', 'Stellar-Journey');
  } else if (path.includes('contact')) {
    response.headers.set('X-Current-Dimension', 'Quantum-Link');
  } else if (path.includes('skills')) {
    response.headers.set('X-Current-Dimension', 'Expertise-Matrix');
  } else {
    response.headers.set('X-Current-Dimension', 'Nexus-Hub');
  }
}

/**
 * Set CORS headers for API endpoints
 */
function setCorsHeaders(response, url) {
  response.headers.set('Access-Control-Allow-Origin', 'https://astrotrias-archon.netlify.app');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Cosmic-Power');
  response.headers.set('Access-Control-Max-Age', '86400');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
}

/**
 * Set resource hints for better performance
 */
function setResourceHints(response) {
  const preloadHints = [
    '<https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap>; rel=preload; as=style',
    '<https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css>; rel=preload; as=style',
    '<https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css>; rel=preload; as=style'
  ];
  
  response.headers.set('Link', preloadHints.join(', '));
}

/**
 * Set environment and debug headers
 */
function setEnvironmentHeaders(response, url) {
  const isDev = url.hostname.includes('localhost') || 
                url.hostname.includes('127.0.0.1') || 
                url.hostname.includes('deploy-preview');
  
  response.headers.set('X-Environment', isDev ? 'development' : 'production');
  
  if (isDev) {
    response.headers.set('X-Debug-Mode', 'active');
    response.headers.set('X-Hot-Reload', 'enabled');
  }
}

/**
 * Set feature flags for frontend consumption
 */
function setFeatureFlags(response) {
  const features = {
    quantumParticles: true,
    dimensionalPortal: true,
    cosmicAnimations: true,
    stellarTimeline: true,
    quantumForm: true,
    themeToggle: true,
    accessibilityMode: true,
    performanceOptimized: true,
    edgeFunctions: true,
    realTimeAnalytics: true
  };
  
  response.headers.set('X-Features', JSON.stringify(features));
}

/**
 * Log cosmic activity for monitoring and analytics
 */
function logCosmicActivity(requestId, url, cosmicLevel, timestamp, context) {
  const logData = {
    requestId,
    path: url.pathname,
    cosmicLevel,
    timestamp,
    country: context.geo?.country?.code || 'unknown',
    city: context.geo?.city || 'unknown'
  };
  
  console.log(`🚀 Cosmic Request:`, JSON.stringify(logData));
}

/**
 * Generate a cosmic-themed unique identifier
 */
function generateCosmicId() {
  const prefixes = ['ASTRO', 'QUANTUM', 'STELLAR', 'COSMIC', 'NEXUS', 'ARCHON'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
}

/**
 * Detect cosmic compatibility based on user agent
 */
function detectCosmicCompatibility(userAgent) {
  if (!userAgent) return 'UNKNOWN';
  
  const ua = userAgent.toLowerCase();
  
  // Modern browsers with full cosmic capabilities
  if (ua.includes('chrome') && !ua.includes('edge') && !ua.includes('edg/')) {
    return 'QUANTUM-CHROME';
  }
  
  if (ua.includes('firefox')) {
    return 'STELLAR-FIREFOX';
  }
  
  if (ua.includes('safari') && !ua.includes('chrome')) {
    return 'COSMIC-SAFARI';
  }
  
  if (ua.includes('edge') || ua.includes('edg/')) {
    return 'DIMENSIONAL-EDGE';
  }
  
  // Mobile browsers
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'QUANTUM-MOBILE';
  }
  
  // Bots and crawlers
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider') || ua.includes('googlebot')) {
    return 'ARCHIVAL-BOT';
  }
  
  // Unknown or older browsers
  return 'LEGACY-REALM';
}

// Export configuration for Netlify Edge Functions
export const config = {
  path: "/*"
};
