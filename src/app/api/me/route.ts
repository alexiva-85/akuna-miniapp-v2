import { NextRequest } from 'next/server';

const ALLOW_ORIGINS = new Set(['https://akuna-pay-pilot.lovable.app']);

function cors(origin?: string) {
  const allow = origin && ALLOW_ORIGINS.has(origin) ? origin : 'null';
  return {
    'Access-Control-Allow-Origin': allow,
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

// простой разбор dev-токена: "dev.<base64url>{user_id,tg_id,exp}.<sig>"
function parseDevToken(token: string) {
  if (!token.startsWith('dev.')) return null;
  const parts = token.split('.');
  if (parts.length < 3) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return { user_id: payload.user_id ?? '0', tg_id: payload.tg_id ?? '0' };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin') ?? undefined;

  const auth = req.headers.get('authorization') || '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) return json({ ok: false, error: 'no_token' }, 401, origin);

  const token = m[1];

  // В DEV принимаем dev-токен; боевую проверку JWT добавим отдельным коммитом
  const dev = parseDevToken(token);
  if (!dev) return json({ ok: false, error: 'invalid_token' }, 401, origin);

  return json({ ok: true, user: { id: dev.user_id, tg_id: dev.tg_id } }, 200, origin);
}