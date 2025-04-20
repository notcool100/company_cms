import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Simple in-memory store for rate limiting
// In production, use Redis or another distributed store
const rateLimit = new Map<string, { count: number; resetTime: number }>();

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Only apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Get client IP
    const ip = request.ip || 'unknown';
    
    // Log API request (in production, use a proper logging system)
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname} - IP: ${ip}`);
    
    // Apply rate limiting
    const rateLimitWindow = 60 * 1000; // 1 minute
    const maxRequests = 60; // 60 requests per minute
    
    const now = Date.now();
    const clientRateLimit = rateLimit.get(ip);
    
    if (!clientRateLimit || now > clientRateLimit.resetTime) {
      // First request or reset window
      rateLimit.set(ip, { count: 1, resetTime: now + rateLimitWindow });
    } else if (clientRateLimit.count >= maxRequests) {
      // Too many requests
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Too many requests', message: 'Please try again later' }),
        { 
          status: 429, 
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil(clientRateLimit.resetTime / 1000).toString(),
          }
        }
      );
    } else {
      // Increment request count
      clientRateLimit.count++;
      rateLimit.set(ip, clientRateLimit);
      
      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', (maxRequests - clientRateLimit.count).toString());
      response.headers.set('X-RateLimit-Reset', Math.ceil(clientRateLimit.resetTime / 1000).toString());
    }
    
    // Check protected API routes
    if (
      request.nextUrl.pathname.startsWith('/api/users') ||
      request.nextUrl.pathname.startsWith('/api/settings') ||
      (request.nextUrl.pathname.startsWith('/api/team-members') && 
       (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE')) ||
      (request.nextUrl.pathname.startsWith('/api/pages') && 
       (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE'))
    ) {
      try {
        // Get the token using the NextAuth JWT handler
        const token = await getToken({ 
          req: request,
          secret: process.env.NEXTAUTH_SECRET || 'your-fallback-secret-for-development'
        });
        
        // If no token or token without necessary role
        if (!token) {
          return new NextResponse(
            JSON.stringify({ success: false, error: 'Unauthorized' }),
            { 
              status: 401, 
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        
        // For admin-only routes, check role
        if (
          request.nextUrl.pathname.startsWith('/api/users') ||
          (request.nextUrl.pathname.startsWith('/api/settings') && 
           (request.method === 'POST' || request.method === 'DELETE'))
        ) {
          if (token.role !== 'admin') {
            return new NextResponse(
              JSON.stringify({ success: false, error: 'Forbidden' }),
              { 
                status: 403, 
                headers: { 'Content-Type': 'application/json' }
              }
            );
          }
        }
      } catch (error) {
        console.error('Auth middleware error:', error);
        return new NextResponse(
          JSON.stringify({ success: false, error: 'Authentication error' }),
          { 
            status: 401, 
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }
  }
  
  return response;
}

// Only run middleware on API routes and auth routes
export const config = {
  matcher: ['/api/:path*', '/login', '/admin/:path*'],
};