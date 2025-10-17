import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
const secret = new TextEncoder().encode(JWT_SECRET);

export interface SessionPayload {
  user_id: string;
  tg_id: string;
  iat: number;
  exp: number;
}

export async function createSessionToken(payload: {
  user_id: string;
  tg_id: string;
  ttl?: number; // seconds, default 1 hour
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (payload.ttl || 3600); // default 1 hour

  const jwt = await new SignJWT({
    user_id: payload.user_id,
    tg_id: payload.tg_id,
    iat: now,
    exp: exp
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .sign(secret);

  return jwt;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as SessionPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

export function isTokenExpired(payload: SessionPayload): boolean {
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}
