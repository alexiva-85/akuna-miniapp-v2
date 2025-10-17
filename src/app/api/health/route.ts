import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptionsRequest } from '@/server/cors';

export const dynamic = 'force-dynamic';
// FORCE CACHE CLEAR - Tue Oct 14 20:46:00 +07 2025

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  return NextResponse.json(
    { ok: true, ts: Date.now() },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
        ...corsHeaders
      }
    }
  );
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return handleOptionsRequest(origin);
}
