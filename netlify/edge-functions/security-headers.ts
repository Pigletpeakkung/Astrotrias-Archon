// netlify/edge-functions/security-headers.ts
import { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  const response = await context.next();
  
  // Skip for static assets
  if (request.url.includes("/assets/")) {
    return response;
  }

  // Core security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  
  // Modern CSP (adjust based on your needs)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://plausible.io", // Allow Plausible analytics
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://plausible.io",
    "frame-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  // Feature Policy (for older browsers)
  response.headers.set("Feature-Policy", [
    "geolocation 'none'",
    "microphone 'none'",
    "camera 'none'",
    "fullscreen 'self'"
  ].join("; "));

  // HSTS (enable only in production)
  if (context.site.environment === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  // Add nonce for inline scripts (advanced)
  if (!response.headers.get("x-nonce")) {
    const nonce = crypto.randomUUID();
    response.headers.set("x-nonce", nonce);
    
    // Replace placeholder in HTML
    if (response.headers.get("Content-Type")?.includes("text/html")) {
      const body = await response.text();
      const newBody = body.replace(/<script nonce-placeholder>/g, `<script nonce="${nonce}">`);
      return new Response(newBody, {
        status: response.status,
        headers: response.headers
      });
    }
  }

  return response;
};
