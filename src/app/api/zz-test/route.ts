import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') ?? undefined;
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin ?? 'https://akuna-pay-pilot.lovable.app',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }
  });
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin') ?? undefined;
  return new Response(JSON.stringify({
    ok: true,
    route: '/api/zz-test',
    ts: Date.now()
  }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': origin ?? 'https://akuna-pay-pilot.lovable.app',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
      'x-route-check': 'zz-test'
    }
  });
}
