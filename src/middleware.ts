import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders } from './server/cors';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ru'],

  // Used when no locale matches
  defaultLocale: 'ru'
});

export default function middleware(request: NextRequest) {
  // Handle CORS preflight for all /api/* routes
  if (request.method === 'OPTIONS' && request.nextUrl.pathname.startsWith('/api')) {
    const origin = request.headers.get('origin');
    const corsHeaders = getCorsHeaders(origin);
    
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  // For non-API routes, use the internationalization middleware
  if (!request.nextUrl.pathname.startsWith('/api')) {
    return intlMiddleware(request);
  }

  // For API routes, just pass through (CORS headers will be handled by individual routes)
  return NextResponse.next();
}

export const config = {
  // Match internationalized pathnames and API routes
  matcher: ['/', '/(ru|en)/:path*', '/api/:path*']
};
