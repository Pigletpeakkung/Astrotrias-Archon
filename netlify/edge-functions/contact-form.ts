/**
 * ===============================================
 * ASTROTRIAS ARCHON - CONTACT FORM EDGE FUNCTION
 * Advanced form processing with validation & security
 * ===============================================
 */

import type { Context } from "https://edge.netlify.com";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
  timestamp: number;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export default async (request: Request, context: Context) => {
  // Only handle POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Parse form data
    const formData = await parseFormData(request);
    
    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return createErrorResponse(validation.errors, 400);
    }

    // Security checks
    const securityCheck = await performSecurityChecks(formData, request, context);
    if (!securityCheck.passed) {
      return createErrorResponse([securityCheck.reason], 403);
    }

    // Rate limiting
    const rateLimitCheck = await checkRateLimit(request, context);
    if (!rateLimitCheck.allowed) {
      return createErrorResponse(['Rate limit exceeded. Please try again later.'], 429);
    }

    // Process the form submission
    const result = await processFormSubmission(formData, request, context);
    
    if (result.success) {
      // Log successful submission
      await logSubmission(formData, request, context);
      
      return createSuccessResponse({
        message: '🚀 Message sent successfully! I\'ll get back to you soon.',
        id: result.submissionId
      });
    } else {
      return createErrorResponse(['Failed to process submission'], 500);
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return createErrorResponse(['Internal server error'], 500);
  }
};

/**
 * Parse form data from request
 */
async function parseFormData(request: Request): Promise<ContactFormData> {
  const contentType = request.headers.get('content-type') || '';
  
  if (contentType.includes('application/json')) {
    return await request.json();
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData();
    return {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      honeypot: formData.get('honeypot') as string,
      timestamp: Date.now()
    };
  } else {
    throw new Error('Unsupported content type');
  }
}

/**
 * Validate form data
 */
function validateFormData(data: ContactFormData): ValidationResult {
  const errors: string[] = [];

  // Required fields
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters long');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  // Length limits
  if (data.name && data.name.length > 100) {
    errors.push('Name is too long (max 100 characters)');
  }

  if (data.subject && data.subject.length > 200) {
    errors.push('Subject is too long (max 200 characters)');
  }

  if (data.message && data.message.length > 5000) {
    errors.push('Message is too long (max 5000 characters)');
  }

  // Content validation
  if (containsSuspiciousContent(data.message)) {
    errors.push('Message contains suspicious content');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check for suspicious content
 */
function containsSuspiciousContent(text: string): boolean {
  const suspiciousPatterns = [
    /https?:\/\/[^\s]+/gi, // URLs
    /\b(?:viagra|cialis|casino|lottery|winner)\b/gi, // Spam keywords
    /<script|javascript:|onclick=/gi, // XSS attempts
    /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g // Credit card patterns
  ];

  return suspiciousPatterns.some(pattern => pattern.test(text));
}

/**
 * Perform security checks
 */
async function performSecurityChecks(
  data: ContactFormData, 
  request: Request, 
  context: Context
): Promise<{ passed: boolean; reason: string }> {
  
  // Honeypot check
  if (data.honeypot && data.honeypot.trim() !== '') {
    return { passed: false, reason: 'Bot detected' };
  }

  // Timestamp check (form should take at least 3 seconds to fill)
  const submissionTime = Date.now();
  const timeDiff = submissionTime - (data.timestamp || 0);
  if (timeDiff < 3000) {
    return { passed: false, reason: 'Form submitted too quickly' };
  }

  // Check for suspicious user agent
  const userAgent = request.headers.get('user-agent') || '';
  if (isSuspiciousUserAgent(userAgent)) {
    return { passed: false, reason: 'Suspicious user agent' };
  }

  // Check referrer
  const referrer = request.headers.get('referer') || '';
  const origin = new URL(request.url).origin;
  if (referrer && !referrer.startsWith(origin)) {
    return { passed: false, reason: 'Invalid referrer' };
  }

  return { passed: true, reason: '' };
}

/**
 * Check if user agent is suspicious
 */
function isSuspiciousUserAgent(userAgent: string): boolean {
  const suspiciousPatterns = [
    /bot|crawler|spider|scraper/i,
    /curl|wget|python|php/i,
    /^$/
  ];

  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}

/**
 * Rate limiting check
 */
async function checkRateLimit(
  request: Request, 
  context: Context
): Promise<{ allowed: boolean; remaining: number }> {
  
  const clientIP = context.ip;
  const rateLimitKey = `rate_limit:${clientIP}`;
  
  try {
    // Get current count from Netlify Blobs (or use a simple in-memory store)
    const currentCount = await getRateLimitCount(rateLimitKey);
    const limit = 5; // 5 submissions per hour
    const windowMs = 60 * 60 * 1000; // 1 hour
    
    if (currentCount >= limit) {
      return { allowed: false, remaining: 0 };
    }

    // Increment counter
    await incrementRateLimitCount(rateLimitKey, windowMs);
    
    return { allowed: true, remaining: limit - currentCount - 1 };
    
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // Allow request if rate limiting fails
    return { allowed: true, remaining: 0 };
  }
}

/**
 * Get rate limit count (simplified implementation)
 */
async function getRateLimitCount(key: string): Promise<number> {
  // In a real implementation, you'd use Netlify Blobs or external storage
  // For now, return 0 (no rate limiting)
  return 0;
}

/**
 * Increment rate limit count
 */
async function incrementRateLimitCount(key: string, windowMs: number): Promise<void> {
  // Implementation would store/increment counter with expiration
  // Using Netlify Blobs or external storage
}

/**
 * Process form submission
 */
async function processFormSubmission(
  data: ContactFormData,
  request: Request,
  context: Context
): Promise<{ success: boolean; submissionId?: string }> {
  
  try {
    // Create submission ID
    const submissionId = generateSubmissionId();
    
    // Prepare email content
    const emailContent = formatEmailContent(data, request, context);
    
    // Send email (using Netlify Forms or external service)
    const emailSent = await sendNotificationEmail(emailContent);
    
    // Store submission for backup
    await storeSubmission({
      ...data,
      id: submissionId,
      ip: context.ip,
      userAgent: request.headers.get('user-agent') || '',
      timestamp: Date.now()
    });

    return { success: emailSent, submissionId };
    
  } catch (error) {
    console.error('Form processing error:', error);
    return { success: false };
  }
}

/**
 * Generate unique submission ID
 */
function generateSubmissionId(): string {
  return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format email content
 */
function formatEmailContent(
  data: ContactFormData,
  request: Request,
  context: Context
): string {
  return `
🌌 New Contact Form Submission - Astrotrias Archon

📧 From: ${data.name} <${data.email}>
📝 Subject: ${data.subject}

💬 Message:
${data.message}

🔍 Technical Details:
- IP Address: ${context.ip}
- User Agent: ${request.headers.get('user-agent') || 'Unknown'}
- Timestamp: ${new Date().toISOString()}
- Referrer: ${request.headers.get('referer') || 'Direct'}

---
Sent via Astrotrias Archon Contact Form
  `.trim();
}

/**
 * Send notification email
 */
async function sendNotificationEmail(content: string): Promise<boolean> {
  try {
    // In a real implementation, integrate with:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Netlify Forms
    
    // For now, just log the content
    console.log('Email content:', content);
    
    // Simulate email sending
    return true;
    
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

/**
 * Store submission for backup
 */
async function storeSubmission(submission: any): Promise<void> {
  try {
    // Store in Netlify Blobs or external database
    console.log('Storing submission:', submission.id);
  } catch (error) {
    console.error('Failed to store submission:', error);
  }
}

/**
 * Log successful submission
 */
async function logSubmission(
  data: ContactFormData,
  request: Request,
  context: Context
): Promise<void> {
  
  const logEntry = {
    type: 'contact_form_submission',
    timestamp: new Date().toISOString(),
    ip: context.ip,
    userAgent: request.headers.get('user-agent'),
    name: data.name,
    email: data.email,
    subject: data.subject
  };

  console.log('Contact form submission:', logEntry);
}

/**
 * Create success response
 */
function createSuccessResponse(data: any): Response {
  return new Response(JSON.stringify({
    success: true,
    ...data
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

/**
 * Create error response
 */
function createErrorResponse(errors: string[], status: number): Response {
  return new Response(JSON.stringify({
    success: false,
    errors
  }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
