import { NextRequest, NextResponse } from 'next/server';

const ALLOW_ORIGINS = new Set(['https://akuna-pay-pilot.lovable.app']);

function corsHeaders(origin?: string) {
  const allow = origin && ALLOW_ORIGINS.has(origin) ? origin : 'null';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/api')) return NextResponse.next();

  const origin = req.headers.get('origin') ?? undefined;

  // Preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders(origin) });
  }

  // Pass-through but ensure CORS on responses (set in route too; this is extra safety)
  const res = NextResponse.next();
  Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}

// apply only to API
export const config = {
  matcher: ['/api/:path*'],
};