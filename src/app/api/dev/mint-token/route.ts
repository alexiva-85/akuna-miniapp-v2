import { NextRequest } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

function cors(origin?: string) {
  const o = origin ?? 'https://akuna-pay-pilot.lovable.app';
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function json(data: any, status = 200, origin?: string) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', ...cors(origin) },
  });
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') ?? undefined;
  return new Response(null, { status: 200, headers: cors(origin) });
}

// dev-only token (не боевой)
function makeDevToken(payload: object, ttlSeconds: number) {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  const sig = crypto.randomBytes(24).toString('base64url');
  return `dev.${body}.${sig}`;
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin') ?? undefined;
  if (process.env.FEATURE_DEV_ROUTES !== '1') return json({ ok:false, error:'not_found' }, 404, origin);

  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id') ?? '0';
  const tg_id  = searchParams.get('tg_id')  ?? '0';
  const ttl    = Number(searchParams.get('ttl') ?? '900');

  const session_token = makeDevToken({ user_id, tg_id }, ttl);
  return json({ ok:true, session_token, ttl }, 200, origin);
}