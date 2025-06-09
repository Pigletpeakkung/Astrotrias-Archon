// edge-functions/header.js

/**
 * Astrotrias Archon Edge Function
 * Multidimensional Header Enhancement & Security
 * Thanatsitt Santisamranwilai - Creative Technologist
 */

export default async (request, context) => {
  const response = await context.next();
  
  // Skip processing for non-HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  // Get request information for dynamic headers
  const url = new URL(request.url);
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

  // === SECURITY HEADERS ===
  // Content Security Policy for enhanced security
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://plausible.io",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
    "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https:",
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
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // === PERFORMANCE HEADERS ===
  // Cache Control based on content type and path
  if (url.pathname === '/' || url.pathname === '/index.html') {
    // Main page - cache for 1 hour with revalidation
    response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  } else if (url.pathname.includes('/assets/')) {
    // Static assets - cache for 1 year
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // Other pages - cache for 1 day
    response.headers.set('Cache-Control', 'public, max-age=86400');
  }

  // Enable compression
  response.headers.set('Vary', 'Accept-Encoding');

  // === COSMIC FEATURES ===
  // Add cosmic power level based on user agent
  const cosmicLevel = detectCosmicCompatibility(userAgent);
  response.headers.set('X-Cosmic-Compatibility', cosmicLevel);

  // Dimensional routing hints
  if (url.pathname.includes('dimensions')) {
    response.headers.set('X-Current-Dimension', 'Projects-Reality');
  } else if (url.pathname.includes('timeline')) {
    response.headers.set('X-Current-Dimension', 'Stellar-Journey');
  } else if (url.pathname.includes('contact')) {
    response.headers.set('X-Current-Dimension', 'Quantum-Link');
  } else {
    response.headers.set('X-Current-Dimension', 'Nexus-Hub');
  }

  // === ANALYTICS & MONITORING ===
  // Add headers for monitoring and analytics
  response.headers.set('X-Served-By', 'Astrotrias-Edge-Function');
  response.headers.set('X-Response-Time', `${Date.now()}`);
  
  // Add geographic hint if available
  const country = context.geo?.country?.code;
  if (country) {
    response.headers.set('X-Cosmic-Origin', country);
  }

  // === ACCESSIBILITY HEADERS ===
  response.headers.set('X-A11y-Features', 'enhanced-navigation,screen-reader-optimized,keyboard-accessible');
  
  // === API RATE LIMITING INFO ===
  response.headers.set('X-RateLimit-Limit', '1000');
  response.headers.set('X-RateLimit-Window', '3600');
  
  // === CORS FOR API ENDPOINTS ===
  if (url.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', 'https://astrotrias-archon.netlify.app');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Cosmic-Power');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  // === PRELOAD HINTS ===
  // Add resource hints for better performance
  const preloadHints = [
    '</assets/css/custom.css>; rel=preload; as=style',
    '<https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;900&display=swap>; rel=preload; as=style',
    '<https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js>; rel=preload; as=script'
  ];
  
  response.headers.set('Link', preloadHints.join(', '));

  // === COSMIC EASTER EGG ===
  // Add a fun easter egg for developers
  response.headers.set('X-Cosmic-Message', 'Welcome-to-the-Astrotrias-Dimension-🚀✨');
  response.headers.set('X-Hidden-Feature', 'konami-code-activated');

  // === PWA HEADERS ===
  response.headers.set('X-PWA-Ready', 'true');
  response.headers.set('X-Offline-Capable', 'service-worker-enabled');

  // === DEVELOPMENT vs PRODUCTION ===
  const isDev = url.hostname.includes('localhost') || url.hostname.includes('127.0.0.1');
  response.headers.set('X-Environment', isDev ? 'development' : 'production');
  
  if (isDev) {
    response.headers.set('X-Debug-Mode', 'active');
    response.headers.set('X-Hot-Reload', 'enabled');
  }

  // === FEATURE FLAGS ===
  response.headers.set('X-Features', JSON.stringify({
    quantumParticles: true,
    dimensionalPortal: true,
    cosmicAnimations: true,
    stellarTimeline: true,
    quantumForm: true,
    themeToggle: true,
    accessibilityMode: true,
    performanceOptimized: true
  }));

  // Log cosmic activity (in production, you might send this to analytics)
  console.log(`🚀 Cosmic Request: ${requestId} | ${url.pathname} | ${cosmicLevel} | ${timestamp}`);

  return response;
};

/**
 * Generate a cosmic-themed unique identifier
 */
function generateCosmicId() {
  const prefixes = ['ASTRO', 'QUANTUM', 'STELLAR', 'COSMIC', 'NEXUS'];
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
  if (ua.includes('chrome') && !ua.includes('edge')) {
    return 'QUANTUM-CHROME';
  }
  
  if (ua.includes('firefox')) {
    return 'STELLAR-FIREFOX';
  }
  
  if (ua.includes('safari') && !ua.includes('chrome')) {
    return 'COSMIC-SAFARI';
  }
  
  if (ua.includes('edge')) {
    return 'DIMENSIONAL-EDGE';
  }
  
  // Mobile browsers
  if (ua.includes('mobile')) {
    return 'QUANTUM-MOBILE';
  }
  
  // Bots and crawlers
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) {
    return 'ARCHIVAL-BOT';
  }
  
  // Unknown or older browsers
  return 'LEGACY-REALM';
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
export const config = {
  path: "/*",
  method: ["GET", "POST", "OPTIONS"]
};

// Alternative export for different Netlify configurations
export { default as handle };
