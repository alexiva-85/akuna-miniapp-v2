import { NextRequest } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

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

// --- Telegram verify helpers ---
function hmacSHA256(key: Buffer, data: string) {
  return crypto.createHmac('sha256', key).update(data).digest('hex');
}
function sha256(data: string) {
  return crypto.createHash('sha256').update(data).digest();
}
// Build data_check_string from initData (querystring), excluding "hash"
function buildDataCheckString(qs: URLSearchParams) {
  const pairs: string[] = [];
  for (const [k, v] of qs.entries()) {
    if (k === 'hash') continue;
    pairs.push(`${k}=${v}`);
  }
  pairs.sort();
  return pairs.join('\n');
}
function verifyInitData(initData: string, botToken: string): { ok: boolean; payload?: any; error?: string } {
  try {
    const qs = new URLSearchParams(initData);
    const hash = qs.get('hash') || '';
    if (!hash) return { ok: false, error: 'no_hash' };

    const dataCheckString = buildDataCheckString(qs);
    const secretKey = sha256(botToken); // secret_key = sha256(BOT_TOKEN)
    const calc = hmacSHA256(secretKey, dataCheckString);

    if (calc !== hash) return { ok: false, error: 'bad_signature' };

    const authDate = Number(qs.get('auth_date') || '0');
    if (!authDate || (Date.now() / 1000 - authDate) > 86400) {
      // older than 24h — optional policy
      return { ok: false, error: 'auth_date_expired' };
    }

    // Parse user payload
    const userStr = qs.get('user');
    const user = userStr ? JSON.parse(userStr) : null;

    return { ok: true, payload: { user, authDate } };
  } catch (e:any) {
    return { ok: false, error: 'verify_error' };
  }
}

// Dev session token (замените на свой JWT, если есть утилита)
function makeDevToken(payload: object, ttlSeconds: number) {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  const sig = crypto.randomBytes(24).toString('base64url');
  return `dev.${body}.${sig}`;
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') ?? undefined;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400, origin);
  }

  const initData: string = body?.initData || '';
  if (!initData) return json({ ok: false, error: 'no_initData' }, 400, origin);

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
  if (!BOT_TOKEN) {
    // Без токена не можем верифицировать — вернём 501
    return json({ ok: false, error: 'not_configured' }, 501, origin);
  }

  const result = verifyInitData(initData, BOT_TOKEN);
  if (!result.ok) return json({ ok: false, error: result.error }, 401, origin);

  // Соберём минимальный payload
  const tg_id = String(result.payload?.user?.id || '');
  const user_id = tg_id; // можно маппить на вашу БД

  // Выдать сессию (dev-токен на 24 часа)
  const session_token = makeDevToken({ user_id, tg_id }, 24 * 3600);

  return json({ ok: true, session_token }, 200, origin);
}