import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// Force cache clear - Tue Oct 14 20:25:00 +07 2025

export async function GET() {
  return NextResponse.json(
    { ok: true },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    }
  );
}
