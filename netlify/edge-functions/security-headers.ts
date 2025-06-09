/**
 * ===============================================
 * ASTROTRIAS ARCHON - SECURITY HEADERS
 * Advanced security implementation
 * ===============================================
 */

import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  // Get the original response
  const response = await context.next();
  
  // Clone response to modify headers
  const newResponse = new Response(response.body, response);
  
  // Security Headers
  const securityHeaders = {
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https:",
      "media-src 'self' https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; '),
    
    // Prevent XSS attacks
    'X-XSS-Protection': '1; mode=block',
    
    // Prevent content type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions Policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'accelerometer=()',
      'gyroscope=()'
    ].join(', '),
    
    // Strict Transport Security (HTTPS only)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    
    // Cross-Origin Policies
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    
    // Cache Control for security-sensitive pages
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  };
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });
  
  // Add custom security headers based on path
  const url = new URL(request.url);
  
  if (url.pathname.includes('/admin') || url.pathname.includes('/api')) {
    // Extra security for admin/API routes
    newResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
    newResponse.headers.set('X-Admin-Access', 'restricted');
  }
  
  // Add performance headers
  newResponse.headers.set('X-DNS-Prefetch-Control', 'on');
  newResponse.headers.set('X-Powered-By', 'Astrotrias-Archon-Edge');
  
  return newResponse;
};
